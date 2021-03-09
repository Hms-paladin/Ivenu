import React from 'react';
import {notification} from 'antd';
import './price.css';
// import plus from '../../images/+.png';
import Specific from '../specific-venue/specific-venue';

import Popupbox from '../../components/popupbox/popupbox';
import Greyright from '../../images/greyright.png';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Seatpricing from '../seatpricing/seatpricing';
import CalendarSVG from '../../icon/venue-availability+price/CalendarSVG';
import DailySVG from '../../icon/venue-availability+price/DailySVG';
import HourlySVG from '../../icon/venue-availability+price/HourlySVG';
import WeeklySVG from '../../icon/venue-availability+price/WeeklySVG';


// import { Checkbox } from 'antd';

var playarray={value:'id',name:'name',dropdown:[{id:1,name:'USD'},{id:2,name:'INR'},{id:3,name:'MYI'}]}
const HeaderContent=<div className="choose-text1">Please provide the <span className="choose-text2">Price</span></div>;

export default class Price extends React.Component {


	constructor(props) {
		super(props);
		this.state={activeArrow:false,priceobj:{id:1,name:'USD'},top:0,height:0,left:0,activeobj:{'icon':<HourlySVG/>,'name':'Hourly','title':'Hour',id:1},amt:0,currencydropdown:[{id:1,name:'USD'},{id:2,name:'INR'},{id:3,name:'MYI'}],pricetypedetails:[{'icon':<HourlySVG/>,'name':'Hourly','title':'Hour',id:1,checked:false},{'icon':<DailySVG/>,'name':'Daily','title':'Day',id:2,checked:false},{'icon':<WeeklySVG/>,'name':'Weekly','title':'Week',id:3,checked:false},{'icon':<CalendarSVG/>,'name':'Monthly','title':'Month',id:4,checked:false}],activeCurrency:'USD',seatList:[{label:'',pricing:[]}],clearprice:null}
		 this._onBlur = this._onBlur.bind(this);
      this._onFocus = this._onFocus.bind(this);
	}
_onFocus() {
      console.log('focusing')
      if(this.state.amt==''||this.state.amt==0){
      this.setState({amt:0})
  }
    }
     _onBlur() {
      
      console.log('blurrin')
      if(this.state.amt==''||this.state.amt==0){
      this.setState({amt:0})
      }
    }
    	generatekey=(keydata)=>{
			if(keydata=='Hour'){
			return 'hourCost';
		}else if(keydata=='Day'){
			return 'dayCost';
		}else if(keydata=='Week'){
			return 'weekCost';
		}else{
			return 'monthCost';
		}
	}
specificvenue=(obj,index,keyindex)=>{
	// console.log(obj);
	// alert('')
	if(this.props.venueType==3 || this.props.venueType==1){
		return;
	var pricetypedetails=this.state.pricetypedetails;
	pricetypedetails[keyindex].checked=!obj.checked;
		var seatList=this.state.seatList;
	if(obj.checked==false){

		var clearprice=this.generatekey(index);
		if(seatList.length>0){
			for(var i=0;i<seatList.length;i++){
				if(seatList[i].pricing.length>0){
					seatList[i].pricing[0][clearprice]=0;
				}
			}
		}
	}
	// alert(JSON.stringify(seatList));
	this.setState({seatList,pricetypedetails});
}else{

	// this.setState({activeobj:obj})
}
	if(window.innerWidth<768){
	this.props.sendPriceData({'activeobj':obj,'priceobj':this.state.priceobj,'amt':this.state.amt,venueType:this.props.venueType})
	this.props.checkValidationError('pricecard',true,null,this.state.amt);
	
}

	// this.props.sendPriceData({'activeobj':obj,'priceobj':this.state.priceobj,'amt':this.state.amt});
	// console.log(obj)
}
receivePopupData=(data,key)=>{
	this.setState({[key]:data});
		if(window.innerWidth<768){
	this.props.sendPriceData({'activeobj':this.state.activeobj,'priceobj':data,'amt':this.state.amt})
	this.props.checkValidationError('pricecard',true,null,this.state.amt);
}
}
componentDidMount(){
	this.setState({top:this.instance.getBoundingClientRect().top});
	this.setState({height:this.instance.getBoundingClientRect().height});
	this.setState({left:this.instance.getBoundingClientRect().left});
}
changePrice=(e)=>{
	// var count=0;
	var checknumber=/^[0-9]*$/g;
	// alert(checknumber.test(e.target.value));
	var countvalue=e.target.value;
	if(checknumber.test(countvalue)){
		// countvalue=countvalue;

	this.setState({amt:countvalue});
	}else{
		// countvalue=0
	// this.setState({count:0});
	}
	if(window.innerWidth<768){
	this.props.sendPriceData({'activeobj':this.state.activeobj,'priceobj':this.state.priceobj,'amt':countvalue})
	this.props.checkValidationError('pricecard',true,null,countvalue);
}
}
submitPrice=()=>{
	if(this.props.venueType!=3 && this.props.venueType!=2 ){
		var seatList=this.state.seatList[0].pricing;
		// var hourcost=seatList.length
		var availTypeList=this.props.availTypeList
		var hourCost=availTypeList.includes('1')==true?(seatList.length>0?seatList[0].hourCost?seatList[0].hourCost:0:0):0;
		var dayCost=availTypeList.includes('2')==true?(seatList.length>0?seatList[0].dayCost?seatList[0].dayCost:0:0):0;
		var weekCost=availTypeList.includes('3')==true?(seatList.length>0?seatList[0].weekCost?seatList[0].weekCost:0:0):0;
		var monthCost=availTypeList.includes('4')==true?(seatList.length>0?seatList[0].monthCost?seatList[0].monthCost:0:0):0;
		var priceobj={"venue_price_type":this.state.pricetypedetails.filter((obj)=>obj.checked==true).map((obj2)=>obj2.id).join(),hour_cost:hourCost,week_cost:weekCost,day_cost:dayCost,month_cost:monthCost,venue_price_currency:this.state.activeCurrency,venueType:this.props.venueType};
		var priceinformation=this.state.pricetypedetails.filter((obj)=>obj.checked==true);
	if(priceinformation.length==0){
		notification.error({
		        message:'Error Message',
		        description:"Please Provide the price",
		        onClick:() => {
		         console.log('Notification Clicked!');
		       },
		     });
	}else{
		this.props.sendPriceData(priceobj);
	   // alert(JSON.stringify(priceobj));
	}
	// if(this.state.amt=='' || this.state.amt==0){
	// 	alert("Amount Should Not Empty");
	// 	return;
	// }
	// this.props.sendPriceData({'activeobj':this.state.activeobj,'priceobj':this.state.priceobj,'amt':this.state.amt,venueType:this.props.venueType});
	// this.setState({activeArrow:true});
	this.props.checkValidationError('pricecard',true);
}else if(this.props.venueType==3){
	var priceinformation=this.state.pricetypedetails.filter((obj)=>obj.checked==true);
	if(priceinformation.length==0){
notification.error({
        message:'Error Message',
        description:"Please Provide the price",
        onClick:() => {
         console.log('Notification Clicked!');
       },
     });
	}else{
		var seatList=this.state.seatList;
		seatList=seatList.length>0?seatList.map((obj1)=>{
			obj1.pricing.map((obj)=>{	
			obj.hourCost=this.props.availTypeList.includes('1')==true?(obj.hourCost?obj.hourCost:0):0;
			obj.dayCost=this.props.availTypeList.includes('2')==true?(obj.dayCost?obj.dayCost:0):0;
			obj.weekCost=this.props.availTypeList.includes('3')==true?(obj.weekCost?obj.weekCost:0):0;
			obj.monthCost=this.props.availTypeList.includes('4')==true?(obj.monthCost?obj.monthCost:0):0;
			return obj;
			})
			return obj1;
		}):[];
		// alert(JSON.stringify(seatList));
		this.props.sendPriceData({seatList:seatList,'activeobj':this.state.activeobj,'priceobj':this.state.priceobj,'amt':this.state.amt,activeCurrency:this.state.activeCurrency,activePrice:this.state.pricetypedetails.filter((obj)=>obj.checked==true).map((obj2)=>obj2.id).join(),venueType:this.props.venueType});
			this.setState({activeArrow:true});
			this.props.checkValidationError('pricecard',true);
	}
}else{
			this.props.checkValidationError('pricecard',true);
}
}


