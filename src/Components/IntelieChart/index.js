import React, { Component } from 'react';
import Chart from 'chart.js' // eslint-disable-line no-unused-vars
import { LineChart } from 'react-chartkick'
import LineChartEmptyState from '../LineChartEmptyState'
import './IntelieChart.css';

function formattedXAxisLabel(timestamp){
	let date = new Date(Number(timestamp))
	console.log(date,timestamp)
	return `${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`
}

const libraryOptions = {
	scales: {
			xAxes: [{
					ticks: {
							// Include a dollar sign in the ticks
							callback: function(value, index, values) {
									return formattedXAxisLabel(value);
							}
					}
			}]
	},
	layout: {
		padding: {
				left: 0,
				right: 0,
				top: 20,
				bottom: 20
		}
	}
}

class IntelieChart extends Component {
	render() {
		return (
			<div className="IntelieChart" style={{ height: this.props.height}}>
				{this.props.data.length > 0 ?
					<LineChart
						data={this.props.data}
						legend={"right"}
						xtitle="Timepoint"
						ytitle="Response Time"
						height={this.props.height}
						curve={false}
						library= {libraryOptions}
					/>
					:
					<LineChartEmptyState/>
				}
			</div>
		);
	}
}

export default IntelieChart;
