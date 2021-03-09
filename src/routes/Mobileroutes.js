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
import MyMessage from '../pages/Webchat/MyMessage';

 class Mobileroutes extends React.Component {

	constructor(props) {
		super(props);
		this.state={myhistoryprops:null};
	}
	componentDidMount(){
		// alert(this.props.history.location.pathname);
		// if(this.props.history.location.pathname=='/ivneu/'){
		// this.props.history.push('/');
		// }
		// this.props.sendRoutes&&this.props.sendRoutes(this.props);
	}
	componentWillReceiveProps(props){
		// alert("loading data");
		// alert(JSON.stringify(props));
		if(props.searchedVenueList){
			// console.log(props);
			if(props.searchedVenueList.length>0){
				// this.props.history.push('/searchList');
				this.state.myhistoryprops.history.push('/searchList',{datalist:props.searchedVenueList,venuecategory:props.venuecategory});
			}
		}
	}
	loadProps=(props)=>{

		this.setState({myhistoryprops:props})
		this.props.sendRoutes(props);
	}
	receiveSearchDetails=(data,propshistory,data1)=>{	
		propshistory.history.push('/searchList',{datalist:data,category:data1});
	}
	render() {
		return (
			<div>
				<Route path="/"  exact  render={(props) => <MobileHome receiveProps={(props)=>this.loadProps(props)} refresHeader={()=>this.props.refresHeader&&this.props.refresHeader()} {...props} sendSearchedDetails={(data,propshistory,data1)=>this.receiveSearchDetails(data,propshistory,data1)}/>} />
				<Route path="/veneulist"  exact render={(props) => <MobileVenueList {...props} receiveProps={(props)=>this.loadProps(props)} />} />
				<Route path="/homeslidermob"  exact render={(props) => <Homeslidercontent {...props} receiveProps={(props)=>this.loadProps(props)} />} />
				<Route path="/dashboard"   render={(props) => <Dashboard {...props} receiveProps={(props)=>this.loadProps(props)} />} />
				<Route path="/referearn"   render={(props) => <ReferEarn {...props} receiveProps={(props)=>this.loadProps(props)} />} />
				<Route path='/myvenues' render={(props)=><MyVenues {...props} receiveProps={(props)=>this.loadProps(props)} />}/>
				<Route path="/searchList" exact render={(props) => <MobSearchVenueList sendLoginData={this.props.sendLoginData&&this.props.sendLoginData} {...props} receiveProps={(props)=>this.loadProps(props)}/>} />
				<Route path="/individualForm" exact render={(props) => <IndividualForm {...props} receiveProps={(props)=>this.loadProps(props)}/>} />  
				<Route path={'/moredetails/:venueid'} render={(props)=><VenueMoreDetails {...props} receiveProps={(props)=>this.loadProps(props)}/>}/>
				<Route path="/corporateForm" exact render={(props) => <CorporateForm {...props} receiveProps={(props)=>this.loadProps(props)}/>} />
				<Route path={'/checkout/:venueid'} render={(props)=><BookingCheckoutMobile receiveProps={(props)=>this.loadProps(props)} loadtohome={()=>this.setState({userType:null})} {...props}/>}/>
				<Route path={'/checkoutdata/'} render={(props)=><CheckoutDate {...props} receiveProps={(props)=>this.loadProps(props)}/>} />
				<Route path={'/mycalendar'}  render={(props)=><MyCalendarMobile receiveProps={(props)=>this.loadProps(props)} {...props} />} />

<Route path="/mymessage/:venueid"  exact render={(props) => <MyMessage {...props} receiveProps={(props)=>this.loadProps(props)} />} />
				
			</div>
		);
	}
}
export default Mobileroutes;