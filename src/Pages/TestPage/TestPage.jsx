import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TestPage.css";
import axios from "axios";
import { LoginContext } from "../../Context/Auth";
import ApiGateway from "../../Service/ApiGateway";
import Navbar from "../../Components/res/Navbar/Navbar"
import { Motivation } from "./Motivation";

const TestPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = useContext(LoginContext)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = ApiGateway.get('/api/v1/get-questions/')
        const result = await axios.get("http://127.0.0.1:8000/api/v1/get-questions/",
        {headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        }})
        .then(({ data }) => {
          setData(data.response)
        })
        setLoading(false)
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar logoutStatus={false} />
      <div className="qn-container">
        <div className="qn-box">
          {loading ?
            (<Loading value={"Loading..."} />)
            : data ?
              <QuestionBox
                data={data}
              />
              : (<Loading value={"Sry, Data not available."} />)}
        </div>
      </div>
    </>
  );
};

const Loading = ({ value }) => {
  return (
    <div className="qn-container">
      <p>{value}</p>
    </div>
  )
}

const QuestionBox = ({ data }) => {
  const [active, setActive] = useState('')
  const [question, setQuestion] = useState([])
  const [ansSelected,setAnsSelected] = useState(false)

  const navigate = useNavigate();

  const answeredQuestionsRef = useRef([]);

  const questionCountRef = useRef(1)

  const startTimeRef = useRef(null);

  const levelBoxRef = useRef("beg-box")

  useEffect(() => {
    generateRandomQuestion()
    startTimeRef.current = new Date()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(()=>{
  //   checkLevel()
  // },[questionCountRef.current])

  useEffect(() => {
    if (questionCountRef.current === 15) {
      navigate("/result");
    }
  }, [questionCountRef, navigate]);

  const generateRandomQuestion = () => {

    // const randIndex  = Math.floor(Math.random() * data.length);
    // const randIndex  = ;
    setQuestion(data[questionCountRef.current])
    // setQuestionCount(questionCount+1)
  }

  const handleOptionClick = (option) => {
    setActive(option);
    setAnsSelected(true)
  };


  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setAnsSelected(false)

    const answeredQuestion = {
      questionId: question.id,
      userAnswer: active,
      timeTaken: (new Date() - startTimeRef.current) / 1000,
      testId: localStorage.getItem('testId')
      // level:question.difficulty_level,
      // tags: question.tags
    };

    try {
      // const result = ApiGateway.post('/api/v1/submit-answer/', answeredQuestion)
      await axios.post("http://127.0.0.1:8000/api/v1/submit-answer/",answeredQuestion,
      {headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      }})
      .then(({ data }) => {
        console.log(data)
        // setData(data.response)
      })
      // setLoading(false)                
    } catch (e) {
      console.log(e);
    }


    console.log(answeredQuestion)

    answeredQuestionsRef.current.push(answeredQuestion);
    setActive(null);

    if (questionCountRef.current === 15) {
      console.log(answeredQuestionsRef.current)
      navigate("/result");
    }
    else {
      generateRandomQuestion();
    }

    questionCountRef.current += 1
    startTimeRef.current = new Date();
    checkLevel()
  };

  
  const checkLevel = () => {
    if (questionCountRef.current <= 5) {
      levelBoxRef.current = "beg-box"
    } else if (questionCountRef.current <= 10 && questionCountRef.current > 5) {
      levelBoxRef.current = "intr-box"
    } else {
      levelBoxRef.current = "adv-box"
    }
  }


  return (
    <form onSubmit={handleSubmitClick}>
      <div className="guestion-info">
        <h3>Question #{questionCountRef.current}</h3>
        <div className={`level-box ${levelBoxRef.current}`}>
          <h4>{question.difficulty_level}</h4>
        </div>
      </div>
      <h1>{question.question}</h1>
      <div className="option-container">
        <div
          className={`option-box ${active === "a" ? "active" : null}`}
          onClick={() => handleOptionClick("a")}
        >
          <h3>{question.a}</h3>
        </div>
        <div
          className={`option-box ${active === "b" ? "active" : null}`}
          onClick={() => handleOptionClick("b")}
        >
          <h3>{question.b}</h3>
        </div>
        <div
          className={`option-box ${active === "c" ? "active" : null}`}
          onClick={() => handleOptionClick("c")}
        >
          <h3>{question.c}</h3>
        </div>
        <div
          className={`option-box ${active === "d" ? "active" : null}`}
          onClick={() => handleOptionClick("d")}
        >
          <h3>{question.d}</h3>
        </div>
      </div>
      <div className="footer-container">
        <div className="question-details">
          <p>Question {questionCountRef.current} / 15</p>
          <p>|</p>
          <p>
            {
              questionCountRef.current === 1 ? 
              "You've got this! Answer the first question with confidence! 💪🌟" : 
              Motivation[Math.floor(Math.random() * Motivation.length)]
            }
          </p>
        </div>
        {
          ansSelected ?     
          <div className="submit-btn btn">
            <button type="submit">Submit Answer</button>
          </div>: 
          null
        }
      </div>
    </form>
  )
}

export default TestPage;
