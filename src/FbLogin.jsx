import React, { Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import 'antd/dist/antd.css'; 
import './App.css';
import {Icon} from 'antd';
import fb from './fb.png';
class  App extends React.Component {
  responseFacebook = (response) => {
  console.log(response);
}
render(){
   return (
    <div className="App">
       
    <FacebookLogin
    appId="421225375359948"
    autoLoad={true}
    fields="name,email,picture"
    callback={this.responseFacebook}
   
    icon={<img src={fb}/>}
  />
    </div>
  );
}
 
}

export default App;
