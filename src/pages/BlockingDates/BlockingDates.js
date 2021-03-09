import React from 'react';
import BoxCard from  '../../pages/BookingCheckout/BoxCard';
import BlockForm from '../../components/BlockForm/BlockForm';
import Slider from '@material-ui/core/Slider';
import Apilink from '../../helpers/apilink';
import dateFormat from 'dateformat';
 import {notification} from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlockingCardDiv from'../../pages/AvailableSlots/BlockingCardDiv';
import Reasonmodel from '../../pages/AvailableSlots/calendermodel';

import './BlockingDates.css';
function renderDay(type){
if(type==2){
	return "Daily";
}else if(type==3){
	return "Weekly";
}else{
	return "Monthly";
}
}
var capacitycount=0;
function valuetext(value) {
  capacitycount=value;
}
export default class BlockingDates extends React.Component {

	constructor(props) {
		super(props);
		this.state={reason:null,availability:null,changetabclr:false,openmodel:false,currendata:3}
	}
	generateVenueType=(type,availtype)=>{
if(type==2){
	return "Pax";
}else if(type==3){
	return "Seats";
}else if((!type || type==1)&&availtype==1){
	return "Hourly";
}else if((!type || type==1)&&availtype==2){
	return "Daily";
}else if((!type || type==1)&&availtype==3){
	return "Weekly";
}else{
	return "Monthly";
}
}
loadVenuesPax_SeatsData=(date)=>{
	
	var venueid=this.props.venueDetails?this.props.venueDetails.venue_id:null;
		var obj={venueId:venueid,date:dateFormat(new Date(date),'yyyy-mm-dd')};
	fetch(Apilink.apiurl+"providerCalendarHourly",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((resp)=>resp.json())
    .then((respjson)=>{
      this.setState({loading:null});
    	// console.log("responsejson",respjson);
    	if(respjson.status==0){
    	// alert(JSON.stringify(respjson));
    		// respjson

    		this.setState({availability:respjson.data[0],min:respjson.data[0].trn_venue_min_count,});
     
    	}else{
    		this.setState({availability:null,rangeData:0})
        capacitycount=0;
    	}
    })
}
	componentWillReceiveProps(props){
		if(props.selectedDate){
			// alert(props.selectedDate);
			this.loadVenuesPax_SeatsData(props.selectedDate)
		}
	}
	sendPaxorSeatsData=(data)=>{
		data.capacity=capacitycount;
		if(capacitycount==0){
			  notification.error({
    message:'Error Message',
    description:"Capacity is Empty",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
		return;	
		}
		this.setState({loading:true});
		// alert(JSON.stringify(data));
		// return;
		fetch(Apilink.apiurl+'blockDatesAndSlots', {
		method:'POST',
			headers:{
			Accept:'application/json',
			'Content-Type':'application/json',
			},
			body:JSON.stringify(data),
			}).then((response)=>response.json())
		.then((responsejson)=>{
			console.log('responsejson',responsejson);
			// alert(JSON.stringify(responsejson));
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
				// alert("success");
				this.props.updateSlots&&this.props.updateSlots(this.props.selectedDate)
			}
		})
		// alert(JSON.stringify(data));

		// alert(capacitycount);
	}
	componentDidMount(){
			this.props.selectedDate&&this.loadVenuesPax_SeatsData(this.props.selectedDate);
	}
	callfunc=(data,type)=>{
		if(type=='B'){
		this.setState({openmodel:true,currendata:data})
	   }else{

	   }
	}
	unblockslot=(data)=>{
		var obj={bookingId:data,reason:this.state.reason,bookingSlotType:3};
		// alert(JSON.stringify(obj));
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
		  this.props.loadBookedData&&this.props.loadBookedData();
		  })
	}
	closemodel=(successddata)=>{
		// alert(successddata);
		this.setState({openmodel:false})
		if(successddata==="ok"){
			this.state.currendata && this.unblockslot(this.state.currendata)
		}
	}
	render() {
		// console.log("selectedFromCalendarBookd",this.props.venueDetails);
		var availability=this.state.availability;
		// var availabilitydata=this.props.venueDetails&&this.props.venueDetails.availability[0];
		return (
			<div className="BlockingDates">
			{/*
			<BoxCard closeBox={()=>this.props.close&&this.props.close()} close={true} icon={true} headerImg={""} headerText={this.generateVenueType(this.props.venuetype,this.props.type)}/>*/}
			
			<BoxCard closeBox={()=>this.props.close&&this.props.close()} close={true} icon={true} headerImg={""}>
			<div className="text_flex mt-3">
				<div onClick={()=>this.setState({changetabclr:true})} className={`mr-3 ${this.state.changetabclr?"clrred":null}`} >
				{this.generateVenueType(this.props.venuetype,this.props.type)}
				</div>
				<div onClick={()=>this.setState({changetabclr:false})}  className={`ml-2 ${this.state.changetabclr===false?"clrred":null}`}>
				Bookings
				</div>
				</div>
				</BoxCard>
			{this.props.venuetype&&(this.state.changetabclr==true ||this.state.changetabclr==null )&&
			<div className="flexbox">
				<div>
				<p className="header">From Date</p>
				<p>{this.props.selectedDates&&dateFormat(this.props.selectedDates[0],'yyyy-mm-dd')}</p>
				</div>
				<div>-</div>
				<div>
				<p className="header">To Date</p>
				<p>{this.props.selectedDates&&dateFormat(this.props.selectedDates[1],'yyyy-mm-dd')}</p>
				</div>
			</div>
			}
			{this.props.venuetype&&
				<>
			{this.state.loading&&<div className='centerDiv'><CircularProgress/></div>}

          {availability&&availability.availableCapacity!=0&&
				<div className="paxseatcenter">
			          <div>
			          <Slider
				       defaultValue={this.props.venuetype&&this.props.venuetype==3?0:availability&&availability.trn_venue_min_count}
				        aria-labelledby="discrete-slider-always"
				        step={1}
				         // onChange={this.handleChange}
				        min={this.props.venuetype&&this.props.venuetype==3?0:(availability?availability.trn_venue_min_count:0)}
				        marks={[availability?availability.trn_venue_max_count:0]}
				        max={availability?(availability.availableCapacity):0}
				        valueLabelDisplay="on"
				        getAriaValueText={valuetext}
				      />
			          <div className="availablebooktextdiv">Available {this.props.venuetype&&this.props.venuetype==3?'Seats':'Pax'} ({availability?(availability.availableCapacity):0})</div>
			          </div>
          </div>
      }
      
          </>
			}
			{(this.state.changetabclr==true ||this.state.changetabclr==null )&&
			<BlockForm  seatobj={this.props.seatobj} availableSeats={this.props.availableSeats} type={this.props.type} selectedDate={this.props.selectedDate} sendPaxorSeatsData={(data)=>this.sendPaxorSeatsData(data)} venuetype={this.props.venuetype} updateSlots={()=>this.props.updateMonth&&this.props.updateMonth()} fromDate={this.props.selectedDates&&this.props.selectedDates[0]} toDate={this.props.selectedDates&&this.props.selectedDates[1]}  availability={this.props.venueDetails&&this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0]} noHour={true}/>
			}
			{this.state.changetabclr==false&&
					<BlockingCardDiv type={this.props.type} venuetype={this.props.venuetype} availability={this.props.availability} callfunc={(data,data1)=>this.callfunc(data,data1)}/>
			}
			 {this.state.openmodel && <Reasonmodel sendSlotType={(data)=>this.setState({slotType:data})} sendText={(value)=>this.setState({reason:value})} modeltrue={this.state.openmodel} closemodel={(datasuc)=>this.closemodel(datasuc)}/>}

			</div>
		);
	}
}
