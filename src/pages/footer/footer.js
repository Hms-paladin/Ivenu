import React from 'react';
import './footer.css';
import logo from '../../images/footer-logo.png';
import 'bootstrap/dist/css/bootstrap.css';


export default class Footer extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer-div">
				<div className="footer-text">	
					<ul className="footer-quicklinks-ul">
						<li className="footer-quicklinks-bold">Quick Links:</li>
						<li className="">About us</li>
						<li className="">About Product</li>
						<li className="">Management</li>
						<li className="">Offers</li>
						<li className="">Earn to Learn</li>
						<li className="">Learn to Earn</li>
						<li className="">Contact</li>
					</ul>	
				</div>

				<div className="footer-content-div">

				<div className="footer-sec-div">

				<div className="row footer-padding">

				<div className="col-md-2 footer-logo footer-media-logo">
				<img src={logo} alt="Logo" />
				</div>

				<div className="col-md-10 footer-media-content">
				<div className="footer-main-div">
					<div className="footer-content">
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and scrambled it to make a type specimen book.
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</p>
					</div>
				<div className="footer-padding">			
					<ul className="footer-icon-ul">						
						<li className="footer-icon"><span>1</span></li>
						<li className="footer-icon"><span>2</span></li>
						<li className="footer-icon"><span>3</span></li>
						<li className="footer-icon"><span>4</span></li>
					</ul>
				</div>

				</div>
				
				<div className="footer-padding footer-copyright">
					<span>Ⓒ 2019 iVNEU All rights reserved</span>
				</div>
				</div>


				<div></div>
					
				</div>
					
				</div>
					
				</div>

			</div>

			);
	}
}


