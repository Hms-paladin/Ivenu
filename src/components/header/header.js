import React, {Component} from 'react';
import './header.css';
import logo from '../../images/logo.png';
import birthday from '../../images/birthdayImg1.png';
import search from '../../images/Search.png';
import menu from '../../images/menu.png';
import SearchboxCorner from '../searchpopupbox/searchpopupbox';
import Search_venue from '../search_venue/search_venue';
import LoginSignupModel from '../LoginSignupModel/LoginSignupModel';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Select,Menu, Dropdown, Icon, message,Drawer } from 'antd';
import whatsapp from '../../images/whatsapp_png.png'
import mobilepng from '../../images/mobile_png.png'
import Geocode from "react-geocode";
import { Input,notification } from 'antd';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import links from '../../helpers/apilink';
var loginkey="";

function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      return result.state;
      // geoBtn.style.display = 'none';
    } else if (result.state == 'prompt') {
      return result.state;
    // geoBtn.style.display = 'none';
      // navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
    } else if (result.state == 'denied') {
      return result.state;
      // geoBtn.style.display = 'inline';
    }
    result.onchange = function() {
      return result.state;
    }
  });
}

class Header extends Component
{
	constructor(props) {
		super(props);

		this.state = {LoginModelVisible:false,dropdownOpen:false,top:0,hideuser:true,drawervisible:false,loginDetails:null};


	}

	componentWillReceiveProps(props){
  // alert('');
		// alert(JSON.stringify(props.requestLocation));



		if(props.requestLocation){
			this.getCurrentPosition();
		}
		if(props.loginDetails){
			this.setState({loginDetails:props.loginDetails});
		}
	}
	getCurrentPosition=()=>{
    var self=this;
    // alert("hiii i am");
    navigator.geolocation.getCurrentPosition(position => {
        console.log("currentLocationHandler",position);
       var currentLatLng= {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta:0.005,
          longitudeDelta:0.005,
          coords:position.coords
    }
      
      console.log("latitude",position.coords.latitude);
      console.log("longitude",position.coords.longitude);
      Geocode.setApiKey(links.GLINK);
    Geocode.enableDebug();
    this.getAddress(position.coords.latitude,position.coords.longitude);
   
  });
}

componentWillMount(){
	this.getCurrentPosition();
	// this.checkLogin();
}
getAddress=(lat,lng)=>{
//      Geocode.fromLatLng(lat, lng).then(
//   response => {
//     const address = response.results[0].formatted_address;
//     this.setState({address:address});
//     // this.props.receiveaddr(address);
//     console.log(address);
//   },
//   error => {
//     console.error(error);
//   }
// );
 const myApiKey=links.GLINK;
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("addressheader",responseJson);
          this.props.sendaddress('Loading...',{latitude:0,longitude:0});
        	var stateName="";
          console.log(responseJson)
          if(responseJson.results.length==0){
            return;
          }
          var results=responseJson.results;
           if (results) {
            var country = null, countryCode = null, city = null, cityAlt = null;
            var c, lc, component;
            for (var r = 0, rl = results.length; r < rl; r += 1) {
                var result = results[r];

                if (!city && result.types[0] === 'locality') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'locality') {
                            city = component.long_name;
                            break;
                        }
                    }
                }
                else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                    for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                        component = result.address_components[c];

                        if (component.types[0] === 'administrative_area_level_1') {
                            cityAlt = component.long_name;
                            break;
                        }
                    }
                } else if (!country && result.types[0] === 'country') {
                    country = result.address_components[0].long_name;
                    countryCode = result.address_components[0].short_name;
                }

                if (city && country) {
                    break;
                }
            }
            stateName=city;
            // alert("City: " + city + ", City2: " + cityAlt + ", Country: " + country + ", Country Code: " + countryCode);
        }
// for (var i=0; i<responseJson.results[0].address_components.length; i++) {
//             for (var b=0;b<responseJson.results[0].address_components[i].types.length;b++) {

//             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//                 if (responseJson.results[0].address_components[i].types[b] == "sublocality_level_1") {
//                     //this is the object you are looking for
//                     stateName= responseJson.results[0].address_components[i].long_name;
//                     break;
//                 } 
//             }
//         }
        //   var filterRecords=responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'sublocality_level_1').length > 0);
        // stateName=responseJson.results[0].formatted_address;
        //      this.setState({address:stateName});
        //      // console.log("address",stateName);
             if(this.props.sendaddress){
             this.props.sendaddress(stateName,{latitude:lat,longitude:lng});
           }
             })
}

