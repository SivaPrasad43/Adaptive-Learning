import React, { useEffect, useState } from "react";
import Navbar from "../../Components/res/Navbar/Navbar";
import "./TestPage.css";
import axios from "axios";

const TestPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    "https://opensheet.elk.sh/1Bb2QOpmm3PualZY_SFQkeV6uy6EKM1tRDRFySWEe130/Sheet1"
                );
                setData(result.data[Math.floor(Math.random() * 50)]);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
            <>
                <Navbar />
                <div className="qn-container">
                    <div className="qn-box">
                        {loading ? 
                        (<Loading value={"Loading..."}/>) 
                        : data ? <QuestionBox data={data}/>
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
    return(
            <>
                <h3>Question #{data.qid}</h3>
                <h1>{data.question}</h1>
                <div className="option-container">
                    <div 
                        className={`option-box ${active==='a'? "active":null}`}
                        onClick={() => {
                            setUserOption(data.a)
                            setActive('a')
                            console.log(data.a)
                        }}>
                        <h3>{data.a}</h3>
                    </div>
                    <div 
                        className={`option-box ${active==='b'? "active":null}`}
                        onClick={() => {
                            setUserOption(data.b)
                            setActive('b')
                            console.log(data.b)
                        }}>
                        <h3>
                            {data.b}
                        </h3>
                    </div>
                    <div 
                        className={`option-box ${active==='c'? "active":null}`}
                        onClick={() => {
                            setUserOption(data.c)
                            setActive('c')
                            console.log(data.c)
                        }}>
                        <h3>
                            {data.c}
                        </h3>
                    </div>
                    <div 
                        className={`option-box ${active==='d'? "active":null}`}
                        onClick={() => {
                            setUserOption(data.d)
                            setActive('d')
                            console.log(data.d)
                        }}>
                        <h3>
                            {data.d}
                        </h3>
                    </div>
                </div>
                <div className="submit-btn btn">
                    <a href="#">Submit</a>
                </div>
            </>
            )
}
export default TestPage;
