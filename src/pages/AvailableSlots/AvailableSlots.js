import React from 'react';
import BlockForm from '../../components/BlockForm/BlockForm'
import BoxCard from  '../../pages/BookingCheckout/BoxCard';
import SlotLegend from '../../components/slotLabel/SlotLable';
import promo from '../../images/DesignIcons/promo.png';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import "./AvailableSlots.css";
import SlotBox from "../../components/slotBox/SlotBox"
import {Button,notification,Popconfirm,Popover } from 'antd';
import Apilink from '../../helpers/apilink';
import Reasonmodel from './calendermodel';
import BlockingCardDiv from './BlockingCardDiv';
import DateFunctions from '../../helpers/DateFunctions';
import dateFormat from 'dateformat';
export default class AvailableSlots extends React.Component {
	constructor(props) {
		super(props);
		this.state={slotType:3,reason:'',bookingName:'',bookingPhone:'',bookingEmail:'',changetabclr:true,openmodel:false};
	}
	receiveSlots=(data,count)=>{

		console.log("avaialbleSlots",data);
		console.log("avaialbleSlotsselected",this.props.selectedDate);
}
	changetabbook=()=>{
		this.setState({
			changetabclr:false
		})
	}
	changetabavail=()=>{
		this.setState({
			changetabclr:true
		})
	}
	 formatTimeShow=(h_24)=> {
		var h =parseInt(h_24) % 12;
		if (h === 0) h = 12;
		return (h < 10 ? '0' : '') + h + ':00' + (parseInt(h_24) < 12 ? " "+'AM' : " "+'PM');
	}
	unblockslot=(data)=>{
		var obj={bookingId:data,reason:this.state.reason,bookingSlotType:3};
		console.log(obj);
		// return;
		fetch(Apilink.apiurl+"unblockingSlots",{
			method:'POST',
			headers:{
			  Accept:'application/json',
			  'Content-Type':'application/json',
			},
			body:JSON.stringify(obj),
		  }).then((response)=>response.json())
		  .then((responsejson)=>{
			//   console.log(responsejson);
			  notification.info({
				message: 'Notification Title',
				description:
				  (this.state.slotType=='3'?'Cancelled Successfully':'Blocked successfully'),
				onClick: () => {
				  console.log('Notification Clicked!');
				},
			  });
		  this.props.updateSlots&&this.props.updateSlots();
		  })
	}
	callfunc=(data,type)=>{
		if(type=='B'){
		this.setState({openmodel:true,currendata:data})
	   }else{

	   }
	}
	closemodel=(successddata)=>{
		this.setState({openmodel:false})
		if(successddata==="ok"){
			this.state.currendata && this.unblockslot(this.state.currendata)
		}
	}
	renderSlots=(data)=>{
		
				return <div>{data.map((obj)=>{
					var fromtime=dateFormat(DateFunctions.convertTimestamp(obj.booking_slot_fromtime),'hh:MM TT');
					var totime=dateFormat(DateFunctions.convertTimestamp(obj.booking_slot_totime),'hh:MM TT');
					return(
						<div>{fromtime} - {totime}</div>
						)
				})}</div>;
			
	}
	render() {
		// console.log(this.props,"propsssss")
		// console.log("prop{0}",this.props.availability.availability && this.props.availability.availability[0].hourlySlots);
		// .availability[0].hourlySlots
		// const norecorddata=
		// this.props.availability &&  this.props.availability.availability && this.props.availability.availability[0].hourlySlots.filter((item)=>item.bookingslottype!==0)
		
		
		// console.log(blockedslot,"blockedslot")
 		return (
			<div className="cross_mr">
				<div className="text_flex mt-3">
				<div className={`mr-3 ${this.state.changetabclr?"clrred":null}`} onClick={this.changetabavail}>
				Available Slots
				</div>
				<div onClick={this.changetabbook} className={`ml-2 ${this.state.changetabclr===false?"clrred":null}`}>
				Bookings
				</div>
				</div>
			{window.innerWidth > 768 && this.state.changetabclr &&
			<BoxCard closeBox={()=>this.props.close&&this.props.close()} close={true} icon={true} >
			<div className="flexbox">
            <SlotLegend legend="Selected" borderColor={"#EB5C00"} boxColor="#F2E3DA"/>
            <SlotLegend legend="Booked" borderColor={"#9C9B9B"} boxColor="#D5D4D4"/>
            <SlotLegend legend="Blocked" borderColor={"#324192"} boxColor="#D2D5E3"/>
            </div>
			</BoxCard>
	}
			{this.props.errmsg&&this.state.changetabclr&&
			<p className="ExcludeDaysError">
			{this.props.errmsg}
			</p>
			}
			 <div className={`${this.state.changetabclr===false && "dis_none"}`}>
			<BlockForm seatobj={this.props.seatobj} venuetype={this.props.venuetype} hide={this.props.errmsg} updateSlots={()=>this.props.updateSlots&&this.props.updateSlots()} selectedDate={this.props.selectedDate} sendSlots={(data,data1,count)=>this.receiveSlots(data,count)} availability={this.props.availability} type={this.props.type}/>
			</div>
			{this.state.changetabclr===false&&
			<div className="bookborder_none over_y_align">
			<BoxCard closeBox={()=>this.props.close&&this.props.close()} close={true} icon={true} >
				<BlockingCardDiv venuetype={this.props.venuetype} unblockslot={(data)=>this.unblockslot(data)} type={this.props.type} availability={this.props.availability} callfunc={(data,data1)=>this.callfunc(data,data1)}/>
				
					
			 </BoxCard>
			 {this.state.openmodel && <Reasonmodel sendSlotType={(data)=>this.setState({slotType:data})} sendText={(value)=>this.setState({reason:value})} modeltrue={this.state.openmodel} closemodel={(datasuc)=>this.closemodel(datasuc)}/>}
			 </div>
			}
			</div>
		);
	}
}