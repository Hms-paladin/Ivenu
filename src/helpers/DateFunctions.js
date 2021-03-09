

import React, { Component } from 'react';
import dateFormat from 'dateformat';
import moment from 'moment';
 class DateFunctions extends Component {
getHoursInterval(time1,time2,interval){

 var arr = [];
  var formattedFrmTime1=dateFormat(time1,'hh:MM TT');
  var formattedToTime1=dateFormat(time2,'hh:MM TT');
  // alert(formattedFrmTime1);
 if(formattedFrmTime1==formattedToTime1){
     return [];
 }
  while(time1 < time2){
    var nextTime=new Date(time1.toString());
    var AddedMinutes=new Date(nextTime.setMinutes(nextTime.getMinutes() + interval));
    var formattedFrmTime=dateFormat(time1,'hh:MM TT');
    var formattedToTime=dateFormat(AddedMinutes,'hh:MM TT');
    arr.push({id:arr.length+1,label:formattedFrmTime+" - "+formattedToTime,dateobj:{fromTime:dateFormat(time1,"yyyy-mm-dd'T'HH:MM:00"),toTime:dateFormat(AddedMinutes,"yyyy-mm-dd'T'HH:MM:00")}});
    time1.setMinutes(time1.getMinutes() + interval);
  }
  return arr;
}
checkDateString(date){
	if(typeof date=='string'){
		return new Date(date);
	}else{
		return date;
	}
}
enumerateDaysBetweenDates(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= endDate) {
    console.log("checking",currentDate +"<="+ endDate)
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
monthDiff(d1, d2) {
var a = d1;
var b = d2;

// Months between years.
var months = (b.getFullYear() - a.getFullYear()) * 12;

// Months between... months.
months += b.getMonth() - a.getMonth();

// Subtract one month if b's date is less that a's.
if (b.getDate() < a.getDate())
{
    months--;
}
return months;

}
convertTimestamp(time){
return new Date(dateFormat(new Date(),'yyyy-mm-dd')+"T"+time);
}

differenceHours(date1,date2){
  var hours = Math.abs(date1.getTime() - date2.getTime()) / 36e5;
  return hours;
      }
      generate_uid_timestamp(){
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
      }
}
export default new DateFunctions();
