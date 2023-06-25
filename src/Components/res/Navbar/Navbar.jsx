import React from 'react'
import './Navbar.css'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../../Context/Auth';
import ApiGateway from '../../../Service/ApiGateway';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Navbar({ logoutStatus, subShow, DashboardShow }) {

  const navigate = useNavigate()

  const { username } = useContext(LoginContext)
  const [user,setUser] = useState("")

  const trimMailDomain = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substr(0, atIndex);
    } else {
      return email;
    }
  }

  const checkUserStatus = async () => {
    if (localStorage.getItem('accessToken')) {
      const result = await axios.get("http://127.0.0.1:8000/api/v1/info/",
      {headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      }})
      console.log(result.data.response)
      if (result.data.response.email) {
        setUser(result.data.response.email)
      } else {
        console.log("not killadi")
        navigate('/select-sub')
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    navigate("/")
  }

  const handleDashboard = () => {
    navigate(`/dashboard/${user}/`)
  }

  useEffect(()=>{
    checkUserStatus()
  },[])

  return (
    <div className='navbar-container'>
      <div className="navbar_shrink">
        <h3 className='brand'>Adapto.</h3>
        {
          subShow ? <Subject /> : null
        }
        <div className="logout-container">
          <div
            className="logout-btn"
            onClick={() => handleLogout()}
          >Logout</div>
          {
            DashboardShow ? (
              <div
              className="dash-btn"
              onClick={() => handleDashboard()}
            >Goto Dashboard</div>
            ): null
          }
        </div>
      </div>
    </div>
  )
}

const Subject = () => {
  return (
    <div className="sub-info">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
      <p>Subject  .  Python</p>
    </div>
  )
}

export default Navbar
