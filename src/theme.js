/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
( function( $, document, wb ) {
"use strict";

var $document = wb.doc,
	searchSelector = "#wb-srch-q",
	$search = $( searchSelector ),
	$searchDataList = $( "#" + $search.attr( "list" ) ),

//Search Autocomplete
	queryAutoComplete = function( query ) {
		if ( query.length > 0 ) {
			$( this ).trigger( {
				type: "ajax-fetch.wb",
				fetch: {
					url: wb.pageUrlParts.protocol + "//clients1.google.com/complete/search?client=partner&sugexp=gsnos%2Cn%3D13&gs_rn=25&gs_ri=partner&partnerid=" + window.encodeURIComponent( "008724028898028201144:knjjdikrhq0+lang:" + wb.lang ) + "&types=t&ds=cse&cp=3&gs_id=b&hl=" + wb.lang + "&q=" + encodeURI( query ),
					dataType: "jsonp",
					jsonp: "callback"
				}
			} );
		}
	};

//Queries  the autocomplete API
$document.on( "change keyup", searchSelector, function( event ) {
	var target = event.target,
		query = event.target.value,
		which = event.which;

	switch ( event.type ) {
	case "change":
		queryAutoComplete.call( target, query );
		break;
	case "keyup":
		if ( !( event.ctrlKey || event.altKey || event.metaKey ) ) {

			// Spacebar, a - z keys, 0 - 9 keys punctuation, and symbols
			if ( which === 32 || ( which > 47 && which < 91 ) ||
				( which > 95 && which < 112 ) || ( which > 159 && which < 177 ) ||
				( which > 187 && which < 223 ) ) {
				queryAutoComplete.call( target, query );
			}
		}
	}
} );

//Processes the autocomplete API results
$document.on( "ajax-fetched.wb", searchSelector, function( event ) {
	var suggestions = event.fetch.response[ 1 ],
		lenSuggestions = suggestions.length,
		options = "",
		indIssue, issue;

	$searchDataList.empty();

	for ( indIssue = 0; indIssue < lenSuggestions; indIssue += 1 ) {
		issue = suggestions[ indIssue ];

		options += "<option label=\"" + issue[ 0 ] + "\" value=\"" + issue[ 0 ] + "\"></option>";
	}

	if ( wb.ielt10 ) {
		options = "<select>" + options + "</select>";
	}

	$searchDataList.append( options );

	$search.trigger( "wb-update.wb-datalist" );
} );

window[ "wb-data-ajax" ] = {
	corsFallback: function( fetchObj ) {
		fetchObj.url = fetchObj.url.replace( ".html", ".htmlp" );
		return fetchObj;
	}
};

//Report a problem form - reveal textbox when checkbox is selected
$( "[data-reveal]" ).change( function() {
	var $elm = $( this ),
		selector = $elm.attr( "data-reveal" );
	return ( $elm.is( ":checked" ) ) ? $( selector ).removeClass( "hide" ) : $( selector ).addClass( "hide" );
} );


} )( jQuery, document, wb );
