/*
 * Charts
 */
( function( $, document, wb ) {
"use strict";

/* ---------------------------------
@function: performant template generator
@returns: [string]
-------------------------------- */
var tmpl = function() {
	var start = "{{",
		end = "}}",
		rnd = function( value, precision ) {
			var multiplier = Math.pow( 10, precision || 0 );
			return Math.round( value * multiplier ) / multiplier;
		},

		// e.g. config.person.name
		path = "[a-z0-9_$][\\.a-z0-9_]*",
		pattern = new RegExp( start + "\\s*(" + path + ")\\s*" + end, "gi" );

	return function( template, data, decimals ) {

		// Merge data into the template string
		return template.replace( pattern, function( tag, token ) {
			var path = token.split( "." ),
				len = path.length,
				lookup = data,
				i = 0;

			for ( ; i < len; i = i + 1 ) {
				lookup = lookup[ path[ i ] ];

				// Property not founds
				if ( lookup === undefined ) {
					throw "tim: '" + path[ i ] + "' not found in " + tag;
				}

				// Return the required value
				if ( i === len - 1 ) {
					if ( $.isNumeric( lookup ) && decimals ) {
						return rnd( lookup, decimals ).toLocaleString( document.documentElement.lang );
					}
					if ( $.isNumeric( lookup ) ) {
						return lookup.toLocaleString( document.documentElement.lang );
					}
					return lookup;
				}
			}
		} );
	};
};

// data-wb-charts-interactive
$( document ).on( "wb-ready.wb-charts", "[data-wb-charts-interactive]", function() {
	var $table = $( this ), // The table used to create the chart
		action = $table.command( this.getAttribute( "data-wb-charts-interactive" ) ),
		tooltipid =  wb.getId().replace( /-/g, "" ),
		template = $( action.selector ).html(),
		decimals = ( action.options ) ? action.options : 1,
		$chart = $table.prev(); // Because the charts is inserted immediatly before the table when it is not inside an expand collapse.

	$( "<div id='" + tooltipid + "' class='wbchrt-tpl'></div>" ).css( {
		position: "absolute",
		display: "none"
	} ).appendTo( "body" );

	// reset the canvas to its original stage TODO: We need to explore it's responsiveness .. maybe bind it to  resize event in WET?
	$( "canvas:eq(1)", $chart ).css( "position", "relative" );

	//$( "canvas:eq(0)", $chart ).css( "width", $( "canvas:eq(1)", $chart ).attr( "width") );

	$chart.on( "plothover", function( event, pos, item ) {
		if ( item ) {
			var tooltip = $( "#" + tooltipid ),
				data = { x: item.datapoint[ 0 ], y: item.datapoint[ 1 ], label: item.series.label, formatted: {} };
			tooltip.html( tmpl( template, data, decimals ) );
			tooltip.css( { top: item.pageY + 7, left: item.pageX + 7 } ).show();
		} else {
			$( "#" + tooltipid ).hide();
		}
	} );
} );

} )( jQuery, document, wb );
