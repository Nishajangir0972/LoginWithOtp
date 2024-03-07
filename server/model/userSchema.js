import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

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


//hashing password

userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
})

const user = new mongoose.model("users" , userSchema)
export default user