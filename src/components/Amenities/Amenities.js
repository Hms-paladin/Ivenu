import React from 'react';
import Specific from '../specific-venue/specific-venue';
import FormHeader from '../form1/FormHeader';
import FormContent from '../form1/FormContent';
import Form1 from '../form1/form1';
import Bindname from '../bindname/bindname';
import Choosediv from '../choosediv/choosediv';
import Paginationview from '../pagination/pagination';
import Checkboxform from '../checkbox-form/checkbox-form';
import { Modal, Button } from 'antd';
import './Amenities.css';
import Img1 from '../../images/b3.png';
// import Img2 from '../../images/b2.png';
// import Img3 from '../../images/b3.png';
import Plus from '../../images/+.png';

import Apilink from '../../helpers/apilink';

import { BounceLoader } from 'react-spinners';
var duplicateArray=[{id:1,dummy:true},{id:2,dummy:true}]
const HeaderContent=<div className="choose-text1">Please add the <span className="choose-text2">Amenities</span></div>;
export default class Amenities extends React.Component {

	constructor(props) {
		super(props);
		// console.log(props);
		this.state = {amentiesVisisble:false,activeArrow:false,loading:true,length:true,amenactiveobj:null,saveinfo:'',AmenitiesArray:[],listArray:[],selectedIndex:-1};

	}
	componentWillReceiveProps(props){
		console.log(props);
	}
	specificvenue=(data,key)=>{
		console.log(data);
		var listarray=this.state.selectedIndex!=-1?(this.state.AmenitiesArray.length>0?(this.state.AmenitiesArray[key].amenetiesList?this.state.AmenitiesArray[key].amenetiesList:[]):[]):(data.amenetiesList?data.amenetiesList:[])
		this.setState({listArray:JSON.parse(JSON.stringify(listarray)),loading:true});
		var self=this;
		setTimeout(()=>{

		self.setState({selectedIndex:key,loading:false})
	},500);
		this.setState({activeobj:data});
		this.setState({amentiesVisisble:true});
		this.props.venuespecCallback(data);
	}

