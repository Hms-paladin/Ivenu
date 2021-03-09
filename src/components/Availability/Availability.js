import React, { Component } from 'react';
// import './App.css';
// import {Button, Container, Row, Col,Collapse, CardBody, Card, Modal } from 'reactstrap';
import { DatePicker ,Input,Row,Col,Collapse} from 'antd';
import moment from 'moment';
import DropdownComp from './DropdownComp';
import Specific  from  '../specific-venue/specific-venue';
import CalendarSVG from '../../icon/venue-availability+price/CalendarSVG';
import DailySVG from '../../icon/venue-availability+price/DailySVG';
import HourlySVG from '../../icon/venue-availability+price/HourlySVG';
import WeeklySVG from '../../icon/venue-availability+price/WeeklySVG';
import Availbilitycss from './Availability.css';



// import "antd/dist/antd.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
const ArrowIcon=require("../../icon/arrow_icon.svg");

const { TextArea } = Input;
const calendar=require("../../icon/calendar.svg");


const HeaderContent=<div className="choose-text1">Please add the <span className="choose-text2">Amenities</span></div>;

const btn_details=[{'icon':<HourlySVG/>,'name':'Hourly',id:1},{'icon':<DailySVG/>,'name':'Daily',id:2},{'icon':<WeeklySVG/>,'name':'Weekly',id:3},{'icon':<CalendarSVG/>,'name':'Monthly',id:4}];

const monthText = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const dayText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const month_drop=[{id:1,value:'Except Few Months'}];

const week_drop=[{id:1,value:'All Weeks'},{id:2,value:'All Except Few Weeks'},{id:3,value:'All Except Weekends'},{id:4,value:'Alternate Weeks'},{id:5,value:'Only Weekends'},{id:6,value:'All Except Few Days'}];


const hour_drop=[{id:1,value:'Full Day'},{id:2,value:'Only Mornings'},{id:3,value:'Only Evenings'},{id:4,value:'5 Hours'},{id:5,value:'10 Hours'},{id:6,value:'All Except Few Hours'}]

const options = [
{ key:'angular', text:'Alternate Days', value:'Alternate Days' },
{ key:'css', text:'Hour', value:'Hour' },
{ key:'design', text:'Second', value:'Second' },
];


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function onChange(date, dateString, abc) {
    console.log(date, dateString);
    console.log(abc);
}
class Availability extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            collapse:false,
            collapse2:false,
            collapse3:true,
            days:'',
            activeobj:null,
            fromdate:props.availabilityDatas&&props.availabilityDatas.trn_venue_avail_frm,
            todate:props.availabilityDatas&&props.availabilityDatas.trn_venue_avail_to,
            details:'',
            visible:false,
            availability_id:props.availabilityDatas&&props.availabilityDatas.trn_availability_type,
            selectedMonths:[],
            selectedDays:[],
            dropdownOption:[],
            facility:props.facility?props.facility:'',
            startValue:props.availabilityDatas&&props.availabilityDatas.trn_venue_avail_frm!=""?moment(props.availabilityDatas.trn_venue_avail_frm):null,
            endValue:props.availabilityDatas&&props.availabilityDatas.trn_venue_avail_to!=""?moment(props.availabilityDatas.trn_venue_avail_to):null,
            moredetails:props.availabilityDatas&&props.availabilityDatas.trn_venue_moredetails,
            endOpen:false,
            toPopopen:false,
            fromPopopen:false,
            dropArray:{Daily:[],Monthly:month_drop,Weekly:week_drop,Hourly:hour_drop}

        };
    }

    componentWillMount(){

        var dropdownOption=this.state.dropArray[this.props.availabilityDatas&&this.props.availabilityDatas.trn_venue_key==undefined?'Daily':this.props.availabilityDatas&&this.props.availabilityDatas.trn_venue_key];

        var selectedMonths=this.props.availabilityDatas&&this.props.availabilityDatas.trn_venue_selectedMonths?this.props.availabilityDatas.trn_venue_selectedMonths:[];

        var selectedDays=this.props.availabilityDatas&&this.props.availabilityDatas.trn_venue_selectedDays?this.props.availabilityDatas.trn_venue_selectedDays:[];

        this.setState({dropdownOption,selectedMonths,selectedDays});

    }

    componentWillReceiveProps(props){

        var stateChange=this.state.dropArray[props.availabilityDatas.trn_venue_key==undefined?'Daily':props.availabilityDatas.trn_venue_key];

        this.setState({dropdownOption:stateChange});

        if(props.facility){
            this.setState({facility:props.facility})
        }
    }
    onBlurchange = (data) => {
        var value=data=='toPopopen'?this.state.toPopopen:this.state.fromPopopen;
        this.setState({[data]:!value});
    }
    onChangeAvailability = (e) => {
        this.setState({ [e.target.name]:e.target.value });
    }
    changeDate=(date,dateString,key)=>{

        this.setState({[key]:dateString});
        this.props.venueavail(dateString,key=='fromdate'?'trn_venue_avail_frm':'trn_venue_avail_to');

    }
    changeDropdown = (value) => {
        console.log(value);

        this.setState({days:value});
        this.props.venueavail(value,'trn_venue_days');
    // let days = e.target.textContent;
    // console.log(days);
}

