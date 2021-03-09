import React from 'react';
import './BookingCheckout.css';
import BoxCard from  './BoxCard';
import { Card,Rate,Row,Col,Icon,notification  } from 'antd';
import NoAvailability from './NoAvailability'
import Drawer from '@material-ui/core/Drawer';
import user from '../../images/DesignIcons/user.png';
import Apilink from '../../helpers/apilink';
import profile from '../../images/DesignIcons/profile.png';
import building from '../../images/DesignIcons/building.png';
import square from '../../images/DesignIcons/square.png';
import promo from '../../images/DesignIcons/promo.png';
import inr from '../../images/DesignIcons/inr.png';
import DateFunctions from '../../helpers/DateFunctions';
import CancellationPolicy from '../../components/cancellationpolicy';
import HourlyAvailablity from './HourlyAvailablity';
import PaxSeatCalendar from './paxseatcalendar';
import SeatBasedCalendar from './SeatBasedCalendar';
import DayCalendar from './DayCalendar';
import CheckoutForm from '../../components/CheckoutForm';
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import ValidationLibrary from '../../helpers/validationfunction';
import ReactPhoneInput from 'react-phone-input-2';
import moment from 'moment';
import { Modal, Button } from 'antd';
import { BrowserRouter as Router, Route, Link,withRouter,useParams  } from "react-router-dom";
import dateFormat from 'dateformat';
var typeofvenue="";
const excludeDays=[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}]
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}
var bookdetails={
"venue_id":"",
"user_id":"",
"trn_venue_price_amt":"",
"bookingFrom":"",
"bookingTo":"",
"mobile":"",
"moreInfo":"",
"promoId":null,
"promoType":"",
"promoValue":0,
"promoAmount":0.0,
"finalPrice":"1900"
}
 class BookingCheckout extends React.Component {


	constructor(props) {
		super(props);
		this.state={paxSeatId:null,validated:false,blockedslots:[],right:false,loginDetails:null,venueDetails:false,noavailability:true,
			BasicDetails:[
				{label:'Name',mandatory:true,value:'',validation:[{name:'required'}],error:null,errormsg:''},
				{label:'Event Name',mandatory:true,value:'',validation:[{name:'required'}],error:null,errormsg:''},
				{label:'Phone Number',value:'',mandatory:true,validation:[{name:'required'},{name:'mobile'}],error:null,errormsg:''},
				{label:'Email',mandatory:true,value:'',validation:[{name:'required'},{name:'email'}],error:null,errormsg:''},
				{label:'More Info',value:'',validation:[]}],
			showavail:false,
			arrayofSlots:[],
			promocode:'',
			discountedamount:0,
			showdaycalendar:false,
			fromDateObj:{fromDate:null,toDate:null},arrayofDates:[],count:0,pricetypedata:'',pricetypedataamt:0,showpax:false,currentpackage:null,nopaxshow:false,showseat:false,currentseat:null,hourlychosenslots:null};
	}
	renderpricetype=(data)=>{
		if(data){
			if(data=='1'){
				return "Hour";
			}else if(data=='2'){
				return "Day"
			}else if(data=='3'){
				return "Week"
			}else {
				return "Month"
			}
		}
	}
	renderExcludeDays=(arrayData)=>{
		// alert(arrayData);
		console.log(this.props.availability)
	if(arrayData){
var getData=arrayData.map((obj)=>{
		var findindex=excludeDays.findIndex((obj2)=>obj2.value==obj);
		if(findindex!=-1){
			return excludeDays[findindex].label;
		}

})
return getData.join(',');
}else{

return "0";
}
}
generateSlotCount=(data)=>{
	// return 0;
	// debugger;
	console.log(data);
	// debugger;
	var count=0;
	if(typeofvenue=='pax'){
		return this.state.arrayofSlots?this.state.arrayofSlots[0].value:0;
	}else if(typeofvenue=='Month'||typeofvenue=='Week'||typeofvenue=='Day'){
		return this.state.count;
	}
	data.map((obj)=>{
		count+=obj.slots.length;
	})
	return count;
}
checkavailability=(data,availability)=>{
	this.setState({nopaxshow:false});
	if(this.state.pricetypedata=="" && (!data.trn_venue_type || data.trn_venue_type=='1' || data.trn_venue_type=='3')){
		// return;
		  notification.error({
    message:'Error Message',
    description:"Please choose your price type to book",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
		  return;
	}
	if(data.trn_venue_type==2&&!this.state.currentpackage){
		// alert("no pax chosen");
		this.setState({nopaxshow:true});

		return;
	}


	if(data.trn_venue_type==2){
		this.setState({showpax:true})
		return;
	}
	if(data.trn_venue_type==3){
		this.setState({showseat:true})
		return;
	}
	if(((!data.trn_venue_type || data.trn_venue_type=='1')&&this.state.pricetypedata==1)){
		this.setState({showavail:true});	
	}else{
		this.setState({showdaycalendar:true});
	}

}

groupingDates=(array)=>{
		var priceCount=this.state.venueDetails&&this.state.venueDetails[0].price.length>0?this.state.venueDetails[0].price[0]:null;
// debugger;

	if(array.length>0){
		bookdetails.bookingFrom=array[0].selectedDate;
		bookdetails.bookingTo=array[0].selectedDate;
		var obj={date:array[0].selectedDate,slots:array};
		var arrayofSlots=this.state.arrayofSlots;
		var findindex=arrayofSlots.findIndex((obj)=>obj.date==array[0].selectedDate)
		if(findindex!=-1){
			if(array.length==0){
				arrayofSlots.splice(findindex,1)
			}else{
			arrayofSlots[findindex].slots=array;
			}
		}else{
		arrayofSlots.push(obj)
		}
		var finalHoursData=this.state.finalHoursData;
		var hoursArray=[];
		var newArrayofSlots=arrayofSlots.map((obj)=>{
			obj.slots.map((obj2)=>{
				var objdata={fromdate:obj.date,todate:obj.date,slotFromTime:obj2.venue_slot_start_time,slotToTime:obj2.venue_slot_end_time}
				hoursArray.push(objdata)
			})
		})
		finalHoursData=hoursArray;
		bookdetails.slots=finalHoursData;
		var finalamount=(parseInt(this.state.pricetypedataamt)*this.generateSlotCount(arrayofSlots));
		if(this.state.discountedamount!=0){

		bookdetails.finalPrice = finalamount - finalamount*(parseInt(bookdetails.promoValue)/100);
		bookdetails.promoAmount=finalamount*(parseInt(bookdetails.promoValue)/100);
		}else{
				bookdetails.finalPrice=finalamount;
		}
		bookdetails.venue_price_amt=parseInt(this.state.pricetypedataamt);
		// console.log('finalHours',finalHoursData)

		this.setState({arrayofSlots,finalHoursData})
	}
	// var obj={};
	// var arrayofData=[];
	// for(var i in array){
	// if(obj[array[i].selectedDate]==undefined){
	// 		var objData={date:array[i].selectedDate,slots:[array[i]]}
	// 		arrayofData.push(obj);
	//   }else{
	//   	var findIndex=arrayofData.findIndex((indexdata)=>indexdata.selectedDate==array[i].selectedDate);

	//   }
	// }
}
changeBasicDetails=(value,index)=>{
	var BasicDetails=this.state.BasicDetails;
	var checkvalidation=ValidationLibrary.checkValidation(value,BasicDetails[index].validation);
	BasicDetails[index].value=value;
	BasicDetails[index].error=!checkvalidation.state;
	BasicDetails[index].errormsg=checkvalidation.msg;
	bookdetails.bookingName=BasicDetails[0].value;
	bookdetails.eventName=BasicDetails[1].value;
	bookdetails.bookingPhone=BasicDetails[2].value;
	bookdetails.bookingEmail=BasicDetails[3].value;
	bookdetails.moreInfo=BasicDetails[4].value;
	var filterRecords=BasicDetails.filter((obj)=>obj.error==true&&obj.mandatory==true);
	this.setState({validated:filterRecords.length>0?false:true})
	this.setState({BasicDetails});
}
sendHourlyData=(data,priceCount)=>{
	// console.log(data);
	// console.log(data.length);
	typeofvenue='Hour';
	if(Array.isArray(data)==true){
		this.groupingDates(data);
	}else{
	bookdetails.bookingFrom=data;
	bookdetails.bookingTo=data;
		var arrayofSlots=this.state.arrayofSlots;
		var findindex=arrayofSlots.findIndex((obj)=>obj.date==data);
		if(findindex!=-1){
			arrayofSlots.splice(findindex,1);
		}
		var hoursArray=[];
		var newArrayofSlots=arrayofSlots.map((obj)=>{
			obj.slots.map((obj2)=>{
				var objdata={fromdate:obj.date,todate:obj.date,slotFromTime:obj2.venue_slot_start_time,slotToTime:obj2.venue_slot_end_time}
				hoursArray.push(objdata)
			})
		})
		var finalHoursData=this.state.finalHoursData;
		finalHoursData=hoursArray;
		bookdetails.slots=finalHoursData;
		var finalamount=(parseInt(this.state.pricetypedataamt)*this.generateSlotCount(arrayofSlots));
		if(this.state.discountedamount!=0){

		bookdetails.finalPrice= finalamount - finalamount*(parseInt(bookdetails.promoValue)/100);
		bookdetails.promoAmount=finalamount*(parseInt(bookdetails.promoValue)/100);
		}else{
				bookdetails.finalPrice=finalamount;
		}
		console.log('finalHours',finalHoursData);
		this.setState({arrayofSlots,finalHoursData});
	}
		this.setState({noavailability:false,showavail:false});
}
ApplyPromocode=(price)=>{
	var obj={promoCode:this.state.promocode,venue_cat_id:1,date:dateFormat(new Date(),'yyyy-mm-dd')};
	// console.log(obj);
 fetch(Apilink.apiurl+"promoCode/", {
        headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
      method:'POST',
      body:JSON.stringify(obj),
    }).then((resp)=>resp.json())
 .then((respjson)=>{
console.log(respjson);
if(respjson.status==1){
	       notification.error({
    message:'Error Message',
    description:respjson.msg,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
}else{
var totalamount=parseInt(price&&price.trn_venue_price_amt)*this.generateSlotCount(this.state.arrayofSlots);
var deductedamount=respjson.response[0].promo_type==1?totalamount*(parseInt(respjson.response[0].promo_value)/100):respjson.response[0].promo_value;
bookdetails.promodId=respjson.response[0].promo_id;
bookdetails.promoAmount=deductedamount;
bookdetails.promoValue=respjson.response[0].promo_value;
bookdetails.promoType=respjson.response[0].promo_type;
bookdetails.finalPrice=totalamount - deductedamount;
// alert(bookdetails.finalPrice);
 notification.success({
    message:'Message',
    description:"Promo Code Applied Successfully",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
this.setState({discountedamount:deductedamount});
}
 })
}
removePromo=()=>{
this.setState({discountedamount:0,promocode:''})
bookdetails.promodId='';
bookdetails.finalPrice=bookdetails.finalPrice + bookdetails.promoAmount;
bookdetails.promoValue=0;
bookdetails.promoAmount=0;
bookdetails.promoType='';

}
loadBookingStatus=(data)=>{
	this.setState({loading:data.loading})
	if(data.success==true){
		// this.props.closePopupCenter();
	}else if(data.success==false){
		// this.setState({loading:data.loading})
		notification.error({
    message:'Error',
    description:"Transaction Failed",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
	}
}
changePromocode=(data)=>{
	this.setState({promocode:data});
}
renderLoading(){
	// if(elementdiv){
		var bodydocument=document.getElementsByTagName('body');
	var elementdiv=document.createElement('div');
	var elementdiv1=document.createElement('div');
	 var newContent = document.createTextNode("do not reload the page Please Wait....")
	elementdiv1.appendChild(newContent);
	elementdiv.appendChild(elementdiv1);
	elementdiv.setAttribute('class','loadingScreen');
	elementdiv.setAttribute('id','loadingScreenId');
		if(document.getElementById('loadingScreenId')==undefined){
		document.body.appendChild(elementdiv);
		}else{

		}
	// }
}

sendpaxDetails=(count,date,price)=>{
console.log(count);
typeofvenue='pax';
var arrayofSlots=this.state.arrayofSlots;
if(count==0){
arrayofSlots=[];
}else{
	arrayofSlots=[{label:'No of Pax Chosen',value:count,date:date}];
}
bookdetails.bookingCapacity=parseInt(count);
bookdetails.bookingFrom=dateFormat(date,'yyyy-mm-dd');
bookdetails.bookingTo=dateFormat(date,'yyyy-mm-dd');
var finalprice = count*(price&&price.trn_venue_price_amt);
var discountedamount=0;
		bookdetails.venue_price_amt=parseInt(price?price.trn_venue_price_amt:0);

if(this.state.discountedamount!=0){

		bookdetails.finalPrice = finalprice - finalprice*(parseInt(bookdetails.promoValue)/100);
		bookdetails.promoAmount=finalprice*(parseInt(bookdetails.promoValue)/100);
		discountedamount=finalprice*(parseInt(bookdetails.promoValue)/100);
		}else{
				bookdetails.finalPrice=finalprice;
				discountedamount=0;
		}
this.setState({arrayofSlots,discountedamount:discountedamount,showavail:false});
}

removeRenderLoading=()=>{
		var bodydocument=document.getElementsByTagName('body');
		if(document.getElementById('loadingScreenId')!=undefined){
			document.body.removeChild(document.getElementById('loadingScreenId'));
		}
}
openRangeSelected=(dates,type,price)=>{
	// console.log(type);
	console.log('dates',dates);
// 	if(!dates){
// 		this.setState({arrayofSlots:[],showdaycalendar:false});
// 		return;
// 	}
if(dates==null){
	this.setState({showdaycalendar:false})
	return;
}
// this.setState({showseat:false});
	var getDates=DateFunctions.enumerateDaysBetweenDates(dateFormat(dates.fromDate,'yyyy-mm-dd'),dateFormat(dates.toDate,'yyyy-mm-dd'));
	// alert(JSON.stringify(getDates));
	var quantity=0;
	var pricetypedata=this.state.pricetypedata;
if(pricetypedata=='4'){
	quantity=Math.ceil(getDates.length/30);
	typeofvenue='Month';
}else if(pricetypedata=='3'){
	quantity=Math.ceil(getDates.length/7);
	typeofvenue='Week';
}else{
quantity=getDates.length;
typeofvenue='Day';
}
bookdetails.bookingCapacity=0;
bookdetails.bookingFrom=dateFormat(dates.fromDate,'yyyy-mm-dd');
bookdetails.bookingTo=dateFormat(dates.toDate,'yyyy-mm-dd');
bookdetails.slots=getDates.length>0?getDates.map((obj)=>{
return {	"fromdate":dateFormat(obj,'yyyy-mm-dd'),
			"todate":dateFormat(obj,'yyyy-mm-dd'),
			"slotFromTime":"00:00:00",
			"slotToTime":"00:00:00"}

}):[];
var finalprice = quantity*(this.state.pricetypedataamt);
var discountedamount=0;
		bookdetails.venue_price_amt=parseInt(this.state.pricetypedataamt);

if(this.state.discountedamount!=0){

		bookdetails.finalPrice = finalprice - finalprice*(parseInt(bookdetails.promoValue)/100);
		bookdetails.promoAmount=finalprice*(parseInt(bookdetails.promoValue)/100);
		discountedamount=finalprice*(parseInt(bookdetails.promoValue)/100);
		}else{
				bookdetails.finalPrice=finalprice;
				discountedamount=0;
		}
this.setState({arrayofSlots:[{fromDate:dates.fromDate,toDate:dates.toDate,dates:getDates}],count:quantity,discountedamount:discountedamount},function(){
	this.setState({showdaycalendar:false});
})
}
generateVenueType=(type,availtype)=>{
if(type==2){
	return "Pax";
}else if(type==3){
	return "Seat";
}else if((!type || type==1)&&availtype==1){
	return "Hour";
}else if((!type || type==1)&&availtype==2){
	return "Day";
}else if((!type || type==1)&&availtype==3){
	return "Week";
}else{
	return "Month";
}
}
generateMonthlyorWeekly=()=>{
	if(typeofvenue=='Month'||typeofvenue=='Week'||typeofvenue=='Day'){
		return typeofvenue;
	}else{
		return '';
	}
	}
	validatePay=()=>{
		// alert();
		// alert(JSON.stringify(bookdetails));
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
	bookdetails.bookingName=BasicDetails[0].value;
	bookdetails.eventName=BasicDetails[1].value;
	bookdetails.bookingPhone=BasicDetails[2].value;
	bookdetails.bookingEmail=BasicDetails[3].value;
	bookdetails.moreInfo=BasicDetails[4].value;
this.setState({BasicDetails});
var filterRecords=BasicDetails.filter((obj)=>obj.error==true&&obj.mandatory==true);
// console.log('filterRecords',filterRecords);
if(filterRecords.length>0){
	this.setState({validated:false});
	// alert("Fields Missing....");
	        notification.error({
    message:'Error Message',
    description:"Fields are incomplete",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
}else{
	
	this.setState({validated:true})
}
	}
	handleOnChange=(value, data,data1) =>{
	var BasicDetails=this.state.BasicDetails;
    console.log(value)
    console.log(data)
    console.log(data1)
    var code_length=0;
      var success=false;
    if(data1.format){
    	// console.log("success");
    	if(data1.format.length==value.length){
    		// alert("success");
    		success=true;
    	}else{
    		success=false;
    	}
    }else{
    		success=false;
    }
    BasicDetails[2].error=!success;

    BasicDetails[2].errormsg=success==true?"":"Invalid Mobile Number";
    if(data.dialCode != undefined){
      code_length=data.dialCode.length;
    }
    BasicDetails[2].dailcode=data.dialCode;
    // bookdetails.dial
    // BasicDetails[index].errormsg=checkvalidation.msg;
    var mobile=value.replace(/[^0-9]+/g,'').slice(code_length);
    BasicDetails[2].value=mobile;
	bookdetails.bookingName=BasicDetails[0].value;
	bookdetails.eventName=BasicDetails[1].value;
	bookdetails.bookingPhone=BasicDetails[2].value;
	bookdetails.bookingEmail=BasicDetails[3].value;
	bookdetails.moreInfo=BasicDetails[4].value;
	bookdetails.code=data.dailcode;
    // console.log('mobile',BasicDetails)
    this.setState({BasicDetails});
var filterRecords=BasicDetails.filter((obj)=>obj.error==true&&obj.mandatory==true);
	this.setState({validated:filterRecords.length>0?false:true})
    // this.setState({ mobile:mobile });
    // this.setState({ countrycode:data.dialCode});
    // this.setState({ phone:value});

    console.log(this.state)
  }
  priceType=(data,amt)=>{
  	if(this.state.arrayofSlots.length>0 && bookdetails.availType!=data){
  		var confirmbox=window.confirm("changing price type leads to removes the chosen dates and slots?");
  		if(confirmbox){
  			this.setState({arrayofSlots:[],hourlychosenslots:null},function(){
  	bookdetails.availType=data;
  	this.setState({pricetypedata:data,pricetypedataamt:amt});
  	});
  		}else{

  		}
  	
}else{
	this.setState({arrayofSlots:[]},function(){
  	bookdetails.availType=data;
  	this.setState({pricetypedata:data,pricetypedataamt:amt});
  	});
}  
  }
  receivePaxDetails=(data)=>{
  	console.log("receivepaxdetails",data)
  	var paxArray=data.paxArray.map((obj)=>{
  		var obj=obj;
  		obj.fromDate=data.date;
  		obj.toDate=data.date;
  		return obj;
  	})
  	bookdetails.bookingFrom=moment(data.date).format('YYYY-MM-DD');
  	bookdetails.bookingTo=moment(data.date).format('YYYY-MM-DD');
  	bookdetails.finalPrice=data.total;
  	bookdetails.venue_price_amt=data.total;
  	bookdetails.costDetails=paxArray;
  	this.setState({arrayofSlots:paxArray,showpax:false,currentpackage:data.currentpackage});

  }
  receiveSeatDetails=(data,venueDetails)=>{
  	if(this.state.pricetypedata==1){
  		bookdetails.slots=data.slots;
  		bookdetails.bookingFrom=data.slots[0].fromdate;
  		bookdetails.bookingTo=data.slots[0].todate;
  		bookdetails.venue_price_amt=data.totalcost;
  		bookdetails.finalPrice=data.totalcost;
  		bookdetails.costDetails=data.seatArray;
  		this.setState({hourlychosenslots:data.seatslots});
  		this.setState({arrayofSlots:data.seatslots,showseat:false});
  	}else{
  		// console.log("SeatDataAvail",data)
  		
  		bookdetails.bookingFrom=data.dates.fromDate;
  		bookdetails.bookingTo=data.dates.toDate;
  		var getDates=DateFunctions.enumerateDaysBetweenDates(bookdetails.bookingFrom,bookdetails.bookingTo);
	// alert(JSON.stringify(getDates));
		bookdetails.bookingCapacity=0;
		bookdetails.slots=getDates.length>0?getDates.map((obj)=>{
		return {	"fromdate":dateFormat(obj,'yyyy-mm-dd'),
					"todate":dateFormat(obj,'yyyy-mm-dd'),
					"slotFromTime":"00:00:00",
					"slotToTime":"00:00:00"}

		}):[];
		bookdetails.countofdays="x("+data.dayscount+" "+this.generateVenueType(null,this.state.pricetypedata)+")";
  		bookdetails.venue_price_amt=data.totalcost;
  		bookdetails.finalPrice=data.totalcost;
  		bookdetails.costDetails=data.seatArray;
  		this.setState({arrayofSlots:[{fromDate:data.dates.fromDate,toDate:data.dates.toDate}],showseat:false});
  	}
  }
  ClickPax=(data)=>{
  	if(this.state.currentpackage&&this.state.arrayofSlots.length>0&&(data.venue_pax_id!=this.state.currentpackage.venue_pax_id)){
  		var text='changing price type leads to removes the chosen dates and slots?';
 	var confirmbox=window.confirm(text);
 	if(confirmbox){
 		this.setState({arrayofSlots:[]},function(){
  	this.setState({paxSeatId:data.venue_pax_id ,currentpackage:data,nopaxshow:false});
  	})
 	}else{

 	}
 	return;
  }else{
  	this.setState({paxSeatId:data.venue_pax_id ,currentpackage:data,nopaxshow:false});
  }	
  }
  ClickSeat=(data)=>{
  	if(this.state.currentseat&&this.state.arrayofSlots.length>0&&(data.venue_pax_id!=this.state.currentseat.seat_id)){
  		var text='changing price type leads to removes the chosen dates and slots?';
 	var confirmbox=window.confirm(text);
 	if(confirmbox){
 		this.setState({arrayofSlots:[]},function(){
  	this.setState({paxSeatId:data.seat_id ,currentseat:data,nopaxshow:false,hourlychosenslots:null});
  	})
 	}else{

 	}
 	return;
  }else{
  	this.setState({paxSeatId:data.seat_id ,currentseat:data,nopaxshow:false,hourlychosenslots:null});
  }	
  }
  renderPerCost=(obj)=>{
  	// debugger;
  	if(obj){
  		if(this.state.pricetypedata=='1'){
  			return obj.priceDetails[0].hour_cost;
  		}else if(this.state.pricetypedata=='2'){
  			return obj.priceDetails[0].day_cost;
  		}else if(this.state.pricetypedata=='3'){
  			return obj.priceDetails[0].week_cost;
  		}else{
  			return obj.priceDetails[0].month_cost;
  		}
  	}
  }
	render() {
		const venudetails=this.state.venueDetails?this.state.venueDetails[0]:null;
		const venuetype=venudetails&&venudetails.trn_venue_type;
		const availability=venudetails&&venudetails.availability.length>0?venudetails.availability[0]:null;
		const price=venudetails&&venudetails.price.length>0?venudetails.price[0]:null;
		const currentPax=venudetails&&venudetails.price&&venudetails.price.filter((obj)=>obj.venue_pax_id==this.state.paxSeatId);
		const currentSeat=venudetails&&venudetails.price&&venudetails.price.filter((obj)=>obj.seat_id==this.state.paxSeatId);
		const ameneties=venudetails&&venudetails.ameneties.length>0?venudetails.ameneties:null;
		const photos=venudetails&&venudetails.photos.length>0?venudetails.photos:null;
		const address=venudetails&&venudetails.trn_venue_address;
		const currentpaxobj=(currentPax&&currentPax.length>0)?currentPax[0]:null;
		const currentseatobj=(currentSeat&&currentSeat.length>0)?currentSeat[0]:null;

		return (
		<div className="BookingMainPage">
		{!this.state.loading&&this.removeRenderLoading()}
		{this.state.nopaxshow==true&&
		 <Drawer anchor="right" open={true} onClose={()=>this.setState({nopaxshow:false})}>
		 <div className="Showpaxlist">
		 <div className="showpaxlistheader">
		 <h4>Choose Your Package</h4>
		 <div onClick={()=>this.setState({nopaxshow:false})} className="closeAnimationDrawer"><i class="fa fa-times" aria-hidden="true"></i></div>
		 </div>
		 <div className="showpaxlistbody">
		 {venudetails&&venudetails.trn_venue_type==2&&venudetails.price&&venudetails.price.map((obj)=>{
		 	return(
		 		<div onClick={()=>this.ClickPax(obj)} className={`cardpaxbox ${(obj.venue_pax_id==this.state.paxSeatId)?'active':''}`}>
		 		<div className="cardpaxboxheader">
		 		{obj.venue_pax_name}
		 		</div>
		 		<div className="cardpaxboxbody">
		 		{obj.priceDetails.map((obj2)=>{
		 			return(
		 				<div className="chippax">{obj2.day_type_name} - Adult : {obj2.Adult}({obj2.currency}), Child : {obj2.Child}({obj2.currency})</div>
		 				)
		 		})}
		 		</div>

		 		</div>
		 		)
		 })}
		 {venudetails&&venudetails.trn_venue_type==3&&venudetails.price&&venudetails.price.map((obj)=>{
		 	return(
		 		<div onClick={()=>this.ClickSeat(obj)} className={`cardpaxbox ${(obj.seat_id==this.state.paxSeatId)?'active':''}`}>
		 		<div className="cardpaxboxheader">
		 		{obj.seat_name}
		 		</div>
		 		<div className="cardpaxboxbody">
		 		{obj.priceDetails.map((obj2)=>{
		 			return(
		 				<div className="chippax">
		 				{obj2.hour_cost>0&&<span>Hourly {obj2.hour_cost}({obj2.currency}) , </span>}
		 				{obj2.day_cost>0&&<span>Daily {obj2.day_cost}({obj2.currency}) , </span>}
		 				{obj2.week_cost>0&&<span>Weekly {obj2.week_cost}({obj2.currency}) , </span>}
		 				{obj2.month_cost>0&&<span>Monthly {obj2.month_cost}({obj2.currency}) , </span>}
		 				</div>
		 				)
		 		})}
		 		</div>

		 		</div>
		 		)
		 })}
		 </div>

		 </div>
		 </Drawer>
		}
		{this.state.loading&&this.renderLoading()}

			 <Drawer anchor="right" open={this.state.right} onClose={()=>this.setState({right:false})}>
			 <div className="cancallationPolicyDiv">
			 <div onClick={()=>this.setState({right:false})} className="closeAnimationDrawer"><i class="fa fa-times" aria-hidden="true"></i></div>
			 	<CancellationPolicy/>
			 </div>
      </Drawer>
      {this.state.venueDetails&&this.state.venueDetails.length==0&&
			<div className="novenuefound"><span>No Venue Were found</span></div>
		}
      {!this.state.venueDetails&&
			<div className="loadingCenter">
			<p>Please Wait</p>
		 <CircularProgress color="secondary" />
		 </div>
		}
      {venudetails&&
			<div className='BookingMainContent'>
			<div className="LeftSideContent">
			<BoxCard headerImg={user} headerText={"Logged In"}>
			<div className="userProfileName">
			<small>welcome</small>
			<p>{this.state.loginDetails&&(this.state.loginDetails.user_name +" "+ this.state.loginDetails.user_surname)}</p>
			</div>
		
			</BoxCard>
		
			<BoxCard  headerImg={profile} headerText={"Basic Details"}>
			<div className="FormBoxBasic">
			{this.state.BasicDetails.map((obj,index)=>{
			return(	
			<div className="LabelBox">
			<label>{obj.label} {<span style={{color:'red'}}>*</span>}</label>
		{index==2&&
    <ReactPhoneInput 
	//  value={obj.value}  
	required={true}
	 onChange={this.handleOnChange} className="ant-input"/>

		}
		{index!=2&&
			<input onChange={(e)=>this.changeBasicDetails(e.target.value,index)}/>
		}
		<p class="errmsg">{obj.error?obj.errormsg:''}</p>
			</div>
			)
			})}
			</div>
			</BoxCard>
      
			<BoxCard headerImg={building} headerText={<div>{venudetails&&venudetails.trn_venue_name} <Rate  className="ratecolor" allowHalf count={3} defaultValue={3} disabled={true} /></div>}>
			<div className="PricingDetailsbook">
			{venudetails&&venudetails.trn_venue_type==2&&
				 <>
				 {currentPax&&currentPax.length>0&&
				<p className="labelprice"><div>{currentPax&&currentPax.length>0&&currentPax[0].venue_pax_name} </div>
				   <a onClick={()=>this.setState({nopaxshow:true})}><i class="fa fa-pencil" aria-hidden="true"></i></a>
				</p>
				}
				{/*<p className="minmaxcapacity">
				<span> Minimum - {availability&&availability.trn_venue_min_count}</span>
				<span> & Maximum - {availability&&availability.trn_venue_max_count}</span>
				</p>*/}
				 </>
			}
			{venudetails&&venudetails.trn_venue_type==3&&
				<>
				 {currentSeat&&currentSeat.length>0&&
				<p className="labelprice"><div>{currentSeat&&currentSeat.length>0&&currentSeat[0].seat_name} </div>
				   <a onClick={()=>this.setState({nopaxshow:true})}><i class="fa fa-pencil" aria-hidden="true"></i></a>
				</p>
				}
				<div className="marginTopPackage">
				{currentseatobj&&currentseatobj.priceDetails[0].hour_cost>0&&<span onClick={()=>this.priceType('1',currentseatobj.priceDetails[0].hour_cost)} className={`taghourcoast ${this.state.pricetypedata=='1'?'active':'inactive'}`}> Hourly {currentseatobj.priceDetails[0].hour_cost } {currentseatobj.priceDetails[0].currency}</span>}
        {currentseatobj&&currentseatobj.priceDetails[0].day_cost>0&&<span onClick={()=>this.priceType('2',currentseatobj.priceDetails[0].day_cost)} className={`taghourcoast ${this.state.pricetypedata=='2'?'active':'inactive'}`}>Daily {currentseatobj.priceDetails[0].day_cost } {currentseatobj.priceDetails[0].currency}</span>}
        {currentseatobj&&currentseatobj.priceDetails[0].week_cost>0&&<span onClick={()=>this.priceType('3',currentseatobj.priceDetails[0].week_cost)} className={`taghourcoast ${this.state.pricetypedata=='3'?'active':'inactive'}`}>Weekly {currentseatobj.priceDetails[0].week_cost } {currentseatobj.priceDetails[0].currency}</span>}
        {currentseatobj&&currentseatobj.priceDetails[0].month_cost>0&&<span onClick={()=>this.priceType('4',currentseatobj.priceDetails[0].month_cost)} className={`taghourcoast ${this.state.pricetypedata=='4'?'active':'inactive'}`}>Montly {currentseatobj.priceDetails[0].month_cost } {currentseatobj.priceDetails[0].currency}</span>}
        </div>
				</>
			}
			{venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&
			<div>
				{price&&price.hour_cost>0&&<span onClick={()=>this.priceType('1',price.hour_cost)} className={`taghourcoast ${this.state.pricetypedata=='1'?'active':'inactive'}`}> Hourly {price.hour_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.day_cost>0&&<span onClick={()=>this.priceType('2',price.day_cost)} className={`taghourcoast ${this.state.pricetypedata=='2'?'active':'inactive'}`}>Daily {price.day_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.week_cost>0&&<span onClick={()=>this.priceType('3',price.week_cost)} className={`taghourcoast ${this.state.pricetypedata=='3'?'active':'inactive'}`}>Weekly {price.week_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.month_cost>0&&<span onClick={()=>this.priceType('4',price.month_cost)} className={`taghourcoast ${this.state.pricetypedata=='4'?'active':'inactive'}`}>Montly {price.month_cost } {price.trn_venue_price_currency}</span>}
        </div>
			} 
			<span className="cancellationpolicy" onClick={()=>this.setState({right:true})}>Cancellation Policy</span>
			<div className="venueDetailsInfo">
			<div className="excludeDaysInfo">
			<InfoIcon/>
			<span>Exclude Days <span className="excludeDaysData">{this.renderExcludeDays(availability&&availability.trn_venue_exclude_days&&availability.trn_venue_exclude_days.split(','))}</span></span>
			</div>
			{/*(((!venuetype || venuetype=='1')&&availability.trn_availability_type=='1') || (venuetype=='2' || venuetype=='3')) &&
			<button onClick={()=>this.checkavailability(venudetails)} className="btnavailability"><i className="fa fa-calendar-check-o"/> Check Availability</button>*/
			}
			<button onClick={()=>this.checkavailability(venudetails,availability)} className="btnavailability"><i className="fa fa-calendar-check-o"/> Check Availability</button>
			</div>
			</div>
			</BoxCard>
			</div>
			<div className="RightSideContent">
			{this.state.arrayofSlots.length==0&&
				<NoAvailability/>
			}

				{this.state.arrayofSlots.length>0&&
			<div className="ContentAvailable">
			<BoxCard heightdeviation={1.2} headerImg={square} headerText={"your Booking Availabilities"}>
			<div className="SlotsContent">
			{this.state.arrayofSlots.length>0&&(venudetails&&(venudetails.trn_venue_type==2))&&
				<div>
				<h5>Pax Date : {moment(this.state.arrayofSlots[0].fromDate).format('YYYY-MM-DD')}</h5>
				<div>Adult - {this.state.arrayofSlots[0].paxQty}</div>
				<div>Child - {this.state.arrayofSlots[1].paxQty}</div>
				<div></div>
				</div>	
			}
			{this.state.arrayofSlots.length>0&&(venudetails&&(venudetails.trn_venue_type==3))&&this.state.pricetypedata!=1&&
				<>
				<div>From Date - {this.state.arrayofSlots.length>0&&this.state.arrayofSlots[0].fromDate}</div>
				<div>To Date - {this.state.arrayofSlots.length>0&&this.state.arrayofSlots[0].toDate}</div>
				</>
			}

			{this.state.arrayofSlots.length>0&&this.state.arrayofSlots.map((obj)=>{
return(
	<>
	{venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&(this.state.pricetypedata!=1)&&
	<>
		<div>From Date - {this.state.arrayofSlots.length>0&&dateFormat(this.state.arrayofSlots[0].fromDate,'yyyy-mm-dd')}</div>
		<div>To Date - {this.state.arrayofSlots.length>0&&dateFormat(this.state.arrayofSlots[0].toDate,'yyyy-mm-dd')}</div>

		</>
	}
	
	{venudetails&&(this.state.pricetypedata==1)&&(venudetails.trn_venue_type!=2)&&
<label>{obj.date} - <span>{obj.slots.length} Slots</span></label>
}
</>
	)
			})}
			
			</div>
			</BoxCard>
			<BoxCard headerImg={promo} headerText={"Promo Code"}>
			<div className="PromoCodeBox">
			<div className="PromoCodeContent">
			<input value={this.state.promocode} onChange={(e)=>this.changePromocode(e.target.value)} placeholder="Enter Prome Code"/>
			</div>
			{this.state.discountedamount==0&&
			<button className="btnavailability" onClick={()=>this.ApplyPromocode(price)}>Apply</button>
		}	{this.state.discountedamount!=0&&
			<button className="btnavailability red" onClick={()=>this.removePromo()}>Remove</button>
		}
			</div>
			</BoxCard>
			<BoxCard widthdeviation={1.5} headerImg={inr} headerText={"Bill Details"}>
			<div className="BillDetails">
			{venudetails.trn_venue_type!=2&&venudetails.trn_venue_type!=3&&
			<div className="PriceItem">
				<div>Per {this.generateVenueType(venudetails.trn_venue_type,this.state.pricetypedata)} {this.state.pricetypedataamt} <span>(x{this.generateSlotCount(this.state.arrayofSlots)})</span></div>
				<div>{parseInt(this.state.pricetypedataamt)*this.generateSlotCount(this.state.arrayofSlots)}</div>
			</div>
			}
			{venudetails&&venudetails.trn_venue_type==3&&
				<div className="PriceItem">
				<div>Per Seat {this.renderPerCost(currentseatobj)} x ({bookdetails.costDetails[0].seatQty} seats) {this.state.pricetypedata==1&&<>x({bookdetails.slots.length} Slots)</>} {this.state.pricetypedata!=1&&bookdetails.countofdays}<span></span></div>
				<div>{bookdetails.finalPrice}</div>
				</div>
			}
			{venudetails.trn_venue_type==2&&this.state.arrayofSlots.length>0&&
				<>
			<div className="PriceItem">
			<div>Adult <span>(x {this.state.arrayofSlots[0].paxQty})</span></div>
			<div>{this.state.arrayofSlots[0].paxCost}</div>
			</div>
			<div className="PriceItem">
			<div>Child <span>(x {this.state.arrayofSlots[1].paxQty})</span></div>
			<div>{this.state.arrayofSlots[1].paxCost}</div>
			</div>
			</>	
			
			}
			{this.state.discountedamount!=0&&
			<div className="PriceItem ">
				<div className="greeencolor">Total Discount</div>
				<div className="greeencolor">- {bookdetails.promoAmount}</div>
			</div>
			}
			<div className="PriceItem bordered">
				<div>Total Pay</div>
				<div>{bookdetails.finalPrice}</div>
			</div>
			</div>
			{!this.state.validated&&
			<div className="paybtnBooking">
			<button onClick={()=>this.validatePay()}>Pay</button>
			</div>
			}	
			{this.state.validated==true&&
			<CheckoutForm currentSeatCurrency={venudetails.trn_venue_type==3&&currentseatobj&&currentseatobj.priceDetails[0].currency} currentpackage={this.state.currentpackage} send={(data)=>this.loadBookingStatus(data)} {...this.props} bookingDetails={bookdetails} totalamount={parseInt(bookdetails.finalPrice)} bookobj={this.state.venueDetails[0]}>
			<div className="paybtnBooking">
			<button>Pay</button>
			</div>	
			</CheckoutForm>
			}
			</BoxCard>
			</div>
			}
			</div>
			{this.state.showavail==true&&
			<HourlyAvailablity excludeDays={availability&&availability.trn_venue_exclude_days&&availability.trn_venue_exclude_days.split(',')} sendpaxDetails={(count,date)=>this.sendpaxDetails(count,date,price)}  hourlychosenslots={this.state.arrayofSlots} sendDataSlot={(data)=>this.sendHourlyData(data,price)} closeHourModal={()=>this.setState({showavail:false})} venueDetails={venudetails}/>
			}
			{this.state.showpax==true&&
				<PaxSeatCalendar sendPaxDetails={(data)=>this.receivePaxDetails(data)} availability={availability} venueDetails={venudetails} excludeDays={availability&&availability.trn_venue_exclude_days&&availability.trn_venue_exclude_days.split(',')} currentPax={currentPax} closeHourModal={()=>this.setState({showpax:false})} />
			}
			{this.state.showseat==true&&
				<SeatBasedCalendar  availType={this.state.pricetypedata} hourlychosenslots={this.state.hourlychosenslots} sendSeatDetails={(data)=>this.receiveSeatDetails(data,venudetails)} percost={this.renderPerCost(currentseatobj)} excludeDays={availability&&availability.trn_venue_exclude_days&&availability.trn_venue_exclude_days.split(',')} currentSeat={currentSeat} availability={availability} venueDetails={venudetails} closeHourModal={()=>this.setState({showseat:false})}/>
			}
			{this.state.showdaycalendar==true&&
				<DayCalendar availType={this.state.pricetypedata} refreshblockeddates={(dates)=>this.updateMonthlyData(venudetails.venue_id,dates.fromMonth,dates.toMonth,availability.trn_availability_type)} blockedslots={this.state.blockedslots.length>0?this.state.blockedslots[0].availability:null} minDate={availability&&availability.trn_venue_avail_frm} maxDate={availability&&availability.trn_venue_avail_to} venudetails={venudetails} openRangeSelected={(dates)=>this.openRangeSelected(dates,availability&&availability.trn_availability_type,price)} closeHourModal={()=>this.setState({showdaycalendar:false})}/>
			}
			</div>
		}
			</div>
		);
	}

updateMonthlyData=(venueid,fromdates,todates,availtype)=>{
	// alert(this.state.pricetypedata);
	// alert(availtype);
	// alert(JSON.stringify(this.state.venueDetails))
	var obj={venueId:venueid,date:fromdates,todate:todates,availType:this.state.pricetypedata};
	fetch(Apilink.apiurl+"providerCalendarHourly",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((resp)=>resp.json())
.then((respjson)=>{
	console.log("blockedslots",respjson);
	if(respjson.status==0){
		this.setState({blockedslots:respjson.data})
	}else{
		this.setState({blockedslots:[]});
	}
})
}
getMonthlyData=(venueid,fromdate,currentDate)=>{
var fromdates=moment(fromdate).format('YYYY-MM-DD');
var currDate=moment(currentDate).format('YYYY-MM-DD');
fromdates=fromdates<currDate?currDate:fromdates;
var todates=moment(fromdates).add(1,'M').endOf('month').format('YYYY-MM-DD');
this.updateMonthlyData(venueid,fromdates,todates);
}

	componentDidMount(){
		if(document.querySelector('.search-div')){
		document.querySelector('.search-div').style.display='none';
	}
	console.log(this.props.match.params);
		var venueIdSplit=this.props.match?this.props.match.params.venueid.split('=')[1]:null;
		var venueId=venueIdSplit?venueIdSplit.split('&')[0]:null;
		var paxorseatId = venueIdSplit?(venueIdSplit.split('&').length>1?venueIdSplit.split('&')[1]:null):null;
		this.setState({paxSeatId:paxorseatId});
		 if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
    var LoginData=JSON.parse(localStorage.getItem('LoginData'));
	bookdetails.user_id=LoginData.user_id;
	bookdetails.venue_id=venueId;
	bookdetails.bookingFrom=dateFormat(new Date(),'yyyy-mm-dd');
	bookdetails.bookingTo=dateFormat(new Date(),'yyyy-mm-dd');
	bookdetails.bookingName="";
	bookdetails.eventName="";
	bookdetails.bookingPhone="";
	bookdetails.bookingEmail="";
	bookdetails.code="91";
	bookdetails.promodId=0;
	bookdetails.promoType=0;
	bookdetails.promoValue=0;
	bookdetails.trn_venue_price_amt=0;
	bookdetails.promoAmount=0;
	bookdetails.finalPrice=0;
	bookdetails.availType=this.state.pricetypedata;
	bookdetails.bookingCapacity=0;
	bookdetails.slots=[];
	bookdetails.bookedDate=dateFormat(new Date(),'yyyy-mm-dd HH:MM:00');
	bookdetails.costDetails=[{
			"exchangeRate":0,
			"seatName":"",
			"seatQty":0,
			"paxName":"",
			"paxCost":"",
			"paxQty":0,
			"paxRate":"",
			"paxRateType":""
	}];
      this.setState({loginDetails:LoginData});
		 }else{
		 	this.props.history.push('/');
		 		this.props.loadtohome&&this.props.loadtohome();
		 }
		navigator.geolocation.getCurrentPosition(position => {


		fetch(Apilink.apiurl+"getVenueDetailsById",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({venueId:venueId,lat:position.coords.latitude,long:position.coords.longitude}),
    }).then((resp)=>resp.json())
		.then((respjson)=>{
			console.log("respjsonbooking",respjson);
			if(respjson.length>0){
				// this.getMonthlyData(respjson[0].venue_id,respjson[0].availability[0].trn_venue_avail_frm,new Date())
			}
			this.setState({venueDetails:respjson.length>0?respjson:[]},function(){
				var venuedetails=this.state.venueDetails;
					if(venuedetails.length>0){
						var filteredData=venuedetails[0].price&&venuedetails[0].price.filter((obj)=>obj.venue_pax_id==paxorseatId);
						// alert(JSON.stringify(filteredData));
						if(filteredData.length>0){
							this.setState({currentpackage:filteredData[0]});
						}
						if(venuedetails[0].trn_venue_type==3){
						var filteredSeatData=venuedetails[0].price&&venuedetails[0].price.filter((obj)=>obj.seat_id==paxorseatId);
						console.log("filterdseatdata",filteredSeatData);
						if(filteredSeatData.length>0){
							this.setState({currentseat:filteredSeatData[0]});
						}
					}
					}
			})
		})
})
	}
	componentWillUnmount(){
		// alert('');
	if(document.querySelector('.search-div')){
		document.querySelector('.search-div').style.display='inherit';
		}

	}
}
export default withRouter(BookingCheckout);