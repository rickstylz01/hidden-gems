'use strict';

// Initialize and add the map
function initMap() {
  // The location to center the map
  var mapCenter = { lat: 41.8781, lng: -87.6298 };
  // The map object
  var map = new google.maps.Map(
    document.getElementById('map'), { 
      zoom: 10, 
      center: mapCenter
    });
  // The marker, positioned at mapCenter variable
  var marker = new google.maps.Marker({ 
      position: mapCenter, 
      map: map 
  });

  //create input variable for user input
  var input = document.getElementById('pac-input');
  //places input control in the top left corner of the map
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map)

  // var infowindow = new google.maps.InfoWindow();

  // autocomplete.addListener('place_changed', function() {
  //   infowindow.close();
  //   marker.setVisible(false);
  //   var place = autocomplete.getPlace();
  //   if(!place.geometry) {
  //     window.alert("Autocomplete's returned place contains no geometry");
  //     return;
  //   }

  //   if(place.geometry.viewport)
  // }); 
}



