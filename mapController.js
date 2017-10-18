var directionsDisplay;
var directionsService;
var map;

var markers = [];

function initMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 30.211537759527246, lng: -92.02144145965576}
  });

  map.addListener('click', function(e) {
	addLocation(e.latLng);
    placeMarkerAndPanTo(e.latLng);
  });
}

function addLocation(latLng) {
  var div = document.getElementById('locations');
  div.innerHTML += 
  '<li class="location" class="list-group-item" data-loc='+JSON.stringify(latLng)+'>'+latLng+'\
  </li>';

  /*div.innerHTML += 
  '<li class="location" class="list-group-item" data-loc='+JSON.stringify(latLng)+'>'+latLng+'\
  <button type="button"><span class="glyphicon glyphicon-trash"></span></button></li>';
	*/
  }

function placeMarkerAndPanTo(latLng) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  markers.push(marker);
  map.panTo(latLng);
}

function getWayPoints(e){
	return {location: JSON.parse(e.dataset.loc), stopover: true };
}

function clearRoute() {
	document.getElementById('directionsPanel').innerHTML = "";
	document.getElementById('locations').innerHTML = "";
	directionsDisplay.setMap(null);
	directionsDisplay = null
}

function calcRoute() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
  var locations = document.getElementsByClassName("location");
  var wayPoints = Array.prototype.slice.call( locations ).map(getWayPoints);
  var start = JSON.parse(locations[0].dataset.loc);
  var end = JSON.parse(locations[1].dataset.loc);
  var request = {
    origin: start,
    destination: start,
    travelMode: 'DRIVING',
	waypoints: wayPoints.slice(1),
	optimizeWaypoints: true
  };
  
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
	for(var i = 0; i < markers.length; i++)
		markers[i].setMap(null)
	markets = []
}