import './ResizeHandle.css'
import React from 'react';

export default class extends React.Component {
	startDrag = () => {
		window.addEventListener("mousemove", this.drag)
		window.addEventListener("mouseup", this.stopDrag)
	}
	stopDrag = () => {
		window.removeEventListener("mousemove", this.drag)
		window.removeEventListener("mouseup", this.stopDrag)
	}
	drag = (e) => {
		let elBoundingRect = this.handle.getBoundingClientRect();
		let newPos = e.clientY - (elBoundingRect.top - this.handle.offsetTop)
		if (newPos < this.props.max && newPos > this.props.min) this.props.onMove(newPos)
	}
	componentWillUnmount() {
		window.removeEventListener("mousemove", this.drag)
		window.removeEventListener("mouseup", this.stopDrag)
	}
	setRef = (el) => {
		this.handle = el
	}
	render() {
		return (
			<div
				ref={this.setRef}
				style={{ top: this.props.pos }}
				className="ResizeHandle"
				onMouseDown={this.startDrag}
			/>
		)
	}
}