const mongoos = require('mongoose')
const app = require("./src/app");


function connectToDB() {
    mongoos.connect(
      "mongodb+srv://swarajdeshmukh1001_db_user:4sVwvbR21JQ0lnXs@cluster0.ji0bzln.mongodb.net/day-6",
    )
    .then(() => {
        console.log("DB connect succesfully"); 
    })
}

connectToDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})