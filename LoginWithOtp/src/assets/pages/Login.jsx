import React, { useState } from 'react'
import '../styles/mix.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from '../services/Apis';


const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter the email")
    }
    else if (!email.includes('@')) {
      toast.error("Enter a valid email address")
    } else {
      const data = {
        email: email
      }
      const response = await sentOtpFunction(data)
      // console.log(response);

      if (response.status === 200) {
        navigate("/user/otp" ,{state:email})
      } else {
        toast.error(response.response.data.error)

      }

    }

  }


  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back , Log In</h1>
          <p>We are glad you are back . Please Login</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          </div>
          <button className='btn' onClick={sendOtp}>Login</button>
          <p>Don't have account ? <NavLink to='/register'>SignUp</NavLink> </p>
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Login