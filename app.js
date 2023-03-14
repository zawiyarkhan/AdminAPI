const express = require('express');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./Controllers/middleware/authMiddleware');
const connectDB = require('./Database/connectDB');

const route = require('./Routes/routes');
const app = express();

app.use(express.json());
app.use(cookieParser());

PORT = 3000;
url = "mongodb+srv://zawiyarkhan:Hello1234@cluster0.ujvzuvt.mongodb.net/Waqeel?retryWrites=true&w=majority";

const start = async() =>{
    try {
        await connectDB(url);
        app.listen(PORT, ()=>{
            console.log("server is listening on PORT 3000");
        })
    } catch (error) {
        console.log(error)
    }
}
app.use(route)
start();