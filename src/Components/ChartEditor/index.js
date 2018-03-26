import React, { Component } from 'react';
import Editor from '../Editor'
import ResizeHandle from '../ResizeHandle'
import IntelieChart from '../IntelieChart'
import {generateChartState} from '../../lib/codeParser'

const chartMinHeight = 200;
const editorMinHeight = 50;

class ChartEditor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			code: "",
			data: [],
			dataMap: {},
			begin: 0,
			end: 0,
			resizeHandlePosition: 300,
			errorMessage:null,
		}
	}

	moveResizeHandle = newyYPos => this.setState({ resizeHandlePosition: newyYPos })

	generateChart = () => {
		try{
			this.setState(generateChartState(this.editor.getModel().getValue()))
			this.props.setErrorMessage(null)
		}catch(e){
			this.props.setErrorMessage(e.message)
		}
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
				<IntelieChart
					height={this.props.height - this.state.resizeHandlePosition}
					data={this.state.data}
				/>
			</React.Fragment>
		);
	}
}

export default ChartEditor;
