import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css'

const requireConfig = {
	url: '/require.min.js',
	paths: {
		vs: '/show/vs'
	}
}

export default class Editor extends React.Component {
	editorDidMount = (editor, monaco) => {
		this.props.setEditor(editor)
		monaco.editor.defineTheme('IntelieTheme', {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: 'number', foreground: 'b37edf' },
				{ token: 'number.hex', foreground: 'b37edf' },
				{ token: 'string.key.json', foreground: 'ffffff' },
				{ token: 'string.value.json', foreground: '09daea' },
			],
			colors: {
					'editor.background': '#2e3440',
					'editor.lineHighlightBackground': '#0000FF20',
					'editorLineNumber.foreground': '#313743',
					'editorLineNumber.background': '#60656e',
			}
	});
	monaco.editor.setTheme('IntelieTheme');
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
					requireConfig={requireConfig}
					editorDidMount={this.editorDidMount}
					automaticLayout={false}
				/>
			</div>
		);
	}
}