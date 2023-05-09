import React, { useEffect, useState,useContext,useRef } from "react";
import Navbar from "../../Components/res/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./TestPage.css";
import axios from "axios";
import { LoginContext } from "../../Context/Auth";

const TestPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {username} = useContext(LoginContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    // "https://opensheet.elk.sh/1Bb2QOpmm3PualZY_SFQkeV6uy6EKM1tRDRFySWEe130/Sheet1"
                    "http://127.0.0.1:8000/api/v1/get-questions/"
                );
                setData(result.data.response);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
            <>
                <Navbar />
                <div className="qn-container">
                    <h3>Username: {username} </h3>
                    <div className="qn-box">
                        {loading ? 
                        (<Loading value={"Loading..."}/>) 
                        : data ?
                        <QuestionBox 
                          data={data}
                        />
                        : (<Loading value={"Sry, Data not available."}/>)}
                    </div>
                </div>
            </>
            );
};

const Loading = ({value})=>{
    return(
        <div className="qn-container">
            <p>{value}</p>
        </div>
    )
}

const QuestionBox = ({data}) =>{
    const [active,setActive] = useState('')
    const [question,setQuestion] = useState([])

    const navigate = useNavigate();

    const answeredQuestionsRef = useRef([]);

    const questionCountRef = useRef(1)

    const startTimeRef = useRef(null);

    useEffect(()=>{
            generateRandomQuestion()
            startTimeRef.current = new Date()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
      if (questionCountRef.current === 15) {
        navigate("/result"); 
      }
    }, [questionCountRef, navigate]);

    const generateRandomQuestion = () => {
        const randIndex  = Math.floor(Math.random() * data.length);
        setQuestion(data[randIndex])
        // setQuestionCount(questionCount+1)
      }
      
      const handleOptionClick = (option) => {
        setActive(option);
    };

    
      const handleSubmitClick = (e) => {
        e.preventDefault();



        const answeredQuestion = {
          questionId: question["Question ID"],
          answer: active,
          timeTaken: (new Date() - startTimeRef.current) / 1000
        };

        console.log(answeredQuestion)

        answeredQuestionsRef.current.push(answeredQuestion);
        setActive(null);

        if (questionCountRef.current === 15) {
          console.log(answeredQuestionsRef.current)
          navigate("/result");
        } else {
          generateRandomQuestion();
        }

        questionCountRef.current += 1
        startTimeRef.current = new Date();
      };

    return(
        <form onSubmit={handleSubmitClick}>
          <h3>Question #{questionCountRef.current}</h3>
          <h3>Question Id #{question["Question ID"]}</h3>
          <h1>{question["Question"]}</h1>
          <div className="option-container">
            <div
              className={`option-box ${active === "a" ? "active" : null}`}
              onClick={() => handleOptionClick("a")}
            >
              <h3>{question["A"]}</h3>
            </div>
            <div
              className={`option-box ${active === "b" ? "active" : null}`}
              onClick={() => handleOptionClick("b")}
            >
              <h3>{question["B"]}</h3>
            </div>
            <div
              className={`option-box ${active === "c" ? "active" : null}`}
              onClick={() => handleOptionClick("c")}
            >
              <h3>{question["C"]}</h3>
            </div>
            <div
              className={`option-box ${active === "d" ? "active" : null}`}
              onClick={() => handleOptionClick("d")}
            >
              <h3>{question["D"]}</h3>
            </div>
          </div>
          <div className="submit-btn btn">
            <button type="submit">Submit</button>
          </div>
      </form>
     )
}
export default TestPage;
