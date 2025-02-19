/**
 * @title WET-BOEW GC Empathy quiz card mutator
 * @overview Plugin used to mutate DOM elements depending on viewport size, in order to follow order accessibility criteria while respecting UI
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @BrahimMahadi
 */
( function( $, window, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "gc-empathy",
	selector = ".provisional." + componentName,
	initEvent = "wb-init " + selector,
	$quizDiv,

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

			$quizDiv = $( ".quiz-content" );

			if ( $quizDiv ){
				$quizDiv.clone().addClass( "hidden-md hidden-lg" ).insertBefore( " .services-and-information ");
				$quizDiv.addClass( "hidden-xs hidden-sm" );
			}

			// Prevent on-load blinking on desktop
			elm.classList.add( "no-blink" );

		// Identify that initialization has completed
		wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
