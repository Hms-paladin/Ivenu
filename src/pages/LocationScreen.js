import React from 'react';
const carousel2=require("../images/shutter/CAROUSEL-02.jpg");

export default class LocationScreen extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={styles.Flex}>
<div style={styles.flex30}>
1</div>
<div style={styles.flex70} className="flexBackgroundLocation">
</div>

			</div>
		);
	}
}
const styles={
Flex:{
	display:'flex',
},
flex30:{
width:'40%'
},
flex70:{
	width:'60%',
	height:'100vh',
	
	backgroundSize:'cover'
},
flexImage:{
	width:'100%',
	height:'100%'
}
}