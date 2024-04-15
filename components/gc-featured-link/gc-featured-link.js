/**
 * @title WET-BOEW Featured link
 * @overview Stylize a featured link
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */
( function( $, window, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "gc-featured-link",
	selector = "." + componentName,
	initEvent = "wb-init " + selector,
	white = "#FFFFFF",
	black = "#000000",
	darkgrey = "#333333",
	luminance1, luminance2,
	contrastRatio,

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
			var bgColor = elm.dataset.bgColor,
				textColor;

			$elm = $( elm );

			if ( bgColor ) {
				if ( getContrastRatio( white, bgColor ) >= 4.5 ) {
					textColor = white;
				} else if ( getContrastRatio( darkgrey, bgColor ) >= 4.5 ) {
					textColor = darkgrey;
				} else {
					textColor = black;
				}

				elm.style.backgroundColor = bgColor;
				elm.style.color = textColor;
				elm.querySelectorAll( "p, a" ).forEach( e => {
					e.style.color = textColor;
				} );
			}

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	getContrastRatio = function( color1, color2 ) {
		function getLuminance( color ) {
			var rgb = [ color.substr( 1, 2 ), color.substr( 3, 2 ), color.substr( 5, 2 ) ].map( hex => parseInt( hex, 16 ) / 255 );

			for ( let i = 0; i < rgb.length; i++ ) {
				if ( rgb[ i ] <= 0.03928 ) {
					rgb[ i ] = rgb[ i ] / 12.92;
				} else {
					rgb[ i ] = Math.pow( ( rgb[ i ] + 0.055 ) / 1.055, 2.4 );
				}
			}

			return 0.2126 * rgb[ 0 ] + 0.7152 * rgb[ 1 ] + 0.0722 * rgb[ 2 ];
		}

		luminance1 = getLuminance( color1 );
		luminance2 = getLuminance( color2 );

		contrastRatio = ( Math.max( luminance1, luminance2 ) + 0.05 ) / ( Math.min( luminance1, luminance2 ) + 0.05 );

		return contrastRatio.toFixed( 2 );
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
