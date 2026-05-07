import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

app.get("/api/user", (req, res) => {
  const user = [
    {
      id: 1,
      name: "swaraj",
    },
    {
      id: 2,
      name: "pratik",
    },
    {
      id: 3,
      name: "sidharth",
    },
    {
      id: 4,
      name: "harshal",
    },
  ];

    res.status(200).json({
        success: true,
        user,
    })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
