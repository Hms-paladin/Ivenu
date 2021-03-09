import React from 'react';
import './oval_button.css';

export default class OvalButton extends React.Component {


	render() {
		return (
			<div className="Home_Oval-Button">
				<span className="Home_oval-count">{this.props.count}</span>
				<span className="Home_oval-Name">{this.props.text}</span>
			</div>
		);
	}
}
