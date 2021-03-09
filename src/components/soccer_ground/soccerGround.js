import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from "react-slick";
import { Card,Rate,Row,Col,Icon  } from 'antd';
import { FontAwesome  } from "react-fontawesome";
import './soccerGround.css';
import './slick.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link,withRouter  } from "react-router-dom";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
import Apilink from '../../helpers/apilink';
import Popupbox from '../../components/popupbox/popupbox';
import Homeslidercontent from '../homeslidercontent/homeslidercontent';
import LoginSignupModel from '../LoginSignupModel/LoginSignupModel';
import { Player,PosterImage ,BigPlayButton } from 'video-react';
import imageloader from '../../images/skeleton.gif';
const RightArrow=require("../../images/right.png");
const pluse=require("../../images/+.png");
const birthdayImg1=require("../../images/birthdayImg1.png");
const propTypes = {
  player:PropTypes.object,
  className:PropTypes.string
}; 
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
function LeftNavButton(props){
	const {className,style,onClick} =props;
	return(

    <div
//className="slick-arrow"
className={className}
style={{ ...style, display:"block" }}
onClick={onClick} >
</div>
)
} 
function RightNavButton(props){
	const {className,style,onClick} =props;
	return(

    <div
  //className="slick-arrow"
  // style={{...style}}
  className={className}
  style={{ ...style, display:"block" }}
  onClick={onClick} >
  </div>
  )
} 
var circle_array=[{id:1,isChecked:false},{id:2,isChecked:false},{id:3,isChecked:false},{id:4,isChecked:false},{id:5,isChecked:false},{id:6,isChecked:false},{id:7,isChecked:false}]
export default class SoccerGround extends React.Component{
	constructor(props){
		super(props);
		this.state={
      circleopen:false,
      circle_array:[],
      checkarray:false,
      searchedVenue:null,
      currentLatLng:{
        latitude:0,
        longitude:0
      },
      activeCategory:null,
      LoginModelVisible:false,
      imageStatus:null
      

    }
  }
  componentWillReceiveProps(props){
    console.log("propssoccer",props);
    if(props.searchedVenue){
this.setState({searchedVenue:props.searchedVenue})
      this.setState({activeCategory:null},function(){
         var scrollHeight=document.querySelector('.soccerGroundDivHeight').offsetTop;
         if(this.props.scroll==true){
        window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
      }
    //       window.addEventListener("scroll", function(){
    //   console.log("scrolling up");

    // })
      })
    }
  }

  radioChange=(e,index,item)=>{
    console.log(e.target);
    var circle_array=this.state.circle_array;
    circle_array.map(v=>v.isChecked=false);
    var self=this;
      // alert(item.venue_id);
      this.props.history.push('/moredetails/id='+item.venue_id);
    // this.setState({activeCategory:item});
    // this.setState({checkarray:true})

    console.log("checked",this.state.circle_array)
  }

  getCurrentPosition=()=>{
    var self=this;
    navigator.geolocation.getCurrentPosition(position => {
        // console.log("currentLocationHandler",position);
      this.setState({
        currentLatLng:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta:0.005,
          longitudeDelta:0.005,
          coords:position.coords
        }
      },function(){

        this.corporateNearYou();
      });
      console.log("latitude",position.coords.latitude);
      console.log("longitude",position.coords.longitude);
      Geocode.setApiKey("AIzaSyCWz6j4QkvLgAJlTmvFxbrI-sH1sVx9Bgc");
    Geocode.enableDebug();
    // this.getAddress(position.coords.latitude,position.coords.longitude);
   
  });
}
 handleImageLoaded(item) {
   item.imageStatus=true;
   var self=this;
   setTimeout(()=>{
    self.setState({ imageStatus:true});
  },3000);
  }

  handleImageErrored(item) {
   item.imageStatus=null;
    // this.setState({ imageStatus:false });
  }
  cancelActive=()=>{
    
           this.setState({activeCategory:null});
      var scrollHeight=document.querySelector('.soccerGroundDivHeight').offsetTop;
        window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
        
       
    // this.setState({activeCategory:null})
  }
