import React from 'react';
import './review.css';
// import plus from '../../images/+.png';
import Popupbox from '../../components/popupbox/popupbox';
import Greyright from '../../images/greyright.png';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Apilink from '../../helpers/apilink';
import LoadAPIPost from '../../helpers/xhrapi';
import {notification,Button,Icon,Spin} from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
const antIcon = <Icon type="loading" style={{ fontSize:24,color:'#ea5c04' }} spin />;
var listingjson =require('../../FormJSON/venueListing.json');
// import { Checkbox } from 'antd';

const HeaderContent=<div className="choose-text1">Before submitting <span className="choose-text2">Review</span> the details</div>;
export default class Review extends React.Component {


	constructor(props) {
		super(props);
		this.state={
			finalError:this.props.finalError,
			loading:false
		}
		console.log(props.finalError)
	}

onSubmitReview=()=>{
this.setState({loading:true})
var finalError=this.state.finalError;
if(this.props.viewDetails.listingjson.venue.venue_type==2){
	finalError[4].status=true;
}
var returnerror=finalError.filter((x) =>x.status == false );
// alert(JSON.stringify(this.props.viewDetails.listingjson));

if(returnerror.length>0){
// this.setState({loading:false})
notification.open({
    message:'Error Message',
    description:<ul>{returnerror.map((obj)=><li>{obj.message}</li>)}</ul>,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
this.setState({loading:false})
return;
}
// venue_location
// finalError=finalError.filter(x => x.status==false)
console.log(returnerror);

	// console.log(listingjson);
	var formData=new FormData();
	// formData.set('formArray',this.props.viewDetails&&this.props.viewDetails.imageData)
	var fileDataLength=this.props.viewDetails&&this.props.viewDetails.imageData&&this.props.viewDetails.imageData.length>0&&this.props.viewDetails.imageData.filter((obj)=>!obj.exist);
	// alert(fileDataLength);
	for(var i in this.props.viewDetails&&this.props.viewDetails.imageData&&this.props.viewDetails.imageData.length>0&&this.props.viewDetails.imageData.filter((obj)=>!obj.exist)){
		// debugger;
		formData.append('formArray',this.props.viewDetails.imageData[i]);
	}
	// return;

	// for(var )
	formData.set('existImages',this.props.viewDetails&&this.props.viewDetails.fileList?JSON.stringify(this.props.viewDetails.fileList.filter((obj)=>obj.exist)):[]);
	formData.set('venue',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.venue))
	formData.set('tagdetails',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.tagdetails));
	formData.set('specific',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.specific))
	formData.set('pricedetails',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.pricedetails))
	formData.set('ameneties',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.ameneties))
	formData.set('hourlyAvailability',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.hourlyAvailability))
	formData.set('availability',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.availability));
	formData.set('purpose',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.purposeData.purposes.map((obj)=>{return {venue_act_id:obj.id,purposedetails:obj.value.join(',')}})))
	formData.set('seatDetails',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.seatDetails))
	formData.set('packsDetails',this.props.viewDetails&&JSON.stringify(this.props.viewDetails.listingjson.packsDetails))
	// var listingjson
	var listingjsonData=listingjson;
	listingjsonData.venue.venue_cat_id=this.props.viewDetails&&this.props.viewDetails.venue_cat_id;
	listingjsonData.venue.venue_spec_id=this.props.viewDetails&&this.props.viewDetails.veneu_spec_id&&this.props.viewDetails.veneu_spec_id.venue_spec_id;
	// console.log(this.props);
	if(this.props.viewDetails.edit==true){
		var _selfstate=this;
		LoadAPIPost.LoadApi(formData,Apilink.apiurl+'edit_venue/',((fileDataLength&&fileDataLength.length>0)?'upload':null),function(err,data){
			if(err){
			console.log("error",err);
		}else{
			var responsejson=JSON.parse(data);
			console.log('responsejson',responsejson);
			
		if(responsejson.status==0){
			// this.props.successmodal();
			// alert("updated successfully")
			notification.success({
    message:' Message',
    duration:50,
    description:"Venue Updated Successfully you can review the status of an approval in venue page.",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
			setTimeout(()=>{

			_selfstate.props.reviewedModal&&_selfstate.props.reviewedModal(true);
		},500)

		}else{
			alert("not updated successfully")
		}
		}
		})
	}else{
		this.props.sendFormData.set('dummyVenueId',this.props.dummyVenueId);
	 fetch(Apilink.apiurl+'insert_venue/', {
            method:'POST',

            body:this.props.sendFormData,
        })
	.then((response)=>response.json())
	.then((responsejson)=>{
this.setState({loading:null})
		if(responsejson.status==0){
			this.props.successmodal();
		}
		console.log(responsejson);
	})
}
	}

componentDidMount(){
console.log(this.props);
}
getVenueType=(data)=>{
	if(data=='1'){
		return "Normal"
	}else if(data=='2'){
		return "Pax";
	}else if(data=='3'){
		return "Seat";
	}
}


	render() {
		return (
			<div className="review-maindiv">
			<Bindname text="Review"/>
			{this.state.loading&&
			<div className="PageLoader">
				<div style={{textAlign:'center',display:'block'}}>
				<CircularProgress style={{color:'#ea5c04'}}/>
				<p>Submitting Please Wait ...</p>
				</div>
			</div>
		}
			<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={7} next={8}/>
			<div className="reviewform-div">
			{window.innerWidth>767&&
			<div className="reviewsave-div">
				<Button style={{height:'auto'}} loading={false} onClick={()=>this.onSubmitReview()} className="reviewsave-button"><span className="reviewsave-span">Submit</span></Button>
			</div>
			}

		

			<div className="review-form">
				<div className="reviewform-text1">Category</div>
				<div className="reviewform-text2">{this.props.viewDetails&&this.props.viewDetails.categoryName}</div>
			</div>
			<div className="review-form">
				<div className="reviewform-text1">Specification</div>
				<div className="reviewform-text2">{this.props.viewDetails&&this.props.viewDetails.veneu_spec_id&&this.props.viewDetails.veneu_spec_id.venue_spec_name}</div>
			</div>
			<div className="review-form">
				<div className="reviewform-text1">Venue Type</div>
				<div className="reviewform-text2">{this.getVenueType(this.props.viewDetails&&this.props.viewDetails.listingjson.venue.venue_type)}</div>
			</div>
			{this.props.viewDetails&&this.props.viewDetails.listingjson.venue.venue_type!='1'&&
			<div className="review-form">
				<div className="reviewform-text1">{this.getVenueType(this.props.viewDetails&&this.props.viewDetails.listingjson.venue.venue_type)}</div>
				{this.props.viewDetails.listingjson.venue.venue_type==2&&
				<div className="reviewform-text2">Minimum :{this.props.viewDetails&&this.props.viewDetails.listingjson.availability.venue_min_count} & Maximum :{this.props.viewDetails&&this.props.viewDetails.listingjson.availability.venue_max_count}</div>
				}
				{this.props.viewDetails.listingjson.venue.venue_type==3&&
				<div className="reviewform-text2">Maximum :{this.props.viewDetails&&this.props.viewDetails.listingjson.availability.venue_max_count}</div>
				}
			</div>
		}
			{this.props.viewDetails&&this.props.viewDetails.commonArray&&this.props.viewDetails.commonArray.map((obj)=>{
				return(
						<div className="review-form">
				<div className="reviewform-text1">{obj.spec_det_name}</div>
				<div className="reviewform-text2">{obj.spec_det_datavalue1}</div>
			</div>
					)
			})}
			{this.props.viewDetails&&this.props.viewDetails.veneu_spec_id&&this.props.viewDetails.veneu_spec_id.specDetails.map((obj)=>{
				return (
				<div className="review-form">
					<div className="reviewform-text1">{obj.spec_det_name}</div>
					<div className="reviewform-text2">{obj.spec_det_datavalue1}</div>
				</div>
					)
			})}
			
			<div className="review-form">
				<div className="reviewform-text1">Photos</div>
				<div className="reviewform-text2">{this.props.viewDetails&&this.props.viewDetails.fileList&&this.props.viewDetails.fileList.length} Photos</div>
			</div>
			{/*
			<div className="review-form">
				<div className="reviewform-text1">Ratecard</div>
				<div className="reviewform-text2">{this.props.viewDetails&&this.props.viewDetails.priceobj&&this.props.viewDetails.priceobj.priceobj.name} {this.props.viewDetails&&this.props.viewDetails.priceobj&&this.props.viewDetails.priceobj.amt} - Per {this.props.viewDetails&&this.props.viewDetails.priceobj&&this.props.viewDetails.priceobj.activeobj.title}</div>
			</div>
			*/}
			</div>
			
			{window.innerWidth<768&&
				<div className="ActionsReviewBtns"><button onClick={()=>this.props.changeActive(1)}>Edit</button><button onClick={()=>this.onSubmitReview()}>Submit</button></div>
			}
			</div>
			);
	}
}
