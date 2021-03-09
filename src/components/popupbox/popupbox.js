import React from 'react';
import './popupbox.css';
import { Spin } from 'antd';
// import Star from '../../starone.png';

export default class Popupbox extends React.Component {

	constructor(props) {
		super(props);
console.log(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);

		this.state = {
			popup_position:{top:0,left:0},
			open:false,
			popupVisible:false,
		};

	}

	handleClick() {

		if (!this.state.popupVisible) {
			document.addEventListener('click', this.handleOutsideClick, false);
		} else {
			document.removeEventListener('click', this.handleOutsideClick, false);
		}

		this.setState(prevState => ({
			popupVisible:!prevState.popupVisible,
		}));
	}

	handleOutsideClick(e) {

		if(this.node){
		if (this.node.contains(e.target)) {
			return;
		}
	}

		this.handleClick();
	}
	selectValue=(data)=>{
		// console.log(data);
		this.handleClick();
		// this.setState({popupVisible:false})
		if(this.props.sendPopupData){
		this.props.sendPopupData(data)
		}
	}
	receiveResponse=(data)=>{
		console.log(data);
	}
	componentWillReceiveProps(props){
		// console.log(props);
		if(props.visible){
			var checknegative=false;
		let offsetTop  = 0;
		let offsetLeft  = 0;
		let offsetWidth  = this.instance.getBoundingClientRect().width;
		let height  = this.instance.getBoundingClientRect().height;
		this.setState({popup_position:{[checknegative==true?'bottom':'top']:(this.props.height?this.props.height:offsetTop+height),left:this.props.left?0:offsetLeft,minWidth:offsetWidth }});
		if(this.props.dropdown){
			// this.handleClick(this.props.vis);
			if(props.visible=="empty"){
				document.removeEventListener('click', this.handleOutsideClick, false);
			}else{
				document.addEventListener('click', this.handleOutsideClick, false);
			}
			this.setState({popupVisible:props.visible=="empty"?false:true});
		}
		}
	}
	toggleFunction=(e)=>{
		var checknegative=(window.innerHeight/2)-e.currentTarget.getBoundingClientRect().top<0;
		console.log(checknegative);
			console.log(e.currentTarget.getBoundingClientRect().top);
		let offsetTop  = (this.props.top?this.props.top:e.currentTarget.offsetTop);
		let offsetLeft  = e.currentTarget.offsetLeft;
		let offsetWidth  = this.instance.getBoundingClientRect().width;
		let height  = this.instance.getBoundingClientRect().height;
		this.setState({popup_position:{[checknegative==true?'bottom':'top']:(this.props.height?this.props.height:offsetTop+height),left:this.props.left?0:offsetLeft,minWidth:offsetWidth }});
		if(this.props.dropdown){
			this.handleClick();
		}
		
	}


	render() {
		// console.log(this.state);
		return (
			<div className="popupboxmain" style={{position:'relative'}}>
			{!this.props.input&&
			<button disabled={this.props.disabled&&this.props.disabled} ref={(el) => this.instance = el } className="dropdown-btn" style={{backgroundColor:this.props.buttonColor,color:this.props.buttonTextColor,fontWeight:this.props.bold?'bold':'normal',minWidth:this.props.buttonText==""?this.props.width:null,height:this.props.height?this.props.height:null}} onClick={(e)=>this.toggleFunction(e)}><span>{this.props.buttonText}</span>{!this.props.noarrow&&
			<i class="fa fa-angle-down down-arrow-i popupbox-icon" aria-hidden="true" style={{display:this.props.display}}></i>}</button>
			}
			{this.props.input&&
				<input value={this.props.inputvalue&&this.props.inputvalue}  ref={(el) => this.instance = el } className="dropdown-btn" style={{backgroundColor:this.props.buttonColor,color:this.props.buttonTextColor,width:this.props.width,height:this.props.height?this.props.height:null}} onChange={(e)=>this.props.changepopupText&&this.props.changepopupText(e.target.value,e)}/>
			}
			<div className="popupboxmulitpleitmes">
			{this.props.multipleitems&&this.props.multipleitems.dropdown.map((obj)=>{
		return(

	<div className="popup-text-toggle">
					<span className="remove-name">{obj[this.props.multipleitems.name]}</span>
					<span className="remove-icon-close"><i class="fa fa-times"aria-hidden="true" onClick={()=>this.props.removeItems&&this.props.removeItems(obj)}></i></span>
				</div>
		)

			})

		
			}
			</div>


			
			<div class="Popupbox-div-position" style={this.state.popup_position}>



			<div class="popupbox-div" ref={node => { this.node = node; }}>
			
			{this.state.popupVisible && 
				<ul class="dropdown-popup-ul" >
				{this.props.loading==true&& 
				<div className="loadercss"><Spin/></div>
			}
				{this.props.dropdown&&this.props.dropdown.dropdown&&this.props.dropdown.dropdown.length>0&&this.props.dropdown.dropdown.map((obj,key)=>{
					return(
						<li onClick={()=>this.selectValue(obj)} className={`${key==this.props.dropdown.dropdown.length-1?'li-border-remove':''}`}>{obj[this.props.dropdown.name]}</li>
						)
				})}
				</ul>
			}

			</div>
			


			</div>
			<span class="error">{this.props.error&&this.props.errormsg}</span>
			</div>
			);
	}
}
