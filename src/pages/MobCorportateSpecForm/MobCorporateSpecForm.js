import React from 'react';
import FormContent from '../../components/form1/FormContent';
import Bindname from '../../components/bindname/bindname';
import Choosediv from '../../components/choosediv/choosediv';
import FormHeader from '../../components/form1/FormHeader';
import ValidationLibrary from '../../helpers/validationfunction';
import './MobCorporateSpecForm.css';
const HeaderContent=<div className="choose-text1">Please add your <span className="choose-text2">Venue</span> Details</div>;

export default class MobCoporateSpec extends React.Component {

	constructor(props) {
		super(props);
		this.state = {error:null,activeArrow:false,activeobj:props.venueSpecDetails?props.venueSpecDetails:null,specificarray:[],commonArray:[]
	}
	}
componentWillReceiveProps(props){
console.log("newprops",props);
}

	checkValidations=()=>{
		var commonArray=this.state.commonArray;
		for(var i in commonArray){
		var errorcheck=ValidationLibrary.checkValidation(commonArray[i].spec_det_datavalue1,commonArray[i].validation);
		commonArray[i].error=!errorcheck.state;
		commonArray[i].errormsg=errorcheck.msg;
		}
		var errordata=commonArray.filter((obj)=>obj.error==true);
			this.props.sendCommonDetails(this.state.commonArray);
			this.props.sendLocation(this.state.location);
		if(errordata.length!=0){
			this.setState({error:true})
			this.props.checkValidationError('specificvenue',false);
		}else{
			this.setState({error:false})
			this.props.checkValidationError('specificvenue',true);
		}
		this.setState({commonArray});
		return errordata;
	}
	saveMobCorporateForm=()=>{
		this.checkValidations();
	}
	recieveInputData=(data,text,location)=>{

		if(location){
			this.setState({location:location});
			
		}
		var activeobj=this.state.activeobj;
		var commonArray=this.state.commonArray;
		// console.log(data.spec_det_id);
		// console.log("location",location);
		var findIndex=commonArray.findIndex((obj)=>obj.spec_det_id==data.spec_det_id);
		if(findIndex!=-1){
			var errorcheck=ValidationLibrary.checkValidation(text,commonArray[findIndex].validation);
			commonArray[findIndex].spec_det_datavalue1=text;
			commonArray[findIndex].error=!errorcheck.state;
			this.setState({error:!errorcheck.state});
			commonArray[findIndex].errormsg=errorcheck.msg;
			this.setState({commonArray});
		}
		
	}
	render() {
		return (
			<div>
			<Bindname text="Corporate User - Add Venue"/>
			<Choosediv  content={HeaderContent} changeActive={(data)=>this.props.changeActive(data)} prev={1} next={2} activeArrow={this.state.activeArrow}/>
			{this.state.activeobj&&
				<div>

					<FormContent inputChange={this.recieveInputData} commonArray={this.state.commonArray}  receivetxt={(data,key)=>this.updateText(data,key)} requestLocation={this.state.location}><div class="form1-group1"><h3 class="box1-heading">Venue</h3><div class="box1-div removeBorderdiv"><input disabled readonly class="" value={this.props.categoryname}/><span></span></div></div></FormContent>
						</div>
			}

				{!this.state.activeobj&&
						<div className="errorText">Please Choose Specification</div>
				}
				{this.state.activeobj&&
					<div className='ActionsReviewBtns CorporateSpecForm'>
					<button onClick={()=>this.saveMobCorporateForm()}>SAVE</button>
					<button disabled={this.state.error==true||this.state.error==null||this.state.location.length==0} style={{opacity:(this.state.error==true||this.state.error==null||this.state.location.length==0)?0.5:1}} onClick={()=>this.props.changeActive(2)}>ADD FACILITIES</button>
					</div>
				}
			</div>
		);
	}
	componentDidMount(){
	{
			// alert("hiii");
			console.log(this.props);
		
			if(this.props.commonArray){
				this.setState({commonArray:JSON.parse(JSON.stringify(this.props.commonArray)),activeArrow:false});
			}
			if(this.props.specobj){
				// alert(this.props.specificId);
				this.setState({activeobj:JSON.parse(JSON.stringify(this.props.specobj))});
				// var obj={venue_}
			}
			if(this.props.location){
				this.setState({location:JSON.parse(JSON.stringify(this.props.location))});
			}
	}
		}
}
