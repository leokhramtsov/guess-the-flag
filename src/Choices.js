import React from 'react';
import './Choices.css';

const Choices = props => {
  const {choices, handleSubmit, handleChange} = props;
  let views = choices.map((choice, i) => (
  <label key={i}>
    <input
      type="radio"
      name="flag-choice"
      value={choice.name}
      checked={choice.checked}
      onClick={handleChange}
    />
    {choice.name}
  </label>
  ));
  
  return (
    <form onSubmit={handleSubmit}>
      {views}
      <button type="submit">Guess</button>
    </form>
  )
}

export default Choices;