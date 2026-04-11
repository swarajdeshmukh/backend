import express from 'express'
import graph from './ai/graph.ai.js'
const app = express()

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

app.post("/", async(req, res) => {
    const result = await graph("What is the capital of india?")
    res.json(result)
})

export default app;