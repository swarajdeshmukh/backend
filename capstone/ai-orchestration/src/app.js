import express from 'express';
import morgan from 'morgan';
import agentRouter from  "./routers/agent.router.js";
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


app.get("/api/status/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/ai", agentRouter);

export default app;