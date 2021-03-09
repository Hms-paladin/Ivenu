import React from 'react';
import Specific from '../specific-venue/specific-venue';
import Form1 from '../form1/form1';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import Choose_location from '../choose_location/choose_location';
import FormHeader from '../form1/FormHeader';
import FormContent from '../form1/FormContent';
import './CorporateFacilities.css';
import ValidationLibrary from '../../helpers/validationfunction';
import Img1 from '../../images/b3.png';
import { Modal, Button } from 'antd';
// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';

import { BounceLoader } from 'react-spinners';
const listAdditonal=[{id:1,dontbind:true},{id:1,dontbind:true}]
const HeaderContent=window.innerWidth>767?(<div className="choose-text1">Please Select the <span className="choose-text2">Facilities to the respective locations and Authorize</span></div>):(<div className="choose-text1">Please Select the <span className="choose-text2">Facilities</span></div>);
export default class CorporateFacilities extends React.Component {

	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			authorizeVisible:false,
			facilityId:null,
			activeArrow:false,			
			ListVenueType:[],
			activelocationId:null,
			// location:[{"id":1,"name":"Chennai"},{"id":2,"name":"Nagerkoil"}],
			location:props.categoryLocation?props.categoryLocation:[],
			length:true,
			loading:true,activeobj:null,
			commonArray:[{
				"spec_det_id":'idname1',
				"venue_spec_id":1,
				"spec_det_name":"SPOC Name",
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
			},
			{
				"spec_det_id":'idname3',
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
			},]
		};

	}

	specificvenue=(data)=>{
		console.log(this.state)
		this.setState({activeobj:data});
		this.setState({facilityId:data.venue_spec_id,activeArrow:true});
		// this.props.venueCategoryCallback(data.venue_cat_id,data.venue_cat_name);
		// this.props.checkValidationError('venuecategory',true);
	}

	componentWillMount(){
		// this.ListVenueType();	
	}
	
	ListVenueType(data){
		fetch(Apilink.apiurl+'listSpecificVenue/', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({user_cat_id:"2","venue_cat_id":data}),
		}).then((response)=>response.json())
		.then((responseJson)=>{
			this.setState({"ListVenueType":responseJson.data.concat(listAdditonal),loading:false})
			console.log(responseJson)
		})
	}

	recieveInputData=(data,text,location)=>{

		if(location){
			this.setState({location:location});
		}
		var activeobj=this.state.activeobj;
		var commonArray=this.state.commonArray;

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
			var location=this.state.location;
			location.map((data,i)=>{
				if(data.id==this.state.activelocationId){
					data.venue_spec_id=this.state.facilityId;
					data.spoc_name=this.state.commonArray[0].spec_det_datavalue1;
					data.spoc_email=this.state.commonArray[1].spec_det_datavalue1;
					data.spoc_mobile=this.state.commonArray[2].spec_det_datavalue1;
					data.facility_name=this.state.activeobj.venue_spec_name;
					data.status=true;
				}
			})
			this.setState({location})
			this.props.responseLocation(location);
			this.props.checkValidationError('specificvenue',true);
			this.setState({authorizeVisible:false});
			alert("SPOC added for selected location")
		}

		console.log(this.state)

	}


	getLocationId=(data)=>{
		this.setState({activelocationId:data});

		this.state.location.map((item,i)=>{
			if(item.id==data){
                if(item.venue_spec_id){

				var commonArray=this.state.commonArray;
				commonArray[0].spec_det_datavalue1=item.spoc_name;
				commonArray[1].spec_det_datavalue1=item.spoc_email;
				commonArray[2].spec_det_datavalue1=item.spoc_mobile;

				var activeObj = this.state.ListVenueType.filter((data2) =>{return(data2.venue_spec_id== item.venue_spec_id)});

				this.setState({facilityId:item.venue_spec_id,activeobj:activeObj[0],commonArray});
                }else{
                var commonArray=this.state.commonArray;
				commonArray[0].spec_det_datavalue1="";
				commonArray[1].spec_det_datavalue1="";
				commonArray[2].spec_det_datavalue1="";
				this.setState({facilityId:"",activeobj:null,commonArray});

                }
			}
		})

	}

	render() {
		return (
			<div className="venueCategory">
			<Bindname text={window.innerWidth>767?"Corporate User - Add":"Corporate User - Add Venue"}/>
			<Choosediv  content={HeaderContent} changeActive={(data)=>this.props.changeActive(data)} prev={1} next={3} activeArrow={this.state.activeArrow}/>

			{this.state.length &&
				<div>
			<Choose_location dropDown={this.state.location} getLocationId={this.getLocationId}/>
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

			{(!this.state.loading && this.state.activelocationId)&&
				<div className="main-div">
				{this.state.ListVenueType.map((item,i)=>


					<Specific dummy={item.dontbind} width="100px" height="100px" filter="brightness(100)" undertext={item.venue_spec_name} specificvenue={()=>this.specificvenue(item)} text={img(item.venue_spec_icon)} active={(this.props.faclityId?this.props.faclityId:this.state.facilityId)==item.venue_spec_id} activecolor={"#a60202"} Skew={true}/>

					)}

				</div>
			}
			</div>
		}
		<Modal
          title="Add Basic Details"
          className="FaciltyAuthorizeModal"
          visible={this.state.authorizeVisible}
          onCancel={()=>this.setState({authorizeVisible:false})}
        >
        <FormContent inputChange={this.recieveInputData} commonArray={this.props.commonArray?this.props.commonArray:this.state.commonArray}  />
        <div className="ActionsReviewBtns"><button onClick={()=>console.log("edit")}>Edit</button><button onClick={()=>this.saveData()}>Submit</button></div>
        </Modal>
			{(!this.state.loading && this.state.activeobj)&&

				<div className="AuthorizeButton"><button onClick={()=>this.setState({authorizeVisible:true})}>Authorize</button></div>
			}
			{this.state.activeobj&&window.innerWidth>767&&
				<div>
				<FormHeader saveClick={()=>this.saveData()} category={this.props.categoryname&&this.props.categoryname}  subcategory={this.state.activeobj?this.state.activeobj.venue_spec_name:''} corporate={true} altHeader={true}/>

				<FormContent inputChange={this.recieveInputData} commonArray={this.props.commonArray?this.props.commonArray:this.state.commonArray}  />
				</div>
			}
			{!this.state.length && 
				<div className="errorText"> Please select Venue Category</div>
			}
			</div>
			);
	}
	// componentDidMount(){
	// 	if(this.props.categoryId){
	// 		this.setState({activeArrow:true});
	// 	}
	// 	console.log(this.state)
	// }

	componentDidMount=()=>{

		if(this.props.categoryId){
			this.ListVenueType(this.props.categoryId)
		}else{
			// this.ListVenueType(2)
			this.setState({loading:false,length:false});
		}
	}
}
const img = (image) =>((<img src={image} alt="" width="60px" height="60px"/>));