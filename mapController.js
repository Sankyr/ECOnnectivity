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
	document.getElementById('time').innerHTML = "";
	directionsDisplay.setMap(null);
	directionsDisplay = null;
}

function metersToImperial(meters){
	feet = 3.28084*meters;
	miles = feet/5280;
	if(feet > 5280)//feet in a mile
		return miles.toFixed(3) + " miles";
	else
		return Math.floor(feet) + " feet";
}

function simplifyTime(seconds){
	hours = Math.floor(seconds/3600);
	minutes = Math.floor((seconds % 3600) / 60);
	seconds = seconds % 60
	if(hours > 0)//seconds in an hour
		return hours + "hours," + minutes + " minutes, and " + seconds + " seconds";
	else if(minutes > 0)
		return minutes + " minutes and " + seconds + " seconds";
	else
		return seconds + " seconds"
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
	var time = 0;
	var distance = 0;
	result.routes[0].legs.forEach(function(leg){
	  time += leg.duration.value
	  distance += leg.distance.value
	});
	document.getElementById('distance').innerHTML = "Total Distance: " + metersToImperial(distance);
	document.getElementById('time').innerHTML = "Total Time: " + simplifyTime(time);
  });
  
	for(var i = 0; i < markers.length; i++)
		markers[i].setMap(null)
	markets = []
}