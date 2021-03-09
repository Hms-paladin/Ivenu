import React from 'react';
import {  Card, FormGroup,CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
 import { Input,Button,message} from 'antd';
 import ReactPhoneInput from 'react-phone-input-2';
  // import 'react-phone-input-2/dist/style.css';
  import 'react-phone-input-2/lib/style.css'
  import Apilink from '../../helpers/apilink';
export default class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			mobile:'',
			countrycode:'',
			success:null,
			phone:'',
			loading:false
		}
	}
  handleOnChange=(value, data,data1) =>{
    console.log(data1);
    console.log(data);
    console.log(value);
    var code_length=0;
    var success=false;
    if(data1.format){
    	// console.log("success");
    	if(data1.format.length==value.length){
    		// alert("success");
    		success=true;
    	}else{
    		success=false;
    	}
    }else{
    		success=false;
    }
    if(data.dialCode != undefined){
      code_length=data.dialCode.length;
    }
    
    var mobile=value.replace(/[^0-9]+/g,'').slice(code_length);
    console.log(mobile)
    this.setState({ mobile:mobile });
    this.setState({ countrycode:data.dialCode});
    this.setState({ phone:value});
    this.setState({success:success});

    // console.log(this.state)
  }
  loginSubmit=()=>{
  	// alert("");
  	this.setState({loading:true})
  	console.log(this.state);
  	fetch(Apilink.apiurl+"forgotOTP", {method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({mobileNumber:this.state.mobile,countryCode:this.state.countrycode}),
    }).then((response)=>response.json())
    .then((responsejson)=>{
    	this.setState({loading:false});
    	if(responsejson.status==1){
    			message.error(responsejson.msg);
    	}else{
var obj={type:'otpscreen',mobileno:this.state.mobile,name:responsejson.data[0].user_name,surname:responsejson.data[0].user_surname};
    			message.success("OTP sent to your registerd mobile number");
    			this.props.successSentOtp(obj)
    	}
    	console.log(responsejson);
    })
  }
	render() {
		return (
			<div>
		 <ModalHeader className="modal-header-login " style={{marginTop:'8%'}} cssModule={{'modal-title':'w-100 text-center'}}>
		  <div className='clr_orange headerstyle' style={{'font-size':'30px',marginBottom:6}}>Forgot Password</div>
		   <h5 className="headerstyle" style={{color:'black'}}>Please Enter Your Mobile Number</h5>
		 </ModalHeader>
		 <ModalBody className="modal-body-login">
		 <form>
			<div class="form-group" style={{position:'relative'}}>
			<ReactPhoneInput defaultCountry='in' value={this.state.phone}  onChange={this.handleOnChange} className="ant-input"/>
			<p class="errorPhone">{this.state.success==false?"Invalid Phone Number":''}</p>
			</div>
      	</form>
      	 <Row style={{marginTop:'9%'}}>
       <div style={{width:'40%',marginLeft:' 5%',display:' flex',justifyContent:'flex-start'}}>
      <button type="button" class="btn btn-primary btn-lg mobverify" style={{backgroundColor:'#ea5c04',width:'125px'  }} onClick={()=>this.props.goBack&&this.props.goBack()} >Cancel</button>
      </div>
      <div style={{width:'50%',display:'flex',justifyContent:'flex-end'}}>
      <Button disabled={this.state.success==true?false:true} onClick={this.loginSubmit} type="button" className="btn btn-primary btn-lg mobverify" loading={this.state.loading} style={{backgroundColor:'#103eb0',width:'125px',textAlign:'center',height:'100%'}}>Submit</Button>
      </div>
      </Row>
		 </ModalBody>
			</div>
		);
	}
}
