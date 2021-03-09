import React from 'react';
import '../popupbox-corner/popupbox-corner.css';


export default class SearchboxCorner extends React.Component {

constructor(props) {
  super(props);
console.log("popup-corner",props);
  this.state = {};
}

	render() {
		return (
			<div class="Popupbox-div-position-plus" style={{position:'absolute',top:this.props.top?this.props.top:0,right:0}}>
					<div class="popupbox-div-plus">
				
						<div class="Popupbox-content">
						
							{this.props.children}

						</div>

					</div>
			</div>
		);
	}
}
