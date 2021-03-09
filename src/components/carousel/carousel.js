 import React, { Component } from 'react';
import RBCarousel from "react-bootstrap-carousel";
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Searchbox from '../SearchBox/searchbox';
import guidedVideo from '../../videos/ivnueVideo.mp4';
import carouselloader from '../../images/carouselloader.json';
import ControlledLottie from '../../components/LottieComp';
import CircularProgress from '@material-ui/core/CircularProgress';
import './carousel.css';
import './slick.css';
// import VedioPlayer from '../../Component/VedioPlayer/VedioPlayer'
const styles = { height:400, width:"100%" };

const header_img=require("../../images/bitmap@3x.png");
const carousel1=require("../../images/shutter/CAROUSEL-01_Main.jpg");
const carousel2=require("../../images/shutter/CAROUSEL-02.jpg");
const carousel3=require("../../images/shutter/CAROUSEL-03.jpg");
const carousel4=require("../../images/shutter/CAROUSEL-04.jpg");
const carousel5=require("../../images/shutter/CAROUSEL-05.jpg");
const carousel6=require("../../images/shutter/CAROUSEL-06.jpg");
// const carousel7=require("../../images/shutter/CAROUSEL-07.jpg");
// const carousel8=require("../../images/shutter/CAROUSEL-08.jpg");
// const carousel9=require("../../images/shutter/CAROUSEL-09.jpg");
const carousel10=require("../../images/shutter/CAROUSEL-10-09.jpg");
const carousel11=require("../../images/shutter/CAROUSEL-10.jpg");
const carouselnew1=require("../../images/shutter/carouselnew1.jpg");
const carouselnew2=require("../../images/shutter/carouselnew2.jpg");
const carouselnew3=require("../../images/shutter/carouselnew3.jpg");
const carouselnew4=require("../../images/shutter/carouselnew4.jpg");
const carouselnew5=require("../../images/shutter/carouselnew5.jpg");
const vedio_img=require("../../images/video.png");
const sliderImages=[carouselnew1,carouselnew2,carouselnew3,carouselnew4,carouselnew5];
var count=0
class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    count=0;
    this.state = {
      autoplay:true,
       modal:false,
       count:0,
       imageStatus:false,
       leftIcon:<i class="fa fa-angle-left left-arrow-i" aria-hidden="true"></i>,
       rightIcon:<i class="fa fa-angle-right right-arrow-i" aria-hidden="true"></i>
    };
     this.toggle = this.toggle.bind(this);
  }
  // handleImageLoaded() {
  //   count+=1;
  //   if(count==4){
  //   this.setState({ imageStatus:count==4? true:false });
  // }
  // }

  handleImageErrored() {
    // this.setState({ imageStatus: "failed to load" });
  }
  onSelect = (active, direction) => {
    // console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    // console.log(`visiable onSelect active=${active}`);
  };
   toggle() {
    this.setState(prevState => ({
      modal:!prevState.modal
    }));
  }
  
  checkloadedImages=()=>{
    var count=0;
    var self=this;
      sliderImages.map((obj)=>{
           var img = new Image ();
           img.onload = function (){
             count+=1;
             console.log("imagecount",count);
             if(count==4){
               self.setState({ imageStatus:count==4? true:false });
             }
             // this.setState({count:count});
           };
           img.src=obj;


      })

  }
  componentDidMount(){
    this.checkloadedImages();
  }

  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <div className="container-fluid carouselbuttonmargin" style={{position:'relative',overflow:'hidden'}}>
      {/*<div className="slider_play" onClick={this.toggle}>
      <img
      src={vedio_img} style={{width:'40px'}}/>
      <span className="slider_play_span"> How to Add Venue</span>
      <div className="guidevideo">A Guided Video</div>
      </div>*/}
      <Row className="mainSliderClass">
      <Col className="firstslide"  span={12} style={{padding:0}}>
      {!this.state.imageStatus&&
       
          <div className="anmiateLoading">
             <ControlledLottie animationData={carouselloader}/>
          </div>
      }
      <RBCarousel
      style={styles}
      animation={true}
      autoplay={true}
      slideshowSpeed={5000}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onSelect={this.onSelect}
      ref={r => (this.slider = r)}
      version={4}
      >
      {sliderImages.map((obj)=>{
        return(
           <div className="innerResponsiveHeight" style={{height:this.props.height?this.props.height:'600px',background:`url(${obj})no-repeat center`,backgroundSize:'cover'}}>
      {/*<img
        onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
      style={{ width:"100%", height:this.props.makeHeight?this.props.makeHeight:'100%' }}
      src={obj} />*/}
      </div>
          )
      })}
      </RBCarousel>
      </Col>
      <Col className="secondslide"  span={12} style={{padding:0}}>
      <div className="SearchFlexBox">
      <Searchbox sendSearchedData={(data)=>this.props.sendSearchedData&&this.props.sendSearchedData(data)}/>
      </div>
      </Col>


      </Row>
       <Modal isOpen={this.state.modal} toggle={this.toggle} size='xl'
      centered={true}>
          <ModalHeader className="carouselVideoHeader" toggle={this.toggle}><a className="guidedVideocls">A Guided Video</a>
          </ModalHeader>
          <ModalBody>
         <VideoPlayer videoUrl={guidedVideo}/>
          </ModalBody>
          </Modal>
      </div>
      );
    }
  }

  /**
  *  Boostrap Component
  */
  const Row = props => <div className="row">{props.children}</div>;
  const Col = props => (
    <div className={`col-${props.span} ${props.className}`} style={props.style}>
    {props.children}
    </div>
    );
    const Button = props => {
      const { style, bsStyle, onClick } = props;
      const className = bsStyle ? `btn btn-${bsStyle}` :"btn";
      return (
      <button style={style} className={className} onClick={onClick}>
      {props.children}
      </button>
      );
    };

    export default Carousel;

