import React from 'react';
import './availability.css';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import plus from '../../images/+.png';
import Specific  from  '../specific-venue/specific-venue';
import Popupbox from '../../components/popupbox/popupbox';
import Calendar from '../../images/calendar.png';
import CalendarSVG from '../../icon/venue-availability+price/CalendarSVG';
import DailySVG from '../../icon/venue-availability+price/DailySVG';
import HourlySVG from '../../icon/venue-availability+price/HourlySVG';
import WeeklySVG from '../../icon/venue-availability+price/WeeklySVG';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import CkEditorComp from '../CKEditorComp';
import { DatePicker ,Input,Row,Col,Popconfirm} from 'antd';
import { Collapse  } from 'antd';
import BusinessForm from '../BusinessForm/BusinessForm';
import SlotLegend from '../slotLabel/SlotLable';
import SplitSlotForm from '../SplitSlotForm/SplitSlotForm';
import SlotBox from '../slotBox/SlotBox';
import CalendarForm from '../CalendarForm';
import {notification} from 'antd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import '@progress/kendo-theme-default/dist/all.css';
import { Scheduler, DayView,WeekView,MonthView } from '@progress/kendo-react-scheduler';
import dateFormat from 'dateformat';
import DateFunctions from '../../helpers/DateFunctions';
const bookingOptions=[{value:1,label:'Instance Booking'},{value:2,label:'Request To Book'}]
const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}
const calendar=require("../../icon/calendar.svg");
const HeaderContent=<div className="choose-text1">please add your <span className="choose-text2">Availability</span></div>;

// import { Checkbox } from 'antd';
const btn_details=[{'icon':<HourlySVG/>,'name':'Hourly',id:1},{'icon':<DailySVG/>,'name':'Daily',id:2},{'icon':<WeeklySVG/>,'name':'Weekly',id:3},{'icon':<CalendarSVG/>,'name':'Monthly',id:4}];
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'play'},{id:2,name:'work'},{id:3,name:'enjoty'}]}

const hour_drop=[{id:1,value:'Full Day'},{id:2,value:'Only Mornings'},{id:3,value:'Only Evenings'},{id:4,value:'5 Hours'},{id:5,value:'10 Hours'},{id:6,value:'All Except Few Hours'}]
const month_drop=[{id:1,value:'Except Few Months'}];

const week_drop=[{id:1,value:'All Weeks'},{id:2,value:'All Except Few Weeks'},{id:3,value:'All Except Weekends'},{id:4,value:'Alternate Weeks'},{id:5,value:'Only Weekends'},{id:6,value:'All Except Few Days'}];
const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const dayText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default class Availability extends React.Component {


	constructor(props) {
		super(props);
		this.state={activeobj:{'icon':<HourlySVG/>,'name':'Hourly',id:1},  
        availTypes:[{'icon':<HourlySVG/>,'name':'Hourly',id:1,checked:true},{'icon':<DailySVG/>,'name':'Daily',id:2,checked:false},{'icon':<WeeklySVG/>,'name':'Weekly',id:3,checked:false},{'icon':<CalendarSVG/>,'name':'Monthly',id:4,checked:false}],
        hourSlots:[],
        moreDetails:'',
        bookoption:1,
		toPopopen:false,
        showEditForm:true,
		left:0,
		top:0,
		height:0,
		endOpen:false,
        popuperror:false,
        fromerror:false,
        toerror:false,
        fromPopopen:false,
        slot_type:'1',
        startvalue:'',endvalue:'', selectedMonths:[],
        selectedDays:[],fromdate:'',todate:'',hourlydrop:{value:'id',name:'value',dropdown:hour_drop},'hourobj':hour_drop[0],businessform:{fromDate:new Date(),toDate:new Date(),fromTime:new Date(),toTime:new Date(),excludesDays:[],slot_type:1,min:null,max:null,seatList:[],paxList:[]},SplitSlots:[],selectedSlots:[],editSLots:null,editvisible:null,hourAvailType:["1"]}
	}
handleStartOpenChange = (open) => {console.log(open)
    this.setState({fromPopopen:open});
    if (!open) {
        this.setState({ endOpen :true,toPopopen :true });
    }
    if(!this.state.fromdate){
        this.setState({fromerror:true})
    }
}

onChange = (field, value) => {
    this.setState({
        [field]:value,
    });
    
}
disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
        return false;
    }
    return startValue.valueOf() > endValue.valueOf();
}

disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
        return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
}
getUnique(arr, comp) {

    const unique = arr
    .map(e => e[comp])

     // store the keys of the unique objects
     .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

    unique.sort((a, b) => (a[comp] > b[comp]) ? 1 :-1)

    return unique;
}
getMonthofDates(startDate,endDate){
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];

    for(var i = startYear; i <= endYear; i++) {
        var endMonth = i != endYear ? 11 :parseInt(end[1]) - 1;
        var startMon = i === startYear ? parseInt(start[1])-1 :0;
        for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 :j+1) {
            var month = j+1;
            var displayMonth = month < 10 ? '0'+month :month;
            dates.push([i, displayMonth, '01'].join('-'));
        }
    }
    var data_array=[];
    for(var i=0 ; i<dates.length ; i++){
        console.log(dates[i])
        var array=dates[i].split('-');

        data_array.push({month:array[1],isChecked:false});
    }

    var uniq =this.getUnique(data_array,'month')
    return uniq;
}

getDayofWeek(fromDate,toDate){
    var listDate = [];
    var startDate =fromDate;
    var endDate = toDate;
    var dateMove = new Date(startDate);
    var strDate = startDate;

    while (strDate < endDate){
        var strDate = dateMove.toISOString().slice(0,10);
        listDate.push({day:new Date(strDate).getDay(),isChecked:false});
        dateMove.setDate(dateMove.getDate()+1);
    };

    var uniq =this.getUnique(listDate,'day')

    return uniq;
}

selectMonth(startDate,endDate){

    if(startDate!="" && endDate!=""){

        var Months =this.getMonthofDates(startDate,endDate)
        var Weeks =this.getDayofWeek(startDate,endDate)


        console.log(Months)
        console.log(Weeks)
        this.setState({selectedMonths:Months});
        this.setState({selectedDays:Weeks});

        // this.props.venueavail(Months,'trn_venue_selectedMonths');
        // this.props.venueavail(Weeks,'trn_venue_selectedDays');

    }
}
onStartChange = (value) => {
    var date=value==null?'':value.format("YYYY-MM-DD HH:mm:ss");
    // alert(date);
    if(!date){
        this.setState({fromerror:true})
    }else{

        this.setState({fromerror:false})
    }
    this.setState({fromdate:date });
    this.onChange('startValue', value);
    if(window.innerWidth<768){
     // var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:date,todate:this.state.todate,startvalue:value,endvalue:this.state.endValue,moreDetails:this.state.moreDetails};
    // this.props.sendAvailabiltyProp(obj);
     // this.props.checkValidationError('availability',true,obj);

    }
    this.selectMonth(date,this.state.todate);



}

onEndChange = (value) => {
    var date=value==null?'':value.format("YYYY-MM-DD HH:mm:ss");
    if(!date){
        this.setState({toerror:true})
    }else{

        this.setState({toerror:false})
    }
    this.setState({todate:date });
    this.onChange('endValue', value);
    if(window.innerWidth<768){
    var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:date,startvalue:this.state.startValue,endvalue:value,moreDetails:this.state.moreDetails,};
     this.props.checkValidationError('availability',true,obj);

    this.props.sendAvailabiltyProp(obj);
}
    this.selectMonth(this.state.fromdate,date);
}
handleChangeMonth=(index,state)=>{
    var selectedMonths=this.state.selectedMonths;
    selectedMonths[index].isChecked=state;
    this.setState({selectedMonths});

}

handleChangeDay=(index,state)=>{
    var selectedDays=this.state.selectedDays;
    selectedDays[index].isChecked=state;
    this.setState({selectedDays});

}

