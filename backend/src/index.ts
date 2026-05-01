import express from "express";
import cors from "cors";
import authRoutes from "./routes/mainRouter";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/v1", authRoutes);

const startServer = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is not defined");
    }

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB Connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (error) {
    console.error(`Error ${error}`);
    process.exit(1);
  }
};

startServer();
