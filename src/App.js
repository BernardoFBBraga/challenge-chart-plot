import React, { Component } from 'react';
import './App.css';
import Editor from './Components/Editor'
import Button from './Components/Button'
import Chart from 'chart.js'
import { LineChart } from 'react-chartkick'

const testData={"2017-01-01": 11, "2017-01-02": 6}
const testData2=[
  {type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser']},
  {type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201},
  {type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3},
  {type: 'stop', timestamp: 1519780251293}
]

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      data:JSON.stringify(testData),
    }
  }
  parseCode = (code) =>{
    return code
  }

  generateChart = ()=>{
    this.setState({data:this.parseCode(this.editor.getModel().getValue())})
  }
  setEditor = (editor) => {
    this.editor = editor
  }
  render() {
    return (
      <div className="App">

        <div className="App-header">
          bernardofbbraga's Challenge
        </div>
        <div className="App-content">
          <Editor
            defaultValue={this.state.data}
            setEditor={this.setEditor}
          />
          <div className="App-chart-area">
            {this.state.data?
              <LineChart data={JSON.parse(this.state.data)}/>
              :
              <div>
                Insert data on the editor above and click on the "generate chart" button below
              </div>
            }
          </div>

        </div>
        <div className="App-footer">
          <Button
            text="GENERATE CHART"
            onClick={this.generateChart}
          />
        </div>
      </div>
    );
  }
}

export default App;
