import React from 'react';
import Listvenue_mob_responsive from '../../components/listvenue_mob_responsive/listvenue_mob_responsive';
import Carousel from '../../components/carousel/carousel';
import birthday from '../../images/birthdayImg1.png';
import arrow from '../../images/arrow_icon.svg';
import Subheader from '../../components/subheader/subheader'
import Apilink from '../../helpers/apilink';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import './MobileVenueList.css';

export default class MobileVenueList extends React.Component {
	constructor(props) {
		super(props);
		this.state={count:0,loginvisible:false,corporatedata:[],topratedVenues:[],demandVenues:[],luxuryvenues:[],preferredVenues:[]};
	}
listVenue=()=>{
	// alert("hiii");
	if(window.localStorage['LoginData']){
		var logindata=JSON.parse(window.localStorage['LoginData']);
		this.loginData(logindata);
	}else{
	this.setState({loginvisible:true});
	}
}
    // categoryListing=()=>{
    // fetch(Apilink.apiurl+'listVenueCategory', {
    //   method:'POST',
    //   headers:{
    //     Accept:'application/json',
    //     'Content-Type':'application/json',
    //   },
    //   body:JSON.stringify({user_cat_id:1}),
    // }).then((response)=>response.json())
    // .then((responseJson)=>{
    
      // var categoryDropdown=this.state.categoryDropdown;
      // categoryDropdown.dropdown=responseJson.data;
      // this.setState({categoryDropdown});
      // this.setState({categoryName:responseJson.data.length>0&&responseJson.data[0].venue_cat_name})
      // alert(JSON.stringify(responseJson));
        // var catDropdown=this.state.catDropdown;
    // catDropdown.dropdown=responseJson.data;
    // this.setState({catDropdown})
    // alert(JSON.stringify(responseJson.data));
    // alert(JSON.stringify(this.state.catDropdown.dropdown[0].venue_cat_name))
       // console.log("dropvalues",JSON.stringify(this.state.catDropdown));
 
getNearbyLocation=(data)=>{
  console.log("location",data);
  fetch(Apilink.apiurl+'nearbyLocation/', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({"lat":data.latitude,"long":data.longitude,"userCatId":"1"}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      console.log('response',responseJson);
      this.setState({count:this.state.count+1})
      if(responseJson.data){
        this.setState({corporatedata:[]})
        return;
      }
     this.setState({corporatedata:responseJson});
     //  console.log("response",responseJson)
    })
  }
  topratedvenues=(data)=>{
fetch(Apilink.apiurl+"getTopRatedVenues", {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({lat:data.latitude,long:data.longitude}),
    }).then((response)=>response.json())
.then((responsejson)=>{
	this.setState({count:this.state.count+1})
	// alert(JSON.stringify(responsejson));
	this.setState({topratedVenues:responsejson,})
})
}
demandVenues=(data)=>{
fetch(Apilink.apiurl+"getDemandVenues", {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({lat:data.latitude,long:data.longitude}),
    }).then((response)=>response.json())
.then((responsejson)=>{
	this.setState({count:this.state.count+1})
	// alert(JSON.stringify(responsejson));
	this.setState({demandVenues:responsejson})

})
}
luxuryvenues=(data)=>{
fetch(Apilink.apiurl+"getLuxuriesVeneus", {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({lat:data.latitude,long:data.longitude}),
    }).then((response)=>response.json())
.then((responsejson)=>{
	this.setState({count:this.state.count+1})
	// alert(JSON.stringify(responsejson));
	this.setState({luxuryVeneus:responsejson})
})
}
getPreferredvenues=(data)=>{
fetch(Apilink.apiurl+"getPreferedVenues", {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({lat:data.latitude,long:data.longitude}),
    }).then((response)=>response.json())
.then((responsejson)=>{
	this.setState({count:this.state.count+1})
	// alert(JSON.stringify(responsejson));
	this.setState({preferredVenues:responsejson})
})
}
componentDidMount(){
	// this.categoryListing();
    navigator.geolocation.getCurrentPosition(position => {
    	this.getNearbyLocation(position.coords);
    	 this.topratedvenues(position.coords);
         this.demandVenues(position.coords);
         this.luxuryvenues(position.coords);
         this.getPreferredvenues(position.coords);
})
	this.props.receiveProps(this.props);
}
clospopup=()=>{
	// alert(this.state.loginvisible);
	this.setState({loginvisible:false});
	}
	loginData=(data)=>{
		console.log(data);
		if(data.user_cat_id==2){
			this.props.history.push('/corporateForm');
		}else{

			this.props.history.push('/individualForm');
		}
	}
	render() {
		return (
			<div className="MobvenueList">
			<Subheader bgcolor={"#a60202"}>
			<button className="subheaderListVenue" onClick={()=>this.listVenue()}>List Your Venue <img style={styles.rotateimg} className="rotate90minus" src={arrow}/></button>
			</Subheader>
			{this.state.count==5&&
			<div >
			{this.state.preferredVenues.length>0&&
			<div style={styles.subhead} onClick={()=>this.props.history.push('/homeslidermob',{activeCategory:this.state.preferredVenues[0]})}>
		<div style={styles.col3}>
		<img style={styles.width100} src={this.state.preferredVenues[0].photos.length>0?this.state.preferredVenues[0].photos[0].venue_image_path:birthday} />
		</div>
		<div style={styles.col7} className="flexColumn">
		<p style={styles.heading} className="removemargin">Most Preffered Venues</p>
		<p style={styles.body} className="removemargin addellipsisClamp4">{this.state.preferredVenues[0].trn_venue_desc}</p>
		<p style={styles.footer} className="removemargin ">More <img style={styles.rotateimg} className="rotate90minus" src={arrow}   /></p>
		<div className="arrowRight">
		<img src={arrow} />
		</div>
		</div>
		</div>
	}
<Listvenue_mob_responsive history={this.props.history} text={"Near by venues"} ListDatas={this.state.corporatedata}/>
<Listvenue_mob_responsive history={this.props.history} text={"Top Rated Venues"} ListDatas={this.state.topratedVenues}/>
<Listvenue_mob_responsive history={this.props.history} text={"On Demand venues"} ListDatas={this.state.demandVenues}/>
<Listvenue_mob_responsive history={this.props.history} text={"Luxury Venue"} ListDatas={this.state.luxuryVeneus}/>
</div>
}
{this.state.loginvisible==true&&
 <LoginSignupModel loginttype={"List Your Venue"} videomodalPopup={false} LoginLoad={(data)=>this.loginData(data)} visible={this.state.loginvisible}  clospopup={this.clospopup} type='login' />
}
			</div>
		);
	}
}
const styles={
	rotateimg:{
		width:'2.5vw',
		height:'2.5vw'
	},
	button:{
		padding:'1vw 2.1vw',
		backgroundColor:'#1F459E',
		color:'#D3DAEB',
		fontSize:'3.5vw'
	},
	subhead:{
		display:'flex',
		padding:12,
		paddingLeft:5,
		borderBottom:'1.4px solid #eee'
	},
	col3:{
		width:'40%',
		paddingLeft:2
	},
	col7:{
		width:'60%',
		paddingLeft:12,
		paddingRight:12,
		position:'relative'
		
	},
	width100:{
		width:'100%',
		height:'100%',
		borderRadius:'8px'
	},
	heading:{
		color:'#A10000',
		fontSize:'4.2vw'
	},
	body:{
		fontSize:'3vw',
		color:'#B6B6B6'
	},
	footer:{
		color:'#5275C7',
		fontSize:'3.6vw'
	}

}
