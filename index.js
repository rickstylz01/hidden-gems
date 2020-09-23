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
  var marker = new google.maps.Marker({ position: mapCenter, map: map });
}
