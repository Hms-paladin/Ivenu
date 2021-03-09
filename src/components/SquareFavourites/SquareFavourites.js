import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import Square from '../../components/square/square';
import './SquareFavourites.css';	
import arrow from '../../images/arrow_icon.svg'
import Popupbox from '../../components/popupbox/popupbox';	
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

const SquareFavourites = (props) => {
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
  		  const params = {
    slidesPerView:'auto',
      spaceBetween:12,
      freeMode:true,
      pagination:{
        el:'.swiper-pagination',
        clickable:true,
      },
    };
		return (
		<div className="SquareFavourites">
		<div className="responsive-nearby-ground-header">
		<div class="nearByStyle2">
		<span className="nearby-text2">Your</span> 
		<Popupbox noarrow={true} buttonText="Favourites" bold={true} dropdown={playarray}  buttonColor={'transparent'} buttonTextColor={'#103EB0'} popupColor={'white'} popupTextColor={'black'}/>
		</div>
       </div>
       <div style={{position:'relative',width:'100%'}}>
       <div style={{width:'96%'}}>
       {props.squareList.length>0&&
		<Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>
		{props.squareList.map((obj)=>{
			return(
				<div>
		<Square onClick={()=>props.onClick&&props.onClick(obj)} width="90px" minHeight="70px" text={obj.venue_cat_name} textcolor={'#ffffff'} backgroundColor={'#ea5b02'}/>
		</div>
				)
		})}
		</Swiper>
		}
		</div>
		<div className="FavoriteArrowDiv" onClick={goNext}><img src={arrow}/></div>
		</div>
		</div>
		);
	}

	export default SquareFavourites;