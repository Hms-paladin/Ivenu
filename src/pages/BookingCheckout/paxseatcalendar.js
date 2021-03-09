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
var capacitycount=0;
const excludeDays=[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}]

var noslotavailable="No Slot Avaialble";
function valuetext(value) {
  capacitycount=value;
}

export default class PaxSeatCalendar extends React.Component {

constructor(props) {
	super(props);
	this.state={dateValue:new Date(),counter:0,adultcounter:0,childcounter:0,showPax:false,blockedSlots:[]}
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
        this.setState({dontupdate:false,showPax:false,rangeData:0,dateValue:date});
        capacitycount=0;
    return true;
    }
  }
    this.setState({showPax:true,dateValue:date,loading:true});
	// this.setState({dontupdate:false,dateValue:date,loading:true});
	var venueid=this.props.venueDetails?this.props.venueDetails.venue_id:null;
		var obj={venueId:venueid,date:dateFormat(new Date(date),'yyyy-mm-dd'),availType:1,uniqueId:this.props.currentPax[0].pax_unique_id};
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
    	console.log("responsejson",respjson);
    	if(respjson.status==0){
        var bookingLength=(respjson.data.length>0&&respjson.data[0].bookingDetails)?respjson.data[0].bookingDetails:[]
        // if(bookingLength.length>0){
            if(bookingLength.length<(quantity?quantity:0)){
              // alert("available...");
              noslotavailable="Available"
              this.setState({showPax:true});
            }else{
              // alert("notavailable");
              noslotavailable="No Pax Available"
              this.setState({showPax:false});
            }
        // }
    	// 	this.setState({availability:respjson.data[0],min:respjson.data[0].trn_venue_min_count,});
     
    	}else{
              // this.setState({showPax:true});
               noslotavailable=respjson.msg;
              this.setState({showPax:false});
    	// 	this.setState({availability:null,rangeData:0})
     //    capacitycount=0;
    	}

    })
}
receiveSlots=(data)=>{
	// this.setState({hourlySLotsData:data,dontupdate:true})

}
submitSeatPax=(min,max,currentpax,totaladultcost,totalchildcost,paxpriceratetype,currency)=>{
  var totalPax=this.state.adultcounter + this.state.childcounter;
  // var currentPax=this.state.currentpax?this.state.currentpax[0]:null;
  if(totalPax >max){
 notification.error({
       message:'Error Message',
       description:"Total Pax Exceeding Maximum Pax Value",
       onClick:() => {
         console.log('Notification Clicked!');
       },
     });
  }else if(totalPax < min){
 notification.error({
       message:'Error Message',
       description:"Total Pax Should Alteast More Than Minimum Pax Value",
       onClick:() => {
         console.log('Notification Clicked!');
       },
     });
  }else{
    var bookingArray=[{
      "exchangeRate":0,
      "seatName":"",
      "seatQty":0,
      "paxName":currentpax?currentpax.venue_pax_name:'',
      "paxCost":totaladultcost,
      "paxQty":this.state.adultcounter,
      "paxRate":"Adult",
      "paxRateType":paxpriceratetype.length>0?paxpriceratetype[0].day_type_name:'',
      "perpax":currentpax?currentpax.Adult:0,
      "uniqueId":currentpax?currentpax.pax_unique_id:0
  },{
      "exchangeRate":0,
      "seatName":"",
      "seatQty":0,
      "paxName":currentpax?currentpax.venue_pax_name:'',
      "paxCost":totalchildcost,
      "paxQty":this.state.childcounter,
      "paxRate":"Child",
      "paxRateType":paxpriceratetype.length>0?paxpriceratetype[0].day_type_name:'',
      "perpax":currentpax?currentpax.Child:0,
      "uniqueId":currentpax?currentpax.pax_unique_id:0
  }]
   var bookingcostDetails={date:this.state.dateValue,paxArray:bookingArray,total:(totaladultcost+totalchildcost),currency:currency,currentpackage:currentpax};
   this.props.sendPaxDetails&&this.props.sendPaxDetails(bookingcostDetails);
   // alert(JSON.stringify(bookingcostDetails)); 
    // var obj={date:this.state.dateValue,adult:this.state.adultcounter,child:this.state.childcounter,totalcounter:(this.state.adultcounter+this.state.childcounter)}
  }
}
onMonthChange=(data,currentypax)=>{
    console.log("nextmonth",data)
    var venue_id=this.props.venueDetails&&this.props.venueDetails.venue_id;
    // var uniqueid=this.props.currentPax?this.props.currentPax:null
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
        var obj={venueId:venue_id,date:validatecurrent,todate:validateend,uniqueId:currentypax?currentypax[0].pax_unique_id:0};
        // console.log("uniqueobx",obj);
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
    // this.setState({})

    // this.setState({[key]:data},function(){
    //   console.log("chosenDates&months",this.state)
    //   this.props.refreshblockeddates&&this.props.refreshblockeddates({fromMonth:dateFormat(this.state.fromMonth,'yyyy-mm-dd'),toMonth:moment(this.state.toMonth).endOf('month').format('YYYY-MM-DD')})
    // });
 
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
    if(type==0 || type==6){
      return data.filter((obj)=>obj.day_type_code=="wk_end");
    }else if(type==5){
      return data.filter((obj)=>obj.day_type_code=="spc_day");
    }else{
      return data.filter((obj)=>obj.day_type_code=="wk_day");
    }
  }
  disableDates=(date)=>{
    var selectedDate=moment(date).format('YYYY-MM-DD');
    var blockedSlots=this.state.blockedSlots;
    console.log(blockedSlots);
    var filteredRecords=blockedSlots.filter((obj)=>obj.selected_date==selectedDate&&obj.blockedCheccking==true);
    if(filteredRecords.length>0){
        return true;
    }
  }
	render() {
    // alert(this.props.type);
    var venuetype=this.props.venueDetails&&this.props.venueDetails.trn_venue_type;
    var currentpax=this.props.currentPax?this.props.currentPax:null;
    console.log(currentpax);
    var currentDay=this.state.dateValue.getDay();
    var currentObjectPax=(currentpax&&currentpax.length>0)?currentpax[0]:null
    var currentObjectPricing=this.generateAmountType(((currentpax&&currentpax.length>0)?currentpax[0].priceDetails:[]),currentDay);
    var totalAdultcost=parseInt(currentObjectPricing.length>0?currentObjectPricing[0].Adult:0)*this.state.adultcounter;
    var weekchoosenType=(currentDay==0 || currentDay==6)?'Week End':(currentDay==5?'Special Day':'Week Day');
    var totalchildcost=parseInt(currentObjectPricing.length>0?currentObjectPricing[0].Child:0)*this.state.childcounter;
    var minDate=moment(this.props.availability.trn_venue_avail_frm).format('YYYY-MM-DD');
    var maxDate=moment(this.props.availability.trn_venue_avail_to).format('YYYY-MM-DD');
    // var maxDate=this.props.availability.trn_venue_avail_to;
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
  { (window.innerWidth<768 ?
    <WeekCalendar propssend={(date)=>this.changeDate(date,currentObjectPax&&currentObjectPax.pax_booking_qty)}/>
    :
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
			        onChange = {(date)=>this.changeDate(date,currentObjectPax&&currentObjectPax.pax_booking_qty)}
			        value={this.state.dateValue}
        	   />
        </MuiPickersUtilsProvider>)
  }
    
        
        </div>
        <div className="SecondDiv nobackground">
        {this.state.loading&&
        <div className="loaderdivclass">
           <LinearProgress/>
           <p>Please Wait...</p>
           </div>
         }
         {!this.state.loading&&this.state.showPax==false&&
          <div className="noslotsavaialble">{noslotavailable}</div>
         }

         {!this.state.loading&&this.state.showPax==true&&

         <div className="PaxSeatPackageDiv">
         <div className="PaxSeatPackageDiv_header">
         <h4>{currentObjectPax&&currentObjectPax.venue_pax_name}</h4>
         <div className="rightfloatdiv">
           <h5>Minimum Pax {currentObjectPax&&currentObjectPax.pax_min}</h5>
           <h5>Maximum Pax {currentObjectPax&&currentObjectPax.pax_max}</h5>
         </div>
         </div>
         <div className="PaxSeatPackageDiv_body">
         <div className="paxFormBox">
         <div className="paxFormBoxflexinside">
         <h5>Adult</h5>
         <div className="incrementbox">
            <a onClick={()=>this.counterValue('-','adultcounter')}>-</a>
            <p><input value={this.state.adultcounter} onChange={(e)=>this.changeCounter(e.target.value,'adultcounter')}/></p>
            <a onClick={()=>this.counterValue('+','adultcounter')}>+</a>
        </div>
       <p className="perpaxdiv light">{currentObjectPricing.length>0?currentObjectPricing[0].Adult:0} Per Pax</p>
       </div>
       <p className="perpaxdiv bold">{totalAdultcost}</p>
         </div>
         <div className="paxFormBox">
         <div className="paxFormBoxflexinside">
         <h5>Child</h5>
         <div className="incrementbox">
            <a onClick={()=>this.counterValue('-','childcounter')}>-</a>
            <p><input value={this.state.childcounter} onChange={(e)=>this.changeCounter(e.target.value,'childcounter')}/></p>
            <a onClick={()=>this.counterValue('+','childcounter')}>+</a>
        </div>
       <p className="perpaxdiv light">{currentObjectPricing.length>0?currentObjectPricing[0].Child:0} Per Pax</p>
       </div>
       <p className="perpaxdiv bold">{totalchildcost}</p>
         </div>
         <div className="finalPriceBoxFlex">
           <div></div>
           <div className="finapriceBoxInside">
             <p className="orange">{weekchoosenType} <span>({currentObjectPricing.length>0?currentObjectPricing[0].currency:0})</span></p>
             <p className="borderbottomtop">{totalchildcost+totalAdultcost}</p>
           </div>
         </div>
         </div>
         <div className="PaxSeatPackageDiv_footer">
         <button className="btn btn-submit" onClick={()=>this.submitSeatPax(currentObjectPax&&currentObjectPax.pax_min,currentObjectPax&&currentObjectPax.pax_max,currentObjectPax,totalAdultcost,totalchildcost,currentObjectPricing,currentObjectPricing.length>0?currentObjectPricing[0].currency:0)}>Submit</button>
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
    var currentPax=this.props.currentPax?this.props.currentPax:null;
    this.changeDate(new Date(),currentPax?currentPax[0].pax_booking_qty:null);

    this.onMonthChange(new Date(),currentPax)
  }
}
