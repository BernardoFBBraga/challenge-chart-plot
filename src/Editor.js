import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
		}
	}


	render() {
		const requireConfig = {
			url: '/require.min.js',
			paths: {
				vs: '/show/vs'
			}
		};
		return (
			<div>
				<MonacoEditor
					width="100%"
					height="600"
					language="json"
					defaultValue={this.state.code}
					requireConfig={requireConfig}
				/>
			</div>
		);
	}
}