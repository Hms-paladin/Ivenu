import React from 'react';
import './IndividualMostPopular.css';
import Sports from '../../images/birthdayImg1.png';
import right_icon from '../../images/right.png';
var ellipsisText = function (e, etc) {
    var wordArray = e.innerHTML.split(" ");
    while (e.scrollHeight > e.offsetHeight) {
        wordArray.pop();
        e.innerHTML = wordArray.join(" ") + (etc || "...");
    }
};
export default class IndividualMostPopular extends React.Component {
	
	render() {
		return (
			<div>

			<div className="corporate_venue_width">
				
					<div className="corporate_venue_header">Most Popular Corporate Venues</div>

					<div className="corporate_venue_flex">
						
					<div className="corporate_venue_image">

						<img className="img-responsive" src={Sports} alt="Sports" />
						
					</div>


					<div className="corporate_venue_Paragraph" >

					<div className="corporate_venue_Paragraph_heading">

					<span>Delhi Development Authority (DDA) Sports</span>

					</div>


					<div className="corporate_venue_Paragraph_content"> 
					<span className="block-with-text">
					An academy iS when a club/association keeps a collection of players within an age
					group as opposed to placing them on individual teams The acacemy is a concept
					that is based on the professional soccer club systems from around the world. An
					academy is when a club/association keeps a collection of players within an age group
					as opposed to placing them on individual teams.
					</span>

					</div>



					<div className="corporate_venue_Paragraph_Footer">

					<span>More</span><img className="img-responsive" src={right_icon} alt="arrow" />

					</div>

						
					</div>



					</div>

			</div>

			</div>
		);
	}
	componentDidMount(){

	}
}
