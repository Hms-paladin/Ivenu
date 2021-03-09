import React from 'react';
import './SlotBox.css';
export default class SlotBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={()=>this.props.SelectedSlot&&this.props.SelectedSlot()} className='SlotBoxMain' style={{backgroundColor:this.props.selected?this.props.selctedBoxColor:'',border:`1px solid ${this.props.selected?this.props.textselectedColor:'transparent'}`}}>
				<label style={{color:this.props.selected?this.props.textselectedColor:''}}>{this.props.children}</label>
			</div>
		);
	}
}
