import React from 'react';
import './homeslidercontent.css';
import Pop_Up_Center from '../Pop_Up_Center/Pop_Up_Center';
import 'bootstrap/dist/css/bootstrap.css';
import { Rate,message,Button } from 'antd';
import Apilink from '../../helpers/apilink';
import { Modal } from 'antd';
import CarouselImages from '../../pages/carouselImages';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import history from '../../helpers/history'; 
import {BrowserRouter as Router} from 'react-router-dom';
const Star=require("../../images/starone.png");
const Sports=require("../../images/sport.jpg");

export default class Homeslidercontent extends React.Component {

constructor(props) {
  super(props);
  this.state = {
  	status:0,
  	BookVisible:false,
  	activeBookObj:null,
  	LoginModelVisible:false,
  	activeCategory:props.activeCategory,
  	PhotoVisible:null
  };

}
componentDidMount(){
	if(this.props.location){
// this.state.activeCategory=this.props.location.state.activeCategory;
this.setState({activeCategory:this.props.location.state.activeCategory})
}
this.props.receiveProps&&this.props.receiveProps(this.props);
	// alert('');
	// document.querySelector('.HomesliderDivPageContent').
	   var scrollHeight=document.querySelector('.HomesliderDivPageContent').offsetTop;
	   window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
}
componentWillReceiveProps(props){
	// this.setState
	if(props.activeCategory){
		this.setState({activeCategory:props.activeCategory})
	}
	console.log("venuecategoyr",props);
	if(window.innerWidth>767){
	 var scrollHeight=document.querySelector('.HomesliderDivPageContent').offsetTop;
	   window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
	}
}
BookNow=(data)=>{
	 var venueId=data.venue_id;
  this.props.addvenueProps&&this.props.addvenueProps(1);
  this.props.history.push('/moredetails/id='+venueId);
	// alert(venueId);

// 	if(window.localStorage['LoginStatus']){

// this.setState({activeBookObj:data},function(){
// 	this.setState({BookVisible:true});
// })
// }else{
// 	// alert("notloggedin");
// 	this.setState({LoginModelVisible:true});

// }
}
loadphotocarousel=(data)=>{
	this.setState({PhotoVisible:data})
}
renderpricetype=(data)=>{
		if(data){
			if(data=='1'){
				return "Hour";
			}else if(data=='2'){
				return "Day"
			}else if(data=='3'){
				return "Week"
			}else {
				return "Month"
			}
		}
	}
favoriteadd=(data)=>{
console.log("data",data);
this.setState({status:this.state.status==1?0:1})
	fetch(Apilink.apiurl+'addFavourite/', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({userId:"32","venue_id":'1',status:this.state.status==1?true:false}),
		}).then((response)=>response.json())
		.then((responseJson)=>{
			console.log(responseJson);
			if(this.state.status==1){
				this.setState({status:true})
				 message.success('Favourite Added in your List');
				console.log("true")
			}else if(this.state.status==0){
				this.setState({status:false})
				message.error('Your Favourite Deleted from List');
				console.log("false")
			}
			// this.setState({"ListVenueType":responseJson.data,loading:false})
			
		})
}
LoginLoad=(data)=>{
	// this.props.refresHeader&&this.props.refresHeader();
this.BookNow(this.props.activeCategory);
// 	if(this.props.sendLoginData){
// this.props.sendLoginData(data);
// }
}
clospopup=()=>{
	this.setState({LoginModelVisible:false});
}
	render() {
		console.log("propsnext",this.props);
				const venudetails=this.state.activeCategory?this.state.activeCategory:null;
		const availability=venudetails&&venudetails.availability.length>0?venudetails.availability[0]:null;
		// console.log(this.props);
		return (
			<div className="slider-content-res-width slider-content-padding HomesliderDivPageContent">
<div className="BackDropContent">
</div>
				<div className="slider-content-res-width-align">
				<div className="slider-content-flex">			
					<div className="slider-content-header">{this.state.activeCategory&&this.state.activeCategory.trn_venue_name}</div>
					<div className="slider-content-star" ><Rate onChange ={this.favoriteadd} value={this.state.status}  allowClear={false}  count={1}/></div>
				</div>
				</div>

				<div className="slider-content-res-width-align">
				 
				<div className="slider-content-flex-main">
					<div className="slider-content-image">
						<div className="slider-content-image-sport" onClick={()=>this.loadphotocarousel(this.props.activeCategory?this.props.activeCategory.photos:[])}>
						<img className="img-responsive" src={this.props.activeCategory&&this.props.activeCategory.photos.length>0&&this.props.activeCategory.photos[0].venue_image_path} alt="Sports" />
						</div>
						<div className="slider-content-5star">
						
							<Rate allowClear={false} defaultValue={4} />
												</div>
					</div>
					<div className="slider-content-content">
						<div className="slider-content-position">
						<div className="slider-content-top">

						<p style={{height:'auto',marginTop:0,marginBottom:5}}>{(this.state.activeCategory&&this.state.activeCategory.trn_venue_type==2&& 'Per Pax' || this.state.activeCategory&&this.state.activeCategory.trn_venue_type==3 &&'Per Seat ')} {this.state.activeCategory&&this.state.activeCategory.price.length>0&&(this.state.activeCategory.price[0].trn_venue_price_amt +" - "+ this.state.activeCategory.price[0].trn_venue_price_currency )}</p>
						{this.state.activeCategory&&this.state.activeCategory.Distance &&this.state.activeCategory.Distance&&
						<div className="slider-content-left homesliderconentPrice">
							<span className="slider-content-km">{this.state.activeCategory&&this.state.activeCategory.Distance &&this.state.activeCategory.Distance}</span>
							<span className="slider-content-border"></span>
							<span className="slider-content-Min">{this.state.activeCategory&&this.state.activeCategory.Time &&this.state.activeCategory.Time}</span>
						</div>
					}
						<p className="addellipsisClamp4">
							{this.state.activeCategory&&this.state.activeCategory.trn_venue_desc}
						</p>
						</div>
						<div className="slider-content-bottom">

						{this.state.activeCategory&&this.state.activeCategory.Distance &&this.state.activeCategory.Distance&&
						<div className="slider-content-left" style={{visibility:'hidden'}}>
							<span className="slider-content-km">{this.state.activeCategory&&this.state.activeCategory.Distance &&this.state.activeCategory.Distance}</span>
							<span className="slider-content-border"></span>
							<span className="slider-content-Min">{this.state.activeCategory&&this.state.activeCategory.Time &&this.state.activeCategory.Time}</span>
						</div>
					}

						<div className="slider-content-button-div">
							<button onClick={()=>this.BookNow(this.state.activeCategory)} className="slider-content-button">Book Now</button>
						</div>
						</div>
						</div>

					</div>

				</div>

				</div>

				<div className="slider-content-list-item slider-content-res-width-align">
								<div className="amenitiesicoflex">{this.state.activeCategory&&this.state.activeCategory.ameneties.length>0&&this.state.activeCategory.ameneties.map((obj)=>{
return(
<div className="amenitiesico"><img src={obj.amenities_icon} style={{width:16,height:16}}/>{obj.amenities_name}</div>
  )

     })}</div>
					<div className="slider-content-list">
						{this.state.activeCategory&&this.state.activeCategory.trn_venue_type==2&&
				<span >Per PAX</span>
			}
			{this.state.activeCategory&&this.state.activeCategory.trn_venue_type==3&&
				<span >Per Seats</span>
			}
			{this.state.activeCategory&&(this.state.activeCategory.trn_venue_type!=2 && this.state.activeCategory.trn_venue_type!=3)&&
				<span >Per {availability&&this.renderpricetype(availability?availability.trn_availability_type:null)}</span>
			}
						{this.state.activeCategory&&this.state.activeCategory.price.length>0&&
						 <span> {this.state.activeCategory.price[0].trn_venue_price_currency} {this.state.activeCategory.price[0].trn_venue_price_amt}</span>
						}
					</div>
				</div>
				{this.state.PhotoVisible&&
					<Modal  className="photosmodalcarousel" title="" visible={true}  onOk={()=>this.setState({PhotoVisible:null})} onCancel={()=>this.setState({PhotoVisible:null})}>
					<CarouselImages photos={this.state.PhotoVisible}/>
					</Modal>
				}
				{this.state.BookVisible==true&&
				<Modal
				 className="popupboxcentermodal"
          visible={this.state.BookVisible}
          footer={null}
          
          onOk={this.handleOk}
          onCancel={()=>this.setState({BookVisible:false})}
        >

       <Pop_Up_Center clearData={true} closePopupCenter={()=>this.setState({BookVisible:false})} bookobj={this.state.activeBookObj}/>
        </Modal>
    }
     {this.state.LoginModelVisible == true && 
  <div>
  <LoginSignupModel loginttype={"Book Your Venue"}  videomodalPopup={false} visible={true} clospopup={this.clospopup} type='login'  LoginLoad={(data)=>{this.LoginLoad(data); this.setState({LoginModelVisible:false})}} />
</div>
}

			</div>



			


		);
	}
}
