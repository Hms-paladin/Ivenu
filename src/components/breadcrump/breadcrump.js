import React, {Component} from 'react';
import {Breadcrumb} from 'antd';

import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import './breadcrump.css';

class BreadCrump extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			categoryId:this.props.categoryId,
			pathname:localStorage['pathname']?localStorage['pathname']:'/addIndividualform'
		};


	}

changePathName=(data)=>{
	// this.setState({pathname:data})
}
	homeClick(){
		// alert('')
	}
componentWillReceiveProps(props){
// console.log("receiveProps",this.props);
window.localStorage['pathname'] = props.history.location.pathname;
this.setState({pathname:props.history.location.pathname});
// this
}
	render()
	{
		// console.log(this.props.location);
		return(
		
			<div className="breadcrumb-div">
				<Breadcrumb separator=">">
				<Breadcrumb.Item className={`${this.state.pathname==''?'breadcurmbactive':'inactive'}`} onClick={()=>{this.props.homeClick()}}><Link to ="">Home</Link></Breadcrumb.Item>			
				{/*<Breadcrumb.Item className={`${this.state.pathname=='/'?'breadcurmbactive':'inactive'}`} ><Link onClick={()=>this.changePathName('venue')} to="/">Venue</Link></Breadcrumb.Item>*/}
				<Breadcrumb.Item className={`${(window.location.search=="?/addIndividualform" || window.location.search=="?/addIndividualform/") ?'breadcurmbactive':'inactive'}`}><Breadcrumb.Item className="text-style-1"><Link onClick={()=>this.changePathName('addIndividualform')} to="/addIndividualform/">{this.state.categoryId==1?'Add Venue':'Add Corporate Venue'}</Link><span style={{color:'white'}}> >> </span></Breadcrumb.Item></Breadcrumb.Item>
				
				</Breadcrumb>
			</div>


			)
	}
}
export default withRouter(BreadCrump); 