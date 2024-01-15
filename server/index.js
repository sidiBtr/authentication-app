import  express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import User from './models/userModel.js'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/auth.route.js'
dotenv.config()
// start the server
const app = express()
// establish a middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)
// connect to the our mongo data base
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('success connection to the database')
    app.listen(process.env.PORT, ()=> {
        console.log('app is listening on port', process.env.PORT)
    })
}).catch((error) => {console.log('error connecting to the database ', error)}) 
// implement routes
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {
    console.error(err)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

