import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import Square from '../../components/square/square';
import './PaxBoxes.css';	
import arrow from '../../images/arrow_icon.svg'
import Popupbox from '../../components/popupbox/popupbox';	
import { Navigation } from 'swiper/dist/js/swiper.esm';
import Drawer from '@material-ui/core/Drawer';
var playarray={value:'id',name:'name',dropdown:[]}
const slider1=require("../../images/slider1.png");
const slider2=require("../../images/slider2.png");
const slider3=require("../../images/slider3.png");
const slider4=require("../../images/slider4.png");
const slider5=require("../../images/slider5.png");
const slider6=require("../../images/slider6.png");
const slider7=require("../../images/slider7.png");
const pluse=require("../../images/+.png");

const PaxBoxes = (props) => {
  const [swiper, updateSwiper] = useState(null);
  const [draweropen, setDraweropen] = useState(false);
  const [descriptionbox, updatedescriptionbox] = useState('');
 const renderHTMLDom=(data)=>{
	var d=new DOMParser().parseFromString(data, 'text/html');
	var appendchild=d.body;
setTimeout(()=>{
if(appendchild){
		document.querySelector('#bulkdata').innerHTML="";
	document.querySelector('#bulkdata').appendChild(appendchild);
  	setDraweropen(true);
}
},300)
}
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
  const openDrawer=(data)=>{
  	// updatedescriptionbox(data);
  	setDraweropen(true);
  	setTimeout(()=>{
  	renderHTMLDom(data)
  	})
  }
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
		<div className="PaxBoxes">
				<Drawer anchor="right" open={draweropen} onClose={()=>setDraweropen(false)}>
			 <div onClick={()=>setDraweropen(false)} className="closeAnimationDrawer"><i class="fa fa-times" aria-hidden="true"></i></div>
				<div className="cancallationPolicyDiv">
				<h4 className="packageInfo">Package Information</h4>
				<div id="bulkdata"></div>
				</div>
				</Drawer>
       <div style={{position:'relative',width:'100%'}}>
       <div style={{width:'96%'}}>
       {props.paxBox.length>0&&
		<Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>
		{props.paxBox.map((obj)=>{
			return(
				<div className="PaxBoxDiv">
				<div className="infobox" onClick={()=>openDrawer(obj.venue_pax_desc)}><i className="fa fa-info-circle"></i></div>
				<p>{obj.venue_pax_name}</p>
				<div className="paxPricingDiv">
				{obj.priceDetails.map((obj1)=>{
					return(
				<div className="paxPricingBox">
				<p>{obj1.day_type_name}</p>
				<div className="paxpricebody">
				<div className="paxpricechild">
				<p>Adult</p>
				<p>{obj1.Adult}</p>
				</div>
				<div className="paxpricechild">
				<p>Child</p>
				<p>{obj1.Child}</p>
				</div>
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

	export default PaxBoxes;