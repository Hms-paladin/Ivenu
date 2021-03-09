import React from 'react';
import ValidationLibrary from '../../helpers/validationfunction';
import './seatpricing.css';
import Popupbox from '../../components/popupbox/popupbox';
var listingtypes=['hourCost','dayCost','weekCost','monthCost'];
var playarray={value:'id',name:'name',dropdown:[{id:1,name:'USD'},{id:2,name:'INR'}]};
export default class Seatpricing extends React.Component {

	constructor(props) {
		super(props);
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
	changePricing=(data,mainindex,childkey,arraydata)=>{
		// var counter=data;

		var checkvalidation=ValidationLibrary.checkValidation(data,[{name:'allowNumaricOnly'}]);
		// console.log('checkvalidation',checkvalidation);
		if(data!=""){
		if(checkvalidation.state==false){
			data=data.replace(/[^0-9.]/g, "");
		}
	}else{
		data=0;
	}
		if(arraydata[mainindex].pricing.length>0){
			arraydata[mainindex].pricing[0][this.generatekey(childkey)]=parseInt(data);
		}else{
			arraydata[mainindex].pricing=[{'hourCost':0,dayCost:0,weekCost:0,monthCost:0,currency:this.props.active}];
			arraydata[mainindex].pricing[0][this.generatekey(childkey)]=parseInt(data);
		}
		this.props.sendPriceDetails&&this.props.sendPriceDetails(arraydata);
	}

	rendercost=(data,index)=>{
		if(index=='Hour'){
			return data.hourCost;
		}else if(index=='Day'){
			return data.dayCost;
		}else if(index=='Week'){
			return data.weekCost;
		}else{
			return data.monthCost;
		}
	}
changeActive=(data)=>{
	var arrayofdata=JSON.parse(JSON.stringify(this.props.seatData));
	if(arrayofdata.length>0){
		for(var i=0;i<arrayofdata.length;i++){
			for(var j=0;j<arrayofdata[i].pricing.length;j++){
				arrayofdata[i].pricing[j].currency=data;
			}
		}
		console.log('arrayofdata',arrayofdata);
		this.props.sendPriceDetails&&this.props.sendPriceDetails(arrayofdata);

		// this.setState({arraydata});
	}
	this.props.sendActiveCurrency(data);
	// this.setState({active:})
}
	render() {
		return (
			<div className="seatpricingdiv">
			<div className="seatpricingheader">
			{this.props.venueType==3&&
			<h4>{this.props.venueType==3?'Seat Pricing':''}</h4>
			}
			<div className="seatpricingcurrency"> Currency <div className="currencyList">
			{/*this.props.currencyList.map((obj)=>{
				return(
					<div className={`currencybox ${this.props.active==obj.name?'active':''}`} onClick={()=>this.changeActive(obj.name)}>{obj.name}</div>
				)

			})*/}
			<Popupbox height={35} sendPopupData={(data)=>this.changeActive(data.name)}  buttonText={this.props.active}   dropdown={playarray} buttonColor={'transparent'} buttonTextColor={'black'} popupColor={'white'} popupTextColor={'black'}/>

			
			
			</div>
			 </div>
			</div>
			<div className="seatpricingbody">
			{this.props.seatData.length>0&&this.props.seatData.map((obj,index)=>{
				return(
					<div className="seatpricingbodytype">
					{obj.seatname&&
			<input value={obj.seatname} readOnly />
			}
			<div className="seatpricingbodytypesub">
			{this.props.typedetails.filter((data)=>data.checked==true).length==0&&
				<div className="pricetypered">No Price Type Chosen</div>
			}
			{this.props.typedetails.filter((data)=>data.checked==true).map((objdata,key)=>{
				return(

			<div><span>{objdata.title?objdata.title:''}</span><input onChange={(e)=>this.changePricing(e.target.value,index,objdata.title,this.props.seatData)} value={obj.pricing&&obj.pricing.length>0?this.rendercost(obj.pricing[0],objdata.title):0}/></div>		
					)
			})}
			</div>
			</div>
					)

			})}
			
			</div>
			</div>
		);
	}
}
