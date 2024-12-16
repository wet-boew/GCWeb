/**
 * @title GCWeb Checklist plugin
 * @overview Plugin contained to show an example of a custom GCWeb checklist plugin
 * @license wet-boew.github.io/gcweb/License-en.html / wet-boew.github.io/gcweb/Licence-fr.html
 * @author @delisma
 */
window.addEventListener( "DOMContentLoaded", function( event ) {
( function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "gc-checklist",
	selector = ".provisional." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {
		var elm = wb.init( event, componentName, selector ),
			$elm;

			// settings;

		if ( elm ) {
			var $elm = $( elm );

			$elm.trigger( "click", function() {
			} );
			wb.ready( $elm, componentName );
		}
	};

	// Add your plugin event handler
$document.on( "click", selector + " input[type=checkbox]", function( event ) {
	var parent = $( event.target ).parentsUntil( selector ).parent(),
		$parent = $( parent );

	if ( $parent.find( "input[type=checkbox]:not(:checked)" ).filter( "[required]" ).length ) {

		// Failure state
		$parent.find( ".output .success-message" ).addClass( "hidden" );
		$parent.find( ".output .failure-message" ).removeClass( "hidden" );
	} else {

		// Success state
		$parent.find( ".output .success-message" ).removeClass( "hidden" );
		$parent.find( ".output .failure-message" ).addClass( "hidden" );
	};
} );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
});
