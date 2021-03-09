import React from 'react';
import Popupbox from '../popupbox/popupbox';
import Morefilter from '../morefilter/morefilter'
import Nextarrow from '../nextarrow/nextarrow';
import Circle from '../circle/circle';
import './searchvenue.css';
import Homeslider from '../homeslider/homeslider'
import Apilink from '../../helpers/apilink';
import {notification} from 'antd';

const dummydata=[{dummy:true},{dummy:true}]
export default class Searchvenue extends React.Component {
	
	constructor(props) {
		super(props);

		this.state={chosenlocation:{latitude:0,longitude:0},activekey:1,firstsearch:"",doDropdown:{id:'venue_act_id',name:'venue_act_name',dropdown:[]},doactiveobj:null,whatDropdown:{id:'venue_purpose_id',name:'venue_purpose_name',dropdown:[]},whatactiveobj:null,whereDropdown:{id:'venue_cat_id',name:'venue_cat_name',dropdown:[]},whereactiveobj:null,searchdata:null,TOS:0}
		
	}
circleChange=(data,key,drop)=>{
// alert(drop);
	if(key=='doactiveobj'){
this.loadwhat(data.venue_act_id);
this.setState({TOS:1})
	if(drop){	
		this.clearwhat();
		this.clearwhere();
	}else{
  this.setState({activekey:2});
	}
	}else if(key=='whatactiveobj'){
this.loadwhere(data.venue_purpose_id);
this.setState({TOS:2})

	if(drop){
		this.clearwhere();
		
	}else{
  this.setState({activekey:3});
	}
	}else{
    this.setState({TOS:3})
		if(drop){
		
	}else{

		this.setState({activekey:null});
	}
	}
	this.setState({[key]:data});
	// this.setState({activeid:data});
	// this.setState({firstsearch:text});

	console.log(this.state)
	

}
loaddo(){
	console.log("loaddo")
    fetch(Apilink.apiurl+'do', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(),
    }).then((response)=>response.json())
    .then((responseJson)=>{
    	// this.setState({doDropdown:responseJson.data});
        var doDropdown=this.state.doDropdown;
    doDropdown.dropdown=responseJson.data;
    this.setState({doDropdown})
console.log("do",responseJson);

    })  
  }
  clearwhat=()=>{
  	this.setState({whatactiveobj:null})
  	var whatDropdown=this.state.whatDropdown;
		whatDropdown.dropdown=[]
			this.setState({whatDropdown});
  }
  clearwhere=()=>{
  	this.setState({whereactiveobj:null})
  	var whereDropdown=this.state.whereDropdown;
		whereDropdown.dropdown=[]
		this.setState({whereDropdown});
  }

   loadwhat(data){
   	// alert(JSON.stringify(data));
    //    fetch(Apilink.apiurl+'whatpurpose', {
    //   method:'POST',
    //   headers:{
    //     Accept:'application/json',
    //     'Content-Type':'application/json',
    //   },
    //   body:JSON.stringify({'venue_act_id':data}),
    // }).then((response)=>response.json())
    // .then((responseJson)=>{
    // console.log("what",responseJson);
    // var whatDropdown=this.state.whatDropdown;
    // whatDropdown.dropdown=responseJson.data;
    // this.setState({whatDropdown})
    // })  
    fetch(Apilink.apiurl+'whatpurpose', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      if(responseJson.data.length>0){
    	 var whatDropdown=this.state.whatDropdown;
      
    whatDropdown.dropdown=responseJson.data;
    this.setState({whatDropdown})
  }else{
      if(this.state.activekey){
    // this.circleChange(this.state.doactiveobj,'doactiveobj',null)
    this.loaddo();
    this.setState({activekey:1});
    this.setState({whatactiveobj:null});
    this.setState({doactiveobj:null});

    alert("no Records");
  }
   console.log("what",responseJson);
  }
       })  
  }

