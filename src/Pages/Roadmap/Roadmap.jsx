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

import { Configuration, OpenAIApi } from "openai";
import ChatBot from 'react-simple-chatbot';


const TopicItem = (
  { 
    count, 
    tag, 
    tagName, 
    tagDisc, 
    tagYoutube, 
    isMarkedAsChecked, 
    isAlreadyKnow, 
    isReloadShow,
    handleTopic,
    setAskDoubtShow,
    setSelectedTopic,
    setIsReloadClicked,
    markAsComplete
  }
  ) => {
  return (
    <div
      className={`topic-container ${isMarkedAsChecked ? 'topic-not-clickable' : 'topic-clickable'}`}
      onClick={() => {
        if (!isMarkedAsChecked) {
          handleTopic({ tag, tagName, tagDisc, tagYoutube, isMarkedAsChecked, isAlreadyKnow })
          setAskDoubtShow(false)
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
        isReloadShow ? (
          <p
            onClick={() => {
              setSelectedTopic({ tag, tagName, tagDisc, tagYoutube, isMarkedAsChecked, isAlreadyKnow });
              setIsReloadClicked(true)
              markAsComplete(tag, isAlreadyKnow, true)
            }}
          >🔁</p>
        ) : null
      }
      {/* <p>{isReloadClicked.toString()}</p>
      <p>{isMarkedAsChecked.toString()}</p> */}
      {/* <p>{tag}</p> */}
    </div>
  )
}

const ChatBox = ({ askDoubtShow, setBotDataLoaded,loadingStepTwo,setLoadingStepTwo}) => {
  const [loadingIntro, setLoadingIntro] = useState(false);
  const [loadingDoubt, setLoadingDoubt] = useState(false);
  const [result, setResult] = useState('');
  const [newPreviousValue, setNewPreviousValue] = useState('');

  const doubtRef = useRef('Ok..Tell me Whta is your doubt?');
  const [doubtData, setDoubtData] = useState('nothing');
  const introDialogueRef = useRef('hello');

  const getIntroMsg = async () => {
    setLoadingIntro(true);
    try {
      const configuration = new Configuration({
        organization: 'org-AfS54ICvYam62MCcEAn1HCgS',
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `You are a Python Tutor and your student asked a doubt that student:hi\n You:`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:'],
      });

      introDialogueRef.current = response.data.choices[0].text;
      localStorage.setItem('introDialog', response.data.choices[0].text);
    } catch (error) {
      console.error('Failed to retrieve intro message:', error);
    } finally {
      setLoadingIntro(false);
    }
  };

  useEffect(() => {
    getIntroMsg()
  }, []);

  const getDoubtAnswer = async (doubtValue) => {
    setLoadingDoubt(true);

    try {
      const configuration = new Configuration({
        organization: 'org-AfS54ICvYam62MCcEAn1HCgS',
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `You are a Python Tutor and your student asked a doubt that student:${doubtValue}\n You:`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ['You:'],
      });

      doubtRef.current = response.data.choices[0].text;
      setDoubtData(response.data.choices[0].text);
      localStorage.setItem('doubtData', response.data.choices[0].text);
    } catch (error) {
      console.error('Failed to retrieve doubt answer:', error);
    } finally {
      setLoadingDoubt(false);
    }
  };

  const handleStepTwo = ({ steps, triggerNextStep }) => {
    setLoadingStepTwo(true);
    setLoadingIntro(true);
    setNewPreviousValue(steps[2].message);
    const doubtValue = steps[2].message;

    const fetchData = async()=> {
      await getDoubtAnswer(doubtValue);
      setLoadingStepTwo(false);
    }
    try{
      fetchData();
      return '3'
    }catch(err){ 
      throw err;
    }
  };

  return (
    <div className="chat_container">
      {
        console.log(loadingIntro,loadingStepTwo)
      }
      {loadingIntro && loadingStepTwo ? (
        <div>Loading...</div>
      ) : (
            <ChatBot
          headerTitle="Python Tutor"
          recognitionEnable={true}
          // speechSynthesis={{ enable: true, lang: 'en' }}
          steps={[
            {
              id: '1',
              message:  loadingStepTwo ? introDialogueRef.current :doubtRef.current ,
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: (value) => handleStepTwo(value),
            },
            {
              id: '3',
              message:  "end",
              end: true,
            },
          ]}
          // shouldComponentUpdate={shouldBotUpdate}
        />
      )}
    </div>
  );
};



const SelectedBox = (
  {
    selectedTopic,
    alreadyKnow,
    setIsReloadClicked,
    markAsComplete,
    setAskDoubtShow,
    askDoubtShow,
    setBotDataLoaded
  }
) => {
  const [loadingStepTwo, setLoadingStepTwo] = useState(true);
  return(
    <div className='disc'>
    <div className='disc-item'>
      <>
        {
          console.log("selected tag", selectedTopic.tag)
        }
        <h1>💻{selectedTopic.tagName}</h1>
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
          <div className="already-know"
            onClick={() =>
              alreadyKnow(selectedTopic.tag, selectedTopic.isAlreadyKnow)
            }>
            I already Know this👍
          </div>
          <div
            className="complt-btn"
            onClick={() => {
              setIsReloadClicked(false)
              markAsComplete(selectedTopic.tag, selectedTopic.isAlreadyKnow)
            }
            }>
            Mark as Completed✅
          </div>
          <div
            className="doubt-btn"
            onClick={() => {
              setAskDoubtShow(!askDoubtShow)
              // markAsComplete(selectedTopic.tag,selectedTopic.isAlreadyKnow)
            }
            }>
            Ask Doubt to AI Tutor🤖
          </div>
        </div>
        {askDoubtShow && (
          <ChatBox
          askDoubtShow={askDoubtShow}
          setBotDataLoaded={setBotDataLoaded}
          loadingStepTwo={loadingStepTwo}
          setLoadingStepTwo={setLoadingStepTwo}
           />
        )}
      </>
    </div>
  </div>
  )
}

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
  const [isMarkAsCheckedClicked, setIsMarkAsCheckedClicked] = useState(false)
  const [isReloadClicked, setIsReloadClicked] = useState(false)
  const [isAlreadyKnowClicked, setIsAlreadyKnowClicked] = useState(false)
  const [askDoubtShow, setAskDoubtShow] = useState(false)
  const [botDataLoaded, setBotDataLoaded] = useState(false)



  useEffect(() => {
    const fetchData = async () => {
      console.log(loc.state)
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/v1/generate-roadmap/${loc.state.testId}/`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
              "Content-Type": "application/json",
            }
          })
        console.log("roadmap response-->", result.data.response)
        setTagData(result.data.response.filter(item => item.alreadyKnow === false))
        setIsAlreadyKnowClicked(false)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [isMarkAsCheckedClicked, isReloadClicked, isAlreadyKnowClicked]);

  useEffect(() => {
    setIsReloadClicked(true)
  }, [])

  const handleTopic = ({ tag, tagName, tagDisc, tagYoutube, isMarkedAsChecked, isAlreadyKnow }) => {
    setSelectedTopic({ tag, tagName, tagDisc, tagYoutube, isMarkedAsChecked, isAlreadyKnow });
  }

  const markAsComplete = async (tag, isAlreadyKnow, isReloadClicked) => {
    setIsMarkAsCheckedClicked(!isMarkAsCheckedClicked)
    setSelectedTopic(null)
    console.log("TAG IS--->", tag)
    const result = await axios.post(`http://127.0.0.1:8000/api/v1/mark-as-checked/`,
      {
        testId: loc.state.testId,
        tagName: tag,
        isMarkedAsChecked: isReloadClicked ? false : true,
        isAlreadyKnow: isAlreadyKnow
      },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        }
      })
    console.log("mark as complete-->", result)
    setIsReloadClicked(true)
  };


  const alreadyKnow = async (tag, isAlreadyKnow) => {
    console.log("hello")
    setSelectedTopic(null)
    await axios.post(`http://127.0.0.1:8000/api/v1/mark-as-checked/`,
      {
        testId: loc.state.testId,
        tagName: tag,
        isAlreadyKnow: true
      },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        }
      })
    setIsAlreadyKnowClicked(true)
  }

  useEffect(() => {
    if (topics.length === 0) {
      setComplete(false)
    }
  },[])

  return (
    <>
      <Navbar DashboardShow={true} />
      {
        console.log("ithann complete-->",complete)
      }
      {complete ? (
        <div className='road-container'>
          <div className='roadmap'>
            <h1>Roadmap of Subject</h1>
            <div
              className='topic-container start'
            >
              <div className='topic-value-container'>
                <div className="topic-num start">
                  <h3>🏳️</h3>
                </div>
                <div className="topic-name">Start</div>
              </div>
            </div>
            {
              tagData.map((item, index) => {
                return (
                  // console.log("map data :",item.youtube)
                  <TopicItem
                    key={index}
                    count={index + 1}
                    tag={item.tag}
                    tagName={item.topic}
                    tagDisc={item.description}
                    tagYoutube={item.reference_link}
                    isMarkedAsChecked={item.mark_as_completed}
                    isAlreadyKnow={item.alreadyKnow}
                    isReloadShow={item.mark_as_completed}
                    handleTopic = {handleTopic}
                    setAskDoubtShow={setAskDoubtShow}
                    setSelectedTopic={setSelectedTopic}
                    setIsReloadClicked={setIsReloadClicked}
                    markAsComplete ={markAsComplete}
                  />
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
           <SelectedBox
           selectedTopic={selectedTopic}
           alreadyKnow={alreadyKnow}
           setIsReloadClicked={setIsReloadClicked}
           markAsComplete={markAsComplete}
           setAskDoubtShow={setAskDoubtShow}
           askDoubtShow={askDoubtShow}
           setBotDataLoaded={setBotDataLoaded}
           />
          ) : (
            <div className='no_topic_container'>
              <h1>No topic selected</h1>
            </div>
          )}
        </div>
      ) : (
        <div className='finish-container'>
          <h1>Finishd!!</h1>
        </div>
      )
      }
    </>
  )
}

export default Roadmap
