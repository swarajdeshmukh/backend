import express from "express";

const app = express();


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Wordl!",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: "OK",
  });
});

app.get("/api/data", (req, res) => {
  const data = [
    {
      id: 1,
      name: "Swaraj deshmukh",
      description: "This is a sample data response from the API.",
    },
    {
      id: 2,
      name: "Pratik chaudhari",
      description: "This is a sample data response from the API.",
    },
  ];

  res.status(200).json({
    data,
  });
});

export default app;
