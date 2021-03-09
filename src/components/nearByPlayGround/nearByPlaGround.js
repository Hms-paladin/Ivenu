// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from "react-slick";
import { Card,Rate,Row,Col,Icon,Button  } from 'antd';
import { BrowserRouter as Router, Route, Link,withRouter  } from "react-router-dom";
import Pop_Up_Center from '../../components/Pop_Up_Center/Pop_Up_Center';
import Apilink from '../../helpers/apilink';
import Popupbox from'../../components/popupbox/popupbox';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import './nearByPlayGround.css';
import { Modal,Popover } from 'antd';
var loginaction="";
const slider1=require("../../images/slider1.png");
const slider2=require("../../images/slider2.png");
const slider3=require("../../images/slider3.png");
const slider4=require("../../images/slider4.png");
const slider5=require("../../images/slider5.png");
const slider6=require("../../images/slider6.png");
const slider7=require("../../images/slider7.png");
const RightArrow=require("../../images/arrow_icon.svg");
const slider8=require("../../images/slider8.png");
const pluse=require("../../images/+.png");

function LeftNavButton(props){
  const {className,style,onClick} =props;
  return(

    <div
//className="slick-arrow"
className={className}
style={{ ...style, display:"block",marginRight:'9px' }}
onClick={onClick} >
<img src={RightArrow} alt="Arrow Text" style={{width:'25px',height:'11px','margin-left':'2px',transform:" rotate(270deg)", position:"absolute",right:"14px"}}/>
</div>
)
} 
class NearByPlayGround extends React.Component{
  constructor(props){
    super(props);
    this.state={BookVisible:false,activeBookObj:null,LoginModelVisible:false,
      corporatedata:[],categoryName:'',categoryDropdown:{id:'venue_cat_id','name':'venue_cat_name',dropdown:[]}

    }
  }
componentWillReceiveProps(props){
  console.log("props",props);
  if(props.nearbyCategory){
    this.getNearbyLocation(props.getlocation,props.nearbyCategory.venue_cat_id)
    this.setState({categoryName:props.nearbyCategory.venue_cat_name})
  }
  if(props.getlocation){
    // this.getNearbyLocation(props.getlocation);
  }
}
    categoryListing=()=>{
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
      categoryDropdown.dropdown=responseJson.data;
      this.setState({categoryDropdown});
      this.getNearbyLocation(this.props.getlocation,responseJson.data.length>0?responseJson.data[0].venue_cat_id:0);
      this.setState({categoryName:responseJson.data.length>0&&responseJson.data[0].venue_cat_name})
      // alert(JSON.stringify(responseJson));
        // var catDropdown=this.state.catDropdown;
    // catDropdown.dropdown=responseJson.data;
    // this.setState({catDropdown})
    // alert(JSON.stringify(responseJson.data));
    // alert(JSON.stringify(this.state.catDropdown.dropdown[0].venue_cat_name))
       // console.log("dropvalues",JSON.stringify(this.state.catDropdown));
    })  
  }
