import React from "react";
import ReactDOM from "react-dom";

import { fetchPuzzleInput } from "./api";
import { puzzleOptions, solvePuzzle } from "./evaluator";

const styles = {
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  button: {},
  column: {
    flex: 1
  }
};

class App extends React.Component {
  state = {
    selectedPuzzle: "1-1",
    inputData: [],
    outputData: {},
    showInputs: false,
    showOutputs: false
  };

  loadInputs = async () => await fetchPuzzleInput(this.state.selectedPuzzle);

  evaluateOutput = async () => {
    const answer = await solvePuzzle(this.state.selectedPuzzle);
    const outputData = { answer };
    return this.setState({ outputData, showOutputs: true });
  };

  hideOutputs = () => {
    this.setState({ showOutputs: false });
  };

  showInputs = () => {
    this.loadInputs().then(inputData => {
      this.setState({ inputData, showInputs: true });
    });
  };

  hideInputs = () => {
    this.setState({ showInputs: false });
  };

  handlePuzzleSelect = event => {
    this.setState({
      selectedPuzzle: event.target.value,
      showInputs: false,
      showOutputs: false
    });
  };

  render() {
    const {
      selectedPuzzle,
      inputData,
      outputData,
      showInputs,
      showOutputs
    } = this.state;
    return (
      <div style={styles.buttonContainer}>
        <div style={styles.column}>
          <select value={selectedPuzzle} onChange={this.handlePuzzleSelect}>
            {Object.entries(puzzleOptions).map(([id, puzzle]) => (
              <option key={id} value={id}>{`${puzzle.label}${
                puzzle.solved ? " -- SOLVED" : ""
              }`}</option>
            ))}
          </select>
        </div>
        <div style={styles.column}>
          {showInputs ? (
            <React.Fragment>
              <button onClick={this.hideInputs}>Hide Input Data</button>
              {inputData.map(x => <div key={Math.random()}>{x}</div>)}
            </React.Fragment>
          ) : (
            <button
              disabled={!puzzleOptions[selectedPuzzle].hasInputs}
              onClick={this.showInputs}
            >
              Show Input Data
            </button>
          )}
        </div>
        <div style={styles.column}>
          {showOutputs ? (
            <React.Fragment>
              <button onClick={this.hideOutputs}>Hide Output Data</button>
              {Object.entries(outputData).map(([key, val]) => (
                <div key={key}>{`${key}: ${val}`}</div>
              ))}
            </React.Fragment>
          ) : (
            <button
              disabled={!puzzleOptions[selectedPuzzle].solved}
              onClick={this.evaluateOutput}
            >
              Show Output Data
            </button>
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
