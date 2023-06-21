import React,{useEffect} from 'react'
import ApiGateway from '../../Service/ApiGateway'

import './Instructions.css'

import { useNavigate } from 'react-router-dom'

function Instructions() {

    const navigate = useNavigate()

    const bodyProps = {
        subjectName : "Python"
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = ApiGateway.post('/api/v1/create-test/',bodyProps)
            result.then(({ data }) => {
                console.log(data)
                localStorage.setItem('testId',data.response.testId)
            })
          } catch (e) {
            console.log(e);
          }
        };
        fetchData();
      }, []);

    const handleStart = ()=> {
        navigate('/test/Python')
    }

  return (
    <div className='instrcutions_container'>
        <div className="instruction_box">
            <h3>NOTE</h3>
            <ol>
                <li>
                    <p>
                    You will be given 15 multiple choice questions on <span>Python</span>
                    </p>
                </li>
                <li>
                    <p>
                    Questions will be divided into 3 categories (Beginner, Intermediate, Advanced).
                    All categories will have 5 questions each.
                    </p>
                </li>
                <li>
                    <p>
                    Settle yourself in an environment where you can focus without
                    any distractions for about 15 minutes. When you finish the test,
                    you will get your Proficiency level and the Roadmap for your current Proficiency level.
                    </p>
                </li>
                <li>
                    <p>
                    Read the questions carefully before answering.
                    </p>
                </li>
                <li>
                    <p>
                    Avoid cheating and malpractices for genuine prediction.
                    </p>
                </li>
                <li>
                    <p>
                    When you are ready, click 'Start' below!.
                    </p>
                </li>
            </ol>
            <button
                onClick={handleStart}
            >Start</button>
        </div>
    </div>
  )
}

export default Instructions
