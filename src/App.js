import React, { Component } from 'react';
import './App.css';
import Editor from './Components/Editor'
import Button from './Components/Button'

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          bernardofbbraga's Challenge
        </div>
        <div className="App-content">
          <Editor/>
        </div>
        <div className="App-footer">
          <Button
            text="GENERATE CHART"
          />
        </div>
      </div>
    );
  }
}

export default App;
