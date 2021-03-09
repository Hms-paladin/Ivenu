import React from 'react';
import ReactDOM from 'react-dom';
import  './calendarScheduler.css';
// import { displayDate, sampleData } from './events-utc';
import { Scheduler, TimelineView, DayView, MonthView,WeekView } from '@progress/kendo-react-scheduler';
import ValidationLibrary from './helpers/validationfunction';
import { guid } from '@progress/kendo-react-common';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import dateFormat from 'dateformat';
 const CalendarScheduler = () => {
    const [data, setData] = React.useState([]);
    const [businessFromDate,setBusinessFromDate] = React.useState(new Date())
    const [businessToDate,setBusinessToDate] = React.useState(new Date())
    const [showCalendar,setShowCalendar]=React.useState(true);
     const [editslot,seteditslot]=React.useState(true);
    const handleDataChange = ({ created, updated, deleted }) => {
    	console.log(created);
    	console.log(updated);
    	console.log(deleted);
        setData(old => old
            // Filter the deleted 
            .filter((item) => deleted.find(current => current.id === item.id) === undefined)
            // Find and replace the updated items
            .map((item) => updated.find(current => current.id === item.id) || item)
            // Add the newly created items and assign an `id`.
            .concat(created.map((item) => Object.assign({}, item, { id:guid() }))))
    }

    function handleDateChangeMaterial(date,key){
    	if(new Date(date)!='Invalid Date'){
    	// console.log();
    	// var formattedDate=dateFormat(new Date(date),'HH:mm');
    	key=='frmdate'?setBusinessFromDate(date):setBusinessToDate(date);
    	}else{
    		// alert("Invalid Date...");
    	}
    }

    function setBusinessHours(key,data){
    	// key=='from'?setB
    	// setShowCalendar(false);
    	key=='from'?setBusinessFromDate(data):setBusinessToDate(data);
    }

    function genderaterowCols(key,count){
    		var array=[]
    		for(var i=0;i<count;i++){
    			array.push(<div></div>);
    		}
    		return array;
    }
    function handleOnViewChange(date){
    	console.log(date);
    }
    function onMonthDateChange(date){
    	console.log(date)
    }  
    // function handleSlotClick(date){
    // 	console.log(date)
    // }
    function handleSlotClick(data,event){
    	console.log(data)
    	var chosenDate=dateFormat(new Date(data.slot.start),'mm-dd-yyyy');
    	// console.log(chosenDate);
    	var currentDate=dateFormat(new Date(),'mm-dd-yyyy');
    	if(new Date(chosenDate).getTime()<new Date(currentDate).getTime()){
    		console.log(false);
    		// return;
    		// seteditslot((old)=>console.log());
    	}else{
    		console.log(true);
    		// return true;
    		// seteditslot(true);
    	}
    }
    return (
    	<div>
    	{console.log("loading...")}
    	<MuiPickersUtilsProvider utils={DateFnsUtils}>
    	 <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={businessFromDate}
          onChange={(date)=>handleDateChangeMaterial(date,'frmdate')}
          KeyboardButtonProps={{
            'aria-label':'change time',
          }}
        />
    	 <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={businessToDate}
          onChange={(date)=>handleDateChangeMaterial(date,'todate')}
          KeyboardButtonProps={{
            'aria-label':'change time',
          }}
        />
        </MuiPickersUtilsProvider>
    	{!showCalendar&&
    		<div className="dummyCalendar">
    			<div className="dummyCalendar_firstCol">
    			{genderaterowCols('col',10)}
    			</div>
    			<div className="dummyCalendar_secondCol">
    			{genderaterowCols('row',20)}
    			</div>
    		</div>
    	}
    		{showCalendar==true&&
        <Scheduler
        
            data={data}
            onViewChange={handleOnViewChange}
            onDataChange={handleDataChange}
            defaultView="month"
            onSlotClick={handleSlotClick}
            editable={{
                add:editslot,
                remove:true,
                drag:true,
                resize:true,
                edit:editslot
            }}
            defaultDate={new Date()}
        >
            <DayView startTime={"07:00"}
                endTime={"19:00"}
                slotDivisions={2}
                workDayStart={businessFromDate}
                workDayEnd={businessToDate}/>
            <MonthView onDateChange={onMonthDateChange}/>
            <WeekView/>
        </Scheduler>
    }
        </div>
    )
}
export default CalendarScheduler;