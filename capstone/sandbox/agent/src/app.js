import express from "express";
import morgan from "morgan";
import fs from "fs";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const WORKSPACE_DIR = "/workspace";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the Sandbox Agent API!",
    status: "Success",
  });
});

app.get("/list/files", async (req, res) => {
  const elements = await fs.promises.readdir(WORKSPACE_DIR);
  console.log(elements);
  res.status(200).json({
    status: "Elements in working directory",
    elements,
  });
});

export default app;
