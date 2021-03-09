import React from 'react';
import dateFormat from 'dateformat';
import './CalendarForm.css';
import VenueTypes from  '../FormJSON/venuTypes.json';
export default class CalendarForm extends React.Component {

	constructor(props) {
		super(props);
		this.state={type:2,businessDetails:null}
	}
renderVenueType=(data)=>{
// console.log(VenueTypes);
var filterdData = VenueTypes.filter((obj)=>obj.type==data);
return filterdData[0].label;
}
	render() {
		return (
			<div className="CalendarMain">
			<div className="CalendarHeader">
			<div className="CalendarBox">
			<h3>Business Hours</h3>
			<div className="CalendarBoxHeaders spaceBetween">
			<div className="CalendarHeaderBoxes">
			<h4>From Time</h4>
			<p>{dateFormat(this.state.businessDetails&&this.state.businessDetails.fromTime,'hh:MM TT')}</p>
			</div>
			<div className="CalendarHeaderBoxes">
			<h4>To Time</h4>
			<p>{dateFormat(this.state.businessDetails&&this.state.businessDetails.toTime,'hh:MM TT')}</p>
			</div>
			</div>
			</div>
			<div className="CalendarBox">
			<h3>Availability Dates</h3>
			<div className="CalendarBoxHeaders spaceBetween">
			<div className="CalendarHeaderBoxes">
			<h4>From Date</h4>
			<p>{dateFormat(this.state.businessDetails&&this.state.businessDetails.fromDate,'dd/mm/yyyy')}</p>
			</div>
			<div className="CalendarHeaderBoxes">
			<h4>To Date</h4>
			<p>{dateFormat(this.state.businessDetails&&this.state.businessDetails.toDate,'dd/mm/yyyy')}</p>
			</div>
			</div>
			</div>

			<div className="CalendarBox">
			<h3>Exclude Days</h3>
			<div className="CalendarBoxHeaders">
			{this.state.businessDetails&&this.state.businessDetails.excludesDays.length==0&&
				<p className="redColor">No Days Were Chosen</p>
			}
			{this.state.businessDetails&&this.state.businessDetails.excludesDays.length>0&&this.state.businessDetails.excludesDays.map((obj)=>{
				return(
					<div className="excludeDays">
			<p>{obj.label}</p>
			<div className="CalendarCheckbox">
			</div>
			</div>
					)
			})}
			
			</div>
			</div>
			<div className="CalendarBox">
			<h3>Venue Type</h3>
			<div className="CalendarBoxHeaders">
			<div className="CalendarHeaderBoxes">

			<h4>{this.state.businessDetails&&this.renderVenueType(this.state.businessDetails.slot_type)}</h4>
			{this.state.businessDetails&&this.state.businessDetails.slot_type==3&&
			<p>{this.state.businessDetails&&this.state.businessDetails.seatList.filter((obj)=>obj.add!='true').length}</p>
			}
			{this.state.businessDetails&&this.state.businessDetails.slot_type==2&&
			<p>{this.state.businessDetails&&this.state.businessDetails.paxList.length}</p>
			}
			</div>
			</div>
			</div>
			</div>
			<div className="CalendarAction" onClick={()=>this.props.showEditForm&&this.props.showEditForm(true)}>Edit <i class="fa fa-pencil" aria-hidden="true"></i></div>
			</div>
		);
	}
	componentDidMount(){
if(this.props.businessDetails){
	this.setState({businessDetails:this.props.businessDetails});
	// alert(JSON.stringify(this.props.businessDetails));
	}
}
}
