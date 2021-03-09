import React from 'react';
import './form1.css';
import plus from '../../images/+.png';
export default class Form1 extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="form-maindiv">
			{/*<div className="form-div">
			<div className="form-heading">
			<div className="heading1">
			<div className="sub1-hea1">Category</div>
			<div className="sub2-hea1">Playground</div>
			</div>
			<div className="heading2">
			<div className="sub1-hea2">Specification</div>
			<div className="sub2-hea2">Badminton</div>
			</div>
			</div>
			
			<button type="button" className="save-button"><span className="save-span">SAVE</span></button>
		
			</div>*/}
			<div className="form1-text">

			<div className="form1-group1">
			<h3 className="box1-heading">SPOC Name</h3>
			<input className="box1-text" value="Badminton Association Club"/>
			</div>

			<div className="form1-group1">
			<h3 className="box1-heading">Mail</h3>
			<input className="box1-text" value="Wooden Floor"/>
			</div>

			<div className="form1-group1">
			<h3 className="box1-heading">Contact Number</h3>
			<input className="box1-text" value="123456789"/>
			<div className="plus-button"><img src={plus}/></div>
			</div>

			</div>

			</div>
			);
	}
}
