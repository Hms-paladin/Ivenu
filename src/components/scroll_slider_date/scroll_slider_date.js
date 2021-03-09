import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import './scroll_slider_date.css';
import { Navigation } from 'swiper/dist/js/swiper.esm';


const Scroll_slider_date = (props) => {
	console.log(props)
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
observer:true,
		pagination:{
			el:'.swiper-pagination',
			clickable:true,
		},
	};
	return (
		<div className="scroll_slider">
		<Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>

{props.availableDate && props.availableDate.map((item,i) => (

		<div className="check_input">

		<input className="none_input" type="radio" id={'slideDate'+i} name="dateRadio" onClick={()=>props.getTime(item.date)} />
		<label className="label-check" for={'slideDate'+i} >{item.altdate}</label>

		</div>
	))}





		</Swiper>

		</div>
		);
}

export default Scroll_slider_date;