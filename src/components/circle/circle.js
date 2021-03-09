import React, {Component} from 'react';
import '../circle/circle.css';
// import { Breadcrumb } from 'antd';
// import plus from '../../images/+.png';
// import $ from "jquery";

// import { Pagination } from 'antd';





class Circle extends Component
{
constructor(props) {
	  super(props);
	console.log(props)
	  this.state = {

			  	
	  };





console.log(this.props.width);
  	}

// changeColor(){
//         this.setState({circle1:!this.state.circle1})
//     }
circleChange=()=>{
	this.props.circleChange();
}

render()
{
	console.log(this.props);
	return(
			
		<div onClick={!this.props.dummy&&this.circleChange} className={`circle1 text ${this.props.dummy?'removeheight':''}`} style={{visibility:this.props.dummy?'hidden':'',width:this.props.width,height:this.props.height,backgroundColor:this.props.active?this.props.activecolor:''}}>
		<p style={{color:this.props.textcolor}}>{this.props.text}</p>
		</div>
	
		
		)



	
}
}
export default Circle;

