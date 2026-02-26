import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "contenttype"]
}));

app.use(express.json());

//  Root route add karo (404 fix)
app.get("/", (req, res) => {
    res.json({ message: "Expense Tracker API Running " });
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

//  Vercel ke liye conditional listen
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app; // Yeh zaroori hai