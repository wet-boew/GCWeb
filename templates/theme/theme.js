/**
 * @title WET-BOEW Follow us component
 * @overview Plugin used to replace Twitter with "X" - Deprecated
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */
( function( $, window, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "page-type-theme",
	selector = "." + componentName,
	initEvent = "wb-init " + selector,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );

		if ( elm && event.currentTarget === event.target ) {

			let themeMenuBtn = document.querySelector( "#menuBtn" ),
				themeMenuIcon = themeMenuBtn.querySelector( ".glyphicon" ),
				themeNavUL = document.querySelector( "#gridContainer > nav ul" ),
				activePageLink = themeNavUL.querySelector( ".active a" );

			themeNavUL.id = themeNavUL.id || wb.getId();
			activePageLink.setAttribute( "aria-current", "page" );
			themeMenuBtn.setAttribute( "aria-controls", themeNavUL.id );
			themeMenuBtn.setAttribute( "aria-expanded", "false" );
			themeMenuIcon.setAttribute( "aria-hidden", "true" );

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// On click of the menu button
$document.on( "click", "#menuBtn", function( event ) {
	let themeMenuBtn = event.currentTarget;

	if ( themeMenuBtn.getAttribute( "aria-expanded" ) === "true" ) {
		themeMenuBtn.setAttribute( "aria-expanded", "false" );
		themeMenuBtn.classList.remove( "expanded" );
	} else {
		themeMenuBtn.setAttribute( "aria-expanded", "true" );
		themeMenuBtn.classList.add( "expanded" );
	}
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
