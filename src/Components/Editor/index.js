import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const requireConfig = {
	url: '/require.min.js',
	paths: {
		vs: '/show/vs'
	}
}

export default class Editor extends React.Component {
	editorDidMount = (editor, monaco) => {
		this.props.setEditor(editor)
	}
	render() {
		return (
			<div>
				<MonacoEditor
					defaultValue={this.props.defaultValue}
					ref={this.setRef}
					width={this.props.width}
					height={this.props.height}
					language="json"
					theme="vs-dark"
					requireConfig={requireConfig}
					editorDidMount={this.editorDidMount}
					automaticLayout={false}
				/>
			</div>
		);
	}
}