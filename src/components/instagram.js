import React from 'react';

const token=null;
export default class Instagram extends React.Component {

	constructor(props) {
		super(props);
		this.state={accesstoken:null}
	}
	// var accessToken = null;
authenticateInstagram = (instagramClientId, instagramRedirectUri, callback)=> {
    // Pop-up window size, change if you want
    var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;
    // Url needs to point to instagram_auth.php
if(window.innerWidth>768){
    var popup = window.open('http://localhost:8000/', '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
}else{
 var popup = window.open('http://localhost:8000/', '');
}
    popup.onload = function() {
        // Open authorize url in pop-up
        	// alert(window.location.hash.length);
        // if(window.location.hash.length == 0) {
        	// document.querySelector('body').innerHTML="";
            popup.open('https://instagram.com/oauth/authorize/?client_id='+instagramClientId+'&redirect_uri='+instagramRedirectUri+'&response_type=token', '_self');
        // }
        // An interval runs to get the access token from the pop-up
        var interval = setInterval(function() {
            try {
                // Check if hash exists
                if(popup.location.hash.length) {
                    // Hash found, that includes the access token
                    clearInterval(interval);
                    popup.close();
                    if(callback != undefined && typeof callback == 'function'){
                    var token = popup.location.hash.slice(14);
                        callback(token);
                    }
                }
            }
            catch(evt) {
                // Permission denied
            }
        }, 100);
    };
};
	 instagramLogin=()=> {
    this.authenticateInstagram(
        'a4120669595b404b815530ba2482a254',
        'http://localhost:3000/',
        this.login_callback //optional - a callback function
    );
    return false;
}
 login_callback=(token)=>{
console.log(token);
fetch('https://api.instagram.com/v1/users/self/?access_token='+token)
.then((resp)=>resp.json())
.then((respjson)=>{
	console.log(respjson);
})
    // alert("You are successfully logged in! Access Token:"+token);
    // $.ajax({
    //     type:"GET",
    //     dataType:"jsonp",
    //     url:"https://api.instagram.com/v1/users/self/?access_token="+accessToken,
    //     success:function(response){
    //         // Change button and show status
    //         $('.instagramLoginBtn').attr('onclick','instagramLogout()');
    //         $('.btn-text').text('Logout from Instagram');
    //         $('#status').text('Thanks for logging in, ' + response.data.username + '!');
            
    //         // Display user data
    //         displayUserProfileData(response.data);
            
    //         // Save user data
    //         saveUserData(response.data);
            
    //         // Store user data in sessionStorage
    //         sessionStorage.setItem("userLoggedIn", "1");
    //         sessionStorage.setItem("provider", "instagram");
    //         sessionStorage.setItem("userData", JSON.stringify(response.data));
    //     }
    //   });
}

	render() {
		return (
			<div className={this.props.className} style={this.props.cssstyle} onClick={()=>this.instagramLogin()}>{this.props.children}</div>
		);
	}
}