getNearbyLocation=(data,dataid)=>{
  console.log("location",data);
  fetch(Apilink.apiurl+'nearbyLocation/', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({"lat":data.latitude,"long":data.longitude,"userCatId":"1","venueCatId":dataid}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      console.log('response',responseJson);
      if(responseJson.data){
        this.setState({corporatedata:[]})
        return;
      }
     this.setState({corporatedata:responseJson});
      console.log("response",responseJson)
    })
  }
  loadCategoryDropdown=(data)=>{
      this.setState({categoryName:data.venue_cat_name})

    this.getNearbyLocation(this.props.getlocation,data.venue_cat_id);
  }
  componentWillMount(){
    this.categoryListing();
     if(this.props.getlocation){
    
  }
  }
  AddVenue=()=>{
    loginaction='addvenue';
    this.setState({LoginModelVisible:true});
    //    var setIntervalFunction=setInterval(function(){
    //  if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
    //      var scrollHeight=document.querySelector('.individiualFormDiv');
    //      var scrollHeight1=document.querySelector('.corporateFormDiv');
    //      console.log(scrollHeight);
    // if(scrollHeight){
    // scrollHeight=scrollHeight.offsetTop-100
    // window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
    // clearInterval(setIntervalFunction);
    // }else{
    //   if(scrollHeight1){
    //       scrollHeight1=scrollHeight1.offsetTop-100
    // window.scrollTo({left:0,top:scrollHeight1, behavior:'smooth'});
    // clearInterval(setIntervalFunction);
    //   }
    // }
    // }
    // console.log("intervalseconds");
    //    },1000);
    // this.props.addvenueProps&&this.props.addvenueProps(1);
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
  bookthisVenue=(item)=>{
      // alert(JSON.stringify(item));
    this.props.addvenueProps&&this.props.addvenueProps(1);
      this.props.history.push('/moredetails/id='+item.venue_id);
// this.setState({activeBookObj:item});
//  if(window.localStorage['LoginStatus']){
//       this.setState({activeBookObj:item},function(){
//         this.setState({BookVisible:true});
//       })
//     }else{
//       this.setState({LoginModelVisible:true})
//     }

  }
  LoginLoad=()=>{
    // if()
    this.props.history.push('/addIndividualform/');
    // this.props.refresHeader&&this.props.refresHeader();
    // this.bookthisVenue(this.state.activeBookObj);
  }
  render(){
    const settings = {
      dots:true,
      dotsClass:"slick-dots near-slick-special",
      infinite:false ,
      speed:500,
      slidesToShow:2,
      slidesToScroll:2,
      rows:this.state.corporatedata.length>2?2:1,
      draggable:false,
      responsive:[
      {
        breakpoint:1490,
        settings:{
          slidesToShow:2,
          slidesToScroll:2,
          infinite:false,
          dots:true
        }
      },
      {
        breakpoint:1024,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
          infinite:false,
          dots:true
        }
      },
      {
        breakpoint:768,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
          initialSlide:1,
          variableWidth:false
        }
      },
      {
        breakpoint:480,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      }
      ]
      // slidesPerRow:2

    };
    const firstnode = {
      dots:false,
      dotsClass:"slick-dots slick-special1",
      infinite:true ,
      speed:500,
      slidesToShow:2,
      slidesToScroll:2,

      nextArrow:<LeftNavButton />,
      responsive:[
      {
        breakpoint:1024,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
          infinite:true,
          dots:false
        }
      },
      {
        breakpoint:600,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
          initialSlide:1,
          variableWidth:true
        }
      },
      {
        breakpoint:480,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      }
      ]

    };

    
    return(
      <div>
      
      <div className="nearByPlayGround">
      <div class="h1style">
      <div className="nearby-div">
      <div class="nearByStyle">
      Near By 
     <Popupbox buttonText={this.state.categoryName} sendPopupData={(data)=>this.loadCategoryDropdown(data)}  dropdown={this.state.categoryDropdown}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>  
      </div>

       <div class="plusStyle">
       <div class="inlinePluss" onClick={()=>this.AddVenue()}>       
       <img src={pluse }  />
       </div>
       </div> 
      </div>
       </div>
         {this.state.corporatedata.length==0&&
      <div className="norecords">No Records</div>
    }
      <div>
    
      <Slider {...settings}  className="flexWidth">
{this.state.corporatedata.length>0&&this.state.corporatedata.map((item)=>{
  const secondnode = {
      dots:false,
      dotsClass:"slick-dots slick-special2",
      infinite:true ,
      speed:500,
      slidesToShow:item.photos.length>=2?2:1,
      slidesToScroll:item.photos.length>=2?2:1,
      nextArrow:<LeftNavButton />,
      responsive:[
      {
        breakpoint:1450,
        settings:{
            slidesToShow:item.photos.length>=2?2:1,
          slidesToScroll:item.photos.length>=2?2:1,
          infinite:true,
          dots:false
        }
      },
      {
        breakpoint:1024,
        settings:{
          slidesToShow:item.photos.length>=2?2:1,
          slidesToScroll:item.photos.length>=2?2:1,
          infinite:true,
          dots:false
        }
      },
      {
        breakpoint:600,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
          initialSlide:1
        }
      },
      {
        breakpoint:480,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      }
      ]

    };
  return(

<div class="cardpadd">
      <Card>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
      <div style={{flex:.3}} className="widthCalc"> 
      <div class="homemakers">{item.trn_venue_name} </div>
      <Button className="training_btn">{item.Distance} | {item.Time}&nbsp;</Button>
        <Row gutter={24}>
      <Col className="gutter-row addtrain" span={14} ><span class="bookVenuLeft" onClick={()=>this.bookthisVenue(item)}>
      Book this Venue<img src={RightArrow} class="bookVenuIcon"/></span>
      </Col>
      <Col className="gutter-row" span={10} style={{textAlign:'right','font-weight':'bold',padding:'5px',marginLeft:'-17px'}}>
      
      </Col>
      </Row>
      </div>
      
      </div>

      <Slider {...secondnode}>
      {item.photos.length==0&&
         <div style={{flex:1}}>
      
      <div style={{flex:.7,marginTop:'5px',borderRadius:'50px',position:'relative'}}>
      <img src={''} alt="Arrow Text" class="specialimg"/>
      <Rate className="rateup" allowHalf defaultValue={3.5} />
      </div>
      </div>
      }
{item.photos.map((obj)=>{
  return(
 <div style={{flex:1}}>
      
      <div style={{flex:.7,marginTop:'5px',borderRadius:'50px',position:'relative'}}>
      <img src={obj.venue_image_path} alt="Arrow Text" class="specialimg"/>
      <Rate className="rateup" allowHalf defaultValue={3.5} />
      </div>
      </div>
      
    )
})}
     
      </Slider>
      <div className="PriceCard" style={{marginTop:12}}>
     {item&&(item.trn_venue_type==2 || item.trn_venue_type==3)&&
          <div>
          {<span className="taghourcoast">{item.price.length} {item.trn_venue_type==2?'Pax':'Seat'}</span>}
          </div>
     }
      {item&&(item.trn_venue_type!=2 && item.trn_venue_type!=3)&&
        <div>
          {item.price.length>0&&item.price[0].hour_cost>0&&<span className="taghourcoast"> Hourly {item.price.length>0&&item.price[0].hour_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].day_cost>0&&<span className="taghourcoast">Daily {item.price.length>0&&item.price[0].day_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].week_cost>0&&<span className="taghourcoast">Weekly {item.price.length>0&&item.price[0].week_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].month_cost>0&&<span className="taghourcoast">Montly {item.price.length>0&&item.price[0].month_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        </div>
      }
       </div>
     <div className="amenitiesicoflex">{item.ameneties.length>0&&item.ameneties.filter((obj2,index)=>index<3).map((obj)=>{
return(
<div className="amenitiesico"><img src={obj.amenities_icon} style={{width:16,height:16}}/>{obj.amenities_name}</div>
  )

     })} {item.ameneties.length>0&&item.ameneties.length>3&&<Popover content={<div className="amenitiesicoflex1">{item.ameneties.length>0&&item.ameneties.filter((obj2,index)=>index>2).map((obj)=>{
return(
<div className="amenitiesico width100"><img src={obj.amenities_icon} style={{width:16,height:16}}/>{obj.amenities_name}</div>
  )

     })}</div>} >
    <Button className="moredetails_amns" type="primary">+ {item.ameneties.length-3} more</Button>
  </Popover>}</div>
      </Card>
      </div>
      

    )
})}

      

      
       



      </Slider>
      </div>
      </div>
      <div class="lightborder"></div>
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
  <LoginSignupModel loginttype={"Book Your Venue"}  videomodalPopup={false} visible={true} clospopup={()=>this.setState({LoginModelVisible:false})} type='login'  LoginLoad={(data)=>{this.LoginLoad(data); this.setState({LoginModelVisible:false})}} />
</div>
}
      </div>
      )
}
}


export default withRouter(NearByPlayGround);