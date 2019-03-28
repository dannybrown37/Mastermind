import React, { Component } from 'react';

class SelectDifficulty extends Component {
  difficultyChange(event) {
    this.props.callback(event.currentTarget.value);
  }
  render() {
    return (
      <div id="difficultyBox">
        <h3 id="selectDifficultyText">Select a new difficulty level to reset the game</h3>
        <form id="selectDifficultyRadios">
          <input type="radio" name="difficulty" value="2"
            onChange={this.difficultyChange.bind(this)} />2
          <input type="radio" name="difficulty" value="3"
            onChange={this.difficultyChange.bind(this)} />3
          <input type="radio" name="difficulty" value="4"
            onChange={this.difficultyChange.bind(this)} />4
          <input type="radio" name="difficulty" value="5"
            onChange={this.difficultyChange.bind(this)} defaultChecked />5
          <input type="radio" name="difficulty" value="6"
            onChange={this.difficultyChange.bind(this)} />6
          <input type="radio" name="difficulty" value="7"
            onChange={this.difficultyChange.bind(this)} />7
          <input type="radio" name="difficulty" value="8"
            onChange={this.difficultyChange.bind(this)} />8
          <input type="radio" name="difficulty" value="9"
            onChange={this.difficultyChange.bind(this)} />9
        </form>
        <h3 id="showDifficulty">Current difficulty level:</h3>
        <h2>{this.props.difficulty}</h2>
      </div>
    );
  }
}

export default SelectDifficulty;
