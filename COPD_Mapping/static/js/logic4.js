// Creating map object
var myMap = L.map("map", {
  center: [38.50445, -98.39784],
  zoom: 5
});


// var map = L.map('map').setView([37.8, -96], 4);

// var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// L.geoJson(statesData).addTo(map);



// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// If data.beta.nyc is down comment out this link
var data_county = "static/data/testData.geo.json";
var data_map= "static/data/data_map.geojson";
//var data_county = "test.json";

function getColor(Levels_COPD) {
  return Levels_COPD > 15 ? '#800026' :
         Levels_COPD > 12 ? '#BD0026' :
         Levels_COPD > 9  ? '#E31A1C' :
         Levels_COPD > 6  ? '#FC4E2A' :
         Levels_COPD > 3  ? '#FD8D3C' :
         Levels_COPD > 0  ? '#FEB24C' :
                            '#FFEDA0';
};


// Grabbing our GeoJSON data..
d3.json(data_map, function(data) {
  //console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "black",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: getColor(feature.properties.Levels_COPD),
        fillOpacity: 1,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      //alert(feature.properties.NAME10);
      // Set mouse events to change map styling
/*       layer.on({
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
      }); */
      // Giving each feature a pop-up with information pertinent to it
      //layer.bindPopup("<h1>" + feature.properties.County + "</h1> <hr> <h2>" + feature.properties.Levels_COPD + "</h2>");
      layer.bindPopup("<b>County:</b>" + feature.properties.County + "<br><b>State:</b>" + feature.properties.State + "<br><b> Levels of COPD:</b> " + feature.properties.Levels_COPD + "%" + "<br><b> Levels of Smoker:</b> " + feature.properties.Levels_Smokers + "%");

    }

  }).addTo(myMap);
});

const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  const div = L.DomUtil.create('div', 'info legend');
  const grades = [0, 3, 6, 9, 12, 15];
  const texts = ["&nbsp; 0.1 - &nbsp;3.0", "&nbsp; 3.1 -&nbsp; 6.0", "&nbsp; 6.1 -&nbsp; 9.0", "&nbsp; 9.1 - 12.0", "12.1 - 15.0", "15.0+"];
  const labels = [];
  let grade, text;

  for (let i = 0; i < grades.length; i++) {
    grade = grades[i];
    txt = texts[i]
    //to = grades[i + 1];

    labels.push(`<i style="background:${getColor(grade + 1)}"></i> ${txt}`);
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(myMap);











// Use this link to get the geojson data.
// var link = "static/data/nyc.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
// function chooseColor(borough) {
//   switch (borough) {
//   case "Brooklyn":
//     return "yellow";
//   case "Bronx":
//     return "red";
//   case "Manhattan":
//     return "orange";
//   case "Queens":
//     return "green";
//   case "Staten Island":
//     return "purple";
//   default:
//     return "black";
//   }
// }

// // Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   console.log(data);
//   // Creating a geoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//         fillColor: chooseColor(feature.properties.Name10),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // Called on each feature
//     onEachFeature: function(feature, layer) {
//       // Set mouse events to change map styling
//       layer.on({
//         // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//         click: function(event) {
//           myMap.fitBounds(event.target.getBounds());
//         }
//       });
//       // Giving each feature a pop-up with information pertinent to it
//       layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

//     }
//   }).addTo(myMap);
// });
