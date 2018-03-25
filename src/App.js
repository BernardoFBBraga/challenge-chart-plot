import React, { Component } from 'react';
import './App.css';
import Editor from './Components/Editor'
import Button from './Components/Button'
import ResizeHandle from './Components/ResizeHandle'
import Chart from 'chart.js'
import { LineChart } from 'react-chartkick'

const chartMinHeight = 200;
const editorMinHeight = 50;
const headerHeight = 64;
const footerHeight = 60;

const testData = [
	{ type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['x', 'browser'] },
	{ type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201 },
	{ type: 'data', timestamp: 1519780251000, x: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, x: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
	{ type: 'stop', timestamp: 1519780251293 },
	{ type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser'] },
	{ type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201 },
	{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
	{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'opera', min_response_time: 0.2, max_response_time: 1.7 },
	{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'opera', min_response_time: 0.7, max_response_time: 1.8 },
	{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'opera', min_response_time: 0.9, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'opera', min_response_time: 0.8, max_response_time: 1.2 },
	{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'chrome', min_response_time: 0.3, max_response_time: 1.0 },
	{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.9 },
	{ type: 'stop', timestamp: 1519780251293 },
]

class App extends Component {
	constructor(props) {
		super(props)
		this.state = this.generateChartState(JSON.stringify(testData))

		this.state.resizeHandlePosition = 300
		this.state.contentHeight = window.innerHeight - footerHeight - headerHeight;
		this.state.contentWidth = window.innerWidth
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateContentSize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateContentSize)
	}

	updateContentSize = () => {
		this.setState({
			contentHeight: window.innerHeight - footerHeight - headerHeight,
			contentWidth: window.innerWidth
		})
	}

	moveResizeHandle = newyYPos => this.setState({ resizeHandlePosition: newyYPos })

	generateChartState = (JSONcode) => {
		let code = JSON.parse(JSONcode)
		let select, group, begin, end, chartDataArr, dataMap
		for (let i = 0; i < code.length; i++) {
			switch (code[i].type) {
				case 'start':
					select = code[i].select
					group = code[i].group
					chartDataArr = []
					dataMap = {}
					break;
				case 'span':
					begin = code[i].begin
					end = code[i].end
					break;
				case 'data':
					select.forEach(s => {
						let lineName = ""
						group.forEach(g => {
							lineName += (code[i][g] + " ")
						})
						lineName += s
						if (!dataMap[lineName]) {
							dataMap[lineName] = { name: lineName, data: {} }
							chartDataArr.push(dataMap[lineName])
						}
						//add new data point to the existing object
						dataMap[lineName].data[code[i].timestamp] = code[i][s]
					})
					break;
				default:
					break;
			}

		}
		return {
			code: JSONcode,
			data: chartDataArr,
			dataMap: dataMap,
			begin,
			end,
		}
	}

	generateChart = () => {
		this.setState(this.generateChartState(this.editor.getModel().getValue()))
	}

	setEditor = (editor) => {
		this.editor = editor
	}

	render() {
		return (
			<div className="App">

				<div className="App-header" style={{ height: headerHeight }}>
					bernardofbbraga's Challenge
        </div>
				<div className="App-content">
					<Editor
						defaultValue={this.state.code}
						setEditor={this.setEditor}
						height={this.state.resizeHandlePosition}
						width={this.state.contentWidth}
					/>
					<ResizeHandle
						onMove={this.moveResizeHandle}
						min={editorMinHeight}
						max={this.state.contentHeight - chartMinHeight}
						pos={this.state.resizeHandlePosition}
					/>
					<div className="App-chart-area" style={{ height: this.state.contentHeight - this.state.resizeHandlePosition }}>
						{this.state.data ?
							<LineChart
								data={this.state.data}
								legend={"right"}
								xtitle="Timepoint"
								ytitle="Response Time"
								height={this.state.contentHeight - this.state.resizeHandlePosition}
							/>
							:
							<div>
								Insert data on the editor above and click on the "generate chart" button below
              </div>
						}
					</div>

				</div>
				<div className="App-footer" style={{ height: footerHeight }}>
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
