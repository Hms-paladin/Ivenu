import React, {Component} from 'react';
import '../square/square.css';
import arrow from '../../images/arrow_icon.png';





class Square extends Component
{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };

	// console.log(this.props.width);
  	}


render()
{
	return(
		<div onClick={()=>this.props.onClick&&this.props.onClick()} className="square-div" style={{width:this.props.width,minHeight:this.props.minHeight,backgroundColor:this.props.backgroundColor}}>
		<p style={{color:this.props.textcolor}}>{this.props.text}</p>
		<div className="arrow-div">
		<img className="Back-Arrow" src={arrow} />

		</div>
		</div>
		)



	
}
}
export default Square;