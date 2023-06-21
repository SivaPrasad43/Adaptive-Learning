import React, { useEffect, useState, useRef } from 'react'
import "./Roadmap.css"
import { data } from './RoadmapData'
import { useLocation } from 'react-router-dom';
import { TagsSorted } from './TagsSorted';
import Navbar from '../../Components/res/Navbar/Navbar';
import Typewriter from 'typewriter-effect';
import Typed from 'react-typed';
import ApiGateway from '../../Service/ApiGateway';
import axios from 'axios';

function Roadmap() {

  const loc = useLocation();

  const TagsNotSortedRef = useRef();
  const SortedListRef = useRef();
  const filterListRef = useRef();

  // console.log(loc.state.wrongTags)

  const [topics, setTopics] = useState(data);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [complete, setComplete] = useState(true)
  const [tagData, setTagData] = useState([])
  const [wrongTags, setWrongTags] = useState([])
  const [wrongTagList, setWrongTagList] = useState([])
  const [sortedTagList, setSortedTagList] = useState([])
  const [filterData, setFilterData] = useState([])
  const [isMarkAsCheckedClicked,setIsMarkAsCheckedClicked] = useState(false)
  const [isReloadClicked,setIsReloadClicked] = useState(false)


  // const sortTags = () => {

  //   SortedListRef.current = sortedList
  //   console.log("ref sorted" , SortedListRef.current)
  // };


  // useEffect(()=>{
  //   fetch('https://opensheet.elk.sh/1t_KZPkSk2xrb1U-ElUbJV6ECa_lOgt94hlqdd5QByaA/Sheet1');
  //   .then(data => response.json())

  //   const result = response.json();
  //   console.log("result", result);
  //   TagsNotSortedRef.current = result
  //   console.log("result ref:",  TagsNotSortedRef.current)
  //   setWrongTags(result);
  //   sortTags() 
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      console.log(localStorage.getItem('testId'))
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/v1/generate-roadmap/${localStorage.getItem('testId')}/`,
        {headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        }})
        // console.log(result.data.response)
        // const response = axios.get(`http://127.0.0.1:8000/api/v1/generate-roadmap/${localStorage.getItem('testId')}/`);
        console.log("roadmap response-->",result.data.response)
        setTagData(result.data.response)
        // const jsonData = await response.json();
        // setWrongTags(jsonData);
        // console.log("response: ", jsonData)
        // console.log("response from result:", loc.state.wrongTags)
        // setWrongTagList(jsonData.map(item => item.tag));
        // // console.log(wrongTagList)
        // console.log("all :", TagsSorted)
        // const sortedList = loc.state.wrongTags.map(item => item.tag).sort((a, b) => TagsSorted.indexOf(a) - TagsSorted.indexOf(b));
        // console.log("sorted: ", sortedList)
        // setSortedTagList(sortedList)

        // const filterList = jsonData.filter(item => sortedList.includes(item.tag));
        // setFilterData(filterList)
        // filterListRef.current = filterList
        // console.log("filter list:", filterList)

      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [isMarkAsCheckedClicked,isReloadClicked]);


  const handleTopic = ({ tag,tagName, tagDisc, tagYoutube,isMarkedAsChecked,isAlreadyKnow }) => {
    setSelectedTopic({ tag,tagName, tagDisc, tagYoutube,isMarkedAsChecked,isAlreadyKnow });
  }

  const markAsComplete = async (tag,isAlreadyKnow) => {
    // setTopics((prevTopics) => prevTopics.filter((topic) => topic.tag_name !== selectedTopic.tagName));
    // setSelectedTopic(null);
    setIsMarkAsCheckedClicked(!isMarkAsCheckedClicked)
    setSelectedTopic(null)
    console.log("TAG IS--->",tag)
    const result = await axios.post(`http://127.0.0.1:8000/api/v1/mark-as-checked/`,
    {
        testId: localStorage.getItem('testId'),
        tagName: tag,
        isMarkedAsChecked: isReloadClicked ? false : true,
        isAlreadyKnow: isAlreadyKnow
    },
    {headers: {
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-Type": "application/json",
    }})
    console.log("mark as complete-->",result)
  };

  useEffect(() => {
    if (topics.length === 0) {
      setComplete(false)
    }
  })


  const TopicItem = ({ count, tag, tagName, tagDisc, tagYoutube,isMarkedAsChecked,isAlreadyKnow }) => {
    return (
      <div
        className={`topic-container ${isMarkedAsChecked ? 'topic-not-clickable' : 'topic-clickable' }`}
        onClick={() => {
          if(!isMarkedAsChecked){
            handleTopic({ tag,tagName, tagDisc, tagYoutube,isMarkedAsChecked,isAlreadyKnow })
          }
        }}
      >
        <div className='topic-value-container'>
          <div className="topic-num">
            <h3>{count}</h3>
          </div>
          <div className="topic-name">{tagName}{isMarkedAsChecked ? '✅' : ''}</div>
        </div>
        {
          isMarkedAsChecked ? (
          <p
            onClick={()=>{
              setIsReloadClicked(true)
              console.log("reload-->",isReloadClicked)
              markAsComplete(tag,isAlreadyKnow)
            }}
          >🔁</p>
          ) : null
        }
      </div>
    )
  }

  


  return (
    <>
      <Navbar DashboardShow={true} />
      {complete ? (
        <div className='road-container'>
          <div className='roadmap'>
            <h1>Roadmap of Subject</h1>
            <div
              className='topic-container start'
            >
                      <div className='topic-value-container'>
              <div className="topic-num start">
                <h3>🚩</h3>
              </div>
              <div className="topic-name">Start</div>
              </div>
            </div>
            {
              tagData.map((item, index) => {
                return (
                  // console.log("map data :",item.youtube)
                  <TopicItem
                    key={item}
                    count={index + 1}
                    tag={item.tag}
                    tagName={item.topic}
                    tagDisc={item.description}
                    tagYoutube={item.reference_link}
                    isMarkedAsChecked = {item.mark_as_completed}
                    isAlreadyKnow = {item.alreadyKnow} />
                )
              })
            }
            <div
              className='topic-container'
            >
                                    <div className='topic-value-container'>
              <div className="topic-num end">
                <h3>🏁</h3>
              </div>
              <div className="topic-name">End</div>
            </div>
            </div>
          </div>
          {selectedTopic ? (
            <div className='disc'>
              <div className='disc-item'>
                <>
                  {
                    console.log("selected tag", selectedTopic.tag)
                  }
                  <h1>💻{selectedTopic.tagName}</h1>
                  {/* <Typewriter
                        options={{
                          delay: 0.1, 
                        }}
                    onInit={(typewriter) => {
                      typewriter.typeString(`${selectedTopic.tagDisc}`)
                        .start();
                    }}
                  /> */}
                  <p dangerouslySetInnerHTML={{ __html: selectedTopic.tagDisc }} />
                  <div className="youtube">
                    <iframe
                      width="560"
                      height="315"
                      src={selectedTopic.tagYoutube}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="disc_bottom_container">
                    {/* <div className="already-know" onClick={markAsComplete()}>
                      I already Know this👍
                    </div> */}
                    <div 
                      className="complt-btn" 
                      onClick={()=>
                      markAsComplete(selectedTopic.tag,selectedTopic.isAlreadyKnow)
                      }>
                      Mark as Completed✅
                    </div>
                  </div>

                </>
              </div>
            </div>
          ) : (
            <div className='no_topic_container'>
              <h1>No topic selected</h1>
            </div>
          )}
        </div>
      ) : (
        <div className='finish-container'>
          <h1>Kazhinjille...Eni pokkoo...</h1>
        </div>
      )
      }
    </>
  )
}

export default Roadmap
