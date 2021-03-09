import React from 'react';
import { Modal, Button } from 'antd';
import google from '../../images/google.png';
import insta from '../../images/insta.png';
import fb from '../../images/fb.png';
import './modal_login_1.css';

export default class Modal_login_1 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			ModalText:'Content of the modal',
			visible:false,
			confirmLoading:false,
		};

	}


	showModal = () => {
		this.setState({
			visible:true,
		});
	};

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
		console.log('Clicked cancel button');
		this.setState({
			visible:false,
		});
	};

	render() {
		const { visible, confirmLoading, ModalText } = this.state;
		return (
			<div>

			<Button type="primary" onClick={this.showModal}>
			Open Modal with async logic
			</Button>

			<Modal className="modal-design"
			title="Title"
			visible={visible}
			onOk={this.handleOk}
			confirmLoading={confirmLoading}
			onCancel={this.handleCancel}
			footer={[
				<Button key="back" className="button1" onClick={this.handleCancel}>
				<span className="BOOK-MORE">BOOK MORE</span>
				</Button>,
				<Button key="submit" className="button2" onClick={this.handleOk}>
				<span className="ADD-VENUE">ADD VENUE</span>
				</Button>,
				]}
				>

				<div className="modal-content">
				<div className="modal-head">Hello <span className="text-style1">Daisy Murphy</span></div>
				<div className="You-have-booked-the">You have booked the venue<p className="text-style-1">Successfully!</p></div>
				<div className="Booking-Details">Booking Details</div>
				<div className="Soccer-Club-Academy">Soccer Club Academy</div>
				<div className="date-time-div">11-12 AM,16 Mar 2019</div>

				<div className="social-div">

				<div className="social-text">Share with</div>

				<div className="social-image">
				<img className="google-icon" src={google}/>
				<img className="fb-icon" src={fb}/>
				<img className="insta-icon" src={insta}/>
				</div>

				</div>

				</div>
				</Modal>

				</div>
				);
	}
}
