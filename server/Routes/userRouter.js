import mongoose from "mongoose";
import express from "express";
import {userRegister} from '../controllers/userControllers.js'
import { userSendOtp } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.post("/user/register" , userRegister)
userRouter.post("/user/sendOtp" , userSendOtp)



export default userRouter