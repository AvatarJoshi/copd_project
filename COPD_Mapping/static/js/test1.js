// Add console.log to check to see if our code is working.
console.log("working");

// Creating map object
var myMap = L.map("map", {
    center: [38.50445, -98.39784],
    zoom: 3
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});


// If data.beta.nyc is down comment out this link
var data_county = "static/data/testData.geo.json";
var data_state = "static/data/state.geo.json";

// 1. Add a 2nd layer group for the tectonic plate data.
let data_county = new L.LayerGroup();
let data_state = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "State": data_state,
  "County": data_county
  
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(myMap);

// ------ Earthquake Info —————
// Grabbing our GeoJSON data..
d3.json(data_county, function(data) {
    console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "grey",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: getColor(feature.properties.CODP),
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
    }).addTo(data_county);
 // Then we add the earthquake layer to our map.
data_county.addTo(myMap);


  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Grabbing our GeoJSON data..
d3.json(data_state, function(data) {
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
        layer.bindPopup("<h1>" + feature.properties.NAME10);
  
      }
    }).addTo(data_state);
    // Then we add the earthquake layer to our map.
   data_state.addTo(myMap);

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(myMap);



// ------ Major Earthquake  —————

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {
  

  // 4. Use the same style as the earthquake data.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  
  // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 6) {
      return "#ea2c2c";
    }
    if (magnitude > 5) {
      return "#ea822c";
    }
    return "#eecc00";
  }

  
  // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  
  // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
   // We create a popup for each circleMarker to display the magnitude and location of the earthquake
   //  after the marker has been created and styled.
   onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(majorEarthquakes);

  // 8. Add the major earthquakes layer to the map.
  majorEarthquakes.addTo(map);
  // 9. Close the braces and parentheses for the major earthquake data.
  });

// ------ Earthquake legend —————
// Then add all the details for the legend
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
  
    const d = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#800026",
      "#BD0026",
      "#E31A1C",
      "#FC4E2A",
      "#FD8D3C",
      "#FEB24C",
      "FED976",
      "FED976",
  
    ];
  
  
  // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < d.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        d[i] + (d[i + 1] ? "&ndash;" + d[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // Finally, we our legend to the map.
    legend.addTo(myMap)

    });
});