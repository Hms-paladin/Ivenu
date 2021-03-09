import React from 'react';
import ControlledLottie from '../../components/LottieComp';
import calendarData from '../../FormJSON/calendar.json' 
export default class NoAvailability extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Noavailability">
				<ControlledLottie animationData={calendarData}/>
				<div className="controlledDiv">
				<p>Click on Pricing and check Availability option</p>
				<p> to check venue availabilty.</p>
				</div>
			</div>
		);
	}
}
