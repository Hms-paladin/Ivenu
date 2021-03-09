import React, {Component} from 'react';
import '../../pages/header/header.css';
import logo from '../../images/logo.png';
import search from '../../images/Search.png';
import menu from '../../images/menu.png';
import { Input } from 'antd';



class Header extends Component
{
	constructor(props) {
	  super(props);
	
	  this.state = {};


	}

	render()
	{
		return(

			<div className="Webpage_List-My-Venue-Open row">
			 <div className="in-header">
			 	<div className="part1">
				<div className="logo-div"><img src={logo} className="pic"/></div>
				<div className="drop-div">{this.props.children}</div>
				</div>
				<div className="part2">
				<div className="Add-Your-Venue">Add Your <span className="text-style-1">Venue</span></div>
				<div className="icon-div">
				<div className="search-div"><img className="search-lence" src={search}/></div>
				<div className="menu-div"> <img className="menu-icon" src={menu}/> </div>

				</div>
			</div>
			</div>
			
			</div>



			)
	}
}
export default Header;