handleSubmit =() =>{
    var obj={"trn_venue_days":this.state.days,
    "trn_venue_avail_frm":this.state.fromdate,
    "trn_venue_avail_to":this.state.todate
}
// this.props.venueavail(obj);
this.props.nexttab('list4');
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

onChange = (field, value) => {
    this.setState({
        [field]:value,
    });
    
}
changeAvailTye=(data,key)=>{

    if(data==this.state.availability_id){
        return
    }
    var dropdownOption=this.state.dropArray[key];

    var selectedMonths=this.state.selectedMonths;
    selectedMonths.map(v => v.isChecked= false);

    var selectedDays=this.state.selectedDays
    selectedDays.map(v => v.isChecked= false);

    this.setState({dropdownOption,selectedMonths,selectedDays});
console.log(this.state)
    this.setState({availability_id:data})
    this.props.venueavail("",'trn_venue_days');
    this.props.venueavail(key,'trn_venue_key');
    this.props.venueavail(data,'trn_availability_type');
}
moredetails=(e)=>{
// alert(e.target.value);
this.setState({moredetails:e.target.value});
this.props.venueavail(e.target.value,'trn_venue_moredetails')
}
onStartChange = (value) => {
    var date=value==null?'':value.format("YYYY-MM-DD");
    this.setState({fromdate:date });
    this.onChange('startValue', value);
    this.props.venueavail(date,'trn_venue_avail_frm');
    this.selectMonth(date,this.state.todate);

}

onEndChange = (value) => {
    var date=value==null?'':value.format("YYYY-MM-DD");
    this.setState({todate:date });
    this.onChange('endValue', value);
    this.props.venueavail(date,'trn_venue_avail_to');
    this.selectMonth(this.state.fromdate,date);
}

selectMonth(startDate,endDate){

    if(startDate!="" && endDate!=""){

        var Months =this.getMonthofDates(startDate,endDate)
        var Weeks =this.getDayofWeek(startDate,endDate)


        console.log(Months)
        console.log(Weeks)
        this.setState({selectedMonths:Months});
        this.setState({selectedDays:Weeks});

        this.props.venueavail(Months,'trn_venue_selectedMonths');
        this.props.venueavail(Weeks,'trn_venue_selectedDays');

    }
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

MonthTextFunction(data){
    data = parseInt(data)-1;
    return monthText[data];
}

DayTextFunction(data){
    data = parseInt(data);
    return dayText[data];
}
receiveAvailability=(data)=>{
    this.setState({activeobj:data});
}


handleStartOpenChange = (open) => {console.log(open)
    this.setState({fromPopopen:open});
    if (!open) {
        this.setState({ endOpen :true,toPopopen :true });
    }
}

handleEndOpenChange = (open) => {
    this.setState({endOpen:open, toPopopen:open});
}

render() {
    const {days,fromdate,todate,details} =this.state;
    return (
        <div className='formcomponent_ Availability' style={{margin:'10px 0px 10px 20px'}}>
        <Bindname text="Amenities"/>
                <Choosediv  content={HeaderContent}/>
        <div style={{margin:'5px 0px'}}>
        <div className="main-div venueavail">


        {btn_details.map((obj,i) => {
          return(
                  <Specific svg={true} width="110px" height="110px" filter="brightness(100)" undertext={obj.name} specificvenue={()=>this.receiveAvailability(obj)} text={obj.icon} active={this.state.activeobj&&this.state.activeobj.id==obj.id} activecolor={"#a60202"} Skew={true}/>
              )
      }
            )}


        </div>
        </div>
        <Row style={{margin:'10px 0px'}}>
        </Row>
        {this.props.availabilityDatas&&this.props.availabilityDatas.trn_availability_type!=""&&
        <div className="mobvenueavailablity">
        {this.state.dropdownOption.length !=0 &&
            <div>
            <Row style={{'width':'100%'}} className="mobile_space">  

            <div className="webmodules" style={{fontSize:'18px','color':'#1f459e','width':'2%',marginLeft:'15px'}}>
            &gt;
            </div>

            <div className="firstrow" style={{fontSize:'18px','color':'#1f459e','width':'17%',}}>
            Available Mode
            </div>

            <div style={{'width':'78%'}} className="venuedaydropdown">
            <div style={{width:'25%'}}>
            <DropdownComp selectedValue={this.changeDropdown} selected={this.props.availabilityDatas.trn_venue_days } options={this.state.dropdownOption}/>
            </div>
            </div>

            </Row>

            <div className="borderstylevenueavail" style={{width:'100%',height:'1px','background':'#c3c3c3','margin':'15px 0px'}}></div>

            </div>
        }


        <Row style={{'width':'100%'}} className="backgroundavail" onClick={()=>this.setState({collapse:!this.state.collapse})}>  

        <div className="webmodules" style={{fontSize:'18px','color':'#1f459e','width':'2%',marginLeft:'15px'}}>
        &gt;
        </div>
        <div className='clr_orange' style={{fontSize:'18px','margin-right':'10px'}}>
        {this.state.facility?this.state.facility.trn_venue_room_name:''} Room
        </div>
        <div className='clr_blue mobblack' style={{fontSize:'18px'}}>
        Available Duration
        </div>
        <div className='collapsecss mobilemodules'>
        <img src={ArrowIcon} className={`${this.state.collapse==true?'rotate180':''}`}/>
        </div>


        </Row>             

        <Collapse  isOpen={window.innerWidth>767?true:this.state.collapse} className="rowcollapse">
        <Row  style={{'width':'100%',margin:'10px 0px'}}>  

        <div className="flexRow availduration">
        <div className='clr_lblack availcol' style={{fontSize:'20px',paddingRight:5,width:'58px'}}>
        From
        </div>
        <div className='clr_orange availcol' style={{fontSize:'18px',paddingRight:5}}>
    {/*<DatePicker  onChange={(date,dateString)=>this.changeDate(date,dateString,'fromdate')}  style={{height:'37px',marginRight:'10px'}} />*/}
    <DatePicker
    allowClear={false}
    autoFocus={false}
    disabledDate={this.disabledStartDate}
    format="MMM-DD-YYYY"
    value={this.state.startValue}
    placeholder="Start"
    onChange={this.onStartChange}
    onOpenChange={this.handleStartOpenChange}
    style={{height:'37px',marginRight:'10px'}}
    open={this.state.fromPopopen}
    />

    </div>
    <div class="availcol" onClick={() => this.onBlurchange('fromPopopen')}>
    <img src={calendar} />
    </div>
    </div>
    <div className="flexRow availduration">
    <div className='clr_lblack availcol' style={{fontSize:'20px',paddingRight:5,width:'58px'}}>
    To
    </div>            

    <div className='clr_blue availcol' style={{fontSize:'18px',paddingRight:5}}>
{/*<DatePicker onChange={(date,dateString)=>this.changeDate(date,dateString,'todate')} style={{height:'37px',marginRight:'10px'}} />*/}

<DatePicker
allowClear={false}
autoFocus={false}
disabledDate={this.disabledEndDate}
format="MMM-DD-YYYY"
value={this.state.endValue}
placeholder="End"
onChange={this.onEndChange}
open={this.state.endOpen}
onOpenChange={this.handleEndOpenChange}
style={{height:'37px',marginRight:'10px'}}
open={this.state.toPopopen}
/>
</div>
<div class="availcol" onClick={() => this.onBlurchange('toPopopen')}>
<img src={calendar} />
</div>
</div>
</Row>  
</Collapse>
<div className="borderstylevenueavail webmodules" style={{width:'100%',height:'1px','background':'#c3c3c3','margin':'15px 0px'}}></div> 


{(this.props.availabilityDatas.trn_availability_type==4 && this.props.availabilityDatas.trn_venue_days==1 && this.state.selectedMonths != 0) &&

    <div>
    <Row style={{'width':'100%'}} className='backgroundavail' onClick={()=>this.setState({collapse3:!this.state.collapse3})}>  

    <div className="webmodules" style={{fontSize:'18px','color':'#1f459e','width':'2%',marginLeft:'15px'}}>
    &gt;
    </div>

    <div className='clr_blue moredetails' style={{fontSize:'18px'}}>
    Select Months

    </div>
    <div className='collapsecss mobilemodules'>
    <img src={ArrowIcon} className={`${this.state.collapse3==true?'rotate180':''}`}/>
    </div>

    </Row>

<Collapse  isOpen={window.innerWidth>767?true:this.state.collapse3} className="rowcollapse margin">
    
    <div className="avail_month_padding tag_check">
    {this.state.selectedMonths.map((item2,i) => 
        <span style={{marginRight:5}}>    
        <input style={{display:'none'}} type="checkbox" id={'months_list_'+i} name="ossm" value={item2.month}  onChange={(e) => this.handleChangeMonth(i,!item2.isChecked)} checked={item2.isChecked}/> 
        <label for={'months_list_'+i}>{this.MonthTextFunction(item2.month)}</label>
        </span>
        )}
    </div>
    <div className="borderstylevenueavail webmodules" style={{width:'100%',height:'1px','background':'#c3c3c3','margin':'15px 0px'}}></div> 

    </Collapse>
    </div>    
}

{(this.props.availabilityDatas.trn_availability_type==3 && this.props.availabilityDatas.trn_venue_days==6 && this.state.selectedDays != 0) &&
    <div>
    <Row style={{'width':'100%'}} className='backgroundavail' onClick={()=>this.setState({collapse3:!this.state.collapse3})}>  

    <div className="webmodules" style={{fontSize:'18px','color':'#1f459e','width':'2%',marginLeft:'15px'}}>
    &gt;
    </div>

    <div className='clr_blue moredetails' style={{fontSize:'18px'}}>
    Select Weekdays

    </div>
    <div className='collapsecss mobilemodules'>
    <img src={ArrowIcon} className={`${this.state.collapse3==true?'rotate180':''}`}/>
    </div>

    </Row> 

    <Collapse  isOpen={window.innerWidth>767?true:this.state.collapse3} className="rowcollapse margin">
    <div className="avail_month_padding tag_check">
    {this.state.selectedDays.map((item,i) => 
        <span style={{marginRight:5}}>    
        <input style={{display:'none'}} type="checkbox" id={'days_list_'+i} name="ossm" value={item.day}  onChange={(e) => this.handleChangeDay(i,!item.isChecked)} checked={item.isChecked}/> 
        <label for={'days_list_'+i}>{this.DayTextFunction(item.day)}</label>
        </span>
        )}
    </div>
    <div className="borderstylevenueavail webmodules" style={{width:'100%',height:'1px','background':'#c3c3c3','margin':'15px 0px'}}></div> 
    </Collapse>
    </div>
}

<Row style={{'width':'100%'}} className='backgroundavail' onClick={()=>this.setState({collapse2:!this.state.collapse2})}>  

<div className="webmodules" style={{fontSize:'18px','color':'#1f459e','width':'2%',marginLeft:'15px'}}>
&gt;
</div>
<div className='clr_orange' style={{fontSize:'18px','margin-right':'10px'}}>
{this.state.facility?this.state.facility.trn_venue_room_name:''} Room
</div>
<div className='clr_blue moredetails' style={{fontSize:'18px'}}>
Add More Details

</div>
<div className='collapsecss mobilemodules'>
<img src={ArrowIcon} className={`${this.state.collapse2==true?'rotate180':''}`}/>
</div>

</Row> 


<Collapse  isOpen={window.innerWidth>767?true:this.state.collapse2} className="rowcollapse margin">
<Row className="textarearw">
<TextArea rows={4} className="textareacls" value={this.state.moredetails} onChange={this.moredetails}/>
</Row>            
</Collapse>



</div>



}

{/*<div style={{width:'100%',height:'1px','background':'#c3c3c3','margin':'15px 0px'}}></div>*/}
<div className="webmodules button_change">
<button type="button" onClick={this.handleSubmit} class="btn btn_next btn-lg">
NEXT
</button>
</div>

</div>
);
}
}

export default Availability;
