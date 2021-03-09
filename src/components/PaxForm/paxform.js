import React from 'react';
import PaxModal from './paxModal';
import './paxform.css'
import {Icon,Popconfirm} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import dateFormat from 'dateformat';
import DateFunctions from  '../../helpers/DateFunctions';
export default class PaxForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={selectedIndex:-1,paxmodal:false,editData:null,activePaxedData:null,paxArray:[]}
	}
	submitpax=(data)=>{
		var userId=window.localStorage['LoginData']?JSON.parse(window.localStorage['LoginData']).user_id:0;
		// alert(userId)
		// alert(JSON.stringify(data))
		// return;
		var paxArray=this.state.paxArray;
		if(this.state.selectedIndex!=-1){
			paxArray[this.state.selectedIndex]=data;
		}else{
		data.uniqueId=DateFunctions.generate_uid_timestamp()+userId;
		paxArray.push(data);
		}
		this.props.sendPaxDetails&&this.props.sendPaxDetails(paxArray);
		this.setState({paxmodal:false,paxArray,selectedIndex:-1,editData:null});
	}
	setEditData=(data,index)=>{

		this.setState({editData:data,selectedIndex:index},function(){
			this.setState({paxmodal:true});
		})
	}
	removeEditData=(index)=>{
		var paxArray=this.state.paxArray;
		paxArray.splice(index,1);
		this.setState({paxArray});
	}
	render() {
		return (
			<div className="mainPaxDiv">
			<div className="paxListDiv">
			<div className="addBoxPax bordered" onClick={()=>this.setState({paxmodal:true})}>
			<div className="paxboxdiv">
			<SmileOutlined type="plus-square" />
			<p>Add Pax</p>
			</div>
			</div>
			{this.state.paxArray&&this.state.paxArray.length>0&&this.state.paxArray.map((obj,index)=>{
				return(
					<div className="addBoxPax addbox">
			<div className="headerpax">
			<div className="left">
			{dateFormat(new Date(this.props.fromdate),'dd mmm yyyy')}
			</div>
			<div className="right">
			<a onClick={()=>this.setEditData(obj,index)}>
			<i className="fa fa-pencil"></i>
			</a>
			 <Popconfirm
    title="Are you sure delete this pax?"
    onConfirm={()=>this.removeEditData(index)}
    okText="Yes"
    cancelText="No"
  	>
		<a>
			<SmileOutlined type="close" />
			</a>
  </Popconfirm>
			
			</div>
			</div>
			<div className="boxpax">
			<p>{obj.paxName}</p>
			</div>
			</div>
				)
			})}
			
			</div>
			{this.state.paxmodal==true&&
				<PaxModal fromdate={this.props.fromdate} paxedData={this.state.editData} title={this.state.editData?'Edit Pax':'Add Pax'} visible={true} cancelpax={()=>this.setState({paxmodal:false,editData:null,selectedIndex:-1})} submitpax={(data)=>this.submitpax(data)}/>
			}
			</div>
		);
	}
	componentDidMount(){
		if(this.props.paxDetails){
			this.setState({paxArray:this.props.paxDetails});
		}
	}
}
