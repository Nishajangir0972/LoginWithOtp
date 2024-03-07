import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify';


const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      const data = {
        otp,
        email: location.state
      };
      const response = await userVerify(data);
      // console.log(response);
      if(response.status === 200){
        localStorage.setItem("userdbtoken" , response.data.userToken);
        toast.success(response.data.message);
        setTimeout(()=>{
          navigate("/dashboard")
        }, 5000)
      }else{
        toast.error(response.response.data.error)
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Please Enter The OTP</h1>
        </div>
        <form onSubmit={LoginUser}>
          <div className="form_input">
            <label htmlFor='otp'>OTP</label>
            <input type='text' name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter your otp here' />
          </div>
          <button type="submit" className='btn'>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Otp;
