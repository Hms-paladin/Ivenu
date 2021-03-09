import React from 'react';
import Specific from '../specific-venue/specific-venue';
import FormHeader from '../form1/FormHeader';
import FormContent from '../form1/FormContent';
import Form1 from '../form1/form1';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import './SpecificVenue.css';
import Geocode from "react-geocode";

import Img1 from '../../images/b3.png';
// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';
import ValidationLibrary from '../../helpers/validationfunction';
import { BounceLoader } from 'react-spinners';

const HeaderContent=<div className="choose-text1">Please choose the <span className="choose-text2">Specific venue</span></div>;
const listAdditonal=[{id:1,dontbind:true},{id:1,dontbind:true}]
export default class SpecificVenue extends React.Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {activeArrow:false,loading:true,length:true,activeobj:null,saveinfo:'',specificarray:[],commonArray:[{
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
		}]};

	}
	getAddress=(lat,lng)=>{
     Geocode.fromLatLng(lat, lng).then(
  response => {
    console.log(response.results[0]);
    const address = response.results[0].formatted_address;
    var commonArray=this.state.commonArray;
	commonArray[1].spec_det_datavalue2=Object.values(response.results[0].geometry.location).join(',')
	commonArray[1].spec_det_datavalue1=address;
	this.setState({commonArray});
  },
  error => {
    console.error(error);
  }
);
}
	componentWillMount(){
		var self=this;
		// alert('');
    navigator.geolocation.getCurrentPosition(position => {
        console.log("currentLocationHandler",position);
      this.setState({
        currentLatLng:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta:0.005,
          longitudeDelta:0.005,
          coords:position.coords
        }
      });
      // console.log("latitude",position.coords.latitude);
      Geocode.setApiKey("AIzaSyDS9ePaBsFgdZt5v2wQrciYrLGhVJmvTWE");
    Geocode.enableDebug();
    if(this.state.commonArray[1].spec_det_datavalue2==""){
    // this.getAddress(position.coords.latitude,position.coords.longitude);
    }
   
  });
	}
	componentWillReceiveProps(props){
	console.log(props);
}
specificvenue=(data)=>{
	console.log(data);


	this.setState({activeobj:data});
	window.innerWidth<767&&this.props.venuespecCallback(data,'mob');
}


