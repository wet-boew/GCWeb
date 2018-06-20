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
	authTrigger,
	patchDefault = {
		op: "move",
		path: "{base}",
		from: "{base}/{qval}"
	},

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
	executeAction = function( $elm, cValue, actions ) {

		var i, i_len, i_cache, cache_action,
			regMatchValue,
			pattern, cValueParsed,
			defaultValue;

		if ( !$.isArray( actions ) ) {
			actions = [ actions ];
		} else {
			actions = $.extend( [], actions );
		}

		// Fix any action that was defined as query dependent
		i_len = actions.length;
		for ( i = 0; i !== i_len; i += 1 ) {
			i_cache = actions[ i ];

			cache_action = i_cache.action;
			if ( !cache_action ) {
				continue;
			}

			regMatchValue = i_cache.match;
			defaultValue = i_cache.default;
			cValueParsed = false;

			// Abort if we try to match and there is no default set
			if ( regMatchValue && !defaultValue ) {
				throw "'match' and 'default' property need to be set";
			}

			// Validate the value if it match the regular expression / string pattern.
			if ( !!defaultValue && cValue.length && typeof regMatchValue === "string" ) {
				try {
					pattern = new RegExp( regMatchValue );
					cValueParsed = pattern.exec( cValue );

					// Fall back on default if no match found
					cValueParsed = !!cValueParsed ? cValueParsed : defaultValue;
				} catch ( e ) { }
			}

			if ( !i_cache.qval && cValueParsed ) {
				i_cache.qval = cValueParsed;
			}


			switch ( cache_action ) {

			case "patch":
				var ops = i_cache.patches,
					basePntr = i_cache.base || "/";
				if ( !ops ) {
					ops = [ patchDefault ];
					i_cache.cumulative = true;
				}
				if ( !$.isArray( ops ) ) {
					ops = [ ops ];
				}
				ops = patchFixArray( ops, i_cache.qval, basePntr );
				i_cache.patches = ops;
				break;
			case "ajax":
				if ( i_cache.trigger && $elm[ 0 ] !== authTrigger ) {
					i_cache.trigger = false;
				}
				i_cache.url = replaceMappingKeys( i_cache.url, i_cache.qval );
				break;
			case "tblfilter":
				i_cache.value = replaceMappingKeys( i_cache.value, i_cache.qval );
				break;
			default:

				// Just do the action as defined.
				break;

			}
		}


		// Send the list of actions to be dispatched by the actionmng
		$elm.trigger( {
			type: "do.wb-actionmng",
			actions: actions
		} );
	},
	patchFixArray = function( patchArray, val, basePointer ) {

		var i, i_len = patchArray.length, i_cache,
			patchesFixed = [], patch_cache;

		if ( !basePointer ) {
			basePointer = "/";
		}

		for ( i = 0; i !== i_len; i += 1 ) {
			i_cache = patchArray[ i ];
			patch_cache = $.extend( { }, i_cache );
			if ( i_cache.path ) {
				patch_cache.path = replaceMappingKeys( i_cache.path, val, basePointer );
			}
			if ( i_cache.from ) {
				patch_cache.from = replaceMappingKeys( i_cache.from, val, basePointer );
			}
			if ( i_cache.value ) {
				patch_cache.value = replaceMappingKeys( i_cache.value, val, basePointer );
			}
			patchesFixed.push( patch_cache );
		}
		return patchesFixed;
	},
	replaceMappingKeys = function( search, val, basePointer ) {
		if ( !val ) {
			return search;
		}
		if ( !basePointer ) {
			return search.replace( /\{qval\}/, val );
		} else {
			return search.replace( /\{qval\}/, val ).replace( /\{base\}/, basePointer );
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
			executeAction( $elm, cValue, settingQuery );
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
