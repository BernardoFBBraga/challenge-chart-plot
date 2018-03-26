import React, { Component } from 'react';
import Editor from '../Editor'
import ResizeHandle from '../ResizeHandle'
import Chart from 'chart.js' // eslint-disable-line no-unused-vars
import { LineChart } from 'react-chartkick'
import {generateChartState} from '../../lib/codeParser'

const chartMinHeight = 200;
const editorMinHeight = 50;

const testData = [
	{ type: 'start', timestamp: 1519780251293, select: ['min_response_time', 'max_response_time'], group: ['x', 'browser'] },
	{ type: 'span', timestamp: 1519780251293, begin: 1519780251293, end: 1519780260201 },
	{ type: 'data', timestamp: 1519780251000, x: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, x: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
	{ type: 'stop', timestamp: 1519780251293 },
	{ type: 'start', timestamp: 1519780251000, select: ['min_response_time', 'max_response_time'], group: ['os', 'browser'] },
	{ type: 'span', timestamp: 1519780251000, begin: 1519780251000, end: 1519780260201 },
	{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'chrome', min_response_time: 0.1, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'chrome', min_response_time: 0.5, max_response_time: 1.5 },
	{ type: 'data', timestamp: 1519780251000, os: 'linux', browser: 'opera', min_response_time: 0.2, max_response_time: 1.7 },
	{ type: 'data', timestamp: 1519780260201, os: 'linux', browser: 'opera', min_response_time: 0.7, max_response_time: 1.8 },
	{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'opera', min_response_time: 0.9, max_response_time: 1.3 },
	{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'opera', min_response_time: 0.8, max_response_time: 1.2 },
	{ type: 'data', timestamp: 1519780251000, os: 'windows', browser: 'chrome', min_response_time: 0.3, max_response_time: 1.0 },
	{ type: 'data', timestamp: 1519780260201, os: 'windows', browser: 'chrome', min_response_time: 0.2, max_response_time: 1.9 },
	{ type: 'stop', timestamp: 1519780260201 },
]

class ChartEditor extends Component {
	constructor(props) {
		super(props)
		this.state = generateChartState(JSON.stringify(testData))

		this.state.resizeHandlePosition = 300
	}

	moveResizeHandle = newyYPos => this.setState({ resizeHandlePosition: newyYPos })

	generateChart = () => {
		this.setState(generateChartState(this.editor.getModel().getValue()))
	}

	setEditor = (editor) => {
		this.editor = editor
	}

	render() {
		return (
			<React.Fragment>
				<Editor
					defaultValue={this.state.code}
					setEditor={this.setEditor}
					height={this.state.resizeHandlePosition}
					width={this.props.width}
				/>
				<ResizeHandle
					onMove={this.moveResizeHandle}
					min={editorMinHeight}
					max={this.props.height - chartMinHeight}
					pos={this.state.resizeHandlePosition}
				/>
				<div className="App-chart-area" style={{ height: this.props.height - this.state.resizeHandlePosition }}>
					{this.state.data ?
						<LineChart
							data={this.state.data}
							legend={"right"}
							xtitle="Timepoint"
							ytitle="Response Time"
							height={this.props.height - this.state.resizeHandlePosition}
							curve={false}
						/>
						:
						<div>
							Insert data on the editor above and click on the "generate chart" button below
            </div>
					}
				</div>
			</React.Fragment>
		);
	}
}

export default ChartEditor;
