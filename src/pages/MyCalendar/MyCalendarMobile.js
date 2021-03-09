import React from 'react';
import BigCalendarMUI from '../../components/BigCalendar/BigCalendar';
import SlotLegend from '../../components/slotLabel/SlotLable';
import AvailableSlots from '../../pages/AvailableSlots/AvailableSlots';
import BlockingDates from '../../pages/BlockingDates/BlockingDates';
import MaterialSelect from '../../components/MaterialSelect';
import dateFormat from 'dateformat';
import Apilink from '../../helpers/apilink';
import moment from 'moment';
import './MyCalendar.css';
import dateformat from 'dateformat';
import { Spin, Icon,notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import WeekCalendar from '../../components/weekCalendar/WeekCalendar';
const daysData={1:'Hourly',2:'Daily',3:'Weekly',4:'Monthly'};
const excludeDays=[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}]
// const antIcon = <Icon type="loading" style={{ fontSize:24,color:'#a70404' }} spin />;

const antIcon =<SmileOutlined type="loading" style={{ fontSize:24,color:'#a70404' }}spin />

export default class MyCalendarMobile extends React.Component {


	constructor(props) {
		super(props);
		this.state={selectedMonth:null,priceavailType:null,fromtodateobj:null,blockingDatesArray:[],width:0,venueobj:null,loginDetails:null,availability:[],errmsg:null,selectedDate:null,showCalendar:false,sendfulldata:"",seatData:null}
	}
	getMonthlyData=(data,apikey,callback)=>{
		console.log("monthlydata",data);
		var fromdate=moment(data[0]).format('YYYY-MM-DD');
		var todate=moment(data[1]).format('YYYY-MM-DD');
		var obj={venueId:this.state.venueobj.venue_id,date:fromdate,todate:todate,availType:this.state.priceavailType,uniqueId:this.state.paxorseatUniqueId};
		console.log('objSelected1',data);
			fetch(Apilink.apiurl+(apikey?apikey:"providerCalendarHourly"),{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
			.then((respjson)=>{
				callback(respjson.data);
				this.setState({sendfulldata:respjson})
				console.log('respjson',respjson);
			})
	}
changeBookingMonth= async(data)=>{
	var self=this;
	return new Promise(resolve => {
      setTimeout(() => {
      	console.log("selectedMonths",data);
      	var startofmonth   = moment(data).startOf('month').format('YYYY-MM-DD');
      	this.setState({selectedMonth:new Date(startofmonth)});
      	var availfromdate=new Date(this.state.venueobj.availability[0].trn_venue_avail_frm)
      	var availtodate=new Date(this.state.venueobj.availability[0].trn_venue_avail_to)
      	var validatefromdate=moment(availfromdate).format('YYYY-MM-DD');
      	var validatetodate=moment(availtodate).format('YYYY-MM-DD');
      	var endofmonth   = moment(data).endOf('month').format('YYYY-MM-DD');
      	if(startofmonth < validatefromdate){
      		startofmonth=validatefromdate;
      	}
      	if(endofmonth>validatetodate){
      		endofmonth=validatetodate;
      	}
		var apikey=(((!this.state.venueobj.trn_venue_type || this.state.venueobj.trn_venue_type=='1')&&this.state.venueobj.availability[0].trn_availability_type=='1') || (this.state.venueobj.trn_venue_type=='2'))?'getHourlyAvailability':null;
		// alert(apikey);
      	this.getMonthlyData([startofmonth,endofmonth],apikey,function(data){
      		console.log("availablemonth",data);
      	self.setState({blockingDatesArray:data.length>0?data[0].availability:[]});
        resolve(data);
      	})
        // setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
      }, 500);
    });
}
	loadVenuesList=(userid)=>{
		// alert(JSON.stringify(this.state.loginDetails));
		this.setState({loading:true})
		 fetch(Apilink.apiurl+'myVneu/', {
            method:'POST',
            headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
            body:JSON.stringify({userId:userid?userid:(this.state.loginDetails?this.state.loginDetails.user_id:"0")}),
        })
	.then((response)=>response.json())
	.then((responsejson)=>{
		this.setState({loading:false})
		console.log(responsejson);
		this.setState({venueList:responsejson.data.filter((obj)=>obj.trn_venue_status==1)});
	})
	}
	componentDidMount(){
		console.log('this.props.',this.props)
		var urlParams = window.location.href.includes('mobilefor_payment');
		// alert(urlParams);
		if(urlParams==true){
			var userId=this.props.match.params.userid;
			this.loadVenuesList(userId)
			// alert()
		}else{
		this.props.receiveProps&&this.props.receiveProps(this.props);
		if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      // console.log(LoginData)
      
      this.setState({loginDetails:LoginData},function(){
      	this.loadVenuesList();
      })
      }else{
      	this.loadVenuesList();
      }
  }
	}
	getVenueAvailablity=(data)=>{
		if(!data || data==""){
			return;
		}
		var filteredData=this.state.venueList.filter((obj)=>obj.venue_id==data);
		console.log('filteredData',filteredData);
		
		if(filteredData.length>0){
			this.setState({venueobj:filteredData[0]},function(){
					if(this.state.venueobj.trn_venue_type==2 ||this.state.venueobj.trn_venue_type==3){
					this.setState({paxorseat:true,showprice:null,paxorseatUniqueId:null})
				}else{
					this.setState({paxorseat:null,showprice:true,paxorseatUniqueId:null})
				}
				// this.changeBookingMonth(new Date()).then((response)=>{
				// 	// console.log('responseData',response)
					
				// 	// this.setState({})
				// });
			})
		}else{
			this.setState({venueobj:null});
		}
		this.setState({width:0})
	}
	getCalendarHourly=(dataid,date,uniqueId)=>{
			var dateValue=date;
			var venueId=dataid;
			// alert(date);
			this.setState({loading:true});
			var obj={venueId:venueId,date:dateFormat(dateValue,'yyyy-mm-dd'),availType:this.state.priceavailType,uniqueId:this.state.paxorseatUniqueId};
			fetch(Apilink.apiurl+"providerCalendarHourly",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
			.then((responsejson)=>{
				this.setState({loading:false});
				console.log("responsejsons",responsejson);
				if(responsejson.data.length>0){
					this.setState({availability:responsejson.data[0]});
				}else{
					this.setState({availability:null});
				}
			})

	}
openPax=(date)=>{
	// alert(this.state.venueobj.trn_venue_type)
	this.setState({width:450,selectedDate:date});

}
openBox=(data,dontopenbox)=>{
	if(!dontopenbox){

		this.setState({width:450,selectedDate:data});
	}
	if(this.state.priceavailType==1){
		var filteredData=this.state.venueobj.availability[0].trn_venue_exclude_days?this.state.venueobj.availability[0].trn_venue_exclude_days.split(',').filter((obj)=>obj==data.getDay()):[];
		if(filteredData.length>0){
			this.setState({errmsg:'Days Falls under Exclude Days'})
		}else{
			this.setState({errmsg:null})
		this.getCalendarHourly(this.state.venueobj.venue_id,data);
		}
	}else{
		if(this.state.paxorseat==true){
			if(data){
			var fromdate=moment(data[0]).format('YYYY-MM-DD')
			var todate=moment(data[1]).format('YYYY-MM-DD')
			this.loadofrangegetSeats(fromdate,todate);
		}
	}
		this.setState({errmsg:null})
			this.setState({fromtodateobj:data});
		// this.getMonthlyData(data,function(resp){
		// 	console.log('dataresponse',resp);
		// });
		// console.log(data);
	}
	console.log("selectedDatesMain",data);
}
receiveSlots=(data)=>{
	console.log("finalSlots",data);
}
updateMonth=()=>{
	this.setState({showCalendar:false},function(){
		this.setState({showCalendar:true});
	})
	this.changeBookingMonth(this.state.selectedDate[0]);
}

BlockDatesCalendar=(data,date)=>{
	console.log("dddd",data);
	// alert(JSON.stringify(data));
	fetch(Apilink.apiurl+"unblockingSlots",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({unblockinlist:data}),
    }).then((response)=>response.json())
    .then((responsejson)=>{
    	console.log(responsejson);
    	this.changeBookingMonth(date,function(data){

    	})
    })
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
renderExcludeDays=(arrayData)=>{
	if(arrayData){
var getData=arrayData.map((obj)=>{
		var findindex=excludeDays.findIndex((obj2)=>obj2.value==obj);
		if(findindex!=-1){
			return excludeDays[findindex].label;
		}

})
return "Exclude Days : "+getData.join(',');
}else{

return "Exclude Days : "+"0";
}
}
changeAvailType=(data)=>{
	// alert(data);
this.setState({priceavailType:data,availability:null},function(){
	// alert(JSON.stringify(this.state.venueobj));
	// alert(this.state.selectedDate);
	if(data!=1){
		this.changeBookingMonth(new Date());
	}
		this.setState({showCalendar:true});
	// this.changeBookingMonth(this.state.selectedMonth?this.state.selectedMonth:new Date(),this.state.paxorseatUniqueId).then((response)=>{
	// // 	this.setState({showCalendar:false},function(){
	// // // 	this.changeBookingMonth(new Date());
	// // 	this.setState({showCalendar:true});
	// // })
	// 				// console.log('responseData',response)
					
	// 				// this.setState({})
	// 			});
	// this.getVenueAvailablity(this.state.venueobj.venue_id);
});
	// this.setState({priceavailType:data},function(){
	// this.setState({showCalendar:false},function(){
	// 	this.changeBookingMonth(new Date());
	// 	this.setState({showCalendar:true});
	// })
	// });
}
seatorpaxchange=(data,key,venueprice)=>{
	// console.log(data);
	// alert(data);
	var uniqueSeatData=venueprice.filter((obj)=>obj.seat_unique_id==data)
	if(uniqueSeatData.length>0){
		this.setState({showprice:true,paxorseatUniqueId:data,seatData:uniqueSeatData[0]})
		if(this.state.availTypeData==1){

		}else{

		// this.changeBookingMonth(new Date(),data);
		}
	}

}
loadBookingDatas=(data,availtype,update)=>{
// console.log(data)
// console.log(this.state.)
this.setState({blockedDate:data});
var obj={venueId:this.state.venueobj.venue_id,date:dateFormat(data,'yyyy-mm-dd'),todate:dateFormat(data,'yyyy-mm-dd'),availType:availtype,uniqueId:this.state.paxorseatUniqueId};
fetch(Apilink.apiurl+'providerCalendarHourly',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
			.then((respjson)=>{
				// callback(respjson.data);
				console.log('respjsonbookings',);
				if(update){
					this.changeBookingMonth(data);
				}else{
					setTimeout(()=>{		
						window.scrollTo({
						  top: window.innerHeight,
						  left: 0,
						  behavior: 'smooth'
						},200);
					},200)
				}
				this.setState({availability:respjson.data.length>0?respjson.data[0]:null});
			})
// alert(JSON.stringify(obj));
}
updateCalenderdummy=()=>{
this.setState({showCalendar:true});
}
loadofrangegetSeats=(fromdate,todate)=>{
	// fetch
	 	// this.setState({dates:{fromDate:fromDate,toDate:toDate}});
 	var obj={venueId:this.state.venueobj.venue_id,date:fromdate,todate:todate,uniqueId:this.state.seatData.seat_unique_id,availType:this.state.priceavailType};
 	// var obj={venueId:venue_id,date:fromDate,todate}
 	// fetch(Apilink.apiurl+"checkAvailabilityForRange")
 	// this.setState({loading:true});
 	fetch(Apilink.apiurl+"checkAvailabilityForRange",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((response)=>response.json())
    .then((respjson)=>{
    	// alert(JSON.stringify(respjson))
    	if(respjson.status==1){
    		this.setState({availableSeats:0})
    	}else{
    		this.setState({availableSeats:respjson.availCount})
    	}
    	// this.setState({seatsAvailable:})
    })
  //   .th
}
	render() {
		const availtype=this.state.venueobj&&this.state.venueobj.availability.length>0&&this.state.venueobj.availability[0].trn_availability_type;
		var nametypes=this.state.priceavailType;
		// console.log(nametypes,"nametypes")
		const venuetype=this.state.venueobj&&this.state.venueobj.trn_venue_type;
		const excludeDayslist=this.state.venueobj&&this.state.venueobj.availability[0].trn_venue_exclude_days?this.state.venueobj.availability[0].trn_venue_exclude_days.split(','):null
		var arrayofAvailType=[];
	const filteredAvailType=availtype?availtype.split(',').map((obj)=>{
		if([1,2,3,4].includes(parseInt(obj))==true){
			arrayofAvailType.push({id:obj,name:daysData[obj]});
			
		}

	}):[];
		console.log("venuelist",this.state.venueobj && this.state.venueobj.availability[0].trn_availability_type);
		return (
                <div className="row m-0">
                <div className="row m-0 width100">
                    <div className="pr-0 mob_venue_list">
                            <MaterialSelect sendSelectedId={(data)=>this.getVenueAvailablity(data)} labelName={"Choose Your Venue"} options={this.state.venueList?this.state.venueList.filter((obj)=>obj.trn_venue_status==1&&(obj.trn_venue_type!=2)&&!obj.autoSave):[]} id={'venue_id'} label={"trn_venue_name"}/>
                    </div>
                    {this.state.venueobj&&this.state.paxorseat==true&&
                    <div className="pr-0 mob_venue_list 1margin 1padding">
                           <MaterialSelect sendSelectedId={(data)=>this.seatorpaxchange(data,'seat',this.state.venueobj.price)} labelName={"Choose Your Seat To Manage"} options={this.state.venueobj.price} id={'seat_unique_id'} label={"seat_name"}/>
                    </div>
                	}
                        {this.state.venueobj&&this.state.showprice&&
                    <div className="p-0 mob_venue_list width99">
                            <MaterialSelect sendSelectedId={(data)=>this.changeAvailType(data)} labelName={"Choose"} options={arrayofAvailType} id={'id'} label={"name"}/>
                    </div>
                        }
                    </div>
                    {
                        this.state.venueobj &&
                        <>
                        <div className="col-6 business_title">
                            <h6>Business Hours</h6>
                            <div className="bunisesshrs">
                            {dateFormat(new Date(this.state.venueobj.availability[0].trn_venue_avail_frm),'hh:MM TT')} - {dateFormat(new Date(this.state.venueobj.availability[0].trn_venue_avail_to),'hh:MM TT')}
                            </div>
                        </div>

                        <div className="col-6 avail_title">
                            <h6>Availability</h6>
                            <div className="availhrs">
                            {dateFormat(new Date(this.state.venueobj.availability[0].trn_venue_avail_frm),'dd mmm yyyy')} - {dateFormat(new Date(this.state.venueobj.availability[0].trn_venue_avail_to),'dd mmm yyyy')}
                            </div>
                        </div>
                        </>

                    }
                   
            
			<div className="MyCalendarMain">
			
			{!this.state.venueobj&&
					<div className="errorCalendar">
					<i className="fa fa-calendar"/>
					Before Managing Calendar Please choose your venue</div>
			}


			{this.state.showCalendar === true && this.state.priceavailType==1 &&
            <>
            <WeekCalendar propssend={(date)=>{this.setState({selectedDate:date});this.getCalendarHourly(this.state.venueobj.venue_id,date,this.state.paxorseatUniqueId);this.updateCalenderdummy()}} />
				{this.state.loading&&
					<div style={{display:'block',textAlign:'center'}}>
					<Spin indicator={antIcon} />
					</div>
				}
				{
					this.state.selectedDate && !this.state.loading &&
					<AvailableSlots seatobj={this.state.seatData} venuetype={venuetype} type={this.state.priceavailType} errmsg={this.state.errmsg} updateSlots={()=>{this.openBox(this.state.selectedDate,this.state.paxorseatUniqueId,'update');this.changeBookingMonth(this.state.selectedDate);}} selectedDate={this.state.selectedDate} sendSlots={(slots)=>this.receiveSlots(slots)} availability={this.state.availability}  close={()=>this.setState({width:0})}/>
				}
                </>
            }

			{
				this.state.showCalendar === true && this.state.priceavailType!=1 &&
                <BigCalendarMUI availType={this.state.priceavailType} loadBookedData={(data,data1)=>this.loadBookingDatas(data,this.state.priceavailType)} openPax={(date)=>this.openPax(date)} blockDates={(data,date)=>this.BlockDatesCalendar(data,date)} minDate={this.state.venueobj.availability[0].trn_venue_avail_frm} maxDate={this.state.venueobj.availability[0].trn_venue_avail_to} blockingDates={this.state.blockingDatesArray} type={this.state.priceavailType} venutype={this.state.venueobj.trn_venue_type}  openBox={(data)=>this.openBox(data)} handleMonthChange={(data)=>this.changeBookingMonth(data)} excludeDays={excludeDayslist}>
			
               
				<div className="excludeLegend">
                        {this.renderExcludeDays(excludeDayslist)}
                    </div>
			</BigCalendarMUI>
			}

			

			{this.state.venueobj&&
			<div className="MyCalendar">
			<div className="CalendarHeader" style={{width:this.state.width}}>
		
			{this.state.width!=0&&this.state.venueobj.availability.length>0&&this.state.priceavailType!=1&&(venuetype!=2)&&
			<BlockingDates availableSeats={this.state.availableSeats} seatobj={this.state.seatData}  updateSlots={()=>this.updateMonth()} venuetype={venuetype}  loadBookedData={(date)=>this.loadBookingDatas(this.state.blockedDate,this.state.priceavailType,'update')} availability={this.state.availability} updateMonth={()=>this.updateMonth()} venueDetails={this.state.venueobj} selectedDates={this.state.fromtodateobj}  type={this.state.priceavailType}  close={()=>this.setState({width:0})} propsdata={this.state.sendfulldata}/>
			}
			

			</div>

            

			{/* {this.state.showCalendar==true&&
				<>
            
			 <BigCalendarMUI loadBookedData={(data,data1)=>this.loadBookedData(data,data1)} openPax={(date)=>this.openPax(date)} blockDates={(data,date)=>this.BlockDatesCalendar(data,date)} minDate={this.state.venueobj.availability[0].trn_venue_avail_frm} maxDate={this.state.venueobj.availability[0].trn_venue_avail_to} blockingDates={this.state.blockingDatesArray} type={availtype} venutype={this.state.venueobj.trn_venue_type}  openBox={(data)=>this.openBox(data)} handleMonthChange={(data)=>this.changeBookingMonth(data)} excludeDays={excludeDayslist}>
			
			<div className="LegendMyCalendar">
			<SlotLegend circle={true} legend="Selected Date" boxColor="#EB5C00"/>
			{availtype&&availtype!=1&&
				<>
			<SlotLegend circle={true} legend="Booked" boxColor="#7070702e"/>
			<SlotLegend circle={true} legend="Blocked" boxColor="#eb5c003d"/>
			</>
		}
		<div className="excludeLegend">
			{this.renderExcludeDays(excludeDayslist)}
			</div>
			</div>
			</BigCalendarMUI>
			</>
		} */}
			</div>
		}
			</div>
            </div>
		);
	}
	
}
