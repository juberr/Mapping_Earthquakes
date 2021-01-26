console.log("working");

let torontoData = "https://raw.githubusercontent.com/juberr/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json"

let line = [
  [37.6213, -122.3790],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [43.6532, -79.3832],
  [40.6413, -73.7781]
];

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data Â© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data Â© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

let baseMaps = {
  Light: light,
  Dark: dark
};

let map = L.map('mapid', {
  center: [44, -80.0],
  zoom: 2,
  layers: [dark]
})
// Passing our map layers into layer control
L.control.layers(baseMaps).addTo(map);

let myStyle = {
  color: "#ffffa1",
  weight: 2
}

d3.json(torontoData).then(function(data) {
  console.log(data);
  L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3> Airline: ${feature.properties.airline} </h3> <hr>
      <h3> Destination: ${feature.properties.dst} </h3> `)
    },
    style: myStyle
  })
  .addTo(map);
});