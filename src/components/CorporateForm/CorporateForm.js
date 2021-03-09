import React from 'react';
import Bindname from '../bindname/bindname';
import Paginationview from '../pagination/pagination';
import Apilink from '../../helpers/apilink';
import Plus from '../../images/+.png';
import CorporateCategory from '../CorporateCategory/CorporateCategory';
import CorporateFacilities from '../CorporateFacilities/CorporateFacilities';
import CorporateSuccess from '../CorparateSuccesModal/CorporateSuccess';
import MobCoporateSpec from '../../pages/MobCorportateSpecForm/MobCorporateSpecForm';
import CorporateReview from '../CorporateReview/CorporateReview';
import Modal_login_1 from '../modal_login_1/modal_login_1';
import './CorporateForm.css'; 
const listingjson=require('../../FormJSON/venueListing.json');
const errorStatus=[
{key:'venuecategory',message:"Please Select the venue category",status:false},
{key:'specificvenue',message:"Please Select the specific venue and details",status:false},
]
export default class CorporateForm extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			userId:null,
			userName:null,
			activeid:1,
			"venue_cat_id":null,
			"venue_cat_obj":null,
			"cat_commonData":null,

			"facility_id":null,
			"facility_obj":null,
			"facility_commonData":null,

			"venue_cat_location":null,
			"successmodal":false,

			listingjson:listingjson,
			finalError:errorStatus};
		}
		changeActive=(data)=>{
			this.setState({activeid:data})
		}
	changeDynamic=(data,key,name,key1,move)=>{
			this.setState({[key]:data})
			if(name){
				this.setState({[key1]:name})
			}
			if(key=='venue_cat_id'){
				var listingjson=this.state.listingjson;
				listingjson.venue.venue_cat_id=data;
				this.setState({listingjson})
				this.setState({veneu_spec_id:null});
			}
			if(key=='veneu_spec_id'){
				var listingjson=this.state.listingjson;
				listingjson.venue.venue_spec_id=data.venue_spec_id;
				listingjson.specific=data.specDetails;
				this.setState({listingjson});
			}
			if(move){
				this.setState({activeid:move})
			}
		}
		receiveCorporateCat=(data)=>{
			// alert(data);

		}
		checkValidationError=(data,state)=>{
			var finalError=this.state.finalError;
			for(var i in finalError){
				if(finalError[i].key==data){
					finalError[i].status=state;
				}  
			}
			this.setState({finalError});
			console.log(this.state)
		}
			successClose=(data)=>{
			this.setState({successmodal:data})
			this.props.history.push('/')

	}

		
	venueCategoryCallback=(id,obj,location)=>{
		this.setState({venue_cat_id:id,venue_cat_obj:obj,venue_cat_location:location});

		// this.setState({activeid:1.5});
	}
	
		render(){
			return(
				<div className="corporateFormDiv">
				<Paginationview activeid={this.state.activeid} numberofDots={3} changeActive={(data)=>this.changeActive(data)}/>
				{this.state.activeid==1&&
					<CorporateCategory sendVenue={this.receiveCorporateCat} categoryId={this.state.venue_cat_id} venueCategoryCallback={(id,obj,location)=>this.venueCategoryCallback(id,obj,location)} 

					sendRequest={{id:this.state.venue_cat_id,obj:this.state.venue_cat_obj,commonData:this.state.cat_commonData,location:this.state.venue_cat_location}}

					changeActive={(data)=>{this.setState({activeid:data})}} 

					checkValidationError={this.checkValidationError} sendCommonDetails={(data)=>{this.setState({cat_commonData:data,activeid:window.innerWidth>767?2:1.5})}}
					/>
				}
				{this.state.activeid==1.5&&
					<MobCoporateSpec checkValidationError={this.checkValidationError} categoryname={this.state.venue_cat_obj && this.state.venue_cat_obj.venue_cat_name} location={this.state.venue_cat_location} sendLocation={(location)=>this.setState({venue_cat_location:location})} sendCommonDetails={(data)=>{this.setState({cat_commonData:data})}} commonArray={this.state.cat_commonData} specobj={this.state.venue_cat_obj} changeActive={(data)=>{this.setState({activeid:data})}}/>
				}
				{this.state.activeid==2&&
					<CorporateFacilities categoryname={this.state.venue_cat_obj && this.state.venue_cat_obj.venue_cat_name} categoryId={this.state.venue_cat_id} faclityId={this.state.facility_id} changeActive={(data)=>{this.setState({activeid:data})}} categoryData={this.state.cat_commonData} categoryLocation={this.state.venue_cat_location} responseLocation={(data)=>{this.setState({venue_cat_location:data})}} checkValidationError={this.checkValidationError}/>	
				}
				{this.state.activeid==3&&
					<CorporateReview viewDetails={this.state} changeActive={(data)=>{this.setState({activeid:data})}} finalError={this.state.finalError} successmodal={()=>{this.setState({successmodal:true})}}/>
				}
				{this.state.successmodal==true &&
					<CorporateSuccess visible={this.state.successmodal} Location={this.state.venue_cat_location.length} successClose={this.successClose} userName={this.props.userName}/>
				}
				</div>
				)
		}

		componentDidMount=()=>{
			var scrollHeight=document.querySelector('.corporateFormDiv').offsetTop-100;
		window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
			if(window.localStorage.getItem('LoginStatus') && window.localStorage.getItem('LoginData')){
				var LoginData=JSON.parse(localStorage.getItem('LoginData'));
				console.log(LoginData)
				this.setState({userId:LoginData.user_id,userName:LoginData.user_name +" "+ LoginData.user_surname})
			}
		}
	}