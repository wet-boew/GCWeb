(function( $, window, wb ) {
	"use strict";

	wb.doc.on( "click", ".product-record", function( event ) {
		if ( event.target.className.indexOf( "record-close" ) === -1 ) {
			var link = $( event.currentTarget ).find( ".record-expand" );
			if ( link.length === 1 ) {
				location.href = link[ 0 ].href;
			}
		}
	});
})( jQuery, window, wb );
