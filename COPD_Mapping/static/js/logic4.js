console.log("Starting ...");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Creating map object
var myMap = L.map("map", {
  center: [38.50445, -98.39784],
  zoom: 5
});

let baseMaps = {
  "Streets": streets
};

// // If data.beta.nyc is down comment out this link
var data_county = "static/data/county.geojson";
console.log("print data path here : ", data_county);
// //var data_county = "county.json";

// If data.beta.nyc is down comment out this link
// var data_state = "static/data/testData.geo.json";
//var data_county = "static/data/county.geo.json";

let allCounty = new L.LayerGroup();

let overlays = {
  "County View": allCounty
}

L.control.layers(baseMaps, overlays).addTo(myMap);

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);


// Grabbing our GeoJSON data..
d3.json(data_county, function(data) {
  console.log("inside d3 func: ", data);
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
    onEachFeature: function(features, layer){
      console.log(features)
      layer.bindPopup("<h3>" + features.features)
    }
  }).addTo(allCounty);

  allCounty.addTo(myMap);

});

// function init() {
// d3.json("static/data/county.geo.json").then((data) => {
//   console.log("data: ", data)
//   var var1 = data.type;
// });
// }

// init();








// // If data.beta.nyc is down comment out this link
// var data_county = "static/data/testData.geo.json";



// function getColor(d) {
//   return d > 1000 ? '#800026' :
//          d > 500  ? '#BD0026' :
//          d > 200  ? '#E31A1C' :
//          d > 100  ? '#FC4E2A' :
//          d > 50   ? '#FD8D3C' :
//          d > 20   ? '#FEB24C' :
//          d > 10   ? '#FED976' :
//                     '#FFEDA0';
// }


// Grabbing our GeoJSON data..
// d3.json(data_county, function(data) {
//   console.log(data);
//   // Creating a geoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "black",
//         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//         fillColor: getColor(feature.properties.NAME10),
//         fillOpacity: 1,
//         weight: 1.5
//       };
//     },
    // // Called on each feature
    // onEachFeature: function(feature, layer) {
    //   alert(feature.properties.CODP);
    //   // Set mouse events to change map styling
    //   layer.on({
    //     // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
    //     mouseover: function(event) {
    //       layer = event.target;
    //       layer.setStyle({
    //         fillOpacity: 0.9
    //       });
    //     },
  //       // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
  //       mouseout: function(event) {
  //         layer = event.target;
  //         layer.setStyle({
  //           fillOpacity: 0.5
  //         });
  //       },
  //       // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
  //       click: function(event) {
  //         myMap.fitBounds(event.target.getBounds());
  //       }
  //     });
  //     // Giving each feature a pop-up with information pertinent to it
  //     layer.bindPopup("<h1>" + feature.properties.NAME10 + "</h1> <hr> <h2>" + feature.properties.CODP + "</h2>");

  // }).addTo(myMap);
  




// ------ Earthquake legend —————
// let legend = L.control({
  // position: "bottomright"

// });

// // Then add all the details for the legend
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");

//   const d = [0, 1, 2, 3, 4, 5];
//   const colors = [
//     "#800026",
//     "#BD0026",
//     "#E31A1C",
//     "#FC4E2A",
//     "#FD8D3C",
//     "#FEB24C",
//     "FED976",
//     "FED976",

//   ];


// // Looping through our intervals to generate a label with a colored square for each interval.
//   for (var i = 0; i < d.length; i++) {
//     console.log(colors[i]);
//     div.innerHTML +=
//       "<i style='background: " + colors[i] + "'></i> " +
//       d[i] + (d[i + 1] ? "&ndash;" + d[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };

//   // Finally, we our legend to the map.
//   legend.addTo(map);










// // // Grabbing our GeoJSON data..
// // d3.json(link, function(data) {
// //   console.log(data);
// //   // Creating a geoJSON layer with the retrieved data
// //   L.geoJson(data, {
// //     // Style each feature (in this case a neighborhood)
// //     style: function(feature) {
// //       return {
// //         color: "white",
// //         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
// //         fillColor: chooseColor(feature.properties.Name10),
// //         fillOpacity: 0.5,
// //         weight: 1.5
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
