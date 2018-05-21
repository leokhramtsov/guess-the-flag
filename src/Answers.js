import React from 'react';
import './Answers.css';

const Answers = props => {
  const {answer, gotAnswer, nextQuestion} = props;
  let result = gotAnswer ? 
    `Your answer ${answer.name} is correct!`:
    `Your answer is incorrect! Correct answer is ${answer.name}.`

  return (
    <div className="answer">
      {result}
      <button type="button" onClick={() => nextQuestion()}>New Question</button>
    </div>
  )
}

export default Answers;