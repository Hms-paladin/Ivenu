import React from 'react';
import SlotBox from '../slotBox/SlotBox';
import dateFormat from 'dateformat';
 import {notification} from 'antd';
import { Modal, Button } from 'antd';
import Apilink from '../../helpers/apilink';
import CircularProgress from '@material-ui/core/CircularProgress';
import ValidationLibrary from '../../helpers/validationfunction';
import DateFunctions from '../../helpers/DateFunctions';
import './BlockForm.css';
const BlockHours=[{id:1,label:'09:00 AM - 10:00 AM',type:1,checked:true},{id:2,label:'10:00 AM - 11:00 AM',type:2,checked:true},{id:3,label:'11:00 AM - 12:00 PM',type:0,checked:false},{id:4,label:'12:00 PM - 01:00 PM',type:0,checked:false},{id:5,label:'01:00 PM - 02:00 PM',type:2,checked:true}];
var filterdData=[];
function getMinValue(data) {
  return data.reduce((min, p) => p.AvailbleSeatsCount < min ? p.AvailbleSeatsCount : min, data[0].AvailbleSeatsCount);
}
export default class BlockForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={loading:false,hourlySlots:[],availability:null,BasicDetails:[{label:'Name',mandatory:true,value:'',validation:[{name:'required'}],error:null,errormsg:''},{label:'Event Name',mandatory:true,value:'',validation:[{name:'required'}],error:null,errormsg:''},{label:'Phone Number',value:'',validation:[{name:'mobile'}],error:null,errormsg:''},{label:'Email',value:'',validation:[{name:'email'}],error:null,errormsg:''}],availableSeats:0,seatcount:0}
	}
