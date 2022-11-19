// Add console.log to check to see if our code is working.
console.log("Starting ...");

var data = "static/data/data_map.geojson";
// var data_map = jQuery.parseJSON(data);

var map = L.map('map').setView([37.8, -96], 4);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    accessToken: API_KEY

}).addTo(map);

L.geoJson(JSON.parse(data)).addTo(map);