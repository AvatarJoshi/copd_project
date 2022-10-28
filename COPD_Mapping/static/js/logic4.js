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

// Function to determine marker size based on population
function markerSize(population) {
  return population / 40;
}

// An array containing all of the information needed to create city and state markers
var locations = [
  {
    coordinates: [40.7128, -74.0059],
    state: {
      name: "New York State",
      population: 19795791
    },
    city: {
      name: "New York",
      population: 8550405
    }
  },
  {
    coordinates: [34.0522, -118.2437],
    state: {
      name: "California",
      population: 39250017
    },
    city: {
      name: "Lost Angeles",
      population: 3971883
    }
  },
  {
    coordinates: [41.8781, -87.6298],
    state: {
      name: "Illinois",
      population: 12671821
    },
    city: {
      name: "Chicago",
      population: 2695598
    }
  },
  {
    coordinates: [29.7604, -95.3698],
    state: {
      name: "Texas",
      population: 26960000
    },
    city: {
      name: "Houston",
      population: 2296224
    }
  },
  {
    coordinates: [41.2524, -95.9980],
    state: {
      name: "Nebraska",
      population: 1882000
    },
    city: {
      name: "Omaha",
      population: 446599
    }
  }
];

// Define arrays to hold created city and state markers
var cityMarkers = [];
var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(locations[i].state.population)
    })
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "#green",
      fillColor: "green",
      radius: markerSize(locations[i].city.population)
    })
  );
}




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
//var data_county = "test.json";

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}


// Grabbing our GeoJSON data..
d3.json(data_county, function(data) {
  console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "black",
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
  }).addTo(myMap);
});












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
