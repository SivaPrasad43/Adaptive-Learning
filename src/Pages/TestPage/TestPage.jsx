import React, { useEffect, useState,useContext } from "react";
import Navbar from "../../Components/res/Navbar/Navbar";
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
                    "https://opensheet.elk.sh/1Bb2QOpmm3PualZY_SFQkeV6uy6EKM1tRDRFySWEe130/Sheet1"
                );
                setData(result.data);
                setLoading(false)
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    console.log("data is: ",data)


    return (
            <>
                <Navbar />
                <div className="qn-container">
                    <h3>Username: {username} </h3>
                    <div className="qn-box">
                        {loading ? 
                        (<Loading value={"Loading..."}/>) 
                        : data ?
                        <QuestionBox data={data}/>
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
    const [userOption,setUserOption] = useState(null)
    const [active,setActive] = useState('')
    const [question,setQuestion] = useState([])

    useEffect(()=>{
        return(
            generateRandomQuestion()
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const generateRandomQuestion = () => {
        const randIndex  = Math.floor(Math.random() * data.length);
        console.log("random index: ",randIndex)
        setQuestion(data[randIndex])
    }

    const handleOptionClick = (option) => {
        setUserOption(question[option]);
        setActive(option);
        console.log(option);
      };
    
      const handleSubmitClick = (e) => {
        e.preventDefault();
        setUserOption(null);
        setActive("");
        generateRandomQuestion()
        console.log("user option",userOption)
      };

    return(
        <form onSubmit={handleSubmitClick}>
        <h3>Question #{question.qid}</h3>
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
        <div className="submit-btn btn">
          <button type="submit">Submit</button>
        </div>
      </form>
     )
}
export default TestPage;
