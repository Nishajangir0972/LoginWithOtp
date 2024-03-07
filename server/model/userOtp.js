import mongoose from "mongoose";
import validator from "validator";

const userOtp = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid")
            }
        }
    },
    otp:{
        type:String,
        required:true
    }
})

const OtpSchema = new mongoose.model("userOtps" , userOtp)
export default OtpSchema