// Store our API endpoint inside queryUrl
var data_county = "static/data/county.geojson";
var data_state = "static/data/state.geojson";
var data_map= "static/data/data_map.geojson";


// Creating map object
var myMap = L.map("map", {
    center: [38.50445, -98.39784],
    zoom: 5,
  });

  // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
}).addTo(myMap);

  
// Function that will determine the color of a neighborhood based on the borough it belongs to
  function getColor(Levels_COPD) {
    if (Levels_COPD > 15) {
      return "'#800026'";
    }
    if (Levels_COPD > 12 ) {
      return "#BD0026";
    }
    if (Levels_COPD > 9 ) {
      return "#E31A1C";
    }
    if (Levels_COPD > 6) {
      return "#FC4E2A";
    }
    if (Levels_COPD > 3) {
      return "#FD8D3C";
    }
    return "#FEB24C";
  }

// Here we create a legend control object.
let legend = L.control({
    position: "bottomright"
  });
  
// ------ legend —————
// Then add all the details for the legend
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
  
    const Levels_COPD = [15, 12, 9, 6, 3, 0];
    const colors = [
      "#800026",
      "#BD0026",
      "#E31A1C",
      "#FC4E2A",
      "#FD8D3C",
      "#FEB24C",
    ];

// Looping through our intervals to generate a label with a colored square for each interval.
for (var i = 0; i < Levels_COPD.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      Levels_COPD[i] + (Levels_COPD[i + 1] ? "&ndash;" + Levels_COPD[i + 1] + "<br>" : "+");
    }
    return div;
  };

// // Finally, we our legend to the map.
//   legend.addTo(myMap);

//   // Grabbing our GeoJSON data..
//   d3.json(data_map, function(data) {
//     console.log(data) ;
//     // Creating a geoJSON layer with the retrieved data
//     L.geoJson(data, {
//       // Style each feature (in this case a neighborhood)
//       style: function(feature) {
//         return {
//           color: "white",
//           // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//           fillColor: chooseColor(feature.properties.County),
//           fillOpacity: 0.5,
//           weight: 1.5
//         }; 
//       },
    
//       // Called on each feature
//       onEachFeature: function(feature, layer) {
//        layer.bindPopup("<b>County:</b>" + feature.properties.County + "<br><b>State:</b>" + feature.properties.State + "<br><b> Levels of COPD:</b> " + feature.properties.Levels_COPD + "%" + "<br><b> Levels of Smoker:</b> " + feature.properties.Levels_Smokers + "%");
      
//         }
//     }).addTo(myMap);
// });