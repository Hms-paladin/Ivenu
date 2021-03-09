 import React, { Component } from 'react';
 import {  FormGroup, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
 import { Input,Button} from 'antd';
 import './Signup.css';
 import Apilink from '../../helpers/apilink';
 // import Apilink from './apilink';
 import ReactPhoneInput from 'react-phone-input-2';
 import 'react-phone-input-2/lib/style.css'

 class Signup extends React.Component{
   constructor(props){
     super(props);
     this.textInput1 = React.createRef();
     this.textInput2 = React.createRef();
     this.state={
       loading:false,
       name:'',
       surname:'',
       location:'',
       mobile:'',
       countrycode:'',
       mail:'',
       dd:'',
       mm:'',
       yy:'',
       phone:''
     }
   }
   onChangeSignup = (e,data) => {
     console.log(data)
     var refInt=e.target.name=='mm' ? this.textInput1 :e.target.name=='dd' ? this.textInput2 :'';
     var dayRef=e.target.name=='dd' ? 31 :e.target.name=='mm' ? 12 :"";
     if((e.target.value.length == e.target.maxLength) && refInt!=""){
       refInt.current.focus();
     }

     if(data=='trimchar'){
       var reg = /^\d+$/;
      // var removedchar=reg.test(e.target.value)?e.target.value:'';
      var value=e.target.value;
      var removedchar=value.replace(/[^0-9\.]+/g, "");

      if(!(removedchar >= 1 && removedchar <= dayRef)  && dayRef!="" && removedchar.length==e.target.maxLength){
        removedchar=dayRef;
      }
      
      this.setState({ [e.target.name]:removedchar });
    }else{
      this.setState({ [e.target.name]:e.target.value });

    }
  }

  handleOnChange=(value, data) =>{
    console.log(value)
    console.log(data.dialCode)
    var code_length=0;

    if(data.dialCode != undefined){
      code_length=data.dialCode.length;
    }
    
    var mobile=value.replace(/[^0-9]+/g,'').slice(code_length);
    console.log(mobile)
    this.setState({ mobile:mobile });
    this.setState({ countrycode:data.dialCode});
    this.setState({ phone:value});

    console.log(this.state)
  }
  // handleSubmit=()=>{
  //   alert('handle subit');
  //   if(this.props.loadsignup){
  // var obj={type:'loadotp'};
  // this.props.loadsignup(obj)
  // }
  // }
  handleSubmit =() =>{
    var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.name==""  || this.state.location=="" || this.state.mobile=="" || this.state.mail=="" || this.state.dd=="" || this.state.mm=="" || this.state.yy==""){

      alert('Enter all fields')

    }else if(!emailPattern.test(this.state.mail)){

      alert("Invalid Email address")
    }
    else{
      this.setState({loading:true})
      var obj={catId:'1',typeId:'2',password:'','name':this.state.name, 'surname':this.state.surname, 'location':this.state.location, 'mobileno':this.state.mobile, 'mail':this.state.mail, 'dob':this.state.yy+"-"+this.state.mm+"-"+this.state.dd, 'disclaimer':'','ccode':this.state.countrycode,questionAnswer:[],type:'otpscreen'};
      fetch(Apilink.apiurl+'SendOTP', {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          'mobileNumber':this.state.mobile,
          'countryCode':this.state.countrycode,
          'email':this.state.mail
        }),
      }).then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson.status==0){
          this.props.loadotp(obj)

            this.setState({loading:false})
          console.log("responseJson",responseJson);
    // alert("OTP send Successfully");
  }
  else{
    this.setState({loading:false})
    alert(responseJson.msg);
  }
})
      
    }
  }

  render(){
    const { name,surname,location,mobile,mail,dd,mm,yy } = this.state;
    return(
      <div className="width-set-signup">
      <ModalHeader toggle={this.toggle} style={{'padding-left':'30px','padding-right':'30px'}}>

      <div style={{}}>
      <div className='clr_orange headerstyle' style={{'font-size':'30px'}}>Signup</div>
      <div className="subheaderstyle" style={{'font-size':'15px'}}>to {this.props.loginttype?this.props.loginttype:'Book your Venue'}</div>
      </div>

      </ModalHeader>
      <ModalBody className="signupmodal" style={{'padding-left':'30px','padding-right':'30px'}}>

      <form>
      <table style={{'width':'100%'}}>
      <tr style={{'width':'100%'}}>
      <td style={{'width':'20%'}} className='watermark'> Name </td>
      <td style={{'width':'80%'}}> <FormGroup> 
      <Input type="text" name="name"
      value={name}
      onChange={this.onChangeSignup}/> 
      </FormGroup> </td>
      </tr>      

      <tr>
      <td className='watermark'> Surname </td>
      <td> <FormGroup> 
      <Input type="text" 
      name="surname"
      value={surname}
      onChange={this.onChangeSignup}
      /> 

      
      </FormGroup> </td>
      </tr>

      <tr>
      <td className='watermark'> Location </td>
      <td> <FormGroup> 
      <Input type="text" name="location"
      value={location}
      onChange={this.onChangeSignup}
      />
      </FormGroup> </td>
      </tr>

      <tr>
      <td className='watermark'> Mobile </td>
      <td> <FormGroup> 
      {/*<Input type="text" name="mobile"
      value={mobile}
    onChange={(e)=>this.onChangeSignup(e,'trimchar')}/>*/}
    <ReactPhoneInput defaultCountry='in'  value={this.state.phone} onChange={this.handleOnChange} className="ant-input"/>

    </FormGroup> </td>
    </tr>

    <tr>
    <td className='watermark'> Email ID </td>
    <td> <FormGroup> 
    <Input type="text"  name="mail"
    value={mail}
    onChange={this.onChangeSignup}/>
    </FormGroup> </td>
    </tr>

    <tr>
    <td className='watermark'> DOB </td>
    <td>
    <Row>
    <Col xs="4">
    <FormGroup>
    <Input type="text"
    name="mm"
    value={mm}
    maxlength="2"
    onChange={(e)=>this.onChangeSignup(e,'trimchar')}
    placeholder="MM"/> </FormGroup>
    </Col>
    <Col xs="3" style={{paddingLeft:0,paddingRight:0}}>
    <FormGroup> 
    <Input type="text"  name="dd"
    value={dd}
    maxlength="2"
    onChange={(e)=>this.onChangeSignup(e,'trimchar')}
    placeholder="DD"
    ref={this.textInput1} /> </FormGroup>
    </Col>
    <Col xs="5">
    <FormGroup>
    <Input type="text" name="yy"
    value={yy}
    maxlength="4"
    onChange={(e)=>this.onChangeSignup(e,'trimchar')}
    placeholder="YYYY"
    ref={this.textInput2}/> </FormGroup>
    </Col>
    </Row>
    </td>
    </tr>

    <tr>
    <td></td>
    <td style={{'text-align':'right'}}> 
  
     <Button  className="btn btn-primary btn-lg mobverify" style={{'text-align':'right','background':'#ea5c04',color:'white',height:'auto'}} loading={this.state.loading} onClick={this.handleSubmit}>VERIFY</Button>
    </td>
    </tr>

    </table>
    </form>
    </ModalBody>
     <div class="signupfooter">
     </div>
    </div>
    )
  }
}export default Signup;
