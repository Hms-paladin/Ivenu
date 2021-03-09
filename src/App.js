import React from 'react';
import logo from './logo.svg';
import Header from './components/header/header';
import Popupbox from'./components/popupbox/popupbox';
import SearchboxCorner from './components/searchpopupbox/searchpopupbox';
import MapviewComp from './components/MapviewComp';
import Search_venue from './components/search_venue/search_venue';
import SoccerGround from './components/soccer_ground/soccerGround';
 import { Input,Button,message} from 'antd';

// import Modalview from './pages/modal/modal';
// import Paginationview from './pages/pagination/pagination';
// import Btnclick from './pages/btn-click/btn-click';
// import Circle from './components/circle/circle';
// import Dropdown from './components/dropdown';
// import Nextarrow from '../../components/nextarrow/nextarrow';

import Pop_Up_Center from './components/Pop_Up_Center/Pop_Up_Center';
import ControlledLottie from './components/LottieComp';
import Footer from './pages/footer/footer';
import Home from './pages/home/home';
import MyVenues from './pages/MyVenues/myvenues';
import MyCalendar from './pages/MyCalendar/MyCalendar';
import VenueMoreDetails from './pages/VenueMoreDetails/VenueMoreDetails';
import MobileVenueList from './pages/MobileVenueList/MobileVenueList';
import LocationScreen from './pages/LocationScreen/LocationScreen';
import MobileHome from './pages/MobileHome/MobileHome';
import BookingCheckout from './pages/BookingCheckout/BookingCheckout';
import IndividualForm from './components/IndividualForm/IndividualForm';
import LoginSignupModel from './components/LoginSignupModel/LoginSignupModel';
import IndividualPage from './pages/IndividualPage/IndividualPage';
import CorporatePage from './pages/CorporatePage/CorporatePage';
import CorporateForm from './components/CorporateForm/CorporateForm';
import Corporate_near_you from './components/Corporate_near_you/Corporate_near_you'
import Listvenue_mob_responsive from './components/listvenue_mob_responsive/listvenue_mob_responsive'
import CalendarScheduler from './calendarScheduler';
import Mobileroutes from './routes/Mobileroutes';
// import Specific from './pages/specific-venue/specific-venue';
// import SubHead from './pages/subHead';
// import Dropdown from './components/dropDown/dropDown';
// import UnitedSoccer from './components/unitedSoccer/unitedSoccer';
import Carousel from './components/carousel/carousel';
import NearByGround_res from './components/nearByGround_responsive/nearByGround_res';
// import NearByPlaGround from './components/nearByPlayGround/nearByPlaGround';
// import SuggestionBirth from './components/SuggestionBirthday/suggestionBirth';
import IvenuVideos from './components/ivenuevideo/ivenuvideo';
import WeekCalendar from './components/weekCalendar/WeekCalendar';
import { BrowserRouter as Router, Route, Link,withRouter,useParams  } from "react-router-dom";
// import SoccerGround from './components/soccer_ground/soccerGround';
import MyMessage from './pages/Webchat/MyMessage';
import gpsicon from './images/gpsicon.png';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
var playarray={value:'id',name:'name',dropdown:[]}
// console.log = function() {}
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
class App extends React.Component {

  constructor(props) {  
    super(props);
    // console.log = function() {}
    console.log('props',props);

    this.state={
      LoginModelVisible:false,
      userName:"",
      loginDetails:null,
      userType:null,
      requestLocation:false,
      popup_position:{top:0,left:0},open:null,
      searchedVenueList:null,
      screenWidth:window.innerWidth,
      address:null,
      latlng:{latitude:0,longitude:0},
      mobroutes:null,
      scroll:true,
      venuecategory:null,
      locationEnabled:false,
      lat:0,
      lng:0,
      contenttype:null,
      moredetails:null
    };


  }

  toggleFunction=(e)=>{
    console.log(e)
    let offsetTop  = this.instance.getBoundingClientRect().top+38;
    let offsetLeft  = this.instance.getBoundingClientRect().left;
    let offsetWidth  = this.instance.getBoundingClientRect().width;
    let height  = this.instance.getBoundingClientRect().height;
    this.setState({popup_position:{top:offsetTop,left:offsetLeft,width:offsetWidth }});
    this.setState({open:true});
  }

