// Add console.log to check to see if our code is working.
console.log("Starting ...");


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets
  // "Satellite": satelliteStreets,
  // "Dark": dark
};

// 1. Add a 2nd layer group for the tectonic plate data.
let data_county = new L.LayerGroup();
let data_state = new L.LayerGroup();

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

    // Retrieve the earthquake GeoJSON data.
d3.json("static/data/data_map.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.County),
      color: "black",
      // radius: getRadius(feature.properties.NAME10),
      // stroke: true,
      weight: 0.5
    };
  }

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

    //   // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
       layer.bindPopup("<b>County:</b>" + feature.properties.County + "<br><b>State:</b>" + feature.properties.State + "<br><b> Levels of COPD:</b> " + feature.properties.Levels_COPD + "%" + "<br><b> Levels of Smoker:</b> " + feature.properties.Levels_Smokers + "%");
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
