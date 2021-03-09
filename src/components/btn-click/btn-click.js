import React, {Component} from 'react';
import './btn-click.css';
// import { Breadcrumb } from 'antd';
import plus from '../../images/+.png';
import $ from "jquery";

// import { Pagination } from 'antd';





class Btnclick extends Component
{
constructor(props) {
	  super(props);
	
	  this.state = {};

	 $(document).ready(function(){
  $(".sample-button").click(function(){
    $(".panel-div").show();
  });
});


	}

render()
{
	return(

		
	
<div className="btn-wrapper">
<div className="sample-button">
<img src={plus}/>
</div>
<div className="panel-div">
</div>

</div>
  
		)

	
}
}
export default Btnclick;