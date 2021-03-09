import React from 'react';
import './popupbox-corner.css';
import Add_popup_location from '../add_popup_location/add_popup_location';


export default class PopupboxCorner extends React.Component {

constructor(props) {
  super(props);
console.log("popup-corner",props);
  this.state = {};
}

	render() {
		return (
			<div class="Popupbox-div-position-plus" style={{position:'absolute',bottom:this.props.top,left:parseInt(this.props.left)}}>
					<div class="popupbox-div-plus">
				
						<div class="Popupbox-content">
						
						<Add_popup_location receiveLocation={(data)=>this.props.receiveLocation(data)} closepopup={()=>{this.props.closepopup()}}/>

						</div>

					</div>
			</div>
		);
	}
}
