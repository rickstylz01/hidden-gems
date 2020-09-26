function initMap() {
  const myCoordinates = { lat: 41.878113, lng: -87.629799 };

  //Search bounds local context
  // let bigBounds = {
  //   north: 42.3256,
  //   south: 41.7397,
  //   west: -88.2040,
  //   east: -87.4548,
  // };

  const lcMapView = new google.maps.localContext.LocalContextMapView({
    element: document.querySelector('#map'),
    placeTypePreferences: [
      'bakery', 
      'cafe', 
      'restaurant'
    ],
    maxPlaceCount: 24,
    // locationRestriction: bigBounds,
    directionsOptions: { origin: myCoordinates }
  });

  const map = lcMapView.map;
  map.setOptions({
    center: myCoordinates,
    zoom: 16
  });

  const input = document.getElementById("autocomplete");
  const options = {
    types: ["establishment"],
    componentRestrictions: { country: "us" }
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  // Bind the map's bounds (viewport) property to the autocomplete object, so that the autocomplete requests use the current map bounds for the bounds option in the request.
  autocomplete.bindTo("bounds", map);
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    [
      "address_components", 
      "geometry", 
      "icon", 
      "name"
    ]
  );

  //Infowindow configuration
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);

  const marker = new google.maps.Marker(
    {
      map,
      anchorPoint: new google.maps.Point(0, -29),
    }
  );

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    let address = "";

    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
        "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
        "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
        "",
      ].join(" ");
    }
    infowindowContent.children["place-icon"].src = place.icon;
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = address;
    infowindow.open(map, marker);
  });
}





// const searchUrl = "https://maps.googleapis.com/maps/api/js";
// const apiKey = "O0bRxrneaYkbE13IJgdL9zcGKa20TqseF5gqaJkc";

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

// function generateRequestUrl(stateNames, maxResults) {
//   let params = {
//     v: 3.exp,
//     key: apiKey,
//     ca
    
//   }

//   let queryString = formatQueryParams(params);
//   return `${searchUrl}?${queryString}&stateCode=${stateNames.join()}`
// }

// function getNationalPark(stateNames, maxResults = 10) {
//   let requestUrl = generateRequestUrl(stateNames, maxResults);
//   fetch(requestUrl)
//     .then(response => response.json())
//     .then(responseJson => displayToDom(responseJson))
// }

function initialize() {
  initMap();
}