import React, { useState } from "react";
import './Open.css';

function Open(props) {
  let [result, setResult] = useState(null);
  return (
    <div className='pd-top-20'>
      <div className="question-text">{props.question.text}</div>
      <div className="open-input-container">
        <textarea className="open-input" rows='10' cols='50' onChange={(value) => { setResult(value) }} />
      </div>
      <div className={"button-container " + (result === null ? 'button__disabled' : 'button__enabled')}>
        <button className="button" disabled={result === null} onClick={() => props.onClick(result)}>Далее</button>
      </div>
    </div>
  );
}

export default Open;
