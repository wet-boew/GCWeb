/**
 * @title WET-BOEW Collection sort plugin
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
let wait;
var componentName = "collection-sort",
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
								
			
			// Get the plugin JSON configuration set on attribute data-collection-sort
			settings = $.extend(
				true,
				{},
				defaults,
				window[ componentName ],
				wb.getData( $elm, componentName )
			);
			// Call my custom event
			$elm.trigger( "collection-sort", settings );
			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};
// Add your plugin event handler
$document.on( "collection-sort", selector, function( event, data ) {
	var elm = event.currentTarget;

	function SortCollection(){

		var sortContainers = elm.querySelectorAll(data.section);
		
		sortContainers.forEach(function(container){
			
			var sortItems = container.querySelectorAll(data.selector); 		
			
			let sortArray = [];
			let sortDestinationArray = [];
			
			sortItems.forEach( function (element) {
				sortDestinationArray.push(element.parentElement);
				
				let sortObj = { 
					"elm" : element,
					"sortVal" : ""
				};
					
				sortArray.push(sortObj);
			});

			data.sort.forEach( function(sort) {
				
				sortArray.forEach( function (sortObj) {	
					sortObj.sortVal = sortObj.elm.querySelector(sort.selector).innerHTML;			
				});
								
				if(sort.type === "numeric"){
					if(sort.order === "desc")
						sortArray.sort((a,b) => b.sortVal - a.sortVal);
					else
						sortArray.sort((a,b) => a.sortVal - b.sortVal);
				}else{
					if(sort.order === "desc")
						sortArray.sort((a,b) => b.sortVal.localeCompare(a.sortVal));
					else
						sortArray.sort((a,b) => a.sortVal.localeCompare(b.sortVal));	
				}
			});
			
			sortArray.forEach(function(element, index) {
				sortDestinationArray[index].append(element.elm);
			});
		
		});
	}
	if(data.section && data.selector && data.sort){
		SortCollection();
		
		$document.on( "wb-contentupdated", selector, function( event, data )  {
			SortCollection();	
		});
	}		
});


// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );
// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
