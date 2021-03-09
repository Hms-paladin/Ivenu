import React from 'react';
import HomeSliderContent from '../../components/homeslidercontent/homeslidercontent';
import SoccerGround_res from '../../components/soccer_ground_responsive/soccerGround_res';
import Searchvenue from '../../components/SearchVenue/searchvenue';
import Subheader from '../../components/subheader/subheader';
import './MobSearchVenueList.css';
export default class MobSearchVenueList extends React.Component {

	constructor(props) {
		super(props);
		// console.log();
		this.state={dataArray:props.location.state.datalist,activeCategory:null,whatobj:null,venuecategory:null}
	}
	componentWillReceiveProps(props){
		this.setState({activeCategory:null});
		this.setState({dataArray:props.location.state.datalist,whatobj:props.location.state.category});
		this.setState({venuecategory:props.location.state.venuecategory})
		this.setState({whatobj:null})
	}
	receivesearch=(data,data1)=>{
		this.setState({activeCategory:null});
		this.setState({dataArray:data});
		this.setState({whatobj:data1});
		this.setState({venuecategory:null});
	}
	componentDidMount(){
		this.props.receiveProps(this.props);
	}

	render() {
		console.log("propsHistory",this.props);
		return (
			<div className="Mobsearchvenuelist">
			<Subheader bgcolor={"#ea5b02"}><Searchvenue receivesearch={this.receivesearch} /></Subheader>
			<SoccerGround_res venuecategory={this.state.venuecategory} category={this.state.whatobj} activeData={(data)=>this.props.history.push('/moredetails/id='+data.venue_id)} dataarray={this.state.dataArray}/> 
			{this.state.activeCategory&&
			<HomeSliderContent history={this.props.history} sendLoginData={this.props.sendLoginData&&this.props.sendLoginData} activeCategory={this.state.activeCategory} />
			}
			</div>

		);
	}
}
