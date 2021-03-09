import React from 'react';
import Square from '../square/square';
import lookingcss from './Lookingfor.css';
import SwiperId from '../SwiperId/SwiperId';
import Apilink from '../../helpers/apilink';
export default class LookingFor extends React.Component {
	
	constructor(props) {
		super(props);
		this.state={
			lookArray:[]
		}
	}

  componentWillMount(){
    this.LookforList();
  
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
      this.setState({lookArray:responseJson})


    })
	}

	render() {
		return (
			<div style={{width:'100%'}}>
			<SwiperId onClick={(data)=>this.props.recieveCategory&&this.props.recieveCategory(data)} lookArray={this.state.lookArray}/>
			</div>
		);
	}
}
