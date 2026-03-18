import express from "express"
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import cors from 'cors'

// Internal imports
import authRouter from "./routes/auth.router.js";

const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

//Helth check
app.get("/", (req, res) => {
    res.json({message: "Server is running"})
})

app.use("/api/auth", authRouter)

export default app;