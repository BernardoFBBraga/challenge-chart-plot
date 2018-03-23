import React from 'react'
import './Button.css'

export default ({ onClick, text, className = "", fullWidth }) => {
	let fullWidthClass = fullWidth ? "Button-full-width" : ""
	return (
		<button
			className={"Button ripple " + className + fullWidthClass}
			onClick={onClick}
		>
			<span className="Button-text">
				{text}
			</span>
		</button>
	)
}