import React, {Component} from 'react';
import '../css/style.css';
import { Select} from 'antd';
import 'antd/dist/antd.css'; 


const Option = Select.Option;

class DropDown extends Component{
	constructor(props) {
		super(props);

		this.state = {
			open:false,
			dropval:null,

		};
	}
	dropdownClick=()=>{
		this.setState({open:!this.state.open})

	};
	selectval=(data) =>{
		console.log("data",data)
		this.setState({dropval:data,open:false})

	}
	handleChange=(value)=> {
  // console.log(`selected ${value}`);
}


render(){

	return(
		<div>

		<div className="drop-down-div">
		<Select  style={{ minWidth:120 }} onChange={this.handleChange} placeholder="Play">
		<Option value="jack">Jack</Option>
		
		<Option value="lucy">Lucy</Option>
		<Option value="jack">Jack</Option>
		<Option value="lucy">Lucy</Option>
		<Option value="jack">Jack</Option>
		<Option value="Yiminghe">yiminghe</Option>
		</Select>
		</div>



		</div>
		)
}


}

export default DropDown;