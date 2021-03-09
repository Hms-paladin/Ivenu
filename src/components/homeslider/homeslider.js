import React, { Component } from 'react';
import './homeslider.css';
import sliderimage from '../../images/sliderimage.PNG';
import imageloader from '../../images/imageloader.png';
import arrow_icon from '../../images/arrow_icon.svg';
import Apilink from '../../helpers/apilink';
import Pop_Up_Center from '../../components/Pop_Up_Center/Pop_Up_Center';
import { BrowserRouter as Router, Route, Link,withRouter,useParams  } from "react-router-dom";
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import CarouselImages from '../../pages/carouselImages';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'antd';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)


const items = [
{
  id:1, 
},
{
  id:2,
},
{
  id:3,
}
];

 class Homeslider extends Component {
  constructor(props) {
    super(props);
      console.log("nextslider",props);
    this.state = { activeIndex:0,dummyRefreshState:false,numberoflines:3,homeslider:[],imageStatus:false,activeBookObj:null,BookVisible:false,LoginModelVisible:false,PhotoVisible:null };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.homeslider.length - 1 ? 0 :this.state.activeIndex + 1;
    this.setState({ activeIndex:nextIndex });
    this.setState({dummyRefreshState:!this.state.dummyRefreshState});
    this.setState({numberoflines:3})
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.homeslider.length - 1 :this.state.activeIndex - 1;
    this.setState({ activeIndex:nextIndex });
    this.setState({dummyRefreshState:!this.state.dummyRefreshState});
    this.setState({numberoflines:3})
  }
  handleReflow = (rleState) => {
    const {
      clamped,
      text,
    } = rleState
  }
 
  goToIndex(newIndex) {
    // if (this.animating) return;
    // this.setState({ activeIndex:newIndex });
  }
  resizeFunction=()=>{
    // console.log("resizing");
    // this.setState({dummyRefreshState:!this.state.dummyRefreshState});
  }
  componentWillReceiveProps(props){
    // console.log(props.displaySlider);
    if(props.displaySlider){
      this.setState({homeslider:props.displaySlider},function(){
           var scrollHeight=document.querySelector('.HomesliderDivPage').offsetTop;
           if(props.scroll==true){
        window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
      }
      });
    }
  }
    handleImageLoaded(item,key) {
      var homeslider=this.state.homeslider;
      // item.imageStatus=true;
      homeslider[key].imageStatus=true;

    this.setState({ imageStatus:true,homeslider:homeslider});
  }

  handleImageErrored(item,key) {
    this.setState({ imageStatus:false });
      var homeslider=this.state.homeslider;
      homeslider[key].imageStatus=null;
      this.setState({homeslider});
  }
  LoginLoad=()=>{
    // this.props.refresHeader&&this.props.refresHeader();
    // this.BookNow(this.state.homeslider[this.state.activeIndex]);
  }
  BookNow=(data)=>{
  // console.log(data);
  // alert(JSON.stringify(data));
  var venueId=data.venue_id;
  this.props.addvenueProps&&this.props.addvenueProps(1);
  this.props.history.push('moredetails/id='+venueId);
  // alert(venueId);
//   if(window.localStorage['LoginStatus']){

// this.setState({activeBookObj:data},function(){
//   this.setState({BookVisible:true});
// })
// }else{
// //   // alert("notloggedin");
//   this.setState({LoginModelVisible:true});

// }
}
loadCarouselImages=(data)=>{
this.setState({PhotoVisible:data})
}
  render() {
    // console.log(this.state);
    const { activeIndex } = this.state;

    const slides = this.state.homeslider.map((item,key) => {
      return (
        <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={this.onExiting}
        onExited={this.onExited}
        >
        <div className="slider-width-content">
        <div className="slider-res-width">
        <div className="">
        <span className="slider-header">{item.trn_venue_name}</span>
        </div>
        <div className="slider-flex slider-Mar-padd-remove">

        <div className="slider-image-div">

        <div className="slider-image" onClick={()=>this.loadCarouselImages(item.photos?item.photos:[])}>

        <img onLoad={()=>this.handleImageLoaded(item,key)}
          onError={()=>this.handleImageErrored(item,key)} src={item.imageStatus?(item.photos.length>0&&item.photos[0].venue_image_path):imageloader} alt="Logo" />

        </div>
        
        </div>
        <div className="slider-content">
        <div className="Homeslider PriceCard" >
         {item&&(item.trn_venue_type==2 || item.trn_venue_type==3)&&
          <div>
          {<span className="taghourcoast">{item.price.length} {item.trn_venue_type==2?'Pax':'Seat'}</span>}
          </div>
     }
        {(item.trn_venue_type!=2 && item.trn_venue_type!=3 && item.price)&&
        <div>

       {item.price.length>0&&item.price[0].hour_cost>0&&<span className="taghourcoast"> Hourly {item.price.length>0&&item.price[0].hour_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].day_cost>0&&<span className="taghourcoast">Daily {item.price.length>0&&item.price[0].day_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].week_cost>0&&<span className="taghourcoast">Weekly {item.price.length>0&&item.price[0].week_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}
        {item.price.length>0&&item.price[0].month_cost>0&&<span className="taghourcoast">Montly {item.price.length>0&&item.price[0].month_cost } {item.price.length>0&&item.price[0].trn_venue_price_currency}</span>}

         </div>}
        <div className="distance">{item.Distance} | {item.Time}</div>
        </div>
      
        <div className="addellipsisClamp">{item&&item.trn_venue_desc}
      </div>
        </div>
        </div>

        </div>
        </div>

        </CarouselItem>

        );
    });

    return (

      <div className="slider-res-width slider-res-relative HomesliderDivPage">
      {this.state.PhotoVisible&&
          <Modal  className="photosmodalcarousel" title="" visible={true}  onOk={()=>this.setState({PhotoVisible:null})} onCancel={()=>this.setState({PhotoVisible:null})}>
          <CarouselImages photos={this.state.PhotoVisible}/>
          </Modal>
        }
      <Carousel
      activeIndex={activeIndex}
      autoPlay={false}
      indicators={false}
      controls={false}
      >
      {slides}      
      <div className="slide-actionbtn">
      {this.state.homeslider.length>0&&
      <div className="slider-footer">
      {this.state.homeslider.length>1&&

      <div className="slider-control-left">
      <img className="slider-arrow-left" onClick={this.previous} src={arrow_icon} alt="aroow-left" />
      <span> {this.state.activeIndex+1} of {this.state.homeslider.length} </span>
      <img className="slider-arrow-right" onClick={this.next} src={arrow_icon} alt="aroow-right" />
      
      </div>
        }
      <div className="slider-booknow-button">
      <button className="slider-button" onClick={()=>this.BookNow(this.state.homeslider[this.state.activeIndex])}>Book Now</button>
      </div>
    
      </div>
}
{this.state.BookVisible==true&&
        <Modal
         className="popupboxcentermodal"
          visible={this.state.BookVisible}
          back
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
      </Carousel>
{this.state.homeslider.length>0&&
  <div style={{margin:'18px auto 12px auto',width:'95%'}} className="amenitiesicoflex">{this.state.homeslider[this.state.activeIndex].ameneties.length>0&&this.state.homeslider[this.state.activeIndex].ameneties.map((obj)=>{

return(
<div className="amenitiesico"><img src={obj.amenities_icon} style={{width:16,height:16}}/>{obj.amenities_name}</div>
  )

     })}</div>
   }

      </div>
      );
  }

  componentDidMount(){
    window.addEventListener("resize", this.resizeFunction);
     if(this.props.displaySlider){
      this.setState({homeslider:this.props.displaySlider},function(){
           var scrollHeight=document.querySelector('.HomesliderDivPage').offsetTop;
        window.scrollTo({left:0,top:scrollHeight, behavior:'smooth'});
      });
    }
  }
}
export default Homeslider;