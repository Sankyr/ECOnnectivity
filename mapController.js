function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 30.211537759527246, lng: -92.02144145965576}
  });

  map.addListener('click', function(e) {
	addLocation(e.latLng);
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function addLocation(latLng) {
  var div = document.getElementById('locations');
  div.innerHTML += '<div class="col-sm-6"><p class="location">{lat: '+latLng.lat()+', lng: '+latLng.lng()+'}</p></div><div class="col-sm-6"><button type="button"><span class="glyphicon glyphicon-trash"></span></button></div>';
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}