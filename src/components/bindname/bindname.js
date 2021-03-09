import React from 'react';
import './bindname.css';

export default class Bindname extends React.Component {
	// static propTypes = {
	// 	name:React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="main-bindname">
			<div className="bindname-div">
			<h2>{this.props.text}</h2>
			</div>
			</div>
		);
	}
}
