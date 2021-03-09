import React, {Component} from 'react';
import './booknow.css';
import { Modal, Button } from 'antd';
import google from '../../images/google.png';
import insta from '../../images/insta.png';
import fb from '../../images/fb.png';

class Booknow extends Component
{
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

	render()
	{
		const { visible, confirmLoading, ModalText } = this.state;
		return(
		<div className="booknow-div">
        <Button type="primary" onClick={this.showModal}>
          Open Modal with async logic
        </Button>
        <Modal
          title={[
            <div className="booknow-head">Hello <span className="text-style1">Daisy Murphy</span></div>,
            <div className="booknow-head2">Book your Venue. |. <span className="text-style2">Charge venue</span></div>
            ]}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" className="button1" onClick={this.handleCancel}>
              <span className="BOOK-MORE">LATER</span>
            </Button>,
            <Button key="submit" className="button2" onClick={this.handleOk}>
              <span className="ADD-VENUE">BOOK NOW</span>
            </Button>,
          ]}
        >
    {/*{this.state.ModalText}*/}
          <div className="booknow-content">
          <div className="booknow-content1">Soccer Club Academy</div>
          </div>
        </Modal>
      </div>
			);
	}
}
	export default Booknow;