	clearAmenetiesObj=()=>{
		this.setState({amentiesVisisble:false});
		this.setState({listArray:[]});
		this.setState({activeobj:null});
		this.setState({selectedIndex:-1})
	}
	loadAmeneties(data){

		fetch(Apilink.apiurl+'list_amenities/', {
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json',
			},
			body:JSON.stringify({"venue_spec_id":data}),
		}).then((response)=>response.json())
		.then((responseJson)=>{
			if(responseJson.data.length==0){
				this.setState({length:false,loading:false})
			}
			if(this.props.AmentiesArrayprop){
				console.log("AmentiesArrayprop",this.props.AmentiesArrayprop);
				// alert("coming");
				// this.setState({AmenitiesArray:this.props.AmentiesArrayprop,activeArrow:true})
				for(var i in responseJson.data){
					var findindex=this.props.AmentiesArrayprop.findIndex((obj)=>obj.amenities_id==responseJson.data[i].amenities_id);
					if(findindex!=-1){
						responseJson.data[i].amenetiesList=this.props.AmentiesArrayprop[findindex].amenetiesList;
						for(var j in responseJson.data[i].amenities_array){
							var findnewIndex=this.props.AmentiesArrayprop[findindex].amenities_array.findIndex((obj)=>obj.amenities_det_id==responseJson.data[i].amenities_array[j].amenities_det_id);
							if(findnewIndex!=-1){
								responseJson.data[i].amenities_array[j]=this.props.AmentiesArrayprop[findindex].amenities_array[findnewIndex];
								//checking the subameneties in the ameneties list start.
							var anotherIndex=this.props.AmentiesArrayprop[findindex].amenetiesList?this.props.AmentiesArrayprop[findindex].amenetiesList.findIndex((obj)=>obj.venue_amnts_id==responseJson.data[i].amenities_array[j].amenities_det_id):-1;
							if(anotherIndex!=-1){
								//already checked subamenities make it visible 
								responseJson.data[i].amenities_array[j].data={visible:true}
							}else{
								responseJson.data[i].amenities_array[j].data=null;	
							}
							//checking the subameneties in the ameneties list end.
							}else{
								responseJson.data[i].amenities_array[j].data=null;
							}
						}
						// responseJson.data[i].amenities_array.map((obj)=>);
					}
				}
				console.log("responseJson",responseJson.data);
				this.setState({AmenitiesArray:responseJson.data});
				if(this.props.activeobj){
				var findIndex=this.props.AmentiesArrayprop.findIndex((obj)=>obj.amenities_id==this.props.activeobj.amenities_id);
				// alert(JSON.stringify(this.props.AmentiesArrayprop[findIndex].amenetiesList));
				this.setState({selectedIndex:findIndex});
				this.setState({listArray:this.props.AmentiesArrayprop[findIndex].amenetiesList})
				}
				this.setState({loading:false});
			}else{
				this.setState({AmenitiesArray:responseJson.data.concat(duplicateArray),loading:false});
			}
		})
	}
	addAmeneties=()=>{
		var AmenitiesArray=this.state.AmenitiesArray;
		var findindex=AmenitiesArray.findIndex((obj)=>obj.amenities_id==this.props.activeobj.amenities_id);
		if(findindex!=-1){
			
		AmenitiesArray[findindex].amenetiesList=this.state.listArray;
		}
			for(var i in AmenitiesArray[findindex].amenities_array){
				var index=-1;
				for(var j in this.state.listArray){
					console.log(parseInt(this.state.listArray[j].venue_amnts_id) +"=="+parseInt(AmenitiesArray[findindex].amenities_array[i].amenities_det_id))
					if(parseInt(this.state.listArray[j].venue_amnts_id)==parseInt(AmenitiesArray[findindex].amenities_array[i].amenities_det_id)){
						AmenitiesArray[findindex].amenities_array[i].amenities_det_datatype1=this.state.listArray[j].venue_amnts_det_datatype1;
						if(this.state.listArray[j].venue_amnts_det_datatype1!='dropdown'){

						AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalue1=this.state.listArray[j].venue_amnts_det_datavalue1;
						}else{
							AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalued1=this.state.listArray[j].venue_amnts_det_datavalue1;
						}
						AmenitiesArray[findindex].amenities_array[i].amenities_det_datatype2=this.state.listArray[j].venue_amnts_det_datatype2;
						if(this.state.listArray[j].venue_amnts_det_datatype2!='dropdown'){
							
						AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalue2=this.state.listArray[j].venue_amnts_det_datavalue2;
						}else{
							AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalued2=this.state.listArray[j].venue_amnts_det_datavalue2;
						}
						
						AmenitiesArray[findindex].amenities_array[i].amenities_det_datatype3=this.state.listArray[j].venue_amnts_det_datatype3;
							if(this.state.listArray[j].venue_amnts_det_datatype3!='dropdown'){
							
						AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalue3=this.state.listArray[j].venue_amnts_det_datavalue3;
						}else{
							AmenitiesArray[findindex].amenities_array[i].amenities_det_datavalued3=this.state.listArray[j].venue_amnts_det_datavalue3;
						}
					
						index=j;
						j=99999;
					}	
				}
				
				if(index!=-1){
					AmenitiesArray[findindex].amenities_array[i].data={visible:this.state.listArray[index].data.visible};
				}else{
					AmenitiesArray[findindex].amenities_array[i].data=null;
				}
			}
			this.setState({amentiesVisisble:false});
		this.setState({AmenitiesArray});
			this.props.AmenetiesArray(AmenitiesArray);
			this.props.checkValidationError('amenities',true);
	}
	saveData=()=>{
		console.log("sava data",this.state);
	// this.setState({saveinfo:this.props.receivetxt})
	// console.log("saveinfo",this.props.receivetxt);
}
updateText=(data,key)=>{
	this.setState({[key]:data});
	console.log("data",data);
}
amentiesList=(data,key)=>{
	var AmenitiesArray=this.state.AmenitiesArray;
	// if(data.currentCheckbox){
	// 	// AmenitiesArray[this.state.selectedIndex].amenities_array[key]=data.currentCheckbox;
	// 	// console.log('AmenitiesArray',AmenitiesArray);
	// 	// this.setState({AmenitiesArray});
	// }
	if(data.currentCheckbox.amenities_det_datatype1=='dropdown'){
		data.currentCheckbox.amenities_det_datavalued1=data.currentCheckbox.amenities_det_datavalued1?data.currentCheckbox.amenities_det_datavalued1:data.currentCheckbox.amenities_det_datavalue1.split(',')[0]
	}else if(data.currentCheckbox.amenities_det_datatype2=='dropdown'){
		data.currentCheckbox.amenities_det_datavalued2=data.currentCheckbox.amenities_det_datavalued2?data.currentCheckbox.amenities_det_datavalued2:data.currentCheckbox.amenities_det_datavalue2.split(',')[0]
	}else if(data.currentCheckbox.amenities_det_datatype3=='dropdown'){
		data.currentCheckbox.amenities_det_datavalued3=data.currentCheckbox.amenities_det_datavalued3?data.currentCheckbox.amenities_det_datavalued3:data.currentCheckbox.amenities_det_datavalue3.split(',')[0]
	}
var listArray=JSON.parse(JSON.stringify(this.state.listArray));
	// var listArray=this.state.listArray;
	var obj={ "venue_amnts_id":data.id,
	"venue_amnts_det_datatype1":data.currentCheckbox.amenities_det_datatype1,
	"venue_amnts_det_datavalue1":data.currentCheckbox.amenities_det_datavalued1?data.currentCheckbox.amenities_det_datavalued1:data.currentCheckbox.amenities_det_datavalue1,
	"venue_amnts_det_datatype2":data.currentCheckbox.amenities_det_datatype2,
	"venue_amnts_det_datavalue2":data.currentCheckbox.amenities_det_datavalued2?data.currentCheckbox.amenities_det_datavalued2:data.currentCheckbox.amenities_det_datavalue2,
	"venue_amnts_det_datatype3":data.currentCheckbox.amenities_det_datatype3,
	"venue_amnts_det_datavalue3":data.currentCheckbox.amenities_det_datavalued3?data.currentCheckbox.amenities_det_datavalued3:data.currentCheckbox.amenities_det_datavalue3
}
console.log(obj);

obj.data={visible:data.visible,currentCheckbox:JSON.parse(JSON.stringify(data.currentCheckbox))};
var findindex=listArray.findIndex((obj)=>obj.venue_amnts_id==data.id);
// console.log(data);
// debugger;
if(findindex!=-1){
	if(data.visible==false){
		listArray.splice(findindex,1);
	}else{
		listArray[findindex]=obj;
	}
}else{
	listArray.push(obj);
}

console.log("listamn",data);
console.log("listfindIndex",findindex);
console.log("listarray",listArray);
this.setState({listArray});  
}
render() {

	var paginate=window.innerWidth>767?2:2.5;

	console.log(this.state);
	return (
		<div className="Ameneties amenities-main-div">
		<Bindname text="Amenities"/>
		<Choosediv  content={HeaderContent} changeActive={(data,action)=>this.props.changeActive(data,action)} prev={paginate} next={4} activeArrow={this.state.activeArrow}/>

		{this.state.loading==true &&
			<div className='sweet-loading'>
			<BounceLoader
			sizeUnit={"px"}
			size={75}
			color={'#24479D'}
			loading={this.state.loading}
			/>
			<div className="sweet-loading_text">Loading...</div>
			</div> 
		}
		{(!this.state.loading && this.state.length) &&
			<div>
			<div className="main-div">
			
			{this.state.AmenitiesArray.length>0 && this.state.AmenitiesArray.map((obj,key)=>{
				return(
					<Specific dummy={obj.dummy} countactive={obj.amenetiesList&&obj.amenetiesList.length>0&&obj.amenetiesList.length} width="100px" height="100px" filter="brightness(100)" undertext={obj.amenities_name} specificvenue={()=>this.specificvenue(obj,key)} text={img(obj.amenities_icon)} active={(this.props.activeobj&&this.props.activeobj.amenities_id==obj.amenities_id)} activecolor={"#a60202"} Skew={true}/>
					)
			})}
			

			</div>
			{this.props.activeobj&&
				<div className="checkform-div">
				<div className="checkform-heading">
				<p className="form-text1">Please choose the related Amenities</p>

				</div>

				<button type="button" onClick={()=>this.addAmeneties()} className="checksave-button"><span className="checksave-span">SAVE</span></button>

				</div>
			}
			{window.innerWidth<768&&
				<Modal
				footer={null}
				onCancel={()=>this.clearAmenetiesObj()}
				wrapClassName="flexendAmenties"
				visible={this.state.amentiesVisisble}
				>
				<div className="amenitiesProfile">
				<div style={{borderRadius:'50%'}}>
				<Specific active={true}  width="100%" height="100%" filter="brightness(100)"   text={img(this.state.selectedIndex!=-1&&this.state.AmenitiesArray[this.state.selectedIndex].amenities_icon)} activecolor={"#a60202"} />
				</div>
				<span className="amentiesName">{this.state.activeobj&&this.state.activeobj.amenities_name}</span>
				</div>
				{this.state.loading==true &&
			<div className='sweet-loading'>
			<BounceLoader
			sizeUnit={"px"}
			size={75}
			color={'#24479D'}
			loading={this.state.loading}
			/>
			<div className="sweet-loading_text">Loading...</div>
			</div> 
		}
				{this.state.selectedIndex!=-1&&
					this.state.AmenitiesArray[this.state.selectedIndex].amenities_array&&this.state.AmenitiesArray[this.state.selectedIndex].amenities_array.map((obj,key)=>{
						return(
							<Checkboxform editobj={obj.data?obj.data:null} checkboxdata={(data)=>this.amentiesList(data,key)} keydata={key}  currentCheckbox={obj}/>
							)
					})
				}
				<div className="amenitiesBtn">
				<button  onClick={()=>this.addAmeneties()} >Add to Ameneties</button>
				</div>
				</Modal>
			}
			{window.innerWidth>767&&
				this.state.selectedIndex!=-1&&
				this.state.AmenitiesArray[this.state.selectedIndex].amenities_array&&this.state.AmenitiesArray[this.state.selectedIndex].amenities_array.map((obj,key)=>{
					return(
						<Checkboxform editobj={obj.data?obj.data:null} checkboxdata={(data)=>this.amentiesList(data,key)} keydata={key}  currentCheckbox={obj}/>
						)
				})

			}
			
			</div>
		}
		{!this.state.length && 
			<div className="errorText"> Please select Venue Category</div>
		}
		{!this.state.loading&&this.state.activeobj&&this.state.activeobj.amenities_array.length==0&&
			<div className="errorText"> No Details are available</div>
			}
		</div>
		);
}
componentDidMount=()=>{
	console.log(this.props);
	if(this.props.venueSpecId){
		this.loadAmeneties(this.props.venueSpecId);
	}else{
		this.setState({loading:false,length:false});
	}

}
}
const img = (image) =>((<img src={image} alt="" width="60px" height="60px"/>));