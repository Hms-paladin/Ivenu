import React from 'react';
import ValidationLibrary from '../../helpers/validationfunction';
import {notification} from 'antd';
import './seatform.css';
import DateFunctions from  '../../helpers/DateFunctions';
var userId=window.localStorage['LoginData']?JSON.parse(window.localStorage['LoginData']).user_id:0;
export default class Seatform extends React.Component {


	constructor(props) {
		super(props);
	}
	submitSeat=()=>{
		const {counter,seatname}=this.props.activeobj;
		if(counter==0 || seatname==""){
			  notification.error({
    message:'Error Message',
    description:"Fields are empty",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
		}else{
	
// return;
			this.props.submitDetails&&this.props.submitDetails({seatname:this.props.activeobj.seatname,counter:this.props.activeobj.counter,pricing:this.props.activeobj.pricing?this.props.activeobj.pricing:[],uniqueId:DateFunctions.generate_uid_timestamp()+userId});
		}
	}
	removeSeats=()=>{
		this.props.removeSeats&&this.props.removeSeats();
	}
	counterValue=(data)=>{
		// console.log("activeobj",this.props.activeobj);
		var counter=parseInt(this.props.activeobj.counter);
		if(data=='-'){
			counter-=1;
			if(counter<0){
				counter=0;
			}
		}else{
			counter+=1;
		}
		this.props.seatDetails&&this.props.seatDetails({counter:counter,seatname:this.props.activeobj.seatname,uniqueId:(!this.props.activeobj.uniqueId || this.props.activeobj.uniqueId == undefined || this.props.activeobj.uniqueId==0 || this.props.activeobj.uniqueId == 'undefined')?(DateFunctions.generate_uid_timestamp()+userId):this.props.activeobj.uniqueId})
		// this.setState({counter:counter});
	}
	changeCounter=(data)=>{
		var counter=this.props.activeobj.counter;

		var checkvalidation=ValidationLibrary.checkValidation(data,[{name:'allowNumaricOnly'}]);
		// console.log('checkvalidation',checkvalidation);
		if(checkvalidation.state==false){
			data=data.replace(/[^0-9.]/g, "");
		}

		// this.setState({counter:parseInt(data==""?0:data)});
		this.props.seatDetails&&this.props.seatDetails({counter:parseInt(data==""?0:data),seatname:this.props.activeobj.seatname,uniqueId:(!this.props.activeobj.uniqueId || this.props.activeobj.uniqueId == undefined || this.props.activeobj.uniqueId==0 || this.props.activeobj.uniqueId == 'undefined')?(DateFunctions.generate_uid_timestamp()+userId):this.props.activeobj.uniqueId})
	}
changeText=(data)=>{
		var checkvalidation=ValidationLibrary.checkValidation(data.charAt(0),[{name:'alphabetsOnly'}]);

	if(data.charAt(0)==" " || checkvalidation.state==false){
		data=""
	}
	this.props.seatDetails&&this.props.seatDetails({counter:this.props.activeobj.counter,seatname:data,uniqueId:(!this.props.activeobj.uniqueId || this.props.activeobj.uniqueId==0 ||  this.props.activeobj.uniqueId == undefined || this.props.activeobj.uniqueId == 'undefined')?(DateFunctions.generate_uid_timestamp()+userId):this.props.activeobj.uniqueId});

	// this.setState({seatname:data})
}
	render() {
		return (
			<div className="seatformbox">
			<div className="flexboxseat">
			<input value={this.props.activeobj.seatname} onChange={(e)=>this.changeText(e.target.value)}/>
			<div className="incrementbox">
			<a onClick={()=>this.counterValue('-')}>-</a>
			<p><input value={this.props.activeobj.counter} onChange={(e)=>this.changeCounter(e.target.value)}/></p>
			<a onClick={()=>this.counterValue('+')}>+</a>
			</div>
			{this.props.activeobj.add=='true'&&
			<a className="plusicon" onClick={()=>this.submitSeat()}>+</a>
			}
			{!this.props.activeobj.add&&
			<a className="plusicon" onClick={()=>this.removeSeats()}>-</a>
			}
			</div>
			</div>
		);
	}
}
