import React from "react";
import './Info.css';

function Info(props) {

  return (
    <div className="info-container">
      <div className="question-text">{props.question.text}</div>
      <div className="button-container button__enabled">
        <button className="button" onClick={props.onClick}>
          {props.question.restart ? 'Начать заново' : 'Далее'}
        </button>
      </div>
    </div>
  );
}

export default Info;
