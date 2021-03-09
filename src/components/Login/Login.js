import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Input} from 'antd';
import Icofont from 'react-icofont';
 import Apilink from '../../helpers/apilink';
import './Login.css';
import FacebookLogin from '../facebook.js';
import GoogleSignin from '../google.js';
import Instagram from '../instagram.js';
class Login extends React.Component{
      constructor(props){
        super(props);
        this.state = {
      userName:'',
      type:'password',
      isLoggedIn:false,
userID:'',
name:'',
email:'',
picture:''
    };
   }

  onChangeLogin = (e) => {
    this.setState({ [e.target.name]:e.target.value });
  }
  

facebooksignin=()=>{
  // facebooklogin.initializeFacebookLogin();
}
  handleSubmit =() =>{
if(this.props.loadsignup){
  var obj={type:'signup'};
  this.props.loadsignup(obj)
  }

  }
    enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
       this.loginSubmit();
    }
  }
  onLogin=(data,result)=>{
    console.log("data",data);
    console.log("result",result);
  }
//     console.log(result);
    
//   // console.log("obj",obj);
//   // console.log('data',data);

//     if(data==true){
//       var obj={
//     'user_category':1,
//     'oauth_provider':'facebook',
//     'name':result.user.name,
//     'email':result.user.email,
//     'picture':result.user.picture.data.url,
//     'userID':result.user.id
//   }
//        fetch(Apilink.apiurl+'social_login', {
//      method:'POST',
//   headers:{
//     Accept:'application/json',
//     'Content-Type':'application/json',
//   },
//   body:JSON.stringify(obj),
// }).then((response)=>response.json())
//    .then((responseJson)=>{
//     console.log(responseJson);
// // Actions.verify({loginobj});
// if(responseJson.status==0){
// localStorage['userloggedin']='yes';
// window.location.reload();
// }
//    })
//     }else{

//     }
//   }
googlesignin=(data)=>{
  console.log(data);
}
  loginSubmit =() =>{
    // alert("hiii");
    //var obj={'email':this.state.userName,'password':this.state.password};
    //console.log(JSON.stringify(obj));
    fetch(Apilink.apiurl+'venuLogin', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify({
'email':this.state.userName,
    'password':this.state.password

  }),
}).then((response)=>response.json())
   .then((responseJson)=>{
// Actions.verify({loginobj});
if(responseJson.status==0){
  console.log(responseJson);
localStorage['LoginStatus']='true';
localStorage['LoginData']=JSON.stringify(responseJson.data[0]);
this.props.LoginLoad(responseJson.data[0]);

}else{
  alert("Invalid Email Id or Password");
}
   })
  }
  loginSocial=(status,data)=>{
    console.log("socialData",status);

    if(status==true){
      data.gender="";
      data.locale="";
      data.link="";
      data.typeId=2;
      data.catId=1;
      data.dob="";
    // console.log("socialData",data);
   fetch(Apilink.apiurl+'socialMediaLogin', {
     method:'POST',
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(data),
}).then((response)=>response.json())
   .then((responseJson)=>{
     // console.log('responseJson',responseJson);
     if(responseJson.status==0){
       localStorage['LoginStatus']='true';
       localStorage['LoginData']=JSON.stringify(responseJson.data[0]);
       this.props.LoginLoad&&this.props.LoginLoad(responseJson.data[0]);
     }
   })
    }
  }
      render(){
        const { userName,password } = this.state;
  
            return(
                  <div>
      <ModalHeader className="modal-header-login"  cssModule={{'modal-title':'w-100 text-center'}}>

      <div style={{display:'inline-flex','align-items':'center', 'justify-content':'center',marginBottom:'3%'}}>
      <div id="circle">
      <div id="circle2"></div>
      </div>
      </div>
      <div >
      <div className='clr_orange headerstyle' style={{'font-size':'30px'}}>Login</div>
      <div className='subheaderstyle' style={{'font-size':'15px',marginTop:'1%',fontWeight:'normal'}}>to {this.props.loginttype?this.props.loginttype:'Book your Venue'}</div>
      </div>

      </ModalHeader>
      <ModalBody className="modal-body-login">
      
      <form>

     
     
     <div class="form-group">
      <Input
        placeholder="Email Id"
        name="userName"
        value={userName}
        onChange={this.onChangeLogin}
        onKeyPress={this.enterPressed.bind(this)}
      />
      </div>


      <div class="form-group">
      <Input
      type={this.state.type}
      name="password"
        placeholder="Password"
         value={password}
        onChange={this.onChangeLogin}
         onKeyPress={this.enterPressed.bind(this)}
      />
      </div>
      <div className="forgotpassword" onClick={()=>this.props.forgotpassword('forgotpassword')}><a>Forgot Password?</a></div>
      </form>
       <Row style={{marginTop:'5%'}}>
       <div style={{width:'40%',marginLeft:' 5%',display:' flex',justifyContent:'flex-start'}}>
      <button type="button" class="btn btn-primary btn-lg mobverify" style={{backgroundColor:'#103eb0',width:'125px'  }} onClick={this.handleSubmit} >SIGN UP</button>
      </div>
      <div style={{width:'50%',display:'flex',justifyContent:'flex-end'}}>
      <button onClick={this.loginSubmit} type="button" class="btn btn-primary btn-lg mobverify" style={{backgroundColor:'#ea5c04',width:'125px',textAlign:'center'}}>LOGIN</button>
      </div>
      </Row>
      
      
      </ModalBody>
      <div class="mdlfooter mobfooter">
        
      <div className="textsocial" style={{display:'block','text-align':'center'}}>
       (or) Login with
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px'}}>
       <FacebookLogin  className="imageblock" cssstyle={{width:'22%',padding:'5px',cursor:'pointer'}} onLogin={(status,data)=>this.loginSocial(status,data)}><img src={require('../../images/fb.png')} class="socialmedia"/></FacebookLogin>
       {/*<div className="imageblock" style={{width:'10%',padding:'5px'}}><img src={require('../../images/fb.png')} class="socialmedia" /></div>*/}
     <GoogleSignin sendData={(status,data)=>this.loginSocial(status,data)} className="imageblock" cssstyle={{width:'22%',padding:'5px',cursor:'pointer'}}><img src={require('../../images/google.png')} class="socialmedia"/></GoogleSignin>
     {/*<Instagram  className="imageblock" cssstyle={{width:'10%',padding:'5px',cursor:'pointer'}}><img src={require('../../images/insta.png')} class="socialmedia" /></Instagram>*/}
       </div>
      </div>
      </div>
      </div>
                  )
      }
}
export default Login;