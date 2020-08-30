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
	defaults = {},

	/**
	 * Initiate chat wizard bubble
	 * @method initiateBubble
	 * @param {jQuery DOM element} $selector Element which is the actual bubble
	 */
	initiateBubble = function( $selector ) {

		var $footer = $( "#wb-info" ),
			$link = $( selector + "-link", $selector );

		// Change to custom avatar if provided
		// TO do list to get configurable avatar
		/*if ( datainput.header.avatar ) {
			$link.css( "background-image", "url(" + datainput.header.avatar + ")" );
		}*/

		// Hide basic form on load, show chat bubble instead
		$selector.fadeIn( "slow" );

		// Add some white space over the footer for the bubble to sit
		$footer.addClass( componentName + "-mrgn" );
		//console.log($selector);
		// Ensure that the bubble does not go passed the footer
		if ( $footer.length ) {

			// Keep the bubble sticky while scrolling Y until user reaches the footer
			var stickyUntilFooter = function( $element ) {


				// Equals to bubble default bottom value in CSS
				var bottomY = 30;

				if ( $( window ).scrollTop() >= $( document ).outerHeight() - $( window ).outerHeight() - $footer.outerHeight() ) {
					$element.css( {
						bottom: ( $footer.outerHeight() - ( $( document ).outerHeight() - $( window ).outerHeight() - $( window ).scrollTop() ) + bottomY )
					} );
					//console.log($element);
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
		}

		// Open Chat from the notification message
		$( ".notif", $selector ).on( "click", function() {
			$link.click();
		} );

		// Close notification aside bubble
		$( ".notif-close", $selector ).on( "click", function( event ) {
			event.preventDefault();
			$( this ).parent().hide();
			$selector.focus();

			// Do not show notification on next load
			localStorage.setItem( "wb-chtwzrd-notif", 1 );
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
			$elm,
			settings;
		if ( elm ) {
			$elm = $( elm );
			// ... Do the plugin initialisation
			// Get the plugin JSON configuration set on attribute data-wb-bubble
			settings = $.extend(
				true,
				{},
				defaults,
				window[ componentName ],
				wb.getData( $elm, componentName )
			);
			
			
			$elm.wrap( "<div class='" + componentName + "-bubble-wrap' id=\"adafds\"></div>" )
			
			
			var li = document.createElement( "li" );
			li.className = "wb-slc";
			// Append the Basic HTML version link version
			

			var data_wb_doaction_json = JSON.parse($elm.attr("data-wb-doaction"));
			
			if (data_wb_doaction_json){
				li.innerHTML = "<button  data-wb-doaction='{ \"action\": \"open\", \"source\": " + "\"" +data_wb_doaction_json.source +"\"" + " }' class=\"wb-sl\" >" + $elm.text() + "</button>";
			}

			// Add link to disable WET plugins and polyfills		
			var list = document.getElementById("wb-tphp"); 			
			list.insertBefore(li, list.childNodes[0]); 

		
			var $bubble = $( selector + "-bubble-wrap" );
			// Initiate chat wizard bubble
			initiateBubble( $bubble );



			// Call my custom event
			$elm.trigger( "name.of.your.event", settings );
			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};
// Add your plugin event handler  , register your custom event to the selector
$document.on( "name.of.your.event", selector, function( event, data ) {
	var elm = event.currentTarget,
		$elm = $( elm );
	if ( data && data.domore ) {
		$elm.prepend( "Do more" );
	}
} );
// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );
// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
