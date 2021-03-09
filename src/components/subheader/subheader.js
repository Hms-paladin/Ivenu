import React, {Component} from 'react';
import '../../components/subheader/subheader.css';
import {Breadcrumb} from 'antd';

class Subheader extends Component
{
	constructor(props) {
		super(props);

		this.state = {};


	}
	render()
	{
		return(
			<div className="rectangle" style={{backgroundColor:this.props.bgcolor}}>
			<div className="in-header" >
	
			{this.props.children}

			</div>
			</div>
			)
	}
}
export default Subheader; 