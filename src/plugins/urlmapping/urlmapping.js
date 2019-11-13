/**
 * @title WET-BOEW URL mapping
 * @overview Execute pre-configured action based on url query string
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
var componentName = "wb-urlmapping",
	selector = "[data-" + componentName + "]",
	initEvent = "wb-init." + componentName,
	doMappingEvent = "domapping." + componentName,
	$document = wb.doc,
	authTrigger, // Flag to prevent instation of WET no more than twice by page load

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

			// Only allow the first wb-urlmapping instance to trigger WET
			if ( !authTrigger ) {
				authTrigger = elm;
			}

			// Identify that initialization has completed
			wb.ready( $elm, componentName );

			if ( !wb.isReady ) {

				// Execution of any action after WET is ready
				$document.one( "wb-ready.wb", function( ) {
					$elm.trigger( doMappingEvent );
				} );
			} else {
				$elm.trigger( doMappingEvent );
			}
		}
	},
	getUrlParams = function() {

		// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript#answer-2880929
		var urlParams = {},
			pl = /\+/g, // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function( s ) {
				return decodeURIComponent( s.replace( pl, " " ) );
			},
			query = window.location.search.substring( 1 ),
			match = search.exec( query );

		while ( match ) {
			urlParams[ decode( match[ 1 ] ) ] = decode( match[ 2 ] );
			match = search.exec( query );
		}

		return urlParams;
	};

$document.on( doMappingEvent, selector, function( event ) {

	var $elm = $( event.target ),
		urlParams = getUrlParams(),
		cKey, cValue, settingQuery,
		settings = $.extend( {}, window[ componentName ] || { }, wb.getData( $elm, componentName ) );

	for ( cKey in urlParams ) {
		cValue = urlParams[ cKey ];
		settingQuery = settings[ cKey + "=" + cValue ] || settings[ cKey ];

		if ( typeof settingQuery === "object" ) {

			// Send it to the action manager to get proccessed with the action "withInput"
			$elm.trigger( {
				type: "do.wb-actionmng",
				actions: {
					action: "withInput",
					actions: settingQuery,
					cValue: cValue,
					dntwb: $elm[ 0 ] !== authTrigger
				}
			} );

			if ( !settings.multiplequery ) {
				break;
			}
		}
	}
} );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
