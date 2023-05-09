import React from 'react'
import "./Login.css"
import { useState, useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../Context/Auth';

export default function Login() {

  const [checkLogin, SetCheckLogin] = useState(false)
  const [accessToken, setAccessToken] = useState("")

  const { setUsername } = useContext(LoginContext)

  const usernameRef = useRef("")
  const passwordRef = useRef("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log(usernameRef.current.value)
    setUsername(usernameRef.current.value)
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      alert("Please fill all the fields")
    } else {

      try {

        const loginBody = {
          "email": usernameRef.current.value,
          "password": passwordRef.current.value
        }

        const response = await fetch('http://127.0.0.1:8000/api/v1/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginBody),
        });

        console.log(response)


        if (!response.ok) {
          throw new Error('Request failed');
        } else {
          navigate('/test')
        }

        const mockAccessToken = 'sxhjbsuhcxbsacysabc';

        localStorage.setItem('accessToken', mockAccessToken)

        const result = await response.json();
        console.log(result)

      } catch (error) {
        console.error(error);
      }
    }
  }

  const LoginBox = () => {
    return (
      <>
        <h2>Login.</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder='Type Email ID'
          ref={usernameRef}
        />
        <input
          type="password"
          name="username"
          id="user"
          placeholder='Type Password'
          ref={passwordRef}
        />
        <button
          className='login-btn'
          onClick={() => {
            handleLogin()
          }}>&gt;</button>
        <p
          style={{ fontSize: 15 }}
          onClick={() => {
            SetCheckLogin(!checkLogin)
          }
          }>New Here? Register</p>
      </>
    )
  }

  const RegisterBox = () => {

    const user = useRef("")
    const email = useRef("")
    const phone = useRef("")
    const pass = useRef("")
    const confpass = useRef("")

    const handleReg = async () => {
      if (user.current.value === "" || email.current.value === "" || pass.current.value === "" || confpass.current.value === "") {
        alert("Please fill all the fields")
      } else {
        if (pass.current.value !== confpass.current.value) {
          alert("Passwords do not match")
        } else {
          alert("Register Success!!")
          const regBody = {
            "name": user.current.value,
            "email": email.current.value,
            "phone": phone.current.value,
            "password": pass.current.value
          }
          console.log(regBody)
          try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/register/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(regBody),
            });

            if (!response.ok) {
              throw new Error('Request failed');
            } else {
              navigate('/test')
            }

            const result = await response.json();
            console.log(result)

            // console.log(response)
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    return (
      <>
        <h2>Register.</h2>
        <input type="text" name="username" id="user" placeholder='Type Username' ref={user} />
        <input type="email" name="email" id="email" placeholder='Type Email ID' ref={email} />
        <input type="text" name="phone" id="phone" placeholder='Type Phone' ref={phone} />
        <input type="text" name="password" id="pass" placeholder='Type Password' ref={pass} />
        <input type="password" name="confpass" id="confpass" placeholder='Confirm Password' ref={confpass} />
        <button
          className='register-btn'
          onClick={handleReg}
        >Register</button>
        <p
          style={{ fontSize: 15, marginTop: 12 }}
          onClick={() => {
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
