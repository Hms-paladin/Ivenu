import React from 'react';
import './SlotLable.css';
export default class SlotLegend extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='SlotLegendMain'>
				<div className="labelBoxLegend">
				<span className="LegendBox" style={{backgroundColor:this.props.boxColor?this.props.boxColor:'#ffffff',borderRadius:this.props.circle==true?'50%':'',borderColor:this.props.borderColor?this.props.borderColor:''}}></span>
				<p>{this.props.legend&&this.props.legend}</p>
				</div>
			</div>
		);
	}
}
