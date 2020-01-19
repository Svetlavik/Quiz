import React, { useState } from "react";
import './Open.css';

function Open(props) {
  let [result, setResult] = useState(null);
  return (
    <div className='pd-top-20'>
      <div className="question-text">{props.question.text}</div>
      <div className="open-input-container">
        <textarea className="open-input" rows='10' cols='50' onChange={(event) => { setResult(event.target.value) }} />
      </div>
      <div className={"button-container " + (result ? 'button__enabled' : 'button__disabled')}>
        <button className="button" disabled={!result} onClick={() => props.onClick(result)}>Далее</button>
      </div>
    </div>
  );
}

export default Open;
