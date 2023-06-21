import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SelectSub.css';

const topicList = [
  {
    main_topic: 'Programming Language',
    sub_topics: ['Python', 'Java', 'C', 'C++', 'HTML'],
  },
  {
    main_topic: 'Programming',
    sub_topics: ['Python', 'Java'],
  },
];

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
    navigate(`/instructions`);
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
