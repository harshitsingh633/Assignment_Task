import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema({
    email : { type : String , unique: true},
    password : String,
    firstName : String,
    lastName : String,
})

const memberSchema = new Schema({
    userId : { type : Schema.Types.ObjectId , ref : "User"},
    role: { type: String, enum: ["ADMIN", "MEMBER"], default: "MEMBER" }
},{
    _id : false
});


const projectSchema = new Schema({
    name : { type : String , required : true, trim : true},
    description : {type : String , required : true},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    members : [memberSchema]
    },{
        timestamps : true
    });


const taskSchema = new Schema({
        title: { type: String, required: true },
        description: String,
        projectId: { type: Schema.Types.ObjectId, ref: "Project" },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO",
        },
        dueDate: Date,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


export const userModel = mongoose.model("user", userSchema);
export const ProjectModel = mongoose.model("Project", projectSchema);
export const TaskModel = mongoose.model("Task", taskSchema);