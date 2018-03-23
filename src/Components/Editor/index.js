import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends React.Component {
	editorDidMount = (editor, monaco) => {
    this.props.setEditor(editor)
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
					defaultValue ={this.props.defaultValue }
					ref={this.setRef}
					width="100%"
					height="300"
					language="json"
					requireConfig={requireConfig}
					editorDidMount={this.editorDidMount}
				/>
			</div>
		);
	}
}