componentDidMount(){
 
 var myinterval = setInterval(()=>{
      if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      // console.log(LoginData)
      this.setState({loginDetails:LoginData})
      clearInterval(myinterval);
      }
  },4000)
}

	LoginClick=(menu)=>{
     loginkey='';
		// console.log(this.props);
		if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
			if(menu && menu!='addyourvenue'){

			this.setState({drawervisible:true});
		}else{
			this.props.alreadyLogged();
      window.localStorage['pathname']='/addIndividualform/';
      this.props.history.push('/addIndividualform')
		}
		}else{
			// alert("true");
      window.localStorage['pathname']='/addIndividualform/';
      if(menu=='addyourvenue'){
        // alert('addvenue');
        loginkey='addvenue';
        this.setState({LoginModelVisible:true});
      // this.props.history.push('/addIndividualform')
    }else{
      // loginkey='';
        this.setState({LoginModelVisible:true});
      // this.props.history.push('/');
    }
			// this.props.LoginPopup(true);
		}
	}
  clospopup=()=>{
    this.setState({LoginModelVisible:false});
    loginkey='';
    // alert('');
  }

searchBox=(e)=>{
console.log(e.currentTarget.offsetTop);
this.setState({visible:true});
this.setState({top:e.currentTarget.offsetTop+50});
}
changeList=(data)=>{
	// console.log(this.props);
  // this.props.LoginPopup(false);
  // this.setState({drawervisible:false});
	if(data=="Logout"){

		window.localStorage.clear();
		this.setState({loginDetails:null})
    var self=this;
setTimeout(()=>{
  this.props.clearLogin&&this.props.clearLogin();
  self.props.mobroutes.history.push('/');
},300);
	}else if(data=="Login"){

    this.LoginClick();
	}else if(data=='Dashboard'){
      this.props.mobroutes.history.push('/dashboard');
      // this.props.gotoRoutes&&this.props.gotoRoutes('/dashboard')
    // this.props.history.push('/dashboard');
    // console.log(this.props);
  }else if(data=='MyVenues'){
      this.props.mobroutes.history.push('/myvenues');

  }else if(data=='MyCalendar'){
      this.props.mobroutes.history.push('/mycalendar');

  }else if(data=='refer'){
      this.props.mobroutes.history.push('/referearn');
  }else if(data=='home'){
      this.props.mobroutes.history.push('/');
  }
this.setState({drawervisible:false});

}
LogoutClick=()=>{
   window.localStorage.clear();
    window.location.assign(window.location.origin+window.location.pathname);
}
loadLoginData=(data)=>{
  // alert(JSON.stringify(data))
  this.setState({LoginModelVisible:false});
  if(loginkey=='addvenue'){
    this.props.history.push('/addIndividualform')
  this.props.sendLoginData&&this.props.sendLoginData(data)
  }
}
changeSearchedData=(data)=>{
  // console.log("searchedOFDATAdata",data);
  // if(data)
  if(data.data.length==0){
       notification.error({
           message:'Error Message',
    description:"No Records Found...",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
    return;
  }
	this.setState({visible:false});
this.props.homesearchedVenue&&this.props.homesearchedVenue(data.data)
}
toggle=()=>{
  this.setState({dropdownOpen:!this.state.dropdownOpen});
}
goWhasApp=(number)=>{
  var a = document.createElement('a');
   a.href = "http://web.whatsapp.com/send?phone="+number;
      a.setAttribute('target', '_blank');
   a.click();
}
	render()
	{
		return(

			<div className="Webpage_List-My-Venue-Open">
      
			 <Drawer
          title={null}
          placement="right"
          visible={this.state.drawervisible}
          closable={false}
          onClose={()=>this.setState({drawervisible:false})}
        >
         <div className="drawerCustomHeader clearfix">
        <div style={{width:'80%'}}>
        
          <p>
         Welcome <i>{this.state.loginDetails?this.state.loginDetails.user_name:"Guest User"}</i><br/>
         {this.state.loginDetails&&<small>venue provider</small>}
         </p>
         </div>
         <div className="drawerHeaderRight">
         <div  onClick={()=>this.setState({drawervisible:false})} class="ui icon input meniconheader" style={{border:"none",width:30,    textAlign:'right',fontSize:22}}>
         <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    </div>
   
         </div>
          <div className="drawerCustomBody">
    <ul>
    <li onClick={()=>this.changeList('home',)} className={`${this.state.active=='home'?'active':''}`}>Home</li>
     {/*<li onClick={()=>this.changeList('Action')}  className={`${this.state.active=='Action'?'active':''}`}>Action Items</li>*/}
    <li onClick={()=>this.changeList('Dashboard')}  className={`${this.state.active=='Dashboard'?'active':''}`}>Dashboard</li>
    {window.localStorage['LoginData']&&
       <li onClick={()=>this.changeList('MyVenues')}  className={`${this.state.active=='MyVenues'?'active':''}`}>My Venues</li>
     }
     {window.localStorage['LoginData']&&
       <li onClick={()=>this.changeList('MyCalendar')}  className={`${this.state.active=='MyCalendar'?'active':''}`}>My Calendar</li>
     }
    {/*<li onClick={()=>this.changeList('Enquiries')}  className={`${this.state.active=='Enquiries'?'active':''}`}>Enquiries</li>*/}
    <li onClick={()=>this.changeList('refer')}  className={`${this.state.active=='Loyalty'?'active':''}`}>Refer & Earn</li>
     {window.localStorage['LoginData']&&
    <li onClick={()=>this.changeList('Logout')}  className={`${this.state.active=='Logout'?'active':'active'}`}>Logout</li>
  }  {!window.localStorage['LoginData']&&
    <li onClick={()=>this.changeList('Login')}  className={`${this.state.active=='Logout'?'active':'active'}`}>Login</li>
  }

    </ul>
    </div>
        </Drawer>
			<div className="in-header searchboxCornerHeader">
			<div className="part1">
				{this.props.mobile&&
				<div className="logo-div" onClick={this.props.ClearData&&this.props.ClearData}><img src={logo} className="pic"/>

        </div>
				}
				{!this.props.mobile&&
          <>
				<Link to="" onClick={()=>this.props.clearToHome("")} className="logo-div"><img src={logo} className="pic"/>
       
         </Link>
           {this.props.children}
           </>
				}
			<div className="drop-div"><div className={`userDivName ${!this.state.loginDetails?'mobhideuser':''}`}><span>Welcome </span>{this.state.loginDetails&&this.state.loginDetails.user_name}</div>
           {this.props.mobile&&this.props.children}
  
      </div>
			</div>
      
			<div className="part2">
			{this.props.mobile&&
				<div className="Add-Your-Venue" ><Link to="/veneulist">Add Your <span style={{color:'#A60202'}} className="text-style-1">Venue</span></Link></div>
			}
			{!this.props.mobile&&
        <div>
        <div className="socialheadericons"><span>Need Support ?</span><span style={{cursor:'pointer'}} onClick={()=>this.goWhasApp('919884042119')}><img src={whatsapp}/><small> +91 98840 42119</small></span><span><img src={mobilepng}/><small className="marginleft">+91 95900 20684</small></span></div>
        <div className="ivneulistvenue">
        <span>List Multiple Venue Types and Earn through them</span>
				<div className={`Add-Your-Venue ${this.props.moredetails?'moredetailspage':null} ${window.localStorage['LoginData']?'loggedinHeader':''}`} onClick={()=>this.LoginClick('addyourvenue')}>Add Your <span  style={{color:'#A60202'}} className="text-style-1">Venue</span></div></div>
        </div>
			}
      <div className="LogoutHeader">
      {window.localStorage['LoginData']&&
       <ButtonDropdown className="logoutDropdownBtn" isOpen={this.state.dropdownOpen} toggle={()=>this.toggle()}>
      <DropdownToggle >
        <img src={birthday} className="imageDropdown"/>
      <p>{this.state.loginDetails&&this.state.loginDetails.user_name}</p>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem ><Link to="" onClick={()=>this.props.clearToHome("")}>Home</Link></DropdownItem>
        <DropdownItem divider />
        <DropdownItem ><Link to="/myvenues" onClick={()=>this.props.switchRoute('myvenues')}>My Venues</Link></DropdownItem>
        <DropdownItem divider />
        <DropdownItem ><Link to="/mycalendar" onClick={()=>this.props.switchRoute('mycalendar')}>My Calendar</Link></DropdownItem>
        <DropdownItem divider />
        <DropdownItem  onClick={()=>this.LogoutClick()}><a>Logout</a></DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
    }
    {!window.localStorage['LoginData']&&
        <a onClick={()=>this.LoginClick()} className={`${this.props.moredetails?'moredetailspage':null}`}>
      Login
      </a>
    }
      
      </div>
			<div className={`icon-div ${this.props.moredetails?'moredetailspage':null}`}>
      {/*
			<div className="search-div" style={{cursor:'pointer'}}><img className="search-lence" onClick={(e)=>this.searchBox(e)} src={search}/></div>*/}
			<div className="menu-div" onClick={()=>this.setState({drawervisible:true})} > <img  className="menu-icon" src={menu}/> </div>

			</div>
			</div>
			{this.state.visible&&
			<SearchboxCorner top={this.state.top}>
			<Search_venue cancelsearch={()=>this.setState({visible:false})} searchedData={(data)=>this.changeSearchedData(data)}/>
			</SearchboxCorner>
		}
			</div>
		  {this.state.LoginModelVisible==true&&
				<LoginSignupModel   videomodalPopup={false} visible={true} clospopup={()=>this.clospopup()} type='login' loginttype="List Your Venue"  LoginLoad={(data)=>this.loadLoginData(data)} />
      }
			</div>



			)
	}
}
export default withRouter(Header);