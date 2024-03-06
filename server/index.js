import express from "express";
import cors from "cors";
import './DB/conn.js'
import userRouter from "./Routes/userRouter.js";


const PORT = 5002;
const app = express();
app.use(express.json())
app.use(cors());
app.use(userRouter)


// app.get("/" ,(req , res)=>{
//     res.status(200).json("Server started")
// })

app.listen(PORT ,()=>{
    console.log(`server has been started on port no :${PORT}`)
})