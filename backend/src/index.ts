import express from "express";
import cors from "cors";
import authRoutes from "./routes/mainRouter";
const app = express();

app.use(cors({
    origin : "*",
    methods : "GET,POST,PUT,DELETE",
    credentials : true
}))

app.use("/api/v1", authRoutes);

app.use(express.json());

app.listen(3000);