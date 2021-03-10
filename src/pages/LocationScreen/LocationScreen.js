import React from 'react';
import './LocationScreen.css';
import keyvenue from '../../images/onekey.jpg'
import logo from '../../images/logo.png';
import geolocation from '../../images/geolocation.png';
import { Spin, Icon, notification} from 'antd';
// import { SmileOutlined } from '@ant-design/g" style={{ fontSize:24,color:'#a60202' }} spin />
const antIcon = <Icon type="loading" style={{ fontSize:24,color:'#a60202' }} spin />;
export default class LocationScreen extends React.Component {
	

	constructor(props) {
		super(props);
		this.state={locationDisabled:null}
	}
	addYourLocation=()=>{
		var self=this;
		 navigator.geolocation.getCurrentPosition(position => {
		 	// console.log(position);
		 	// var searchobj=this.state.searchobj;
		 	// searchobj.nearme=true;
		 	self.setState({locationDisabled:null});
		 	setTimeout(()=>{

		 	self.props.locationsuccess&&self.props.locationsuccess(true);
		 },3000);

		 	// searchobj.lat=position.coords.latitude;
		 	// searchobj.long=position.coords.longitude;
		 	// this.setState({searchobj});
		 	// this.setState({nearme:true})
		 },function(err){
		 	// console.log(err)
		 	// alert("")

		 	self.setState({locationDisabled:true});
		 		notification.error({
    message:'Error Message',
    description:"Browser Denied Location Please allow in your settings ",
    onClick:() => {
      console.log('Notification Clicked!');
    },
})
  });
	}
	componentWillMount(){
		this.addYourLocation();
	}

	render() {
		return (
			<div style={styles.Flex} >
<div style={styles.flex30} className="LocationFirstDiv">
<div style={{width:'100%'}}>
<div style={styles.headerLogo} className="locationheaderlogo">
<img src={logo} style={styles.imageLogo}/>
</div>
<div style={styles.geolocation} className="locationmarker">
<i class="fa fa-map-marker" style={styles.geolocatinimg} aria-hidden="true"></i>
</div>
<div style={styles.locationblock}>
<h4>Location Permission Required</h4>
<h5>Allow iVNEU to detect your location automatically for get your venues near by.</h5>
</div>
{!this.state.locationDisabled&&
<div style={styles.fetchingButton} className="fetchingButton">
<div style={{marginTop:12,marginBottom:12}}>
<Spin indicator={antIcon} />
</div>
<button className="buttonloading">Fetching Location Please Wait...</button>
</div>
}
{this.state.locationDisabled&&
<div style={styles.fetchingButton} className="fetchingButton">
<div style={{marginTop:12,marginBottom:12}}>
</div>
<button onClick={()=>this.addYourLocation()} className="buttonloading backgroundred">Allow Your Location</button>
</div>
}
</div>
</div>
<div style={styles.flex70} className="LocationSecondDiv" >
<div className="flexImageDiv">
</div>
</div>

			</div>
		);
	}
}
const styles={
Flex:{
	display:'flex',
	height:'100vh'
},
flex30:{
width:'40%',
display:'flex',
alignItems:'center'
},
flex70:{
	width:'60%',
	height:'100%',
	alignItems:'center',
	justifyContent:'center',
	display:'flex',
	flexDirection:'row',
	borderLeft:'1px solid #ddd'
	
},
imageLogo:{
	width:150,
	height:'auto'
},
flexImage:{
	width:'80%',
	height:'80%'
},
geolocatinimg:{
fontSize:100,
color:'#a60202'
},
headerLogo:{
	display:'block',
	textAlign:'center',
	marginTop:0,
	position:'absolute',
	top:12,
	left:12
},
geolocation:{
	display:'block',
	textAlign:'center',
},
locationblock:{
	textAlign:'center',
	marginTop:16,
	padding:12
}
}