import React from 'react'
import "./Login.css"
import { useState } from 'react'

export default function Login() {

  const [checkLogin, SetCheckLogin] = useState(false)

  const LoginBox = () => {
    return (
      <>
        <h2>Login.</h2>
        <input type="email" name="email" id="email" placeholder='Type Email ID' />
        <input type="password" name="username" id="user" placeholder='Type Password' />
        <button className='login-btn'>&gt;</button>
        <p
          style={{ fontSize: 15 }}
          onClick={()=>{
            SetCheckLogin(!checkLogin)
          }
          }>New Here? Register</p>
      </>
    )
  }

  const RegisterBox = () => {
    return (
      <>
        <h2>Register.</h2>
        <input type="text" name="username" id="user" placeholder='Type Username' />
        <input type="email" name="email" id="email" placeholder='Type Email ID' />
        <input type="text" name="password" id="pass" placeholder='Type Password' />
        <input type="password" name="confpass" id="confpass" placeholder='Confirm Password' />
        <a href='' className='register-btn'>Register</a>
        <p
          style={{ fontSize: 15, marginTop: 12 }}
          onClick={()=>{
            SetCheckLogin(!checkLogin)
          }
          }>Back to Login</p>
      </>
    )
  }



  return (
    <div style={{ display: "flex" }}>
      <div className='title-container'>
        <h1>ADAPTIVE<br />LEARNING<br />SYSTEM<br /></h1>
        <p>Transform your learning journey with our <br />adaptive e-learning platform</p>
      </div>
      <div className='login-container'>
        {checkLogin ? <RegisterBox /> : <LoginBox />}
      </div>
    </div>
  )
}
