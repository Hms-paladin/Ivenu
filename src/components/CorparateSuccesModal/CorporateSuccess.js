import React, {Component} from 'react';
import './CorporateSuccess.css';
import { Modal, Button } from 'antd';
import google from '../../images/google.png';
import insta from '../../images/insta.png';
import fb from '../../images/fb.png';

class CorporateSuccess extends Component
{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  ModalText:'Content of the modal',
    visible:this.props.visible,
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
this.props.successClose(false);
  };

	render()
	{
		const { visible, confirmLoading, ModalText } = this.state;
		return(
		<div className="corporate-success">
        <Modal
          title=""
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            // <Button key="back" className="button1" onClick={this.handleCancel}>
            //   <span className="BOOK-MORE">BOOK MORE</span>
            // </Button>,
            <div style={{textAlign:"center",width:"100%"}}>
            <Button key="submit" className="corporate-button2" onClick={this.handleCancel} >
              <span className="corporate-button2-text">ADD MORE</span>
            </Button>
            </div>,
          ]}
        >
    {/*{this.state.ModalText}*/}
          <div className="corporate-success-content">
          <div className="corporate-success-head">Hello <span className="corporate-success-style1">Corporate User</span></div>
          <div className="corporate-You-have-booked-the">You have successfully authorized {this.props.Location} Venue SPOCs to add the relevant venue details</div>
          <div className="corporate-message">Message and mails are delivered to related SPOCs</div>
          
         
         
          
          <div className="corporate-social-div">
          	  
          	  <div className="corporate-social-text">Share with</div>

	          <div className="corporate-social-image">
		          <img className="google-icon" src={google}/>
		          <img className="fb-icon" src={fb}/>
		          <img className="insta-icon" src={insta}/>
	          </div>

          </div>
           <div className="corporate-login-here">Individual user<span className="corporate-login-here-span">Login Here</span></div>
          </div>

        </Modal>
      </div>
			);
	}
}
	export default CorporateSuccess;