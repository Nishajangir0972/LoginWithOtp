import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import '../styles/mix.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { registerfunction } from '../services/Apis';


const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [inValue, setInValue] = useState({
    fname: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInValue({ ...inValue, [name]: value })

  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fname, email, password } = inValue;

    if (fname === "") {
      toast.error("Enter Your name")
    } else if (email === "") {
      toast.error("Enter Your Email")
    } else if (!email.includes('@')) {
      toast.error("Enter valid Email")
    } else if (password === "") {
      toast.error("Enter your Password")
    } else if (password.length < 6) {
      toast.error("Password must be 6 didgit")
    } else {
      const response = await registerfunction(inValue)
      if(response.status === 200){
        setInValue({...inValue , fname:"" , email:"" , password:""})
        navigate("/")
      }
      else{
        toast.error(response.response.data.error)
      }
    }



  }

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign up</h1>
          <p>We are glad you are here . Lets Sign Up</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor='fname'>Name</label>
            <input type='fname' name='fname' id='fname' onChange={handleChange} placeholder='Enter your name' />
          </div>
          <div className="form_input">
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={handleChange} placeholder='Enter your email' />
          </div>
          <div className="form_input">
            <label htmlFor='password'>Password</label>
            <div className="pass" >
              <input type={!passShow ? "password" : "text"} name='password' onChange={handleChange} id='password' placeholder='Enter your password' />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>

          </div>
          <button className='btn' onClick={handleSubmit}>Sign Up</button>
          <p>Already have account ? <NavLink to='/'>Login</NavLink></p>
        </form>
      </div>
      <ToastContainer />
    </section>

  )
}

export default Register