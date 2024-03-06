import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})


const user = new mongoose.model("users" , userSchema)
export default user