import React,{useState} from 'react';
import  './SwiperId.css';
import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm';
import  ArrowIcon  from '../../images/right.png';
import Square from '../square/square';
const SwiperId = (props) => {
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
      pagination:{
        el:'.swiper-pagination',
        clickable:true,
      },
    };
		return (
			<div className="swiper_components" >
			<div className="width_80">
			<div style={styles.row} className="homesliderrow">
			<div style={styles.col3} className="col3">
			<p className="you_may">
			Your
			</p>
			<p className="look_for">
			 Favourites
			
			</p>
			</div>
			<div style={styles.col6} className="col6">
			{props.lookArray&&props.lookArray.length>0&&
				<Swiper {...params} getSwiper={updateSwiper} modules={[Navigation]}>
			

			


    		{props.lookArray && props.lookArray.map((item,i) => 
 <div className="lookingforswiper" style={styles.imagecontainer} onClick={()=>props.onClick(item)}><Square  width="120px" minHeight="100px" text={item.venue_cat_name} textcolor={'#ffffff'} backgroundColor={'#ea5b02'}/></div>
			
    		 	)}
    		 
    		</Swiper>
    	}
			</div>
			<div className="col05" style={styles.image_div}>
			<img src={ArrowIcon} className="" onClick={goNext} style={styles.image_img}/>
			</div>
			</div>
			</div>
			</div>
		);
	}
	export default SwiperId;
const styles={
	rotateimg:{
			    width:'2.5vw',
    height:'2.5vw'
	},
	container:{
		borderBottom:'0.3px solid #c8c6c6'
	},
	row:{
		display:'flex',
		alignItems:'center'
	},
	col3:{
		display:'flex',
		flexDirection:'column',
		justifyContent:'flex-end',
		width:'15%'
	},
	col6:{
		
		width:'85%'
	},
	homeslidetext:{
		color:'orange',
		paddingBottom:4
	},
	homeslidesubtext:{
		color:'orange'
	},
	imagehomecontainer:{
		width:90,
		height:90
	},
	image:{
		width:'100%',
		height:'100%',
		borderRadius:5
	},
	image_img:{
		width:'100%',
		height:'100%',
	},
	imagecontainer:{
		width:90,
		height:90,
	},
	image_div:{
		width:'35px',
		height:'100%',
	},
	
}





