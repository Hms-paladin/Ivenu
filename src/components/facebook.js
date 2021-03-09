import React, { Component } from 'react';

export default class FacebookLogin extends Component {

  componentDidMount() {
    // document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin = () => {
    // alert("");
    this.FB = window.FB;
    this.checkLoginStatus();
  }

  /**
   * Check login status
   */
  checkLoginStatus = () => {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  }

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin = () => {
    // console.log("hiii");
    if (!this.FB) return "NOFBSDK";

    this.FB.getLoginStatus(response => {
      console.log(response);
      if (response.status === 'connected') {
        this.facebookLoginHandler(response);
      } else {
        this.FB.login(this.facebookLoginHandler, {scope:'public_profile,user_birthday,email'});
      }
    }, );
  }

  /**
   * Handle login response
   */
  facebookLoginHandler = response => {
    console.log(response);
    if (response.status === 'connected') {
      this.FB.api('/me', {fields:'first_name,last_name,birthday,email,picture'},userData => {
        // let result = {
        //   ...response,
        //   user:userData
        // };
        var obj={firstName:userData.first_name,lastName:userData.last_name,picture:userData.picture?userData.picture.data.url:null,email:userData.email,oauthProvider:'facebook',outhId:userData.id};
        this.props.onLogin(true, obj);
      });
    } else {
      this.facebookLogin();
      this.props.onLogin(false);
    }
  }

  render() {
    let {children} = this.props;
    return (
      <div className={this.props.className} style={this.props.cssstyle} onClick={()=>this.initializeFacebookLogin()}>
        {children}
      </div>
    );
  }
}