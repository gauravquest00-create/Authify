import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js"; // ✅ USE THIS

dotenv.config(); // 🔥 MUST BE FIRST

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB CONNECT
connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
console.log("JWT 👉", process.env.JWT_SECRET);
app.listen(5000, () => {
  console.log("Server running on 5000");
});