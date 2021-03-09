import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BookingCheckout from './pages/BookingCheckout/BookingCheckout'; 
import SpinnerLoading from './FormJSON/searchlocation.json';
import ControlledLottie from './components/LottieComp';
import calendarData from './images/carouselloader.json';
import MobileApproutes from './routes/MobileApproutes';
import { withRouter,BrowserRouter as Router } from "react-router-dom";

var urlParams = window.location.href.includes('mobilefor_payment');
if(!urlParams){

var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
		ReactDOM.render(<App/>, document.getElementById('root'));
       // alert("completed");
       return;
        // done();
    }else{
    }    
}, 100);
}else{

	ReactDOM.render(<MobileApproutes/>,document.getElementById('root'))
}
// alert(urlParams.has('mobilefor_payment'));
if(urlParams==true){
}else{
ReactDOM.render(<ControlledLottie animationData={SpinnerLoading}/>, document.getElementById('root'));
}
    	

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers:https://bit.ly/CRA-PWA
serviceWorker.unregister();
