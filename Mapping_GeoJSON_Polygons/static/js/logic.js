console.log("working");

let torontoHoods = "https://raw.githubusercontent.com/juberr/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

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
  Street: streets,
  "Satellite Streets": satelliteStreets
};

let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})
// Passing our map layers into layer control
L.control.layers(baseMaps).addTo(map);

let myStyle = {
  weight: 1,
  color: "blue",
  fillColor: "yellow"
}

let onEachFeature = function(feature, layer) {
  layer.bindPopup(`<h3> Neighborhood: ${feature.properties.AREA_NAME} </h3>`)
}

d3.json(torontoHoods).then(function(data) {
  console.log(data);
  L.geoJson(data, {onEachFeature: onEachFeature, style: myStyle})
  .addTo(map);
});