import React from 'react'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Headers from './assets/component/Headers'
import Dashboard from './assets/pages/Dashboard'
import Error from './assets/pages/Error'
import Login from './assets/pages/Login'
import Otp from './assets/pages/Otp'
import Register from './assets/pages/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  

  return (
    <>
      <Headers/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user/otp' element={<Otp/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>

      </Routes>
    </>
  )
}

export default App
