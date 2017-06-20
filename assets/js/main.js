
//ejemplo extraído de ejercicio guiado APi 
function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});


	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}


	document.getElementById("encuentrame").addEventListener("click",buscar);
	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position : {lat: latitud, lng: longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: image
		});

		map.setZoom(17);
		map.setCenter({lat: latitud, lng: longitud});
	}

	var funcionError = function(error){
		alert("Tenemos problemas al encontrar tu ubicación");
	}

//autocompletado ejemplo extraído de google API 
	var origen = document.getElementById("origen");
	var autocomplete = new google.maps.places.Autocomplete(origen);
 	autocomplete.bindTo('bounds', map);

 	var llegada = document.getElementById("llegada");
	var autocomplete = new google.maps.places.Autocomplete(llegada);
 	autocomplete.bindTo('bounds', map);

	var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	var directionsService = new google.maps.DirectionsService();

	directionsDisplay.setMap(map);

        var onChangeHandler = function() {
         calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

     document.getElementById("ruta").addEventListener("click",onChangeHandler);
        
       /* 
		esta formula fue extraída de las Apis de google*/


	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: document.getElementById('origen').value,
			destination: document.getElementById('llegada').value,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Direction invalida ' + status);
			}
		});
	}
}


