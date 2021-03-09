import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  usePickerState,
  TimePicker
} from '@material-ui/pickers';
import dateFormat from 'dateformat';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { DatePicker } from "@material-ui/pickers";
import './BigCalendar.css';
const BigCalendarMUI = (props) => {
  const [date, changeDate] = useState(new Date());
 // const handleMonthChange = async () => {
 //    return new Promise(resolve => {
 //      setTimeout(() => {
 //        // setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
 //        resolve();
 //      }, 5000);
 //    });
 //  };
 function changeDateValue(date){
   changeDate(date);
   props.openBox&&props.openBox(date);
 }
 function handleClick(){
   alert('');
 }
  // prettier-ignore
  return (
    <div className="BigCalendarMUI">

    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DatePicker
        autoOk
        fullWidth
        animateYearScrolling
        allowKeyboardControl
        onMonthChange={()=>props.handleMonthChange&&props.handleMonthChange()}
        orientation="potrait"
        variant="static"
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          console.log(isInCurrentMonth);
return (
          // You can also use our internal <Day /> component
          <div>
          {isInCurrentMonth&&
          <div>
             <ContextMenuTrigger id={day}>
        <div className="well">{dayComponent}</div>
          </ContextMenuTrigger>
            <ContextMenu  id={day}>
             <MenuItem data={{foo: 'bar'}} >
          <div>{dateFormat(day,'mmm dd yyyy')}</div>
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          Block
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          UnBlock
        </MenuItem>
    
      </ContextMenu>
  </div>
}
{!isInCurrentMonth&&
<div>{dayComponent}</div>
}
      </div>
   )
          // return <div>{dayComponent}</div>;
        }}
        openTo="date"
        value={date}
        onChange={(date)=>changeDateValue(date)}
      />
      {props.children}
      </MuiPickersUtilsProvider>
    </div>
  );




};

export default BigCalendarMUI;