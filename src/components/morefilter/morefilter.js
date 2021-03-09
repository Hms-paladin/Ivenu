import React from 'react';
import './morefilter.css';

export default class Morefilter extends React.Component {


	constructor(props) {
		super(props);
		// console.log(props)
	}
	
	render() {
		return (
			<div className="moreouter-div" style={{width:this.props.width,justifyContent:this.props.justifycontent}}>
			<div className="more-div"> 
			<div className="More-Filter">{this.props.text}
			<span className="down-span"><i class="fa fa-angle-down down-arrow-i downarrow-icon" aria-hidden="true"></i></span>
			</div>
			</div>
			</div>
		);
	}
}
