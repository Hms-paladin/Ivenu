import React from 'react';
import './choosediv.css';
import left from '../../images/left.png';
import right from '../../images/right.png';
export default class Choosediv extends React.Component {
	// static propTypes = {
	// 	name:React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		this.state = {
			prev:this.props.prev,
			next:this.props.next,
			activeArrow:this.props.activeArrow?this.props.activeArrow:false

		};
	}

	ClickArrow=(data)=>{

		if(data=='prev'){this.props.changeActive(this.state.prev,'prev')}
	    if(data=='next'){this.props.changeActive(this.state.next,'next')}
		}
	componentWillReceiveProps(props){
		this.setState({activeArrow:props.activeArrow})
		console.log(props)
	}

	render() {
		return (
			<div className="main-choosediv">
			<div className="choosediv-sub">
			<div className="left-div" onClick={()=>this.ClickArrow('prev')}><img src={left} alt="left" /></div>
			{this.props.content}
			
			<div className="right-div"  onClick={()=>this.ClickArrow('next')}><img className={this.state.activeArrow==true?"arrowOrange":""} src={right} alt="right"/></div>
			</div>
			</div>
			);
	}
}