handleEndOpenChange = (open) => {
    this.setState({endOpen:open, toPopopen:open});
    if(!this.state.todate){
        this.setState({toerror:true})
    }
}

MonthTextFunction(data){
    data = parseInt(data)-1;
    return monthText[data];
}
DayTextFunction(data){
    data = parseInt(data);
    return dayText[data];
}
clearSelectedDays=()=>{
      var selectedMonths=this.state.selectedMonths;
    selectedMonths.map(v => v.isChecked= false);

    var selectedDays=this.state.selectedDays
    selectedDays.map(v => v.isChecked= false);
    this.setState({selectedMonths,selectedDays});
}
receiveAvailability=(obj,state,hourobj1,index)=>{
    this.setState({activeobj:obj});

    var hourlydrop=this.state.hourlydrop;
    var hourobj=this.state.hourobj;
    var availTypes=this.state.availTypes;
    if(index>=0){
        // alert(!obj.checked);
      availTypes[index].checked=!obj.checked;
    }
    var filterrecords=availTypes.filter((obj)=>obj.checked==true);
    var availTypeData=filterrecords.length>0?filterrecords.map((obj)=>obj.id.toString()):[];
    this.setState({hourAvailType:availTypeData,availTypes});
    // if(obj.name=='Hourly'){
    //     hourlydrop.dropdown=hour_drop;
    //     hourobj=hour_drop[0];
    // }else if(obj.name=="Weekly"){

    //     hourlydrop.dropdown=week_drop;
    //     hourobj=week_drop[0];
    // }else if(obj.name=="Monthly"){
    //     hourlydrop.dropdown=month_drop;
    //     hourobj=month_drop[0];
    // }else{
    //     hourlydrop.dropdown=[];
    //     hourobj=null;
    // }

    // if(window.innerWidth<768&&hourobj1){
    //     hourobj=hourobj1;
    // }
    // if(!state){
    // this.setState({hourobj:null});
    // // this.clearSelectedDays();
    // }else{
    // }
    // this.setState({hourobj});
    // this.setState({hourlydrop});
    // if(window.innerWidth<768){
    //  var obj={activeobj:obj,hourobj:hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:this.state.todate,startvalue:this.state.startValue,endvalue:this.state.endValue,moreDetails:this.state.moreDetails};
    //  this.props.checkValidationError('availability',true,obj);
    // this.props.sendAvailabiltyProp(obj);
    // }
}
  onBlurchange = (data) => {
        var value=data=='toPopopen'?this.state.toPopopen:this.state.fromPopopen;
        this.setState({[data]:!value});
    }
    receivePopupData=(data,key)=>{
        // this.clearSelectedDays();
        // alert(JSON.stringify(data));
    	this.setState({[key]:data})
         if(window.innerWidth<768){
     var obj={activeobj:this.state.activeobj,hourobj:data,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:this.state.todate,startvalue:this.state.startValue,endvalue:this.state.endValue,moreDetails:this.state.moreDetails};
    this.props.sendAvailabiltyProp(obj);
     this.props.checkValidationError('availability',true,obj);

    }
        this.setState({popuperror:false});
    }
