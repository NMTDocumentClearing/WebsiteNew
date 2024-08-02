const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require("./config/db")
// const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser');
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')


dotenv.config();
connectDB();

console.log("JWT Secret from .env:", process.env.USER_JWT_SECRET);

const app = express();
const server = require('http').createServer(app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

console.log(process.env.FRONT_END_URL)

app.use(cors({
        origin: 'https://nmtdocumentclearing.com', // Adjust as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());



app.use('/api/',userRoutes)
app.use('/api/admin',adminRoutes)


const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
