import React, {Component} from 'react';
import Choices from './Choices';
import Answers from './Answers';
import './Questions.css';

class Questions extends Component {
  static defaultProps = {
    choices: []
  }
  
  constructor(props) {
    super(props);
    this.state = {
      userChoice: undefined
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({userChoice: e.target.value})
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.onGuess(this.state.userChoice);
  }

  render() {
    const {choices, answer, gotAnswer, nextQuestion, status} = this.props;
    let options = choices.map(choice => ({
      ...choice,
      checked: this.state.userChoice === choice.name
    }));
    
    let output = status === 'completed' ? (
      <Answers nextQuestion={nextQuestion} gotAnswer={gotAnswer} answer={answer}/>
    ) : (
    <React.Fragment>
      <Choices
        choices={options}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    </React.Fragment>
    )
    
    return (
      <div className="container">
        <div>
          {output}
        <div>
        </div>
          <img alt={answer.name} src={answer.flag} />
        </div>
      </div>
    );
  }
}

export default Questions;