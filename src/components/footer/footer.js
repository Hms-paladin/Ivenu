import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import './footer.css';
import logo from '../../images/footer-logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import facebook from '../../images/facebook.svg';
import chat from '../../images/quora.png';
import twitter from '../../images/twitter.svg';
import linkedin from '../../images/linkedin.png';
import ping from '../../images/ping.svg';
import insta from '../../images/insta.png';
import CancellationPolicy from '../../components/cancellationpolicy';
import PrivacyPolicy from '../../components/privacypolicy';

export default class Footer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state={right:false,privacy:false}
	}

	render() {
		return (
			<div className="footer-div">
			 <Drawer anchor="right" open={this.state.right} onClose={()=>this.setState({right:false})}>
			 <div className="cancallationPolicyDiv">
			 <div onClick={()=>this.setState({right:false})} className="closeAnimationDrawer"><i class="fa fa-times" aria-hidden="true"></i></div>
			 {this.state.privacy==true&&
			 	<PrivacyPolicy/>
			 }
			 {this.state.privacy==false&&
			 	<CancellationPolicy/>
			 }
			 </div>
      </Drawer>
				<div className="footer-text">	
					<ul className="footer-quicklinks-ul">
					<li className="footer-quicklinks-bold">Quick Links:</li>
						{/*
						<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/about-us/">About us</a></li>
						<li className="footer-quiclinks-light">About Product</li>
						<li className="footer-quiclinks-light">Management</li>
						<li className="footer-quiclinks-light">Offers</li>
						<li className="footer-quiclinks-light">Earn to Learn</li>
						<li className="footer-quiclinks-light">Learn to Earn</li>
						<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/contact-us/">Contact</a></li>*/}
							<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/about-us/">About us</a></li>
								{/*<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" >FAQs</a></li>*/}
								<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/blog/">Blog</a></li><li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/help-center/">Help Center</a></li>
								<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" onClick={()=>this.setState({right:true,privacy:true})}>Privacy Policy</a></li>	
								<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" onClick={()=>this.setState({right:true,privacy:false})}>Cancellation Policy</a></li>
								<li className="footer-quiclinks-light"><a className="footer-quiclinks-light" target="_blank" href="https://ivneu.in/contact-us/">Contact Us</a></li>

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
							iVNEU is a universal platform to assist you to find the perfect venue for your events. As your committed venue services provider, we have executed the idea of making venue finding and booking as simple as it can get. We value your event and understand your struggle to find a quintessential venue that you cherish, thereby we thrive and work every day to ensure that all your demands are met efficiently and you are satisfied!
						</p>
					</div>
				<div className="footer-padding">			
					<ul className="footer-icon-ul">						
						<li className="footer-icon"><a target="_blank" href="https://www.facebook.com/ivneu"><span><img src={facebook} alt="Facebook" /></span></a></li>
						<li className="footer-icon customlogoicon"><a target="_blank" href="https://www.quora.com/profile/IVNEU"><span><img src={chat} alt="Chat" /></span></a></li>
						<li className="footer-icon"><a target="_blank" href="https://twitter.com/i_vneu"><span><img src={twitter} alt="Twitter" /></span></a></li>
						<li className="footer-icon customlogoicon"><a target="_blank" href="https://www.linkedin.com/company/ivneu/"><span><img src={linkedin} alt="IN" /></span></a></li>
						<li className="footer-icon customlogoicon"><a target="_blank" href="https://www.instagram.com/ivneuofficial/"><span><img src={insta} alt="I" /></span></a></li>
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


