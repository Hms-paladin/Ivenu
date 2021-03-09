import React from 'react';
import Specific from '../specific-venue/specific-venue';
import Form1 from '../form1/form1';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import FormHeader from '../form1/FormHeader';
import FormContent from '../form1/FormContent';
import './CorporateCategory.css';
import ValidationLibrary from '../../helpers/validationfunction';
import Img1 from '../../images/b3.png';
// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';

import { BounceLoader } from 'react-spinners';
const listAdditonal=[{id:1,dontbind:true},{id:1,dontbind:true}]
const HeaderContent=window.innerWidth>767?(<div className="choose-text1">Please choose the <span className="choose-text2">Corporate Venue Category and provide Details</span></div>):(<div className="choose-text1">Please choose your <span className="choose-text2">Venue</span></div>);
export default class VenueCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			venuecategoryid:"",location:[],
			activeArrow:false,			
			ListVenueType:[],
			loading:true,activeobj:null,
			commonArray:[{
				"spec_det_id":'idname1',
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
				"spec_det_name":"Admin",
				"spec_det_sortorder":0,
				"spec_det_datatype1":"number",
				"spec_det_datavalue1":"",
				"spec_det_datatype2":"",
				"spec_det_datavalue2":"",
				"spec_det_datatype3":"",
				"spec_det_datavalue3":"",
				validation:[{name:'required'},{name:'allowNumaricOnly'}],				
				error:null,
				errormsg:''
			},{
				"spec_det_id":'idname3',
				"venue_spec_id":1,
				"spec_det_name":"Mail",
				"spec_det_sortorder":0,
				"spec_det_datatype1":"text",
				"spec_det_datavalue1":"",
				"spec_det_datatype2":"",
				"spec_det_datavalue2":"",
				"spec_det_datatype3":"",
				"spec_det_datavalue3":"",
				validation:[{name:'required'},{name:'email'}],
				error:null,
				errormsg:''
			},{
				"spec_det_id":'idname4',
				"venue_spec_id":1,
				"spec_det_name":"Contact Number",
				"spec_det_sortorder":0,
				"spec_det_datatype1":"text",
				"spec_det_datavalue1":"",
				"spec_det_datatype2":"",
				"spec_det_datavalue2":"",
				"spec_det_datatype3":"",
				"spec_det_datavalue3":"",
				validation:[{name:'required'},{name:'mobile'}],
				error:null,
				errormsg:''
			},{
				"spec_det_id":'idname5',
				"venue_spec_id":1,
				"spec_det_name":"Location",
				"spec_det_sortorder":0,
				"spec_det_datatype1":"btn_plus",
				"spec_det_datavalue1":"",
				"spec_det_datatype2":"",
				"spec_det_datavalue2":"",
				"spec_det_datatype3":"",
				"spec_det_datavalue3":"",
				validation:[{name:'required'}],
				'readonly':true,
				error:null,
				errormsg:''
			}]
		};

	}

	specificvenue=(data)=>{
		if(window.innerWidth<768){
			this.props.venueCategoryCallback(data.venue_cat_id,data,this.state.location);
			this.props.sendCommonDetails(this.state.commonArray);
			this.props.checkValidationError('venuecategory',true);
			// this.props.sendVenue&&this.props.sendVenue(data)
		}
		this.setState({activeobj:data});
		this.setState({venuecategoryid:data.venue_cat_id});
	}

	componentWillMount(){
		this.ListVenueType();	
	}
	checkValidations=()=>{
		var commonArray=this.state.commonArray;
		for(var i in commonArray){
		var errorcheck=ValidationLibrary.checkValidation(commonArray[i].spec_det_datavalue1,commonArray[i].validation);
		commonArray[i].error=!errorcheck.state;
		commonArray[i].errormsg=errorcheck.msg;
		}
		var errordata=commonArray.filter((obj)=>obj.error==true);
		this.setState({commonArray});
		return errordata;
	}
	saveData=()=>{

		console.log(this.state)
		var errodatata=this.checkValidations();

		if(errodatata.length==0){
			this.setState({activeArrow:true});
			this.props.sendCommonDetails(this.state.commonArray);
			this.props.venueCategoryCallback(this.state.venuecategoryid,this.state.activeobj,this.state.location);
			this.props.checkValidationError('venuecategory',true);
		}

	}
	recieveInputData=(data,text,location)=>{

		if(location){
			this.setState({location:location});
		}
		var activeobj=this.state.activeobj;
		var commonArray=this.state.commonArray;
		console.log(data.spec_det_id);
		console.log("location",location);
		var findIndex=commonArray.findIndex((obj)=>obj.spec_det_id==data.spec_det_id);
		if(findIndex!=-1){
			var errorcheck=ValidationLibrary.checkValidation(text,commonArray[findIndex].validation);
			console.log(errorcheck);
			commonArray[findIndex].spec_det_datavalue1=text;
			commonArray[findIndex].error=!errorcheck.state;
			commonArray[findIndex].errormsg=errorcheck.msg;
			this.setState({commonArray});
		}

		console.log(this.state)
	}
	ListVenueType(){

		fetch(Apilink.apiurl+'listVenueCategory/', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({user_cat_id:"2"}),
		}).then((response)=>response.json())
		.then((responseJson)=>{
			this.setState({"ListVenueType":responseJson.data.concat(listAdditonal),loading:false})
			console.log(responseJson.data)
		})
	}

	render() {
		console.log("corporate category",this.state.venuecategoryid);
		return (
			<div className="venueCategory">
			<Bindname text={window.innerWidth>767?"Corporate Venue Category":"Corporate User - Add Venue"}/>
			<Choosediv  content={HeaderContent} changeActive={(data)=>this.props.changeActive(data)} prev={1} next={window.innerWidth<768?1.5:2} activeArrow={this.state.activeArrow}/>
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
			{!this.state.loading &&
				<div className="main-div">
				{this.state.ListVenueType.map((item,i)=>
					<Specific  dummy={item.dontbind} width="100px" height="100px" filter="brightness(100)" undertext={item.venue_cat_name} specificvenue={()=>this.specificvenue(item)} text={img(item.venue_cat_icon)} active={(this.state.venuecategoryid)==item.venue_cat_id} activecolor={"#a60202"} Skew={true}/>
					)}

				</div>
			}

			{this.state.activeobj&&window.innerWidth>767&&
				<div>
				<FormHeader saveClick={()=>this.saveData()} category={'Corporate Venue'}  subcategory={this.state.activeobj?this.state.activeobj.venue_cat_name:''} corporate={true}/>

				<FormContent inputChange={this.recieveInputData} commonArray={this.props.commonArray?this.props.commonArray:this.state.commonArray}  receivetxt={(data,key)=>this.updateText(data,key)} requestLocation={this.state.location}/>
				</div>
			}
			</div>
			);
	}
	componentDidMount(){
		console.log(this.props);
		if(this.props.categoryId){
			var request=this.props.sendRequest;
			this.setState({activeArrow:true,venuecategoryid:request.id,activeobj:request.obj,commonArray:request.commonData,location:request.location});
		}
		console.log(this.state)
	}
}
const img = (image) =>((<img src={image} alt="" width="60px" height="60px"/>));