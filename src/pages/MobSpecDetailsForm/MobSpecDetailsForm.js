import React from 'react';
import FormContent from '../../components/form1/FormContent';
import Bindname from '../../components/bindname/bindname';
import Choosediv from '../../components/choosediv/choosediv';
import FormHeader from '../../components/form1/FormHeader';
import ValidationLibrary from '../../helpers/validationfunction';
import Geocode from "react-geocode";

const HeaderContent=<div className="choose-text1">Please add your <span className="choose-text2">Venue</span> Details</div>;

export default class MobSpecDetailsForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {activeArrow:false,activeobj:props.venueSpecDetails?props.venueSpecDetails:null,specificarray:[],commonArray:[{
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
		},]
	}
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
    // this.setState({address:address});
   // alert(JSON.stringify(lat,lng));
    // this.props.receiveaddr(address,response.results[0].geometry.location);
    // console.log(address);
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
    this.getAddress(position.coords.latitude,position.coords.longitude);
   
  });
	}
componentWillReceiveProps(props){
// console.log(props);
}
recieveInputData=(data,text,location)=>{
		// this.setState({})
			if(location){
			var commonArray=this.state.commonArray;
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
				this.setState({activeobj},function(){
					
					this.props.venuespecCallback(this.state.activeobj);
				})

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
					this.props.sendCommonDetails(this.state.commonArray);
				})
			}
		}
		this.checkValidations();

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
			if(window.innerWidth<768){

			this.props.checkValidationError('specificvenue',false);
			}
		}else{
if(window.innerWidth<768){
				
			this.props.checkValidationError('specificvenue',true);
			}
			// this.props.checkValidationError('specificvenue',true);
		}
		this.setState({commonArray});
		return errordata;
	}
	render() {
		return (
			<div>
			<Bindname text="Venue Details"/>
			<Choosediv  content={HeaderContent} changeActive={(data)=>this.props.changeActive(data)} prev={2} next={3} activeArrow={this.state.activeArrow}/>
			{this.state.activeobj&&
				<div>
			<FormHeader buttonhide={true} category={this.props.categoryname&&this.props.categoryname}  subcategory={this.state.activeobj?this.state.activeobj.venue_spec_name:''} />
					<FormContent inputChange={this.recieveInputData} commonArray={this.props.commonArray?this.props.commonArray:this.state.commonArray} receivetxt={(data,key)=>this.updateText(data,key)} formArray={this.state.activeobj.specDetails} />
					</div>
				}

				{!this.state.activeobj&&
						<div className="errorText">Please Choose Specification</div>
				}
			</div>
		);
	}
	componentDidMount(){
			// alert("hiii");
			// console.log(this.props);
		
			if(this.props.commonArray){
				this.setState({commonArray:this.props.commonArray,activeArrow:true});
			}
			if(this.props.specificId){
				// alert(this.props.specificId);
				this.setState({activeobj:this.props.specificId});
				// var obj={venue_}
			}
		}
}
