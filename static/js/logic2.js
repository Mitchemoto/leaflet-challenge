// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
// var myMap = L.map("map", {
//   center: [45.05,-122.67],
//   zoom: 4
// });

// // Adding tile layer to the map, create as variable incase needed
// var streetMap =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// 	});

// streetMap.addTo(myMap);

// //base url for json data pull ()
// var baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// //using url as variable incase need to adjust to store query variable above
// var url = baseUrl

// var geojson
// // Grab data with d3
// d3.json(url, function(eqdata) {
// 		createFeatures(eqData.features);
// 		 //A Function defining how GeoJSON points spawn Leaflet layers.
// 	geojson=(
// 		// It is internally called when data is added, passing the GeoJSON point feature and its LatLng. 
// 	function pointToLayer(feature,latlng){
// 		return new L.circle(latlng,
// 			{
//       		  fillOpacity: .75,
// 		      fillColor: magColors(feature.properties.mag),
// 		      color: "#000000",
// 		      radius: magRadius(feature.properties.mag),
// 		      stroke: true,
// 		      weight: 0.5	
// 			})

// 	// Binding a pop-up to each layer
// 	function onEachFeature(feature, layer){
// 		//bindpop to layer, with html styling to read correctly into the popup
// 		layer.bindPopup("Location: "+ feature.properties.place +"<br> Magnitude:<br>"+ 
// 		 + feature.properties.mag);
// 	 	}
// 	// }).addTo(myMap);
// //create color scale for magitudes using else if statements
// 	function magColors(magnitude){
// 		if (magnitude> 5){
// 				return "#ff3300"
// 			}else if
// 			(magnitude> 4){
// 				return "#ff0066"
// 			} else if
// 			(magnitude> 3){		
// 				return "#cc00ff"
// 			} else if
// 			(magnitude> 2){
// 				return "#66ffff"
// 			} else if
// 			(magnitude> 1){
// 				return "#99ff33"
// 			} else{
// 				return "#00ff00"
// 			}

// 		};
// 	//create adjusting radius for circle based on magnitude *500
// 	function magRadius(magnitude){
// 		return magnitude*30000;
// 	}
// 	}.addTo(myMap);

// 	//setup the legend
// 	var legend=L.control({position: "bottomRight"});

// 	legend.onAdd = function(){
// 		//create div var using domUtil
// 		var div= L.DomUtil.create("div","info legend");
// 		var mags = [0,1,2,3,4,5];
// 		var colors=["#00ff00","#99ff33","#66ffff","#cc00ff","#ff0066","#ff3300"];
// 		var labels = [];

// 	//Add legend header and markers
// 	var legendInfo="<h1>Legend</h1>"+
// 		"<div class=\"lables\>"+
// 			"div class=\"min\">"+mags[0]+"</div>"+
// 			"div class=\"max\">"+mags[mags.length-1]+"</div>"+
// 		"</div>";

// 	div.innerHTML=LegendInfo;

// 	grades.forEach(function(grades,index){
// 		labels.push("<li style=\"background-color:"+colors[index]+"\"></li>");	
// 	});

// 	div.innerHTML += "<ul>"+labels.join("")+"<ul>";
// 	return div;
// 	};
// 	legend.addTo(myMap);

// });