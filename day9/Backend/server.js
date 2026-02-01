require('dotenv').config();


const app = require('../Backend/src/app');
const connectToDB = require('../Backend/src/config/db')


connectToDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})