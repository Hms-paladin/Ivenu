import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  usePickerState,
  TimePicker
} from '@material-ui/pickers';
import { Modal, Button } from 'antd';
import startOfWeek from "date-fns/startOfWeek";
import dateFormat from 'dateformat';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { DatePicker } from "@material-ui/pickers";
import {useStyles as useOriginalStyles} from "@material-ui/pickers/views/Calendar/Day";
import './BigCalendar.css';
const BigCalendarMUI = (props) => {
  const [date, changeDate] = useState(null);
  const [FromToDate,SetMinMaxDate] =useState([null,null]);
 // const handleMonthChange = async () => {
 //    return new Promise(resolve => {
 //      setTimeout(() => {
 //        // setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
 //        resolve();
 //      }, 5000);
 //    });
 //  };
 function disableDates(date,type){
var selectdDate=dateFormat(date,'yyyy-mm-dd');
var filterrecords=props.blockingDates.filter((obj)=>obj.selected_date==selectdDate&&((obj.blockedCheccking==true)||(obj.dateBlockedChecking==true&&obj.trn_booking_slot_id!='')));
if(filterrecords.length>0){
  return true;
}else{
  return false;
}
 }
 function changeDateValue(date){
   changeDate(date);
   if(props.venutype==2){
       // props.openBox&&props.openBox(date);
       props.openPax&&props.openPax(date);
       return;
   }
   if(props.type==1){
       props.openBox&&props.openBox(date);
       return;
   }
  var minMaxDates = [...FromToDate];
  if(FromToDate[0] && FromToDate[1]){
    minMaxDates[0]=date;
    minMaxDates[1]=null;
    SetMinMaxDate(minMaxDates)
    return;
  }
  if(minMaxDates[0]){
    minMaxDates[1]=date;
    var tmp1=minMaxDates[0];
    var tmp2=minMaxDates[1];
    if(minMaxDates[0]>minMaxDates[1]){
      minMaxDates[0]=tmp2;
      minMaxDates[1]=tmp1;
    }
    props.openBox&&props.openBox(minMaxDates);
  }else{
     minMaxDates[0]=date;
  }
    SetMinMaxDate(minMaxDates)
   // if(FromToDate){
   //   SetMinMaxDate
   // }
   // props.openBox&&props.openBox(date);
 }
 function handleClick(dates){
   // alert(JSON.stringify(dates));
 }
function UnblockDates(data){
  // alert(JSON.stringify(data))
  if(data.length>0){
     var minMaxDates = [...FromToDate];
     minMaxDates[0]=null;
     minMaxDates[1]=null;
     SetMinMaxDate(minMaxDates);
    var blockid=data[0].trn_booking_slot_id;
    props.blockDates&&props.blockDates(data[0],new Date(data[0].selected_date));
  }
}
function sendBlockingId(date,id,availtype){
  // alert('');
  // alert(id==1);
  if((id==1&&availtype)||(id==2&&availtype)){
    props.loadBookedData(date);
    SetMinMaxDate([null,null]);
    props.openBox(null)
  }
  // var selectedDate=dateFormat(date,'yyyy-mm-dd');
  // var filteredData=props.blockingDates&&props.blockingDates.length>0&&props.blockingDates.filter((obj)=>obj.selected_date==selectedDate);
  // // console.log('filteredDataLimit',filteredData)
  // return;
  // Modal.confirm({
  //   title: 'Confirm',
  //   content: 'Are You Sure Want To '+(id=='1'?"Cancel the booking ":"Unblock the date"),
  //   okText: 'Ok',
  //   onOk:()=>UnblockDates(filteredData),
  //   cancelText: 'Cancel',
  // });

}
function checkexcludeDays(days,day){
return days?(days.filter((obj)=>obj==day.getDay()).length>0?false:true):true;
}
 function generateClasses(startDate,endDate,dynamicDate,type){
   return `${((startDate && endDate)?((type=="")?'filledCap':''):'')} ${((dynamicDate==startDate && dynamicDate==endDate)?'equalCap ':'')}${((dynamicDate==startDate)?'begincap':'')} ${((dynamicDate==endDate)?'endgap':endDate +" "+dynamicDate)} ${((((dynamicDate>=startDate) && (dynamicDate<=endDate))?((type=="")?'fillcap':''):''))}`
 }
 // console.log("selectedDates",FromToDate);
  // prettier-ignore
  console.log("ArrayDatesofselected",props.blockingDates);
  return (
    <div className="BigCalendarMUI">

    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DatePicker
        autoOk
        fullWidth
        disablePast={true}
        animateYearScrolling
        minDate={props.minDate}
        maxDate={props.maxDate}
        selectedDate={date}
        shouldDisableDate={(date)=>disableDates(date,props.availType)}
        allowKeyboardControl
        onMonthChange={(data)=>props.handleMonthChange&&props.handleMonthChange(data)}
        orientation="potrait"
        variant="static"
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          if(isInCurrentMonth && dateFormat(day,'yyyy-mm-dd')>=dateFormat(new Date(),'yyyy-mm-dd')){
          var dynamicDate= new Date(dateFormat(day,'yyyy-mm-dd')).getTime();
          var startDate= FromToDate[0]?new Date(dateFormat(FromToDate[0],'yyyy-mm-dd')).getTime():null;
          var endDate= FromToDate[1]?new Date(dateFormat(FromToDate[1],'yyyy-mm-dd')).getTime():null;
          var isSelected = props.blockingDates&&props.blockingDates.length>0&&props.blockingDates.filter((obj)=>obj.selected_date==dateFormat(day,'yyyy-mm-dd'));
            // console.log("isSelected",isSelected);
            var isblockorbook=null;
            var noofslots=null;
            var availtype_filtered=null;
            var dateBlockedChecking=null;
            if(isSelected.length>0){
                isblockorbook=isSelected[0].booking_slot_type;
                noofslots=isSelected[0].availableCount;
                availtype_filtered=isSelected[0].trn_availability_type==props.availType;
                dateBlockedChecking=isSelected[0].dateBlockedChecking;
            }
            // console.log('noofslots',noofslots);
          if((startDate&&endDate)&&(startDate>=endDate)){
            // startDate=endDate;
            var temp1=startDate;
            var temp2=endDate;
            startDate=temp2;
            endDate=temp1;
          }
return (         
<div  onClick={()=>(isblockorbook)?sendBlockingId(day,isblockorbook,availtype_filtered):null} className={`${(isblockorbook&&isblockorbook==1&&availtype_filtered)?'Booked ':((isblockorbook==2&&availtype_filtered&&dateBlockedChecking==true)?'Blocked ':'')}${props.type&&props.type!=1?generateClasses(startDate,endDate,dynamicDate,isblockorbook&&dateBlockedChecking==true?isblockorbook:''):''}${noofslots?'badgecountdiv':''}`}>{(dateFormat(day,'yyyy-mm-dd')>=dateFormat(new Date(),'yyyy-mm-dd'))&&noofslots&&checkexcludeDays(props.excludeDays,day)&&noofslots!='0'?<div className="badgecount">{noofslots}</div>:checkexcludeDays(props.excludeDays,day)==false?<div className="holiday"></div>:''}{dayComponent}
      </div>
   )
}else{
  return dayComponent;
}
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