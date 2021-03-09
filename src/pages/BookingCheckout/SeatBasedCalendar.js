import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  usePickerState,
  TimePicker
} from '@material-ui/pickers';
import ValidationLibrary from '../../helpers/validationfunction';
 import {notification} from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Modal, Button } from 'antd';
import BlockForm from '../../components/BlockForm/BlockForm'
import SlotLegend from '../../components/slotLabel/SlotLable';
import startOfWeek from "date-fns/startOfWeek";
import dateFormat from 'dateformat';
import Apilink from '../../helpers/apilink';
import { DatePicker } from "@material-ui/pickers";
import Slider from '@material-ui/core/Slider';
import WeekCalendar from '../../components/weekCalendar/WeekCalendar';
import moment from 'moment';
import RangeCalendar from './RangeCalendar';
var capacitycount=0;
const excludeDays=[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}]

var noslotavailable="No Slot Avaialble";
function valuetext(value) {
  capacitycount=value;
}
function getMinValue(data) {
  return data.reduce((min, p) => p.count < min ? p.count : min, data[0].count);
}

export default class SeatBasedCalendar extends React.Component {

constructor(props) {
	super(props);
	this.state={dateValue:new Date(),counter:0,adultcounter:0,childcounter:0,showSeat:false,blockedSlots:[],seatCounter:0,availability:null,hourlychosenslots:null,availableSeats:0,dates:null,datescount:0,showslots:false}
}


handleCancel=()=>{
this.props.closeHourModal&&this.props.closeHourModal();
}
handleOk=()=>{
// console.log('capacitycount',capacitycount);
// if(this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)){
//   this.props.sendpaxDetails&&this.props.sendpaxDetails(capacitycount,this.state.dateValue)
// }else{
//  this.props.sendDataSlot&&this.props.sendDataSlot(this.state.hourlySLotsData.length>0?this.state.hourlySLotsData:dateFormat(this.state.dateValue,'yyyy-mm-dd'));
// }
}
changeDate=(date,quantity)=>{
// alert(quantity);
	// console.log(this.props.excludeDays,"dateValue") 
  noslotavailable="No Slot Avaialble"
 // this.setState({dateValue:date});
  if(Array.isArray(this.props.excludeDays)==true){
    // noslotavailable="No Slot Avaialble"
    if(this.props.excludeDays.includes(String(date.getDay()))){
      noslotavailable="Days Falls Under Exclude Days ("+this.props.excludeDays.map((obj1)=>{return excludeDays[parseInt(obj1)].label})+")";
        this.setState({showslots:false,dontupdate:false,showSeat:false,rangeData:0,dateValue:date});
        capacitycount=0;
    return true;
    }
  }
    this.setState({dontupdate:null,showSeat:false,dateValue:date,showslots:true,loading:true});
	// // this.setState({dontupdate:false,dateValue:date,loading:true});
	var venueid=this.props.venueDetails?this.props.venueDetails.venue_id:null;
		var obj={venueId:venueid,date:dateFormat(new Date(date),'yyyy-mm-dd'),availType:1,uniqueId:this.props.currentSeat[0].seat_unique_id};
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
    	 	if(respjson.status==0){
    		this.setState({availability:respjson.data[0]});
    	}else{
    		this.setState({availability:null})
    	}
    })
 //      this.setState({loading:null});
 //    	console.log("responsejson",respjson);
 //    	if(respjson.status==0){
 //        var bookingLength=(respjson.data.length>0&&respjson.data[0].bookingDetails)?respjson.data[0].bookingDetails:[]
 //        // if(bookingLength.length>0){
 //            if(bookingLength.length<(quantity?quantity:0)){
 //              // alert("available...");
 //              noslotavailable="Available"
 //              this.setState({showPax:true});
 //            }else{
 //              // alert("notavailable");
 //              noslotavailable="No Pax Available"
 //              this.setState({showPax:false});
 //            }
 //        // }
 //    	// 	this.setState({availability:respjson.data[0],min:respjson.data[0].trn_venue_min_count,});
     
 //    	}else{
 //              this.setState({showPax:true});

 //    	// 	this.setState({availability:null,rangeData:0})
 //     //    capacitycount=0;
 //    	}

 //    })
}
receiveSlots=(data,date)=>{
	console.log('data',data);
	var hourlychosenslots=this.state.hourlychosenslots;
	if(!hourlychosenslots){
			hourlychosenslots=[];
		}

		if(data.length>0){
		// var objdate={date:dateFormat(date,'yyyy-mm-dd'),slots:data}
		// hourlychosenslots=[objdate];
	data.map((obj,index)=>{
		var findindex=hourlychosenslots.findIndex((obj1)=>obj1.date==dateFormat(date,'yyyy-mm-dd'));
		if(findindex!=-1){
			hourlychosenslots[findindex].slots=data;
		}else{
		var objdate={date:dateFormat(date,'yyyy-mm-dd'),slots:data}
		
		hourlychosenslots.push(objdate);
		}
	})
}else{
		var findindex=hourlychosenslots.findIndex((obj1)=>obj1.date==dateFormat(date,'yyyy-mm-dd'));
		if(findindex!=-1){
			hourlychosenslots.splice(findindex,1);
		}
}
var HourDataArray=[];
hourlychosenslots.map((obj)=>{
			obj.slots.map((obj2)=>{
				var objdata={fromdate:obj.date,todate:obj.date,slotFromTime:obj2.venue_slot_start_time,slotToTime:obj2.venue_slot_end_time}
				HourDataArray.push({count:obj2.AvailbleSeatsCount})
			})
		})
this.setState({availableSeats:HourDataArray.length>0?getMinValue(HourDataArray):0});

	this.setState({hourlychosenslots:hourlychosenslots,dontupdate:true});
}
submitSeatPax=(currentSeat,totalseats,currency,totalcost)=>{
 //  var totalPax=this.state.adultcounter + this.state.childcounter;
 //  // var currentPax=this.state.currentpax?this.state.currentpax[0]:null;
  if(totalseats >this.state.availableSeats){
 notification.error({
       message:'Error Message',
       description:"Total Seats Exceeding Available Seat Value",
       onClick:() => {
         console.log('Notification Clicked!');
       },
     });
 return;
  }
  if(totalcost==0){
  	notification.error({
       message:'Error Message',
       description:"Invalid Entry Of Seats",
       onClick:() => {
         console.log('Notification Clicked!');
       },
     });
  	return;
  }
 //  }else{
 	var bookingArray=[{
			"exchangeRate":0,
			"seatName":currentSeat.seat_name,
			"seatQty":totalseats,
			"paxName":"",
			"paxCost":"",
			"paxQty":0,
			"paxRate":"",
			"paxRateType":"",
			"uniqueId":currentSeat.seat_unique_id
	}]
	var hourlychosenslots=this.state.hourlychosenslots;
	var hoursArray=[];
		var newArrayofSlots=hourlychosenslots&&hourlychosenslots.map((obj)=>{
			obj.slots.map((obj2)=>{
				var objdata={fromdate:obj.date,todate:obj.date,slotFromTime:obj2.venue_slot_start_time,slotToTime:obj2.venue_slot_end_time}
				hoursArray.push(objdata)
			})
		})
		var objData={slots:hoursArray,seatArray:bookingArray,seatslots:this.state.hourlychosenslots,totalcost:totalcost,dayscount:this.getcountDatesLength(this.state.datescount),dates:this.state.dates};
		if(this.props.availType==1){
		  this.props.sendSeatDetails&&this.props.sendSeatDetails(objData);
		}else{
			this.props.sendSeatDetails&&this.props.sendSeatDetails(objData);
		}
	// alert(JSON.stringify(hoursArray));
	return;
 //    var bookingArray=[{
 //      "exchangeRate":0,
 //      "seatName":"",
 //      "seatQty":0,
 //      "paxName":currentpax?currentpax.venue_pax_name:'',
 //      "paxCost":totaladultcost,
 //      "paxQty":this.state.adultcounter,
 //      "paxRate":"Adult",
 //      "paxRateType":paxpriceratetype.length>0?paxpriceratetype[0].day_type_name:'',
 //      "perpax":currentpax?currentpax.Adult:0,
 //      "uniqueId":currentpax?currentpax.pax_unique_id:0
 //  },{
 //      "exchangeRate":0,
 //      "seatName":"",
 //      "seatQty":0,
 //      "paxName":currentpax?currentpax.venue_pax_name:'',
 //      "paxCost":totalchildcost,
 //      "paxQty":this.state.childcounter,
 //      "paxRate":"Child",
 //      "paxRateType":paxpriceratetype.length>0?paxpriceratetype[0].day_type_name:'',
 //      "perpax":currentpax?currentpax.Child:0,
 //      "uniqueId":currentpax?currentpax.pax_unique_id:0
 //  }]
 //   var bookingcostDetails={date:this.state.dateValue,paxArray:bookingArray,total:(totaladultcost+totalchildcost),currency:currency,currentpackage:currentpax};
 //   this.props.sendPaxDetails&&this.props.sendPaxDetails(bookingcostDetails);
 //   // alert(JSON.stringify(bookingcostDetails)); 
 //    // var obj={date:this.state.dateValue,adult:this.state.adultcounter,child:this.state.childcounter,totalcounter:(this.state.adultcounter+this.state.childcounter)}
 //  }
}
onMonthChange=(data,currentypax)=>{
    console.log("nextmonth",data)
    var venue_id=this.props.venueDetails&&this.props.venueDetails.venue_id;
    var uniqueid=this.props.currentSeat?this.props.currentSeat[0].seat_unique_id:null;
        var startofmonth   = moment(data).startOf('month').format('YYYY-MM-DD');
        var endofmonth   = moment(data).endOf('month').format('YYYY-MM-DD');
        var minDate=moment(this.props.availability.trn_venue_avail_frm).format('YYYY-MM-DD');
        var maxDate=moment(this.props.availability.trn_venue_avail_to).format('YYYY-MM-DD');
        var currentDate=moment().format('YYYY-MM-DD');
    // console.log(minDate);
    // console.log(maxDate);
    // console.log(currentDate);
    var validatecurrent=startofmonth>=minDate?startofmonth:(minDate<=currentDate?currentDate:minDate);
    var validateend=endofmonth<=maxDate?endofmonth:maxDate;
    // var validateend=startofmonth<=currentDate?new Date():new Date(minDate);
        var obj={venueId:venue_id,date:validatecurrent,todate:validateend,uniqueId:uniqueid,availType:this.props.availType};
        console.log("uniqueobx",obj);
        fetch(Apilink.apiurl+"getHourlyAvailability",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
        .then((responsejson)=>{
          console.log("blockedresponsejson",responsejson);
          if(responsejson.status==0){
            this.setState({blockedSlots:responsejson.data.length>0?responsejson.data[0].availability:[]})
          }else{
            this.setState({blockedSlots:[]});
          }
           return new Promise(resolve => {
    resolve(true);
          })
        })
    // // this.setState({})

    // // this.setState({[key]:data},function(){
    // //   console.log("chosenDates&months",this.state)
    // //   this.props.refreshblockeddates&&this.props.refreshblockeddates({fromMonth:dateFormat(this.state.fromMonth,'yyyy-mm-dd'),toMonth:moment(this.state.toMonth).endOf('month').format('YYYY-MM-DD')})
    // // });
 
  }
handleChange = (event, newValue) => {
  // capacitycount=newValue;
  };
  generateVenueType=(type,availtype)=>{
    // if(type==2){
    //   return 2;
    // }else if(type==3){
    //   return 3;
    // }else if((!type || type==1)&&availtype==1){
    //   return 1;
    // }else if((!type || type==1)&&availtype==2){
    //   return 4;
    // }else if((!type || type==1)&&availtype==3){
    //   return 5;
    // }else{
    //   return 6;
    // }
    }
    changeCounter=(data,keyname)=>{
    // var counter=this.state.counter;

    var checkvalidation=ValidationLibrary.checkValidation(data,[{name:'allowNumaricOnly'}]);
    // console.log('checkvalidation',checkvalidation);
    if(checkvalidation.state==false){
      data=data.replace(/[^0-9.]/g, "");
    }
    this.setState({[keyname]:parseInt(data==""?0:data)});
    // this.setState({counter:parseInt(data==""?0:data)});
    // this.props.seatDetails&&this.props.seatDetails({counter:parseInt(data==""?0:data),seatname:this.props.activeobj.seatname})
  }
  counterValue=(data,keyname)=>{
    var counter=parseInt(this.state[keyname]);
    if(data=='-'){
      counter-=1;
      if(counter<0){
        counter=0;
      }
    }else{
      counter+=1;
    }
   this.setState({[keyname]:counter});
  }
  generateAmountType=(data,type)=>{
    // if(type==0 || type==6){
    //   return data.filter((obj)=>obj.day_type_code=="wk_end");
    // }else if(type==5){
    //   return data.filter((obj)=>obj.day_type_code=="spc_day");
    // }else{
    //   return data.filter((obj)=>obj.day_type_code=="wk_day");
    // }
  }
  disableDates=(date)=>{
  	// return false;
    var selectedDate=moment(date).format('YYYY-MM-DD');
    var blockedSlots=this.state.blockedSlots;
    // console.log(blockedSlots);
    var filteredRecords=blockedSlots.filter((obj)=>obj.selected_date==selectedDate&&obj.blockedCheccking==true);
    if(filteredRecords.length>0){
        return true;
    }
    return false;
  }
 returnTotalSlots=(data)=>{
 	var count=0;
 	data.map((obj)=>{
 		count+=obj.slots.length;
 	})
 	return count;
 }
 editSlots=()=>{
 	// debugger;
 	this.changeDate(this.state.dateValue);
 	this.setState({showSeat:false,showslots:true})
 }
 submitdaycalendar=(data)=>{
 	console.log("dayCalendar",data);
    var venue_id=this.props.venueDetails&&this.props.venueDetails.venue_id;
    var uniqueid=this.props.currentSeat?this.props.currentSeat[0].seat_unique_id:null;
 	var fromDate=dateFormat(data.fromDate,'yyyy-mm-dd');
 	var toDate=dateFormat(data.endDate,'yyyy-mm-dd');
 	this.setState({dates:{fromDate:fromDate,toDate:toDate}});
 	var obj={venueId:venue_id,date:fromDate,todate:toDate,uniqueId:uniqueid,availType:this.props.availType};
 	// var obj={venueId:venue_id,date:fromDate,todate}
 	// fetch(Apilink.apiurl+"checkAvailabilityForRange")
 	this.setState({loading:true});
 	fetch(Apilink.apiurl+"checkAvailabilityForRange",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
    .then((responsejson)=>{
    	this.setState({loading:false});
    	if(responsejson.status==0){
    		this.setState({showSeat:true,showslots:false,availableSeats:responsejson.availCount,datescount:responsejson.datesLength})
    	}else{
    		noslotavailable=responsejson.msg;
    		this.setState({showSeat:false,showslots:false})
    	}
    })
 }

 generateHourorWeek=(data)=>{
   if(data==1){
     return "Hour"
   }else if(data==2){
     return "Day";
   }else if(data==3){
     return "Week";
   }else{
     return "Month";
   }
 }
 getcountDatesLength=(getDates)=>{
 	var pricetypedata=this.props.availType;
 	var quantity=0;
 	if(pricetypedata=='4'){
	quantity=Math.ceil(getDates/30);
	// typeofvenue='Month';
}else if(pricetypedata=='3'){
	quantity=Math.ceil(getDates/7);
	// typeofvenue='Week';
}else{
quantity=getDates;
// typeofvenue='Day';
}
return quantity;
 }
	render() {
    console.log("this.state.lseat",this.state)
    // alert(this.props.type);
    console.log("hourlychosenslots",this.state.hourlychosenslots)
    var venuetype=this.props.venueDetails&&this.props.venueDetails.trn_venue_type;
    var currentSeat=this.props.currentSeat?this.props.currentSeat:null;
    // console.log(currentpax);
    var currentDay=this.state.dateValue.getDay();
    var currentObjectSeat=(currentSeat&&currentSeat.length>0)?currentSeat[0]:null
    var currentObjectPricing=this.generateAmountType(((currentSeat&&currentSeat.length>0)?currentSeat[0].priceDetails:[]),currentDay);
    var totalAdultcost=0;
    var totalchildcost=0;
    var minDate=moment(this.props.availability.trn_venue_avail_frm).format('YYYY-MM-DD');
    var maxDate=moment(this.props.availability.trn_venue_avail_to).format('YYYY-MM-DD');
    // var maxDate=this.props.availability.trn_venue_avail_to;
    var totalslots=(this.state.hourlychosenslots)?this.returnTotalSlots(this.state.hourlychosenslots):0
    var totalseatcost=this.state.seatCounter * (this.props.percost * (this.props.availType==1?totalslots:this.getcountDatesLength(this.state.datescount)));
    // var totalwithoucountercost=

    var currentDate=moment().format('YYYY-MM-DD');
    console.log(minDate);
    console.log(maxDate);
    console.log(currentDate);
    var validatecurrent=minDate<=currentDate?new Date():new Date(minDate);
		return (
			<div className="HourlyAvailablityDiv">
  <Modal
   className="splitSLotFormDivModal percent_80"
   width={window.innerWidth}
          title="Availablity"
          visible={true}
            onOk={()=>this.handleOk()}
          onCancel={()=>this.handleCancel()}
          footer = {null}
        style={{ top: 20 }}
        >
<div className="HourlyAvailFlexdiv">
<div  className={`${window.innerWidth<768 ? "mobileweb_FirstDiv" : "FirstDiv"}`}>
  { (window.innerWidth<768 ?(this.props.availType==1?(
    <WeekCalendar propssend={(date)=>this.changeDate(date,currentObjectSeat&&currentObjectSeat.seat_qty)}/>):(<RangeCalendar submitDate={(dates)=>this.submitdaycalendar(dates)} minDate={minDate} maxDate={maxDate} blockedslots={this.state.blockedSlots}/>))
    :
    (this.props.availType==1?(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

			   <DatePicker
				   	disablePast={true}
					    orientation="landscape"
			        variant="static"
			        orientation="landscape"
			        variant="static"
			        openTo="date"
              minDate={validatecurrent}
              maxDate={new Date(maxDate)}
              onMonthChange={(date)=>this.onMonthChange(date)}
              shouldDisableDate={(date)=>this.disableDates(date)}
			        onChange = {(date)=>this.changeDate(date,currentObjectSeat&&currentObjectSeat.seat_qty)}
			        value={this.state.dateValue}
        	   />
        </MuiPickersUtilsProvider>):(<RangeCalendar submitDate={(dates)=>this.submitdaycalendar(dates)} minDate={minDate} maxDate={maxDate} blockedslots={this.state.blockedSlots}/>)))
  }
    
        
        </div>
        <div className="SecondDiv">
        {this.state.loading&&
        <div className="loaderdivclass">
           <LinearProgress/>
           <p>Please Wait...</p>
           </div>
         }
         {!this.state.loading&&(this.state.showSeat==false&&this.state.showslots==false)&&
          <div className="noslotsavaialble">{noslotavailable}</div>
         }
         {!this.state.loading&&this.state.showslots==true&&
         <div> <BlockForm venuetype={venuetype} dontupdate={this.state.dontupdate} hourlychosenslots={this.state.hourlychosenslots} noform={true} hide={false} updateSlots={()=>this.props.updateSlots&&this.props.updateSlots()} selectedDate={this.state.dateValue} sendSlots={(data,date)=>this.receiveSlots(data,date)} availability={this.state.availability}/>
         <div className="PaxSeatPackageDiv_footer removeTopBottomfooter">
         <button className="btn btn-submit" onClick={()=>this.setState({showslots:false,showSeat:true})}>Next</button>
         </div>
         </div>
         }
         {!this.state.loading&&this.state.showSeat==true&&

         <div className="PaxSeatPackageDiv">
         <div className="PaxSeatPackageDiv_header">
         <h4>{currentObjectSeat&&currentObjectSeat.seat_name}</h4>
         <div className="rightfloatdiv">
           <h5>Available Seats {this.state.availableSeats&&this.state.availableSeats}</h5>
         </div>
         </div>
         <div className="PaxSeatPackageDiv_body">
         <div className="paxFormBox">
         <div className="paxFormBoxflexinside">
         <h5>No Of Seats</h5>
         <div className="incrementbox bgwhite">
            <a onClick={()=>this.counterValue('-','seatCounter')}>-</a>
            <p><input value={this.state.seatCounter} onChange={(e)=>this.changeCounter(e.target.value,'seatCounter')}/></p>
            <a onClick={()=>this.counterValue('+','seatCounter')}>+</a>
        </div>
       <p className="perpaxdiv light">{this.props.percost} Per {this.generateHourorWeek(this.props.availType)}  x {this.props.availType==1?totalslots:this.getcountDatesLength(this.state.datescount)} </p>
       </div>
     
       <p className="perpaxdiv bold">{totalseatcost} </p>
         </div>
         {this.props.availType==1&&
           <div className="paxFormBox">
         <div className="paxFormBoxflexinside">
       	 <p className="perpaxdiv light"></p>
         <h5>No Of Slots Chosen : {totalslots} Slots <a onClick={()=>this.editSlots()} className="editSlotsData"><i className="fa fa-pencil"/></a></h5>
       </div>
         </div>
    	}
    	{this.props.availType!=1&&
           <div className="paxFormBox">
         <div className="paxFormBoxflexinside">
       	 <p className="perpaxdiv light"></p>
       	 {this.state.dates&&

         <h5>{this.state.dates.fromDate} - {this.state.dates.toDate}</h5>
       	 }
       </div>
         </div>
    	}
         <div className="finalPriceBoxFlex">
           <div></div>
           <div className="finapriceBoxInside">
             <p className="orange">Total <span>({currentObjectSeat&&currentObjectSeat.priceDetails.length>0&&currentObjectSeat.priceDetails[0].currency})</span></p>
             <p className="borderbottomtop">{totalseatcost}</p>
           </div>
         </div>
         </div>
         <div className="PaxSeatPackageDiv_footer">
           <button style={{marginRight:5,backgroundColor:'#FF5722'}} className="btn btn-submit" onClick={()=>this.handleCancel()}>Cancel</button>
         <button className="btn btn-submit" onClick={()=>this.submitSeatPax(currentObjectSeat,this.state.seatCounter,currentObjectSeat&&currentObjectSeat.priceDetails.length>0&&currentObjectSeat.priceDetails[0].currency,totalseatcost)}>Submit</button>
         </div>
         </div>
       }
         
             
                </div>
			</div>
      </Modal>
      </div>
		);
	}
  componentDidMount(){
    var currentSeat=this.props.currentSeat?this.props.currentSeat:null;
    if(this.props.availType==1){
    // this.changeDate(new Date(),null);
    this.setState({hourlychosenslots:this.props.hourlychosenslots})
  }
    // alert(this.props.hourlychosenslots);
    this.onMonthChange(new Date())
  }
}
