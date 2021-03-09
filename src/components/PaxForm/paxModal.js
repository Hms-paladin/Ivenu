import React from 'react';
import { Modal, Button } from 'antd';
import CkEditorComp from '../CKEditorComp';
import { Tabs } from 'antd';
import Apilink from '../../helpers/apilink';
import ValidationLibrary from '../../helpers/validationfunction';
import {notification} from 'antd';
import DateFunctions from  '../../helpers/DateFunctions';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class PaxModal extends React.Component {

	constructor(props) {
		super(props);
		this.state={daytypes:[],currency:[{id:1,name:'USD'},{id:2,name:'INR'},{id:3,name:'Euro'}],active:'USD','paxName':'',details:'',paxMin:0,paxMax:0,uniqueId:0}
	}
	loadDaytypes=(propsData)=>{
			fetch(Apilink.apiurl+'getDayType', {
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({}),
    }).then((response)=>response.json())
		.then((responsejson)=>{
				// this.setState({daytypes:responsejson.data},function(){
					// var daytypes=this.state.daytypes;
								var currency="";
					if(responsejson.data.length>0){
						responsejson.data.map((obj)=>{
							if(propsData){
								for(var i=0;i<propsData.length;i++){
									if(propsData[i].dataObj.code==obj.day_type_code){
							currency=propsData[i].dataObj.currency;
							var currentobj={currency:propsData[i].dataObj.currency,dayType:obj.day_type,adult:propsData[i].dataObj.adult,child:propsData[i].dataObj.child,code:obj.day_type_code};
								obj.dataObj=currentobj;
								return obj;
								}
								}
							}else{
							var currentobj={currency:this.state.active,dayType:obj.day_type,adult:0,child:0,code:obj.day_type_code};
							obj.dataObj=currentobj;
							return obj;
						}
						})
						this.setState({daytypes:responsejson.data,active:currency?currency:'USD'});

					}
				// })
		})
	}
	componentWillMount(){
	
	}
handleOk=()=>{
	// var filterrecords=daytypes.filter((obj)=>{
	// 	var currentobj=obj;
	// 	return (!obj.dataObj.adult || !obj.dataObj.child );
	// })
	if(!this.state.paxName){
		notification.error({
        message:'Error',
        description:"Please Add Your Pax Name...",
        onClick:() => {
         console.log('Notification Clicked!');
       },
     })
		return;
	}
		var userId=window.localStorage['LoginData']?JSON.parse(window.localStorage['LoginData']).user_id:0;

	this.props.submitpax&&this.props.submitpax({paxName:this.state.paxName,date:this.props.fromdate,details:this.state.details,pricing:this.state.daytypes,paxMin:this.state.paxMin,paxMax:this.state.paxMax,uniqueId:(!this.state.uniqueId || this.state.uniqueId==undefined || this.state.uniqueId=='undefined')?DateFunctions.generate_uid_timestamp()+userId:this.state.uniqueId});
}
handleCancel=()=>{
	this.props.cancelpax&&this.props.cancelpax();
}
changeActive=(data)=>{
	var daytypes=this.state.daytypes;
	if(daytypes.length>0){
		daytypes.map((obj)=>{
			var currentobj=obj;
			obj.dataObj.currency=data;
			return obj;
		})
		this.setState({daytypes});
	}
	this.setState({active:data});
}
changeTextPax=(keyvalue,data)=>{
	if(keyvalue=='paxName'){
		var checkvalidation=ValidationLibrary.checkValidation(data.charAt(0),[{name:'alphabetsOnly'}]);

	if(data.charAt(0)==" " || checkvalidation.state==false){
		data=""
	}
	}else{
		console.log("paxData",data);
		var checkvalidation=ValidationLibrary.checkValidation(data,[{name:'allowNumaricOnly'}]);
		console.log('checkvalidation',checkvalidation);
		// if(checkvalidation.state==false){
		// 	data=0;
		// }

			data=data.replace(/^(-?)0+/,'').match(/[1-9]?[0-9]*/);
			if(data==""){
				data=0;
			}
		
	}
	this.setState({[keyvalue]:data});
	// this.props.seatDetails&&this.props.seatDetails({counter:this.props.activeobj.counter,seatname:data});

	// this.setState({seatname:data})
}
changeText=(text,index,keyname)=>{
	var checkvalidation=ValidationLibrary.checkValidation(text,[{name:'allowNumaricOnly'}]);
			// console.log('checkvalidation',checkvalidation);
	if(checkvalidation.state==false){
		text=text.replace(/[^0-9.]/g, "");
	}
	var daytypes=this.state.daytypes;
	daytypes[index].dataObj[keyname]=text?parseInt(text):0;
	daytypes[index].dataObj.currency=this.state.active;
	console.log('daytypes',daytypes);
	this.setState({daytypes});
}
	render() {
		return (
			<div>
			 <Modal
			 style={{ top: 20 }}
          title={this.props.title}
           className="paxmodaldivclass"
          visible={this.props.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        <div className="paxforminput">
        <div className="paxforminputbox">
        <label>Pax Name <span></span></label>
        <input value={this.state.paxName} onChange={(e)=>this.changeTextPax('paxName',e.target.value)}/>
        </div>
        <div className="paxforminputbox">
        <label>Minimum Pax <span></span></label>
        <input value={this.state.paxMin} onChange={(e)=>this.changeTextPax('paxMin',e.target.value)}/>
        </div>
        <div className="paxforminputbox">
        <label>Maximum Pax <span></span></label>
        <input value={this.state.paxMax} onChange={(e)=>this.changeTextPax('paxMax',e.target.value)}/>
        </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
    	<TabPane tab="Details" key="1">
    	<CkEditorComp moreDetails={this.state.details} sendEditorData={(data)=>this.setState({details:data})}/>
    	</TabPane>
    	<TabPane tab="Pricing" key="2">
			 <div className="paxDayTypeBox">
    	<div className="seatpricingcurrency"> Currency <div className="currencyList">
			{this.state.currency.map((obj)=>{
				return(
					<div className={`currencybox ${this.state.active==obj.name?'active':''}`} onClick={()=>this.changeActive(obj.name)}>{obj.name}</div>
				)

			})}
			
			
			</div>
			 </div>
			 {this.state.daytypes.length>0&&
			 	<>
			 <div className="paxDayType header">
			<div className="rowbox"></div>
			<div className="rowbox">Adult</div>
			<div className="rowbox">Child</div>
			 </div>
			 {this.state.daytypes.length>0&&this.state.daytypes.map((obj,index)=>{
			 	return(
			 	<div className="paxDayType">
			<div className="rowbox">{obj.day_type_name}</div>
			<div className="rowbox"><input value={obj.dataObj.adult} onChange={(e)=>this.changeText(e.target.value,index,'adult')}/></div>
			<div className="rowbox"><input value={obj.dataObj.child} onChange={(e)=>this.changeText(e.target.value,index,'child')}/></div>
			 </div>
			 )
			 })}
			 </>
			}
			 </div>
    	</TabPane>
    	</Tabs>
        </Modal>
			</div>
		);
	}
	componentDidMount(){
		if(this.props.paxedData){
			// alert(JSON.stringify(this.props.paxedData));
			var paxedData=JSON.parse(JSON.stringify(this.props.paxedData));
			this.setState({paxName:paxedData.paxName,paxMin:paxedData.paxMin,paxMax:paxedData.paxMax,details:paxedData.details,uniqueId:paxedData.uniqueId});
			this.loadDaytypes(paxedData.pricing.length>0?paxedData.pricing:null);
		}else{
			this.loadDaytypes();
		}
	}
}
