	import React from 'react';
import Specific from '../../components/specific-venue/specific-venue';
import Form1 from '../../components/form1/form1';
import Bindname from '../bindname/bindname';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import VenueCategory from '../VenueCategory/VenueCategory';
import SpecificVenue from '../SpecificVenue/SpecificVenue';
import MobSpecDetailsForm from '../../pages/MobSpecDetailsForm/MobSpecDetailsForm';
import Amenities from '../Amenities/Amenities';
import Availability from '../availability1/availability';
import UploadPhotos from '../uploadphotos/uploadphotos';
import TagForm from '../TagForm/TagForm';
import Price from '../price/price';
import Review from '../review/review';
import Img1 from '../../images/b3.png';
import CalendarSVG from '../../icon/venue-availability+price/CalendarSVG';
import DailySVG from '../../icon/venue-availability+price/DailySVG';
import HourlySVG from '../../icon/venue-availability+price/HourlySVG';
import WeeklySVG from '../../icon/venue-availability+price/WeeklySVG';
import moment from 'moment';
import IndividualSuccessModel from '../IndividualSuccessModel/IndividualSuccessModel';
import dateFormat from 'dateformat';
import DateFunctions from '../../helpers/DateFunctions';
import {notification,Progress} from 'antd';
import ReactDOM from 'react-dom';
import LoadAPIPost from '../../helpers/xhrapi';


import './IndividualForm.css'; 

// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';
const listingjson=require('../../FormJSON/venueListing.json');
const errorStatus=[
{key:'venuecategory',message:"Please Select the venue category",status:false},
{key:'specificvenue',message:"Please Select the specific venue and details",status:false},
{key:'amenities',message:"Please Select the amenities and details",status:false},
{key:'availability',message:"Please Select the availability and details",status:false},
{key:'pricecard',message:"Please Select the price and details",status:false},
{key:'Purpose',message:"Please Select the Actions & Purpose",status:false},
];
var formData=new FormData();
const dayText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const commonArray=[{
			"spec_det_id":'idname',
			"venue_spec_id":1,
			"spec_det_name":"Venue Name",
			"spec_det_sortorder":0,
			"spec_det_datatype1":"text",
			"spec_det_datavalue1":"",
			"spec_det_datatype2":"",
			"spec_det_datavalue2":"",
			"spec_det_datatype3":"",
			"spec_det_datavalue3":"",
			validation:[{name:'required'}],
			error:null,
			errormsg:''
		},{
			"spec_det_id":'idname2',
			"venue_spec_id":1,
			"spec_det_name":"Venue Address",
			"spec_det_sortorder":0,
			"spec_det_datatype1":"textarea",
			"spec_det_datavalue1":"",
			"spec_det_datatype2":"",
			"spec_det_datavalue2":"",
			"spec_det_datatype3":"",
			"spec_det_datavalue3":"",
			validation:[{name:'required'}],
			error:null,
			errormsg:''
		},{
			"spec_det_id":'idname3',
			"venue_spec_id":1,
			"spec_det_name":"Venue Landmark",
			"spec_det_sortorder":0,
			"spec_det_datatype1":"btn_address",
			"spec_det_datavalue1":"",
			"spec_det_datatype2":"",
			"spec_det_datavalue2":"",
			"spec_det_datatype3":"",
			"spec_det_datavalue3":"",
			validation:[{name:'required'}],
			error:null,
			errormsg:''
		},{
			"spec_det_id":'idname4',
			"venue_spec_id":1,
			"spec_det_name":"Venue Description",
			"spec_det_sortorder":0,
			"spec_det_datatype1":"textarea",
			"spec_det_datavalue1":"",
			"spec_det_datatype2":"",
			"spec_det_datavalue2":"",
			"spec_det_datatype3":"",
			"spec_det_datavalue3":"",
			validation:[{name:'required'}],
			error:null,
			errormsg:''
		}];

	var currencyArray=[{id:1,name:'USD'},{id:2,name:'INR'},{id:3,name:'MYI'}];
const HourlyWeekArray=[{'icon':<HourlySVG/>,'name':'Hourly','title':'Hour',id:1},{'icon':<DailySVG/>,'name':'Daily','title':'Day',id:2},{'icon':<WeeklySVG/>,'name':'Weekly','title':'Week',id:3},{'icon':<CalendarSVG/>,'name':'Monthly','title':'Month',id:4}];
function consume(stream, total = 0) {

  while (stream.state === "readable") {
    var data = stream.read()
  	console.log('stream',data.byteLength);
    total += data.byteLength;
    console.log("received " + data.byteLength + " bytes (" + total + " bytes in total).")
  }
  if (stream.state === "waiting") {
    stream.ready.then(() => consume(stream, total))
  }
  return stream.closed
}
export default class IndividualForm extends React.Component {

