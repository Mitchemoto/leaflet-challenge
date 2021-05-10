// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [45.05,-122.67],
  zoom: 4
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

//base url for json data pull ()
var baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//using url as variable incase need to adjust to store query variable above
var url = baseUrl



// start d3.json function 
d3.json(url, function(eqData) {
	// console.log(earthquakes)
	createFeatures(eqData.features);
//using the d3.json data, create function to bind pop, and add circle layer
	function createFeatures(eqData){
	var earthquakes = L.geoJson(eqData,{
		//use onEachFeature function to bind popup/data to each created feature
		onEachFeature(feature,layer){
			//bindpop to layer, with html styling to read correctly into the popup
			layer.bindPopup("<h2> Location: "+ feature.properties.place +"</h2> <hr> <h2> Magnitude: " 
				+ feature.properties.mag+"</h2>");
		},
		//A Function defining how GeoJSON points spawn Leaflet layers.
		// It is internally called when data is added, passing the GeoJSON point feature and its LatLng. 
		pointToLayer(feature,latlng){
			return new L.circle(latlng,
			{
      		  fillOpacity: .75,
		      fillColor: magColors(feature.properties.mag),
		      color: "#000000",
		      radius: magRadius(feature.properties.mag),
		      stroke: true,
		      weight: 0.5	
			})
		}
	}).addTo(myMap);

	//setup the legend
	var legend= new L.control({position: "bottomright"});

	legend.onAdd = function(myMap){
		//create div var using domUtil
		var div= L.DomUtil.create("div","info legend");
			div.innerHTML +="<h3>Legend</h3>";
			div.innerHTML +='<i style="background:#99ff33"></i><span>0</span><br>';
			div.innerHTML +='<i style="background:#00ff00"></i><span>1</span><br>';
			div.innerHTML +='<i style="background:#66ffff"></i><span>2</span><br>';
			div.innerHTML +='<i style="background:#cc00ff"></i><span>3</span><br>';
			div.innerHTML +='<i style="background:#ff0066"></i><span>4</span><br>';
			div.innerHTML +='<i style="background:#ff3300"></i><span>5</span><br>';

		return div;
	};
	// earthquake.addTo(myMap)
	legend.addTo(myMap);
};

//create color scale for magitudes using else if statements
	function magColors(magnitude){
		if (magnitude> 5){
				return "#ff0066"
			}else if
			(magnitude> 4){
				return "#00ff00"
			} else if
			(magnitude> 3){		
				return "#cc00ff"
			} else if
			(magnitude> 2){
				return "#66ffff"
			} else if
			(magnitude> 1){
				return "#99ff33"
			} else{
				return "#00ff00"
			}

		};
//create adjusting radius for circle based on magnitude *500
	function magRadius(magnitude){
		return magnitude*30000;
	}

	// createFeatures(eqData.features);
});