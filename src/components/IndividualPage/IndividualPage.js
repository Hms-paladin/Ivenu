import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../../components/header/header';
import Subheader from '../../components/subheader/subheader'
import Popupbox from '../../components/popupbox/popupbox';
import BreadCrump from '../../components/breadcrump/breadcrump';
import LookingFor from '../../components/LookingFor/LookingFor';
import Carousel from '../../components/carousel/carousel';
import OvalButton from '../../components/oval_button/oval_button'
import Homeslider from '../../components/homeslider/homeslider'
import Searchvenue from '../../components/SearchVenue/searchvenue';
import Circle from '../../components/circle/circle';
import Nextarrow from '../../components/nextarrow/nextarrow';
import Morefilter from '../../components/morefilter/morefilter';
import NearByPlayGround from '../../components/nearByPlayGround/nearByPlaGround'
import Footer from '../../components/footer/footer';
import SoccerGround from '../../components/soccer_ground/soccerGround';
// import Btnclick from '../../components/btn-click/btn-click';
// import Modalview from '../../components/modal/modal';
import Apilink from '../../helpers/apilink';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';

import IndividualForm from '../../components/IndividualForm/IndividualForm';
import IndividualMostPopular from '../../components/IndividualMostPopular/IndividualMostPopular';
import homecss from  './IndividualPage.css';
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'play'},{id:2,name:'work'},{id:3,name:'enjoy'}]}

export default class Home extends React.Component {


	constructor(props) {
		super(props);
		this.state={activeid:1,visible:false,doDropdown:{id:'venue_act_id',name:'venue_act_name',dropdown:[]},whatDropdown:{id:'venue_spec_id',name:'venue_spec_name',dropdown:[]},whereDropdown:{id:'trn_venue_spec_id',name:'trn_venue_name',dropdown:[]},dovalue:'',whatvalue:'',wherevalue:'',searchdata:'',countryDropdown:{value:'id',name:'name',dropdown:[{id:1,name:'Newyork'},{id:2,name:'California'},{id:3,name:'Japan'}]}}
	}
  circleChange=(data)=>{
    this.setState({activeid:data})
  }
  arrowClick=()=>{
  	this.setState({visible:true})
  }
  clospopup=()=>{
  	this.setState({visible:false})
  }
   arrowClick=()=>{
  fetch(Apilink.apiurl+'dropdownSearch', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'trn_venue_name':this.state.wherevalue.trn_venue_name}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({searchdata:responseJson});
      console.log(responseJson);
      // this.props.sendsearchdata(responseJson.data);

    })  
    //this.props.receivesearch(data);
    //this.setState({visible:true})
  }
  loaddo(){
    fetch(Apilink.apiurl+'do', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(),
    }).then((response)=>response.json())
    .then((responseJson)=>{
        var doDropdown=this.state.doDropdown;
    doDropdown.dropdown=responseJson.data;
    this.setState({doDropdown})
console.log("do",this.state.doDropdown);

    })  
  }
  loadwhat(data){
    fetch(Apilink.apiurl+'what', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    var whatDropdown=this.state.whatDropdown;
    whatDropdown.dropdown=responseJson.data;
    this.setState({whatDropdown})
    console.log("what",this.state.whatDropdown);
    })  
  }
  loadwhere(data){
    console.log("where_id",data);
    fetch(Apilink.apiurl+'where', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'trn_venue_spec_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
  var whereDropdown=this.state.whereDropdown;
    whereDropdown.dropdown=responseJson.data;
    this.setState({whereDropdown})
    console.log("where",responseJson);

    })  
  }
  componentWillMount(){
    this.loaddo();
  
  }
  receivedodrop=(data,key)=>{
console.log("dovalue",data);
this.setState({[key]:data});
if(key=='dovalue'){
  this.setState({whatvalue:null})
this.loadwhat(data.venue_act_id); 
}else if(key=='whatvalue'){
this.setState({wherevalue:null})
this.loadwhere(data.venue_spec_id);
}
  }
    logout=()=>{
    window.localStorage.clear();
    window.location.assign(window.location.origin+window.location.pathname);
  }
  render() {
    return (
      <div className="HomePageDiv InvdividualPageDiv">
      <Header>
      <Popupbox buttonText={this.state.countryvalue?this.state.countryvalue.name:'Newyork'}  dropdown={this.state.countryDropdown}  buttonColor={'transparent'} buttonTextColor={'black'} sendPopupData={(data)=>this.receivedodrop(data,'countryvalue')} popupColor={'white'} popupTextColor={'black'}/>
      </Header>
      <Subheader bgcolor={"#a60202"}>
      <div className="home_droddownflex">
      <span>I want to</span>
      <div className="home_dropdownflexItem">
     <Popupbox buttonText={this.state.dovalue?this.state.dovalue.venue_act_name:'DO'} sendPopupData={(data)=>this.receivedodrop(data,'dovalue')} dropdown={this.state.doDropdown} buttonColor={'#fff'} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
      </div>
      <div className="home_dropdownflexItem">
     <Popupbox buttonText={this.state.whatvalue?this.state.whatvalue.venue_spec_name:'WHAT'}  sendPopupData={(data)=>this.receivedodrop(data,'whatvalue')} dropdown={this.state.whatDropdown} buttonColor={'#fff'} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
      </div>
      <span>in</span>
      <div className="home_dropdownflexItem">
     <Popupbox buttonText={this.state.wherevalue?this.state.wherevalue.trn_venue_name:'WHERE'} width={200} dropdown={this.state.whereDropdown} buttonColor={'#fff'} sendPopupData={(data)=>this.receivedodrop(data,'wherevalue')} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
      </div>
      <Nextarrow nextSearchFunc={this.arrowClick}/>
      </div>
         {window.localStorage['LoginData']&&
      <div class="logoutBtn"><button type="button" class="venuedrop btn btn-secondary" onClick={()=>this.logout()}>Logout</button></div>
    }
      </Subheader>

      <Carousel />
      <Subheader bgcolor={"#0f3eb0"}>

      <BreadCrump/>

      <Morefilter text={"MoreFilter"}/>

      </Subheader>

      <Route path="/" exact component={IndividualMostPopular} />
      <Route path="/addIndividualform/"  render={(props)=><IndividualForm {...props} userName={this.props.userName} corporateClick={()=>{this.props.CorporateClick()}}/>}/>
      <NearByPlayGround addvenueProps={()=>this.props.addvenueProps&&this.props.addvenueProps('moredetails')}  />

      <Homeslider addvenueProps={()=>this.props.addvenueProps&&this.props.addvenueProps('moredetails')} history={this.props.history} displaySlider={this.state.searchdata}/>
      <Footer/>
      </div>
      );
  }
}
