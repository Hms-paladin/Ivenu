import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './BoxCard.css';

export default class BoxCard extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="BoxCard">
			<div className="BoxCardContent">
			<div className="BoxHeader">
			{this.props.icon&&this.props.headerImg}
			{!this.props.icon&&
			<img src={this.props.headerImg} style={{width:25-(this.props.widthdeviation/25)*100,height:25-(this.props.heightdeviation/25)*100}}/>
			}
			<p>{this.props.headerText}</p>
			{this.props.close&&
			<div onClick={()=>this.props.closeBox&&this.props.closeBox()} className="closeIcon"><CloseIcon/></div>
		}
			</div>
			<div className="BoxBody">
			{this.props.children}
			</div>
			</div>
			</div>
		);
	}
}
