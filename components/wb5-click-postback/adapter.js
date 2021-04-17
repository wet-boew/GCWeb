/**
 * @title WB5 Click postback adapter
 * @overview WB5 Click postback adapter toward wb-postback plugin
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
var componentName = "adapter-wb5-click",
	selector = "[data-wb5-click][data-toggle]",
	initEvent = "wb-init." + componentName,
	wbPostbackClass = "wb-postback",
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm;

		if ( elm ) {
			$elm = $( elm );

			// Extract info from "wb5-click" and "wb-toggle"
			var command = $elm.data( "wb5-click" ).split( "@" ),
				action = command[ 0 ],
				cmdSelector = command[ 1 ],
				$webForm = $( cmdSelector ),
				dtToggle = wb.getData( $elm, "toggle" );

			// Abort if not postback or Selector is not a form
			if ( action !== "postback" || $webForm[ 0 ].nodeName !== "FORM" || !dtToggle.selector ) {

				console.log( "Init failed for adapter wb5 click" );
				wb.ready( $elm, componentName );
				return;
			}

			// Implement the wb-postback into the form
			$webForm.addClass( wbPostbackClass );
			$webForm.attr( "data-" + wbPostbackClass,  JSON.stringify( { success: dtToggle.selector, failure: dtToggle.selector } ) );
			$webForm.parent().removeClass( "gc-rprt-prblm-tggl" ); // Workaround to make wb-postback work for the Report a problem use case.

			// Remove wb5-click and wb-toggle feature on the button
			$elm
				.removeAttr( "data-wb5-click" )
				.removeAttr( "toggle" )
				.removeAttr( "data-toggle" )
				.removeAttr( "aria-controls" )
				.removeClass( "wb-toggle" );


			// Initiate the wb-postback plugin
			$webForm.trigger( "wb-init." + wbPostbackClass );

			// Let report the adapter is now ready
			wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
