/**
 * @title WET-BOEW Bubble plugin container
 * @overview Plugin used to open a overlay in the middle of the page
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp @cTopCanada @GormFrank
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
	isNotif,
	$document = wb.doc,
	i18nDict = {
		en: {
			skip: "Skip to",
			closeNotif: "Close notification"
		},
		fr: {
			skip: "Passer à",
			closeNotif: "Fermer la notification"
		}
	},

	/**
	 * Adjust bubble position to the footer of the current page
	 * @method adjustBubbleMargin
	 * @param {jQuery DOM element} $selector Element which is the actual bubble
	 */
	adjustBubbleMargin = function( $selector ) {

		var $footer = $( "#wb-info" );

		// Ensure that the bubble does not go passed the footer
		if ( $footer.length ) {

			// Add some white space over the footer for the bubble to sit
			$footer.addClass( componentName + "-mrgn" );

			// Keep the bubble sticky while scrolling Y until user reaches the footer
			var stickyUntilFooter = function( $element ) {

			// Equals to bubble default bottom value in CSS
				var bottomY = 30;
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
	},


	setNotificationStatusWithExpiry = function( key, ttl ) {
		var now = new Date();
		localStorage.setItem( key, now.getTime() + ttl );
	},

	getNotificationStatusWithExpiry = function( key ) {
		var expiryTimeValue = localStorage.getItem( key );
		var now = new Date();

		// compare the expiry time of the item with the current time
		if ( now.getTime() > expiryTimeValue ) {

			// If the item is expired, delete the item from storage
			// and return null
			localStorage.removeItem( key );
			return null;
		}
		return expiryTimeValue;
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

			// Initiate dictionary
			i18nDict = i18nDict[ wb.lang ] || i18nDict.en;

			var $bubbleElm = $( "<div class='" + componentName + "-wrap'></div>" );
			$elm.wrap( $bubbleElm );

			// Get notification status to check if it is still valid after TTL
			isNotif = getNotificationStatusWithExpiry( componentName + "-notif" );

			var $notification = ( !isNotif ? "<p class='trans-left'>" +
			"<span class='notif'>" + $elm.text() + "</span>" +
			"<button class='notif-close' title='" + i18nDict.closeNotif + "' aria-label='" + i18nDict.closeNotif + "'>&times;</button></p>" : "" );

			$elm.parent().append( $notification );
			$elm.addClass( "trans-pulse" );

			// Add link to the top page skip link.
			var list = document.getElementById( "wb-tphp" );
			if ( list ) {

				var li = document.createElement( "li" );
				li.className = "wb-slc";

				// Append the Basic HTML version link version
				if ( $elm.attr( "data-wb-doaction" ) ) {
					li.innerHTML = "<button  data-wb-doaction='" + $elm.attr( "data-wb-doaction" ) + "' class=\"wb-sl\" >" + i18nDict.skip + " " + $elm.text() + "</button>";
				}

				// Add button at the 2nd poisiton of the li
				list.insertBefore( li, list.childNodes[ 2 ] );
			}

			// Initiate chat wizard bubble
			adjustBubbleMargin( $elm.parent() );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		};
	};

// Close notification aside bubble
$document.on( "click",  selector + "-wrap .wb-bubble", " " + selector + "-wrap .notif-close", function( event ) {
	var $wrap = $( selector + "-wrap" );
	event.preventDefault();
	$( selector + "-wrap .notif-close" ).parent().hide();
	$wrap.focus();
	$( selector, $wrap ).removeClass( "trans-pulse" );

	// Do not show notification until 7 days
	setNotificationStatusWithExpiry( componentName + "-notif", 1000 * 60 * 60 * 24 * 7 );
} );


// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
