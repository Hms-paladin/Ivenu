import React from 'react';
import './search_venue.css';
import Apilink from '../../helpers/apilink';
import search from '../../images/Search.png';
import Popupbox from '../popupbox/popupbox'
import { DatePicker } from 'antd';
import {notification} from 'antd';


export default class Search_venue extends React.Component {
	constructor(props){
		super(props);
		this.state={ 
			chosenlocation:{latitude:0,longitude:0},
			amentiesloading:false,
			venueloading:false,
			startValue:null,
			endValue:null,
			endOpen:false,
			venuedrop:{id:'venue_cat_id',name:'venue_cat_name',dropdown:[]},
			updatePosition:null,
			visible:false,
			amenvisible:false,
			venueobj:null,
			amen_obj:null,
			amenitiesDrop:{id:'amenities_id',name:'amenities_name',dropdown:[]},
			amenobjArray:[],
			price:"",
			where:"",
			nearme:false,
			amentiesValue:{id:'amenities_id',name:'amenities_name',dropdown:[]},

			searchobj:{
				"venue_cat_id":1,
				"where":"",
				"fromDate":"",
				"toDate":"",
				"priceFrom":"",
				"priceTo":"",
				"lat":0,
				"lng":0,
				"nearme":false,
				"amenities":[]
			}
		}
	}

	disabledStartDate = startValue => {
		const endValue = this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	disabledEndDate = endValue => {
		const startValue = this.state.startValue;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	onChange = (field, value,key) => {

		var searchobj = this.state.searchobj;
		if(!value){
			searchobj[key]='';
		}else{

		 searchobj[key] = value.format('YYYY-MM-DD');
		}
		this.setState({
			[field]:value,searchobj
		});
	};

	onStartChange = value => {
		document.removeEventListener('click', this.handleOutsideClick, false);
		this.onChange('startValue', value,'fromDate');
		document.addEventListener('click', this.handleOutsideClick, false);
	};

	onEndChange = value => {
		document.removeEventListener('click', this.handleOutsideClick, false);
		this.onChange('endValue', value,'toDate');
		document.addEventListener('click', this.handleOutsideClick, false);
		
	};

	handleStartOpenChange = open => {
		document.removeEventListener('click', this.handleOutsideClick, false);
		if (!open) {
			this.setState({ endOpen:true });
		}
		document.addEventListener('click', this.handleOutsideClick, false);
		
	};

	handleEndOpenChange = open => {
		document.removeEventListener('click', this.handleOutsideClick, false);
		this.setState({ endOpen:open });
		document.addEventListener('click', this.handleOutsideClick, false);
	};

	searchDropdown=(data)=>{
		// alert(data);
		var venueobj=this.state.venueobj;
		if(!venueobj){
			venueobj={};
		}
		venueobj.venue_cat_name=data;
		this.setState({venueobj});
		if(data==""){
			this.setState({visible:'empty'});
			return
			
		}
		console.log("not empty");
		// this.setState({text})
	// 	if(data.length==0){
	// 		console.log('datatext',data)
	// 		// var self=this;

	// 		this.setState({visible:false});
	// 		var venuedrop=this.state.venuedrop;
 //        	venuedrop.dropdown=[];
 //        	this.setState({venuedrop});
	// 		// return;
	// 	}else{
			var venuedrop=this.state.venuedrop;
        	venuedrop.dropdown=[];
        	this.setState({venuedrop});
this.setState({venueloading:true})
		this.setState({visible:true});
		fetch(Apilink.apiurl+'searchYourVenue', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({
				'catName':data
			}),
		}).then((response)=>response.json())
		.then((responsejson)=>{
			this.setState({venueloading:false})
			if(data!=""){
			
			console.log("responsejson",responsejson);
        	// alert(JSON.stringify(responsejson))
        	var venuedrop=this.state.venuedrop;
        	venuedrop.dropdown=responsejson.data;
        	this.setState({venuedrop});
        }
        })
	// }
	}
	searchAmentiesDropdown=(data)=>{
		this.setState({amentiesloading:true})
		fetch(Apilink.apiurl+'searchAmenities', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({
				'amenitiesName':data
			}),
		}).then((response)=>response.json())
		.then((responsejson)=>{
		this.setState({amentiesloading:false})
			var amenitiesDrop=this.state.amenitiesDrop;
			amenitiesDrop.dropdown=responsejson.data;
			this.setState({amenitiesDrop});
		})
	}
	receivePopupData=(data,position)=>{
		console.log();

		if(data!=""){
			this.setState({visible:true});
			this.searchDropdown(data);
		}else{
			this.setState({visible:"empty"});
		}
		if(this.state.venueobj){
		// this.setState9
		var venueobj=this.state.venueobj;
		venueobj.venue_cat_name=data;
		this.setState({venueobj});
	}
	// console.log(data);


}

searchVenueFormData=(data)=>{
	// alert(JSON.stringify(data));
	fetch(Apilink.apiurl+'formSearch', {
		method:'POST',
		headers:{
			Accept:'application/json',
			'Content-Type':'application/json',
		},
		body:JSON.stringify(data),
	}).then((response)=>response.json())
	.then((responsejson)=>{
        	// console.log('searchJSON',responsejson);
        	// if(responsejson.length==0){
        	// 	alert("No Results Found");
        	// 	return;
        	// }
        	if(this.props.searchedData){

        		this.props.searchedData(responsejson.data?responsejson:{data:responsejson});
        	}
        })
    }

