import React from 'react';
import './choose_location.css';
import Popupbox from '../../components/popupbox/popupbox';
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'Newyork'},{id:2,name:'India'},{id:3,name:'china'}]}
export default class Choose_location extends React.Component {
	  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
    	dropDownarray:{value:'id',name:'name',dropdown:props.dropDown?props.dropDown:[]},
    	placeholder:null
    };
  }

  recieveFunction(data){
  	this.setState({placeholder:data.name});
  	this.props.getLocationId(data.id);

  }
	render() {
		console.log()
		return (
			<div className="flex_choose">

			<span className="location_text">Choose the Location </span> 
			<Popupbox buttonText={this.state.placeholder?this.state.placeholder:
				"Select"}  dropdown={this.state.dropDownarray}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'} sendPopupData={(data)=>{this.recieveFunction(data)}}/>


			</div>
		);
	}
}
