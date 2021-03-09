import React from 'react';
import HourlyAvailablity from './HourlyAvailablity';
import DayCalendar from './DayCalendar';
import dateFormat from 'dateformat';
import Apilink from '../../helpers/apilink';
import DateFunctions from '../../helpers/DateFunctions';



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
    "finalPrice":""
    }

    var typeofvenue="";


class CheckoutDate extends React.Component{
    state = {
        count:0,
        arrayofSlots:[]
    }

    componentWillUnmount(){
		
		if(document.querySelector('.search-div')){
		    document.querySelector('.search-div').style.display='inherit';
        }
    }


    componentDidMount(){
		if(document.querySelector('.search-div')){
		document.querySelector('.search-div').style.display='none';
    }
    return;

		var venueId=this.props.match?this.props.match.params.venueid.split('=')[1]:null;
		// console.log('venueId',venueId);
		 if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
	bookdetails.user_id=LoginData.user_id;
	bookdetails.venue_id=venueId;
	bookdetails.bookingFrom=dateFormat(new Date(),'yyyy-mm-dd');
	bookdetails.bookingTo=dateFormat(new Date(),'yyyy-mm-dd');
	bookdetails.promodId=0;
	bookdetails.promoType=0;
	bookdetails.promoValue=0;
	bookdetails.trn_venue_price_amt=0;
	bookdetails.promoAmount=0;
	bookdetails.finalPrice=0;
	bookdetails.bookingCapacity=0;
	bookdetails.slots=[];
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
				this.getMonthlyData(respjson[0].venue_id,respjson[0].availability[0].trn_venue_avail_frm,new Date())
			}
            this.setState({venueDetails:respjson.length>0?respjson:[]})
            console.log("response",respjson)
		})
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



    sendHourlyData=(data,priceCount)=>{
        console.log(data);
        // console.log(data.length);
        typeofvenue='Hour';
        if(Array.isArray(data)==true){
            this.groupingDates(data);
        }else{
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
            var finalamount=(parseInt(priceCount?priceCount.trn_venue_price_amt:0)*this.generateSlotCount(arrayofSlots));
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

        groupingDates=(array)=>{
            var priceCount=this.state.venueDetails&&this.state.venueDetails[0].price.length>0?this.state.venueDetails[0].price[0]:null;
        if(array.length>0){
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
            var finalamount=(parseInt(priceCount?priceCount.trn_venue_price_amt:0)*this.generateSlotCount(arrayofSlots));
            if(this.state.discountedamount!=0){
    
            bookdetails.finalPrice = finalamount - finalamount*(parseInt(bookdetails.promoValue)/100);
            bookdetails.promoAmount=finalamount*(parseInt(bookdetails.promoValue)/100);
            }else{
                    bookdetails.finalPrice=finalamount;
            }
            bookdetails.venue_price_amt=parseInt(priceCount?priceCount.trn_venue_price_amt:0);
            console.log('finalHours',finalHoursData)
    
            this.setState({arrayofSlots,finalHoursData})
        }
        
    }

    generateSlotCount=(data)=>{
        // return 0;
        // debugger;
        console.log(data);
        // debugger;
        var count=0;
        if(typeofvenue=='pax'){
            return this.state.arrayofSlots?this.state.arrayofSlots.value:0;
        }else if(typeofvenue=='Month'||typeofvenue=='Week'||typeofvenue=='Day'){
            return this.state.count;
        }
        data.map((obj)=>{
            count+=obj.slots.length;
        })
        return count;
    }

    sendAvailability = () => {
        this.props.location.receiveChosenData(this.state.arrayofSlots)
    }

    updateMonthlyData=(venueid,fromdates,todates)=>{
        var obj={venueId:venueid,date:fromdates,todate:todates};
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
    
    adddateslot=(data)=>{
		console.log("111",data)
		console.log("222",data.venueDetails[0].trn_venue_type)
		console.log("123",data.venueDetails[0].availability[0].trn_availability_type)

		if(data){
		var dataname=this.generateVenueType(data.venueDetails[0].trn_venue_type,
			data.venueDetails[0].availability[0].trn_availability_type)
		console.log(dataname,"dataname")
        }
    }

    openRangeSelected=(dates,type,price)=>{
        // console.log(type);
        if(!dates){
            this.setState({arrayofSlots:[],showdaycalendar:false});
            return;
        }
        var getDates=DateFunctions.enumerateDaysBetweenDates(dateFormat(dates.fromDate,'yyyy-mm-dd'),dateFormat(dates.toDate,'yyyy-mm-dd'));
        var quantity=0
    if(type==4){
        quantity=Math.ceil(getDates.length/30);
        typeofvenue='Month';
    }else if(type==3){
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
    var finalprice = quantity*(price&&price.trn_venue_price_amt);
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
    this.setState({arrayofSlots:[{fromDate:dates.fromDate,toDate:dates.toDate,dates:getDates}],count:quantity,discountedamount:discountedamount},function(){
        this.setState({showdaycalendar:false});
    })
    }

    render(){
        console.log("logindata",this.props);
        const locationprops=this.props.location;
        const venueFetchDetails=this.props.location.venuedetails?this.props.location.venuedetails.venueData:null;
        const venudetails=venueFetchDetails?venueFetchDetails:null;
		const venuetype=venudetails&&venudetails.trn_venue_type;
		const availability=venudetails&&venudetails.availability.length>0?venudetails.availability[0]:null;
		const price=venudetails&&venudetails.price.length>0?venudetails.price[0]:null;
		const ameneties=venudetails&&venudetails.ameneties.length>0?venudetails.ameneties:null;
		const photos=venudetails&&venudetails.photos.length>0?venudetails.photos:null;
		const address=venudetails&&venudetails.trn_venue_address;
        return(
            <>
			 <HourlyAvailablity cancelbtn={true} {...this.props} excludeDays={availability?availability.trn_venue_exclude_days.split(','):[]} type={this.props.location.type} sendpaxDetails={(count,date)=>{locationprops.sendpaxDetails&&locationprops.sendpaxDetails(count,date,price,true);}} hourlychosenslots={this.props.location.hourlychosenslots} sendDataSlot={(data)=>locationprops.sendHourlyData(data,price,true,this.props.location.type,this.props.location.typeamt)} closeHourModal={()=>this.setState({showavail:false})} venueDetails={venudetails}/>
            </>
        )
    }
}

export default CheckoutDate;
