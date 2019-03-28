import React, { Component } from 'react';

class RulesPopup extends Component {
  render() {
    return (
      <div className = "popup">
        <div className = "popup_inner">
          <h2>How to Play</h2>
          <p id="rulesThemselves">
            1. Select a difficulty.<br/>
            2. A hidden solution is randomly generated consisting
               of four digits from 1 to the difficulty you selected. <br/>
            3. Enter a valid guess (4 digits exactly including only digits
               from 1 to the difficulty level) in the input box and submit.<br/>
            4. Guesses will be shown. Each $ in the feedback column signifies
               a correctly placed number, but not which one.<br/>
            5. You have ten turns to deduce the four numbers and their
               placements in the gameboard.<br/>
            6. Find the answer and you are a Superior Intellect! (You don't
               want to know what you are if you fail.)<br/>
          </p>
          <button id="closeRulesButton" onClick={this.props.closePopup}>
            Close rules
          </button>
        </div>
      </div>
    );
  }
}

export default RulesPopup;
