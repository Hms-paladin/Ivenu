import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Apilink from '../../helpers/apilink';
import './VenueMoreDetails.css';
import GridImages from './GridImages';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import Avatar from './Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import dateFormat from 'dateformat';
import {notification} from 'antd';
import PaxBoxes from '../../components/PaxBoxes/PaxBoxes'
import SeatBoxes from '../../components/PaxBoxes/SeatBoxes'
var dummyimage=require('../../images/shutter/CAROUSEL-01.jpg');

export default class VenueMoreDetails extends React.Component {


	constructor(props) {
		super(props);
		this.state={LoginModelVisible:false,loginDetails:null,images:[dummyimage,dummyimage,dummyimage,dummyimage,dummyimage,dummyimage,dummyimage ],venueDetails:false}
	}
	renderHTMLDom=(data)=>{
	var d=new DOMParser().parseFromString(data, 'text/html');
	var appendchild=d.body;
setTimeout(()=>{
if(appendchild){
		document.querySelector('#bulkdata').innerHTML="";
	document.querySelector('#bulkdata').appendChild(appendchild);
}
},300)
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


	openMessage=(data)=>{
		// return;
		// if(window.innerWidth>767){
		  if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
		
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      // this.props.history.push('/mymessage/id='+data.venue_id);
      console.log("venuedata",data);
      var obj={
      	venue_id:data.venue_id,
      	trn_venue_name:data.trn_venue_name,
      	trn_venue_address:data.trn_venue_address,
      	venue_user_id:data.venue_user_id,
      	venue_image_path:data.photos[0].venue_image_path
      }


      this.props.history.push({
  pathname: '/mymessage/'+data.venue_id,
  state: { data: obj }
})

  }else{
  	this.setState({LoginModelVisible:true});
  }
}



loadMap=(data)=>{
	 window.open("https://maps.google.com/maps?daddr="+data.trn_venue_location.split(',')[0]+","+data.trn_venue_location.split(',')[1]+"&amp;ll=");
	}
	booknow=(data)=>{
		// return;
		// if(window.innerWidth>767){
		  if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
		
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      this.props.history.push('/checkout/id='+data.venue_id);

  }else{
  	this.setState({LoginModelVisible:true});
  }
// }else{
// 	 // notification.error({
//   //      message:'Error Message',
//   //      description:"Booking Not Available",
//   //      onClick:() => {
//   //        console.log('Notification Clicked!');
//   //      },
//   //    });
// }
	}
	clospopup=()=>{
		this.setState({LoginModelVisible:false});
	}
	sendPaxSeatBook=(data,venue)=>{
	if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){	
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      if(venue.trn_venue_type==2){
      this.props.history.push('/checkout/id='+venue.venue_id+"&"+data.venue_pax_id);
      }else{
      this.props.history.push('/checkout/id='+venue.venue_id+"&"+data.seat_id);
      }
  	}else{
  	  this.setState({LoginModelVisible:true});
 	}

	}
	render() {
		const venudetails=this.state.venueDetails?this.state.venueDetails[0]:null;
		const availability=venudetails&&venudetails.availability.length>0?venudetails.availability[0]:null;
		const price=venudetails&&venudetails.price.length>0?venudetails.price[0]:null;
		const ameneties=venudetails&&venudetails.ameneties.length>0?venudetails.ameneties:null;
		const photos=venudetails&&venudetails.photos.length>0?venudetails.photos:null;
		const address=venudetails&&venudetails.trn_venue_address;
		return (
			<div>
			{venudetails&&
			<div className="VenueImages">
			<GridImages  imgGrid={photos?photos.map((obj)=>obj.venue_image_path):null}/>
			<div className="venueDetailsBlock">
			<div className="leftpanel">

			<div className="venue_name_left bold">{venudetails&&venudetails.trn_venue_name}</div>
			<div className="venue_name_location">
			<p title={address}>{address}</p> <span>{venudetails&&venudetails.Distance} | {venudetails&&venudetails.Time} <i className="fa fa-map-marker cursorpointer" onClick={()=>this.loadMap(venudetails&&venudetails)}></i></span>
			</div>
			<div className="venue_name_location wrapcontent">

			<h5 className="dateloc_From"><span className="header_avail">Availability :</span> {availability&&dateFormat(new Date(availability.trn_venue_avail_frm),`dd"th" mmm yyyy`)} </h5>
			<h5 className="dateloc_From">  <span>to</span>  {availability&&dateFormat(new Date(availability.trn_venue_avail_to),`dd"th" mmm yyyy`)+""}</h5>
			</div>
			<div className="venue_name_location wrapcontent">
			<h5 className="dateloc_From"><span className="header_avail">Hours :</span> {availability&&dateFormat(new Date(availability.trn_venue_avail_frm),`hh:MM tt`)} </h5>
			<h5 className="dateloc_From">  <span>to</span>  {availability&&dateFormat(new Date(availability.trn_venue_avail_to),`hh:MM tt`)+""}</h5>
			</div>
			
			

			</div>
			<div className="rightpanel">
			{/*<div className="flexdivblockprice" style={{marginTop:12}} onClick={()=>this.openMessage(venudetails)}>
    	<span className="taghourcoast blue" >
    	Message Host
    	</span>
    	</div>*/}
			{/*venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&
				<div className="perdayright">Per {price&&this.renderpricetype(availability?availability.trn_availability_type:null)}</div>
			*/}
			{/*venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&

			<div className="perdaycost">{price&&price.trn_venue_price_currency} - {price&&price.trn_venue_price_amt}</div>
			*/}
			</div>
			</div>
			<div style={{"marginLeft":window.innerWidth>767?0:12}}>
			{venudetails&&(venudetails.trn_venue_type==2 || venudetails.trn_venue_type==3)&&
          <div>
          {<span className="taghourcoast">{venudetails.price.length} {venudetails.trn_venue_type==2?'Pax':'Seat'}</span>}
          </div>
			}
			{venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&
			<div className="flexdivblockprice">
          {price&&price.hour_cost>0&&<span className="taghourcoast"> Hourly {price.hour_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.day_cost>0&&<span className="taghourcoast">Daily {price.day_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.week_cost>0&&<span className="taghourcoast">Weekly {price.week_cost } {price.trn_venue_price_currency}</span>}
        {price&&price.month_cost>0&&<span className="taghourcoast">Montly {price.month_cost } {price.trn_venue_price_currency}</span>}
        </div>
    	}

    	

    	</div>
			<div className="line"/>
			<div className="contentVenu">
			<h3>Description</h3>
			<p>{venudetails&&venudetails.trn_venue_desc}</p>
			</div>
			<div className="line"/>
			{venudetails&&venudetails.trn_venue_type==3&&
			<div className="contentVenu">
			<h3>Seats Details</h3>
			<SeatBoxes onClickBook={(data)=>this.sendPaxSeatBook(data,venudetails)} seatBox={venudetails?venudetails.price:[]} />
			</div>
			}
			{venudetails&&venudetails.trn_venue_type==2&&
			<div className="contentVenu">
			<h3>Pax Details</h3>
			<PaxBoxes onClickBook={(data)=>this.sendPaxSeatBook(data,venudetails)} paxBox={venudetails?venudetails.price:[]} />
			</div>
		}
			{(venudetails&&venudetails.trn_venue_type==2 || venudetails&&venudetails.trn_venue_type==3)&&

			<div className="line"/>
		}
			<div className="contentVenu">
			<h3>Ameneties</h3>
			<div className="wrappingcolumncontent">
			{ameneties&&ameneties.map((obj)=>{
				return(
<div className={`boxData ${obj.amnDetails.length>0&&'subBoxData'}`}>
			<div className="imgdiv"><img src={obj.amenities_icon}/></div><span className="amnsname">{obj.amenities_name}</span>
			{obj.amnDetails.length>0&&
	<span className="addonData">
	{
			obj.amnDetails.map((obj1,index)=>{
				return(
			<div >{obj1.amenities_det_name} {index!=obj.amnDetails.length-1 && <span className="lineData">|</span>} </div>
					)
			})
			}
			</span>
		}
			</div>
					)
			})}
			
			</div>
			</div>
			<div className="line"/>
			<div className="contentVenu reviews">
			<h3>Reviews <i className="fa fa-star"></i><span className="ratingpoint">0 <span>(0 reviews)</span></span></h3>
			{/*
			<Avatar title="DummyUser" subtitle="11/12/2019">
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
			</Avatar>
			<div className="line"/>
			<Avatar title="DummyUser" subtitle="11/12/2019">
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
			</Avatar>*/}

			</div>
			<div className="line"/>
			{venudetails&&(venudetails.trn_venue_type!=2 && venudetails.trn_venue_type!=3)&&
			<div className="booknowBtn">
			<button onClick={()=>this.booknow(venudetails)} className="btnclass">Book Now</button>
			</div>
			}
			</div>
		}
		{this.state.venueDetails&&this.state.venueDetails.length==0&&
			<div className="novenuefound"><span>No Venue Were found</span></div>
		}
		{!this.state.venueDetails&&
			<div className="loadingCenter">
			<p>Please Wait</p>
		 <CircularProgress color="secondary" />
		 </div>
		}
		 {this.state.LoginModelVisible == true && 
  <div>
  <LoginSignupModel  videomodalPopup={false} visible={true} clospopup={this.clospopup} type='login' loginttype="Book Your Venue" LoginLoad={(data)=>{ this.setState({LoginModelVisible:false,loginDetails:data,userType:window.location.search=="?/"?null:data.user_cat_id})}} />
</div>
}
			</div>
		);
	}
	componentDidMount(){
		this.props.history.hourlyDataInfo=null;
		this.props.receiveProps&&this.props.receiveProps(this.props);
		if(document.querySelector('.search-div')){
		document.querySelector('.search-div').style.display='none';
	}
		console.log('this.props',this.props);
		// var venueId=this.props.location.state?this.props.location.state.venueId:null;
		var venueId=this.props.match.params.venueid.split('=')[1];
		// console.log('venueId',venueId);
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
			console.log("respjson",{venueId:venueId,lat:position.coords.latitude,long:position.coords.longitude});
			this.setState({venueDetails:respjson.length>0?respjson:[]})
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
