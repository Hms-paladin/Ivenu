import React from 'react';
import CardViewComp from '../../components/CardComp';
import Apilink from '../../helpers/apilink';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
// import { SmileOutlined } from '@ant-design/icons';


import { Spin, Icon,notification } from 'antd';
import  './myvenues.css';

// const antIcon = <Icon type="loading" style={{ fontSize:24 }} spin />;
 class MyVenues extends React.Component {


	constructor(props) {
		super(props);
		this.state={venueList:[],loading:false,loginDetails:null}
	}
	loadVenuesList=()=>{
		// alert(JSON.stringify(this.state.loginDetails));
		this.setState({loading:true})
		 fetch(Apilink.apiurl+'myVneu/', {
            method:'POST',
            headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
            body:JSON.stringify({userId:this.state.loginDetails?this.state.loginDetails.user_id:"0"}),
        })
	.then((response)=>response.json())
	.then((responsejson)=>{
		this.setState({loading:false})
		console.log(responsejson);
		this.setState({venueList:responsejson.data});
	})
	}
	componentDidMount(){
		
		this.props.receiveProps&&this.props.receiveProps(this.props);
		if(localStorage.getItem('LoginStatus') && localStorage.getItem('LoginData')){
      var LoginData=JSON.parse(localStorage.getItem('LoginData'));
      // console.log(LoginData)
      // alert(JSON.stringify(LoginData));
      
      this.setState({loginDetails:LoginData},function(){
      	this.loadVenuesList();
      })
      }else{
      	this.loadVenuesList();
      }
	}
	loadVenueDetails=(data)=>{
     //   notification.error({
     //   message:'Error Message',
     //   description:"Edit Option Currently UnAvailable",
     //   onClick:() => {
     //     console.log('Notification Clicked!');
     //   },
     // });
		this.props.switchRoute&&this.props.switchRoute(1);
		this.props.history.push(window.innerWidth>767?'/addIndividualform':'individualForm',{editVenueData:data});
	}
	render() {
		const antIcon = <Icon type="loading" style={{ fontSize:24,color:'#a60202' }} spin />;
		// const antIcon =<SmileOutlined type="loading" style={{ fontSize:24,color:'#a60202' }} spin />
		return (
			<div className="MyVenuesFlexMain">
			<h5>My Venues</h5>
			{this.state.loading==true&&
				<div style={{textAlign:'center',display:'block'}}>
				<Spin indicator={antIcon} />
				<p>Plese Wait ...</p>
				</div>
			}
			<div className="MyVenuesFlex">
			{this.state.loading==false&&this.state.venueList.length==0&&
					<div>No Records Found</div>
			}
			{this.state.venueList.length>0&&this.state.venueList.map((obj)=>{
				console.log(obj.trn_venue_name);
				console.log(obj.photos);
				return(
			<div className="cardviewmain">
			<CardViewComp progress={obj.percentageOfCompletion?obj.percentageOfCompletion:null} autosave={obj.autoSave} status={obj.trn_venue_status} description={obj.trn_venue_desc} goEditPage={()=>this.loadVenueDetails(obj)} images={obj.photos?obj.photos:[]} title={obj.trn_venue_name} subtitle={obj.venue_cat_name} />
			</div>
					)
			})}
			<div className="cardviewmain">
			</div>
			</div>
			</div>
		);
	}

}

export default withRouter(MyVenues);