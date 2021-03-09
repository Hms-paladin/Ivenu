import React from 'react';
import './Pop_Up_Center.css';
import search from '../../images/Search.png';
import Star from '../../starone.png';
import Popupbox from '../popupbox/popupbox';
import Show_available_slote from '../show_available_slote/show_available_slote';
import { DatePicker } from 'antd';
import CheckoutForm from '../CheckoutForm';

import dateFormat from 'dateformat';
import * as moment from 'moment';
import {notification} from 'antd';
import Apilink from '../../helpers/apilink';
const { MonthPicker, RangePicker } = DatePicker;
var BookedDates = [];
// function onChange(date, dateString) {
// 	console.log(date, dateString);
// }
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Array.prototype.diff = function(arr2) {
    var ret = [];
    for(var i in this) {   
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};
function disabledDate(current,availability) {
  // console.log('availability',availability);
  var fromdate=availability.availability.length>0?availability.availability[0].trn_venue_avail_frm:null;
  var todate=availability.availability.length>0?availability.availability[0].trn_venue_avail_to:null;
  var currentDate=new Date(dateFormat(current.format(''),"yyyy-mm-dd 00:00:00")).getTime();
  var filterRecords=BookedDates.filter((obj)=>obj==dateFormat(current.toDate(),'yyyy-mm-dd'));
  return current&&current>moment().startOf('day')&&current>moment(fromdate).startOf('day')&&current<moment(todate).endOf('day')&&filterRecords.length==0?false:true;
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

var venujson={
        "venue_id":2,
        "trn_venue_cat_id":1,
        "venue_cat_name":"Play Ground",
        "trn_venue_name":"Foot Ball club",
        "trn_venue_address":"Anna Nagar",
        "trn_venue_avilability_id":1,
        "trn_venue_price_id":1,
        "availability":[
            {
                "trn_venue_availability_id":2,
                "trn_venue_id":2,
                "trn_availability_type":1,
                "trn_venue_days":"5",
                "trn_venue_avail_frm":"2019-10-02",
                "trn_venue_avail_to":"2019-10-30",
                "trn_venue_moredetails":"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
            }
        ],
        "price":[
            {
                "trn_venue_price_id":2,
                "trn_venue_id":2,
                "trn_venue_price_type":"1",
                "trn_venue_price_amt":"1000",
                "trn_venue_price_currency":"INR"
            }
        ],
        "ameneties":[
            {
                "amenities_id":1,
                "amenities_name":"Toilet",
                "amnDetails":[
                    {
                        "amenities_det_id":1,
                        "amenities_det_name":"Common",
                        "trn_venue_amnts_det_datavalue1":"value1",
                        "trn_venue_amnts_det_datavalue2":"value1",
                        "trn_venue_amnts_det_datavalue3":"value1"
                    },
                    {
                        "amenities_det_id":2,
                        "amenities_det_name":"Ladies",
                        "trn_venue_amnts_det_datavalue1":"value1",
                        "trn_venue_amnts_det_datavalue2":"value1",
                        "trn_venue_amnts_det_datavalue3":"value1"
                    }
                ]
            }
        ],
        "photos":[
            {
                "venut_photo_id":1,
                "venue_id":2,
                "venue_image_path":"https://static.toiimg.com/photo/64697339.cms"
            }
        ]
    }

var playarray={value:'id',name:'name',dropdown:[{id:1,name:'Hourly'},{id:2,name:'Daily'},{id:3,name:'Weekly'},{id:4,name:'Monthly'}]}

export default class Pop_Up_Center extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popup_position:{top:0,left:0},
			open:false,
			popupVisible:false,
			Promo_Visible:false,
			avaialableSLot:null,
			Promo_success:false,
			availableDate:[],
			availabilityRange:[],
			venuejson:null,
			bookdetails:JSON.parse(JSON.stringify(bookdetails)),
			bookingReady:false,
			bookingFormdata:{},
			loading:false,
			btnloading:false,
			totalamount:0
		};

	}

	promoCodesuccess=()=>{

		// this.setState({Promo_success:true})

	}


	promoCode=()=>{
		// this.setState({Promo_Visible:true})
	// alert('hii');
}

OpenPopup=(data)=>{
	this.setState({popupVisible:!data.popupVisible})
}



