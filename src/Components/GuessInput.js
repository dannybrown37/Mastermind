import React, { Component } from 'react';

class GuessInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      guesses: [],
      feedback: [],
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.difficulty !== prevProps.difficulty) {
      this.setState({
        guesses: [],
        feedback: []
      });
    }
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // prevent default page reload
    if (this.handleValidation()) { // if entry is validated
      const joined = this.state.guesses.concat(this.state.input);
                    // add it to the list of guesses
      this.setState({
        guesses: joined // set list of guesses as our state
      });
      this.handleGuess(); // now check if guess wins and offer feedback
    }
    this.setState({ // reset input field after a submit
      input: ""
    });
  }

  handleValidation() {
    let input = this.state.input;
    let error = (
      "Guess must be exactly four digits and consist of numerals between 1 and "
      + this.props.difficulty + " only."
    );
    let formIsValid = true;
    // length of 4 required
    if (input.length !== 4) { // check for length of 4 exactly in input
      formIsValid = false;
    }
    // numbers only and within difficulty range required
    let isNumString= "^[1-9]+$".replace("9", this.props.difficulty);
    let isNumRegex = new RegExp(isNumString, "g");
    let isNum = isNumRegex.test(input);
    if (!isNum) { // check that input is only digits of 1 through current diff
      formIsValid = false;
    }
    if (!formIsValid) {
      this.setState({error: error},
        () => { // callback function to print error after state has updated
          alert(this.state.error)
          // required or error won't show first time due to async updating
        }
      );
    }
    return formIsValid;
  }

  handleGuess() {
    let lastGuess = this.state.input; // select last valid guess
    if (lastGuess === this.props.gameboard) { // compare last guess to gameboard
      const feedbackWin = this.state.feedback.concat("You win!");
      this.setState({
        feedback : feedbackWin // it's easy if they win
      });
    } else { // Otherwise...
      let currentFeedback = "";
      for (let i = 0; i < 4; i++) {
        if (lastGuess[i] === this.props.gameboard[i]) {
          currentFeedback += "$"
        }
      }
      if (currentFeedback === "") {
        currentFeedback = "No matches"
      }
      const joinedFeedback = this.state.feedback.concat(currentFeedback);
      this.setState({
        feedback : joinedFeedback
      });
    }
  }

  render() {
    const guessList = this.state.guesses.map(
      i => <li key={i + Math.random()}>{i}</li>
    );
    const feedbackList = this.state.feedback.map(
      i => <li key={i + Math.random()}>{i}</li>
    );
    const disabled = (
      this.state.guesses.length >= 10
      ||
      this.state.feedback[this.state.feedback.length - 1] === "You win!"
    );
    let gameName = "Superior Intellect?";
    let answer = ""
    if (this.state.guesses.length === 10 && this.state.feedback[9] !== "You win!") {
      gameName = "Inferior Dunce 😜";
      answer = "The answer was " + this.props.gameboard;
    } else if (this.state.feedback[this.state.feedback.length - 1] === "You win!") {
      gameName = "Superior Intellect 🏆"
    }
    return (
    <div>
      <div id="guessbox">
        <h1>{gameName}</h1>
        <h4>{answer}</h4>
        <h4>Remaining guesses: {10 - this.state.guesses.length}</h4>
        <form name="guessForm" onSubmit={this.handleSubmit}>
          <input id="guessField" value={this.state.input}
            onChange={this.handleChange} autoComplete="off" required autoFocus />
          <button id="guessButton" type="submit" disabled={disabled}>
            It's Mastermind!
          </button>
        </form>
      </div>

      <div id="guessFeedbackGrid">
        <div id="guessesList">
          <h4 className="columnHead">Guesses</h4>
          <ul>
            {guessList}
          </ul>
        </div>
        <div id="feedbackList">
          <h4 className="columnHead">Feedback</h4>
          <ul>
            {feedbackList}
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

export default GuessInput;
