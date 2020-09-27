let map;
const silverStyle = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#f5f5f5"
  }]
  }, {
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
  }, {
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
  }, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
  }, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#f5f5f5"
  }]
  }, {
  "featureType": "administrative.land_parcel",
  "stylers": [{
    "visibility": "off"
  }]
  }, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#bdbdbd"
  }]
  }, {
  "featureType": "administrative.neighborhood",
  "stylers": [{
    "visibility": "off"
  }]
  }, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
  }, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
  }, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
  }, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
  }, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#ffffff"
  }]
  }, {
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#757575"
  }]
  }, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#dadada"
  }]
  }, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#616161"
  }]
  }, {
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
  }, {
  "featureType": "transit.line",
  "elementType": "geometry",
  "stylers": [{
    "color": "#e5e5e5"
  }]
  }, {
  "featureType": "transit.station",
  "elementType": "geometry",
  "stylers": [{
    "color": "#eeeeee"
  }]
  }, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#c9c9c9"
  }]
  }, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9e9e9e"
  }]
}];

function initMap() {
  // Generate the placeholder map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    disableDefaultUI: true,
  });
  map.setOptions({ styles: silverStyle });

  // Build and add the Autocomplete search bar
  const input = document.getElementById('autocomplete');
  const options = {
    types: ['address'],
    componentRestrictions: {
      country: 'us'
    }
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.setFields(
    [
      'address_components', 
      'geometry', 
      'name'
    ]
  );

  // Load a Local Context map when the user selects an address
  let originLocation = { 
    lat: 37.402105, 
    lng: -122.081974 
  };

  autocomplete.addListener('place_changed', async () => {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No address available for that input.');
      return;
    }

    // Recenter the map to the selected address
    originLocation = place.geometry.location;
    console.log(place);

    fillLocalContext(originLocation);
  });
}

function fillLocalContext(home) {
  document.getElementById('map').innerHTML = '';

  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    directionsOptions: { origin: home },
    element: document.getElementById('map'),
    placeTypePreferences: [
      { type: 'bakery', weight: 2 },
      { type: 'cafe', weight: 1 },
      { type: 'restaurant', weight: 1 },
      { type: 'supermarket', weight: 2 },
    ],
    maxPlaceCount: 24
  });

  map = localContextMapView.map;

  map.setOptions({
    center: home,
    zoom: 16,
  });

  const originMarker = new google.maps.Marker({
    position: home,
    map: map,
    icon: 'images/home-icon.png',
    zIndex: 30,
  });
}

function initialize() {
  initMap();
}