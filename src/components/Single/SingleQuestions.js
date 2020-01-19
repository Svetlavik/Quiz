import React, { useState } from "react";
import './Single.css';

function Single(props) {
  let [result, setResult] = useState(null);
  return (
    <div className='pd-top-20'> 
      <div className="question-text">{props.question.text}</div>
      <div className='single-radio-container'>
        {
          props.question.answers.map((el, i) =>
            <div key={i.toString() + props.question.id}>
              <input type="radio" id={i} value={el} name={props.question.id} onChange={() => { setResult(i) }} />
              <label htmlFor={i}>{el}</label>
            </div>
          )
        }
      </div>
      <div className={"button-container " + (result === null ? 'button__disabled' : 'button__enabled')}>
        <button className="button" disabled={result === null} onClick={() => props.onClick(result)}>Далее</button>
      </div>
    </div>
  )
}

export default Single;
