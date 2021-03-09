import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import './LoginSignupModel.css';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import OtpScreen from '../otpScreen/otpScreen';
import ChangePassword from '../ChangePassword/ChangePassword';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Disclaimer from '../Disclaimer/Disclaimer';
import SharePage from '../Sharepage/SharePage';
import Apilink from '../../helpers/apilink';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import guidedVideo from '../../videos/ivnueVideo.mp4';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Disclaimer from './Disclaimer';
// import SharePage from './SharePage';
// import Apilink from './apilink';
class LoginSignupModel extends React.Component{
  constructor(props) {
    // console.log(props)
    super(props);
    this.state = {
      modal:props.videomodalPopup==false?true:false,
      type:props.type,
      signupdata:null,
      videomodal:props.videomodalPopup==false?props.videomodalPopup:true,
      forgotpassword:false,
      loading:false

    };

    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(props){


    if(props.visible){
      if(this.state.videomodal==true){

      this.setState({modal:false});
    }else{
      this.setState({modal:true})
    }
    }
      this.setState({type:props.type});
  }
loadmodaltype=(data)=>{
  console.log(data);
    this.setState({type:data.type});
    this.setState({signupdata:data});
}
submitData=(data)=>{
// console.log("final_dat",data);
this.setState({loading:true});
    fetch(Apilink.apiurl+'venuSignup/', {
      method:'POST',
   headers:{
     Accept:'application/json',
     'Content-Type':'application/json',
   },
   body:JSON.stringify(data),
 }).then((response)=>response.json())
    .then((responseJson)=>{
// // Actions.verify({loginobj});
console.log(responseJson)
this.setState({loading:false});
 if(responseJson.status==0){
  // this.setState({ modal:false });
 
// this.setState({ modal:false });
window.localStorage.clear();
localStorage['LoginStatus']='true';
localStorage['LoginData']=JSON.stringify(responseJson.data[0]);
this.props.LoginLoad(responseJson.data[0]);
   alert("User Added Successfully");
 }else{
   alert("Problem in server try again....");
 }
    })
}
  toggle() {
    // alert("new");
    this.setState({
      modal:!this.state.modal,
    });
    if(this.state.modal==true){
      this.setState({videomodal:null})
    }
  }
  videotoggle=()=> {
     if(this.state.videomodal==true){
      this.setState({modal:true});
     }
     this.setState({ videomodal:false });
  }
   handleClose() {
    this.setState({ modal:false });
    if(this.props.clospopup){
      this.props.clospopup();
    }

  }
  render(){
  return(
<div>
      <Modal  isOpen={this.state.modal} toggle={this.toggle} className={`width-set-signup ${this.props.centered?'flexend':''}`} centered={this.props.centered?false:true} backdrop="false">
      {this.state.loading&&
      <div className="PageLoader">
        <div style={{textAlign:'center',display:'block'}}>
        <CircularProgress style={{color:'#ea5c04'}}/>
        <p>Submitting Please Wait ...</p>
        </div>
      </div>
    }
      <div class="closeicon" ><i onClick={this.handleClose} class="icofont-close"></i></div>
          {this.state.type=='login'&&
          <Login loginttype={this.props.loginttype} forgotpassword={(data)=>this.setState({type:data,forgotpassword:true})} loadsignup={this.loadmodaltype} LoginLoad={(data)=>{this.props.LoginLoad(data)}}/>
          }
          {this.state.type=='signup'&&
          <Signup loginttype={this.props.loginttype} loadotp={this.loadmodaltype}/>
          }
          {this.state.type=='otpscreen'&&
            <OtpScreen forgotpassword={this.state.forgotpassword} signupdata={this.state.signupdata} loadpassword={this.loadmodaltype}/>
          }
          {this.state.type=='setpassword'&&
            <ChangePassword loginttype={this.props.loginttype} gobacktoLogin={()=>this.setState({type:'login',forgotpassword:false})} forgotpassword={this.state.forgotpassword} signupdata={this.state.signupdata} loaddisclaimer={this.loadmodaltype}/>
          }
          {this.state.type=='disclaimer'&&
            <Disclaimer closemodal={this.handleClose} signupdata={this.state.signupdata} loadsharepage={this.loadmodaltype}/>
          }
          {this.state.type=='sharepage'&&
            <SharePage signupdata={this.state.signupdata} submitData={this.submitData}/>
          }
          {this.state.type=='forgotpassword'&&
          <ForgotPassword   forgotpassword={this.state.forgotpassword} successSentOtp={this.loadmodaltype} goBack={()=>this.setState({type:'login',forgotpassword:false})}/>
          }
      </Modal>
      {this.state.videomodal&&
      <Modal isOpen={this.state.videomodal}  size='xl'
      centered={true} backdrop="false">
          <ModalHeader className="carouselVideoHeader" toggle={this.videotoggle}>How to search venue in iVNEU
          ?<a>A Guided Video</a>
          </ModalHeader>
          <ModalBody>
         <VideoPlayer videoUrl={guidedVideo}/>
          </ModalBody>
          </Modal>
        }
      </div>
     
  )
  }
}
export default LoginSignupModel;