import React, { useEffect, useState } from 'react'
import "./Roadmap.css"
import { data } from './RoadmapData'

function Roadmap() {

  const [topics, setTopics] = useState(data);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [complete,setComplete] = useState(true)

  const handleTopic = ({tagName,tagDisc,youtube})=> {
    console.log(tagName,tagDisc,youtube)
    setSelectedTopic({ tagName, tagDisc, youtube });
  }

  const markAsComplete = () => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic.tag_name !== selectedTopic.tagName));
    setSelectedTopic(null);
  };

  useEffect(()=>{
    if(topics.length === 0){
      setComplete(false)
    }
  })


  const TopicItem = ({count,tagName,tagDisc,youtube}) => {
    return(
      <div 
        className='topic-container'
        onClick={()=>{
          handleTopic({tagName,tagDisc,youtube})
        }}
        >
        <div className="topic-num">
          <h3>{count}</h3>
        </div>
        <div className="topic-name">{tagName}</div>
      </div>
    )
  }


  return (
    <>
      { complete ? (
          <div className='road-container'>
          <div className='roadmap'>
            {
              topics.map((item,index)=>{
                return(
                  // console.log("map data :",item.tag_name)
                  <TopicItem 
                    key={item.tagid}
                    count={index+1} 
                    tagName={item.tag_name}
                    tagDisc={item.description}
                    yoututbe={item.youtube}/>
                )
              })
            }
          </div>
          <div className='disc'>
            <div className='disc-item'>
            {selectedTopic ? (
                <>
                  <h1>{selectedTopic.tagName}</h1>
                  <p>{selectedTopic.tagDisc}</p>
                  <div className="youtube">
                    <iframe
                      width="560"
                      height="315"
                      src={selectedTopic.youtube}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="status-box-container">
                    <div className="complt-btn" onClick={markAsComplete}>
                      Mark as Complete
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h1>No topic selected</h1>
                </div>
              )}
            </div>
          </div>
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
