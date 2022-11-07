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
	initEvent = "wb-init " + selector,
	mainClass = "gc-subway-section",
	indexClass = "gc-subway-index",
	sectionsTitle,
	$navH1, $pageH1,
	$subwayLinks,

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

		if ( elm && event.currentTarget === event.target ) {
			$elm = $( elm );

			sectionsTitle = elm.hasAttribute( "data-sections-title" ) ? elm.getAttribute( "data-sections-title" ) : "Sections";

			// If it's the index, add "gc-subway-index" class
			if ( !elm.querySelector( "h1" ) ) {
				if ( !elm.classList.contains( indexClass ) ) {
					elm.classList.add( indexClass );
				}
			} else {
				$navH1 = $( "h1", $elm );

				// Add skip link to sections list
				if ( $navH1 ) {
					$navH1.id = $navH1.id || wb.getId(); // Ensure the element has an ID
					wb.addSkipLink( wb.i18n( "skip-prefix" ) + " " + $navH1.text(), { href: "#" + $navH1.id } );
				}

				// Wrap all content until it hits either: ".pagedetails, .gc-subway-landmark-end, .gc-subway-support"
				$elm.nextUntil( ".pagedetails, .gc-subway-landmark-end, .gc-subway-support" ).wrapAll( "<section class='" + mainClass + "'>" );

				$pageH1 = $( "." + mainClass + " h1" );

				$pageH1.wrap( "<hgroup></hgroup>" );
				$navH1.wrap( "<hgroup></hgroup>" );

				$( "<p>" + $navH1.text() + "</p>" ).insertBefore( $pageH1 );
				$( "<p class='h3 hidden-xs visible-md visible-lg mrgn-tp-0'>" + sectionsTitle + "</p>" ).insertAfter( $navH1 );

				$elm.find( "a.active" ).attr( { tabindex: "0", "aria-current": "page" } );

				$subwayLinks = $( selector + " a, ." + mainClass + " .gc-pagination a" );

				// Duplicating GC-Subway links for single-page application feel on mobile
				$subwayLinks.each( function( i, el ) {
					let $el = $( el ),
						elHref = $el.attr( "href" ),
						cloneHref = elHref.includes( "#" ) ? elHref : elHref += "#wb-cont";

					$el.clone()
						.addClass( "hidden-md hidden-lg" )
						.attr( "href", cloneHref )
						.insertAfter( el );

					$el.addClass( "hidden-xs hidden-sm" );
				} );

				// Prevent on-load blinking on desktop
				elm.classList.add( "no-blink" );
			}

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
