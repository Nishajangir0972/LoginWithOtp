import user from "../model/userSchema.js"
import OtpSchema from "../model/userOtp.js"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const userRegister = async (req, res) => {
    const { fname, email, password } = req.body

    if (!fname || !email || !password) {
        res.status(400).json({ error: "Please enter all fields" })
    }

    try {
        const preuser = await user.findOne({ email: email })
        if (preuser) {
            res.status(400).json({ error: "This user is already in your DB" })
        }
        else {
            const userRegister = new user({
                fname, email, password
            });

            const storeData = await userRegister.save();
            res.status(200).json(storeData);
        }

    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}

//user send otp

export const userSendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }

    try {
        const preuser = await user.findOne({ email: email });

        if (preuser) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            const existEmail = await OtpSchema.findOne({ email: email });

            if (existEmail) {
                const updateData = await OtpSchema.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true })

                await updateData.save()

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For otp validation",
                    text: `OTP: - ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            }
            else {
                const saveOtpData = new OtpSchema({
                    email, otp: OTP
                })
                await saveOtpData.save()


                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For otp validation",
                    text: `OTP: - ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        }
        else {
            res.status(400).json({ error: "This user is not exist in your DB" })

        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })

    }
}



// export const userLogin = async(req, res) => {
//     const { email, otp } = req.body;
//     console.log(req.body);

//     if (!otp || !email) {
//         res.status(400).json({ error: "Please Enter Your Otp and Email" })
//     }
//     try {
//         const otpverification = await user.findOne({ email: email });

//         if (otpverification.otp === otp) {
//             const preUsers = await user.findOne({ email: email });

//             const token = await preUsers.generateAuthtoken()
//             console.log(token);


//         } else {
//             res.status(400).json({ error: "Invalid Otp" })
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }
// }

export const userLogin = async(req,res)=>{
    const {email,otp} = req.body;

    if(!otp || !email){
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await OtpSchema.findOne({email:email});

        if(otpverification.otp === otp){
            const preuser = await user.findOne({email:email});

            // token generate
            const token = await preuser.generateAuthtoken();
            // console.log(token);
           res.status(200).json({message:"User Login Succesfully Done",userToken:token});

        }else{
            res.status(400).json({error:"Invalid Otp"})
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}