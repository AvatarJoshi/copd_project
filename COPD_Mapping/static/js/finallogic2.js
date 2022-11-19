// Creating map object
var myMap = L.map("map", {
  center: [38.50445, -98.39784],
  zoom: 5
});


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Create variable to hold map data
var data_map= "static/data/data_map.geojson";

// Create function to add color to counties based on COPD level
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
d3.json(data_map).then(function(data) {
  console.log(data);
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case counties)
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
      layer.bindPopup("<b>County:</b>" + feature.properties.County + "<br><b>State:</b>" + feature.properties.State + "<br><b> Levels of COPD:</b> " + feature.properties.Levels_COPD + "%" + "<br><b> Levels of Smoker:</b> " + feature.properties.Levels_Smokers + "%");

    }

  }).addTo(myMap);
});

// -- Ledend --

const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  const div = L.DomUtil.create('div', 'info legend');
  const grades = [0, 3, 6, 9, 12, 15];
  const texts = ["&nbsp; 0.1 - &nbsp;3.0", "&nbsp; 3.1 -&nbsp; 6.0", "&nbsp; 6.1 -&nbsp; 9.0", "&nbsp; 9.1 - 12.0", "12.1 - 15.0", "15.0+"];
  const labels = [];
  let grade, txt;

  for (let i = 0; i < grades.length; i++) {
    grade = grades[i];
    txt = texts[i]

    labels.push(`<i style="background:${getColor(grade + 1)}"></i> ${txt}`);
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(myMap);


