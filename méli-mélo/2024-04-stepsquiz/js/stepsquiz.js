/**
 * @title WET-BOEW Steps Quiz plugin
 * @overview Quiz pattern for use with the Steps Form plugin.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author ricokola
 */
( function( $, document ) {
"use strict";

//Detect the enhancement of the quiz
var instances = document.querySelectorAll( ".wb-steps.quiz" );
console.log("Variable instances");
console.log(instances);

//How many quiz instances in the page
instances.forEach ( (instance) => {
	let $instance = $( instance );

	// Calculate number of questions
	let numQuestion = $( "fieldset", $instance ).length;

	// Addition to UI (Ex: progress bar)
	$( "form", $instance ).prepend( "<p class='progressText' role='status'></p>" );
	$( "form", $instance ).prepend( "<progress class='progressBar' max='" + numQuestion + "'></progress>" );


});

var hideOtherSteps = function( e ) {
	// Get wb-steps component
	let steps = $( e.currentTarget ).parentsUntil( ".quiz" ).parent( ).get( 0 );

	// Find the steps form context and validate it is a quiz
	let currentTabId = $( "legend.wb-steps-active:first-child", steps ).parents().prevAll( ".steps-wrapper" ).length + 1;
	
	// Set number of questions
	let numQuestion = $( "fieldset", steps ).length;
	$( "p.progressText", steps ).text( currentTabId + " of  " + numQuestion );

	//Update progress bar
  	$( ".progressBar", steps ).val( currentTabId );

  	// Hide other steps that are not active
	$( ".steps-wrapper", steps ).removeClass( "hidden" );
	$( ".steps-wrapper:has( div.hidden )", steps ).addClass( "hidden" );

};

$( document ).on( "click", ".wb-steps.quiz .steps-wrapper div.buttons > :button", hideOtherSteps );

//Init
$( ".wb-steps.quiz" ).on( "wb-ready.wb-steps", hideOtherSteps );

} )( jQuery, document );
