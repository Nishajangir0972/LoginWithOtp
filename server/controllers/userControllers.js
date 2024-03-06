import user from "../model/userSchema.js"



export const userRegister = async(req, res)=>{
const {fname , email , password} = req.body

if(!fname || !email || !password){
    res.status(400).json({error: "Please enter all fields"})
}

try {
    const preuser = await user.findOne({email : email})
    if(preuser){
        res.status(400).json({error : "This user is already in your DB"})
    }
    
} catch (error) {
    
}
}