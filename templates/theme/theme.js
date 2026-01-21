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
	themeMenuBtn,
	themeNav,
	themeNavUL,
	elementsToHide = "#theme-content, #theme-features, .pagedetails, .gc-contextual, .gc-main-footer",

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
			themeMenuBtn = document.querySelector( "#menu-btn" );
			themeNav = document.querySelector( "#theme-nav" );
			themeNavUL = themeNav.querySelector( "ul" );
			elementsToHide = document.querySelectorAll( elementsToHide );

			// Set attributes
			themeNavUL.id = themeNavUL.id || wb.getId();
			themeMenuBtn.setAttribute( "aria-controls", themeNavUL.id );
			themeMenuBtn.setAttribute( "aria-expanded", "false" );

			// Highlight the current page in the menu
			$( themeNav ).trigger( "navcurr.wb" );
			themeNavUL.querySelector( ".wb-navcurr" )?.setAttribute( "aria-current", "page" );

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	},
	toggleMenu = function() {
		let expanded = themeMenuBtn.getAttribute( "aria-expanded" ) === "true";
		themeMenuBtn.setAttribute( "aria-expanded", !expanded );
		themeMenuBtn.classList.toggle( "expanded", !expanded );
		elementsToHide.forEach( element => {
			element.classList.toggle( "hidden-xs", !expanded );
			element.classList.toggle( "hidden-sm", !expanded );
		});
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// On click of the menu button
$document.on( "click", "#menu-btn", function() {
	toggleMenu();
} );

// Close menu on Escape key and restore hidden elements
$document.on( "keydown", function( event ) {
	var key = event.key || event.keyCode;
	if ( key === "Escape" || key === "Esc" || key === 27 ) {
		if ( themeMenuBtn && themeMenuBtn.getAttribute( "aria-expanded" ) === "true" ) {
			toggleMenu();
		}
	}
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
