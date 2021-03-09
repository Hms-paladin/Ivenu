import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 import { Input,Button,message,notification} from 'antd';
import Apilink from '../helpers/apilink';
export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
  console.log(props);
  var currency=(!props.bookobj.trn_venue_type||props.bookobj.trn_venue_type==1)?(props.bookobj.price[0].trn_venue_price_currency):(props.bookobj.trn_venue_type==2?(props.currentpackage&&props.currentpackage.priceDetails[0].currency):this.props.currentSeatCurrency);
    // alert(currency);
    this.state = {amt:props.totalamount,venue_name:props.bookobj.trn_venue_name,category:props.bookobj.venue_cat_name,img:props.bookobj.photos.length>0?props.bookobj.photos[0].venue_image_path:require('../images/imageloader.png'),currency:currency,venue_id:props.bookobj.venue_id};
  }
  
  onToken = (token) => {
    console.log('token',token);
    // console.log(this.props.bookingDetails);
    this.props.bookingDetails.currency=this.state.currency;
    this.props.bookingDetails.amt=this.props.totalamount*100;
    token.bookdetails=this.props.bookingDetails;
    this.props.send&&this.props.send({loading:true});
    fetch(Apilink.apiurl+"charge/", {
        headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
      method:'POST',
      body:JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
       console.log(data);
       if(data.error){
       this.props.send&&this.props.send({loading:false,success:false});
           notification.error({
    message:'Error Message',
    duration:50,
    description:data.error,
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
         }else{
           this.props.send&&this.props.send({loading:false,success:true});
    
        this.props.history.push('/');
           alert("Payment Done Please wait while we redirecting to home page")
           var self=this;
           setTimeout(()=>{
                    notification.success({
    message:'Notification',
    duration:50,
    description:this.state.venue_name+" Venue is booked successfully, details sent to your stripe email id,thank you.",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
                  // window.location.reload();
           },3000);
   
         }
      });
    }).catch(()=>{
      // alert("network error");
       this.props.send&&this.props.send({loading:false,success:false});
    });
  }

 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
       image={this.state.img} // the pop-in header image (default none)
        token={this.onToken}
          label="Go Premium" //Component button text
      name={this.state.venue_name} //Modal Header
      description={this.state.category}
      currency={this.state.currency}
      amount={this.props.totalamount*100} //Amount in cents $9.99
        // stripeKey="pk_live_lNbjOKY6WEvzCFIkz1kAhgSF002UZjb0bm"
        stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
      >
{this.props.children}
      </StripeCheckout>
    )
  }
}