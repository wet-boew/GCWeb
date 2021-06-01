/**
 * @title WET-BOEW GC Subway map mutator
 * @overview Plugin used to mutate DOM elements depending on viewport size, in order to follow order accessibility criteria while respecting UI
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gormfrank
 */
( function( $, window, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "gc-subway",
	selector = ".provisional." + componentName,
	initEvent = "wb-init ." + componentName,
	views = {
		xxs: "xxsmallview",
		xs: "xsmallview",
		sm: "smallview",
		md: "mediumview",
		lg: "largeview",
		xl: "xlargeview"
	},
	mainClass = "gc-subway-section",
	toggleClass = "wb-inv",
	desktopInited = false,
	$html = wb.html,
	$h1, $h2, $h1Copy, $menu, $main,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			h1,
			$elm;

		if ( elm && event.currentTarget === event.target ) {
			$elm = $( elm );
			$h1 = $( "h1", $elm );
			h1 = $h1.get( 0 );

			// Add Subway H1 to skip links only once and if it is a sub-page
			if ( h1 ) {

				// Ensure the element have an ID
				h1.id = h1.id || wb.getId();

				wb.addSkipLink( wb.i18n( "skip-prefix" ) + " " + h1.textContent, { href: "#" + h1.id } );
			}

			// trigger resizing
			onResize( $elm );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	/**
	 * Mutate DOM depending on breakpoint
	 * @method onResize
	 * @param {jQuery DOM element | jQuery Event} $elm Element targetted by this plugin, which is the nav | Resizing event
	 */
	onResize = function( $elm ) {

		if ( !$elm.length ) {
			$elm = $( selector );
		}

		// Ensure the page contains at least two heading level 1
		if ( $( "main h1" ).length < 2 ) {
			$document.off( wb.resizeEvents, onResize );
			$elm.addClass( "no-blink p-0" );
			return;
		}

		// Desktop view, setup and mutate H1s
		if ( $html.hasClass( views.md ) || $html.hasClass( views.lg ) ||
			$html.hasClass( views.xl ) ) {

			// Initiate desktop mode only once
			if ( !desktopInited ) {
				initDesktop( $elm );
			}
			$h1.addClass( toggleClass );
			$h1Copy.prependTo( $main );
			$h2.prependTo( $menu );
		} else if ( ( $html.hasClass( views.sm ) || $html.hasClass( views.xs ) || $html.hasClass( views.xxs ) ) && desktopInited ) {

			// Mobile view, mutate back to mobile first if needed
			$h1.removeClass( toggleClass );
			$h1Copy.remove();
			$( "h2:first-child", $menu ).remove();
		}
	},

	/**
	 * Initate setup for desktop mode
	 * @method initDesktop
	 * @param {jQuery DOM element} $elm Element targetted by this plugin, which is the nav
	 */
	initDesktop = function( $elm ) {
		$h2 = $( "<h2 class='h3 hidden-xs visible-md visible-lg mrgn-tp-0'>Sections</h2>" );
		$h1Copy = $( "<div class='gc-subway-h1' aria-hidden='true'>" + $h1.text() + "</div>" );
		$( "ul", $elm ).first().wrap( "<div class='gc-subway-menu-nav'></div>" );
		$menu = $( ".gc-subway-menu-nav", $elm );
		$elm.nextUntil( ".pagedetails, .gc-subway-section-end" ).wrapAll( "<section class='provisional " + mainClass + "'>" );
		$main = $elm.next();

		// Prevent on-load blinking on desktop
		$elm.addClass( "no-blink" );

		desktopInited = true;
	};

// Listen for resizing and mutate the DOM accordingly
$document.on( wb.resizeEvents, onResize );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector + ".provisional", init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
