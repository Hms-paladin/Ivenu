import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  usePickerState,
  TimePicker
} from '@material-ui/pickers';
import { Card,Rate,Row,Col,Icon,notification  } from 'antd';

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
import moment from 'moment';
import DateFunctions from '../../helpers/DateFunctions';

var capacitycount=0;
function valuetext(value) {
  capacitycount=value;
}


export default class DayCalendar extends React.Component {


constructor(props) {
	super(props);
 
	this.state={dateValue:null,toValue:null,availability:null,hourlySLotsData:[],rangeData:0,loading:null,selectedDiv:'',fromDate:null,endDate:null,startdiv:null,enddiv:null,toMonth:new Date(new Date().setMonth(new Date().getMonth()+1)),fromMonth:new Date()}
}
handleCancel=()=>{
this.props.closeHourModal&&this.props.closeHourModal();
}
    shouldDisableDates=(date,min,max)=>{
  	// var minDate=dateFormat(new Date(min),'yyyy-mm-dd');
  	// var maxDate=dateFormat(new Date(max),'yyyy-mm-dd');
  	// var selectedDate=dateFormat(date,'yyyy-mm-dd');

  	// console.log(selectedDate +"<="+maxDate)
  	console.log('blockedslots',this.props.blockedslots);
  	if(this.props.blockedslots){
  		var selectedDate=dateFormat(date,'yyyy-mm-dd');
  		var filterRecords=this.props.blockedslots.filter((obj)=>obj.selected_date==selectedDate)
  		if(filterRecords.length>0 && filterRecords[0].dateBlockedChecking==true){
  			return true;
  		}
  		// console.log("this.props.blockedslots",this.props.blockedslots);
  	}
  	if(date>=min&&date<=max){
  		return false;
  	}
  	return true;
  }
handleOk=()=>{
if(!this.state.fromDate || !this.state.endDate){
	      
		//        notification.error({
  //   message:'Error Message',
  //   description:"From Date or To Date is empty",
  //   onClick:() => {
  //     console.log('Notification Clicked!');
  //   },
  // });
			this.props.openRangeSelected&&this.props.openRangeSelected(null);
	}else{
		this.setState({loading:true})
	      fetch(Apilink.apiurl+'venueBooking', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify({bookingFrom:dateFormat(this.state.fromDate,'yyyy-mm-dd'),bookingTo:dateFormat(this.state.endDate,'yyyy-mm-dd'),venue_id:this.props.venudetails.venue_id,type:this.props.availType}),
}).then((response)=>response.json())
.then((responsejson)=>{
	console.log("okbuddy",responsejson);
	this.setState({loading:null})
	if(responsejson.status==0){
		this.props.openRangeSelected&&this.props.openRangeSelected({fromDate:this.state.fromDate,toDate:this.state.endDate})
	}else{
				       notification.error({
    message:'Error Message',
    description:responsejson.msg,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
	}
})

	}
}
changeDate=(date,key)=>{
// alert(date);
const {fromDate,endDate}=this.state;
// debugger;
	// console.log(this.props)
	// if(key=='dateValue'){
		if(fromDate && endDate){
			this.setState({endDiv:'',endDate:null,startdiv:'firstDivSelected',enddiv:'',fromDate:null},function(){
				
			})
			// this.setState({[key]:date});
			return;
		}
		if(fromDate){
			var tmp1=fromDate;
			var tmp2=date;
			if(tmp1>tmp2){
			this.setState({endDate:tmp1,enddiv:'endDivSelected',fromDate:tmp2},function(){
				
			});

				return;
			}
			this.setState({endDate:date,enddiv:'endDivSelected'},function(){
				
			})
		}else{
			this.setState({fromDate:date},function(){
				
			})
		this.setState({startdiv:'firstDivSelected'})
		}

	// this.setState({[key]:date});

}
receiveSlots=(data)=>{
	this.setState({hourlySLotsData:data,dontupdate:true});
}
handleChange = (event, newValue) => {
  capacitycount=newValue;
  // console.log('newValue',newValue)
  // this.setState({rangeData:newValue});
  };
  onMonthChange=(data,key)=>{
  	// alert('slots');
  	// console.log("nextmonth",data)
  	// this.setState({})
  	this.setState({[key]:data},function(){
  		console.log("chosenDates&months",this.state)
  		this.props.refreshblockeddates&&this.props.refreshblockeddates({fromMonth:dateFormat(this.state.fromMonth,'yyyy-mm-dd'),toMonth:moment(this.state.toMonth).endOf('month').format('YYYY-MM-DD')})
  	});
  return new Promise(resolve => {
  	resolve(true);
  })
  }
 
  compnentWillMount(){

  }
	render() {
		const startofdate=this.state.dateValue?this.state.dateValue:new Date();
		const startmonthvalue=this.state.fromMonth?moment(this.state.fromMonth).startOf('month').format('YYYY-MM-DD'):new Date();
		const toMonth=this.state.toMonth?moment(this.state.toMonth).startOf('month').format('YYYY-MM-DD'):new Date();
		// const endofdate=this.state.toDate;
		const startOfMonth = dateFormat(this.props.minDate,'yyyy-mm-dd')
		const nextmonth=moment(this.props.minDate).startOf('month').add(1,'M').format('YYYY-MM-DD')
		// alert(nextmonth);
		// console.log("nextmonth",nextmonth);
		const endOfMonth = dateFormat(this.props.maxDate,'yyyy-mm-dd');
		const currentDate = dateFormat(new Date(),'yyyy-mm-dd');
		var validatecurrent=startOfMonth<=currentDate?new Date():new Date(startOfMonth);
		var currentdifference=DateFunctions.monthDiff(new Date(startmonthvalue),new Date(toMonth));
		var getdiff=DateFunctions.monthDiff(validatecurrent,new Date(endOfMonth));
		var nextDatemonth=moment(new Date()).startOf('month').add(1,'M').format('YYYY-MM-DD');
		// alert(currentdifference);
		// console.log()
		return (
			<div className="HourlyAvailablityDiv">
  <Modal
   className="splitSLotFormDivModal percent_80 dualcalendar"
   width={window.innerWidth}
          title="Availablity"
          visible={true}
            onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        {window.innerWidth>767&&
        	<div className="flexbox">

            <SlotLegend legend="Selected" circle={true}  boxColor="#ea5b02"/>
            <SlotLegend legend="Not Available" circle={true}  boxColor="#d5d4d4"/>
            </div>
        }
            {this.state.loading&&
           <LinearProgress/> 
       }
<div className={`HourlyAvailFlexdiv ${window.innerWidth>767&&getdiff>0?'':'fillwidth'}`}>
<div className={`FirstDiv firstmonth ${window.innerWidth>767&&getdiff>0?'disableMonthfirst':'disableSecondCalendar'}`}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

			   <DatePicker
				   	disablePast={true}
					orientation="landscape"
			        variant="static"
			        orientation="landscape"
			        variant="static"
			        openTo="date"
			        maxDate={this.props.maxDate}
			           shouldDisableDate={(date)=>this.shouldDisableDates(dateFormat(date,'yyyy-mm-dd'),dateFormat(new Date(this.props.minDate),'yyyy-mm-dd'),dateFormat(new Date(this.props.maxDate),'yyyy-mm-dd'))}
			        
			        rightArrowButtonProps={currentdifference==1?{ "disablebtn": 'true' }:null}
			        onMonthChange={(data)=>this.onMonthChange(data,'fromMonth')}
			        onChange ={(date)=>this.changeDate(date,'dateValue')}
			        value={null}
			        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {

			        var selectdate=moment(day).format('YYYY-MM-DD');
			        var fromdate=moment(this.state.dateValue).format('YYYY-MM-DD');
			        var startDate=this.state.fromDate?moment(this.state.fromDate).format('YYYY-MM-DD'):'';
			        var toDate=this.state.endDate?moment(this.state.endDate).format('YYYY-MM-DD'):'';
			        	if(isInCurrentMonth){
			        	return(
			        		<div className={`${startDate==toDate?'sameDateSelected':''} ${startDate==selectdate?this.state.startdiv:''} ${toDate==selectdate?this.state.enddiv:''} ${(selectdate>startDate &&selectdate<toDate)==true?'rangselected':'noselecteddate'}`}>
			        		{
			        		dayComponent
			        	}
			        	</div>
			        		)
			        }
			        }}
        	   />
        </MuiPickersUtilsProvider>
        </div>
        {getdiff>0&&
        <div className="hrline"/>
    }
        <div className={`SecondDiv ${window.innerWidth<768&&'hidenewcalendar'} SecondCalendar ${getdiff>0?'disableMonth':'disableSecondCalendar'}`}>
      		    <MuiPickersUtilsProvider utils={DateFnsUtils}>
			   	<DatePicker
				   	disablePast={true}
					orientation="landscape"
			        variant="static"
			        orientation="landscape"
			        variant="static"
			        openTo="date"
			        // minDate={new Date(this.props.maxDate)}
			        // value={this.state.toValue?this.state.toValue:new Date(this.props.maxDate)}
			        shouldDisableDate={(date)=>this.shouldDisableDates(dateFormat(date,'yyyy-mm-dd'),dateFormat(new Date(this.props.minDate),'yyyy-mm-dd'),dateFormat(new Date(this.props.maxDate),'yyyy-mm-dd'))}
			        // minDate={this.props.minDate}
			        // maxDate={this.props.maxDate}
			        maxDate={this.props.maxDate}

			        leftArrowButtonProps={currentdifference==1?{ "disablebtn": 'true' }:null}
			        onMonthChange={(data)=>this.onMonthChange(data,'toMonth')}
			        onChange={(date)=>this.changeDate(date,'toValue')}
			        value={this.state.toValue?this.state.toValue:new Date(nextDatemonth)}
			        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
			        	console.log("getMonth",isInCurrentMonth?day.getMonth():'')
			        var selectdate=moment(day).format('YYYY-MM-DD');
			        var fromdate=moment(this.state.toValue).format('YYYY-MM-DD');
			        var startDate=this.state.fromDate?moment(this.state.fromDate).format('YYYY-MM-DD'):'';
			        var toDate=this.state.endDate?moment(this.state.endDate).format('YYYY-MM-DD'):'';

			        	if(isInCurrentMonth){
			        	return(
			        		<div className={`${startDate==toDate?'sameDateSelected':''} ${startDate==selectdate?this.state.startdiv:''} ${toDate==selectdate?this.state.enddiv:''} ${(selectdate>startDate &&selectdate<toDate)==true?'rangselected':'noselecteddate'}`}>
			        		{
			        		dayComponent
			        	}
			        	</div>
			        		)
			        }
			        }}
        	   />
        </MuiPickersUtilsProvider>
        </div>
     
        </div>
        </Modal>
			</div>
		);
	}
	componentDidMount(){
		var self=this;
		setTimeout(()=>{
		self.setState({fromDate:null,toDate:null,startdiv:null,enddiv:null,dateValue:null},function(){
		self.onMonthChange(new Date(),'fromMonth');	
		})
		})
	}
}
