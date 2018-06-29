/**
 * @title WET-BOEW Exit link
 * @overview Generate an exit link overlay and empty navigation history when clicked.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
( function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-exitlink",
	selector = ".wb-exitlink",
	initEvent = "wb-init." + componentName,
	$document = wb.doc,
	haveRun = false,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		var elm = wb.init( event, componentName, selector ),
			$elm;

		// Ensure this plugin are only running once and can only be configured on a anchor element.
		if ( !haveRun && elm && elm.nodeName === "A" ) {
			haveRun = true;
			
			$elm = $( elm );

			// Create an overlay
			var $cloneAnchor = $elm.clone().removeAttr( "id" ).attr( "class", "btn btn-success btn-lg " + componentName ),
				overlayID = wb.getId(),
				$ui = $( "<div id='" + overlayID + "' class='wb-overlay modal-content overlay-def wb-bar-b'><div class='container'><div class='row'><div class='col-xs-12'><p class='mrgn-tp-md'></p></div></div></div></div>" ),
				$parent = $elm.parent();

			$ui.insertAfter( $parent );
			$cloneAnchor.appendTo( "#" + overlayID + " p", $ui );

			$parent.addClass( "wb-inview" ).attr( "data-inview", overlayID );
			
			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};

// Erease the browser history
$document.on( "click", selector, function( event, data ) {
	
	if ( event.currentTarget.nodeName === "A" ) {
		
		// Removes the current page from the session history and navigates to the given URL.
		location.replace( event.currentTarget.href );
		return false;
	}
} );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
