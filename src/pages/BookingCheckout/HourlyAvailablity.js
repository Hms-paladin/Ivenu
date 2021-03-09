import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  usePickerState,
  TimePicker
} from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Modal, Button } from 'antd';
import BlockForm from '../../components/BlockForm/BlockForm'
import SlotLegend from '../../components/slotLabel/SlotLable';
import startOfWeek from "date-fns/startOfWeek";
import dateFormat from 'dateformat';
import Apilink from '../../helpers/apilink';
import { DatePicker } from "@material-ui/pickers";
import Slider from '@material-ui/core/Slider';
import WeekCalendar from '../../components/weekCalendar/WeekCalendar';
var capacitycount=0;
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
const excludeDays=[{label:'Sun',value:0},{label:'Mon',value:1},{label:'Tue',value:2},{label:'Wed',value:3},{label:'Thu',value:4},{label:'Fri',value:5},{label:'Sat',value:6}]

var noslotavailable="No Slot Avaialble";
function valuetext(value) {
  capacitycount=value;
}

export default class HourlyAvailablity extends React.Component {

constructor(props) {
	super(props);
  var mincount=this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_min_count;
  var maxcount=this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_max_count;
	this.state={min:mincount?mincount:0,max:maxcount?maxcount:0,dateValue:new Date(),availability:null,hourlySLotsData:[],rangeData:0,loading:null}
}


handleCancel=()=>{
this.props.closeHourModal&&this.props.closeHourModal();
}
handleOk=()=>{
console.log('capacitycount',capacitycount);
if(this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)){
  this.props.sendpaxDetails&&this.props.sendpaxDetails(capacitycount,this.state.dateValue)
}else{
 this.props.sendDataSlot&&this.props.sendDataSlot(this.state.hourlySLotsData.length>0?this.state.hourlySLotsData:dateFormat(this.state.dateValue,'yyyy-mm-dd'));
}
}
changeDate=(date)=>{

	console.log(this.props.excludeDays,"dateValue") 
  noslotavailable="No Slot Avaialble"
  if(Array.isArray(this.props.excludeDays)==true){
    // alert('');
    if(this.props.excludeDays.includes(String(date.getDay()))){
      noslotavailable="Days Falls Under Exclude Days ("+this.props.excludeDays.map((obj1)=>{return excludeDays[parseInt(obj1)].label})+")";
        this.setState({dontupdate:false,availability:null,rangeData:0,dateValue:date});
        capacitycount=0;
    return true;
    }
  }
	this.setState({dontupdate:false,dateValue:date,loading:true});
	var venueid=this.props.venueDetails?this.props.venueDetails.venue_id:null;
		var obj={venueId:venueid,date:dateFormat(new Date(date),'yyyy-mm-dd'),availType:1};
	fetch(Apilink.apiurl+"providerCalendarHourly",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(obj),
    }).then((resp)=>resp.json())
    .then((respjson)=>{
      this.setState({loading:null});
    	console.log("responsejson",respjson);
    	if(respjson.status==0){
    	// alert(JSON.stringify(respjson));
    		// respjson
         if(respjson.data[0].availability[0].hourlySlots.length>0){
    		    this.setState({availability:respjson.data[0],min:respjson.data[0].trn_venue_min_count,});
         }else{
           this.setState({availability:null});
         }
     
    	}else{
    		this.setState({availability:null,rangeData:0})
        capacitycount=0;
    	}
    })
}
receiveSlots=(data)=>{
	this.setState({hourlySLotsData:data,dontupdate:true})

}
handleChange = (event, newValue) => {
  capacitycount=newValue;
  };
  generateVenueType=(type,availtype)=>{
    if(type==2){
      return 2;
    }else if(type==3){
      return 3;
    }else if((!type || type==1)&&availtype==1){
      return 1;
    }else if((!type || type==1)&&availtype==2){
      return 4;
    }else if((!type || type==1)&&availtype==3){
      return 5;
    }else{
      return 6;
    }
    }
	render() {
    // alert(this.props.type);
    var venuetype=this.props.venueDetails&&this.props.venueDetails.trn_venue_type;
    if(this.props.venueDetails){
    var getVenueType=this.generateVenueType(this.props.venueDetails.trn_venue_type,this.props.venueDetails.availability[0].trn_availability_type)
    }
    console.log('capacitycount',capacitycount);
    console.log('venueDetails',this.props.venueDetails)
		return (
			<div className="HourlyAvailablityDiv">
        {window.innerWidth>767&&
  <Modal
   className="splitSLotFormDivModal percent_80"
   width={window.innerWidth}
          title="Availablity"
          visible={true}
            onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ top: 20 }}
        >
         
<div className="HourlyAvailFlexdiv">
<div  className={`${window.innerWidth<768 ? "mobileweb_FirstDiv" : "FirstDiv"}`}>
  {
    this.props.venueDetails && this.props.type == 1 && window.innerWidth<768 ?
    <WeekCalendar propssend={(date)=>this.changeDate(date)}/>
    :
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

			   <DatePicker
				   	disablePast={true}
					orientation="landscape"
			        variant="static"
			        orientation="landscape"
			        variant="static"
			        openTo="date"
			        onChange ={(date)=>this.changeDate(date)}
			        value={this.state.dateValue}
        	   />
        </MuiPickersUtilsProvider>
  }
    
        
        </div>
        <div className="SecondDiv">
        {this.state.loading&&
        <div className="loaderdivclass">
           <LinearProgress/>
           <p>Please Wait...</p>
           </div>
         }
         {!this.state.loading&&
         <>
        {!this.state.availability&&(this.props.venueDetails.trn_venue_type==1 || !this.props.venueDetails.trn_venue_type)&&
        	<div className="noslotsavaialble">{noslotavailable}</div>
        }
        {
          this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==1 || !this.props.venueDetails.trn_venue_type)&&
          <BlockForm dontupdate={this.state.dontupdate?this.state.dontupdate:null} hourlychosenslots={this.props.hourlychosenslots} noform={true} hide={false} updateSlots={()=>this.props.updateSlots&&this.props.updateSlots()} selectedDate={this.state.dateValue} sendSlots={(data)=>this.receiveSlots(data)} availability={this.state.availability}/>
        }
        {this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)&&!this.state.availability&&
          <div  className="noslotsavaialble">No {venuetype&&venuetype==2?'Paxes':'Seats'} are available</div>

        }
        {this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)&&this.state.availability&&
          <>
          <div className="minmaxpaxdiv">
          {venuetype&&venuetype==2&&
          <div className="childdiv">Minimum {venuetype&&venuetype==3?'Seat':'Pax'}
          <div>{this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_min_count}</div>
          </div>
        }
          <div className="childdiv"> Maximum {venuetype&&venuetype==3?'Seat':'Pax'}  
          <div>{this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_max_count}</div>
          </div>
          </div>
          <div className="paxseatcenter">
          <div>
          <Slider
       defaultValue={venuetype&&venuetype==3?0:this.state.min}
        aria-labelledby="discrete-slider-always"
        step={1}
         onChange={this.handleChange}
        min={venuetype&&venuetype==3?0:(this.state.availability?this.state.availability.trn_venue_min_count:0)}
        marks={[this.state.availability?this.state.availability.trn_venue_max_count:0]}
        max={this.state.availability?(this.state.availability.availableCapacity):0}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
      />
          <div className="availablebooktextdiv">Available {venuetype&&venuetype==3?'Seats':'Pax'} ({this.state.availability?(this.state.availability.availableCapacity):0})</div>
          </div>
          </div>
          </>
        }
        </>
      }
        </div>
     
        </div>
        </Modal>
        }
        {window.innerWidth<768&&
        <div className="HourlyAvailFlexdiv">
        <div  className={`${window.innerWidth<768 ? "mobileweb_FirstDiv" : "FirstDiv"}`}>
          {
           (this.props.venueDetails && this.props.type==1) &&
          
          <WeekCalendar propssend={(date)=>this.changeDate(date)}/>
          
        }
        
            
                
                </div>
                <div className={`${this.state.availability ? "SecondDiv pb-2" : "SecondDiv" }`}>
                {this.state.loading&&
                <div className="loaderdivclass">
                   <LinearProgress/>
                   <p>Please Wait...</p>
                   </div>
                 }
                 {!this.state.loading&&
                 <>
                {!this.state.availability&&(this.props.venueDetails.trn_venue_type==1 || !this.props.venueDetails.trn_venue_type)&&
                  <div className="noslotsavaialble noslotsavaialble_width">{noslotavailable}</div>
                }
                {
                  this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==1 || !this.props.venueDetails.trn_venue_type)&&
                  <BlockForm dontupdate={this.state.dontupdate?this.state.dontupdate:null} hourlychosenslots={this.props.hourlychosenslots} noform={true} hide={false} updateSlots={()=>this.props.updateSlots&&this.props.updateSlots()} selectedDate={this.state.dateValue} sendSlots={(data)=>this.receiveSlots(data)} availability={this.state.availability}/>
                }
                {this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)&&!this.state.availability&&
                  <div  className="noslotsavaialble">No {venuetype&&venuetype==2?'Paxes':'Seats'} are available</div>
        
                }
                {this.props.venueDetails&&(this.props.venueDetails.trn_venue_type==2 || this.props.venueDetails.trn_venue_type==3)&&this.state.availability&&
                  <>
                  <div className="minmaxpaxdiv">
                  {venuetype&&venuetype==2&&
                  <div className="childdiv">Minimum {venuetype&&venuetype==3?'Seat':'Pax'}
                  <div>{this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_min_count}</div>
                  </div>
                }
                  <div className="childdiv"> Maximum {venuetype&&venuetype==3?'Seat':'Pax'}  
                  <div>{this.props.venueDetails.availability.length>0&&this.props.venueDetails.availability[0].trn_venue_max_count}</div>
                  </div>
                  </div>
                  <div className="paxseatcenter">
                  <div>
                  <Slider
               defaultValue={venuetype&&venuetype==3?0:this.state.min}
                aria-labelledby="discrete-slider-always"
                step={1}
                 onChange={this.handleChange}
                min={venuetype&&venuetype==3?0:(this.state.availability?this.state.availability.trn_venue_min_count:0)}
                marks={[this.state.availability?this.state.availability.trn_venue_max_count:0]}
                max={this.state.availability?(this.state.availability.availableCapacity):0}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
              />
                  <div className="availablebooktextdiv">Available {venuetype&&venuetype==3?'Seats':'Pax'} ({this.state.availability?(this.state.availability.availableCapacity):0})</div>
                  </div>
                  </div>
                  </>
                }
                
                {
                  this.state.availability &&
                  <div className="availbtn"> 
                  {this.props.cancelbtn==true&&
                  <button onClick={()=>window.innerWidth<768&&this.props.history.goBack()} className="btn btn-md btn-danger cancelactivebtn">Cancel</button>
                }
                  <button onClick={()=>this.handleOk()} className="btn btn-md btn-primary blueactivebtn">Submit</button>
                  </div>

                }
                </>
              }
             
                </div>
             
                </div>
        }
			</div>
		);
	}
  componentDidMount(){
    this.changeDate(new Date());
  }
}
