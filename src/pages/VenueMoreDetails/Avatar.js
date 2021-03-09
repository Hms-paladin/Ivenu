import React from 'react';
var dummyimage=require('../../images/shutter/CAROUSEL-01.jpg');

export default class Avatar extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Avatar">
			<div className="AvatContent">
			<img src={dummyimage}/>
			<div className="avatartitlecontent">
			<h5>{this.props.title}</h5>
			<p>{this.props.subtitle}</p>
			</div>
			</div>
			{this.props.children}


			</div>
		);
	}
}