  LoginLoad =(data)=>{
    // alert(data);
    // alert('moredtails');
       if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      console.log(LoginData)
      this.setState({loginDetails:LoginData,contenttype:null,moredetails:false})
      // window.location.reload();

      this.setState({userType:LoginData.user_cat_id,userName:LoginData.user_name +" "+ LoginData.user_surname,scroll:false})
    }else{
      // alert("not logged in .....")
      if(data=='addvenue'){
          // window.scrollTo({left:0,top:300, behavior:'smooth'});
      this.setState({LoginModelVisible:true});
    }else{
      this.setState({userType:1,moredetails:true},function(){
        // this.setState({userType:null});
      })
    }
    }
  }
  searchedVenue=(data)=>{
    // console.log("searchedVenue",data);
      var searchedVenueList=this.state.searchedVenueList;
      searchedVenueList=[];
    this.setState({searchedVenueList:data,venuecategory:data.length>0?{venue_cat_id:data[0].venue_cat_id,venue_cat_name:data[0].venue_cat_name}:null});
    this.setState({scroll:true});
    var self=this;
    setTimeout(()=>{
    self.setState({scroll:false})
    },2000)
  }

receiveAddress=(data,latlng)=>{
  // alert(data);
  console.log(data);
  this.setState({address:data});
  this.setState({latlng:latlng});
}
  clospopup=()=>{
  this.setState({LoginModelVisible:false});
  window.history.back();
  }
  ClearData=()=>{
    this.setState({searchedVenueList:null});
    this.state.mobroutes.history.push('/');
  }
  handleConnectionChange=()=>{
   // alert(navigator.onLine);
    // const condition=navigator.onLine?'online':'offline';
    // console.log(condition);
    // if(condition==='online'){
    //   message.success("Network Available...");
    // }else{
    //   message.error("Nework Unavailable...");
    // }
  }
  componentWillMount(){

  console.log('propsDat',this.props);
  }

  gotoRoutes=(path)=>{
    // alert(path);
    this.state.mobroutes.history.push(path);
  }
  gotoaddvenue=(data)=>{
    var self =this;
    this.setState({gotoaddvenueavail:true},function(){
    setTimeout(()=>{
    // self.setState({gotoaddvenueavail:null})
    },500);
    })
  }
  render(){
     // let { topicId } = useParams();
     // console.log(useParams)
    // alert(JSON.stringify(this.state));
    return (

      <div className={`App MainDivResponsive`}>
      <Router basename="/?">
      <Route path="/bookingform" render={()=><BookingCheckout/>} />
      </Router>
      {this.state.locationEnabled==false&&
      <LocationScreen locationsuccess={()=>this.setState({locationEnabled:true})}/>
    }
    {this.state.locationEnabled&&
      <div>

      {this.state.screenWidth>767&&
      
      <Router basename="/?">
      
      
      <Header sendLoginData={(data)=>this.LoginLoad()} moredetails={this.state.moredetails} gotoaddvenue={this.state.gotoaddvenueavail?this.state.gotoaddvenueavail:null}  clearToHome={()=>this.setState({userType:null,contenttype:null})} requestLocation={this.state.requestLocation} sendaddress={(data,latlng)=>this.receiveAddress(data,latlng)} homesearchedVenue={(data)=>this.searchedVenue(data)} LoginPopup={(data)=>{this.setState({LoginModelVisible:data});this.setState({searchedVenueList:null,scroll:false});}} switchRoute={(data)=>this.setState({userType:1})} alreadyLogged={this.LoginLoad}>
       <div title={this.state.address?this.state.address:''} className="locationName"><img src={gpsicon}/> {this.state.address?this.state.address:''}</div>
</Header>
      
      <Route path="/" exact initial render={(props)=>
     <Home history={props.history} clearScroll={()=>this.setState({scroll:false})}  addvenueProps={()=>this.LoginLoad('moredetails')}  scroll={this.state.scroll} latlng={this.state.latlng}  LoginLoad={()=>this.LoginLoad('addvenue')} categoryName={this.state.searchedVenueList&&this.state.searchedVenueList.length>0&&this.state.searchedVenueList[0].venue_cat_name} searchedVenue={this.state.searchedVenueList}/>
     }/>  
     <Route path="/addIndividualform/" initial render={(props)=>
     <IndividualPage  history={props.history} addvenueProps={()=>this.LoginLoad('moredetails')} 
      scroll={this.state.scroll} CorporateClick={()=>this.setState({userType:null,LoginModelVisible:true})}
       requestLocation={()=>{this.setState({requestLocation:true})}} latlng={this.state.latlng}
        categoryName={this.state.searchedVenueList&&this.state.searchedVenueList.length>0&&this.state.searchedVenueList[0].venue_cat_name} 
        searchedVenue={this.state.searchedVenueList} homeClick={()=>{this.setState({userType:null})}} userName={this.state.userName}/>
   }/>
     <Route path="/corporateForm/" initial render={(props)=>
     <CorporatePage history={props.history}  addvenueProps={()=>this.LoginLoad('addvenue')} scroll={this.state.scroll} CorporateClick={()=>this.setState({userType:null,LoginModelVisible:true})} latlng={this.state.latlng} categoryName={this.state.searchedVenueList&&this.state.searchedVenueList.length>0&&this.state.searchedVenueList[0].venue_cat_name} searchedVenue={this.state.searchedVenueList} homeClick={()=>{this.setState({userType:null})}} userName={this.state.userName}/>
     }/>
     
    <Route path={'/myvenues'} render={()=><MyVenues />}/>
    <Route path={'/mycalendar'} render={()=><MyCalendar/>}/>
    <Route path={'/moredetails/:venueid'} render={(props)=><VenueMoreDetails {...props}/>}/>
    <Route path={'/checkout/:venueid'} render={(props)=><BookingCheckout loadtohome={()=>this.setState({userType:null})} {...props}/>}/>
    <Route path={'/mymessage/:venueid'} render={(props)=><MyMessage loadtohome={()=>this.setState({userType:null})} {...props}/>}/>

  
</Router>
}
{this.state.screenWidth<768&&
<Router  basename="/?">
 <Header  requestLocation={this.state.requestLocation} ClearData={()=>this.ClearData()} clearLogin={()=>this.setState({loginDetails:null})} loginDetails={this.state.loginDetails} mobroutes={this.state.mobroutes} sendaddress={(data,latlng)=>this.receiveAddress(data,latlng)} mobile={true} homesearchedVenue={(data)=>this.searchedVenue(data)} LoginPopup={(data)=>{this.setState({LoginModelVisible:data})}} alreadyLogged={(data)=>this.LoginLoad(data)}>
       <div className="locationName">{this.state.address?this.state.address:''}</div>
</Header>

<Mobileroutes  sendLoginData={(data)=>this.setState({loginDetails:data})} sendRoutes={(data)=>this.setState({mobroutes:data})} searchedVenueList={this.state.searchedVenueList} venuecategory={this.state.venuecategory} />
</Router>
}
 {this.state.LoginModelVisible == true && 
  <div>
  <LoginSignupModel venueload={this.state.addvenueload?this.state.addvenueload:null}  videomodalPopup={false} visible={true} clospopup={this.clospopup} type='login' loginttype="List Your Venue"  LoginLoad={(data)=>{ this.setState({LoginModelVisible:false,loginDetails:data,userType:window.location.search=="?/"?null:data.user_cat_id});this.gotoaddvenue(true);}} />
</div>
}
</div>
}
</div>
   );
  }

  componentDidMount=()=>{
    var self=this;
    window.onresize = function(event) {
      // console.log(window.innerWidth);
      // alert();
      if(detectmob()==false){
      self.setState({screenWidth:window.innerWidth});
      }
    };
    if(window.location.search=="?/addIndividualform" || window.location.search=="?/addIndividualform/" || window.location.search=="?/myvenues"  || window.location.search=="?/mycalendar" || window.location.href.match('checkout/id=')) {  
    this.LoginLoad();
    }
    if(window.location.href.match('moredetails/id=')){
      // this.setState({userType:1})
      this.LoginLoad('moredetails');
    }
  }
}

export default App;



