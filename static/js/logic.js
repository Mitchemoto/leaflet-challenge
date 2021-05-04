// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 3
});

// Adding tile layer to the map, create as variable incase needed
var streetMap =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
	});

streetMap.addTo(myMap);

//base url for json data pull
var baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//using url as variable incase need to adjust to store query variable above
var url = baseUrl

// start d3.json function 
d3.json(url, function(earthquakes) {
	console.log(earthquakes)

//create functions for the circles to define ranges
//create style element
	function mapStyle(feature){
		return{
		      "opacity": 1,
      		  "fillOpacity": .75,
		      "fillColor": magColor(feature.properties.mag),
		      "color": "#000000",
		      "radius": magRadius(feature.properties.mag),
		      "stroke": true,
		      "weight": 0.5	
		};
	}
	
//create color scale for magitudes
	function magColors(mag){
		switch (true){
			case mag > 5:
				return "#ff3300";
			case mag > 4:
				return "#ff0066";
			case mag > 3:		
				return "#cc00ff";
			case mag > 2:
				return "#66ffff";
			case mag > 1:
				return "#99ff33";
			default:
				return "#00ff00";

		};
	}
//create adjusting radius for circle based on magnitude *5
	function magRadius(mag){
		if(mag===0){
			return 1;
		}
		return mag*5;
	}

// use geojson to add the markers to the map
	L.geoJson(earthquakes, {
		//append the markers via geojson latlng
		function(feature, latlng){
			return L.circleMarker(latlng);
		},
		//apply style elements to the markers
		mapStyle,
		// bind popup with location and magnitude details
		function(feature, detail){
			detail.bindPopup("<h2> Location: "+ feature.properties.place +"</h2> <br> <h2> Magnitude: " + feature.properties.mag+"</h2>")
		}
		//	add to my map
	}).addTo(myMap);

})



