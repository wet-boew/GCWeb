/**
 * @title WET-BOEW Hello world plugin
 * @overview Plugin contained to show an example of how to create your custom WET plugin
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
var componentName = "wb-bubble",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * Initiate chat wizard bubble
	 * @method adjustBubbleMargin
	 * @param {jQuery DOM element} $selector Element which is the actual bubble
	 */
	adjustBubbleMargin = function( $selector ) {

		var $footer = $( "#wb-info" );

		// Hide basic form on load, show chat bubble instead
		$selector.fadeIn( "slow" );

		// Add some white space over the footer for the bubble to sit
		$footer.addClass( componentName + "-mrgn" );

		// Ensure that the bubble does not go passed the footer
		if ( $footer.length ) {

			// Keep the bubble sticky while scrolling Y until user reaches the footer
			var stickyUntilFooter = function( $element ) {


				// Equals to bubble default bottom value in CSS
				var bottomY = $( "main p" ).height();
				var $window = $( window );
				
				if ( $window .scrollTop() >= $document.outerHeight() - $window .outerHeight() - $footer.outerHeight() ) {
					$element.css( {
						bottom: ( $footer.outerHeight() - ( $document.outerHeight() - $window.outerHeight() - $window.scrollTop() ) + bottomY )
					} );
				} else {
					$element.css( {
						bottom: bottomY
					} );
				}
			};

			// Correct bubble positionning on load, on resize an on Y scroll if necessary
			stickyUntilFooter( $selector );

			$( window ).on( "resize scroll", function() {
				stickyUntilFooter( $selector );
			} );
		} else {
			$( "main" ).after( "<footer id=\"wb-info\" class=\"" + componentName + "-mrgn" + "\"></footer>" );
		}

		// Close notification aside bubble
		$( ".notif-close", $selector ).on( "click", function( event ) {
			event.preventDefault();
			$( this ).parent().hide();
			$selector.focus();

			// Do not show notification on next load
			sessionStorage.setItem( componentName + "-notif", 1 );
		} );
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

			var $bubbleElm = $( "<div class='" + componentName + "-wrap' id=\"adafds\"></div>" );
			$elm.wrap($bubbleElm);

			var li = document.createElement( "li" );
			li.className = "wb-slc";

			// Append the Basic HTML version link version
			var data_wb_doaction_json = JSON.parse( $elm.attr( "data-wb-doaction" ) );

			if ( data_wb_doaction_json ) {
				li.innerHTML = "<button  data-wb-doaction='{ \"action\": \"open\", \"source\": " + "\"" + data_wb_doaction_json.source + "\"" + " }' class=\"wb-sl\" >" + $elm.text() + "</button>";
			}

			// Add linke to the top page skip link.
			var list = document.getElementById( "wb-tphp" );
			list.insertBefore( li, list.childNodes[ 0 ] );

			// Initiate chat wizard bubble
			adjustBubbleMargin( $elm.parent() );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};

// Open overlay from the notification message
$( ".notif", selector ).on( "click", function() {
	var $link = $( selector + "-link" );
	$link.click();
} );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
