import React from 'react';
import './checkbox-form.css';
import plus from '../../images/+.png';
import Popupbox from '../../components/popupbox/popupbox';

// import { Checkbox } from 'antd';

var playarray={value:'id',name:'name',dropdown:[{id:1,name:'play'},{id:2,name:'work'},{id:3,name:'enjoty'}]}

export default class Checkboxform extends React.Component {


	constructor(props) {
		super(props);
		console.log(props);
		// console.log(props.editobj&&props.editobj.data.seconddata)
		this.state={top:0,height:0,left:0,visible:props.editobj?props.editobj.visible:false,firstdropdown:{value:'id',name:'name',dropdown:[]}}
		  this._onBlur = this._onBlur.bind(this)
      this._onFocus = this._onFocus.bind(this)
	}
	componentWillReceiveProps(props){
		console.log("newDataprops",props);
		
	}
_onFocus() {
      console.log('focusing')
      if(this.state.count==''||this.state.count==0){
      this.setState({count:''})
  }
    }
     _onBlur() {
      
      console.log('blurrin')
      if(this.state.count==''||this.state.count==0){
      this.setState({count:0})
      }
    }
checkedChange=(data)=>{


	// console.log(data);
	var checkboxData=JSON.parse(JSON.stringify(this.props.currentCheckbox));
	this.setState({visible:!this.state.visible},function(){
// this.props.currentCheckbox.
var obj={visible:this.state.visible,id:checkboxData.amenities_det_id,type:'',key:'',currentCheckbox:checkboxData};
			this.props.checkboxdata(obj);
// this.props.checkbo
	});

}
onChangeText=(e,key,type,typedata,valuedata)=>{
console.log(e.target.value);
// this.props.
var currentCheckbox=JSON.parse(JSON.stringify(this.props.currentCheckbox));
currentCheckbox[typedata]=type;
currentCheckbox[valuedata]=e.target.value;
var obj={id:this.props.currentCheckbox.amenities_det_id,visible:this.state.visible,key:key,value:e.target.value,type:type,currentCheckbox:currentCheckbox};
this.props.checkboxdata(obj);
this.setState({[valuedata]:e.target.value});

}
receivePopupData=(data,key,type,typedata,valuedata,dropKey)=>{
	var currentCheckbox=JSON.parse(JSON.stringify(this.props.currentCheckbox));
currentCheckbox[typedata]=type;
currentCheckbox[dropKey]=data.name;
	var obj={visible:this.state.visible,key:key,value:data.name,id:this.props.currentCheckbox.amenities_det_id,type:type,currentCheckbox:currentCheckbox};
	this.props.checkboxdata(obj);
	this.setState({[dropKey]:data.name})
}
componentDidMount(){
	
}

renderInput=(data,value,key,typedata,valuedata,dropKey)=>{

	if(data=='number' || data=='text'){

		return(
<div className="number1"><input  min="0" onFocus={this._onFocus}
                        onBlur={this._onBlur} onChange={(e)=>this.onChangeText(e,key,data,typedata,valuedata)} type={data} value={this.state[valuedata]>0?this.state[valuedata]:value} className="number"/></div>
			)

	}else if(data=='dropdown'){
		var dropdownData=[];
		console.log("value",value);
		value.split(',').map((obj,key)=>{
					dropdownData.push({id:key+1,name:obj})
			})
		console.log("dropdownData",dropdownData);
		return(
<div className="dropdown-in-box" ref={(el) => this.instance = el } >
			 <Popupbox sendPopupData={(data1)=>this.receivePopupData(data1,key,data,typedata,valuedata,dropKey)} top={this.state.top} left={this.state.left} height={'100%'} buttonText={this.state[dropKey]?this.state[dropKey]:(!this.props.currentCheckbox[dropKey]?dropdownData[0].name:this.props.currentCheckbox[dropKey])}  dropdown={{name:'name',id:'id',dropdown:dropdownData}}  buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
			</div>
			)
	}else{
return(
<div></div>
	)
	}
}

	render() {
		console.log("adfadsf",this.state)
		console.log("adfadsfprops",this.props)
		return (
			<div className="checkform-maindiv">
			
			<div className="checkbox-div">

			
			<div className="checkbox">
				<input onfocus={()=>alert('focusing')} onChange={()=>this.checkedChange()} class="styled-checkbox" id={`styled-checkbox1-${this.props.keydata}`} type="checkbox" checked={this.state.visible} value="value1"/>
				<label for={`styled-checkbox1-${this.props.keydata}`}></label>
			<span className="addellipsisClamp2">{this.props.currentCheckbox.amenities_det_name}</span>
			</div>
			{this.state.visible==true&&
			<div className="drop-part2">
				<div className="dummyauto"></div>
				{this.props.currentCheckbox.amenities_det_datatype1!=""&&this.renderInput(this.props.currentCheckbox.amenities_det_datatype1,this.props.currentCheckbox.amenities_det_datavalue1,'venue_amnts_det_datavalue1','amenities_det_datatype1','amenities_det_datavalue1','amenities_det_datavalued1')}
				{this.props.currentCheckbox.amenities_det_datatype2!=""&&this.renderInput(this.props.currentCheckbox.amenities_det_datatype2,this.props.currentCheckbox.amenities_det_datavalue2,'venue_amnts_det_datavalue2','amenities_det_datatype2','amenities_det_datavalue2','amenities_det_datavalued2')}
				{this.props.currentCheckbox.amenities_det_datatype3!=""&&this.renderInput(this.props.currentCheckbox.amenities_det_datatype3,this.props.currentCheckbox.amenities_det_datavalue3,'venue_amnts_det_datavalue3','amenities_det_datatype3','amenities_det_datavalue3','amenities_det_datavalued3')}	
		
			</div>
		}

			</div>
			</div>
			);
	}
}
