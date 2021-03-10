import React, { Component } from 'react';
import {  Card, FormGroup,CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import './otpScreen.css';
// import Apilink from './apilink';
import { Input,Button,Icon,Spin} from 'antd';
import 'antd/dist/antd.css';
 import Apilink from '../../helpers/apilink';
const antIcon = <Icon type="loading" style={{ fontSize:24 }} spin />;
// import { SmileOutlined } from '@ant-design/icons';
class OtpScreen extends React.Component {
  constructor(props){
    super(props);
    console.log("setpasswordsignup",props);
    this.state={
      signupdata:props.signupdata,
      otp0:"",otp1:"",otp2:"",otp3:"",
      loading:false,
      spinner:true
    }
    this.otpRef1=React.createRef();
    this.otpRef2=React.createRef();
    this.otpRef3=React.createRef();
  }
  componentWillReceiveProps(props){
    console.log(props);
    if(props.signupdata){
      this.setState({signupdata:props.signupdata});
    }
  }

  componentDidMount() {
    console.log(this.textarea)
    // this.otp1.current.focus();
  }
  handleChange=(e,data)=>{
    this.setState({spinner:false});
    var next=e.target.dataset.next;
    if(e.target.value.length == e.target.maxLength){
      this[next].current.focus();
    }
    // this.current.focus()
    this.setState({[e.target.name]:e.target.value})
    // this[data].current.focus();
  }
  
  handleSubmit=()=>{
    this.setState({loading:true});

    //var obj={type:'setpassword'};
    var signupdata=this.state.signupdata;
    // alert(JSON.stringify(signupdata));
    signupdata.user_password=this.state.password;

    signupdata.type='setpassword';
    var otpdata=this.state.otp0.toString()+this.state.otp1.toString()+this.state.otp2.toString()+this.state.otp3.toString();
    console.log("otp",otpdata);
     fetch(Apilink.apiurl+'checkOTP', {
       method:'POST',
       headers:{
         Accept:'application/json',
         'Content-Type':'application/json',
       },
       body:JSON.stringify({
         'mobileNumber':this.state.signupdata.mobileno,
         otp:otpdata

       }),
     }).then((response)=>response.json())
     .then((responseJson)=>{
       this.setState({loading:false});
       if(responseJson.status==0){

        this.props.loadpassword(signupdata);
         console.log("responseJson",responseJson);
   }
   else{
     this.setState({otp0:'',otp1:'',otp2:'',otp3:''})
     alert(responseJson.msg);
   }
 })




  }

  render(){

    return(
      <div>

      <ModalHeader className="modal-header-login "  cssModule={{'modal-title':'w-100 text-center'}}>

      <div style={{display:'inline-flex','align-items':'center', 'justify-content':'center',marginBottom:'3%'}}>

      </div>
      <div >
    {this.props.forgotpassword==false&&
      <div className='clr_lblack headerstyle' style={{'font-size':'17px',marginTop:'1%'}}>Welcome</div>
    }
    {this.props.forgotpassword==false&&

      <div className='clr_orange headerstyle' style={{'font-size':'30px'}}>{this.state.signupdata.name+" "+this.state.signupdata.surname}</div>
    }
      <h3 className="headerstyle" style={{color:'black',marginTop:5}}>Please Enter Your OTP {this.props.forgotpassword==true&&"For Reset Your Password"}</h3>
      </div>

      </ModalHeader>
      {this.state.spinner==true &&
      <Spin indicator={antIcon} style={{alignItems:'center',display:'flow-root'}} />
    }
      <ModalBody className="modal-body-login">

      <div>
      <Row>
      <Col xs="2"></Col>
      <Col xs="2" className="otp1">
      <FormGroup className="otphgt">
      <Input type="password"
      name="otp0"
      onChange={(e)=>this.handleChange(e,"otp1")}
      maxlength="1"
      className="otpcenter"
      data-next="otpRef1"
      /> </FormGroup>
      </Col>
      <Col xs="2" className="otp1">
      <FormGroup className="otphgt"> 
      <Input type="password"  name="otp1"

      maxlength="1"
      onChange={(e)=>this.handleChange(e,"otp2")}
      ref={this.otpRef1}
      className="otpcenter"
      data-next="otpRef2"
      /> </FormGroup>
      </Col>
      <Col xs="2" className="otp1">
      <FormGroup className="otphgt">
      <Input type="password" name="otp2"

      maxlength="1"

      onChange={(e)=>this.handleChange(e,"otp3")}
      ref={this.otpRef2}
      className="otpcenter "
      data-next="otpRef3"
      /> </FormGroup>
      </Col>
      <Col xs="2" className="otp1">
      <FormGroup className="otphgt">
      <Input type="password" name="otp3"

      maxlength="1"
      onChange={this.handleChange}
      ref={this.otpRef3} 
      className="otpcenter"
      data-next="otpRef3"
      /> </FormGroup>
      </Col>
      <Col xs="2"></Col>
      </Row></div>
      <Row style={{marginTop:'10%'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
      <Button loading={this.state.loading}  className="btn btn-primary btn-lg mobverify" style={{backgroundColor:'#ea5c04',width:'125px',textAlign:'center',height:'auto'}} onClick={this.handleSubmit}>VERIFY</Button>
      </div>
      </Row>


      </ModalBody>
      
      </div>
      )
  }
}
export default OtpScreen 