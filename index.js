'use strict';

// Initialize and add the map
function initMap() {
  const mapCenter = { lat: 41.8781, lng: -87.6298 }
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



