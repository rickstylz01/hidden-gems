'use strict';

// Initialize and add the map
function initMap() {
  const mapCenter = { lat: 41.8781, lng: -87.6298 };
  let map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 10
  });

  let marker = new google.maps.Marker(
    {
      position: mapCenter,
      map: map
    }
  )
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
    document.getElementById('autocomplete').innerHTML = place.name;
  }
}

function initialize() {
  initMap();
  initAutocomplete();
}