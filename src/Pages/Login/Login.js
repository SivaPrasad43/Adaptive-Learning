import React from 'react'
import "./Login.css"

export default function Login() {
  return (
    <div style={{display:"flex"}}>
      <div className='title-container'>
        <h1>ADAPTIVE<br/>LEARNING<br/>SYSTEM<br/></h1>
        <p>Transform your learning journey with our <br/>adaptive e-learning platform</p>
      </div>
      <div className='login-container'>
        <h2>login.</h2>
        <input type="text" name="username" id="user" placeholder='Type Username'  />
        <input type="password" name="username" id="user" placeholder='Type Password' />
        <button className='login-btn'>&gt;</button>
        <p style={{fontSize:15}}>New Here? Register</p>
      </div>
    </div>
  )
}