loadSpecifVenue(data,data1){

	fetch(Apilink.apiurl+'listSpecificVenue/', {
		method:'POST',
		headers:{
			Accept:'application/json',
			'Content-Type':'application/json',
		},
		body:JSON.stringify({user_cat_id:"1","venue_cat_id":data}),
	}).then((response)=>response.json())
	.then((responseJson)=>{
		console.log(responseJson.data)
		if(responseJson.data.length==0){
			this.setState({length:false,loading:false})
		}
		// alert(responseJson.data.length);
		if(responseJson.data.length>0){

			responseJson.data=data1?responseJson.data.map((obj)=>{
				var obj2=obj;
				if(obj2.venue_spec_id==data1.venue_spec_id){
					data1.specDetails.length>0&&data1.specDetails.map((obj4,index)=>{
						var findindex=obj2.specDetails.findIndex((obj5)=>obj5.spec_det_id==obj4.spec_det_id);
						if(findindex!=-1){
							obj2.specDetails[findindex]=obj4;
						}
					})
					}
					return obj2;
				}):responseJson.data;
			// alert(JSON.stringify(responseJson.data));
				if(data1){
					var filterrecords=responseJson.data.filter((obj)=>obj.venue_spec_id==data1.venue_spec_id);
					this.setState({activeobj:filterrecords.length>0?filterrecords[0]:null})
				}
			}
			responseJson.data=responseJson.data.concat(listAdditonal);
		this.setState({specificarray:responseJson.data,loading:false});
	})
}
recieveInputData=(data,text,location)=>{
		// this.setState({})
		if(location){
			var commonArray=this.state.commonArray;
			// alert(JSON.stringify(location));
			commonArray[1].spec_det_datavalue2=Object.values(location).join(',');
			this.setState({commonArray});
		}
		console.log(data,text);
		var activeobj=this.state.activeobj;
		var commonArray=this.state.commonArray;
		console.log(data.spec_det_id);
		if(Number.isInteger(data.spec_det_id)){
			// console.log(Number.isInteger(data.spec_det_id));
			var findIndex=activeobj.specDetails.findIndex((obj)=>obj.spec_det_id==data.spec_det_id);
			if(findIndex!=-1){
				activeobj.specDetails[findIndex].spec_det_datavalue1=text;
				this.setState({activeobj})
			}
		}else{
			var findIndex=commonArray.findIndex((obj)=>obj.spec_det_id==data.spec_det_id);
			if(findIndex!=-1){
				var errorcheck=ValidationLibrary.checkValidation(text,commonArray[findIndex].validation);
				console.log(errorcheck);
				commonArray[findIndex].spec_det_datavalue1=text;
				commonArray[findIndex].error=!errorcheck.state;
				commonArray[findIndex].errormsg=errorcheck.msg;
				this.setState({commonArray},function(){
					if(this.props.commonArray){
					this.checkValidations();
					}
				})
			}
		}

	}
	checkValidations=()=>{
		var commonArray=this.state.commonArray;
		for(var i in commonArray){
		var errorcheck=ValidationLibrary.checkValidation(commonArray[i].spec_det_datavalue1,commonArray[i].validation);
		commonArray[i].error=!errorcheck.state;
		commonArray[i].errormsg=errorcheck.msg;
		}
		var errordata=commonArray.filter((obj)=>obj.error==true);
		if(errordata.length!=0){
			this.props.checkValidationError('specificvenue',false);
		}else{

			this.props.checkValidationError('specificvenue',true);
		}
		this.setState({commonArray});
		return errordata;
	}
	saveData=()=>{
		console.log("sava data",this.state);
		var errodatata=this.checkValidations();
		console.log(errodatata);
		if(errodatata.length==0){
			this.setState({activeArrow:true});
			this.props.sendCommonDetails(this.state.commonArray);
			this.props.venuespecCallback(this.state.activeobj);
			// this.props.checkValidationError('specificvenue',true);
		}else{
			// this.props.checkValidationError('specificvenue',false);
		}
		// if(this.state.activeobj&&!this.state.commonArray[0].spec_det_datavalue1){
		// 	alert("Please Enter "+this.state.activeobj.venue_spec_name+" Venue Name");
		// }else{
		// 	this.props.sendCommonDetails(this.state.commonArray);
		// 	this.props.venuespecCallback(this.state.activeobj);
		// }
	// this.setState({saveinfo:this.props.receivetxt})
	// console.log("saveinfo",this.props.receivetxt);
}
updateText=(data,key)=>{
	this.setState({[key]:data});
	console.log("data",data);
}
render() {
	var paginate=window.innerWidth>767?3:2.5;
	// alert(window.innerWidth);
	// console.log(this.state);
	return (
		<div className="specificVenue">
		<Bindname text="Specific Venue"/>
		<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={1} next={paginate} activeArrow={this.state.activeArrow}/>

		{this.state.loading==true &&
		<div className='sweet-loading'>
		<BounceLoader
		sizeUnit={"px"}
		size={75}
		color={'#24479D'}
		loading={this.state.loading}
		/>
			<div className="sweet-loading_text">Loading...</div>
		</div> 
		}
		{(!this.state.loading && this.state.length) &&

			<div>

			<div className={`main-div }`}>
			{this.state.specificarray.length>0 && this.state.specificarray.map((obj,key)=>{
				return(
					<Specific disabled={this.props.disabled}  dummy={obj.dontbind} width="100px" height="100px" filter="brightness(100)" undertext={obj.venue_spec_name} specificvenue={()=>this.specificvenue(obj)} text={img(obj.venue_spec_icon)} active={this.state.activeobj&&this.state.activeobj.venue_spec_id==obj.venue_spec_id} activecolor={"#a60202"} Skew={true}/>
					)
			})}
			


			</div>
			{this.state.activeobj &&window.innerWidth>767&&
			<div style={{marginTop:10}}>
			<FormHeader saveClick={()=>this.saveData()} category={this.props.categoryname&&this.props.categoryname}  subcategory={this.state.activeobj?this.state.activeobj.venue_spec_name:''} />
			{this.state.activeobj&&
				<FormContent inputChange={this.recieveInputData} commonArray={this.props.commonArray?this.props.commonArray:this.state.commonArray} receivetxt={(data,key)=>this.updateText(data,key)} formArray={this.state.activeobj.specDetails} />
			}
			</div>
		}

			</div>
		}
		{!this.state.length && 
<div className="errorText"> Please select Venue Category</div>
		}
		</div>
		);
}
componentDidMount(){

			if(this.props.venueCatId){
				// alert(JSON.stringify(this.props.specificId))
				this.loadSpecifVenue(this.props.venueCatId,this.props.specificId);
			}else{
				this.setState({loading:false,length:false});
			}
			if(this.props.commonArray){
				this.setState({commonArray:this.props.commonArray,activeArrow:true});
			}
			if(this.props.specificId){

				// alert(JSON.stringify(this.props.specificId));
				// this.setState({activeobj:this.props.specificId});
				// var obj={venue_}
			}
		}
	}
const img = (image) =>((<img src={image} alt="" width="60px" height="60px"/>));