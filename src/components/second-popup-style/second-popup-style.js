import React from 'react';
import Upload_popup from '../../components/upload_popup/upload_popup';
import plus from '../../images/circleplus.png';
import './second-popup-style.css';

export default class Second_popup_style extends React.Component {
	

	constructor(props){
		super(props);
		this.state={popup_position:{top:0,left:0},open:false}

	}
	toggleFunction=(e)=>{
		console.log(e)
		let offsetTop  = this.instance3.getBoundingClientRect().top;
		let offsetLeft  = this.instance3.getBoundingClientRect().left;
		let offsetWidth  = this.instance3.getBoundingClientRect().width;
		let height  = this.instance3.getBoundingClientRect().height;
		this.setState({popup_position:{top:75,left:offsetLeft,width:offsetWidth }});
		this.setState({open:true});
	}

toggleCancel=(data)=>{
	this.setState({open:data});
}

	render() {
		return (
			<div>

			<div className='PhotoPicFlex'><label className="information-icon plusinformationicon" ref={(el) => this.instance3 = el } onClick={this.props.sendUploadClick&&this.props.sendUploadClick}><img src={plus}/></label><label className="upload-text">Upload Photos</label><label className="information-icon" ref={(el) => this.instance3 = el } onClick={this.toggleFunction}><i class="fa fa-info" onClick={this.toggleCancel} aria-hidden="true"></i></label></div>
			
			{this.state.open&&
				
				<Upload_popup toggleCancel={this.state.open} closepop={this.toggleCancel} position={this.state.popup_position}/> 	
				
			} 

			</div>
		);
	}
}
