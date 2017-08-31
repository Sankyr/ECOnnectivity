function initMap() {
	var mapOptions = {
		center: new google.maps.LatLng(40.719, -73.008),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.HYBRID
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	createMarker(map);
}

function createMarker(map){
	var marker = new google.maps.Marker({
		position: {lat: 40.719, lng: -73.008},
		map: map,
		title: 'First Marker'
	});
}