import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => { 
    let sum = 0;

    for (let i = 0; i < 1e9; i++) { 
        sum += i;

    }
    res.send(`Hello world! ${sum}`)
})


app.listen(3000, () => { 
    console.log("server is running on port 3000");
})