loadwhere(data){
 
    fetch(Apilink.apiurl+'wherecategory', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':this.state.doactiveobj.venue_act_id,'venue_purpose_id':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
if(responseJson.data.length>0){
    	 var whereDropdown=this.state.whereDropdown;
    whereDropdown.dropdown=responseJson.data;
    this.setState({whereDropdown})
  }else{
    if(this.state.activekey){
    // this.circleChange(this.state.doactiveobj,'doactiveobj',null)
    this.setState({whatactiveobj:null});
    this.loaddo();
    this.setState({activekey:1});
    this.setState({doactiveobj:null});

    alert("no Records");
  }
  }
    console.log("where",responseJson.data);

    })  
  }
  arrowClick=()=>{
        var userid=null;
     if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
        var LoginData=JSON.parse(localStorage.getItem('LoginData'));
        userid=LoginData.user_id;
      }
  	console.log(this.state.TOS);
  fetch(Apilink.apiurl+'dropdownSearchpurpose_new', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'venue_act_id':this.state.doactiveobj?this.state.doactiveobj.venue_act_id:null,'venue_purpose_id':this.state.whatactiveobj?this.state.whatactiveobj.venue_purpose_id:null,'venue_cat_id':this.state.whereactiveobj?this.state.whereactiveobj.venue_cat_id:null,'TOS':this.state.TOS,searchCategory:2,userId:userid,lat:this.state.chosenlocation.latitude,long:this.state.chosenlocation.longitude,offset:0}),
      
    }).then((response)=>response.json())
    .then((responseJson)=>{
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
        if(responseJson.data.length==0){
           notification.error({
           message:'Error Message',
    description:"No Records Found",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
        }else{
     // this.setState({searchdata:responseJson});
        // this.setState({scroll:null});
      // this.loadOvalCount();
      this.props.receivesearch(responseJson.data,this.state.whatactiveobj);
        }
      }
      // this.setState({searchdata:responseJson});

      console.log(responseJson);
      // this.props.sendsearchdata(responseJson.data);

    })  
    //this.props.receivesearch(data);
  	//this.setState({visible:true})
  }
  

   componentWillMount(){
    this.loaddo();
  
  }

	render() {
		return (
			<div style={styles.searchbox} className="select-venue-main-div">
			<div style={styles.inlineflex} className="select-venue-div">
			<span style={styles.wantColor} className="select-venue">I want to</span>
			<Popupbox dropdown={this.state.activekey==null?this.state.doDropdown:null} sendPopupData={(data)=>this.circleChange(data,'doactiveobj','drop')} buttonColor={"white"} buttonTextColor={"#a60202"} buttonText={this.state.doactiveobj?this.state.doactiveobj.venue_act_name:''} height={26}
    width={115} display={"none"}/>
    {(this.state.doactiveobj || !this.state.activekey)&&
    <Popupbox dropdown={this.state.activekey==null?this.state.whatDropdown:null} sendPopupData={(data)=>this.circleChange(data,'whatactiveobj','drop')} buttonColor={"white"} buttonTextColor={"#a60202"} buttonText={this.state.whatactiveobj?this.state.whatactiveobj.venue_purpose_name:''} height={26}
    width={115} display={"none"}/>
}
{(this.state.whatactiveobj || !this.state.activekey)&&
  <div style={{display:'flex'}}>
  <span style={{paddingRight:3,color:'white'}}>in</span>
    <Popupbox buttonColor={"white"} sendPopupData={(data)=>this.circleChange(data,'whereactiveobj','drop')} dropdown={this.state.activekey==null?this.state.whereDropdown:null} buttonTextColor={"#a60202"} buttonText={this.state.whereactiveobj?this.state.whereactiveobj.venue_cat_name:''} height={26}
    width={115} display={"none"}/>
    </div>
}
   {/* <div style={styles.popupsearchItem}>
    <Popupbox buttonColor={"white"} buttonTextColor={"black"} buttonText={"Soccer"}  height={50}/>
    </div>*/}
     <div style={styles.popupsearchItem} className="search-venue-arrow-div">
     <Nextarrow buttonColor={"#0f3eb0"}  width={76.8} fontsize={39} nextSearchFunc={this.arrowClick}/>
     </div>
			</div>
			{this.state.activekey==1&&
			<div className="venue-palces">
			{this.state.doDropdown&&this.state.doDropdown.dropdown.concat(dummydata).map((item)=>{

				return(
<Circle dummy={item.dummy}  width="110px" height="110px" circleChange={()=>this.circleChange(item,'doactiveobj')} text={item.venue_act_name} textcolor={'#ffffff'} active={this.state.doactiveobj&&this.state.doactiveobj.venue_act_id==item.venue_act_id} activecolor={"#a60202"}/>

					)
			})}

</div>
}
{this.state.activekey==2 &&
<div className="venue-palces">
			{this.state.whatDropdown&&this.state.whatDropdown.dropdown.concat(dummydata).map((item)=>{

				return(
<Circle dummy={item.dummy} width="110px" height="110px" circleChange={()=>this.circleChange(item,'whatactiveobj')} text={item.venue_purpose_name} textcolor={'#ffffff'} active={this.state.whatactiveobj&&this.state.whatactiveobj.venue_purpose_id==item.venue_purpose_id} activecolor={"#a60202"}/>

					)
			})}

</div>
}
{this.state.activekey==3 &&
<div className="venue-palces">
			{this.state.whereDropdown&&this.state.whereDropdown.dropdown.concat(dummydata).map((item)=>{

				return(
<Circle dummy={item.dummy} width="110px" height="110px" circleChange={()=>this.circleChange(item,'whereactiveobj')} text={item.venue_cat_name} textcolor={'#ffffff'} active={this.state.whereactiveobj&&this.state.whereactiveobj.venue_cat_id==item.venue_cat_id} activecolor={"#a60202"}/>

					)
			})}

</div>
}
{this.state.activekey&&
<Morefilter width={"100%"} justifycontent={"flex-start"} text={"More"}/>
}
			</div>
		);

		
	}
  componentDidMount(){
      navigator.geolocation.getCurrentPosition(position => {
    this.setState({chosenlocation:position.coords})
  })
  }
	
}
const styles={

	searchbox:{
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'column',
		padding:12,
		width:'100%'
	},
	inlineflex:{
		display:'inline-flex',
		alignItems:"center"
	},
	popupsearchItem:{
		paddingLeft:5,
		paddingRight:5,
	},
	wantColor:{
		color:'white'
	}
}
