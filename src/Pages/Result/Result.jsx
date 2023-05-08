import React from 'react'
import "./Result.css"

function Result() {
  return (
    <div className='result-container'>
      <div className="status-container">
        <h1>That's Great!!</h1>
        <h3>We predicting your knowledgebase as</h3>
        <h1 className='level'>Bigginner</h1>
        <div className="agree-container">
            <h3>Do you agree with that?</h3>
            <div className="agree-btn">Yes</div>
            <div className="agree-btn">No</div>
        </div>
      </div>
      <div className="score-container">
        <div className='result-box-container'>
            <div className="result-box">
                <h3>Score</h3>
                <div className="value-box">
                    <h1>100</h1>
                </div>
            </div>
            <div className="result-box">
                <h3>Time Taken</h3>
                <div className="value-box">
                    <h1>100sec</h1>
                </div>
            </div>
        </div>
        <div className="generate-btn">Generate Roadmap</div>
      </div>
    </div>
  )
}

export default Result
