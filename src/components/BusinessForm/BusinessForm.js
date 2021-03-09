import React from 'react';
import MaterialDateTimePicker from '../DateTimePickerComp';
import CkEditorComp from '../CKEditorComp';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import { Tabs } from 'antd';
import Seatform from '../seatform/seatform';
import PaxForm from '../PaxForm/paxform';
import './BusinessForm.css';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class BusinessForm extends React.Component {

	constructor(props) {
		super(props);
		this.state={slot_type:1,days:[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}],businessform:{slot_type:1,fromDate:new Date(),toDate:new Date(),fromTime:new Date(),toTime:new Date(),excludesDays:[],min:null,max:null,seatList:[{seatname:'',counter:0,add:'true'}],paxList:[]},errors:{fromDate:'',toDate:'',fromTime:'',toTime:''}
	}

	}
	receiveDetails=(data,index)=>{
		// alert(JSON.stringify(data));
		var businessform=this.state.businessform;
		businessform.seatList[index].seatname=data.seatname;
		businessform.seatList[index].counter=data.counter;
		businessform.seatList[index].uniqueId=data.uniqueId;
		this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
		this.setState({businessform});
		// // seatList
	}
	submitDetails=(data,index)=>{
		var businessform=this.state.businessform;
		businessform.seatList[index].counter=0;
		businessform.seatList[index].seatname='';
		// businessform.seatList[index].uniqueId='';
		businessform.seatList.push(data);
		this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
		this.setState({businessform});
	}
	removeSeats=(index)=>{
		var businessform=this.state.businessform;
		businessform.seatList.splice(index,1);
		this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
		this.setState({businessform});
	}
	sendPaxDetails=(data)=>{
		var businessform=this.state.businessform;
		businessform.paxList=data;
		this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
		this.setState({businessform});
	}
