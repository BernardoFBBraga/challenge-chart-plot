import React, { Component } from 'react';
import './App.css';
import ChartEditor from './Components/ChartEditor'
import Button from './Components/Button'

const headerHeight = 64;
const footerHeight = 60;

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			contentHeight: window.innerHeight - footerHeight - headerHeight,
			contentWidth: window.innerWidth,
			errorMessage:null,
		}
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

	setEditor = (editor) => {
		this.editor = editor
	}

	generateChart = () => {
		this.editor.generateChart()
	}

	setErrorMessage = (msg) => {
		this.setState({errorMessage:msg})
	}

	render() {
		return (
			<div className="App">

				<div className="App-header" style={{ height: headerHeight }}>
					bernardofbbraga's Challenge
        </div>
				<div className="App-content">
					<ChartEditor
						ref={this.setEditor}
						height={this.state.contentHeight}
						width={this.state.contentWidth}
						setErrorMessage={this.setErrorMessage}
					/>
				</div>
				<div className="App-footer" style={{ height: footerHeight }}>
					<Button
						text="GENERATE CHART"
						onClick={this.generateChart}
					/>
					<div className="App-error-message">
						{this.state.errorMessage}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
