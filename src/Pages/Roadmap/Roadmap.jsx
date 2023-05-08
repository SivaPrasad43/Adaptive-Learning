import React from 'react'
import "./Roadmap.css"

function Roadmap() {
  return (
    <div className='road-container'>
      <div className='roadmap'>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
        <TopicItem/>
      </div>
      <div className='disc'>
        <div className='disc-item'>
          <h1>Python Function</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla pariatur consectetur eos distinctio ducimus ab deleniti assumenda sed sapiente! Sapiente ad asperiores nihil error ab molestias amet quae! Molestiae, mollitia!</p>
          <div className="youtube">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/QMczPHw4nT8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
          <div className="status-container">
            <div className="complt-btn">Mark as Complete</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TopicItem = () => {
  return(
    <div className='topic-container'>
    <div className="topic-num">
      <h3>1</h3>
    </div>
    <div className="topic-name">Python Variables</div>
    </div>
  )
}

export default Roadmap
