import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const SECRET_KEY = "lkjhgfdsasdfnmn"

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
    },
    tokens:[
        {
            token:{
                type : String,
                required :true,
            }
        }
    ]
})


//hashing password

userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
})


userSchema.methods.generateAuthtoken = async function(){
    try {
        let newtoken = jwt.sign({_id:this._id} , SECRET_KEY ,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token : newtoken})
        await this.save();
        return newtoken;
        // console.log(newtoken);
    } catch (error) {
        throw new Error(error);
    }
}

const user = new mongoose.model("users" , userSchema)
export default user