	constructor(props) {
		super(props);
		console.log('mainprops',props);
		this.state = {venue_id:null,purposeData:null,successmodal:false,fileList:null,imageData:null,tagsDetails:null,availobj:null,priceobj:null,activeid:1,"venue_cat_id":null,"veneu_spec_id":null,categoryName:'',commonArray:null,amentiesactiveobj:null,amenitiesArray:null,listingjson:listingjson,finalError:errorStatus,percent:0};
	}
	generateError=(text)=>{
		     notification.warning({
    message:'Error Message',
    description:text,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
	}
	changeActive=(data,action)=>{
		if(action=='next'){
			if(data==2 && !this.state.venue_cat_id){
					this.generateError("please choose venue Category")
					return;
			}else if(data==3 && !this.state.veneu_spec_id){
					this.generateError("please choose venue Specifications");
					return;
			}else if(data==4 && !this.state.amenitiesArray){
				this.generateError("please choose venue Ameneties");
					return;
			}else if(data==5 && !this.state.availobj){
				this.generateError("please choose venue Availability");
					return;
			}else if(data==6 && !this.state.purposeData){
				this.generateError("please choose venue Purpose");
					return;
			}else if(data==7 && (!this.state.priceobj&&(this.state.listingjson.venue.venue_type!=2 && this.state.listingjson.venue.venue_type!=3))){
				this.generateError("please choose venue Price ");
					return;
			}
		}
		this.setState({activeid:data})
	}

	checkValidationError=(data,state,fromdate,price)=>{
// alert(JSON.stringify(data))
		var finalError=this.state.finalError;
		for(var i in finalError){
			if(finalError[i].key==data){
				if(fromdate){
				// 	if(fromdate.fromdate==''|| fromdate.todate==''){
				// finalError[i].status=false;
				// 	}else{

				// 	}
				finalError[i].status=true;
				}else if(price){
					if(price==0){
						finalError[i].status=false;
					}else{
				finalError[i].status=true;

					}
				}else{

				finalError[i].status=state;
				}
			}
		}
		this.setState({finalError});
		console.log(this.state)
	}
	autosaveData=(data,upload)=>{
	// 	fetch(Apilink.apiurl+'edit_venue_autosave/', {
 //            method:'POST',

 //            body:data,
 //        })
	// .then((response)=>response.json())
	// .then((respjson)=>{
	// 	// console.log(responsejson);
	// 		var listingjson=this.state.listingjson;
	// 		if(respjson.status==0){
	// 			if(respjson.venueId){
	// 				listingjson.venue.venue_id=respjson.venueId
	// 				this.setState({listingjson});
	// 				formData.set('venue',JSON.stringify(listingjson.venue));
	// 			}
	// 		}
	// })
	var self=this;
		LoadAPIPost.LoadApi(data,Apilink.apiurl+"edit_venue_autosave",upload,function(err,data){
		if(err){
			console.log("error",err);
		}else{
			var respjson=JSON.parse(data);
			var listingjson=self.state.listingjson;
			if(respjson.status==0){
				if(respjson.venueId){
					// alert(respjson.respjson);
				// console.log("responsesuccess",respjson.venueId);
					listingjson.venue.venue_id=respjson.venueId
					self.setState({listingjson});
					formData.set('venue',JSON.stringify(listingjson.venue));
				}
			}

		}
		})
	}
	changeDynamic=(data,key,name,key1,move)=>{
	
		this.setState({[key]:data})
		if(name){
			this.setState({[key1]:name})
		}
		if(key=='venue_cat_id'){
			var listingjson=this.state.listingjson;
			listingjson.venue.venue_cat_id=data;
			listingjson.venue.venue_id=listingjson.venue.venue_id?listingjson.venue.venue_id:'';
			this.setState({listingjson})
			this.setState({veneu_spec_id:null});
		}
		if(key=='veneu_spec_id'){
			var listingjson=this.state.listingjson;
			listingjson.keytoupdate=["VENUE_DET"];//autosave
			listingjson.venue.lastActivityTab=2;
			if(listingjson.venue.venue_spec_id!=data.venue_spec_id){
			listingjson.keytoupdate=["VENUE_DET","CLR_AMNS"];
			listingjson.ameneties=[];
			this.setState({amenitiesArray:null,amentiesactiveobj:null})
			}
			listingjson.venue.venue_spec_id=data.venue_spec_id;
			listingjson.specific=data.specDetails;
			formData.set('venue',JSON.stringify(listingjson.venue));
			formData.set('specific',JSON.stringify(listingjson.specific));
			formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
			if(this.state.edit==false){
			this.autosaveData(formData);
			}
			this.setState({listingjson});
		}
		if(key=='commonArray'){
			var listingjson=this.state.listingjson;
			listingjson.venue.venue_name=data[0].spec_det_datavalue1;
			listingjson.venue.venue_address=data[1].spec_det_datavalue1;
			listingjson.venue.venue_landmark=data[2].spec_det_datavalue1;
			listingjson.venue.venue_location=data[1].spec_det_datavalue2;
			listingjson.venue.venue_desc=data[3].spec_det_datavalue1;
			this.setState({listingjson});
		}
		if(key=="amenitiesArray"){
			var listingjson=this.state.listingjson;
			var amentiesArray=[];
			var getlist=data.map((obj)=>{
				if(obj.amenetiesList && obj.amenetiesList.length>0){
					amentiesArray=amentiesArray.concat(obj.amenetiesList);
				}
			});
			var listingjson=this.state.listingjson;
			listingjson.ameneties=amentiesArray;
			listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS'];
			listingjson.venue.lastActivityTab=3;
			formData.set('venue',JSON.stringify(listingjson.venue));
			formData.set('ameneties',JSON.stringify(listingjson.ameneties));
			formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
			if(this.state.edit==false){
			this.autosaveData(formData);
		}
			this.setState({listingjson});

		}
		if(move){
			this.setState({activeid:move})
		}
	}
	receiveAvailability=(data,calling)=>{
		console.log(data);

		// alert(calling);
		// console.log("availData",data);
		// {"slot_type":0,"slot_type_uniq_id":"","slot_name":"","slot":[{"startTime":"","endTime":""}]}
			 var LoginData=JSON.parse(localStorage.getItem('LoginData'));

		this.setState({availobj:data});
		var listingjson=this.state.listingjson;
		listingjson.availability.venue_avail_frm=dateFormat(data.businessform.fromDate,'yyyy-mm-dd')+" "+dateFormat(data.businessform.fromTime,'HH:MM:00');
		listingjson.availability.venue_avail_to=dateFormat(data.businessform.toDate,'yyyy-mm-dd')+" "+dateFormat(data.businessform.toTime,'HH:MM:00');
		listingjson.availability.venue_min_count=data.businessform.min?data.businessform.min:0;
		listingjson.availability.venue_max_count=data.businessform.max?data.businessform.max:0;
		listingjson.availability.venue_exclude_days=data.businessform.excludesDays.length>0?data.businessform.excludesDays.map((obj)=>obj.value).join(','):'';
		listingjson.venue.venue_type=data.businessform.slot_type;
		// listingjson.availability.venue_avail_to=data.todate;
		listingjson.availability.venue_avail_type=data.availType?data.availType.join(','):'';
		listingjson.availability.venue_days=data&&data.hourobj&&data.hourobj.id;
		// listingjson.venue.venue_avilability_id=data.activeobj.id;
		listingjson.availability.venue_moredetails=data.moreDetails;
		if(data.businessform.slot_type==3){
		var seatListArray=data.businessform.seatList.filter((obj)=>obj.add!='true');
		listingjson.seatDetails=seatListArray.length>0?seatListArray.map((obj)=>{return {seatName:obj.seatname,seatQuantity:obj.counter,seatPricing:obj.pricing?obj.pricing:[],uniqueId:obj.uniqueId,priceType:obj.priceType?obj.priceType:''}}):[];
		// data.busin
		var checkseatListArrayHavingAdd=data.businessform.seatList.filter((obj)=>obj.add=='true');
		if(checkseatListArrayHavingAdd.length==0){
			var data1=data;
			var seatListArrayAdd=data1.businessform.seatList.concat([{seatname:'',counter:0,add:'true'}])
			data1.businessform.seatList=seatListArrayAdd;
			this.setState({availobj:data1});
		}

	}else{
		listingjson.seatDetails=[];
	}
		
		if(data.slotType==1){
			var obj={"slot_type":data.slotType,"slot_type_uniq_id":new Date().getTime(),"slot_name":"","slot":[{"startTime":dateFormat(data.businessform.fromTime,'HH:MM:00'),"endTime":dateFormat(data.businessform.toTime,'HH:MM:00')}]}
			listingjson.hourlyAvailability=[obj];
		}else{
			var splitArray=[];
			data.SplitSlots.map((objData,i)=>{
				var obj={"slot_type":data.slotType,"slot_type_uniq_id":data.SplitSlots[i].id,"slot_name":data.SplitSlots[i].labelName,"slot":[]};
				objData.hourSlots.map((slotobj,j)=>{
					obj.slot.push({"startTime":dateFormat(slotobj.dateobj.fromTime,'HH:MM:00'),"endTime":dateFormat(slotobj.dateobj.toTime,'HH:MM:00')})
				})
				splitArray.push(obj);
			})
			// alert(JSON.stringify(data.SplitSlots))
			listingjson.hourlyAvailability=splitArray;
		}

		if(data.businessform.slot_type==2){
			// alert(JSON.stringify(data.businessform.paxList));
			var paxListing=data.businessform.paxList;
			var objListing=paxListing.map((data)=>{
				// data.paxDesc=data.details;
				var objData={"paxName":data.paxName,"paxMin":data.paxMin,"paxMax":data.paxMax,'paxDesc':data.details,paxPricing:[],uniqueId:data.uniqueId};
				objData.paxPricing=data.pricing.map((obj)=>{
					return obj.dataObj;
				})
				return objData;
			});
			// alert(JSON.stringify(objListing));
			listingjson.packsDetails=objListing;
			listingjson.hourlyAvailability=[];
			// alert(JSON.stringify(objListing));
			// return;
		}else{
			listingjson.packsDetails=[];
			// listingjson.hourlyAvailability=[];
		}
			listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS','VENUE_AVAIL'];
			listingjson.venue.lastActivityTab=4;
			formData.set('hourlyAvailability',JSON.stringify(listingjson.hourlyAvailability));
			formData.set('venue',JSON.stringify(listingjson.venue));
			formData.set('availability',JSON.stringify(listingjson.availability));
			formData.set('packsDetails',JSON.stringify(listingjson.packsDetails));
			formData.set('seatDetails',JSON.stringify(listingjson.seatDetails));
			formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
			if(this.state.edit==false && !calling){
				// alert('coming inside to save again')
			this.autosaveData(formData);
		}
		this.setState({listingjson});
		// if(window.innerWidth>767){
		this.setState({activeid:5})
	// }
	}
	priceDataRecive=(data,calling)=>{
		// alert('');
		// alert(JSON.stringify(data));
		if(this.state.listingjson.venue.venue_type=='2'){
			data.activeobj.title="Pax";
		}
		this.setState({'priceobj':data});
		var listingjson=this.state.listingjson;
		if(data.venueType!=2 && data.venueType!=3){
		listingjson.pricedetails=data;
		listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS','VENUE_AVAIL','VENUE_TAG','VENUE_PRICE'];
		listingjson.venue.lastActivityTab=6;
			formData.set('venue',JSON.stringify(listingjson.venue));
		formData.set('pricedetails',JSON.stringify(listingjson.pricedetails));
			formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
			
	}else if(data.venueType==3){
		var availobj=this.state.availobj;
		data.seatList.map((obj)=>{var newobj=obj;
			obj.priceType=data.activePrice;
			return obj;
		})
		availobj.businessform.seatList=data.seatList;
		if(availobj.businessform.seatList.length>0){
			var seatDetails=data.seatList.length>0?data.seatList.map((obj)=>{return {seatName:obj.seatname,seatQuantity:obj.counter,seatPricing:obj.pricing,priceType:data.activePrice,uniqueId:obj.uniqueId}}):[];
			listingjson.seatDetails=seatDetails;
			listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS','VENUE_AVAIL','VENUE_TAG'];
			formData.set('seatDetails',JSON.stringify(listingjson.seatDetails))
		}else{

			formData.set('seatDetails',JSON.stringify([]))
		}
		formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
		this.setState({availobj});
		
	}
	if(this.state.edit==false&&!calling){

			this.autosaveData(formData);
		}
		this.setState({listingjson});
		// if(window.innerWidth>767){
		this.setState({activeid:7});
		// }
	}
	reciveTagDetails=(data,formData,activeID)=>{
		console.log("tagformdata",formData);
		var listingjson=this.state.listingjson;
		listingjson.tagdetails=formData;
		this.setState({listingjson});
		this.setState({tagsDetails:data})
		if(window.innerWidth>767){
		this.setState({activeid:activeID?activeID:6})
		}
	}
	successClose=(data)=>{
			this.setState({successmodal:data})
			this.props.homeClick&&this.props.homeClick();
			this.props.history.replace('/');

	}
	sendPurposes=(data,data1,purposelength,calling)=>{
		console.log(data);
		console.log(data1);
		var purposeData=this.state.purposeData;
		if(!purposeData){
			purposeData={}
		}
		purposeData.purposes=data;
		var listingjson=this.state.listingjson;
		listingjson.purpose=data.length>0?data.map((obj)=>{return {venue_act_id:obj.id,purposedetails:obj.value.join(',')}}):[];
		listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS','VENUE_AVAIL','VENUE_TAG'];
			listingjson.venue.lastActivityTab=5;
			formData.set('venue',JSON.stringify(listingjson.venue));
			formData.set('purpose',JSON.stringify(listingjson.purpose));
			formData.set('tagdetails',JSON.stringify(listingjson.tagdetails));
			formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
			if(this.state.edit==false && !calling){

			this.autosaveData(formData);
		}
		purposeData.purposeDropdown=data1;
		this.setState({purposeData});
		// if(pur)

		// if(window.innerWidth>767){
		// }else{

		// }
		console.log(purposelength);
		var finalError=this.state.finalError;
		if(purposelength==0){
			finalError[5].status=false;
		}else{

			finalError[5].status=true;
		}
		this.setState({finalError});
	}
	changeImageUpload=(fileList,imageData,calling)=>{
		console.log('filelsit',fileList)
		console.log('filelsit1',imageData)
var listingjson=this.state.listingjson;
		if(imageData.length==0){
		formData.set('formArray',null);
		listingjson.existImages=[];
}
if(this.state.fileList&&this.state.fileList.length>0){
	listingjson.existImages=fileList.map((obj)=>{return {name:obj.name}});
}else{
listingjson.existImages=[];	
}
for(var j=0;j<listingjson.existImages.length;j++){
// var findindex=imageData.findIndex((obj)=>obj.name==listingjson.existImages[j].name);
// if(findindex!=-1){
// 	imageData.splice(findindex,1);
// }
}

		this.setState({fileList:fileList,imageData:imageData})
		formData.set('formArray',null);
	for(var i in imageData&&imageData.length>0&&imageData.filter((obj)=>!obj.exist)){
		// debugger;
		formData.append('formArray',imageData[i]);
	}
		listingjson.venue.lastActivityTab=7;
		listingjson.keytoupdate=["VENUE_DET",'VENUE_AMNS','VENUE_AVAIL','VENUE_TAG','VENUE_IMAGE'];
		formData.set('keytoupdate',JSON.stringify(listingjson.keytoupdate));
		formData.set('venue',JSON.stringify(listingjson.venue));
		formData.set('existImages',JSON.stringify(listingjson.existImages));
			if(this.state.edit==false && !calling){
		      this.autosaveData(formData,'uploadData');
			}
		// alert(JSON.stringify(listingjson.keystoupdate));
		if(window.innerWidth>767){
			this.setState({activeid:8});
		}
	}
	componentWillMount(){
			var listingjson=this.state.listingjson;
     if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){

			 var LoginData=JSON.parse(localStorage.getItem('LoginData'));
			listingjson.venue.user_id=LoginData.user_id;
			this.setState({listingjson});
		}
	}
	render() {
		// console.log(this.state);
		return (
			<div className="individiualFormDiv">
			<Paginationview activeid={this.state.activeid} numberofDots={8} changeActive={(data)=>this.changeActive(data)}/>
		
			{this.state.activeid==1&&
				<VenueCategory categoryId={this.state.venue_cat_id} venueCategoryCallback={(data,name)=>this.changeDynamic(data,'venue_cat_id',name,'categoryName',2)} changeActive={(data,action)=>{this.changeActive(data,action)}} checkValidationError={this.checkValidationError}/>
			}
			{this.state.activeid==2&&
				<SpecificVenue commonArray={this.state.commonArray} sendCommonDetails={(data)=>this.changeDynamic(data,'commonArray',null,null,3)} specificId={this.state.veneu_spec_id} categoryname={this.state.categoryName} venuespecCallback={(data,mob)=>this.changeDynamic(data,'veneu_spec_id',null,null,mob?2.5:3)} venueCatId={this.state.venue_cat_id} changeActive={(data,action)=>{this.changeActive(data,action)}} checkValidationError={this.checkValidationError}/>	
				
			}
			{this.state.activeid==2.5&&
				<MobSpecDetailsForm checkValidationError={this.checkValidationError} commonArray={this.state.commonArray}  venuespecCallback={(data,mob)=>this.changeDynamic(data,'veneu_spec_id',null,null)} sendCommonDetails={(data)=>this.changeDynamic(data,'commonArray',null,null)} categoryname={this.state.categoryName} venueSpecDetails={this.state.veneu_spec_id} changeActive={(data,action)=>{this.changeActive(data,action)}}  />
			}
			{this.state.activeid==3&&
				<Amenities AmentiesArrayprop={this.state.amenitiesArray} AmenetiesArray={(data)=>this.changeDynamic(data,'amenitiesArray')} activeobj={this.state.amentiesactiveobj} categoryname={this.state.categoryName} venuespecCallback={(data)=>this.changeDynamic(data,'amentiesactiveobj')} venueSpecId={this.state.veneu_spec_id&&this.state.veneu_spec_id.venue_spec_id} changeActive={(data,action)=>{this.changeActive(data,action)}}  checkValidationError={this.checkValidationError}/>
			}{this.state.activeid==4&&
				<Availability  availobj={this.state.availobj} sendAvailabiltyProp={(data)=>this.receiveAvailability(data)} changeActive={(data,action)=>{this.changeActive(data,action)}}  checkValidationError={this.checkValidationError}/>
			}
			{this.state.activeid==5&&
				<TagForm purposeDatas={this.state.purposeData} sendpurposes={this.sendPurposes} sendtagsdetails={this.reciveTagDetails} tagsDetails={this.state.tagsDetails} changeActive={(data,action)=>{this.changeActive(data,action)}} />
			}{this.state.activeid==6&&
				<Price availTypeList={this.state.availobj&&this.state.availobj.availType} seatList={this.state.availobj&&this.state.availobj.businessform.seatList} venueType={this.state.listingjson.venue.venue_type} priceData={this.state.priceobj} sendPriceData={(data)=>this.priceDataRecive(data)} changeActive={(data,action)=>{this.changeActive(data,action)}}  checkValidationError={this.checkValidationError}/>
			}{this.state.activeid==7&&
				<UploadPhotos uploadImageCallback={(fileList,imageData)=>{this.changeImageUpload(fileList,imageData)}}  fileListData={this.state.fileList} imageData={this.state.imageData} changeActive={(data,action)=>{this.changeActive(data,action)}} />
			}{this.state.activeid==8&&
				<Review dummyVenueId={this.state.listingjson.venue.venue_id} sendFormData={formData} reviewedModal={()=>{this.props.homeClick&&this.props.homeClick();this.props.history.replace('/');}} latlng={this.props.latlng} requestLocation={()=>this.props.requestLocation()} changeActive={(data,action)=>{this.changeActive(data,action)}}  viewDetails={this.state}  finalError={this.state.finalError} successmodal={()=>{this.setState({successmodal:true})}}/>
			}
			{this.state.successmodal==true &&
				<IndividualSuccessModel  routeprops={this.props} visible={this.state.successmodal} fromDate={this.state.listingjson.availability.venue_avail_frm} venueName={this.state.listingjson.venue.venue_name} successClose={this.successClose} userName={this.props.userName} CorporateClick={()=>{this.props.CorporateClick()}}/>
			}
			</div>
			);
	}
	componentDidMount(){
		if(this.props.receiveProps){
			this.props.receiveProps(this.props)
		}
		

		
		var scrollHeight=document.querySelector('.individiualFormDiv').offsetTop-100;
		// alert(scrollHeight);
		
		window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
		if(this.props.location.state!=undefined){
			
			 var LoginData=JSON.parse(localStorage.getItem('LoginData'));

			var editingData=this.props.location.state.editVenueData;
			console.log('editingData',editingData);
			//binding venue category
			var listingjson=this.state.listingjson;
			listingjson.venue.venue_type=editingData.trn_venue_type;
			if(editingData.autoSave){
			this.setState({edit:false});
			listingjson.venue.venue_id=editingData.venue_autosave_venue_id;
			this.setState({listingjson,venue_id:editingData.venue_autosave_venue_id});
		}else{
			this.setState({edit:true});
			listingjson.venue.venue_id=editingData.venue_id;
			this.setState({listingjson,venue_id:editingData.venue_id})
		}

			this.changeDynamic(editingData.trn_venue_cat_id,'venue_cat_id',editingData.venue_cat_name,'categoryName',1);

			//binding specific id
			var obj={venue_spec_id:editingData.venue_spec_id,specDetails:editingData.specdetails,venue_spec_name:editingData.venue_spec_name}
			var finalError=this.state.finalError;
			finalError[0].status=true;
			finalError[1].status=true;
			this.changeDynamic(obj,'veneu_spec_id',null,null,1)
			//binding commonArray for specifications;
			var commonData=JSON.parse(JSON.stringify(commonArray));
			commonData[0].spec_det_datavalue1=editingData.trn_venue_name;
			commonData[1].spec_det_datavalue1=editingData.trn_venue_address;
			commonData[1].spec_det_datavalue2=editingData.trn_venue_location;
			commonData[2].spec_det_datavalue1=editingData.trn_venue_landmark;
			commonData[3].spec_det_datavalue1=editingData.trn_venue_desc;
			this.changeDynamic(commonData,'commonArray',null,null,1);
			//binding venue photos
			// alert(JSON.stringify(editingData.photos));
			var myphotos=editingData.photos?editingData.photos.map((obj)=>{return {uid:obj.venut_photo_id?obj.venut_photo_id:(obj.venut_photo_approval_id?obj.venut_photo_approval_id:obj.venut_photo_autosave_id),name:obj.venue_image_path.split('/')[obj.venue_image_path.split('/').length-1],status:'done',url:obj.venue_image_path,exist:true}}):[];
			this.setState({fileList:myphotos},function(){
			this.changeImageUpload(myphotos,[],'dontcall');
			})
			//binding price Data
			if(editingData.price.length>0){
				if(editingData.trn_venue_type==3 || editingData.trn_venue_type==2){
					// alert(JSON.stringify(editingData.price));
					finalError[4].status=true;
				}else{	
				// var Priceobj=currencyArray.filter((obj)=>obj.name==editingData.price[0].trn_venue_price_currency);
				// var activeobj=HourlyWeekArray.filter((obj)=>obj.id==editingData.price[0].trn_venue_price_type);
				// var amount=editingData.price[0].trn_venue_price_amt;
				// var priceData={priceobj:Priceobj[0],activeobj:activeobj[0],amt:amount};
				var objpriceData=editingData.price[0];
				objpriceData.venue_price_currency=objpriceData.trn_venue_price_currency;
				objpriceData.venue_price_type=objpriceData.trn_venue_price_type;
				this.priceDataRecive(objpriceData,'stopcalling');
					finalError[4].status=true;

				}
			finalError[4].status=true;
		}
			// alert(editingData.availability.length);
			//binding Availability Data
			if(editingData.availability.length>0){
			var avail_active_obj=editingData.availability[0].trn_availability_type.split(',');
			var avail_fromdate=editingData.availability[0].trn_venue_avail_frm;
			var avail_todate=editingData.availability[0].trn_venue_avail_to;
			var avail_startDate=new Date(editingData.availability[0].trn_venue_avail_frm);
			var avail_endDate=new Date(editingData.availability[0].trn_venue_avail_to);
			var avail_moreDetails=editingData.availability[0].trn_venue_moredetails;
			var trn_venue_min_count=editingData.availability[0].trn_venue_min_count;
			var trn_venue_max_count=editingData.availability[0].trn_venue_max_count;
			var excludeDays=editingData.availability[0].trn_venue_exclude_days;
			var hourlyData=editingData.availability[0].hourlyData;
			var seatorprice=[];

			if(editingData.trn_venue_type==3){
			var seatData=editingData.price.length>0?editingData.price:[];
			// if(editingData.price)
			if(seatData.length>0){
				// alert(JSON.stringify(seatData));
				var seatorprice=[{seatname:'',counter:0,add:'true'}].concat(editingData.price.map((obj)=>{return {seatname:obj.seat_name,counter:obj.seat_qty,uniqueId:(obj.seat_unique_id==undefined || obj.seat_unique_id=='undefined'||!obj.seat_unique_id || obj.seat_unique_id==0)?(DateFunctions.generate_uid_timestamp()+LoginData.user_id):obj.seat_unique_id,pricing:obj.priceDetails.length>0?obj.priceDetails.map((seatobj)=>{
					var seatobj=seatobj;
					seatobj.hourCost=seatobj.hour_cost;
					seatobj.dayCost=seatobj.day_cost;
					seatobj.weekCost=seatobj.week_cost;
					seatobj.monthCost=seatobj.month_cost;
					return seatobj;
				}):[],priceType:obj.trn_venue_price_type}}));
				finalError[4].status=true;
			}

			}
			var paxListing=[];
		if(editingData.trn_venue_type==2){
			paxListing=editingData.price.map((data)=>{
				var objData={paxName:data.venue_pax_name,paxMin:data.pax_min,paxMax:data.pax_max,details:data.venue_pax_desc,pricing:[],uniqueId:(!data.pax_unique_id||data.pax_unique_id==undefined|| data.pax_unique_id==0 ||data.pax_unique_id=='undefined')?(DateFunctions.generate_uid_timestamp()+LoginData.user_id):data.pax_unique_id}
				objData.pricing=data.priceDetails.map((obj)=>{
					var objPrice=obj;
					var objpriceDetails={currency:objPrice.currency,dayType:objPrice.day_type,adult:objPrice.Adult,child:objPrice.Child,code:objPrice.day_type_code}
					objPrice.dataObj=objpriceDetails;
					return objPrice;
				})
				return objData;
			})
			// alert(JSON.stringify(editingData.price));
		}
			var receiveExcludeDays=excludeDays?excludeDays.split(',').map((obj)=>{return {value:obj,checked:true,label:dayText[parseInt(obj)]}}):[];
			var businessform={excludesDays:receiveExcludeDays,fromDate:avail_startDate,fromTime:dateFormat(new Date(),'yyyy-mm-dd')+"T"+dateFormat(new Date(avail_startDate),'HH:MM:00'),toDate:avail_endDate,toTime:dateFormat(new Date(),'yyyy-mm-dd')+"T"+dateFormat(new Date(avail_endDate),'HH:MM:00'),min:trn_venue_min_count,max:trn_venue_max_count,slot_type:editingData.trn_venue_type?editingData.trn_venue_type:1,seatList:seatorprice,paxList:paxListing};
			var SplitSlots=[];
			var selectedSlots=[];
			var availablefromConversion=dateFormat(new Date(),'yyyy-mm-dd')+"T"+dateFormat(new Date(avail_startDate),'HH:MM:00')
			var availabletoConversion=dateFormat(new Date(),'yyyy-mm-dd')+"T"+dateFormat(new Date(avail_endDate),'HH:MM:00')
			var getHours=DateFunctions.getHoursInterval(new Date(availablefromConversion),new Date(availabletoConversion),60);
			// console.log('getHours',getHours);
			var venue_slot_type=1;
			hourlyData.length>0&&hourlyData.map((obj)=>{
				var objdata={labelName:obj.venue_slot_name,id:obj.venue_slot_type_uniq_id,hourSlots:[]}
				obj.hourlySlots.map((obj2)=>{
					venue_slot_type=obj2.venue_slot_type;
					// var slotFromDate=dateFormat(avail_startDate,'hh:MM TT');
					// var slotToDate=dateFormat(avail_endDate,'hh:MM TT');
					var obj2fromtime=dateFormat(new Date(),'yyyy-mm-dd')+"T"+obj2.venue_slot_start_time;
					var obj2totime=dateFormat(new Date(),'yyyy-mm-dd')+"T"+obj2.venue_slot_end_time;
					var slotLableEdit=dateFormat(new Date(obj2fromtime),'hh:MM TT')+" - "+dateFormat(new Date(obj2totime),'hh:MM TT');
					var newobj={id:obj2.venue_slot_type_uniq_id,label:slotLableEdit,visible:false,checked:true,dateobj:{fromTime:obj2fromtime,toTime:obj2totime}};
					var filterRecords=getHours.filter((obj)=>obj.label==slotLableEdit);
					var findIndex=getHours.findIndex((obj)=>obj.label==slotLableEdit);
					if(filterRecords.length>0){
						selectedSlots.push(filterRecords[0]);
					}
					if(findIndex!=-1){
						getHours[findIndex].id=obj2.venue_slot_type_uniq_id;
					}
					objdata.hourSlots.push(newobj);
				})
				SplitSlots.push(objdata);
			})
			var availobjData={businessform:businessform,activeArrow:true,hourobj:null,selectedDays:[],selectedMonths:[],fromdate:avail_fromdate,todate:avail_todate,startvalue:avail_startDate,endvalue:avail_endDate,moreDetails:avail_moreDetails,SplitSlots:SplitSlots,hourSlots:getHours,selectedSlots:selectedSlots,slotType:venue_slot_type,availType:avail_active_obj};
			// if(editingData.trn_venue_type){
				// alert(editingData.trn_venue_type);
				finalError[3].status=true;
			this.receiveAvailability(availobjData,'stopcalling');
		}
			// }else{
				// alert("not available")
			// }

			//binding ameneties Data
			var amenetiesArray1=JSON.parse(JSON.stringify(editingData.ameneties));
			if(editingData.ameneties.length>0){
      amenetiesArray1.map(v => v.amenities_array=v.amnDetails);
      amenetiesArray1.map(v=>v.amenities_array.map(j=>j.data={visible:true}))
      amenetiesArray1.map(v=>v.amenetiesList=v.amenities_array.map((obj)=>{return {venue_amnts_id:obj.amenities_det_id,venue_amnts_det_datatype1:obj.amenities_det_datatype1,venue_amnts_det_datatype2:obj.amenities_det_datatype2,venue_amnts_det_datatype3:obj.amenities_det_datatype3,venue_amnts_det_datavalue1:obj.amenities_det_datavalue1,venue_amnts_det_datavalue2:obj.amenities_det_datavalue2,venue_amnts_det_datavalue3:obj.amenities_det_datavalue3,
      	  data:{visible:true}}}));
      finalError[2].status=true;
      this.changeDynamic(amenetiesArray1,'amenitiesArray');
  }
      //binding Purposes
      if(editingData.purpose.length>0){
      var purposeGetIndexDatas=JSON.parse(JSON.stringify(editingData.purpose));
      var getFilterRecords=purposeGetIndexDatas.filter((obj)=>obj.purpose.length>0);
      var purposeeditdata={purposes:getFilterRecords.length>0?getFilterRecords.map((obj)=>{return {id:obj.venue_act_id,value:obj.purpose.map((obj)=>obj.venue_purpose_id)}}):[],purposeDropdown:editingData.purpose}
      this.sendPurposes(purposeeditdata.purposes,purposeeditdata.purposeDropdown,0,"dontcall");
      if(purposeeditdata.purposes.length>0){
      finalError[5].status=true;
      }

  }
      //binding Tags
      if(editingData.tags.length>0){
      var mytags=JSON.parse(JSON.stringify(editingData.tags));
      this.reciveTagDetails(mytags,mytags.length>0?mytags.map((obj)=>{return {tag_cat_id:obj.tag_cat_id,tag_details:obj.data.length>0?obj.data.map((obj1)=>obj1.tag_name):[]}}):[],8);
  		}
  		var self=this;
  		setTimeout(()=>{

      self.setState({finalError,activeid:editingData.trn_venue_lastactivity?editingData.trn_venue_lastactivity:8});
  },100)
		}else{
			var finalError=this.state.finalError;
			finalError.map((obj)=>obj.status=false);

      this.setState({finalError});
			this.setState({edit:false,venue_id:null});
		}
	}
	componentWillReceiveProps(props){
		console.log("individualf")
		   
	}
}
const img=(<img src={Img1} alt="" width="60px" height="60px"/>);

