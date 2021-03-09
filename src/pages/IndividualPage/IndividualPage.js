import React from 'react';
import { BrowserRouter as Router, Route, Link,withRouter  } from "react-router-dom";
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
import CorporateForm from '../../components/CorporateForm/CorporateForm';
import IndividualMostPopular from '../../components/IndividualMostPopular/IndividualMostPopular';
import homecss from  './IndividualPage.css';
import {notification} from 'antd';
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'play'},{id:2,name:'work'},{id:3,name:'enjoy'}]}

class IndividualPage extends React.Component {


	constructor(props) {
		super(props);
    console.log('propshistory',props);
		this.state={chosenlocation:{latitude:0,longitude:0},TOS:0,searchedVenue:null,userCatId:null,userName:null,activeid:1,visible:false,doDropdown:{id:'venue_act_id',name:'venue_act_name',dropdown:[]},whatDropdown:{id:'venue_purpose_id',name:'venue_purpose_name',dropdown:[]},whereDropdown:{id:'venue_cat_id',name:'venue_cat_name',dropdown:[]},dovalue:'',whatvalue:'',wherevalue:'',searchdata:'',countryDropdown:{value:'id',name:'name',dropdown:[{id:1,name:'Newyork'},{id:2,name:'California'},{id:3,name:'Japan'}]},}
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
     // if(!this.state.wherevalue){
     //    return;
     // }
     var userid=null;
     if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
        var LoginData=JSON.parse(localStorage.getItem('LoginData'));
        userid=LoginData.user_id;
      }
     this.setState({searchedVenue:null})
  fetch(Apilink.apiurl+'dropdownSearchpurpose_new', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':this.state.dovalue?this.state.dovalue.venue_act_id:null,'venue_purpose_id':this.state.whatvalue?this.state.whatvalue.venue_purpose_id:null,'venue_cat_id':this.state.wherevalue?this.state.wherevalue.venue_cat_id:null,'TOS':this.state.TOS,searchCategory:2,userId:userid,lat:this.state.chosenlocation.latitude,long:this.state.chosenlocation.longitude}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      // this.setState({searchdata:responseJson});
      //   this.setState({scroll:true});
      console.log(responseJson);
      if(responseJson.status&&responseJson.status==1){
           notification.error({
           message:'Error Message',
    description:"Options are empty to search...",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
      }else{
        if(responseJson.length==0){
           notification.error({
           message:'Error Message',
    description:"No Records Found",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
        }else{
     this.setState({searchdata:responseJson});
        this.setState({scroll:null});
      // this.loadOvalCount();
        }
      }
      // this.loadOvalCount();
      // console.log("arrowsearch",responseJson.data.length==0);
  //     if(responseJson.data.length==0){
  //         notification.error({
  //          message:'Error Message',
  //   description:"No Results Found",
  //   onClick:() => {
  //     console.log('Notification Clicked!');
  //   },
  // })
  //         return;
  //     }
  //     this.props.sendsearchdata(responseJson.data);

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
    // console.log("whatpurpose",data);
    fetch(Apilink.apiurl+'whatpurpose', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    console.log("what",this.state.whatDropdown);
    var whatDropdown=this.state.whatDropdown;
    whatDropdown.dropdown=responseJson.data;
    this.setState({whatDropdown})
    })  
  }
  loadwhere(data,data1){
    console.log("where_id",data+"-"+data1);
    fetch(Apilink.apiurl+'wherecategory', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':data1,'venue_purpose_id':data}),
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
// console.log("routerprops",this.props);
         if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
        var LoginData=JSON.parse(localStorage.getItem('LoginData'));
        console.log(LoginData)
        this.setState({userCatId:LoginData.user_cat_id,userName:LoginData.user_name +" "+ LoginData.user_surname})
this.props.history.push('/addIndividualform');
  if(!window.localStorage['pathname']){
        this.props.history.push('/addIndividualform');
      }

      }else{
        this.props.history.push('/');
      }
  
  }
    componentWillReceiveProps(props){
      // alert("");

      if(props.searchedVenue){
        if(props.scroll==true){
         this.setState({searchdata:null});
        this.setState({searchedVenue:props.searchedVenue})
        }
        // this.loadOvalCount();
      }
  }
  receivedodrop=(data,key)=>{
    this.setState({searchdata:null});
    this.setState({searchedVenue:null});
console.log("dovalue",data);
this.setState({[key]:data});
// alert(data);
if(key=='dovalue'){
   this.setState({whatvalue:null,wherevalue:null,TOS:1})
this.loadwhat(data.venue_act_id); 
}else if(key=='whatvalue'){
this.setState({wherevalue:null,TOS:2})
this.loadwhere(data.venue_purpose_id,this.state.dovalue.venue_act_id);
}else if(key=='wherevalue'){
  this.setState({TOS:3})
}
  }
    logout=()=>{
    window.localStorage.clear();
    window.location.assign(window.location.origin+window.location.pathname);
  }
  searchedDataList=(data)=>{
    // alert(JSON.stringify(data));
    if(data.length==0){
      this.setState({scroll:false});
       notification.error({
           message:'Error Message',
    description:"No Results Found",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
    this.setState({searchedVenue:null,searchdata:null});
       return;
    }
      this.setState({scroll:true});
      var self=this;
      setTimeout(()=>{
          self.setState({scroll:false});
      },2000)

    this.setState({searchedVenue:data,searchdata:null});
  }
  render() {
    return (
      <div className="HomePageDiv">
   
      <Subheader bgcolor={"#a60202"}>
      <div className="home_droddownflex">
      <span>I want to</span>
     <div className="home_dropdownflexItem">
        <Popupbox buttonText={this.state.dovalue?this.state.dovalue.venue_act_name:'DO'} sendPopupData={(data)=>this.receivedodrop(data,'dovalue')} dropdown={this.state.doDropdown} buttonColor={'#fff'} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
</div>
<div className="home_dropdownflexItem">
        <Popupbox buttonText={this.state.whatvalue?this.state.whatvalue.venue_purpose_name:'WHAT'}  sendPopupData={(data)=>this.receivedodrop(data,'whatvalue')} dropdown={this.state.whatDropdown} buttonColor={'#fff'} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
</div>
<span>in</span>
<div className="home_dropdownflexItem">
        <Popupbox buttonText={this.state.wherevalue?this.state.wherevalue.venue_cat_name:'WHERE'} width={200} dropdown={this.state.whereDropdown} buttonColor={'#fff'} sendPopupData={(data)=>this.receivedodrop(data,'wherevalue')} buttonTextColor={'#000'} popupColor={'white'} popupTextColor={'black'} />
</div>
      <Nextarrow nextSearchFunc={this.arrowClick}/>
      </div>
      {/* {window.localStorage['LoginData']&&
      <div class="logoutBtn"><button type="button" class="venuedrop btn btn-secondary" onClick={()=>this.logout()}>Logout</button></div>
    }*/}
      </Subheader>

      <Carousel sendSearchedData={(data)=>this.searchedDataList(data)}/>
      <Subheader bgcolor={"#0f3eb0"}>

      <BreadCrump homeClick={()=>{this.props.homeClick()}} categoryId={this.state.userCatId}/>

      {/*<Morefilter text={"MoreFilter"}/>*/}

      </Subheader>

      {/*<Route path="/" exact component={IndividualMostPopular} />*/}

     <IndividualForm homeClick={()=>{this.props.homeClick()}} requestLocation={()=>this.props.requestLocation()} latlng={this.props.latlng} {...this.props} userName={this.props.userName}/>

      <NearByPlayGround getlocation={this.props.latlng} addvenueProps={(data)=>this.props.addvenueProps(data)}/>

{this.state.searchdata&&
<Homeslider history={this.props.history} scroll={this.props.scroll} displaySlider={this.state.searchdata}/>
}
{this.state.searchedVenue&&this.state.searchedVenue.length>0 &&
<SoccerGround history={this.props.history} scroll={this.state.scroll} addvenueProps={(data)=>this.props.addvenueProps(data)}  searchedVenue={this.state.searchedVenue}  categoryName={this.props.categoryName}/>
}
      <Footer/>
      </div>
      );
  }


    componentDidMount=()=>{
    navigator.geolocation.getCurrentPosition(position => {
    this.setState({chosenlocation:position.coords})
  })
    }
}
export default withRouter(IndividualPage)