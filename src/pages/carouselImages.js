import React from 'react';
import Swiper from 'react-id-swiper';
 
const CarouselImages = (props) => {
  const params = {
    pagination:{
      el:'.swiper-paginationcarousel',
      type:'bullets',
      clickable:true
    },
    navigation:{
      nextEl:'.swiper-button-next',
      prevEl:'.swiper-button-prev'
    },
      renderPrevButton:() => <i className="fa fa-angle-left swiper-button-prev"/>,
  renderNextButton:() => <i className="fa fa-angle-right swiper-button-next"/>,
    observer:true
  }
  return(
  <Swiper {...params} >
   {props.photos.map((obj)=>{
   	return(
   	<div><img style={{width:'100%',height:300}} src={obj.venue_image_path}/></div>
   	)
   })}
  </Swiper>
  )
}
 
export default CarouselImages;