import React, { Component } from 'react';
import './App.css';
import RulesPopup from './Components/RulesPopup';
import GuessInput from './Components/GuessInput';
import SelectDifficulty from './Components/SelectDifficulty';

class Mastermind extends Component {
  constructor() {
    super();
    this.state = {
      difficulty : 5,
      gameboard : "",
      showPopup : false
    };
  }

  // generate a random gameboard on default difficulty (5) on component mounting
  componentDidMount() {
    this.generateGameboard();
  }

  // generate a new gameboard whenever user selects a new difficulty
  componentDidUpdate(prevProps, prevState) {
    if (prevState.difficulty !== this.state.difficulty) {
      this.generateGameboard();
    }
  }

  // get the difficulty the user selected with the SelectDifficulty component
  getDifficulty(newDifficulty) {
    this.setState({
      difficulty: newDifficulty
    });
  }

  // generate a game board based on the difficulty
  generateGameboard() {
    let board = ""
    for (let i = 0; i < 4; i++) {
      board += (Math.floor(Math.random() * (this.state.difficulty)) + 1).toString();
    }
    this.setState({
      gameboard : board
    })
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    return (
      <div id="mainDiv">
        { /* <div>For Debugging Only: Answer is {this.state.gameboard}</div>  */ }
        <SelectDifficulty
          callback={this.getDifficulty.bind(this)}
          difficulty={this.state.difficulty}
        />
        <button
          id="openRulesButton"
          onClick={this.togglePopup.bind(this)}
        >
          See the rules
        </button>
        <GuessInput
          difficulty={this.state.difficulty}
          gameboard={this.state.gameboard}
        />
        {this.state.showPopup ?
          <RulesPopup
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

export default Mastermind;
