import React, {Component} from 'react';
import './pagination.css';
import { Breadcrumb } from 'antd';
// import { Pagination } from 'antd';





class Paginationview extends Component
{
	constructor(props) {
	  super(props);
	  var arraylist=[];
 for(var i=0;i<props.numberofDots;i++){
		arraylist.push(i);
	}
	  this.state = {activedot:0,arraylist:arraylist};
	}
changeActive=(index)=>{
	// this.setState({activedot:index});
	// this.props.changeActive(index+1);
}
renderDots=(arraylist)=>{

}
componentWillReceiveProps(props){

	if(props.activeid){
		// alert(props.activeid)
		var activeid=props.activeid=='2.5'?2:props.activeid;
		this.setState({activedot:activeid-1})
	}
}
render()
{
	return(
    <div class="pagination">
    {
    this.state.arraylist.length>0&&this.state.arraylist.map((obj,key)=>{
	return(
	<div  onClick={()=>this.changeActive(key)} className="dotparent"><div className={`dotbefore`} style={{display:'block',width:Math.round(100/this.state.arraylist.length),height:'auto'}}></div>{this.state.activedot==key?<p>{key+1} of {this.state.arraylist.length}</p>:<p className="visiblehidden">1 of 8</p>}</div>
		)
})
}
    </div>  
		)

	
}
}
export default Paginationview;