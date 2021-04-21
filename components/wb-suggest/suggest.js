/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * @author: duboisp
 * @description: Load suggestions from an array of string in a JSON file.
 *
 */
( function( $, document, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "wb-suggest",
	selector = "[data-" + componentName + "]",
	initEvent = "wb-init." + componentName,
	jsonFetched = "json-fetched.wb",
	wait,
	waitInterval = 250, // In-bettween typing delay before refreshing the suggested list.
	maxWaitLoading = 5, // Number of time of waitInterval the plugin are allow wait for getting JSON suggestions

	// Remove accent and normalize the string
	//
	// str: String to be normalized
	// return: A normalized string with no accent
	//
	unAccent = function( str ) {
		return str.normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
	},

	// Remove children of an element except template element
	//
	// this: element that need to emptied
	//
	emptyExceptTemplate = function() {
		var elm,
			children = this.children,
			i;

		for ( i = children.length - 1; i > 0; i = i - 1 ) {
			elm = children[ i ];
			if ( elm.nodeType === 1 && elm.nodeName !== "TEMPLATE" ) {
				this.removeChild( elm );
			}

		}
	},

	// Add suggested options to the datalist
	//
	// this: datalist instance
	// filter: filter items that match the suggestion
	// limti: (for overwride) limit number of result
	// attSuggestions: (for overwride) Array of string with suggestion
	//
	addDataListOptions = function( filter, limit, attrSuggestions ) {
		var suggestions = attrSuggestions || JSON.parse( this.dataset.wbSuggestions || [] ),
			filterType = this.dataset.wbFilterType || "any",
			filterRegExp,
			lenSuggestions = suggestions.length,
			idx, suggestion, suggestionNorm,
			clone, option,
			optionAddedUnAccent = [],
			currentOptions = this.childNodes,
			j, j_cache, j_len = currentOptions.length - 1,
			currentOptionValue,
			$input = $( "[list=" + this.id + "]" ),
			input = $input.get( 0 );

		if ( !suggestions.length && maxWaitLoading ) {
			maxWaitLoading = maxWaitLoading - 1;
			if ( wait ) {
				clearTimeout( wait );
			}
			wait = setTimeout( addDataListOptions( filter, limit, attrSuggestions ), waitInterval );
		}
		if ( !limit ) {
			limit = parseInt( this.dataset.wbLimit || lenSuggestions );
		}

		// Set the filter type
		if ( filter ) {

			switch ( filterType ) {
			case "startWith":
				filter = "^" + filter;
				break;
			case "word":
				filter = "^" + filter + "|\\s" + filter;
				break;
			case "any":
			default:

				// Keep the filter as is for the regular expression check
				break;
			}

			filterRegExp = new RegExp( filter, "i" );
		}

		if ( !filter || filter.length < 2 ) {
			emptyExceptTemplate.call( this );
			currentOptions = [];
		} else {

			// Remove existing option that don't match
			for ( j = j_len; j !== 0; j = j - 1 ) {

				j_cache = currentOptions[ j ];

				if ( j_cache.nodeType === 1 && j_cache.nodeName === "OPTION" ) {

					currentOptionValue = j_cache.getAttribute( "value" );

					if ( currentOptionValue && currentOptionValue.match( filterRegExp ) ) {
						optionAddedUnAccent.push( unAccent( currentOptionValue ) );
					} else {
						this.removeChild( j_cache );
					}
				}
			}
		}

		// Get the template
		var template = this.querySelector( "template" );

		// IE11 support
		// Polyfil the template, like if added after the polyfill or this a sub-template in a template container that wasn't polyfill
		// FYI - The polyfill is loaded from the data-json plugin
		if ( template && !template.content ) {
			wb.tmplPolyfill( template );
		}

		for ( idx = 0; idx < lenSuggestions && optionAddedUnAccent.length < limit; idx += 1 ) {
			suggestion = suggestions[ idx ];
			suggestionNorm = unAccent( suggestion ); // To ensure to don't have duplicate entry in the suggestion

			if ( optionAddedUnAccent.indexOf( suggestionNorm ) === -1 && ( !filter || suggestion.match( filterRegExp ) ) ) {

				optionAddedUnAccent.push( suggestionNorm );

				if ( template ) {
					clone = template.content.cloneNode( true );
					option = clone.querySelector( "option" );
				} else {
					clone = document.createDocumentFragment();
					option = document.createElement( "OPTION" );
					clone.appendChild( option );
				}

				option.setAttribute( "label", suggestion );
				option.setAttribute( "value", suggestion );

				this.appendChild( clone );
			}
		}

		// For the datalist polyfill like IE11
		$input.trigger( "wb-update.wb-datalist" );

		// To show suggestion on IE11, do not seem to conflict with other browser
		input.value = input.value; // eslint-disable-line
	},

	// Initiate suggestion from received JSON file
	//
	// suggestion: JSON string array that was fetched
	// this: the datalist reference
	initSuggestion = function( suggestions ) {

		// Attach the JSON list to the datalist element
		this.dataset.wbSuggestions = JSON.stringify( suggestions );

		// Remove the reference as it not needed anymore
		delete this.dataset.wbSuggest;

		// Add the suggested options
		addDataListOptions.call( this, document.querySelector( "[list=" + this.id + "]" ).value );
	},

	inputFocus = function( event ) {

		var target = event.target,
			datalist = document.getElementById( target.getAttribute( "list" ) );

		// IE11 add support for string normalization
		Modernizr.load( {
			test: Modernizr.stringnormalize,
			nope: [
				"site!deps/unorm" + wb.getMode() + ".js"
			]
		} );

		// Load the JSON file
		$( datalist ).trigger( {
			type: "json-fetch.wb",
			fetch: {
				url: datalist.dataset.wbSuggest
			}
		} );
	},

	inputChange = function( event ) {
		var target = event.target,
			datalistElm = document.getElementById( target.getAttribute( "list" ) ),
			query = event.target.value,
			which = event.which;

		if ( wait ) {
			clearTimeout( wait );
		}

		switch ( event.type ) {
		case "change":
			wait = setTimeout( addDataListOptions.bind( datalistElm, query ), waitInterval );
			break;
		case "keyup":
			if ( !( event.ctrlKey || event.altKey || event.metaKey ) ) {

				// Backspace, Spacebar, a - z keys, 0 - 9 keys punctuation, and symbols
				if ( which === 8 ||  which === 32 || ( which > 47 && which < 91 ) ||
					( which > 95 && which < 112 ) || ( which > 159 && which < 177 ) ||
					( which > 187 && which < 223 ) ) {

					wait = setTimeout( addDataListOptions.bind( datalistElm, query ), waitInterval );
				}
			}
		}
	},

	init = function( event ) {

		var elm = wb.init( event, componentName, selector ),
			inputSelector = "[list=" + event.target.id + "]";

		if ( elm ) {
			Modernizr.addTest( "stringnormalize", "normalize" in String );

			//
			// Add the trigger to load the JSON on when those input get focus.
			// This avoid to download the JSON when it is not needed by the input
			//
			$document.one( "focus", inputSelector, inputFocus );

			// Refresh the suggestion option based from user input if there is a limit set
			if ( elm.dataset.wbLimit || elm.dataset.wbFilterType ) {
				$document.on( "change keyup", inputSelector, inputChange );
			}

			// Initialization has completed
			wb.ready( $( elm ), componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent + " " + jsonFetched, selector, function( event ) {

	var eventTarget = event.target;

	if ( event.currentTarget === eventTarget ) {

		switch ( event.type ) {
		case "timerpoke":
		case "wb-init":
			init( event );
			break;
		case "json-fetched":
			initSuggestion.call( eventTarget, event.fetch.response );
			break;
		}
	}
	return true;
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, document, wb );
