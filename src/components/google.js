import React from 'react';

export default class GoogleSignin extends React.Component {
 // var googleUser = {};

	constructor(props) {
		super(props);
		this.auth2=window.auth2;
		this.gapi=window.auth2;
	}
 attachSignin=(element)=>{
    // console.log(element.id);
    var self=this;
    window.auth2.attachClickHandler(element, {},(googleUser)=> {
      console.log(googleUser);
// const auth2 = window.gapi.auth2.getAuthInstance();
// console.log(auth2);
// console.log(googleUser.getUser());
// fetch(" https://people.googleapis.com/v1/people/me?key=1232323")
// .then((response)=>response.json())
// .then((responsejson)=>console.log("responsejson",responsejson))
// window.gapi.client.gmail.users.getProfile({})
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
 // auth2.signIn().then(res =>console.log('res',res), err => console.log('err',err))
//  var request = window.gapi.client.request({
//   'method':'GET',
//   'path':'/user/birhday/read',
//   'params':{'fields':'user'}
// });
// // Execute the API request.
// request.execute(function(response) {
//   console.log(response);
// });
        	  // googleUser.getGrantedScopes();
        	  var profile = googleUser.getBasicProfile();
        console.log(googleUser);

            console.log(profile);
        // // console.log("ID:" + JSON.stringify(profile)); // Don't send this directly to your server!
        var  id=profile.getId(); // Don't send this directly to your server!
        var fullname = profile.getName();
        var firstname = profile.getGivenName();
        var lastname =  profile.getFamilyName();
        var image = profile.getImageUrl();
        var email = profile.getEmail();
        var obj={firstName:firstname,lastName:lastname,picture:image,email:email,oauthProvider:'google',outhId:id};
        // console.log(obj);
        self.props.sendData(true,obj);
        // console.log("Birthday:" + profile.getBirthday());
        // console.log("getBirthdays:" + profile.getBirthdays());
        
        }, function(error) {
        	console.log(error)
            self.props.sendData&&self.props.sendData(false);
          // alert(JSON.stringify(error, undefined, 2));
        });
  }
  startApp = ()=> {
  	var self=this;
    window.gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      window.auth2 = window.gapi.auth2.init({
        client_id:'991993261926-40eh1aficetf270dknlf6ut67edj5b74.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        scope:'email https://www.googleapis.com/auth/user.birthday.read'
      });
      // setTimeout(()=>{
     self.attachSignin(document.getElementById('customBtn'));
 // },1000);
    });
  };

  

	render() {
		return (
			<div id="customBtn" className={this.props.className} style={this.props.cssstyle}>{this.props.children}</div>
		);
	}
	componentDidMount(){
		this.startApp();
	}
}
