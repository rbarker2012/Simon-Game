import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const sound1 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
const sound2 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
const sound3 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
const sound4 = new Audio(
  "http://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

//genereate Simons first move
const first = Math.floor(Math.random() * 4 + 1);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blinkGreen: [],
      binkRed: [],
      binkYellow: [],
      binkBlue: [],
      simonSequence: [first],
      userSequence: []
    };
  }

  //Start the Game (play Simons First Sequence)
  startGame = async () => {
    await this.setState({ simonSequence: [first] });
    this.blinkEach();
  };

  //generate Simons next move
  nextLevel = () => {
    const addSequence = this.state.simonSequence.slice();
    const newEntry = Math.floor(Math.random() * 4 + 1);
    addSequence.push(newEntry);
    this.setState({
      simonSequence: addSequence
    });
  };

  //Run each number of the sequence
  blinkEach = () => {
    this.state.simonSequence.map((item, index) => {
      setTimeout(() => {
        this.blinkCheck(item);
      }, index * 1000);
    });
  };

  //make the color blink and play sound
  blinkCheck = item => {
    const blinkValue = 0.75;
    const blinkLength = 500;

    if (item == 1) {
      this.setState({
        blinkGreen: [blinkValue]
      });
      sound1.play();
      setTimeout(() => {
        this.setState({
          blinkGreen: []
        });
      }, blinkLength);
    } else if (item == 2) {
      this.setState({
        blinkRed: [blinkValue]
      });
      sound2.play();
      setTimeout(() => {
        this.setState({
          blinkRed: []
        });
      }, blinkLength);
    } else if (item == 3) {
      this.setState({
        blinkYellow: [blinkValue]
      });
      sound3.play();
      setTimeout(() => {
        this.setState({
          blinkYellow: []
        });
      }, blinkLength);
    } else if (item == 4) {
      this.setState({
        blinkBlue: [blinkValue]
      });
      sound4.play();
      setTimeout(() => {
        this.setState({
          blinkBlue: []
        });
      }, blinkLength);
    }
  };

  //define user sequence click
  userClick = colorNum => {
    const addSequence = this.state.userSequence.slice();
    addSequence.push(colorNum);
    this.setState({
      userSequence: addSequence
    });
    this.blinkCheck(colorNum);
    setTimeout(() => {
      this.sequenceCheck();
    }, 500);
  };

  //checking simonsSequence vs userSequence
  sequenceCheck = () => {
    const simon = this.state.simonSequence;
    const user = this.state.userSequence;
    //check for  wrong sequence
    user.map((item, index) => {
      if (item !== simon[index]) {
        this.setState({
          userSequence: []
        });
        sound1.play();
        sound2.play();
        sound3.play();
        sound4.play();
      }
    });
    //correct sequence,
    if (simon.length === user.length) {
      this.setState({ userSequence: [] });
      setTimeout(() => {
        this.nextLevel();
        this.blinkEach();
      }, 500);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="Simon">
          <div
            className="Green"
            style={{ opacity: `${this.state.blinkGreen}` }}
            onClick={() => this.userClick(1)}
          />

          <div
            className="Red"
            style={{ opacity: `${this.state.blinkRed}` }}
            onClick={() => this.userClick(2)}
          />

          <div
            className="Yellow"
            style={{ opacity: `${this.state.blinkYellow}` }}
            onClick={() => this.userClick(3)}
          />

          <div
            className="Blue"
            style={{ opacity: `${this.state.blinkBlue}` }}
            onClick={() => this.userClick(4)}
          />

          <div className="ControlPanel">
            <button onClick={() => this.startGame()}>Start Game / Reset</button>
            <button onClick={() => this.blinkEach()}>Replay Sequence</button>
          </div>
        </div>

        <div>Number of Steps :{this.state.simonSequence.length}</div>
        <div>Simon's Sequence :{this.state.simonSequence}</div>
        <div>User Sequence :{this.state.userSequence}</div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
