import React from 'react';
import Specific from '../specific-venue/specific-venue';
import Form1 from '../form1/form1';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import './VenueCategory.css';
import Img1 from '../../images/b3.png';
// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';

import { BounceLoader } from 'react-spinners';

const HeaderContent=(<div className="choose-text1">Please choose the <span className="choose-text2">Venue Category</span></div>);
const listAdditonal=[{id:1,dontbind:true},{id:1,dontbind:true}]
export default class VenueCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			venuecategoryid:"",
			activeArrow:false,			
			ListVenueType:[],
			loading:true
		};

	}

	specificvenue=(data)=>{
		this.setState({venuecategoryid:data.venue_cat_id,activeArrow:true});
		this.props.venueCategoryCallback(data.venue_cat_id,data.venue_cat_name);
		this.props.checkValidationError('venuecategory',true);
	}

	componentWillMount(){
		this.ListVenueType();	
	}
	
	ListVenueType(){

		fetch(Apilink.apiurl+'listVenueCategory/', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({user_cat_id:"1"}),
		}).then((response)=>response.json())
		.then((responseJson)=>{
			this.setState({"ListVenueType":responseJson.data.concat(listAdditonal),loading:false})
			console.log(responseJson.data)
		})
	}

	render() {
		return (
			<div className="venueCategory">
			<Bindname text={"Venue Category"}/>
			<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={1} next={2} activeArrow={this.state.activeArrow}/>
			{this.state.loading==true &&
				<div className='sweet-loading'>
				<BounceLoader
				sizeUnit={"px"}
				size={75}
				color={'#24479D'}
				loading={this.state.loading}
				/>

				<div className="sweet-loading_text">Loading...</div>
				</div> 
			}
			{!this.state.loading &&
				<div className="main-div">
				{this.state.ListVenueType.map((item,i)=>

					<Specific dummy={item.dontbind} width="100px" height="100px" filter="brightness(100)" undertext={item.venue_cat_name} specificvenue={()=>this.specificvenue(item)} text={img(item.venue_cat_icon)} active={(this.props.categoryId?this.props.categoryId:this.state.venuecategoryid)==item.venue_cat_id} activecolor={"#a60202"} Skew={false}/>
					)}

				</div>
			}
			
			</div>
			);
	}
	componentDidMount(){
if(this.props.categoryId){
	this.setState({activeArrow:true});
	}
	console.log(this.state)
}
}
const img = (image) =>((<img src={image} alt="" width="60px" height="60px"/>));
