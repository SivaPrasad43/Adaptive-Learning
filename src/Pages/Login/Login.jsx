import React from 'react'
import "./Login.css"
import { useState,useEffect, useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../Context/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiGateway from '../../Service/ApiGateway';
import educationCategories from './educationData.json';
import axios from 'axios';

export default function Login() {

  const [checkLogin, SetCheckLogin] = useState(false)
  const [accessToken, setAccessToken] = useState("")
  const [loginStatus, setLoginStatus] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const { setUsername } = useContext(LoginContext)

  const usernameRef = useRef("")
  const passwordRef = useRef("")

  const navigate = useNavigate()

  const successLogin = () => toast("Login Success!!")
  const errorLogin = () => toast("Please fill all the fields")

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const trimMailDomain = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substr(0, atIndex);
    } else {
      return email;
    }
  }


  const handleLogin = async () => {
    console.log(usernameRef.current.value)
    setUsername(usernameRef.current.value)
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      alert("Please fill all the fields")
      setIsLoading(false)
    } else {

      try {

        const loginBody = {
          "email": usernameRef.current.value,
          "password": passwordRef.current.value
        }
        setIsLoading(true)
        const response = await fetch('http://127.0.0.1:8000/api/v1/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginBody),
        });

        const result = await response.json();
        localStorage.setItem('accessToken', result.response.accessToken)
        console.log(result.response.accessToken)
        if (!response.ok) {
          setLoginStatus(true)
          setIsLoading(false)
          sleep(2000)
          setTimeout(()=>{
            setLoginStatus(false)
          },1000)
          throw new Error('Request failed');
        } else {
          // navigate('/select-sub')
          // if (localStorage.getItem('accessToken')) {
            // const result = await axios.get('http://127.0.0.1:8000/api/v1/info/')
            const result = await axios.get("http://127.0.0.1:8000/api/v1/info/",
              {headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json",
              }})
            console.log(result.data.response)
            if (result.data.response.isTestAttended) {
              console.log("killadi")
              console.log("puthye accesstoken: ",localStorage.getItem("accessToken"))
              console.log("user-data-->",result)
              // sleep(2000);
              setIsLoading(false)
              navigate(`/dashboard/${trimMailDomain(result.data.response.email)}`)
            } else {
              console.log("not killadi")
              navigate('/select-sub')
            }
          // }
        }


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
        {
          loginStatus ? <LoginError /> : <></>
        }
        <button
          className='login-btn'
          onClick={() => {
            handleLogin()
          }}>
            {
              isLoading ? (<div className="custom-loader"></div>) : <h3>&gt;</h3>
            }
        </button>
        <p
          style={{ fontSize: 15 }}
          onClick={() => {
            SetCheckLogin(!checkLogin)
          }
          }>New Here? Register</p>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    )
  }

  const LoginError = () => {
    return (
      <div className='error-box'>
        <h4>Login Failed</h4>
      </div>
    )
  }

  const RegisterBox = () => {
    const user = useRef("");
    const email = useRef("");
    const phone = useRef("");
    const pass = useRef("");
    const confpass = useRef("");
    const gender = useRef("");
    const education = useRef("");

    const handleReg = async () => {
      if (
        user.current.value === "" ||
        email.current.value === "" ||
        pass.current.value === "" ||
        confpass.current.value === ""
      ) {
        alert("Please fill all the fields");
      } else {
        if (pass.current.value !== confpass.current.value) {
          alert("Passwords do not match");
        } else {
          alert("Register Success!!");
          const regBody = {
            name: user.current.value,
            email: email.current.value,
            phone: phone.current.value,
            password: pass.current.value,
            gender: gender.current.value, 
            education: education.current.value,
            ageRange: "18-20"
          };
          console.log(regBody);
          try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/register/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(regBody),
            });

            if (!response.ok) {
              throw new Error("Request failed");
            } else {
              // navigate('/test')
              SetCheckLogin(!checkLogin);
            }

            const result = await response.json();
            console.log(result);

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
        <div className='input-container'>
          <p>Username</p>
          <input type="text" name="username" id="user" placeholder='Type Username' ref={user} />
        </div>
        <div className='input-container'>
          <p>Email ID</p>
          <input type="email" name="email" id="email" placeholder='Type Email ID' ref={email} />
        </div>
        <div className='input-container'>
          <p>Phone Number</p>
          <input type="text" name="phone" id="phone" placeholder='Type Phone' ref={phone} />
        </div>
        <div className='input-container'>
          <p>Gender</p>
          <select id="gender" ref={gender}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className='input-container'>
          <p>Age</p>
          <select id="gender" ref={gender}>
            <option value="">Select Age</option>
            <option value="young">12-22</option>
            <option value="middle">23-40</option>
            <option value="old">40-60</option>
            <option value="very_old">60+</option>
          </select>
        </div>
        <div className='input-container'>
          <p>Education</p>
          <select id="gender" ref={education}>
            <option value="">Select Education</option>
            {
              educationCategories.categories.map((item)=>(
                <option value={item.name}>{item.name}</option>
              ))
            }
          </select>
        </div>
        <div className='input-container'>
          <p>Password</p>
          <input type="text" name="password" id="pass" placeholder='Type Password' ref={pass} />
        </div>
        <div className='input-container'>
          <p>Confirm Password</p>
          <input type="password" name="confpass" id="confpass" placeholder='Confirm Password' ref={confpass} />
        </div>
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
