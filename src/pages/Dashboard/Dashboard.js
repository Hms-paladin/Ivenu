import React from 'react';
import dashboard from '../../images/bookings.png';
export default class Dashboard extends React.Component {

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
			<img src={dashboard} style={{width:150,height:150}} />
			<p style={{textAlign:'center',fontSize:19}}>My Bookings</p>
			</div>
			</div>
		);
	}
}
