import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SelectSub.css';

const topicList = [
  {
    "main_topic": "Programming Languages",
    "sub_topics": [
      "Java",
      "C",
      "Python",
      "JavaScript",
      "Ruby",
      "Swift",
      "Go",
      "PHP",
      "C++",
      "Rust"
    ]
  },
   {
    "main_topic": "Web Development",
    "sub_topics": [
      "HTML",
      "CSS",
      "JavaScript",
      "Front-end frameworks",
      "Back-end frameworks",
      "Responsive design",
      "Web security"
    ]
  },
  {
    "main_topic": "Artificial Intelligence",
    "sub_topics": [
      "Neural networks",
      "Reinforcement learning",
      "Computer vision",
      "Natural language processing",
      "AI ethics and responsible AI",
      "AI applications in various fields"
    ]
  },
  {
    "main_topic": "Science",
    "sub_topics": [
      "Physics",
      "Chemistry",
      "Biology",
      "Astronomy",
      "Environmental science",
      "Scientific discoveries",
      "Scientific methods",
      "Science experiments"
    ]
  },
  {
    "main_topic": "Mathematics",
    "sub_topics": [
      "Arithmetic",
      "Algebra",
      "Geometry",
      "Calculus",
      "Statistics",
      "Probability",
      "Number theory",
      "Mathematical puzzles and games"
    ]
  },
  {
    "main_topic": "General Knowledge",
    "sub_topics": [
      "World history",
      "Geography",
      "Famous landmarks",
      "Current affairs",
      "Famous personalities",
      "World records",
      "Cultural traditions",
      "Mythology and folklore"
    ]
  }
]

function SelectSub() {
  return (
    <div className="select_sub_container">
      <div className="select_sub_box">
        <h1>Select subject</h1>
        <div className="sub_items">
          {topicList.map((item) => (
            <MainTopic
              key={item.main_topic}
              topic={item.main_topic}
              sub_topics={item.sub_topics}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const MainTopic = ({ topic, sub_topics }) => {
  const [isExpand, setIsExpand] = useState(false);
  const navigate = useNavigate();

  const handleMainClick = () => {
    setIsExpand(!isExpand);
  };

  const handleSubTopicClick = (item) => {
    if(item==="Python"){
      navigate(`/instructions`);
    }else{
      navigate("/404")
    }
  };

  return (
    <>
      <div className="main_topic" onClick={handleMainClick}>
        <h3>{topic}</h3>
        <i className={`fi ${isExpand ? 'fi-rr-angle-up' : 'fi-rr-angle-down'}`}></i>
      </div>
      {isExpand ? (
        <div className="sub_topics">
          <ul>
            {sub_topics.map((item) => (
              <li key={item} onClick={() => handleSubTopicClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default SelectSub;
