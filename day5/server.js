// Server ko start krna ka kam hai wali file krti hai

const app = require("./src/app");

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
})