    searchVenueForm=()=>{
    	  var userid=null;
     if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
        var LoginData=JSON.parse(localStorage.getItem('LoginData'));
        userid=LoginData.user_id;
      }
    	console.log(this.state.amentiesValue)
    	var searchobj=this.state.searchobj;
    	var amenities =this.state.amentiesValue.dropdown.map(item=>item.amenities_id); 
 
	console.log(amenities)

	// searchobj.
	if(this.state.venueobj){
		searchobj.venue_cat_id=this.state.venueobj.venue_cat_id;
		searchobj.amenities=amenities;
		searchobj.priceFrom=this.state.price;
		searchobj.priceTo=this.state.price;
		searchobj.where=this.state.where;
		searchobj.searchCategory=1;
		searchobj.userId=userid;
		searchobj.lat=this.state.chosenlocation.latitude;
		searchobj.long=this.state.chosenlocation.longitude;
	}
	// if(this.state.amenobjArray){
	// 	searchobj.amenities=this.state.amenobjArray;		
	// }
	console.log(searchobj)
	this.searchVenueFormData(searchobj);


}
receivePopupAmentiesData=(data,position)=>{
	
	console.log('receiveAmenities',data)
	var amenitiesDrop=this.state.amenitiesDrop;
			amenitiesDrop.dropdown=[];
			this.setState({amenitiesDrop});
	if(data!=""){
		this.setState({amenvisible:true});
		this.searchAmentiesDropdown(data);
	}else{
		this.setState({amenvisible:"empty"});
	}
	// document.addEventListener('click', this.handleOutsideClick, false);
	// this.setState({amentiesValue:data});
	// console.log(data);


}
receiveVenue=(data)=>{
	document.removeEventListener('click', this.handleOutsideClick, false);
	console.log('receiveVenue',data);
	this.setState({visible:"empty"});
	this.setState({venueobj:data});
	document.addEventListener('click', this.handleOutsideClick, false);
	// return false;

}
receiveAmenities=(data)=>{
	document.removeEventListener('click', this.handleOutsideClick, false);
	console.log('receiveAmenities',data);
	var amenobjArray=this.state.amenobjArray;
	var findIndex=amenobjArray.findIndex((obj)=>obj.amenities_id==data.amenities_id);
	if(findIndex==-1){
		amenobjArray.push(data);
	}
	if(amenobjArray.length>0){
		// var text=amenobjArray.map((obj)=>obj.amenities_name).join(',');
		var amentiesValue=this.state.amentiesValue;
		amentiesValue.dropdown=amenobjArray;
		this.setState({amentiesValue});
	}
	// console.log(amenobjArray);
	this.setState({amenvisible:"empty"});
	document.addEventListener('click', this.handleOutsideClick, false);
	// this.setState({amen_obj:data});

}
removeItems=(data,key)=>{
	document.removeEventListener('click', this.handleOutsideClick, false);
	console.log('removeItems',data)
	var amenobjArray=this.state.amenobjArray;
	var findIndex=amenobjArray.findIndex((obj)=>obj.amenities_id==data.amenities_id);
	if(findIndex!=-1){
		amenobjArray.splice(findIndex,1)
	}
	var amentiesValue=this.state.amentiesValue;
	amentiesValue.dropdown=amenobjArray;
	this.setState({amentiesValue});
	document.addEventListener('click', this.handleOutsideClick, false);

}
onChangeText=(value,key)=>{
	this.setState({[key]:value})
}
changeVenueData=(data)=>{
	var venueobj=this.state.venueobj;
	if(!venueobj){
		venueobj={};
	}
	venueobj.venue_cat_name=data;
	venueobj.venue_cat_id=data;
	this.setState({venueobj})
}
handleOutsideClick=(e)=> {

		if(e.target){
		if (this.nodesearch.contains(e.target)) {
			return;
		}
	}
// alert("clicks outside");
this.props.cancelsearch();
		// this.handleClick();
	}
	changeNearby=(data)=>{
		var self=this;
		console.log('datanearby',data);
		if(data==true){

		 navigator.geolocation.getCurrentPosition(position => {
		 	// console.log(position);
		 	var searchobj=this.state.searchobj;
		 	searchobj.nearme=true;

		 	searchobj.lat=position.coords.latitude;
		 	searchobj.long=position.coords.longitude;
		 	this.setState({searchobj});
		 	this.setState({nearme:true})
		 },function(err){
		 	// console.log(err)
		 	// alert("")
		 		notification.error({
    message:'Error Message',
    description:"Browser Denied Location Near Me will Not Work",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
		 	self.setState({nearme:false})
		 })
		}else{
		 	this.setState({nearme:false})

				var searchobj=this.state.searchobj;
		 	searchobj.nearme=false;
		 	this.setState({searchobj});
		}
	}
render() {
	const { startValue, endValue, endOpen } = this.state;
	return (
		<div  ref={nodesearch => { this.nodesearch = nodesearch; }}>
		<div className="main-div-search">

		<div>
		<label className="search-venue-color">search your venue</label>
		</div>

		<div className="search-venue-input">
		<Popupbox loading={this.state.venueloading} removeItems={(data)=>this.removeItems(data,'amentiesValue')}  visible={this.state.visible} sendPopupData={(data)=>this.receiveVenue(data)} changepopupText={(data,position)=>this.searchDropdown(data,position)} dropdown={this.state.venuedrop} inputvalue={this.state.venueobj&&this.state.venueobj.venue_cat_name}  input={true} buttonTextColor={"black"} width={"90%"}/>
		<img src={search} alt="search" />

		</div>

		<div className="search-main-flex padding-top">

		<div className="search-box-flex">					
		<input type="checkbox" checked={this.state.nearme} onClick={(e)=>this.changeNearby(e.target.checked)} className="search-checkbox"/>
		<label className="search-box-label">Near Me</label>
		</div>

		<div className="search-box-flex search-label-right">					
		{/*<label className="search-box-label-2">Advanced Search</label>*/}
		</div>

		</div>


		<div>
		<div className="search-venue-input-4 padding-top">	
		<label className="label-width">Where</label>			
		<input type="text" value={this.state.where} onChange={(e)=>{this.onChangeText(e.target.value,'where')}}/>
		<img src={search} alt="search" />
		</div>

		<div className="search-venue-input-4 padding-top searchvenueDatepicker">	
		<label className="label-width">From</label>			
		<DatePicker
		disabledDate={this.disabledStartDate}
		format="YYYY-MM-DD"
		value={startValue}
		placeholder="Start"
		onChange={this.onStartChange}
		onOpenChange={this.handleStartOpenChange}
		/>
		</div>

		<div className="search-venue-input-3 padding-top searchvenueDatepicker">
		<label className="label-width">To</label>				
		<DatePicker
		disabledDate={this.disabledEndDate}
		format="YYYY-MM-DD"
		value={endValue}
		placeholder="End"
		onChange={this.onEndChange}
		open={endOpen}
		onOpenChange={this.handleEndOpenChange}
		/>
		</div>

		<div className="search-venue-input-3 padding-top">
		<label className="label-width">Price Range</label>				
		<input type="number" value={this.state.price} onChange={(e)=>{this.onChangeText(e.target.value,'price')}}/>
		</div>

		<div className="search-venue-input-4 padding-top searchvenueflexsearch">	
		<label className="label-width">Amenities</label>	
		<div className="search-venue-amenities">		
		<Popupbox loading={this.state.amentiesloading} removeItems={(data)=>this.removeItems(data,'amentiesValue')} multipleitems={this.state.amentiesValue} visible={this.state.amenvisible} sendPopupData={(data)=>this.receiveAmenities(data)} changepopupText={(data,position)=>this.receivePopupAmentiesData(data,position)} dropdown={this.state.amenitiesDrop}  input={true} buttonTextColor={"black"} width={"90%"}/>
		<img src={search} alt="search" />
		</div>
		</div>

		<div className="search-venue-input-3 padding-top">
		<label className="label-width">Capacity</label>				
		<input type="number"/>
		</div>

		<div className="search-main-flex padding-top-more">

		<div className="search-left">
		<button  className="search-venue-cancel-btn" onClick={()=>this.props.cancelsearch&&this.props.cancelsearch()}>Cancel</button>
		</div>

		<div className="search-right">
		<button  disabled={(!this.state.venueobj)||(this.state.venueobj&&this.state.venueobj.venue_cat_name=="")} onClick={()=>this.searchVenueForm()} className={`search-venue-cancel-btn ${((!this.state.venueobj)||(this.state.venueobj&&this.state.venueobj.venue_cat_name==""))?'disabledbutton':''}`}>Search</button>
		</div>

		</div>


		</div>










		</div>
		</div>
		);
}

componentDidMount(){
	navigator.geolocation.getCurrentPosition(position => {
		this.setState({chosenlocation:position.coords})
	})
	// console.log(this.nodesearch)
	setTimeout(()=>{
	document.addEventListener('click', this.handleOutsideClick, false);
	},500)
}
componentWillUnmount(){
// alert("false");
	document.removeEventListener('click', this.handleOutsideClick, false);
}
}
