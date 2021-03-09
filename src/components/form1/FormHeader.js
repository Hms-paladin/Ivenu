import React from 'react';
import './form1.css';
import plus from '../../images/+.png';
export default class FormHeader extends React.Component {


	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div className="form-maindiv">
			<div className="form-div">
			{(this.props.corporate && this.props.corporate==true)&&(this.props.altHeader && this.props.altHeader==true)&& (
				<div class="choose-text1">Please provide the <span class="choose-text2">Authorization details </span> {this.props.subcategory}</div>
				) || (
				
			<div className="form-heading">
			{/*<p className="form-text1">Please provide the <span className="form-text2">Authorization details</span> Baseball</p>*/}
			<div className="heading1">

			{(this.props.corporate && this.props.corporate==true) &&
				(<div className="sub1-hea1">Group</div>) ||
				(	<div className="sub1-hea1">Category</div>)
			}

			<div className="sub2-hea1">{this.props.category}</div>
			</div>
			<div className="heading2">
			{(this.props.corporate && this.props.corporate==true) &&
				(<div className="sub1-hea1">Category</div>) ||
				(	<div className="sub1-hea1">Specification</div>)
			}

			<div className="sub2-hea1">{this.props.subcategory}</div>
			</div>
			</div>
			
			)}
			{!this.props.buttonhide&&
			<div className="actionheading">
			<button type="button" className="save-button" onClick={()=>this.props.saveClick()}><span className="save-span">SAVE</span></button>
			</div>
		}
			</div>
			

			</div>
			);
	}
}
