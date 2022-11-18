// Add console.log to check to see if our code is working.
console.log("Starting ...");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// // We create the second tile layer that will be the background of our map.
// let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });

// // We create a third tile layer that will be the background of our map.
// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// 	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	accessToken: API_KEY
// });

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets
  // "Satellite": satelliteStreets,
  // "Dark": dark
};

// If data.beta.nyc is down comment out this link
// var county_data = "static/data/county_geo.json";
// var state_data = "static/data/state_geo.json";

// 1. Add a 2nd layer group for the tectonic plate data.
let data_county = new L.LayerGroup();
let data_state = new L.LayerGroup();

// var state_county = L.layerGroup([data_state, data_county]);

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "State": data_state,
  "County": data_county
};

// Define a map object
var myMap = L.map("map", {
  center: [38.50445, -98.39784],
  zoom: 5,
  layer:[streets]
});


// // Pass our map layers into our layer control
// // Add the layer control to the map
// L.control.layers(baseMaps, overlays, {
//   collapsed: true
// }).addTo(myMap);


  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Grabbing our GeoJSON data..
d3.json("static/data/state.geojson").then(function(data) {
// d3.json(data_state, function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "pink",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          // fillColor: "white",
          // fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // alert(feature.properties.NAME10);
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
        layer.bindPopup("<br><b>State:</b>" + feature.properties.NAME10 + "<br><b>COPD:</b>"+ "<br><b>Smoker:</b>");
     
      
      }
    }).addTo(data_state);
    console.log(data_state);
    // Then we add the earthquake layer to our map.
    data_state.addTo(myMap);
  });



// // ------ Major Earthquake  —————

// // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {
  

//   // 4. Use the same style as the earthquake data.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }
  
//   // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude > 6) {
//       return "#ea2c2c";
//     }
//     if (magnitude > 5) {
//       return "#ea822c";
//     }
//     return "#eecc00";
//   }

  
//   // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }
  
//   // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
//   // sets the style of the circle, and displays the magnitude and location of the earthquake
//   //  after the marker has been created and styled.
//   L.geoJson(data, {
//     // We turn each feature into a circleMarker on the map.
//     pointToLayer: function(feature, latlng) {
//         console.log(data);
//         return L.circleMarker(latlng);
//       },
//     // We set the style for each circleMarker using our styleInfo function.
//   style: styleInfo,
//    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
//    //  after the marker has been created and styled.
//    onEachFeature: function(feature, layer) {
//     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//   }
// }).addTo(majorEarthquakes);

//   // 8. Add the major earthquakes layer to the map.
//   majorEarthquakes.addTo(map);
//   // 9. Close the braces and parentheses for the major earthquake data.
//   });

// // ------ Earthquake legend —————
// // Then add all the details for the legend
// legend.onAdd = function() {
//     let div = L.DomUtil.create("div", "info legend");
  
//     const d = [0, 1, 2, 3, 4, 5];
//     const colors = [
//       "#800026",
//       "#BD0026",
//       "#E31A1C",
//       "#FC4E2A",
//       "#FD8D3C",
//       "#FEB24C",
//       "FED976",
//       "FED976",
  
//     ];
  
  
//   // Looping through our intervals to generate a label with a colored square for each interval.
//     for (var i = 0; i < d.length; i++) {
//       console.log(colors[i]);
//       div.innerHTML +=
//         "<i style='background: " + colors[i] + "'></i> " +
//         d[i] + (d[i + 1] ? "&ndash;" + d[i + 1] + "<br>" : "+");
//       }
//       return div;
//     };
  
//     // Finally, we our legend to the map.
//     legend.addTo(myMap)

//     });
// });

// Retrieve the earthquake GeoJSON data.
d3.json("static/data/county.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.NAME10),
      color: "black",
      // radius: getRadius(feature.properties.NAME10),
      // stroke: true,
      weight: 0.5
    };
  }

//   // This function determines the color of the marker based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude > 5) {
//       return "#ea2c2c";
//     }
//     if (magnitude > 4) {
//       return "#ea822c";
//     }
//     if (magnitude > 3) {
//       return "#ee9c00";
//     }
//     if (magnitude > 2) {
//       return "#eecc00";
//     }
//     if (magnitude > 1) {
//       return "#d4ee00";
//     }
//     return "#98ee00";
//   }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

//   // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("<b>County:</b> " + feature.properties.NAME10 + "<br>Location: " + feature.properties.place);
    }
}).addTo(data_county);

  // Then we add the earthquake layer to our map.
  data_county.addTo(myMap);


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlays, {
    collapsed: false
  }).addTo(myMap);

});
