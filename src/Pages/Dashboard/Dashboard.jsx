import React,{useEffect,useState} from 'react'
import ApiGateway from '../../Service/ApiGateway'

import './Dashboard.css'

import Navbar from '../../Components/res/Navbar/Navbar'
import CircularProgressBar from '../../Components/CircleProgress/CircleProgress'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'

const data = [
    {
        subName: 'Python',
        subProf: 'Beginner',
        subPerc: 50
    },
    {
        subName: 'HTML',
        subProf: 'Intermediate',
        subPerc: 70
    },
    {
        subName: 'CSS',
        subProf: 'Advanced',
        subPerc: 90
    },
    {
        subName: 'JavaScript',
        subProf: 'Beginner',
        subPerc: 50
    }
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
    // {
    //     subName: 'JavaScript',
    //     subProf: 'Beginner',
    //     subPerc: 50
    // },
]

function Dashboard() {

    const [userName,setUserName] = useState("")

    const user  = useRef(null)

    const navigate = useNavigate()

    // const checkUserStatus = async () => {
    //     if (localStorage.getItem('accessToken')) {
    //         const result = await ApiGateway.get('/api/v1/info/')
    //         console.log("this is result-->",result)
    //         // const result = await axios.get("http://127.0.0.1:8000/api/v1/info/",
    //         // {headers: {
    //         //   "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
    //         //   "Content-Type": "application/json",
    //         // }})
    //       setUserName(result.data.response.name)
    //     } 
    // }

    const checkUserStatus = async () => {
      if (localStorage.getItem('accessToken')) {
        const result = await axios.get("http://127.0.0.1:8000/api/v1/info/",
        {headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        }})
        console.log(result.data.response)
        setUserName(result.data.response.name);
      }
    }

    useEffect(()=>{
      checkUserStatus()
    },[])

    // useEffect(()=>{
    //     const checkUserStatus = async () => {
    //       console.log("dashboardle accesstoken-->",localStorage.getItem('accessToken'))
    //         if (localStorage.getItem('accessToken')) {
    //           setIsLoading(true)
    //           console.log("new access token-->",localStorage.getItem('accessToken'))
    //           const result = await ApiGateway.get('/api/v1/info/');
    //           console.log('this is result-->', result);
    //           // const result = await axios.get("http://127.0.0.1:8000/api/v1/info/",
    //           // {headers: {
    //           //   "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
    //           //   "Content-Type": "application/json",
    //           // }})
    //           localStorage.setItem('user', result.data.response.name)
    //           setUserName(result.data.response.name);
    //         }
    //       };
        
    //       checkUserStatus();
    //       setIsLoading(false);

    //       const storedUser = localStorage.getItem('user');
    //       if (storedUser) {
    //         user.current = storedUser;
    //       }
    // },[])

    const handleAddSub = () => {
        navigate('/select-sub')
    }

    return (
        <>
      <Navbar />
      <div className='dashboard_container'>
        <div className="profile_container">
              <h1>Hi {userName} 👋</h1>
              <p>You've made remarkable progress on your journey. <br /> Stay on course, for you're on the right track! <br /><br />
                Always remember that those who constantly challenge themselves are the ones who succeed.
                Within you lies tremendous untapped potential. Unleash it, and witness the extraordinary feats
                you can achieve.</p>
        </div>
        <div className="subject_container">
          <h2>Your Subjects</h2>
          <div className="add_btn" onClick={handleAddSub}>
            <h2>+</h2>Add Subject
          </div>
        </div>
        <div className="card_container">
          {data.map(item => (
            <SubCard
              key={item.subName} // Add a key prop to avoid React warning
              subName={item.subName}
              subProf={item.subProf}
              subPerc={item.subPerc}
            />
          ))}
        </div>
      </div>
    </>
    )
}

const SubCard = ({subName,subProf,subPerc}) => {
    return (
        <div className="sub_card">
            {/* <img className='sub_img' src="../" alt="sub img"/> */}
            <div className="sub_data">
                <div className="sub_details">
                    <h2>{subName}</h2>
                    <h3>{subProf}</h3>
                </div>
                <CircularProgressBar
                    selectedValue={subPerc}
                    maxValue={100}
                    radius={30}
                    strokeWidth={6}
                    activeStrokeColor='rgb(22, 150, 99)'
                    backgroundColor='#161520'
                    textColor='white'
                    valueFontSize={22}
                />
            </div>
            <div className="view_btn">View Roadmap</div>
        </div>
    )
}

export default Dashboard
