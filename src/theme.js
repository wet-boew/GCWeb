/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
(function( $, document, wb ) {
"use strict";

var $document = wb.doc,
	searchSelector = "#wb-srch-q",
	$search = $(searchSelector),
	$searchDataList = $( "#" + $search.attr( "list" ) );

//Search Autocomplete

//Queries  the autocomplete API
$document.on( "change keypress", searchSelector, function( event ) {
	var query = event.target.value;

	if ( query.length > 0 ) {
		$document.trigger({
			type: "ajax-fetch.wb",
			element: this,
			fetch: {
				url: "http://clients1.google.com/complete/search?client=partner&sugexp=gsnos%2Cn%3D13&gs_rn=25&gs_ri=partner&partnerid=" + window.encodeURIComponent("008724028898028201144:knjjdikrhq0+lang:" + wb.lang) + "&types=t&ds=cse&cp=3&gs_id=b&hl=" + wb.lang + "&q=" + encodeURI( query ),
				dataType: "jsonp",
				jsonp: "callback"
			}
		});
	}
});

//Processes the autocomplete API results
$document.on( "ajax-fetched.wb", searchSelector, function( event ) {
	var suggestions = event.fetch.response[ 1 ],
		lenSuggestions = suggestions.length,
		options = "",
		indIssue, issue;

	$searchDataList.empty();

	for ( indIssue = 0; indIssue < lenSuggestions; indIssue += 1 ) {
		issue = suggestions[ indIssue ];

		options += "<option label=\"" + issue[0] + "\" value=\"" + issue[0] + "\"></option>";
	}

	if ( wb.ielt10 ) {
		options = "<select>" + options + "</select>";
	}

	$searchDataList.append( options );

	$search.trigger( "wb-update.wb-datalist" );
});

})( jQuery, document, wb );
