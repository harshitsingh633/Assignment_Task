import { Router , Request , Response } from "express";
import { loginSchema, signupSchema } from "../schema/auth.schema";
import { ProjectModel, TaskModel, userModel } from "../model/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", async(req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const { email, password } = parsed.data;

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const user = await userModel.create({ 
      email: email, 
      password: hashedPassword 
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET!,
      {expiresIn : '1h'}
    );

    res.status(200).json({ message: "User signed up",
      token : token
     });

  } catch(e) {
    res.status(411).json({ message: "User already exists" });
  }
});


router.post("/login", async(req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const { email, password } = parsed.data;

  try {
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password as string);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET!, 
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/projects",authMiddleware, async(req : AuthRequest , res : Response) => {
  try{
    const name = req.body.name;
    const description = req.body.description;

    if(!name){
      return res.status(400).json({
        message : "Name is required",
      })
    }

    const project = await ProjectModel.create({
      name : name,
      description : description,
      createdBy : req.user.id,
      members : [
        {
          userId : req.user.id,
          role : "ADMIN",
        }
      ],
    })

    return res.status(201).json({
      message : "Project created",
      project
    })
  }catch(e){
    return res.status(500).json({
      message : "Error creating project",
    })
  }
})

router.get("/projects", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await ProjectModel.find({
      "members.userId": req.user.id
    });

    return res.json(projects);
  } catch (e) {
    return res.status(500).json({
      message: "Error fetching projects"
    });
  }
});

router.post("/tasks",authMiddleware ,async (req : AuthRequest , res : Response) => {
  try{
    const { title , description, projectId , assignedTo , dueDate} = req.body;

    if(!title || !projectId){
      return res.status(400).json({
        message : "Title and projectId are required",
      });
    }

    const task = await TaskModel.create({
      title,
      description,
      projectId,
      status: "TODO",
      createdBy: req.user.id, 
    });

    return res.status(201).json({
      message : "Task created",
      task,
    })
  }catch(e){
    return res.status(500).json({
      message: "Error creating task",
    });
  }
})

router.get("/tasks/:projectId", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await TaskModel.find({ projectId });

    return res.json(tasks);
  } catch (e) {
    return res.status(500).json({
      message: "Error fetching tasks",
    });
  }
});


router.put("/tasks/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    return res.json({
      message: "Task updated",
      task,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error updating task",
    });
  }
});

router.get("/dashboard", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    // Get all tasks created by or assigned to user
    const tasks = await TaskModel.find({
      $or: [
        { createdBy: userId },
        { assignedTo: userId }
      ]
    });

    const total = tasks.length;

    const completed = tasks.filter(task => task.status === "DONE").length;

    const pending = tasks.filter(task => task.status !== "DONE").length;

    const overdue = tasks.filter(task =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "DONE"
    ).length;

    return res.json({
      total,
      completed,
      pending,
      overdue
    });

  } catch (e) {
    return res.status(500).json({
      message: "Error fetching dashboard"
    });
  }
});

export default router;