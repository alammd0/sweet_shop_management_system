import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.route";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,             
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

