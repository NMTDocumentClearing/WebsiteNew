const express = require("express")
const dotenv = require("dotenv")
require('dotenv').config();
const cors = require('cors')
const connectDB = require("./config/db")
// const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser');
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')



const app = express();
const server = require('http').createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

dotenv.config();
connectDB();

app.use(cors({
    origin: process.env.FRONT_END_URL
}))

app.get("/", (req, res) => {
    console.log("nowewjkfwlfwklfwnl");
    res.send("API is running now also")
})

app.use('/',userRoutes)
app.use('/admin',adminRoutes)


const PORT = process.env.PORT || 5000

server.listen(PORT,console.log(`Server started on PORT ${PORT}`));