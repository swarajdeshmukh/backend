// External imports
import dotenv from 'dotenv'

// Internal imports
import app from './src/app.js'
import connectDB from './src/config/DB.js';

dotenv.config();

const PORT = process.env.PORT || 8000

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})