import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import Square from '../../components/square/square';
import './PaxBoxes.css';	
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

const SeatBoxes = (props) => {
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
    console.log('props.seatBox',props.seatBox);
		return (
		<div className="PaxBoxes">
       <div style={{position:'relative',width:'100%'}}>
       <div style={{width:'96%'}}>
       {props.seatBox.length>0&&
		<Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>
		{props.seatBox.map((obj)=>{
			return(
				<div className="PaxBoxDiv">
				<p>{obj.seat_name}</p>
				<div className="paxPricingDiv">
				{obj.priceDetails.map((obj1)=>{
					return(
				<div className="paxPricingBox">
				<div className="paxpricebody">
				{obj1.hour_cost>0&&
				<div className="paxpricechild">
				<p>Hourly</p>
				<p>{obj1.hour_cost} ({obj1.currency})</p>
				</div>
				}
				{obj1.day_cost>0&&
				<div className="paxpricechild">
				<p>Daily</p>
				<p>{obj1.day_cost} ({obj1.currency})</p>
				</div>
				}
				{obj1.week_cost>0&&
				<div className="paxpricechild">
				<p>Weekly</p>
				<p>{obj1.week_cost} ({obj1.currency})</p>
				</div>
				}
				{obj1.month_cost>0&&
				<div className="paxpricechild">
				<p>Monthly</p>
				<p>{obj1.month_cost} ({obj1.currency})</p>
				</div>
				}
				</div>	
				</div>
						)
				})}
				
				</div>
				<div className="paxBookingbox">
				<button onClick={()=>props.onClickBook&&props.onClickBook(obj)}>Book Now</button>
				</div>
		</div>
				)
		})}
		</Swiper>
		}
		</div>
		</div>
		</div>
		);
	}

	export default SeatBoxes;