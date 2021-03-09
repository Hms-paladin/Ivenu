import React, {Component} from 'react';
import './specific-venue.css';
// import { Breadcrumb } from 'antd';
// import plus from '../../images/+.png';
// import $ from "jquery";

// import { Pagination } from 'antd';


// var array=[{id:1,image:""},]
// array.map(item,i)=>{
// 	<
// }

class Specific extends Component
{
constructor(props) {
	  super(props);
	  this.state = {

			  	
	  };





// console.log(this.props.width);
  	}

// changeColor(){
//         this.setState({circle1:!this.state.circle1})
//     }
specificvenue=()=>{
	this.props.specificvenue();
}

render()
{
	return(
		<div className={`${this.props.disabled?'disabledMain':''}`}>	

			{!this.props.dummy&&
		<div  onClick={()=>this.props.disabled==true?null:this.specificvenue()} className={`specific1 text ${this.props.disabled?'disabled':''}`} style={{width:this.props.width,height:this.props.height,backgroundColor:(this.props.active?this.props.activecolor:(this.props.countactive?this.props.activecolor:''))}}>
		{this.props.countactive&&
		<div className="circleProp"><span>{this.props.countactive}</span></div>
			}
		<div className={`${this.props.svg?'svgblock activesvg':'specificimage'}`} style={{filter:this.props.active?this.props.filter:(this.props.countactive?this.props.filter:'')}}>{this.props.text}</div>

		</div>
		}
		
		<div className={`under-text ${this.props.disabled?'disabled':''}`}>{this.props.undertext}</div>
		<div className={this.props.active && this.props.Skew?"main-menu main-menu-select1":"main-menu nomenuselect"}>
		</div>
		</div>

		
		)



	
}
}
export default Specific;