getDate=(start, end)=>{


start=new Date(start);
end=new Date(end);
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push({date:dateFormat(new Date(dt), "yyyy-mm-dd"),altdate:dateFormat(new Date(dt), "dd/mm")});
        dt.setDate(dt.getDate() + 1);
    }
    return arr;


}
componentWillReceiveProps(props){
console.log("ReceiveProps",props);
if(props.bookobj){

	this.setState({venuejson:props.bookobj,totalamount:props.bookobj.price[0].trn_venue_price_amt});

}
if(props.clearData){
}
}
componentWillMount(){

	// this.setState({availableDate:this.getDate('2019-07-20','2019-07-30')});
	console.log(this.state)
}
selectedSlot=(data)=>{
	console.log("ActiveSLot",data)
	this.setState({avaialableSLot:data});
	this.setState({popupVisible:false});
}
getAvailData=(data)=>{
	// alert(data);
	if(data){	
	var returnData=playarray.dropdown.filter((obj)=>obj.id==data);
	return returnData.length>0?returnData[0].name:null;
	}
}
onChange=(data)=>{
	// console.log(data);
	var venuejson=this.state.venuejson;
	var avaialableSLot=this.state.avaialableSLot;
	if(!avaialableSLot){
	avaialableSLot={};
	}
	avaialableSLot.fromTime=dateFormat(data.format(''),'yyyy-mm-dd')
	avaialableSLot.toTime=null;
	// console.log(dateFormat(data.format(''),'yyyy-mm-dd'));
	// console.log(avaialableSLot);
	// avaialableSLot.toTime=dateFormat(data.format(''),'yyyy-mm-dd')
	this.setState({avaialableSLot})
}
onChangeDate=(date,key)=>{
var avaialableSLot=this.state.avaialableSLot;
	if(!avaialableSLot){
	avaialableSLot={};
	}
	avaialableSLot['fromTime']=dateFormat(date.format(''),'yyyy-mm-dd')
	avaialableSLot['toTime']=dateFormat(date.format(''),'yyyy-mm-dd')
	// avaialableSLot.toTime=null;
	this.setState({avaialableSLot});
}
getNumberOfDays=(from,to)=>{
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date(from);
const secondDate = new Date(to);

const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
return diffDays+1;
}

 getDates=(startDate, stopDate)=>{
 	console.log(startDate,stopDate);
    var dateArray = new Array();
    // debugger;
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(dateFormat(new Date (currentDate),'yyyy-mm-dd'));
        // debugger;
        currentDate = new Date(currentDate).addDays(1);
    }
    return dateArray;
}

