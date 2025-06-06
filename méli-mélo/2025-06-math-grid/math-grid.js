/**
 * @title WET-BOEW Math equation grid
 * @overview An accessible, printable and understandable pattern for simple math equations.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @Christopher-O
 */
( function( $, window, wb ) {
"use strict";

var componentName = "wb-math-grid",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	init = function( event ) {
		var elm = wb.init( event, componentName, selector ),
			$elm;
		if ( elm ) {
			$elm = $( elm );

			// Validate equal column count
			const $rows = $elm.find( ".mg-row" );
			if ( $rows.length === 0 ) {
				return;
			}
			const counts = [];
			$rows.each( function( rowIndex ) {
				const count = $( this ).find( ".mg-cell" ).length;
				counts.push( {
					count,
					row: rowIndex + 1
				} );
			} );
			const firstObject = counts[ 0 ];
			const firstValue = firstObject.count;
			const allMatch = counts.every( obj => obj.count === firstValue );

			if ( !allMatch ) {
				console.error( "Grid layout error for" + elm.id + " - inconsistent cell counts detected:\n" +
					counts.map( r => `→ Row: ${ r.row }, Cell count: ${ r.count }` ).join( "\n" ) );
				$( this ).addClass( "bg-danger" );
			} else {

				// Function to add in aria and roles for accessibility
				const attrData = $( this ).attr( "data-wb-math-grid" );
				const srPause = attrData ? JSON.parse( attrData )?.srPause : undefined;
				const $cells = $( this ).find( ".mg-cell" );

				srPause === true ?
					$( this ).attr( "role", "presentation" ) :
					$cells.attr( "role", "none" );
				$cells.each( function() {
					const content = $( this ).text(  ).replace( /[\u202F\u00A0]/g, "" ).trim(  );
					if ( content === "" ) {
						$( this ).attr( "aria-hidden", "true" );
					}
				} );
			}
			wb.ready( $elm, componentName );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

wb.add( selector );
} )( jQuery, window, wb );