corporateNearYou=()=>{
  // var lat=this.state.currentLatLng.latitude;
  // console.log("lati",this.state.currentLatLng.latitude)
  fetch(Apilink.apiurl+'nearbyLocation/', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({"lat":this.state.currentLatLng.latitude,"long":this.state.currentLatLng.longitude,"userCatId":'1'}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
     this.setState({circle_array:responseJson});
      console.log(responseJson)
    })
  }
  AddVenue=()=>{
    this.setState({LoginModelVisible:true});
    //    var setIntervalFunction=setInterval(function(){
    //  if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
    //      var scrollHeight=document.querySelector('.individiualFormDiv');
    // if(scrollHeight){
    // scrollHeight=scrollHeight.offsetTop-100
    // window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
    // clearInterval(setIntervalFunction);
    // }else{

    // }
    // }
    // console.log("intervalseconds");
    //    },1000);
    // this.props.addvenueProps&&this.props.addvenueProps(1);
  }
  LoginLoad=()=>{
    this.props.history.push('/addIndividualform/');
  }
  componentWillMount(){
    // this.getCurrentPosition();
    
  }
  render(){
    const settings = {
      dots:true,
      infinite:false,
      speed:500,
      dotsClass:"slick-dots soccerGround-slick-dots",
      slidesToShow:4,
      slidesToScroll:4,
      draggable:false,
      responsive:[
      {
        breakpoint:1300,
        settings:{
          slidesToShow:3,
          slidesToScroll:3,
          infinite:false,
          centerMode:true,
          dots:true
        }
      },
      {
        breakpoint:1100,
        settings:{
          slidesToShow:2,
          slidesToScroll:2,
          centerMode:true,
          infinite:false,
          dots:true
        }
      },
      {
        breakpoint:900,
        settings:{
          slidesToShow:2,
          slidesToScroll:2,
          infinite:true,
          dots:true
        }
      },
      {
        breakpoint:768,
        settings:{
          slidesToShow:2,
          slidesToScroll:2,
          centerMode:false,
          initialSlide:2
        }
      },
      {
        breakpoint:600,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      }
      ]

    };
    return(
      <div className="soccer-width soccerGroundDivHeight">

      <div className="slider-button-remove" style={{width:'100%',backgroundColor:'#fff',position:'relative'}}>

      <div className="">

      <div className="slider-inline-header">
        
      <div class="nearByStyle">
      <span className="title-font-slider">
      {this.props.categoryName}</span>
      <div class="ivenustyle">
 <Popupbox buttonText="Near You"  dropdown={{dropdown:[]}}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>

      </div>   
      </div>

      <div class="plusStyle">
       <div class="inlinePluss" onClick={()=>this.AddVenue()}>       
       <img src={pluse }  />
       </div>
      </div>

      </div>

      

      </div>
      
      <div className="soccerclass">
      {this.state.activeCategory&&
      <div className="closeSoccerGround" onClick={()=>this.cancelActive()}><i className="fa fa-times-circle-o"></i></div>
    }
      <Slider {...settings} edgeFriction={0}>
      {this.state.searchedVenue && this.state.searchedVenue.map((item,key) =>{
        return(
      
      <div>
      <Card
      // title="Default size card"
      // extra={<a href="#">More</a>}
      
      >
      <div style={{flex:1,marginTop:'10px'}}>
      <div style={{flex:.3}}>
      
      
      <Row gutter={24}>
      <Col className="gutter-row" span={24} style={{textAlign:"left"}}>
      <Rate  className="ratecolor" allowHalf defaultValue={4} />
      </Col>
      
      </Row>
      </div>
      <input className="input_round" type="radio" name="circleClick" id={'radio'+key} checked={this.state.activeCategory&&this.state.activeCategory.venue_id==item.venue_id} onClick={(e)=>this.radioChange(e,key,item)}/>
      <label className="lable_radio" for={'radio'+key}>

       

          <div style={{flex:.7,marginTop:'5px',borderRadius:'50px',position:'relative'}} >
      <div className="circle_ground_flex">

      <div className="circle_ground">
        <i class="fa fa-check" aria-hidden="true"></i>
      </div>

      </div> 
      
      <img onLoad={()=>this.handleImageLoaded(item)}
           style={{width:"100%"}} src={item.imageStatus?(item.photos.length>0&&item.photos[0].venue_image_path):imageloader} alt="Arrow Text" class="specialimg"/>
           {(item.trn_venue_type==2 ||item.trn_venue_type==3)&&
           <div className="tagViewVenueType">{(item.trn_venue_type==2&& `${item.price.length} Pax Package` || item.trn_venue_type==3 && `${item.price.length} Seat Package`)} </div>
         }
   
      </div>
         

      <div style={{fontSize:"22px",display:"flex",flexWrap:"wrap", textAlign:"left"}}>
      <div>
      <div className="text_size-1">{item.trn_venue_name}</div>
      <div className="text_size-2">{item.trn_venue_address}</div>
      </div>

      </div>
      <div className="Linebefore"></div>
      </label>
{item.Distance&&
      <div className="">

          <span className="Km-span">{item.Distance}</span>

          <span className="min-span">{item.Time}</span>

      </div>
    }
      </div>
      </Card>


      <div className={this.state.activeCategory&&this.state.activeCategory.venue_id==item.venue_id?"main-menu main-menu-select":"main-menu"}>
        
        
      </div>

      </div>
       )
      } )}

    </Slider>
    </div>
    </div>
    {this.state.activeCategory&&
<Homeslidercontent history={this.props.history} addvenueProps={(data)=>this.props.addvenueProps&&this.props.addvenueProps(data)} refresHeader={()=>this.props.refresHeader&&this.props.refresHeader()} activeCategory={this.state.activeCategory}/>
}
 {this.state.LoginModelVisible == true && 
  <div>
  <LoginSignupModel loginttype={"Book Your Venue"}  videomodalPopup={false} visible={true} clospopup={()=>this.setState({LoginModelVisible:false})} type='login'  LoginLoad={(data)=>{this.LoginLoad(data); this.setState({LoginModelVisible:false})}} />
</div>
}

    </div>
    )
}
componentDidMount(){
      if(this.props.searchedVenue){
this.setState({searchedVenue:this.props.searchedVenue})
      this.setState({activeCategory:null},function(){
         var scrollHeight=document.querySelector('.soccerGroundDivHeight').offsetTop;
        window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
      })
    }

}

}
