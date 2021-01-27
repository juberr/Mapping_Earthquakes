console.log("working");

let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let line = [
  [37.6213, -122.3790],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [43.6532, -79.3832],
  [40.6413, -73.7781]
];

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data Â© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data Â© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
});

let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})
// Passing our map layers into layer control
L.control.layers(baseMaps).addTo(map);

let myStyle = {
  weight: 2,
  color: "ffffa1"
}

let onEachFeature = function(feature, layer) {
  layer.bindPopup(`<h3> Neighborhood: ${feature.properties.AREA_NAME} </h3>`)
}

function getRadius(mag) {
  if (mag === 0) {
    return 1;
  }
  return mag * 4;
}

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  }
}

function getColor(mag) {
  if (mag > 5) {
    return "#ea2c2c";
  }
  if (mag > 4) {
    return "#ea822c";
  }
  if (mag > 3) {
    return "#ee9c00";
  }
  if (mag > 2) {
    return "#eecc00";
  }
  if (mag > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}


d3.json(earthquakeData).then(function(data) {
  console.log(data);
  L.geoJson(data, {pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng);
  },
  style: styleInfo,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
}
})
  .addTo(map);
});