onChangePicker=async(data,type)=>{
	console.log("date_date",data.length);
	// this.setState({avaialableSLot:null})
	// console.log(data);
	// return;
	this.setState({calendarFromDate:null});
	var monthlyorweeklydays=parseInt(type==4?30:7);
	var monthlyorweeklystring=type==4?'Monthly':'Weekly';
	if(data.length==0){
		this.setState({avaialableSLot:null,availabilityRange:[]});
		this.setState({totalamount:this.state.venuejson.price[0].trn_venue_price_amt});
		return;
	}
	var getthedates=await this.getDates(data[0],data[1]);
	// this.state.BookedDates
	 var blockedDates=BookedDates.diff(getthedates);
	console.log('blockedDates',blockedDates)
	if(blockedDates.length>0){
		this.setState({avaialableSLot:null,availabilityRange:[]});
		notification.open({
    message:'Error Message',
    description:"Dates in between already booked please choose some other dates",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
	}else{
var getDays=this.getNumberOfDays(data[0],data[1]);
if(getDays>=monthlyorweeklydays){
// proceed to book 
this.setState({availabilityRange:data});
	var bookdetails=this.state.bookdetails;
	var avaialableSLot=this.state.avaialableSLot;
	// for(var i in data){
		if(!avaialableSLot){
	avaialableSLot={};
	}
		avaialableSLot.fromTime=dateFormat(data[0].format(''),'yyyy-mm-dd')
		avaialableSLot.toTime=dateFormat(data[1].format(''),'yyyy-mm-dd')
		bookdetails.bookingFrom=dateFormat(new Date(avaialableSLot.fromTime),'yyyy-mm-dd HH:00:00');
		bookdetails.bookingTo=dateFormat(new Date(avaialableSLot.toTime),'yyyy-mm-dd HH:00:00');
		this.setState({bookdetails},function(){
		// this.setState({bookingReady:true});
		})
		var totalamount=this.state.venuejson.price[0].trn_venue_price_amt*Math.floor(getDays/monthlyorweeklydays);
		// alert(totalamount);

		this.setState({avaialableSLot,totalamount:totalamount});
}else{
	this.setState({avaialableSLot:null,availabilityRange:[]})
	notification.open({
    message:'Error Message',
    description:"This is a "+monthlyorweeklystring+" venue please  choose atleast minimum of "+monthlyorweeklydays+" days",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
}
	}
}
changeBookDate=(data,key)=>{
	var bookdetails=this.state.bookdetails;
	if(bookdetails)
		if(key=='mobile'){
			if(isNaN(data)){

			}else{
				if(data.length>15){

				}else{
				bookdetails[key]=data;
				}
			}
		}else{

	bookdetails[key]=data;
		}
	this.setState({bookdetails});
	// this.setState({[]})
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
removeRenderLoading=()=>{
		var bodydocument=document.getElementsByTagName('body');
		if(document.getElementById('loadingScreenId')!=undefined){
			document.body.removeChild(document.getElementById('loadingScreenId'));
		}
}
validateRangeDates=(dates,availability)=>{
	// return;
	// console.log("dates_length",dates.length);
	// console.log("dates_avail",availability);
	if(dates.length==2){
	this.setState({avaialableSLot:null});
}else{

}

}
BookNow=()=>{
	if(!this.state.avaialableSLot){
		this.setState({bookingReady:false})
		notification.open({
    message:'Error Message',
    description:"please choose the slot before booking..",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
		return;
	}

	console.log(this.state.bookdetails);
	var bookdetails=this.state.bookdetails;
	var LoginData=JSON.parse(window.localStorage['LoginData']);
	bookdetails.user_id=LoginData.user_id;
	bookdetails.venue_id=this.state.venuejson.venue_id;
	bookdetails.bookingFrom=dateFormat(new Date(this.state.avaialableSLot.fromTime),'yyyy-mm-dd HH:00:00');
	bookdetails.bookingTo=dateFormat(new Date(this.state.avaialableSLot.toTime),'yyyy-mm-dd HH:00:00');
	bookdetails.finalPrice=this.state.totalamount;
	bookdetails.trn_venue_price_amt=this.state.totalamount;
	bookdetails.type=this.state.venuejson.availability[0].trn_availability_type;
	// console.log("finalbookdetailsresponse",bookdetails);
	// this.setState({bookingReady:true});
	this.setState({btnloading:true})
	      fetch(Apilink.apiurl+'venueBooking', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(bookdetails),
}).then((response)=>response.json())
   .then((responseJson)=>{
	this.setState({btnloading:false})

   	if(responseJson.status==0){
   		this.setState({bookingReady:true},function(){
			document.querySelector('#stripbtnclick').click()
			this.setState({bookingReady:false})
   		});
   	}else{
   		notification.error({
    message:'Error',
    description:responseJson.msg,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
   	}
    // console.log(responseJson);
    // alert('Booked Successfully');
    // if(this.props.closePopupCenter){
    // 	this.props.closePopupCenter()
    // }
   })
}
loadBookingStatus=(data)=>{
	this.setState({loading:data.loading})
	if(data.success==true){
		this.props.closePopupCenter();
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
render() {
	return (
		<div>
		{!this.state.loading&&this.removeRenderLoading()}
		{this.state.loading&&this.renderLoading()}
		{this.state.venuejson&&
		<div className="main-pop-box">

		<div className="popupbox_promocode">
		<div className="center_popup">

		<div className="pop_up_center_flex">
		<div className="popup-heading">
		<span className="welcome-word">Hello</span>
		<span className="welcome-Name">{window.localStorage['LoginData']&&JSON.parse(window.localStorage['LoginData']).user_name+" "+JSON.parse(window.localStorage['LoginData']).user_surname}</span>
		</div>		

		<div className="close-icon">
		<i class="fa fa-times" aria-hidden="true"></i>
		</div>

		</div>

		<div className="popup-heading-2">
		<span className="Book-venue">Book your Venue</span>
		<span className="change-venue" onClick={()=>this.props.closePopupCenter()}>Change Venue</span>
		</div>

		<div className="popup-heading-3">
		<div className="Soccer-title">
		<div className="soccer-header-width">
		<span className="soccer-title">{this.state.venuejson.trn_venue_name}</span>
		<div className="cancellationPolicy"><a href="https://corporate.ivneu.com/cancellation-policy/" target="_blank" >Cancellation Policy</a>
		</div>
		</div>
		<div className="soccer-image">		
		<img src={Star} alt="star" />
		</div>
		</div>

		<span className="span-cart">{/*add to cart*/}</span>
		</div>

		<div className="flex-group-image">

		<div className="border-line">

		<div className="star-images">
		<img src={Star} alt="star" />
		<img src={Star} alt="star" />
		<img src={Star} alt="star" />
		<img src={Star} alt="star" />
		<img src={Star} alt="star" />
		</div>

		<div className="width-set-button">


		<div className="box-inline-block">

		<span className="kms-line">{this.state.venuejson && this.state.venuejson.Distance &&this.state.venuejson.Distance}</span>

		<span className="mins-line">{this.state.venuejson && this.state.venuejson.Time &&this.state.venuejson.Time}</span>

		</div>
{(this.state.venuejson && this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==1) &&
		<div className="box-inline-block">

		<button className="show-available-btn" onClick={()=>this.OpenPopup(this.state)} type="submit">Show Available Slots</button>

		</div>
}

		</div>
		{this.state.popupVisible &&
			<Show_available_slote avaialbility={this.state.venuejson.availability.length>0?this.state.venuejson.availability[0]:null}  venue_id={this.state.venuejson.venue_id} selectedSlot={this.selectedSlot} availableDate={this.state.availableDate}/>	
		}

		</div>

		</div>


		<div>


		<div className="search-venue-input-6 padding-align">
		<label className="label-width-2">Name</label>				
		<input value={this.state.bookdetails&&this.state.bookdetails.name} onChange={(e)=>this.changeBookDate(e.target.value,'name')} type="text"/>
		</div>

		<div className="search-venue-input-6 padding-align">
		<label className="label-width-2">When</label>				
		<Popupbox noarrow={true} disabled={true} buttonText={this.getAvailData(this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type)}  dropdown={playarray}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
		</div>

		<div>
		{(this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==1||this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==2)&&
		<div>
		<div className="search-venue-input-9 padding-align ">
		<label className="label-width-2">From</label>				
		<DatePicker disabledDate={(current)=>disabledDate(current,this.state.venuejson)} disabled={this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==1?true:(this.state.venuejson.availability[0].trn_availability_type=='undefined'?true:false)} format="YYYY MMM DD - hh:mm a"   value={this.state.avaialableSLot?moment(this.state.avaialableSLot.fromTime):null} onChange={(date)=>this.onChangeDate(date,'fromTime')}  />
		
		</div>
		<div className="search-venue-input-9 padding-align ">
		<label className="label-width-2">To</label>
		<DatePicker  disabledDate={(current)=>disabledDate(current,this.state.venuejson)} disabled={this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==1?true:(this.state.venuejson.availability[0].trn_availability_type=='undefined'?true:false)} format="YYYY MMM DD - hh:mm a" value={this.state.avaialableSLot?this.state.avaialableSLot.toTime&&moment(this.state.avaialableSLot.toTime):null}  onChange={(date)=>this.onChangeDate(date,'fromTime')} />
		
		</div>

		
		</div>
	}
		{(this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==3||this.state.venuejson.availability.length>0&&this.state.venuejson.availability[0].trn_availability_type==4)&&
		<div>
		<div className="search-venue-input-9">
		<label className="label-width-2">{this.state.venuejson.availability[0].trn_availability_type==3?"Weekly":"Monthly"}</label>
		<RangePicker  ref={r => this.rangepicker = r} renderExtraFooter={()=><div onClick={(e)=>{this.rangepicker.picker.clearSelection(e);this.rangepicker.picker.clearHoverValue(e)}}>Clear</div>}  onCalendarChange={(date)=>this.setState({calendarFromDate:date.length>0?new Date(date[0]):null})} value={this.state.availabilityRange?this.state.availabilityRange:[]} disabledDate={(current)=>(this.state.calendarFromDate?(current<this.state.calendarFromDate.addDays(this.state.venuejson.availability[0].trn_availability_type==3?6:29)):null) || disabledDate(current,this.state.venuejson)} onChange={(dates)=>this.onChangePicker(dates,this.state.venuejson.availability[0].trn_availability_type)} />
		</div>
		</div>
	}

		<div className="search-venue-input-7 padding-align">
		<label className="label-width-2">Price</label>				
		<input readonly={true} type="text" value={(this.state.totalamount) +"-"+ (this.state.venuejson.price.length>0&&this.state.venuejson.price[0].trn_venue_price_currency)}/>
		<span className="price-promo" onClick={()=>this.promoCode()}>Use PROMO Code</span>
		</div>
		</div>

		<div className="search-venue-input-6 padding-align">
		<label className="label-width-2">Address</label>				
		<input value={this.state.bookdetails&&this.state.bookdetails.address} onChange={(e)=>this.changeBookDate(e.target.value,'address')}  type="text"/>
		</div>

		<div className="search-venue-input-6 padding-align">
		<label className="label-width-2">Mobile</label>				
		<input type="text"  value={this.state.bookdetails&&this.state.bookdetails.mobile} onChange={(e)=>this.changeBookDate(e.target.value,'mobile')}/>
		</div>

		<div className="search-venue-input-6 padding-align">
		<label className="label-width-2">More.Info</label>				
		<textarea value={this.state.bookdetails&&this.state.bookdetails.moreinfo} onChange={(e)=>this.changeBookDate(e.target.value,'moreInfo')}></textarea>
		</div>

		<div className="search-main-flex padding-align">

		<div className="search-left-1">
		<button onClick={()=>this.props.closePopupCenter&&this.props.closePopupCenter()} className="search-venue-cancel-btn">Cancel</button>
		</div>

		<div className="search-right-1">
		{this.state.bookingReady==false&&
		<button disabled={this.state.btnloading} className={`search-venue-cancel-btn ${this.state.btnloading?"disablebtnclick":''}`} onClick={()=>this.BookNow()}>Book Now</button>
	}
	{this.state.bookingReady==true&&
			<CheckoutForm totalamount={this.state.totalamount} send={(data)=>this.loadBookingStatus(data)} {...this.props} bookingDetails={this.state.bookdetails}>
		<button id="stripbtnclick" className={`search-venue-cancel-btn ${this.state.btnloading?"disablebtnclick":''}`}>Book Now</button>
		</CheckoutForm>
	}
		</div>

		</div>




		</div>

		</div>

		{this.state.Promo_Visible ==true &&


			<div className="promo_code_div">


			<div className="flex_promo_code">

			<div className="flex_content">

			<div className="promo_background">

			<div className="Enter_promo_code">
			<input className="form-control" type="text" placeholder="Enter Promo code"/>
			</div>

			<div className="apply_btn">
			<button className="btn btn-primary" onClick={()=>this.promoCodesuccess()}>Apply</button>
			</div>

			</div>



			</div>

			</div>


			</div>

		}

		{this.state.Promo_success==true &&

			<div className="promo_code_div">

			<div className="flex_promo_code">

			<div className="flex_content">

			<div className="promo_background">

			<div className="applyed_promo_code">


			<div className="applyed_promo_successfully">

			<span>ivenue -20% OFF On</span>
			<span>promo applied successfully</span>

			</div>
			<div className="dollor_amount">
			<span>-$40</span>
			</div>


			</div>

			<div className="remove_btn">
			<button onClick={()=>this.setState({Promo_success:false,Promo_Visible:false})} className="btn btn-danger">Remove</button>
			</div>

			</div>						

			</div>

			</div>


			</div>

		}

		</div>




		</div>
	}


		</div>
		);
}
loadBookingDates=(venueId)=>{
console.log(venueId);
	      fetch(Apilink.apiurl+'getBookedDates', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify({venue_id:venueId}),
}).then((response)=>response.json())
.then((responseJson)=>{
	if(responseJson.status==0){

	BookedDates=responseJson.data;
}else{
	BookedDates=responseJson.data
}
	// console.log(responseJson);
	// this.setDate({bookedDates})

})
}
componentDidMount(){
	// console.log("ActiveProps",this.props);
	if(this.props.bookobj){
		this.setState({venuejson:this.props.bookobj,totalamount:this.props.bookobj.price[0].trn_venue_price_amt});
		var bookdetails=this.state.bookdetails;
		bookdetails.venue_id=this.props.bookobj.venue_id;
		bookdetails.finalPrice=this.props.bookobj.price.length>0?this.props.bookobj.price[0].trn_venue_price_amt:0;
		bookdetails.trn_venue_price_amt=this.props.bookobj.price.length>0?this.props.bookobj.price[0].trn_venue_price_amt:0;
			var LoginData=JSON.parse(window.localStorage['LoginData']);
		bookdetails.user_id=LoginData.user_id;
		this.setState({bookdetails});
		if(this.props.bookobj.availability.length>0){
		this.setState({availableDate:this.getDate(this.props.bookobj.availability[0].trn_venue_avail_frm,this.props.bookobj.availability[0].trn_venue_avail_to)});
		this.loadBookingDates(this.props.bookobj.venue_id);
	}
	}
}
}
