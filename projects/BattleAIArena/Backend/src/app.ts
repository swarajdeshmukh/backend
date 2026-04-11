import express from 'express'
import cors from "cors";
import graph from './ai/graph.ai.js'
const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

app.post("/invoke", async (req, res) => {
  const { input } = req.body;
  const result = await graph(input);

  res.status(200).json({
    message: "Graph executed successfully",
    success: true,
    result,
  });
});

export default app;