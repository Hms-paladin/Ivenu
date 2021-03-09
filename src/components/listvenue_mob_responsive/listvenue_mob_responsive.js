// import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import Slider from "react-slick";
import Swiper from 'react-id-swiper';
import { Card,Rate,Row,Col,Icon,Button  } from 'antd';
import Homeslidercontent from '../../components/homeslidercontent/homeslidercontent';

import './listvenue_mob_responsive.css';

const slider1=require("../../images/slider1.png");
const slider2=require("../../images/slider2.png");
const slider3=require("../../images/slider3.png");
const slider4=require("../../images/slider4.png");
const slider5=require("../../images/slider5.png");
const slider6=require("../../images/slider6.png");
const slider7=require("../../images/slider7.png");
const slider8=require("../../images/slider8.png");
const arrowicon=require("../../images/Rightarrow.svg");
const pluse=require("../../images/+.png");

function LeftNavButton(props){
  const {className,style,onClick} =props;
  return(

    <div
//className="slick-arrow"
className={className}
style={{ ...style, display:"block",marginRight:'9px' }}
onClick={onClick} >
<img  alt="Arrow Text" className="side-arrow" src={arrowicon} style={{width:'25px',height:'11px','margin-left':'2px',transform:" rotate(270deg)", position:"absolute",right:"14px"}}/>
</div>
)
} 
export default class Listvenue_mob_responsive extends React.Component{
  constructor(props){
    super(props);
    this.state={
activeCategory:null
    }
  }
changeCategory=(data)=>{
  this.props.history.push('/homeslidermob',{activeCategory:data});
}
  render(){
 
    // const firstnode = {
    //   dots:false,
    //   dotsClass:"slick-dots slick-special1",
    //   infinite:true ,
    //   speed:500,
    //   slidesToShow:2,
    //   slidesToScroll:2,
    //   nextArrow:<LeftNavButton />,


    // };
    const secondnode = {
    slidesPerView:'auto',
      spaceBetween:12,
      freeMode:true,
      observer:true,
      pagination:{
        el:'.swiper-pagination',
        clickable:true,

      },
      nextArrow:<LeftNavButton />,
    };
    // const secondnode = {
    //   dots:false,
    //   dotsClass:"slick-dots slick-special2",
    //   infinite:true ,
    //   speed:500,
    //   slidesToShow:2,
    //   slidesToScroll:2,
    //   nextArrow:<LeftNavButton />,


    // };
    return(
      <div>
      <div className="listvenue-main-div">
       <div class="listvenue_Style2">
        <span className="listvenue-text2">{this.props.text}</span> 
        <span class="responsive-listvenue-text">More<img src={arrowicon}  class="listvenue_more_icon"/>
        </span>   
        </div>
      <div className="listvenuePlayGround">

       
      <div class="listvenue_cardpadd">
      <Card>
{this.props.ListDatas&&this.props.ListDatas.length==0&&
<div className="listvenueSliderError">No Records</div>
}
     
 {this.props.ListDatas&&this.props.ListDatas.length>0&&
      <Swiper {...secondnode}>
     {this.props.ListDatas.map((item)=>{
        return(
           <div style={{flex:1}} onClick={()=>this.changeCategory(item)}>
      
      <div style={{flex:.7,marginTop:'5px',borderRadius:'50px',position:'relative',width:'100px'}} className="ListMyVenueslider">
      <img src={item.photos.length>0&&item.photos[0].venue_image_path} alt="Arrow Text" class="listvenue_specialimg"/>
      </div>
      <p style={{margin:0,textAlign:'left'}}>{item.trn_venue_name}</p>
      </div>
          )
      })}
     
    
      </Swiper>
    }
   
      </Card>
      </div>
      </div>
       <img  alt="Arrow Text" className="side-arrow" src={arrowicon} style={{width:'25px',height:'11px','margin-left':'2px',transform:" rotate(270deg)", position:"absolute",right:"14px"}}/>
    </div>
       
      </div>
      )
}
}
