import React from 'react';
import Searchvenue from '../../components/SearchVenue/searchvenue';
import Subheader from '../../components/subheader/subheader';
import Carousel from '../../components/carousel/carousel';
import LookingFor from '../../components/LookingFor/LookingFor';
import SquareFavourites from '../../components/SquareFavourites/SquareFavourites';
import NearByGround_res from '../../components/nearByGround_responsive/nearByGround_res';
import HomeSliderContent from '../../components/homeslidercontent/homeslidercontent';
import SoccerGround_res from '../../components/soccer_ground_responsive/soccerGround_res';
import LoginSignupModel from '../../components/LoginSignupModel/LoginSignupModel';
import './MobileHome.css';
import Apilink from '../../helpers/apilink';
import {notification} from 'antd';

export default class MobileHome extends React.Component {
	

	constructor(props) {
		super(props);
		this.state={
			lookList:[],
			selectedFav:null,
			dataArray:[{name:'1'},{name:'2'},{name:'3'}]
		}
	}
	receivesearch=(data,data1)=>{
		console.log(this.props);
		// alert("");
		   if(data.length==0){
       notification.error({
           message:'Error Message',
    description:"No Results Found",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  })
       return;
    }
		this.props.sendSearchedDetails(data,this.props,data1);
	}
		LookforList=()=>{
		  fetch(Apilink.apiurl+'youMayLookFor', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:"",
    }).then((response)=>response.json())
    .then((responseJson)=>{
      console.log("you may look for response",responseJson.data);
      this.setState({lookList:responseJson})


    })
	}
	componentDidMount(){
this.LookforList();
// alert('');
this.props.receiveProps(this.props);
	}

	render() {
		return (
			<div className="MobileHome">
			<Subheader  bgcolor={"#ea5b02"}><Searchvenue receivesearch={(data,data1)=>this.receivesearch(data,data1)}/></Subheader>
			<Carousel sendSearchedData={(data)=>this.receivesearch(data)}/>
			<SquareFavourites onClick={(data)=>this.setState({selectedFav:data})} squareList={this.state.lookList} />
			<NearByGround_res history={this.props.history} refresHeader={()=>this.props.refresHeader&&this.props.refresHeader()} selectedFav={this.state.selectedFav}/>
			</div>
		);
	}

}