import 'date-fns';
import React,{Fragment} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
  TimePicker
} from '@material-ui/pickers';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { InputAdornment } from '@material-ui/core';

export default function MaterialDateTimePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    // setSelectedDate(date);
    // this.setState({})
    console.log('date',date);
    props.receiveDate&&props.receiveDate(date);
  };

  return (
    <div className='MaterialPickerCustom'>
    <label>{props.label}</label>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    
      {props.type=='date'&&
      <KeyboardDatePicker
        clearable
        value={props.selectedDate?props.selectedDate:''}
        placeholder="MM/dd/yyyy"
        onChange={(date) => handleDateChange(date)}
        minDate={props.minDate}
        maxDate={props.maxDate}
        format="MM/dd/yyyy"
      />
    }
    {props.type=='time'&&
     <KeyboardTimePicker
      clearable
      minutesStep={15}
      label={''}
      placeholder="HH:MM "
      mask="__:__ _M"
      minDate={props.minDate}
      value={props.selectedDate?props.selectedDate:''}
      keyboardIcon={<AccessTimeIcon/>}
      onChange={(date) => handleDateChange(date)}
    />
    }
    {props.type=='nokeyboard'&&
     <DatePicker
        label=""
        format="MMMM dd yyyy"
        minDate={props.minDate}
        value={props.selectedDate?props.selectedDate:''}
        onChange={handleDateChange}
        animateYearScrolling
      />
  }

    </MuiPickersUtilsProvider>
    </div>
  );
}