	render() {
		return (
			<div className="priceform-maindiv">
	<Bindname text="Price"/>
	<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={5} next={7} activeArrow={this.state.activeArrow}/>
		<div className="main-div">
			{this.state.pricetypedetails.map((obj,key)=>{
				return(
					<Specific type={this.props.venueType} disabled={this.props.venueType=='2'} svg={true} width="110px" height="110px" filter="brightness(100)" undertext={obj.title} specificvenue={()=>this.specificvenue(obj,obj.title,key)} active={(this.props.venueType==3 || this.props.venueType==1)?obj.checked==true:obj.id==this.state.activeobj.id} text={obj.icon}  activecolor={"#a60202"} Skew={false}/>
					)
			})}
			
		

			</div>
			<div className={`${this.props.venueType!=2?'priceform-div':''}`}>
			{(this.props.venueType==3 || this.props.venueType==1)&&
			<Seatpricing  sendPriceDetails={(data)=>this.setState({seatList:data})} sendActiveCurrency={(data)=>this.setState({activeCurrency:data})} seatData={this.state.seatList} currencyList={this.state.currencydropdown} active={this.state.activeCurrency} typedetails={this.state.pricetypedetails} />
			}
			{/*this.props.venueType==3&&this.props.seatList&&this.props.seatList.filter((obj)=>obj.add=='true').length>0&&this.props.seatList.map((objdata)=>{

				return(
				<div>{objdata.seatname}</div>
				)
			})

			
			*/}
			{/*(this.props.venueType!=3 && this.props.venueType!=2)&&
			<div className="price-in-box" style={{position:'relative'}}>
			<div className="price-text">Per {this.props.venueType=='2'?"Pax":this.state.activeobj.title}</div>
			<input onFocus={this._onFocus}
                        onBlur={this._onBlur} className="price-box" value={this.state.amt} onChange={this.changePrice} style={{height:'100%'}}/>
			<div className="dropdown-in-box"  ref={(el) => this.instance = el } style={{position:'relative'}}>
			<Popupbox sendPopupData={(data)=>this.receivePopupData(data,'priceobj')} top={this.state.top} left={this.state.left} height={this.state.height} buttonText={this.state.priceobj&&this.state.priceobj.name}  dropdown={playarray} buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>
			</div>
			</div>
			*/}
			{this.props.venueType!=2&&
			<div className="save-div">
			<button onClick={()=>this.submitPrice()} type="button" className="pricesave-button"><span className="pricesave-span">SAVE</span></button>
			</div>
			}
			</div>


{/*
			<div className="customrate-div">
			<div className="customrate-text">Custom Rate</div>
			<div className="customrate-arrow"><img src={Greyright} /></div>
			</div>
*/}

			
			</div>
			);
	}
	componentDidMount(){
		var pricetypedetails=this.state.pricetypedetails;
		if(this.props.seatList && this.props.venueType==3){
			// alert(JSON.stringify(this.props.availTypeList));
			var seatListData=JSON.parse(JSON.stringify(this.props.seatList?this.props.seatList.filter((obj)=>obj.add!='true'):[]))
			this.setState({seatList:seatListData});

			if(seatListData.length>0){
				var seatListHour=this.props.availTypeList?this.props.availTypeList:[];
				// alert(JSON.stringify(seatListHour));
				if(seatListHour.length>0){
					seatListHour.map((obj)=>{
						var findIndex=pricetypedetails.findIndex((obj2)=>obj2.id==obj);
						if(findIndex!=-1){
							pricetypedetails[findIndex].checked=true;
						}
					})
				}
				var currencyactive=seatListData[0].pricing?(seatListData[0].pricing.length>0?seatListData[0].pricing[0].currency:null):'USD';
				if(currencyactive){
					this.setState({activeCurrency:currencyactive});
				}
				this.setState({pricetypedetails});
			}
		}
		if(this.props.venueType==1){
			// alert("new venue type....");
			var pricedata=this.props.priceData;
			// alert(JSON.stringify(this.props.availTypeList));
			if(pricedata){
			var seatList=JSON.parse(JSON.stringify(this.state.seatList));
			seatList[0].pricing=[{hourCost:pricedata.hour_cost,dayCost:pricedata.day_cost,weekCost:pricedata.week_cost,monthCost:pricedata.month_cost}];
			this.setState({activeCurrency:pricedata.venue_price_currency});
			this.setState({seatList});
			}
				// var currencyactive=seatList[0].pricing?(seatList[0].pricing.length>0?seatList[0].pricing[0].currency:null):'USD';
				// if(currencyactive){
				// }
				if(this.props.availTypeList){
					pricetypedetails.map((obj1,index)=>{
						var status=this.props.availTypeList.includes(obj1.id.toString())
						if(status==true){
							obj1.checked=true;
						}else{
							obj1.checked=false;
						}
						return obj1;
					})

			
				  this.setState({pricetypedetails});
				}
		}
	}
}