generateBoxColor(obj){
	

	if(obj==2){
		return "#d2d5e3"
	}else if(obj==1){
		return "#e3e2e2"
	}else{
		return "#f2e3da";
	}
}
generateTextColor(obj){
	if(obj==2){
		return "#324192"
	}else if(obj==1){
		return "#797777"
	}else{
		return "#eb5c00";
	}
}
UnblockDates=(data)=>{
	// alert(JSON.stringify(data));
	fetch(Apilink.apiurl+"unblockingSlots",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({unblockinlist:data}),
    }).then((response)=>response.json())
    .then((responsejson)=>{
    	// console.log(responsejson);
    this.props.updateSlots&&this.props.updateSlots();
    })
}
selectSlot=(obj,obj2,index,secondIndex)=>{
	filterdData=[];
	var availability=this.state.availability;
// var findindex=availability[index].availablityfindIndex((objData)=>obj2.bookingslottype==0&&objData.venue_id==obj.)
// if(findindex!=-1){
	if(obj2.bookingslottype==0 ){
	availability.availability[index].hourlySlots[secondIndex].checked=obj2.checked!=null?!obj2.checked:true;
	}else{
	// 	if(!this.props.noform){
	// 	 Modal.confirm({
 //    title: 'Confirm',
 //    content: 'Are You Sure Want To Unblock the date',
 //    okText: 'Ok',
 //    onOk:()=>this.UnblockDates([obj2.trn_booking_slot_id]),
 //    cancelText: 'Cancel',
 //  });
	// }
}
	
	availability.availability.map((obj)=>{
		var filterdRecordsData=obj.hourlySlots.filter((obj1)=>obj1.checked==true);
		console.log("filterdData",filterdRecordsData);
		filterdData=filterdData.concat(filterdRecordsData);
	// console.log("hourlySlots",filteredRecords);
	});
	if(this.props.venuetype==3){
		if(filterdData.length>0){
	this.setState({availableSeats:getMinValue(filterdData),seatcount:0});
}else{
		this.setState({seatcount:0,availableSeats:0});
	}
	}
	// console.log('filterdRecordsData',getMinValue(filterdData));
	this.props.noform&&this.props.sendSlots&&this.props.sendSlots(filterdData.map((obj)=>{obj.selectedDate=dateFormat(this.props.selectedDate,'yyyy-mm-dd');return obj}),this.props.selectedDate);
	console.log('filterdData',filterdData);
	this.setState({hourlySlots:filterdData})
	// this.props.sendSlots&&this.props.sendSlots(filteredRecords);

	console.log('availabilitychecked',availability)
// }
this.setState({availability});
}
clearForm=()=>{
	var BasicDetails=this.state.BasicDetails;
	BasicDetails.map((obj)=>{obj.error=false;obj.value="";})
	console.log('BasicDetails',BasicDetails)
	this.setState({BasicDetails});
}
componentWillReceiveProps(props){
	console.log("props",props);
	if(!props.dontupdate){
		var parseavaialbilty=JSON.parse(JSON.stringify(props.availability));
	if(props.availability&&props.hourlychosenslots&&props.hourlychosenslots.length>0){
		var chosenslots=JSON.parse(JSON.stringify(props.hourlychosenslots));
		for(var i=0 ;i<parseavaialbilty.availability.length;i++){
			// debugger;
			parseavaialbilty.availability[i].hourlySlots.map((obj2,index)=>{
				chosenslots.filter((obj5)=>obj5.date==dateFormat(this.props.selectedDate,'yyyy-mm-dd')).map((obj3)=>{
						var findindex=obj3.slots.findIndex((obj4)=>obj2.venue_slot_start_time==obj4.venue_slot_start_time&&obj2.venue_slot_end_time==obj4.venue_slot_end_time);
						if(findindex!=-1){
							parseavaialbilty.availability[i].hourlySlots[index].checked=true;
						}
				})
			})
			// parseavaialbilty.availability[i].hourlySlots.map((obj2,index)=>{
			// 	var findindex=props.hourlychosenslots.findIndex((obj3)=>(obj3.venue_slot_start_time==obj2.venue_slot_start_time&&obj3.venue_slot_end_time==obj2.venue_slot_end_time&&obj3.date==dateFormat(this.props.selectedDate,'yyyy-mm-dd')));
			// 			if(findindex!=-1){
			// 				parseavaialbilty.availability[i].hourlySlots[index].checked=true;
			// 			}
			// })
		}
	}
	this.setState({availability:parseavaialbilty,hourlySlots:[],loading:null});
}
	if(props.type!=1&&props.venuetype==3){
		this.setState({availableSeats:props.availableSeats});
	}
	this.clearForm();
}
renderTimeFormat(date){
	if(date){

	return dateFormat(dateFormat(new Date(),'yyyy-mm-dd')+"T"+date,'hh:MM TT');
	}
}
BlockFormDates=(data)=>{

	this.setState({loading:true})
	fetch(Apilink.apiurl+'blockDatesAndSlots', {
		method:'POST',
			headers:{
			Accept:'application/json',
			'Content-Type':'application/json',
			},
			body:JSON.stringify(data),
			}).then((response)=>response.json())
		.then((responsejson)=>{
			this.setState({loading:null})
			if(responsejson.status==1){
				   notification.error({
    message:'Error Message',
    description:responsejson.msg,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
			}else{

			this.props.updateSlots&&this.props.updateSlots()
			}
		console.log('responseBook',responsejson);
	})
}
changeCheckBox=(text,validation,index)=>{
var checkvalidation=ValidationLibrary.checkValidation(text,validation);
// console.log("validations",checkvalidation);
var BasicDetails=this.state.BasicDetails;
BasicDetails[index].value=text;
BasicDetails[index].error=!checkvalidation.state;
BasicDetails[index].errormsg=checkvalidation.msg;
this.setState({BasicDetails});
}
BlockFormData=()=>{
var BasicDetails=this.state.BasicDetails;
// var Keys=Object.keys
for(var i in BasicDetails){
var checkvalidation=ValidationLibrary.checkValidation(BasicDetails[i].value,BasicDetails[i].validation);
// console.log("validations",checkvalidation);
var BasicDetails=this.state.BasicDetails;
BasicDetails[i].value=BasicDetails[i].value;
BasicDetails[i].error=!checkvalidation.state;
BasicDetails[i].errormsg=checkvalidation.msg; 
}
var filterRecords=BasicDetails.filter((obj)=>obj.error==true);
// console.log('filterRecords',filterRecords);
if(filterRecords.length>0||(this.props.venuetype==3&&this.state.seatcount==0)){
	// alert("Fields Missing....");
	        notification.error({
    message:'Error Message',
    description:"Fields are incomplete",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
}else{
var availablity=this.props.availability;
// console.log(availablity);
// alert(this.props.type);
// debugger;
// return;
		var venue_id= availablity?availablity.trn_venue_id:null;
		var venuetype=availablity?availablity.trn_availability_type:null;
		var obj={"venueId":venue_id,
	"venueType":this.props.venuetype,
	"userId":JSON.parse(localStorage['LoginData']).user_id,
	"bookingName":this.state.BasicDetails[0].value,
	"eventName":this.state.BasicDetails[1].value,
	"bookingPhone":this.state.BasicDetails[2].value,
	"bookingEmail":this.state.BasicDetails[3].value,
	"availType":this.props.type,
	"fromDateTime":this.props.selectedDate&&dateFormat(this.props.selectedDate,'yyyy-mm-dd'),
	"toDateTime":this.props.selectedDate&&dateFormat(this.props.selectedDate,'yyyy-mm-dd'),
	"slots":[]	
	}
	if(this.props.venuetype=='2'){
		// var bookingDetails={obj}
		this.props.sendPaxorSeatsData&&this.props.sendPaxorSeatsData(obj);
		return;
	}

	if(this.props.type=='1'){
	for(var k=0;k<this.state.hourlySlots.length;k++){
		var slotobj={fromdate:dateFormat(this.props.selectedDate,'yyyy-mm-dd'),todate:dateFormat(this.props.selectedDate,'yyyy-mm-dd'),slotFromTime:this.state.hourlySlots[k].venue_slot_start_time,slotToTime:this.state.hourlySlots[k].venue_slot_end_time};
		obj.slots.push(slotobj);
	}
	if(this.props.venuetype=='3'){
		obj.seatName=this.props.seatobj.seat_name;
		obj.seatUniqueId=this.props.seatobj.seat_unique_id;
		obj.seatQty=this.state.seatcount;
	}
	if(obj.slots.length>0){
	this.BlockFormDates(obj);
	}else{
		        notification.error({
    message:'Error Message',
    description:"No Slots were chosen",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
	}
}else{
	obj.fromDateTime=this.props.fromDate?dateFormat(this.props.fromDate,'yyyy-mm-dd'):'';
	obj.toDateTime=this.props.fromDate?dateFormat(this.props.toDate,'yyyy-mm-dd'):'';
	// alert(JSON.stringify(obj));
	// return;
	if(this.props.venuetype=='3'){
		obj.seatName=this.props.seatobj.seat_name;
		obj.seatUniqueId=this.props.seatobj.seat_unique_id;
		obj.seatQty=this.state.seatcount;
	}
	if(!obj.fromDateTime||!obj.toDateTime){
			        notification.error({
    message:'Error Message',
    description:"Dates are empty",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
			        return;
	}
var listofdates=DateFunctions.enumerateDaysBetweenDates(obj.fromDateTime,obj.toDateTime);
console.log('listofdates',listofdates);
var listarray=listofdates.map((obj)=>{
	var iteration={fromdate:dateFormat(obj,'yyyy-mm-dd'),todate:dateFormat(obj,'yyyy-mm-dd'),slotFromTime:"00:00:00",slotToTime:"00:00:00"}
	return iteration;
});
obj.slots=listarray;
this.BlockFormDates(obj);
// console.log('arrayofDates',listaray);
}
	
}
this.setState({BasicDetails});
}
onchangeSeat=(value,key)=>{
	// console.log(value);
	value=!value?0:value;
	var checknumber=/^[0-9]*$/g;
	var countvalue=value;
	if(checknumber.test(countvalue)){
	value=parseInt(value)>this.state.availableSeats?0:value;
		this.setState({[key]:parseInt(value)})
	}
}
	render() {
		console.log('this.props.available',this.state)
		return (
			<div className="BlockFormContent">
			{this.state.loading&&<div className='centerDiv'><CircularProgress/></div>}
			{!this.props.noHour&&!this.props.hide&&
			<div className="BlockForm">
		{this.state.availability&&this.state.availability.availability&&this.state.availability.availability.map((obj,index)=>{
			return (
			<>
			{
			obj.hourlySlots&&obj.hourlySlots.map((obj2,secondIndex)=>{
				obj2.bookingslottype=obj2.bookingslottype==3?0:obj2.bookingslottype;
				if(this.props.venuetype==3){
					if((obj2.bookingslottype==1||obj2.bookingslottype==2)&&obj2.AvailbleSeatsCount==0){
						// obj2.bookingslottype;
					}else{
						obj2.bookingslottype=0;
					}
				}
				return(
<SlotBox SelectedSlot={()=>this.selectSlot(obj,obj2,index,secondIndex)} border={obj2.bookingslottype!=1} selctedBoxColor={this.generateBoxColor(obj2.bookingslottype)} textselectedColor={this.generateTextColor(obj2.bookingslottype)} selected={(obj2.bookingslottype!=0)?true:obj2.checked}>
{this.renderTimeFormat(obj2.venue_slot_start_time) +" -  "+this.renderTimeFormat(obj2.venue_slot_end_time)}
</SlotBox>

					)
			})
		}
		
				</>
			)
			})}
			
			</div>
		}
		{!this.props.noform&&
						<div className="FormBoxBasic">
			{this.props.venuetype==3&&
				<div className="LabelBox">
			<label>Seats Available({this.state.availableSeats}) <span style={{color:'red'}}>*</span> {!this.state.seatcount&&<span title={"Invalid Seat Count"} className="errormsg">Invalid Seat Count</span>}</label>
			<input   max={this.state.availableSeats} value={this.state.seatcount} onChange={(e)=>this.onchangeSeat(e.target.value,'seatcount')}/>
			
			</div>
			}
			{this.state.BasicDetails.map((obj,index)=>{
			return(	
			<div className="LabelBox">
			<label>{obj.label} {obj.mandatory&&<span style={{color:'red'}}>*</span>} {obj.error==true&&<span title={obj.errormsg} className="errormsg">{obj.errormsg}</span>}</label>
			<input value={obj.value} onChange={(e)=>this.changeCheckBox(e.target.value,obj.validation,index)}/>
			
			</div>
			)
			})}
			</div>
		}
		{!this.props.noform&&
			<div  className="BlockButton">
			<button onClick={()=>this.BlockFormData()}>Block</button>
			</div>
		}
			</div>
		);
	}
	componentDidMount(){
		if(this.props.type!=1&&this.props.venuetype==3){
			this.setState({availableSeats:this.props.availableSeats})
		}
	}
}
