import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from "./routes/user-routes.js"
import authRoutes from "./routes/auth-route.js"
dotenv.config();



mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err);
    
})

const app = express(); 
app.use(express.json());

app.listen(4000, () => {
    console.log("Server listening on port 4000");
    
})


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use((err, req, res, next) => {
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server error'
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    })
})