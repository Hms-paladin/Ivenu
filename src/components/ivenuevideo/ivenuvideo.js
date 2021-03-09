import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from "react-slick";
import { Card,Rate,Row,Col,Icon  } from 'antd';
import { FontAwesome  } from "react-fontawesome";
import './ivenuVedio.css';
import Apilink from '../../helpers/apilink';
import { Player,PosterImage ,BigPlayButton } from 'video-react';
const Background=require("../../images/left.png");
const RightArrow=require("../../images/right.png");
const Videopost2=require("../../images/videothumnail.jpg");
const Videopost3=require("../../images/videothumnail2.jpg");
const Videopost4=require("../../images/videothumnail1.jpg");
const pluse=require("../../images/+.png");
const propTypes = {
  player:PropTypes.object,
  className:PropTypes.string
};
function LeftNavButton(props){
	const {className,style,onClick} =props;
	return(

    <div
//className="slick-arrow"
className={className}
style={{ ...style, display:"block" }}
onClick={onClick} >
<img src={RightArrow} alt="Arrow Text" style={{width:'45px',height:'45px'}}/>
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
  <img src={Background} alt="Arrow Text" style={{width:'45px',height:'45px'}}/>
  </div>
  )
} 
export default class IvenuVideos extends React.Component{
	constructor(props){
		super(props);
		this.state={
     video:[]
		}
	}
  ListVideo=()=>{

    fetch(Apilink.apiurl+'video', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({video:responseJson.data});
console.log("video",this.state);

    })  
  }
  componentWillMount(){
    this.ListVideo();
  }
	render(){
		const settings = {
      dots:true,
      infinite:false ,
      speed:500,
      dotsClass:"slick-dots video-slick-dots",
      slidesToShow:3,
      slidesToScroll:3,
      draggable:false,
      nextArrow:<LeftNavButton />,
      prevArrow:<RightNavButton />,
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
          infinite:true,
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
        breakpoint:480,
        settings:{
          slidesToShow:1,
          slidesToScroll:1
        }
      }
      ]

    };
    return(
      <div className="display_position walkthroughivenue">

      <div style={{width:'100%',backgroundColor:'#f7f7f7'}}>
      <div class="h1style">
      <div class="nearByStyle">
      <span style={{color:"gray"}}>
      Walkthrough</span>
      <div class="ivenustyle">iVNEU  
      </div>   
      </div>
      <div class="plusStyle">
      {/*
      <div class="inlinePluss">       
      <img src={pluse } />
      </div>*/}
      </div> 
      </div>
      
      <div className="">
      
      <Slider {...settings} edgeFriction={0}>
{this.state.video.map((item,index)=>{
         return(
    <div class="cardpadd">
      <Card 
      // title="Default size card"
      // extra={<a href="#">More</a>}
      
      ><div style={{flex:1,marginTop:'10px'}}>
      <div style={{flex:.3}}>
      <div style={{justifyContent:'flex-start',fontSize:'18px',color:'#1f459e',textAlign:"left"}}>{item.video_title}</div>
      
      <Row gutter={24}>
      <Col className="gutter-row" span={14} style={{textAlign:"left"}}>
      <Rate  className="ratecolor" allowHalf defaultValue={item.video_ratings} />
      </Col>
      <Col className="gutter-row" span={10} style={{textAlign:'right', marginLeft:'-10px','font-weight':'bold',padding:'5px'}}>
      {item.video_reviews} Reviews
      </Col>
      </Row>
      </div>
      <div style={{flex:.7,marginTop:'5px',borderRadius:'50px'}}>
      <Player
      
      poster={index==0?Videopost2:(index==1?Videopost3:Videopost4)}  
      src={item.video_url}
       // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      >  

      <BigPlayButton position="center" />
      </Player>
      </div>
      </div>
      </Card>
      </div>
      )
      })
    }
      </Slider>
       
      
     


      </div>
      </div>
      </div>
      )
    }
  }
