/*
 * URL Mapping
 */
( function( $, document ) {
"use strict";

// URL Mapping integration with WB5 wbtbl filtering
$( document ).on( "do.wb-actionmng", "table[data-wb-urlmapping][data-wb5-bind]", function( event ) {
	var $table = $( event.currentTarget );
	$table.one( "draw.dt", function() {
		$table.trigger( "refreshCtrl.wbtbl" );
	} );
} );

} )( jQuery, document );
