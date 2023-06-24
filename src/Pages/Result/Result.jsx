import React, { useEffect, useState } from 'react';
import "./Result.css";
import { useNavigate } from 'react-router-dom';
import ApiGateway from '../../Service/ApiGateway';
import Navbar from '../../Components/res/Navbar/Navbar';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({resultData}) => {
  console.log("ithann chartilekk ull data-->",resultData)

  const BAC = resultData.slice(0,5).filter(answer => answer.correct).length;
  const IAC = resultData.slice(5,10).filter(answer => answer.correct).length;
  const AAC = resultData.slice(10,15).filter(answer => answer.correct).length;

  const TCA = BAC+IAC+AAC;


  const options = {
    animationEnabled: true,
    theme: "dark1",
    title: {
      text: "Correct Answers Stats (According to Score)",
      fontSize:24,
    },
    subtitles: [{
      text: "",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Beg  inner", y: (BAC/TCA)*100},
        { name: "Intermediate", y: (IAC/TCA)*100},
        { name: "Advanced", y: (AAC/TCA)*100},
      ]
    }]
  }
  return(
		<div>
			<CanvasJSChart options = {options} />
		</div>
  )
}



function Result() {
  const navigate = useNavigate();

  const [proff, setProff] = useState("");
  const [elapsedTime, setElapsedTime] = useState("");
  const [score, setScore] = useState(0);
  const [wrongTags,setWrongTags] = useState([])
  const [agree,setAgree] = useState(false)

  const [resultData,setResultData] = useState([])
  
  useEffect(() => {
    try {
      const result = ApiGateway.get(`/api/v1/results/${localStorage.getItem('testId')}/`);
      result.then(({ data }) => {
        console.log("result: ", data);
        console.log("RESULT:",data.response.reports)
        setResultData(data.response.reports)
        // console.log(data.response.proficiencyLevel)
        setProff(data.response.proficiencyLevel);
        const elapsedTime = data.response.elapsedTime;
        setElapsedTime(elapsedTime.toFixed(2));
        setScore(data.response.totalScore);
        setWrongTags(data.response.wrong)
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
    <Navbar logoutStatus={true}/>
    <div className='result-container'>
      <div className="status-wrap">
        <div className="status-container">
          <h1>That's Great!!</h1>
          <h3>We predict your proficiency as</h3>
          <h1 className='level'>{proff} Level</h1>
          {
            agree? null : (
              <div className="agree-container">
              <h4>Do you agree with the prediction?</h4>
              <div 
                className="agree-btn"
                onClick={()=>{
                  setAgree(true)
                }}
              >Yes</div>
              <div 
                className="agree-btn"
                onClick={()=>{
                  navigate('/instructions')
                }}
              >No</div>
            </div>
            )
          }
          {
            console.log("kittenda data: ",resultData)
          }
          <TestResult resultData ={resultData}/>
        </div>
        <div className="graph-container">
            {/* Graph container */}
            <Graph resultData={resultData}/>
        </div>
      </div>
      <div className="score-container">
        <div className='result-box-container'>
          <div className="result-box">
            <h3>Score</h3>
            <div className="value-box">
              <h1>{score}</h1>
            </div>
          </div>
          <div className="result-box">
            <h3>Time Taken</h3>
            <div className="value-box">
              <h1>{elapsedTime}sec</h1>
            </div>
          </div>
        </div>
        <div
          className="generate-btn"
          onClick={() => {
            navigate("/roadmap",{state:{wrongTags}});
          }}>
          Generate Roadmap
        </div>
      </div>
    </div>
    </>
  );
}

const TestResult = ({resultData})=> {
  return(
    <div className="test-result-container">
      {
        console.log("vanna data->",resultData)
      }
      <h4>Test Result</h4>
      <div className="test-result-box">
        {
          resultData.map((item,index) => (
            <div 
              className= {`question-no ${item.correct === true ? "correct-box" : "wrong-box" }`}
            >{index+1}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Result;
