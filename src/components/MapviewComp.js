import React from 'react';
// import '../index.css';
// import '../App.css';
import Geocode from "react-geocode";

import location from '../images/location.png';
var addressData="";
var count=0;
class MapviewComp extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			mapIsReady:null,
		};
	  }

	getAddress=(lat,lng)=>{
		Geocode.fromLatLng(lat, lng).then(
		response => {
		console.log(response.results[0]);
		const address = response.results[0].formatted_address;
		addressData=address;
		// this.setState({address:address});
		// alert(JSON.stringify(lat,lng));
		this.props.receiveaddr(address,response.results[0].geometry.location);
		// console.log(address);
		},
		error => {
		console.error(error);
		}
		);
	}
getAddressBylatLng(){
	console.log(addressData);
	return addressData;
}


	 initAutocomplete(coords) {
		var self=this;
		const google = window.google;
		var center = new google.maps.LatLng(coords.latitude, coords.longitude);

		var map = new google.maps.Map(document.getElementById('map'), {
			center,
			zoom:13,
			mapTypeId:'roadmap',
			mapTypeControl:true,
		  });

		// Draggable marker
		var myMarker = new google.maps.Marker({
			position:center,
			draggable:true,
			map:map
		});
		 var infowindow = new google.maps.InfoWindow({
    content:"<div id='addressinfo'>"+addressData+"</div>"
  });

  myMarker.addListener('click', function() {
  	infowindow.setZIndex(2);
  	infowindow.setContent(addressData);
    infowindow.open(myMarker.get('map'), myMarker);
  });
	//popover google marker click
// 		var infoContent = "<div>"+self.getAddressBylatLng()+"</div>";

// var infoWindow = new google.maps.InfoWindow({
//     content:infoContent
// });

		//Map center
		// google.maps.event.addListener(myMarker, 'dragend', function () {
		// 	map.setCenter(this.getPosition()); // Set map center to marker position
		// });
// alert('hii');
		//move to current location
		document.getElementById('clickSearch').addEventListener("click", function(){
			// alert('');
			// alert('byyy');
			navigator.geolocation.getCurrentPosition(position => {
			var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			myMarker.setPosition(center);
			map.setZoom(14);
			map.panTo(center);
			self.getAddress(position.coords.latitude, position.coords.longitude);
		  });
		})
// alert('lulabye');
		//Marker set position
		google.maps.event.addListener(myMarker, 'dragend', function () {
			// myMarker.setPosition(this.getCenter()); // set marker position to map center
			self.props.latlng && self.props.latlng(myMarker);
			var lat = this.getPosition().lat();
			var lng = this.getPosition().lng();
			const data = {
				lat,
				lng
			}
			console.log(data);
			self.getAddress(lat,lng);
			// self.props.latlng && self.props.latlng(data);
		});

		// Create the search box and link it to the UI element.
		var input = document.getElementById('pac-input');
		var createElement=document.getElementById('clickSearch');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(createElement);

	  
		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
		  searchBox.setBounds(map.getBounds());
		});
	  
		var markers = [];
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', function() {
			// alert('')

		  var places = searchBox.getPlaces();
			// console.log('fsd',places);
			// console.log(places);
    var chosenlocation=places[0].geometry.location;
    	addressData=places[0].formatted_address;
			self.props.receiveaddr(places[0].formatted_address,{latitude:chosenlocation.lat(),longitude:chosenlocation.lng()})
			// self.props.sendSearchedData&&self.props.sendSearchedData(places);

		  if (places.length === 0) {
			alert('there is no such place')
			return;
		  }
	  	myMarker.setPosition(places[0].geometry.location);
		  // Clear out the old markers.
		  markers.forEach(function(marker) {
			marker.setMap(null);
		  });
		  markers = [];
	  
		  var bounds = new google.maps.LatLngBounds();
		  places.forEach(function(place) {
			if (!place.geometry) {
			  console.log("Returned place contains no geometry");
			  return;
			}
			var icon = {
			  url:place.icon,
			  size:new google.maps.Size(71, 71),
			  origin:new google.maps.Point(0, 0),
			  anchor:new google.maps.Point(17, 34),
			  scaledSize:new google.maps.Size(25, 25)
			};
	  
			// Create a marker for each place.
			// markers.push(new google.maps.Marker({
			//   map:map,
			//   icon:icon,
			//   title:place.name,
			//   position:place.geometry.location
			// }));
	  
			if (place.geometry.viewport) {
			  // Only geocodes have viewport.
			  bounds.union(place.geometry.viewport);
			} else {
			  bounds.extend(place.geometry.location);
			}
		  });
		  map.fitBounds(bounds);
		});

		

		// To get the placesearch options in full screen mode
		document.onfullscreenchange = function ( event ) {
			let target = event.target;
			let pacContainerElements = document.getElementsByClassName("pac-container");
			console.log('pac', pacContainerElements);
			if (pacContainerElements.length > 0) {
				let pacContainer = document.getElementsByClassName("pac-container")[0];
				if (pacContainer.parentElement === target) {
					console.log("Exiting FULL SCREEN - moving pacContainer to body");
					document.getElementsByTagName("body")[0].appendChild(pacContainer);
				} else {
					console.log("Entering FULL SCREEN - moving pacContainer to target element");
					target.appendChild(pacContainer);
				}
			} else {
				console.log("FULL SCREEN change - no pacContainer found");
			}};
	  }

	 
	  
	   componentDidMount() {
		    var self=this;
			const ApiKey = this.props.APIKEY;
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places&region=ES`;
			script.async = true;
			script.defer = true;
			script.addEventListener('load', (data) => {
				console.log('data',data);
				setTimeout(()=>{
					
				self.setState({mapIsReady:true});
				self.initAutocomplete(self.props.coords)
			},200)
			})
			 Geocode.setApiKey(ApiKey);
    				Geocode.enableDebug();
		document.body.appendChild(script);
	}
		

	render(){
		count++;
		console.log('this.props',this.props);
		const { search } = this.props;
		return(
			<div  style={{height:500}}>

    				<div id="map" style={{height:'100%'}} />
					<button style={{"visibility":'hidden'}} className={`btnclass_search btn btn-primary btn-sm ${!search && 'd-none'}`}  type="button" id="clickSearch" ><img src={location}/></button>
					<input style={{"visibility":'hidden'}} id="pac-input" className="controls MapviewInput" type="text" placeholder="Search Box" />
				
			</div>
		)
	}
}

export default MapviewComp;