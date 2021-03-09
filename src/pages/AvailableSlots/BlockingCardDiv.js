import React from 'react';
import {Button,notification,Popconfirm,Popover } from 'antd';
import dateFormat from 'dateformat';
import moment from 'moment';
import DateFunctions from '../../helpers/DateFunctions';

export default class BlockingCardDiv extends React.Component {


	constructor(props) {
		super(props);
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
		console.log("thi.props.availi",this.props.availability);
		const blockedslot=this.props.availability &&
		this.props.availability.availability && this.props.availability.bookingDetails.length>0&&this.props.availability.bookingDetails.filter((obj2)=>obj2.trn_availability_type==this.props.type).length>0&&this.props.availability.bookingDetails.filter((obj2)=>obj2.trn_availability_type==this.props.type).map((item,index)=>{
					return (
						<div className="mb-2">
						<div className="card">
				<div className="card-body">
				{/*<span className="card_btnclr">Blocked </span> <br />*/}
				{this.props.venuetype==3&&
				<div className="align_cardtext">
				{item.seat_qty} Seats {item.slot_type==1?'Booked':'Blocked'}
				</div>
				}
				{this.props.type!=1&&
				<div className="align_cardtext">
				<div>{moment(new Date(item.trn_booking_from_date_time)).format('YYYY MMM DD')}</div>
				<div>(to)</div>		
				<div>{moment(new Date(item.trn_booking_to_date_time)).format('YYYY MMM DD')}</div>
						</div>
					}
						<div className="align_cardtext">
						{this.props.type==1&&item.bookedBlockedSlots&&item.bookedBlockedSlots.length>0&&
						<div><Popover placement="topRight" className="popoverSlots" content={this.renderSlots(item.bookedBlockedSlots)} title="Slots">{item.bookedBlockedSlots.length} slots <button></button></Popover>
						</div>
						}
						
						<div>{item.trn_booking_phone?item.trn_booking_phone:<span className="clrgrey_dash">-</span>}</div>
						</div>
						<div className="align_cardtext">
						<div>{item.trn_booking_name}</div>
						<div>{item.trn_booking_email?item.trn_booking_email:<span className="clrgrey_dash">-</span>}</div>
						</div>
						<div className="align_cardtext">
						<div className="card_eventclr">{item.trn_booking_event_name&&item.trn_booking_event_name}</div>
						{item.slot_type==2&& <Popconfirm
    title="Are you sure want to unblock?"
    onConfirm={()=>this.props.unblockslot&&this.props.unblockslot(item.trn_booking_id)}
    onCancel={()=>console.log('cancelled')}
    okText="Yes"
    cancelText="No"
  >
   <div><Button type="danger" className="cardbtn_clr"
						>Un Block</Button></div>
  </Popconfirm>}{item.slot_type==1&&<div><Button type="danger" className="cardbtn_clr"
						onClick={()=>this.props.callfunc&&this.props.callfunc(item.trn_booking_id,'B')}
						>Cancel</Button></div>}
						</div>
						</div>
						</div>
						</div>
						)
			
		})
		return (
			<div>{blockedslot?blockedslot:<div className="norecords_avail">No Records</div>}</div>
		);
	}
	componentDidMount(){
		// alert(JSON.stringify(this.props.availability));
	}
}
