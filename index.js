'use strict';

// Initialize and add the map
var infowindow;
function initMap() {
  const mapCenter = { lat: 41.8781, lng: -87.6298 };
  
  let map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 10
  });

  infowindow = new google.maps.InfoWindow();
  
  var marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
    animation: google.maps.Animation.DROP
  });
    
  function drop() {
    for (var i = 0; i < markerArray.length; i++) {
      setTimeout(function () {
        addMarkerMethod();
      }, i * 200);
    }
  } 
}

// Initialize and add autocomplete 
let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),
    {
      types: ['establishment'],
      componentRestrictions: { 'country': ['USA'] },
      fields: ['place_id', 'geometry', 'name']
    });

  // When the user selects an address from the dropdown, populate the address fields in the form.
  autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    //User did not select a prediction; reset the input field
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  }  else {
    //Display details about the valid place 
    document.getElementById('details').innerHTML = place.name;
  }
}

function initialize() {
  initMap();
  initAutocomplete();
}