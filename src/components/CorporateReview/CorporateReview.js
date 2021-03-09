import React from 'react';
import './CorporateReview.css';
// import plus from '../../images/+.png';
import Popupbox from '../../components/popupbox/popupbox';
import Greyright from '../../images/greyright.png';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Apilink from '../../helpers/apilink';
import {notification,Button} from 'antd';
var listingjson =require('../../FormJSON/venueListing.json');
// import { Checkbox } from 'antd';

const HeaderContent=<div className="choose-text1">Before submitting <span className="choose-text2">Review the details</span></div>;
export default class CorporateReview extends React.Component {


	constructor(props) {
		super(props);
		this.state={
			finalError:this.props.finalError,
			viewDetails:this.props.viewDetails,
			loading:false
		}
		console.log(props.finalError)
	}

	onSubmitReview=()=>{
		this.setState({loading:true});
var viewDetails=this.state.viewDetails.venue_cat_location ? this.state.viewDetails.venue_cat_location:[];
var success=viewDetails.filter((x) =>x.status == true );
console.log(success.length)
var finalError=this.state.finalError;
var facility_error={}
var returnerror=finalError.filter((x) =>x.status == false );
if(success.length != viewDetails.length){
	facility_error={message:"Enter all SPOC data for all location"}
returnerror.push(facility_error);
}

if(returnerror.length>0){

notification.open({
    message:'Error Message',
    description:<ul>{returnerror.map((obj)=><li>{obj.message}</li>)}</ul>,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
    this.setState({loading:false});
return;
}

console.log(this.props.viewDetails)
var details=this.props.viewDetails;
var location=details.venue_cat_location;
// :

location.map((item)=>{    
	item.location_id=item.id;
	item.venue_location="1.8565 , 2.7854"})
var obj={
	"user_id":this.props.viewDetails.userId,
	"venue_cat_id":details.venue_cat_id,
	"venue_name":details.cat_commonData[0].spec_det_datavalue1,
	"location_details":location	
}

fetch(Apilink.apiurl+'insert_corprate_venue/', {
	method:'POST',
	headers:{
		Accept:'application/json',
		'Content-Type':'application/json',
	},
	body:JSON.stringify(obj),
})
	.then((response)=>response.json())
	.then((responsejson)=>{
		console.log('responsejson',responsejson);
	this.setState({loading:false});
	if(responsejson.status==0){
		this.props.successmodal();
	}else{
		if(responsejson.msg=='User failure'){
		notification.open({
    message:'Error Message',
    description:<ul>{responsejson.data.map((obj)=><li>{obj}</li>)}</ul>,
})
	}
		// alert("Error Insert Data")
	}
})
}

componentDidMount(){
console.log(this.props);
}


render() {
	return (
		<div className="review-maindiv">
		<Bindname text="Corporate Venue Review"/>
		<Choosediv  content={HeaderContent} changeActive={(data)=>this.props.changeActive(data)} prev={2} next={3}/>
		<div className="reviewform-div">
		<div className="reviewsave-div">
		<Button loading={this.state.loading} style={{height:'auto'}} onClick={()=>this.onSubmitReview()} type="button" className="reviewsave-button"><span className="reviewsave-span">Submit</span></Button>
		</div>

		

		<div className="review-form">
		<div className="reviewform-text1">Corporate Name</div>
		<div className="reviewform-text2">{this.props.viewDetails.cat_commonData&&this.props.viewDetails.cat_commonData[0].spec_det_datavalue1}</div>
		</div>


		<div className="review-form">
		<div className="reviewform-text1">Locations</div>
		<div className="reviewform-text2">{this.props.viewDetails.cat_commonData&&this.props.viewDetails.cat_commonData[4].spec_det_datavalue1}</div>
		</div>		
		<div className="review-form">
		<div className="reviewform-text1">Facilities</div>
		<div className="reviewform-text2">
		{
			this.props.viewDetails.venue_cat_location && this.props.viewDetails.venue_cat_location.map((item,i)=>(
				item.facility_name != "" && <div>{item.facility_name}  in  {item.name}<br/></div>
			)
			)}
		
		</div>
		</div>
		<div className="review-form">
		<div className="reviewform-text1">Total Authorization</div>
		<div className="reviewform-text2">{this.props.viewDetails.cat_commonData&&this.props.viewDetails.cat_commonData[1].spec_det_datavalue1}</div>


		</div>
		</div>
			{window.innerWidth<768&&
				<div className="ActionsReviewBtns"><button onClick={()=>this.props.changeActive(1)}>Edit</button><button onClick={()=>this.onSubmitReview()}>Submit</button></div>
			}
		</div>

		);
}
}
