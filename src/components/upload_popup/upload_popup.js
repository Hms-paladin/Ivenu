import React from 'react';
import './upload_popup.css'
import {message} from 'antd';
const birthdayImg1=require("../../images/sliderimage.PNG");

export default class Upload_popup extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	closepop:props.toggleCancel?props.toggleCancel:false
	  };
	}
	handleClose=()=>{
		console.log("upload adta");
		this.setState({closepop:!this.state.closepop});
		this.props.closepop(!this.state.closepop);
	}
	componentWillReceiveProps(props){
		console.log("props",props);
		// this.setState({closepop:props.toggleCancel?props.toggleCancel:false})
	}
	requestPhotography=()=>{
message.success('Request has been sent.');
this.handleClose();
	}
	render() {
		return (
			<div class="Popupbox-div-position-upload " style={{position:'absolute',top:this.props.position.top}}>
					

					<div className="backdropdivpopupbox"></div>

					<div class="popupbox-div-upload">
				
						<div class="Popupbox-content">
						
						<div className="heading-content">

						<div className="width-set-info">

						<label className="information-icon-2"><i class="fa fa-info" aria-hidden="true"></i></label>
						<label className="upload-text-2">Photos Information</label>

						</div>

						<div className="width-set-close">

						<label><i class="fa fa-times" aria-hidden="true" onClick={()=>this.handleClose()}></i></label>

						</div>						

						</div>

						<div className="sec-heading-popup">
							
							<span>How to should look like?</span>

						</div>

						<div className="img-gallery-two">
							
							<div className="sigle-img-gallery">
								
							 <img src={birthdayImg1} alt="Sigle Img" class="upload-img"/>

							</div>

							<div className="multi-img-gallery-main">

								<div className="multi-img-gallery-child">
									 <img src={birthdayImg1} alt="Sigle Img" class="upload-img"/>
								</div>

								<div className="multi-img-gallery-child">
									 <img src={birthdayImg1} alt="Sigle Img" class="upload-img"/>
								</div>

								<div className="multi-img-gallery-child">
									 <img src={birthdayImg1} alt="Sigle Img" class="upload-img"/>
								</div>

								<div className="multi-img-gallery-child">
									 <img src={birthdayImg1} alt="Sigle Img" class="upload-img"/>
								</div>
								
							</div>


						</div>


						<div className="sec-heading-popup">
							
							<span>How suitable photography details improves these views and booking?</span>

						</div>

						<div className="sec-heading-popup-p">
							
							<span>No matter how educated your website visitors are first intrigue by your visual content and not written text. Photography allows consumer to get engaged with your venue and help them decide to book a venue. Make sure you upload a good quality photo of your venue. Photos are the great way to show the amenities, look and services your venue offer, so be prudent while clicking and posting a photo. Hence, uploading appealing pictures of your venues will give users a better vision about your venue and thereto higher conversion rate to your venue!
Venue Photos are the key for someone to choose an ideal venue to book for their choice of events. Select good quality photographs to increase the visibility of your venue and for someone to decide to book. Ensure you cover most of the important amenities and ambience along with relevant team snaps so that a public user would have an idea to book your venue. For more details, select the Information icon next to Upload Photo button to know more details about how your photograph increases the booking of your venue. In case, your need any support for your venue photography, Click the option “Request for Photography Services” for our team to allocate an empaneled vendor to do your professional venue photo shoot for increasing your visibility in the online space.
</span>

						</div>

						<div className="upload-request-btn-div">
							
						<button onClick={()=>this.requestPhotography()} className="upload-request-btn">REQUEST FOR PHOTOGRAPHY SERVICE</button>

						</div>

						</div>

					</div>
			</div>
		);
	}
}
