import React from 'react';
import referearn from '../../images/referearn.png';
export default class ReferEarn extends React.Component {

	constructor(props) {
		super(props);
	}
componentDidMount(){
	this.props.receiveProps(this.props);
}
	render() {
		return (
			<div style={{display:'flex',alignItems:'center',flexDirection:'row',height:'80vh',justifyContent:'center'}}>
			<div>
			<img src={referearn} style={{width:150,height:150}} />
			<p style={{textAlign:'center',fontSize:19}}>Refer & Earn</p>
			</div>
			</div>
		);
	}
}
