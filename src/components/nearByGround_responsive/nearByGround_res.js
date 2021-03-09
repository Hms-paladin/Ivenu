import React, { useState ,useEffect } from 'react';
import Swiper from 'react-id-swiper';
import './nearByGround_res.css';
import Popupbox from '../../components/popupbox/popupbox';
import Apilink from '../../helpers/apilink';
import Homeslidercontent from '../../components/homeslidercontent/homeslidercontent';


import { Navigation } from 'swiper/dist/js/swiper.esm';
var playarray={value:'id',name:'name',dropdown:[]}

 
// export default class NearByGround_res extends React.Component {
	
// 	constructor(props) {
// 		super(props);
// 	}
	
// 	render() {

const slider1=require("../../images/slider1.png");
const slider2=require("../../images/slider2.png");
const slider3=require("../../images/slider3.png");
const slider4=require("../../images/slider4.png");
const slider5=require("../../images/slider5.png");
const slider6=require("../../images/slider6.png");
const slider7=require("../../images/slider7.png");
const pluse=require("../../images/+.png");

class NearByGround_res extends React.Component {
 constructor(props) {
   super(props);
 
   this.state = {coords:{latitude:0,longitude:0},nearbyLocationData:[],categoryName:'',categoryDropdown:{id:'venue_cat_id','name':'venue_cat_name',dropdown:[]},activeData:null};
 }
componentWillReceiveProps(props){
  if(props.selectedFav){
    // alert(JSON.stringify(props.selectedFav));
       // navigator.geolocation.getCurrentPosition(position => {

    this.getNearbyLocation(this.state.coords,props.selectedFav.venue_cat_id,props.selectedFav.venue_cat_name);
  // })
  }
}
  		 
      categoryDropdownData=()=>{
    fetch(Apilink.apiurl+'listVenueCategory', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({user_cat_id:1}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    	var categoryDropdown=this.state.categoryDropdown;
    	this.setState({categoryDropdown});
    	categoryDropdown.dropdown=responseJson.data;

      // var categoryDropdown=this.state.categoryDropdown;
      // categoryDropdown.dropdown=responseJson.data;
      // this.setState({categoryDropdown});
      // alert(responseJson.data.length)
if(responseJson.data.length>0){
      this.setState({categoryName:responseJson.data.length>0&&responseJson.data[0].venue_cat_name});
       navigator.geolocation.getCurrentPosition(position => {
         this.setState({coords:position.coords});
      this.getNearbyLocation(position.coords,responseJson.data[0].venue_cat_id)
    })
    }
      // alert(JSON.stringify(responseJson));
        // var catDropdown=this.state.catDropdown;
    // catDropdown.dropdown=responseJson.data;
    // this.setState({catDropdown})
    // alert(JSON.stringify(responseJson.data));
    // alert(JSON.stringify(this.state.catDropdown.dropdown[0].venue_cat_name))
       // console.log("dropvalues",JSON.stringify(this.state.catDropdown));
    })  
  }
  componentWillMount(){
  	this.categoryDropdownData();
  }

   getNearbyLocation=(data,dataid,dataname)=>{
     this.setState({getNearbyLocation:[]});
  fetch(Apilink.apiurl+'nearbyLocation/', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({"lat":data.latitude,"long":data.longitude,"userCatId":"1","venueCatId":dataid}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    
      this.setState({activeData:null})
      // }
      if(dataname){
        this.setState({categoryName:dataname})
      }
     if(responseJson.data){
     	this.setState({nearbyLocationData:[]});

     }else{
     	// this.setState({categoryName:responseJson.length>0&&responseJson[0].venue_cat_name});
     	this.setState({nearbyLocationData:responseJson});
		// setNearbyPlayGround(responseJson)
     }
    })
  }
  loadCategoryDropdown=(data)=>{
     	this.setState({categoryName:data.venue_cat_name});
       // navigator.geolocation.getCurrentPosition(position => {
	this.getNearbyLocation(this.state.coords,data.venue_cat_id);
// })
  }
  ClickCard=(data)=>{
    // console.log(data);
    this.props.history.push('/moredetails/id='+data.venue_id);
    this.setState({activeData:data});

  }
  // const userdata=categoryListing();
  render(){
  	 const params = {
    slidesPerView:'auto',
      spaceBetween:12,
      freeMode:true,
      observer:true,
      pagination:{
        el:'.swiper-pagination',
        clickable:true,
      },
    };
  	  
		return (
		<div className="responsive_slider NearByGroundMob">
		<div className="responsive-nearby-ground-header">
		<div class="nearByStyle2">
		<span className="nearby-text2">Near by</span> 
		<Popupbox sendPopupData={(data)=>this.loadCategoryDropdown(data)} buttonText={this.state.categoryName} bold={true} dropdown={this.state.categoryDropdown}  buttonColor={'transparent'} buttonTextColor={'#103EB0'} popupColor={'white'} popupTextColor={'black'}/>
		</div>

       <div class="plusStyle">
       <div class="inlinePluss">       
       <img src={pluse } />
       </div>
       </div> 
       </div>
       {this.state.nearbyLocationData.length==0&&
       	<div className="norecords">No Records Found</div>
       }
		<Swiper {...params} modules={[Navigation]}>
		{this.state.nearbyLocationData.map((obj)=>{
			return(
<div><div className="nearbygroundsliderimg" onClick={()=>this.ClickCard(obj)}><img src={obj.photos.length>0&&obj.photos[0].venue_image_path} alt="Arrow Text" class="specialimg"/>
{this.state.activeData&&obj.venue_id==this.state.activeData.venue_id&&
<div className="circle_ground_flex">

      <div className="circle_ground">
        <i class="fa fa-check" aria-hidden="true"></i>
      </div>

      </div> 
    }
      </div>

		{/*<div class="res_homemakers">{obj.price.length>0&&obj.price[0].trn_venue_price_amt } - {obj.price.length>0&&obj.price[0].trn_venue_price_currency} </div>*/}
    <div class="res_homemakers">{obj.Distance} | {obj.Time}</div>
    <div class="res_homemakers">{obj.trn_venue_name} </div>
    {this.state.activeData&&(this.state.activeData.venue_id==obj.venue_id)&&
<div className="arrowupcss"></div>
    }
		</div>
				)
		})}
		</Swiper>

    {this.state.activeData&&
<Homeslidercontent history={this.props.history} refresHeader={()=>this.props.refresHeader&&this.props.refresHeader()} activeCategory={this.state.activeData}/>
    }

		</div>
		);
	}
	}

	export default NearByGround_res;