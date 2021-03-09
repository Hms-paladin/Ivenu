import React from 'react';
import { Modal, Button } from 'antd';
import google from '../../images/google.png';
import insta from '../../images/insta.png';
import fb from '../../images/fb.png';
import './IndividualSuccessModel.css';

export default class IndividualSuccessModel extends React.Component {

	constructor(props) {
		super(props);
console.log(props)
		this.state = {
			ModalText:'Content of the modal',
			visible:this.props.visible,
			confirmLoading:false,
		};

	}

	handleOk = () => {
		this.setState({
			ModalText:'The modal will be closed after two seconds',
			confirmLoading:true,
		});
		setTimeout(() => {
			this.setState({
				visible:false,
				confirmLoading:false,
			});
		}, 2000);
	};

	handleCancel = () => {
this.props.successClose(false);
		// window.location.reload()
	};
corporateLogin=()=>{
		var confirm=window.confirm("Are you sure want switch to Corporate Login ?");
		if(confirm){
		window.localStorage.clear();
		this.props.routeprops.history.push('/');
		this.props.CorporateClick();
		}
	}
	render() {
		const { visible, confirmLoading, ModalText } = this.state;
		return (
			
			<div className="individualsuccessmodel">
			<Modal className="modal-design"
			title="Title"
			visible={visible}
			onOk={this.handleOk}
			confirmLoading={confirmLoading}
			onCancel={this.handleCancel}
			footer={[
				<Button key="back" className="button1" onClick={this.handleCancel}>
				<span className="BOOK-MORE">Add more</span>
				</Button>,
				<Button key="submit" className="button2" onClick={this.handleCancel}>
				<span className="ADD-VENUE">search venue</span>
				</Button>,
				]}
				>

				<div className="modal-content">
				<div className="modal-head">Hello <span className="text-style1">{this.props.userName}</span></div>
				<div className="You-have-booked-the">You have Added your Venue<p className="text-style-1 font-style-new">Successfully!</p></div>
				<div className="Booking-Details">Your Venue Details</div>
				<div className="Soccer-Club-Academy">{this.props.venueName}</div>
				{/*<div className="Booking-Details padding-top-modal">View More Details</div>*/}
				<div className="date-time-div padding-top-modal">{this.props.fromDate}</div>
				{/*
				<div className="modal-popup-btn padding-top-modal">
					
					<button onClick={()=>this.corporateLogin()}><span className="bold-popup-modal">Corporate User </span> <span>Login Here</span></button>

				</div>*/}
				{/*}
				<div className="social-div">

				<div className="social-text">Share with</div>

				<div className="social-image">
				<img className="google-icon" src={google}/>
				<img className="fb-icon" src={fb}/>
				<img className="insta-icon" src={insta}/>
				</div>

				</div>
			*/}

				</div>
				</Modal>

				</div>
				);
	}
}
