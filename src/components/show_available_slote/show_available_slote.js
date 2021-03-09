import React from 'react';
import './show_available_slote.css';
import Scroll_slider_date from '../scroll_slider_date/scroll_slider_date';
import dateFormat from 'dateformat';
import Apilink from '../../helpers/apilink';
Array.prototype.unique = function() {
	var a = this.concat();
	for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
			if(a[i] === a[j])
				a.splice(j--, 1);
		}
	}

	return a;
};

export default class Show_available_slote extends React.Component {

	constructor(props) {
		console.log(props);
		super(props);

		this.state = {
			listTime:[],
			
		};
	}

setDateHours(date,h){
	console.log("date",date)
	console.log(h);
var hourDate=date;
	if(hourDate){
			hourDate.setHours(h);
			hourDate.setMinutes(0);
			hourDate.setSeconds(0);
			console.log("new Date()",hourDate.getTime());
			return hourDate.getTime();
	}
}
	getTime=(date,t1, t2)=>{
		// alert(t1);
		// debugger;
		var timeArray = [],
		d = new Date(date),
		mill = d.getTime(),
		h = 0,
		m = 0,

		d1 = new Date(dateFormat(new Date(), "yyyy-mm-dd")),
		millNow = d1.getTime(),
		meridiem = ['AM','PM'];

		if(mill >= millNow){

			if(mill == millNow){
				d = new Date();
				mill = d.getTime();
				h = d.getHours();
				m = d.getMinutes();
			}


			for (var i = h; i < 24; ++i) {
				for (var j = i==h ? Math.ceil(m/60) :0; j < 1; ++j) {

					if(i>=t1 && i<=t2){

						timeArray.push({fromTime:this.setDateHours(d,i),toTime:this.setDateHours(d,(i+1)),availableTime:(i%12==0?i:i%12) + ':' + (j*15||'00')+ meridiem[(i)/12|0] + '-'+((i+1)%12==0?(i+1):(i+1)%12) + ':' + ((j)*15||'00') + meridiem[(i+1)/12|0],hours:i});
						
					}
				}
			}
		}
			// return timeArray;
			console.log('timeArray',timeArray);
			this.apiResponse(timeArray,date);
			
		}
processBookedSlots=(response,timeArray)=>{
	console.log(response);
			var bookedSlots=[];

			for(var i=0 ; i < response.length ; i++){
				var fromHour = this.getHours(response[i].trn_booking_from_date_time);
				var toHour = this.getHours(response[i].trn_booking_to_date_time);
				console.log(this.compinedTime(fromHour, toHour))
				bookedSlots=bookedSlots.concat(this.compinedTime(fromHour, toHour)).unique();

			}
			console.log("totalTime",timeArray)
			console.log("bookedTime",bookedSlots);

			for(var i in bookedSlots){

				timeArray.map((item)=>{
					
					if(item.hours == bookedSlots[i]){
						item.booked=true;	
					}
				});
			}

			console.log("finalArray",timeArray)
			var listTime=timeArray?timeArray:[];
			this.setState({listTime});
}
		apiResponse(timeArray,date){
			var obj={venue_id:this.props.venue_id,date:date};
			console.log(obj);
			      fetch(Apilink.apiurl+'bookedSlots', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(obj),
}).then((response)=>response.json())
   .then((responseJson)=>{
    // console.log("responseJsonBookedslots",responseJson);
    if(responseJson.status==0){
    	this.processBookedSlots(responseJson.response,timeArray);
    }else{
    	this.processBookedSlots([],timeArray);
    }
 })
			 
			
		}

		compinedTime(start, end){
			return Array((end-1) - start + 1).fill().map((_, idx) => start + idx)

		}

		getHours(date){
			var d=new Date(date);
			return d.getHours();

		}
		// componentDidMount(){
		// 	this.apiResponse();
		// }
changeRadioSlots=(check,item,index)=>{
	// alert("clicked");
	// console.log(item);
	this.props.selectedSlot(item);
	// console.log(check,item,index);
	// 	var listTime=this.state.listTime;
	// if(check==undefined){
	// 	listTime[index].checked=true;
	// }else{
	// 	listTime[index].checked=!check;
	// }
	// this.setState({listTime});
}



		render() {
			console.log(this.state.listTime);
			// alert(new Date(this.props.avaialbility.trn_venue_avail_frm.toString()).getHours());
			return (
				<div>


				<div className="show_available_slote_main_div">

				<div className="show_content_padding">

				<Scroll_slider_date availableDate={this.props.availableDate} getTime={(date)=>this.getTime(date,this.props.avaialbility?new Date(this.props.avaialbility.trn_venue_avail_frm.toString()).getHours():8,this.props.avaialbility?new Date(this.props.avaialbility.trn_venue_avail_to.toString()).getHours():23)}/>

				<div>

				<span className="available_dates">Available</span>

				</div>

				<div className="scrollTimeSlot">

				{this.state.listTime.length==0 &&
					<div className="select_input">
					No Slot Available
					</div>
				}

				{this.state.listTime && this.state.listTime.map((item,i)=>(
					<div>
					{(item.booked && item.booked==true) && (
					<div className="select_input_book">

					<input className="none_input" type="checkbox" checked={item.booked} id={'dropBooktime'+i}/>
					<label className="select-check" for={'dropBooktime'+i}><span className="Time_set">{item.availableTime}</span><span className="time_select_button">Booked</span></label>


					</div>
					) || (

					<div className="select_input">

					<input className="none_input" checked={item.checked} onClick={(e)=>this.changeRadioSlots(item.checked,item,i)} type="radio" name='timeRadio' id={'droptime'+i}/>
					<label className="select-check" for={'droptime'+i}><span className="Time_set">{item.availableTime}</span><span className="time_select_button">select </span></label>


					</div>

					)

				}

				</div>
				))}


</div>

</div>

</div>



</div>
);
}
}
