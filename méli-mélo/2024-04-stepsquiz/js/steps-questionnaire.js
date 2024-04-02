/**
 * @title WET-BOEW Charts plugin
 * @overview Addition of a questionnaire pattern to the steps component
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author ricokola
 */
( function( $, window, wb ) {
"use strict";
/*
	* Variable and function definitions.
	* These are global to the plugin - meaning that they will be initialized once per page,
	* not once per instance of plugin on the page. So, this is a good place to define
	* variables that are common to all instances of the plugin on a page.
	*/

var componentName = "steps-questionnaire",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {
		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );
		
		if ( elm ) {
			console.log("2");
			let formId = "#quiz",
				//progressBar = ".progressArea",
				numSteps = $( formId + " fieldset" ).length,
				hideOtherSteps = function( e ) {
					let currentTab = $( "legend.wb-steps-active:first-child" ).parents().prevAll( ".steps-wrapper" ).length + 1;
					//$( progressBar + " progress" ).val( currentTab );
					//$( progressBar + " [data-fill=step-counter]" ).html( currentTab );

					$( ".steps-wrapper" ).removeClass( "hidden" );
					$( ".steps-wrapper:has(div.hidden)" ).addClass( "hidden" );
				};
				/*initProgress = function(e) {
				  $( progressBar + " progress" ).attr( "max", numSteps );
					$( progressBar + " [data-fill=step-max]" ).html( numSteps );
				};*/
				console.log("3");
			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
			console.log("4");
		}
	};
console.log(componentName);
console.log(selector);
// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );
console.log("6");
// Hide other steps on button click
//$( document ).on( "click", ".steps-wrapper div.buttons > :button", hideOtherSteps );

// Hide other steps when wb-steps is initialized
//$( ".wb-steps" ).on( "wb-ready.wb-steps", hideOtherSteps );
//$( ".wb-steps" ).on( "wb-ready.wb-steps", initProgress );

// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
