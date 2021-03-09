import React from 'react';
import BlockForm from '../../components/BlockForm/BlockForm'
import BoxCard from  '../../pages/BookingCheckout/BoxCard';
import SlotLegend from '../../components/slotLabel/SlotLable';
import promo from '../../images/DesignIcons/promo.png';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import './AvailableSlots.css';
export default class AvailableSlots extends React.Component {

	constructor(props) {
		super(props);
		this.state={bookingName:'',bookingPhone:'',bookingEmail:''};
	}
	receiveSlots=(data)=>{
		console.log("avaialbleSlots",data);
		console.log("avaialbleSlotsselected",this.props.selectedDate);
		
}
	render() {
		console.log("availasdfasdf",this.props.availability);
		return (
			<div>
			<BoxCard closeBox={()=>this.props.close&&this.props.close()} close={true} icon={true} headerImg={<AccessTimeIcon/>} headerText={"Available Slots"}>
			{window.innerWidth>767&&
			<div className="flexbox">

            <SlotLegend legend="Selected" borderColor={"#eb5c00"} boxColor="#f2e3da"/>
            <SlotLegend legend="Booked" borderColor={"#9c9b9b"} boxColor="#d5d4d4"/>
            <SlotLegend legend="Blocked" borderColor={"#324192"} boxColor="#d2d5e3"/>
            </div>
        	}
			</BoxCard>
			{this.props.errmsg&&
			<p className="ExcludeDaysError">
			{this.props.errmsg}
			</p>
			}
			<BlockForm hide={this.props.errmsg} updateSlots={()=>this.props.updateSlots&&this.props.updateSlots()} selectedDate={this.props.selectedDate} sendSlots={(data)=>this.receiveSlots(data)} availability={this.props.availability}/>
			</div>
		);
	}
}
