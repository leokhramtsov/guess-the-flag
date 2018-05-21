import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Questions from './Questions';
import Header from './Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      choices: [],
      correctAnswer: '',
      gotAnswer: false,
      status: 'pending'
    };
    
    this.getChoices = this.getChoices.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.onGuess = this.onGuess.bind(this);
  };
  
  componentDidMount() {
    const url = 'https://restcountries.eu/rest/v2/all';
    // fetching...
    fetch(url)
      .then(data => data.json())
      .then(countries => {
        const correctAnswer = countries[Math.floor(Math.random() * countries.length)];
        const choices = this.getChoices(countries, correctAnswer);
        this.setState({choices, countries, correctAnswer});
      })
  }
  
  // get 4 random choices
  getChoices(arr, correctAnswer) {
    let choices =[];
    for (let i=0; i<3; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      choices.push(arr[randomIndex]);
    }
    choices = [...choices, correctAnswer];
    choices = shuffle(choices);
    return choices;
  }
  
  // generate new question with 4 random choices
  nextQuestion() {
    let {countries} = this.state;
    const correctAnswer = countries[Math.floor(Math.random() * countries.length)];
    const choices = this.getChoices(countries, correctAnswer);
    this.setState({choices, countries, correctAnswer, gotAnswer: false, status: 'pending'});
  }
  
  // check if submited answer is correct
  onGuess(answer) {
    answer === this.state.correctAnswer.name ? 
      this.setState({gotAnswer: true, status: 'completed'}) : 
      this.setState({gotAnswer: false, status: 'completed'})
  }
  
  render() {
    const {countries, choices, correctAnswer, gotAnswer, status} = this.state;
    let output = (<div style={{textAlign: 'center'}}>Loading...</div>)
    if (countries && countries.length > 0) {
      output = (
        <Questions
          answer={correctAnswer}
          choices={choices}
          onGuess={this.onGuess}
          gotAnswer={gotAnswer}
          status={status}
          nextQuestion={this.nextQuestion}
        />
      )
    }
    return (
      <div className="App">
        <Header />
        {output}
      </div>
    );
  }
}

export default App;
