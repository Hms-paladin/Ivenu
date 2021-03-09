
import React from 'react';
import './nextarrow.css'

export default class Nextarrow extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="nextarrow-div" onClick={()=>this.props.nextSearchFunc()} style={{backgroundColor:this.props.buttonColor,width:this.props.width}}>
			{/*<div className="nextarrow-div" onClick={()=>this.props.nextArrowFunc()} style={{backgroundColor:this.props.buttonColor,width:this.props.width}}>*/}

			<i class="fa fa-angle-right  nextarrow-icon" aria-hidden="true" style={{fontSize:this.props.fontsize}}></i>
			</div>
		);
	}
}
