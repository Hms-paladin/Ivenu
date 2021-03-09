import PropTypes from 'prop-types';
import React, { Component, useState  } from 'react';
// import Slider from "react-slick";
import Swiper from 'react-id-swiper';
import { Card,Rate,Row,Col,Icon  } from 'antd';
import { FontAwesome  } from "react-fontawesome";
import './soccerGround_res.css';
// import './slick.css';
import 'antd/dist/antd.css';
import Popupbox from '../../components/popupbox/popupbox';  
import { Player,PosterImage ,BigPlayButton } from 'video-react';
import { Navigation } from 'swiper/dist/js/swiper.esm';
var playarray={value:'id',name:'name',dropdown:[]}
var arr=[1,2,3,4];

const RightArrow=require("../../images/right.png");
const pluse=require("../../images/+.png");
const birthdayImg1=require("../../images/birthdayImg1.png");

const SoccerGround_res = (props) => {
  // alert(JSON.stringify(props));
  const [swiper, updateSwiper] = useState(null);
 
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
 
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };
    const radioChange=(e,index)=>{
    
    // alert(index);
  
    props.dataarray.map(v=>v.isChecked=false);
     props.dataarray[index].isChecked=true;
    // this.setState({circle_array});
    if(props.updateArray){
      props.updateArray(props.dataarray);
    }
    if(props.activeData){
      props.activeData(props.dataarray[index]);
    }
    // console.log(this.state)
  };
        const params = {
    slidesPerView:'auto',
      spaceBetween:30,
    observer:true,
      freeMode:true,
      pagination:{
        el:'.swiper-pagination',
        clickable:true,
      },
    };
// const propTypes = {
//   player:PropTypes.object,
//   className:PropTypes.string
// };

// function LeftNavButton(props){
// 	const {className,style,onClick} =props;
// 	return(

//     <div
// //className="slick-arrow"
// className={className}
// style={{ ...style, display:"block" }}
// onClick={onClick} >
// </div>
// )
// } 
// function RightNavButton(props){
// 	const {className,style,onClick} =props;
// 	return(

//     <div
//   //className="slick-arrow"
//   // style={{...style}}
//   className={className}
//   style={{ ...style, display:"block" }}
//   onClick={onClick} >
//   </div>
//   )
// } 
// var circle_array=[{id:1,isChecked:false},{id:2,isChecked:false},{id:3,isChecked:false},{id:4,isChecked:false},{id:5,isChecked:false},{id:6,isChecked:false},{id:7,isChecked:false}]
// export default class SoccerGround_res extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.state={
//       circleopen:false,
//       circle_array:circle_array

//     }
//   }



//   render(){
//     const settings = {
//       dots:true,
//       infinite:false,
//       speed:500,
//       dotsClass:"slick-dots soccerGround-slick-dots",
//       slidesToShow:3,
//       slidesToScroll:3,
//       draggable:false,

//       responsive:[
//       {
//         breakpoint:1300,
//         settings:{
//           slidesToShow:5,
//           slidesToScroll:3,
//           infinite:true,
//           centerMode:true,
//           dots:true
//         }
//       },
//       {
//         breakpoint:1100,
//         settings:{
//           slidesToShow:4,
//           slidesToScroll:4,
//           centerMode:true,
//           infinite:true,
//           dots:true
//         }
//       },
//       {
//         breakpoint:900,
//         settings:{
//           slidesToShow:2,
//           slidesToScroll:2,
//           infinite:true,
//           dots:true
//         }
//       },
//       {
//         breakpoint:768,
//         settings:{
//           slidesToShow:2,
//           slidesToScroll:2,
//           centerMode:false,
//           initialSlide:2
//         }
//       },
//       {
//         breakpoint:480,
//         settings:{
//           slidesToShow:4,
//           slidesToScroll:1
//         }
//       }
//       ]

//     };

// const NearByGround_res = () => {
//   const [swiper, updateSwiper] = useState(null);
 
//   const goNext = () => {
//     if (swiper !== null) {
//       swiper.slideNext();
//     }
//   };
 
//   const goPrev = () => {
//     if (swiper !== null) {
//       swiper.slidePrev();
//     }
//   };
//         const params = {
//     slidesPerView:'auto',
//       spaceBetween:12,
//       freeMode:true,
//       pagination:{
//         el:'.swiper-pagination',
//         clickable:true,
//       },
//     };{props.dataarray.length>0&&props.dataarray[0].venue_cat_name}
// console.log("category",props)
    return(
      <div className="soccerGround-main-div soccerGround_mobile">

      <div className="slider-button-remove" style={{width:'100%',backgroundColor:'#fff',position:'relative'}}>

      <div className="h1style">

      <div className="slider-inline-header">
        
      <div class="nearByStyle">
      <span className="nearby-text2">
      Venues</span>
      <Popupbox noarrow={true} buttonText="Near You" bold={true} dropdown={playarray}  buttonColor={'transparent'} buttonTextColor={'#103EB0'} popupColor={'white'} popupTextColor={'black'}/>
      <div class="ivenustyle">
      </div>   
      </div>

      <div class="plusStyle">
      <div class="inlinePluss">       
      <img src={pluse } />
      </div>
      </div>

      </div>

      

      </div>
      
      <div>
      <Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>
      {props.dataarray.map((obj,i) =>

     

      
      <div>
      <Card
      // title="Default size card"
      // extra={<a href="#">More</a>}
      
      >
      <div style={{flex:1,marginTop:'10px'}}>
      <div style={{flex:.3}}>
      
      
      <Row gutter={24}>
      <Col className="gutter-row" span={14} style={{textAlign:"left"}}>
      <Rate  className="ratecolor" allowHalf defaultValue={4} />
      </Col>
      
      </Row>
      </div>
      <input className="input_round" type="radio" name="circleClick" id={'radiomob'+i} checked={obj.isChecked} onClick={(e)=>radioChange(e,i)}/>
      <label className="lable_radio" for={'radiomob'+i}>

    

      <div className="soccer_img-div" style={{flex:.7,marginTop:'5px',borderRadius:'50px'}} >
      <img style={{width:"100%"}} src={obj.photos.length>0&&obj.photos[0].venue_image_path} alt="Arrow Text" class="specialimg"/>
      {obj.isChecked==true&&
        <div className="circle_ground_flex">
      

      <div className="circle_ground">
        <i class="fa fa-check" aria-hidden="true"></i>
      </div>

      </div>
      }  

      </div>

      <div  style={{fontSize:"22px",display:"flex",flexWrap:"wrap", textAlign:"left"}}>
      <div>
    <div class="text_size-1">{obj.Distance} | {obj.Time}</div>
      <div className="text_size-1">{obj.trn_venue_name}</div>
      <div className="text_size-2">{obj.venue_cat_name}</div>
      </div>

      </div>
      <div className="Linebefore"></div>
      </label>
  

      </div>
      </Card>


      <div className={obj.isChecked==true?"arrowupcss":""}>
        
        
      </div>

      </div>
       )}
    

    </Swiper>
    </div>
    </div>

    </div>
    )
}
export default SoccerGround_res;