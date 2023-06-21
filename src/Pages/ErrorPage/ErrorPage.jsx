import React from 'react'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

    const navigate = useNavigate()

    const handleButtonClick = ()=> {
        navigate('/select-sub')
    }

  return (
    <div className='error_container'>
      <h1>Sorry..The Subject is not Available Now</h1>
      <div 
        className="button"
        onClick={handleButtonClick}
      >Go back</div>
    </div>
  )
}

export default ErrorPage
