import React, {Component} from 'react';
import '../css/style.css';
import { Breadcrumb } from 'antd';




class Bre_crump extends Component
{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

render()
{
	return(
	
		// <div className="in-bread-cru">
		<div className="Rectangle">
		<div className="bre-text">
		<Breadcrumb separator=">">
    		<Breadcrumb.Item id="Home-Venue-Search-V">Home</Breadcrumb.Item>
    		<Breadcrumb.Item href="" id="Home-Venue-Search-V">Venue</Breadcrumb.Item>
    		<Breadcrumb.Item href="" id="Home-Venue-Search-V"><span id="text-style-1">Search. Venue</span></Breadcrumb.Item>
    	</Breadcrumb>
  </div>
  	<div class="bre-crump-dropdown">
	{this.props.children}
	</div>
  </div>

  // </div>
  
		)

	
}
}
export default Bre_crump;