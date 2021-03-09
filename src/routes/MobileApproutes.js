import React from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter} from "react-router-dom";
import MobileHome from '../pages/MobileHome/MobileHome';
import MobileVenueList from '../pages/MobileVenueList/MobileVenueList';
import Dashboard from '../pages/Dashboard/Dashboard';
import ReferEarn from '../pages/Refer_Earn/referEarn';
import MobSearchVenueList from '../pages/MobSearchVenuList/MobSearchVenueList';
import IndividualForm from '../components/IndividualForm/IndividualForm';
import CorporateForm from '../components/CorporateForm/CorporateForm';
import Homeslidercontent from '../components/homeslidercontent/homeslidercontent';
import MyVenues from '../pages/MyVenues/myvenues';
import VenueMoreDetails from '../pages/VenueMoreDetails/VenueMoreDetails';
import BookingCheckoutMobile from '../pages/BookingCheckout/BookingCheckoutMobile';
import CheckoutDate from '../pages/BookingCheckout/CheckoutDate';
import MyCalendarMobile from '../pages/MyCalendar/MyCalendarMobile';

 class MobileApproutes extends React.Component {

	constructor(props) {
		super(props);
		this.state={myhistoryprops:null};
	}
	
	componentDidMount(){

		// if(this.props.history.location.pathname=='/ivneu/'){
		// this.props.history.push('/');
		// }
		// this.props.sendRoutes&&this.props.sendRoutes(this.props);
	}
	componentWillReceiveProps(props){
		// alert("loading data");
		// alert(JSON.stringify(props));
	}
	loadProps=(props)=>{

		this.setState({myhistoryprops:props})
		// this.props.sendRoutes(props);
	}
	
	render() {
		return (
			<div>
				<Router basename="/?/">
				<Route path={'/checkout/:venueid/'} render={(props)=><BookingCheckoutMobile receiveProps={(props)=>this.loadProps(props)} loadtohome={()=>this.setState({userType:null})} {...props}/>}/>
				<Route path={'/checkoutdata/'} render={(props)=><CheckoutDate {...props} receiveProps={(props)=>this.loadProps(props)}/>} />
				<Route path={'/mycalendar/:userid/'}  render={(props)=><MyCalendarMobile receiveProps={(props)=>this.loadProps(props)} {...props} />} />
				</Router>
			</div>
		);
	}
}
export default MobileApproutes;