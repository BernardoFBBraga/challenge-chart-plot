import React from 'react';
import './LineChartEmptyState.css'

export default class LineChartEmptyState extends React.Component {
	render(){
		return(
			<div className="LineChartEmptyState">
				<span>
					To generate a chart, insert data on the editor above and click on the "generate chart" button below
				</span>
			</div>
		)
	}
}

