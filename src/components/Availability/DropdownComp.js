import { Select, Radio } from 'antd';
import React, { Component } from 'react';
const arrow=require("../../icon/arrow_icon.svg");
const Option = Select.Option;

class DropdownComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      size:'default',
      selectedValue:props.selected,
      dropOption:props.options
    };
  }
  
  handleChange=(value)=>{
    this.props.selectedValue(value);
    this.setState({selectedValue:value});
  }
  handleSizeChange = (e) => {
    this.setState({ size:e.target.value });
  }
  componentWillMount(props){

    this.setState({ dropOption:this.props.options});   
    this.setState({ selectedValue:this.props.selected}); 

  }

  componentWillReceiveProps(props){
    
    this.setState({ dropOption:props.options});   
    this.setState({ selectedValue:props.selected});   

  }


  render() {
    const { size } = this.state;
    return (
      <div>

      <Select

      size={size}
      defaultValue={this.state.selectedValue}
      onChange={this.handleChange}
      style={{ width:'100%' }}
      className="dropselection"
      suffixIcon={ <img src={arrow} /> }
      value={this.state.selectedValue}
      placeholder='Select'
      >

      {this.state.dropOption.map((item,i) => 

        <Option className="dropvalues" value={item.id}>{item.value}</Option>

        )}
      </Select>
      <br />

      </div>
      );
  }
}

export default DropdownComp;