changeCheckbox=(data,index)=>{
	var days=this.state.days;
	var businessform=this.state.businessform
	var filterDatas=days.filter((obj)=>obj.checked==true);
	// alert(filterDatas.length);
	if(data==false || !data){
	if(filterDatas.length>=2){
		return;
	}
	}
	if(data){
			days[index].checked=!data;
	}else{

			days[index].checked=true;
	}
	businessform.excludesDays=days.filter((obj)=>obj.checked==true);
	this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
	this.setState({days,businessform});
}
changeBusiness=(value,key)=>{
	var businessform=this.state.businessform;
	businessform[key]=value;
	// alert(JSON.stringify(businessform));
	this.props.sendBusinessData&&this.props.sendBusinessData(businessform);
	this.setState({businessform});
}
	render() {
		const {fromTime,fromDate,toTime,toDate}=this.state.businessform;
		return (
			<div className="BusinessFormBox">
			<div className="avail_RadioGroup">
			<div className="LabelBox" style={{'margin-bottom':2}}>
			<p>Venue Type</p>
			</div>
              <RadioGroup  onChange={(e)=>this.changeBusiness(parseInt(e.target.value),'slot_type')} aria-label="gender" name="SlotsType" value={this.state.businessform.slot_type?this.state.businessform.slot_type:1} >
              <div className="RadioBtns">
        <FormControlLabel
          value={1}
          className={this.state.businessform.slot_type==1?'checkedRadioBtn':''}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>}  />}
          label="Normal"
          labelPlacement="end"
        />
        <FormControlLabel
        className={this.state.businessform.slot_type==2?'checkedRadioBtn':''}
          value={2}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>}  />}
          label="Pax"
          labelPlacement="end"
        />
        <FormControlLabel
        className={this.state.businessform.slot_type==3?'checkedRadioBtn':''}
          value={3}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>}  />}
          label="Seat"
          labelPlacement="end"
        />
        </div>
        </RadioGroup>
        </div>
        {1!=1&&
       <div className="LabelBox">
			<p>Available Pax</p>
			<div className="LabelBoxFlex">
			<div className="venuetypenumbers">
			<label className="blockelement" >Minimum</label>
			<input type="number" value={this.state.businessform.min} placeholder="Enter Minimum Value" min={1} onChange={(e)=>this.changeBusiness(e.target.value,'min')}/>
			{this.state.businessform.min==""&&<p className="errorField">Field Required</p>}
			</div>
			<div className="venuetypenumbers">
			<label className="blockelement">Maximum</label>
			<input value={this.state.businessform.max} placeholder="Enter Maximum Value" type="number" min={1} onChange={(e)=>this.changeBusiness(e.target.value,'max')}/>
			{this.state.businessform.max==""&&<p className="errorField">Field Required</p>}

			</div>
			</div>
        </div>
    }
  
    {1!=1&&
       <div className="LabelBox">
			<p>Available Seats</p>
			<div className="LabelBoxFlex">
			<div className="venuetypenumbers">
			<label className="blockelement" >Maximum</label>
			<input type="number" value={this.state.businessform.max} placeholder="Enter Maximum Value" min={1} onChange={(e)=>this.changeBusiness(e.target.value,'max')}/>
			{this.state.businessform.max==""&&<p className="errorField">Field Required</p>}
			</div>
			</div>
        </div>
    }
    <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Availability Information" key="1">
      <>
      <div className="LabelBox">
			<p>Business Hours</p>
			<div className="LabelBoxFlex">
			<MaterialDateTimePicker  selectedDate={fromTime} receiveDate={(date)=>this.changeBusiness(date,'fromTime')} type='time' label="From Time"/>
			<MaterialDateTimePicker minDate={fromTime}  selectedDate={toTime} receiveDate={(date)=>this.changeBusiness(date,'toTime')} type='time' label="To Time"/>
			</div>
			</div>

			<div className="LabelBox">
			<p>Availability Days</p>
			<div className="LabelBoxFlex">
			<MaterialDateTimePicker  minDate={new Date()} 
			 selectedDate={fromDate} receiveDate={(date)=>this.changeBusiness(date,'fromDate')} type='date' label="From Date"/>
			<MaterialDateTimePicker   minDate={fromDate} selectedDate={toDate} receiveDate={(date)=>this.changeBusiness(date,'toDate')} type='date' label="To Date"/>
			</div>
			</div>

			<div className="LabelBox">
			<p>Exclude Days <small className="maximumdaysClass">Maximum Selection is Two Days</small></p>
			 <FormGroup aria-label="position" className="ExcludeDays" row>
			 {this.state.days.map((obj,key)=>{
			 	return(
			 		<div className="FlexboxExclude"  onClick={()=>this.changeCheckbox(obj.checked,key)}>
			 		<span>{obj.label}</span>
					<div className={`checkboxDay ${obj.checked==true?'active':false}`}>
					</div>
						
					</div>
			 		)
			 })}
			  
        </FormGroup>
			</div>
      </>
    </TabPane>
    {(this.state.businessform.slot_type==2 || this.state.businessform.slot_type==3)&&
    <TabPane tab={this.state.businessform.slot_type==2?'Pax Details':'Seat Details'} key="2">
    {this.state.businessform.slot_type==3&&this.state.businessform.seatList.map((obj,index)=>{
    	return(
      <Seatform  removeSeats={()=>this.removeSeats(index)} submitDetails={(data)=>this.submitDetails(data,index)} activeobj={obj} seatDetails={(data)=>this.receiveDetails(data,index)}/>
      )
    })
    }
    {this.state.businessform.slot_type==2&&
    	<PaxForm fromdate={fromDate} paxDetails={this.state.businessform.paxList} sendPaxDetails={(data)=>this.sendPaxDetails(data)}/>
    }
    </TabPane>
    }
  </Tabs>
			
				<div className="next-div">
            <button onClick={()=>this.props.gotoAvailability&&this.props.gotoAvailability(true)}  type="button" className="availablitysave-button"><span className="availabilitysave-span">Next</span></button>
            </div>
			</div>
		);
	}
	componentDidMount(){
		if(this.props.businessDetails){
	var days=this.state.days;
	var businessDetails=this.props.businessDetails;
	businessDetails.seatList=businessDetails.seatList.length==0?[{seatname:'',counter:0,add:'true'}]:businessDetails.seatList;
	for(var i in businessDetails.excludesDays){
		var findindex=days.findIndex((obj)=>obj.value==businessDetails.excludesDays[i].value);
		if(findindex!=-1){

	console.log("days",findindex);
			days[findindex].checked=true;
		}else{
			// days[findindex].checked=false;
		}
		}

	this.setState({businessform:this.props.businessDetails,days});
	}
	}
}
 