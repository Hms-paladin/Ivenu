import React from 'react';
import './form1.css';
import plus from '../../images/+.png';
import { Modal, Button } from 'antd';
import MapView from './Mapview';
import MapviewComp from'../MapviewComp';
import ValidationLibrary from '../../helpers/validationfunction';
import PopupboxCorner from '../../components/popupbox-corner/popupbox-corner';
import links from '../../helpers/apilink';
export default class FormContent extends React.Component {


	constructor(props) {
		super(props);
		console.log(props);
		this.state={
			coords:{latitude:0,longitude:0},
			lat:0,
			lng:0,
			 visible:false,popupvisible:false,left:'',top:'',height:'',width:'',loationobj:null,
			 address:'',
			 formArray:props.formArray,
			 requestLocation:props.requestLocation,
			 
		}
	}
	 setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }
  toggle() {
    this.setState(prevState => ({
      modal:!prevState.modal
    }));
  }
  receiveaddr=(data,location)=>{
  	console.log(data);
    this.setState({address:data});
    // this.props.receivetxt(data,'address');
    var obj={};
    obj.spec_det_id='idname2';
    this.props.inputChange(obj,data,location);
//     var facilityDetails=this.state.facilityDetails;
//     facilityDetails.address=data;
// this.setState({facilityDetails})
  }
	
	showModal = () => {
    this.setState({
      visible:true,
    });
  };
  showPopup=(e,data)=>{
  	// alert(e.currentTarget.scrollHeight);
  	this.setState({top:(window.innerHeight-e.currentTarget.offsetTop)-e.currentTarget.clientHeight-60,left:e.currentTarget.offsetLeft+e.currentTarget.clientWidth+12,height:null,width:e.currentTarget.clientWidth})
  	// console.log(e.currentTarget.offsetLeft);
  	// console.log(e.currentTarget.offsetTop);
  	// console.log(e.currentTarget.clientHeight);
  	console.log(e.currentTarget.clientWidth);
  	 this.setState({popupvisible:true});
  	 this.setState({loationobj:data});
  }
  clospopup=()=>{
  	this.setState({popupvisible:false})
  }
   handleOk = e => {
    console.log(e);
    this.setState({
      visible:false,
    });
  };
handleChange=(e)=>{
  this.setState({ [e.target.name]:e.target.value });
  console.log("change data",e.target.value);
  this.props.receivetxt(e.target.value,e.target.name);
}
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible:false,
    });
  };
  renderDynForm=(obj)=>{
  	// console.log(obj);
  	if(obj.spec_det_datatype1=='text'){
  		return(
			<div className="form1-group1">
			<h3 className="box1-heading">{obj.spec_det_name}</h3>
			<div className={`box1-div ${obj.removeBorder?'removeBorderdiv':null}`}>
			<input readOnly={obj.readonly ? obj.readonly:false} className="" value={obj.spec_det_datavalue1} onChange={(e)=>this.props.inputChange(obj,e.target.value)} />
			<span>{obj.error&&obj.errormsg}</span>
			</div>
			</div>
			)
			
  	} else 	if(obj.spec_det_datatype1=='number'){
  		return(
			<div className="form1-group1">
			<h3 className="box1-heading">{obj.spec_det_name}</h3>
				<div className="box1-div">
			<input min="0" type="number" className="box1-text form1-box1-number" value={obj.spec_det_datavalue1}  onChange={(e)=>this.props.inputChange(obj,e.target.value)} /> 
			<span>{obj.error&&obj.errormsg}</span>
			</div>
			</div>
			)
			
  	}else 	if(obj.spec_det_datatype1=='textarea'){
  		return(
			<div className="form1-group1">
			<h3 className="box1-heading">{obj.spec_det_name}</h3>
			<div className="box1-div">
			<textarea className="box1-text" value={obj.spec_det_datavalue1}  onChange={(e)=>this.props.inputChange(obj,e.target.value)}/>
			<span>{obj.error&&obj.errormsg}</span> 
			</div>
			</div>
			)
			
  	}else 	if(obj.spec_det_datatype1=='btn_address'){
  		return(
			<div className="form1-group1">
			<h3 className="box1-heading">{obj.spec_det_name}</h3>
			<div className="box1-div box1-text-location">
			<input className="" value={obj.spec_det_datavalue1} onChange={(e)=>this.props.inputChange(obj,e.target.value)} />
			<span>{obj.error&&obj.errormsg}</span>
			 <div className="location_txt" onClick={this.showModal} >Location Map</div>
			</div> 
			</div>
			)
			
  	}else if(obj.spec_det_datatype1=='btn_plus'){
  		return(
			<div className="form1-group1">
			<h3 className="box1-heading">{obj.spec_det_name}</h3>
			<div className="box1-div box1-text-location">
			<div>
			<input className="" value={obj.spec_det_datavalue1} onChange={(e)=>this.props.inputChange(obj,e.target.value)} readOnly={obj.readonly ? obj.readonly:false}/>
			<div ref={(el) => this.instance = el }  className="plus-button" onClick={(data)=>this.showPopup(data,obj)} ><img src={plus} /></div></div>
			<span>{obj.error&&obj.errormsg}</span>
			</div>  
			</div>
			)
			
  	}
  }