saveAvailabilty=()=>{
    console.log(this.state);
    var count=0;
    if(!this.state.hourobj){
        if(this.state.activeobj.id!=2){
        count=1;
        this.setState({popuperror:true})
    }
    }
    if(!this.state.fromdate){
        count=1;
        this.setState({fromerror:true});
    }
    if(!this.state.todate){
        count=1;
        this.setState({toerror:true});
    }
    if(count==0){
    var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:this.state.todate,startvalue:this.state.startValue,endvalue:this.state.endValue,moreDetails:this.state.moreDetails};
    this.props.sendAvailabiltyProp(obj);
    this.setState({activeArrow:true})
    // console.log(obj);
    this.props.checkValidationError('availability',true);
    }

}
changeMoreDetails=(e)=>{
    this.setState({moreDetails:e.target.value});
     var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:this.state.todate,startvalue:this.state.startValue,endvalue:this.state.endValue,moreDetails:e.target.value};
       if(window.innerWidth<768){
             this.props.sendAvailabiltyProp(obj);
             this.props.checkValidationError('availability',true,obj);
 }
}
onChange1=(e)=>{
    // alert(JSON.stringify(data));
    this.setState({bookoption:e.target.value});
}
receivingBusinessDays=(data)=>{
    var businessform =this.state.businessform;
    this.setState({businessform:data});
}
showCalendar=(data)=>{
    console.log("JSONDATA",data)
 data.min=1;
            data.max=1;
    if(data.slot_type==1){
            data.min=1;
            data.max=1;
    }else if(data.slot_type==3){
        data.min=1;
        data.max=1;
    if(data.seatList.filter((obj)=>obj.add!='true').length==0){
         notification.error({
    message:'Error Message',
    description:"Please add altest one seat...",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
         return;
    }
    }
    //checking date string


    var getKeys=Object.keys(data);
    var filteredDates=getKeys.filter((obj)=>data[obj]=='Invalid Date' || !data[obj]);
    var fromTime=new Date(data.fromTime);
    var toTime=new Date(data.toTime);
    var formattedfromTime=dateFormat(fromTime,'HH:MM:ss');
    var formattedtoTimedateFormat=dateFormat(toTime,'HH:MM:ss');
    var lessthan=formattedfromTime>formattedtoTimedateFormat;
    var equaldates=formattedfromTime==formattedtoTimedateFormat;
    var getdifference=DateFunctions.differenceHours(DateFunctions.convertTimestamp(formattedfromTime),DateFunctions.convertTimestamp(formattedtoTimedateFormat));

    if(formattedfromTime==formattedtoTimedateFormat || getdifference<1){
         notification.error({
    message:'Error Message',
    description:equaldates?"Hours Should Not be equal":((getdifference<1)?"Business Hours Should be atleast one hour...":"From Date Greater than To Date"),
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
        return;
    }

    // alert(data.seats);
    if(filteredDates.length>0 || DateFunctions.checkDateString(data.fromDate).getTime()>DateFunctions.checkDateString(data.toDate).getTime()==true ){
           notification.error({
    message:'Error Message',
    description:"Fields are incomplete",
    onClick:() => {
      console.log('Notification Clicked!');
    },
  });
    }else{
        var hoursDates=JSON.parse(JSON.stringify(data));
        var getHours=DateFunctions.getHoursInterval(new Date(hoursDates.fromTime),new Date(hoursDates.toTime),60);
        // console.log("getHours",getHours)
        this.setState({hourSlots:getHours});
      this.setState({showEditForm:false});      
    }
}
AddSplitSlots=(data,editData)=>{

    var SplitSlots=this.state.SplitSlots;
    var selectedSlots=this.state.selectedSlots;
    // alert(JSON.stringify(data.hourSlots));
    
    if(editData){
        // alert(editData);
        var findIndex=SplitSlots.findIndex((obj)=>obj.id==editData.id);
        if(findIndex!=-1){
            SplitSlots[findIndex]=data;
        }
        var updateSlots=JSON.parse(JSON.stringify(selectedSlots));
        updateSlots.map((obj,key)=>{
            var findIndex=selectedSlots.findIndex((obj2)=>obj2.id==editData.id);
            if(findIndex!=-1){
                selectedSlots.splice(findIndex,1);
            }
        });
        selectedSlots=selectedSlots.concat(data.hourSlots.map((obj)=>{obj.id=data.id;return obj;}));
        console.log("editData",selectedSlots);
    }else{
        selectedSlots=selectedSlots.concat(data.hourSlots.map((obj)=>{obj.id=data.id;return obj;}));
    SplitSlots.push(data);
    }
    console.log('s_plitSlots',SplitSlots);
    console.log('s_electedSlots',selectedSlots);
this.setState({SplitSlots,selectedSlots});
}
editSLots=(data)=>{

    this.setState({editSLots:data,editvisible:true});
}
gotoAvailability=()=>{
    
    // 
}
deleteEntireSlot=(data)=>{
    var SplitSlots=this.state.SplitSlots;
    var selectedSlots=this.state.selectedSlots;
    var findIndex=SplitSlots.findIndex((obj)=>obj.id==data.id);
    if(findIndex!=-1){
        SplitSlots.splice(findIndex,1);
    }
    var updateSlots=JSON.parse(JSON.stringify(selectedSlots));
        updateSlots.map((obj,key)=>{
            var findIndex=selectedSlots.findIndex((obj2)=>obj2.id==data.id);
            if(findIndex!=-1){
                selectedSlots.splice(findIndex,1);
            }
        });
        this.setState({SplitSlots,selectedSlots});
}
submitDetails=()=>{
    var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,businessform:this.state.businessform,SplitSlots:this.state.SplitSlots,selectedSlots:this.state.selectedSlots,slotType:this.state.slot_type,hourSlots:this.state.hourSlots,moreDetails:this.state.moreDetails,availType:this.state.hourAvailType};
        console.log('this.state',obj);
        // return;
        // alert(JSON.stringify(obj));
        this.props.sendAvailabiltyProp(obj);
     this.props.checkValidationError('availability',true,obj);
}
receiveEditorData=(data)=>{
    // console.log("editor Data",data);
    this.setState({moreDetails:data});
}
	render() {
        const data = [{
    TaskID:0,
    Subject:'Breakfast with Tom',
    Start:new Date("2019-08-27T05:30:00.000Z"),
    End:new Date("2019-08-27T06:00:00.000Z"),
}, {
    TaskID:1,
    Subject:'Lunch with Loren',
    Start:new Date("2019-08-27T09:00:00.000Z"),
    End:new Date("2019-08-27T10:00:00.000Z"),
}]
var checkhourlyavailable=this.state.hourAvailType.includes("1");
		return (
			<div className="availablityform-maindiv">
					<Bindname text="Availability"/>
				<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={3} next={5} activeArrow={this.state.activeArrow}/>
              <div className="main-div">
			  {this.state.availTypes.map((obj,i) => {
          return(
                  <Specific disabled={this.state.businessform.slot_type=='2'} svg={true} width="100px" height="100px" filter="brightness(100)" undertext={obj.name} specificvenue={()=>this.receiveAvailability(obj,null,null,i)} text={obj.icon} active={obj.checked} activecolor={"#a60202"} Skew={false}/>
              )
          }
            )}
			  </div>
			<div className="availabilityform-div">
            {this.state.showEditForm==true&&
            <BusinessForm businessDetails={this.state.businessform} gotoAvailability={()=>this.showCalendar(this.state.businessform)} sendBusinessData={(data)=>this.receivingBusinessDays(data)}/>
            }
            {this.state.showEditForm==false&&
                <CalendarForm businessDetails={this.state.businessform} showEditForm={(data)=>this.setState({showEditForm:true})}/>
            }
            
           {/*Hourly Block Starts*/}
           {/*this.state.businessform.slot_type==2&&this.state.showEditForm==false&&
                <div className="HourlyBlock">
                  <div className="SecondAvailabilityDiv">
    <CkEditorComp moreDetails={this.state.moreDetails} sendEditorData={(data)=>this.receiveEditorData(data)}/>
    </div>
    </div>
           */}
           {this.state.showEditForm==false&&checkhourlyavailable==true&&this.state.businessform.slot_type!='2'&&
            <div className="HourlyBlock">
            <div className="SlotDescription">
            <h3>Slots</h3>
            <div className="SlotsDescriptionBox">
            <SlotLegend legend="Availability" boxColor="white"/>
            <SlotLegend legend="Selected Slots" boxColor="#eb5c00"/>
            </div>
            </div>

            <div className="SecondAvailabilityDiv">
            <div className="AvailabilityDivForm">
            <div className="avail_RadioGroup">
              <RadioGroup onChange={(e)=>this.setState({slot_type:e.target.value})} aria-label="gender" name="SlotsType" value={this.state.slot_type?this.state.slot_type:''}>
              <div className="RadioBtns">
        <FormControlLabel
          value="1"
          className={this.state.slot_type=='1'?'checkedRadioBtn':''}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>}  />}
          label="All Slots"
          labelPlacement="end"
        />
        <FormControlLabel
          value="2"
          className={this.state.slot_type=='2'?'checkedRadioBtn':''}
          control={<Radio color="primary" icon={<RadioButtonCheckedOutlinedIcon/>} />}
          label="Split Slots"
          labelPlacement="end"
        />
        {this.state.slot_type=='2'&&
        <div className="AddBoxBtn">
        <SplitSlotForm clearEditData={()=>this.setState({editSLots:null,editvisible:false})} editvisible={this.state.editvisible} editSLots={this.state.editSLots} SplitSlots={this.state.selectedSlots} sendSlots={(data,editData)=>this.AddSplitSlots(data,editData)} hourSlots={this.state.hourSlots}/>
        </div>
        }
        </div>
        </RadioGroup>
            </div>
            {this.state.slot_type=='1'&&
            <div className="SlotBoxGrid">
            {this.state.hourSlots.map((obj)=>{
                return(
                 <SlotBox selected={false} textselectedColor={"white"} selctedBoxColor={"#eb5c00"}>{obj.label}</SlotBox>
                    )
            })}
            </div>
            }

            {this.state.slot_type=='2'&&
            <div>
            {this.state.SplitSlots.length>0&&this.state.SplitSlots.map((obj)=>{
                return(
<div className="SlotsListBox">

                <label>{obj.labelName}<div className="SlotActions"><div className="sloticon blue" onClick={()=>this.editSLots(obj)}><CreateIcon/></div><Popconfirm
    title="Are you sure delete this slot?"
    onConfirm={()=>this.deleteEntireSlot(obj)}
    onCancel={()=>console.log('cancelled')}
    okText="Yes"
    cancelText="No"
  >
 <div className="sloticon red"><DeleteOutlineIcon/></div>
  </Popconfirm></div></label>
                {obj.hourSlots.map((obj1)=>{
                    return(
 <SlotBox selected={true} textselectedColor={"white"} selctedBoxColor={"#eb5c00"}>{obj1.label}</SlotBox>
                        )
                })}
               
                </div> 
                    )
            })}
                
               
                
                </div>
            }

            
            </div>
            </div>
            </div>
        }
        {!this.state.showEditForm&&
        <div className="next-div AvailbilityBtnSubmit">
            <button  type="button" className="availablitysave-button"><span className="availabilitysave-span" onClick={()=>this.submitDetails()}>Submit</span></button>
            </div>
        }
           {/*Hourly Block Ends*/}
          
			</div>
			</div>
			);
	}
	componentDidMount(){
       // var obj={activeobj:this.state.activeobj,hourobj:this.state.hourobj,selectedDays:this.state.selectedDays,selectedMonths:this.state.selectedMonths,fromdate:this.state.fromdate,todate:this.state.todate,startvalue:this.state.startValue,endvalue:this.state.endValue};
        // alert(JSON.stringify(this.props.availobj));
    if(this.props.availobj){
       var availobj=JSON.parse(JSON.stringify(this.props.availobj));
        console.log(this.props.availobj);
        // alert(JSON.stringify(availobj.availType));
        this.setState({hourSlots:availobj.hourSlots,businessform:availobj.businessform,SplitSlots:availobj.SplitSlots,selectedSlots:availobj.selectedSlots,slot_type:availobj.slotType,activeArrow:true,activeobj:availobj.activeobj,hourobj:availobj.hourobj,selectedDays:availobj.selectedDays,selectedMonths:availobj.selectedMonths,fromdate:availobj.fromdate,todate:availobj.todate,startValue:availobj.startvalue,endValue:availobj.endvalue,moreDetails:availobj.moreDetails,showEditForm:false});
// if(avail)
        var availTypes=this.state.availTypes;
        availTypes.map((obj)=>{
            if(availobj.availType.includes(obj.id.toString())==true){
                obj.checked=true;
            }else{
                obj.checked=false;
            }
                return obj;
        })
        this.setState({availTypes});
        this.receiveAvailability(availobj.activeobj,true,availobj.hourobj);
    }
	}
}
