
// Creating map object
var myMap = L.map("map", {
    center: [38.50445, -98.39784],
    zoom: 3
  });

// Adding tile layer
var light1 =L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});




// // Only one base layer can be shown at a time
// var baseMaps = {
//   Light1: light1,
//   Light2: light2
// };


// If data.beta.nyc is down comment out this link
// var data_county = "static/data/testData.geo.json";
var data_state = "static/data/state.geojson";

// 1. Add a 2nd layer group for the tectonic plate data.
// let data_county = new L.LayerGroup(data_county);
// let data_state = new L.LayerGroup(data_state);

// 2. Add a reference to the tectonic plates group to the overlays object.
// var overlays = {
// "State": data_state,
//   "County": data_county
  
// };

// Define a map object
var myMap = L.map("map", {
  center: [38.50445, -98.39784],
  zoom: 3
  // layers: [myMap]
});

// Pass our map layers into our layer control
// // Add the layer control to the map
// L.control.layers(myMap, {
//   collapsed: false
// }).addTo(myMap);

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(myMap).addTo(myMap);

// ------ Earthquake Info —————
// Grabbing our GeoJSON data..
d3.json(state_county, function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "black",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: getColor(feature.properties.NAME10),
          fillOpacity: 1,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        alert(feature.properties.NAME10);
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h1>" + feature.properties.NAME10 + "</h1> <hr> <h2>" + feature.properties.CODP + "</h2>");
  
      }
    }).addTo(state_county);
 // Then we add the earthquake layer to our map.
state_county.addTo(myMap);


//   // Here we create a legend control object.
// let legend = L.control({
//   position: "bottomright"
// });

// // Grabbing our GeoJSON data..
// d3.json(data_state, function(data) {
//     console.log(data);
//     // Creating a geoJSON layer with the retrieved data
//     L.geoJson(data, {
//       // Style each feature (in this case a neighborhood)
//       style: function(feature) {
//         return {
//           color: "black",
//           // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//           fillColor: getColor(feature.properties.NAME10),
//           fillOpacity: 1,
//           weight: 1.5
//         };
//       },
//       // Called on each feature
//       onEachFeature: function(feature, layer) {
//         // alert(feature.properties.NAME10);
//         // Set mouse events to change map styling
//         layer.on({
//           // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.9
//             });
//           },
//           // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//           mouseout: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.5
//             });
//           },
//           // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//           click: function(event) {
//             myMap.fitBounds(event.target.getBounds());
//           }
//         });
//         // Giving each feature a pop-up with information pertinent to it
//         layer.bindPopup("<h1>" + feature.properties.NAME10);
  
//       }
//     }).addTo(data_state);
//     // Then we add the earthquake layer to our map.
//    data_state.addTo(myMap);

// // Then we add a control to the map that will allow the user to change which
// // layers are visible.
// L.control.layers(baseMaps, overlays).addTo(myMap);




    });
