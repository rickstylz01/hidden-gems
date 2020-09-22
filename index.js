'use strict';

// Initialize and add the map
function initMap() {
  //map options 
  let options = {
    zoom: 10,
    center: { lat: 41.8781, lng: -87.6298 }
  }

  //new map
  const map = new google.maps.Map(document.getElementById('map'), options);

  //location coordinates
  let locations = [
    ['Pilsen', 41.8525, -87.6563, 2],
    ['West Lawn', 41.7787, -87.7228, 1]
  ]

  var infowindow = new google.maps.InfoWindow();
  var i;

  //Loop that creates icons for multiple locations
  for (i = 0; i < locations.length; i++) {
    let image = "images/diamond-sm.png";
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    marker.addListener('click', toggleBounce);
  }
}


//marker animation function
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//drop timeout for markers
function drop() {
  clearMarkers();

  for (let i = 0; i < neighborhoods.length; i++) {
    addMarkerWithTimeout(neighborhoods[i], i * 200);
  }
}

function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(() => {
    markers.push(
      new google.maps.Marker({
        position: position,
        map,
        animation: google.maps.Animation.DROP
      })
    );
  }, timeout);
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//search url
let searchUrl = "https://maps.googleapis.com/maps/api/js";
let apiKey = "AIzaSyDQ2tXUtV8DRE5ANMlH66vAboyO2BM7Rfo"

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function generateRequestUrl(cityName, stateName) {
  const params = {
    key: apiKey,
    callBack: initMap,
    city: cityName,
    state: stateName
  }

  let querySting= formatQueryParams(params);
  return `${searchUrl}?${queryString}`
}

function getNationalPark(cityName, stateName) {
  let requestUrl = generateRequestUrl(cityName, stateName);
  fetch(requestUrl)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
}

//form handler
function watchForm() {
  console.log('`watchForm` is working');
  $('#submit-button').click(event => {
    event.preventDefault();
    const cityName = $('#city-name').val();
    const stateName = $('#state-name').val();
    console.log(cityName, stateName);
  });
  
}

$(watchForm);