import React from 'react';
import './add_popup_location.css';
import Popupbox from '../../components/popupbox/popupbox';

import Apilink from '../../helpers/apilink';
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'Newyork'},{id:2,name:'India'},{id:3,name:'china'}]};
var playarray2={value:'id',name:'name',dropdown:[{id:1,name:'Tamilnadu'},{id:2,name:'kerala'},{id:3,name:'mumbai'}]};



export default class Add_popup_location extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {countryDropdown:{id:'country_id',name:'country_name',dropdown:[]},stateDropdown:{id:'state_id',name:'state_name',dropdown:[]},cityDropdown:{id:'city_id',name:'city_name',dropdown:[]},countryvalue:'',statevalue:'',cityvalue:'',postal:'',locationarray:[]};
  }
  loadcountry(){
    fetch(Apilink.apiurl+'getCountry', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      var countryDropdown=this.state.countryDropdown;
      countryDropdown.dropdown=responseJson.data;
      this.setState({countryDropdown})
      console.log("country",this.state.countryDropdown);

    })  
  }
  loadstate(data){
    fetch(Apilink.apiurl+'getState', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'countryId':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      var stateDropdown=this.state.stateDropdown;
      stateDropdown.dropdown=responseJson.data;
      this.setState({stateDropdown})
      console.log("country",this.state.stateDropdown);

    })  
  }
  loadcity(data){
    fetch(Apilink.apiurl+'getCity', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({'stateId':data}),
    }).then((response)=>response.json())
    .then((responseJson)=>{
      var cityDropdown=this.state.cityDropdown;
      cityDropdown.dropdown=responseJson.data;
      this.setState({cityDropdown})
      console.log("country",this.state.cityDropdown);

    })  
  }
  componentWillMount(){
  	this.loadcountry();
  }
  receivedodrop=(data,key)=>{
    this.setState({[key]:data});
    if(key=='countryvalue'){
      this.setState({statevalue:null})
      this.loadstate(data.country_id); 
    }else if(key=='statevalue'){
      this.setState({cityvalue:null})
      this.loadcity(data.state_id);
    }
  }
  handleClose=()=> {
    
  }
  changeCode=(e)=>{
  	this.setState({[e.target.name]:e.target.value});
    console.log(e.target.value);
  }
  addLocation=()=>{
  	console.log(this.state.cityvalue);
  	var locationarray=this.state.locationarray;
  	var findindex=locationarray.findIndex((obj)=>obj.name==(this.state.cityvalue&&this.state.cityvalue.city_name))
  	console.log(findindex,"findindex");
  	if(this.state.cityvalue){
  		if(findindex==-1){

        locationarray.push({id:locationarray.length+1,name:this.state.cityvalue.city_name})
      }
    }
    this.setState({locationarray});
  }
  deleteItem=(index)=>{
  	var locationarray=this.state.locationarray;
  	console.log(locationarray)
  	locationarray.splice(index,1);
    locationarray.map((item,i)=>{item.id=i+1});
    this.setState({locationarray});
  }
  sendLocation=()=>{
  	console.log(this.state.locationarray);
  	if(this.props.receiveLocation){
      this.props.closepopup();
  		this.props.receiveLocation(this.state.locationarray);
  	}
  }
  render() {
    return (
      <div>

      

      <div class="Popupbox-header-2"><div className="title-head">Add More Locations</div><div className="title-head-icon"><i class="fa fa-times" onClick={()=>{this.props.closepopup()}} aria-hidden="true"></i></div></div>



      <div className="main-padding-change">

      <div className="display-flex-align search-venue-input-8 padding-top-set dropdown-location">
      <label className="label-width-2">Country</label>				
      <Popupbox  buttonText={this.state.countryvalue?this.state.countryvalue.country_name:'Country'}   sendPopupData={(data)=>this.receivedodrop(data,'countryvalue')} dropdown={this.state.countryDropdown} buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
      </div>

      <div className="display-flex-align search-venue-input-8 padding-top-set dropdown-location">
      <label className="label-width-2">State</label>				
      <Popupbox  buttonText={this.state.statevalue?this.state.statevalue.state_name:'State'}   sendPopupData={(data)=>this.receivedodrop(data,'statevalue')} dropdown={this.state.stateDropdown}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
      </div>

      <div className="display-flex-align search-venue-input-8 padding-top-set dropdown-location">
      <label className="label-width-2">City</label>				
      <Popupbox  buttonText={this.state.cityvalue?this.state.cityvalue.city_name:'City'}   dropdown={this.state.cityDropdown} sendPopupData={(data)=>this.receivedodrop(data,'cityvalue')} buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
      </div>

      <div className="display-flex-align search-venue-input-8 padding-top-set">
      <label className="label-width-2">Postal Code</label>				
      <input type="text" name="postal" onChange={this.changeCode}/>
      </div>


      <div className="add-map-flex padding-top-set">
      
      <div className="map-span" ><span onClick={this.addLocation}>Add</span></div>
      <div className="map-locate"><span>Locate Map</span></div>

      </div>
      </div>

      <div>
      
      <div className="line-create"></div>

      <div className="padding-align-tob-bottom">

      <div className="remove-element">
      {this.state.locationarray.length>0&&this.state.locationarray.map((obj,i)=>{
        return(
          <div className="popup-text-toggle">
          <span className="remove-name">{obj.name}</span>
          <span className="remove-icon-close"><i class="fa fa-times" onClick={()=>this.deleteItem(i)} aria-hidden="true"></i></span>
          </div>
          )
      })
      
    }

				</div>

				</div>


			</div>

			<div>
				
				<div className="search-main-flex padding-align-3">
							
							<div className="search-left-2">
								<button className="search-venue-cancel-btn"  onClick={this.props.closepopup}>Add More</button>
							</div>

							<div className="search-right-2">
								<button className="search-venue-cancel-btn" onClick={this.sendLocation}>Save</button>
							</div>

						</div>



			</div>




			

    </div>
    );
  }
  componentDidMount=()=>{
    if(this.props.requestLocation){
      this.setState({locationarray:this.props.requestLocation})
    }
  }
}
