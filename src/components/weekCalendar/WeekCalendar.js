import React from 'react';
import moment from 'moment';
import MaterialDateTimePicker from '../DateTimePickerComp';
import DateFunctions from '../../helpers/DateFunctions';
import './WeekCalendar.css';
const weekdays=['SUN','MON','TUE','WED','THU','FRI','SAT'];

export default class WeekCalendar extends React.Component {


	constructor(props) {
		super(props);
		this.state={selectedDate:new Date(),currentDate:new Date(),rangeofDates:[],startDate:null,endDate:null}

	}
	generateWeekDays(date){
		var startofweek=moment(date).startOf('week');
		var endofweek=moment(date).endOf('week');
		this.setState({startDate:startofweek,endDate:endofweek});
		var getDatesBetween=DateFunctions.enumerateDaysBetweenDates(startofweek.format('YYYY-MM-DD'),endofweek.format('YYYY-MM-DD'));
		return getDatesBetween;
	}
	componentWillMount(){
		var getDates=this.generateWeekDays(this.state.currentDate);
		this.setState({
			rangeofDates:getDates
		});
	}
	selectedDay=(data)=>{
		console.log("dateWeek",data)
		this.props.propssend(data)
		this.setState({selectedDate:data})
	}
	renderHeader=(data,index)=>{
		var getday=data.getDate();
		var renderDate=moment(data).format('YYYY-MM-DD');
		var currendate=moment(new Date()).format('YYYY-MM-DD');
		var checkCurrentDate=renderDate<currendate;
		var selectedDate=moment(this.state.selectedDate).isSame(data,'day');
		return(
			<div className={`calendar_col ${selectedDate==true?'selected':''} ${checkCurrentDate?'disabled':''}`}>
			<label>{weekdays[index]}</label>
			<button onClick={()=>this.selectedDay(data)} disabled={checkCurrentDate}>{getday}</button>
			</div>
			)
	}
	nextWeek=()=>{
		var endDate=this.state.endDate;
		var nextDate=endDate.add(1,'days');
		var getDates=this.generateWeekDays(nextDate);
		this.setState({
			rangeofDates:getDates
		});
	}
	prevWeek=()=>{
		var startDate=this.state.startDate;
		var checkpastDate=startDate.subtract(1,'days');
		var checkCurrentDate=moment(prevDate).isBefore(new Date());
		var renderDate=moment(checkpastDate).format('YYYY-MM-DD');
		var currendate=moment(new Date()).format('YYYY-MM-DD');
		var checkCurrentDate=renderDate<currendate;
		if(checkCurrentDate==false){//if the value is less than 0 is the past date
			var prevDate=startDate.subtract(6,'days');
		var getDates=this.generateWeekDays(prevDate);
		this.setState({
			rangeofDates:getDates
		});
	}
	}
	datePickerData=(date)=>{
		this.props.propssend(date)
		this.props.BlockDatesCalendar&&this.props.BlockDatesCalendar(date)
	this.setState({selectedDate:date});
	var getDates=this.generateWeekDays(date);
	this.setState({
			rangeofDates:getDates
		});
	}
	render() {
		console.log("propsdata",this.props)
		return (
			<div>
			<div className="weekcalendarpicker"><MaterialDateTimePicker receiveDate={(date)=>this.datePickerData(date)} type="nokeyboard" selectedDate={this.state.selectedDate} minDate={new Date()}/></div>
			<div className="calendar_row">
			<button onClick={()=>this.prevWeek()} className="buttoncalendar"><i className="fa fa-angle-left"/></button>
			{this.state.rangeofDates.map((obj,index)=>{

				return this.renderHeader(obj,index);
			})}
			<button className="buttoncalendar" onClick={()=>this.nextWeek()}><i className="fa fa-angle-right"/></button>
			</div>
			{this.props.loading&&<div>Loading.....</div>}
			</div>
		);
	}
}