componentWillReceiveProps(props){
	// console.log(props)
	if(props.formArray){
		this.setState({formArray:props.formArray});

	}
   this.setState({requestLocation:props.requestLocation});
}
receivelocation=(data)=>{

	console.log("final data",data.length);
	var lengthdata=data.length;
	if(lengthdata>0){
		var citylist=data.map((obj)=>obj.name).join(',');
		this.props.inputChange(this.state.loationobj,citylist,data)
	}else{
	this.props.inputChange(this.state.loationobj,'',[])
}
}
	render() {
		return (
			<div className="form-maindiv">
			
			<div className="form1-text">
			{this.props.children}
			{this.props.commonArray.map((obj)=>{
				return this.renderDynForm(obj)
			})
				}
				{this.props.formArray&&this.props.formArray.length>0&&this.props.formArray.map((obj)=>{
				return this.renderDynForm(obj)
			})}
			


			</div>
			{this.state.visible==true&&
			<Modal
			 className="GoogleMapModal"
			toggle={this.toggle}
          title="Get Location"
          visible={this.state.visible}
          onOk={this.handleOk}
           onCancel={this.handleCancel}
        >   
                <MapviewComp receiveaddr={(data,location)=>this.receiveaddr(data,location)} APIKEY={links.GLINK} search coords={this.props.commonArray?(this.props.commonArray[1].spec_det_datavalue2!=""?{latitude:this.props.commonArray[1].spec_det_datavalue2.split(',')[0],longitude:this.props.commonArray[1].spec_det_datavalue2.split(',')[1]}:this.state.coords):this.state.coords} latlng={(data) => console.log('latlng',data)} sendSearchedData={(data)=>console.log("searchedAddress",data)}/>
        </Modal>
        }  
        {this.state.popupvisible == true && 
  <div className="popupboxFixedcorner">
  <div className="positionBackdrop"></div>
  <PopupboxCorner receiveLocation={(data)=>this.receivelocation(data)} visible={this.state.popupvisible} top={this.state.top} left={this.state.left} height={this.state.height} closepopup={()=>{this.setState({popupvisible:false})}} requestLocation={this.state.requestLocation} />
 
</div>
}
			</div>
			);
	}
	componentDidMount(){
		navigator.geolocation.getCurrentPosition(position => {
			this.setState({coords:{latitude:position.coords.latitude,longitude:position.coords.longitude}});
			// alert(position.coords.latitude);
		})
		//console.log(this.instance.getBoundingClientRect());	
	}

}
