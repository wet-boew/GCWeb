	/**
	 * @title WET-BOEW Distance plugin
	 * @overview Plugin contained to show an example of how to create your custom WET plugin
	 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
	 * @author donmcdill
	 */
	( function( $, window, wb ) {
	"use strict";
	/*
	 * Variable and function definitions.
	 * These are global to the plugin - meaning that they will be initialized once per page,
	 * not once per instance of plugin on the page. So, this is a good place to define
	 * variables that are common to all instances of the plugin on a page.
	 */
	var componentName = "distance-calculator",
		selector = "." + componentName,
		initEvent = "wb-init" + selector,
		$document = wb.doc,
		defaults = {},
		/**
		 * @method init
		 * @param {jQuery Event} event Event that triggered the function call
		 */
		init = function( event ) {
			// Start initialization
			// returns DOM object = proceed with init
			// returns undefined = do not proceed with init (e.g., already initialized)
			var elm = wb.init( event, componentName, selector ),
				$elm,
				settings;
			if ( elm ) {
				$elm = $( elm );
				// ... Do the plugin initialisation
				
				
						
				
				// Get the plugin JSON configuration set on attribute data-distance-calculator
				settings = $.extend(
					true,
					{},
					defaults,
					window[ componentName ],
					wb.getData( $elm, componentName )
				);
				// Call my custom event
				$elm.trigger( "distance-calculator", settings );
				// Identify that initialization has completed
				wb.ready( $elm, componentName );
			}
		};
	// Add your plugin event handler
	$document.on( "distance-calculator", selector, function( event, data ) {
		var elm = event.currentTarget,
		$elm = $( elm );
		
		// Function to get the distance in KM between each office begin
		function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2-lat1);  // deg2rad below
			var dLon = deg2rad(lon2-lon1); 
			var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; // Distance in km

			return d;
		}
		function deg2rad(deg) {
			return deg * (Math.PI/180)
		}
		function addCommas(nStr, number_seperator)
		{
			nStr += '';
			var x = nStr.split('.');
			var x1 = x[0];
			var x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + number_seperator + '$2');
			}
			
			return x1 + x2;
		}
		
		//Set filter event distance handler
		$elm.find(data.form).on( "submit", function(distEvent) {		
		
		var distForm = distEvent.currentTarget;

		var address = distForm.querySelector(data.location).value;
		var addressEnc = encodeURIComponent(address);

		var distCollection = elm.querySelector(data.section);
		var distCollectionItems = distCollection.querySelectorAll(data.selector);
		
		var distAPI = (wb.lang==="fr")?"https://geogratis.gc.ca/services/geolocation/fr/locate?q=":"https://geogratis.gc.ca/services/geolocation/en/locate?q=";
		
		// Start of geogratis location service call to the API
		$.getJSON(distAPI + addressEnc, function(json) {
			if ( json.length == 0 ) {
				console.log("Empty response from geogratis");
			}
			else {
			
			var longitude = json[0].geometry.coordinates[0];
			var latitude = json[0].geometry.coordinates[1];
			var global_nice_address = json[0].title;
			
			
			// Inserts the distance between the VAC offices and the location entered in each PO's variable array
			distCollectionItems.forEach( function(element) {
			
				let dist = element.querySelector(data.target);
				let distSort = element.querySelector(data.sort);
				
				if(typeof dist !== "undefined" && dist !== null && typeof distSort !== "undefined" && distSort !== null && typeof dist.dataset.distanceCoordinates !== "undefined" && dist.dataset.distanceCoordinates !== null){
				
					let coordinates = JSON.parse(dist.dataset.distanceCoordinates);
					let itemLongtitude = coordinates.longtitude;
					let itemLatitude = coordinates.latitude;
					let thousandSeparator = (wb.lang==="fr")?" ":",";
					let addressDist = getDistanceFromLatLonInKm(latitude,longitude,itemLatitude,itemLongtitude);
					
					distSort.innerHTML = Math.round(addressDist);
					dist.innerHTML = addCommas(Math.round(addressDist),thousandSeparator);	
				}				
		
			});
			
			if(typeof data.name !== "undefined" && data.name !== null){
				let titleArray = elm.querySelectorAll(data.name);
				titleArray.forEach(function(title){
					title.innerHTML = global_nice_address;
				});
			}
			if(typeof data.display === "object" && typeof data.display.selector !== "undefined" && typeof data.display.removeClass !== "undefined" && data.display.selector !== null && data.display.removeClass !== null){
				let visibleArray = elm.querySelectorAll(data.display.selector);
				visibleArray.forEach(function(elem){
					elem.classList.remove(data.display.removeClass);
				});
			}
			
			$elm.trigger( "wb-contentupdated", [{"source":componentName}] );
			
			}
		});
		
			return false;
		});
		
	} );
	// Bind the init event of the plugin
	$document.on( "timerpoke.wb " + initEvent, selector, init );
	// Add the timer poke to initialize the plugin
	wb.add( selector );
	} )( jQuery, window, wb );
