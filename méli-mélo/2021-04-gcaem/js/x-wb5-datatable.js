/*
 * WB5 Datatables
 */
( function( $, document, wb ) {
"use strict";

/*
 Global Helper functions
 @author: Goverment of Canada
 ======================================================== */

/* ---------------------------------
    @function: event parser
    @returns: [boolean] if event is keypress (space / enter ) or click for normalization of devices
   -------------------------------- */
function a11yclick( event ) {
	if ( event.type === "click" ) {
		return true;
	} else if ( event.type === "keypress" ) {
		var code = event.charCode || event.keyCode;
		if ( code === 32 || code === 13 ) {
			return true;
		}
	} else {
		return false;
	}
}

function setValue( $elm, value ) {
	if ( $elm.is( ":input" ) ) {
		$elm.val( value );
		return true;
	}

	$elm.text( value );

	return true;
}

/* ---------------------------------
	Datatables Init
	@description: Apply any pre-filter set through the UI
   -------------------------------- */
$( document ).on( "preInit.dt", ".wb-tables", function() {
	var form = $( "form[data-wbtbl-post]" ).get( 0 ); // Get the filter form if any

	if ( form ) {

		// Apply for submission behaviour but without the table "draw"
		applySearchFilter.call( form );
	}

} );

/* ---------------------------------
    Datatables Event Mappers
    @description: mirrors the datatable events to it relatives with extra custom information
   -------------------------------- */
$( document ).on( "draw.dt", ".wb-tables", function( evnt ) {
	var $elm = $( this ),
		table = $elm.DataTable();

	// now fire the event;
	$elm.relatives().trigger( {
		type: evnt.type,
		table: table,
		displayed: table.page.info().recordsDisplay,
		total: table.page.info().recordsTotal
	} );
} );

/* Workaround for IE and Edge, which need the details polyfills
 * The source of the issue are unknow.
 * Hypothesis: Is the polyfill get executed and then the datatable do a DOM mutation which remove the event handler previously added by the polyfill?
 */
if ( !Modernizr.details ) {
	$( document ).on( "draw.dt", ".wb-tables", function() {
		var $elm = $( this );
		$elm.find( "summary" ).removeClass( "wb-init" ).removeClass( "wb-details-inited" ).trigger( "wb-init.wb-details" );
	} );
}

/* ---------------------------------
    Datatables Draw Listener
    @description: reacts to datatables that have been drawn
    @methods:
      - display: displays the option info from the table
      - count: a progress bar and meter friendly count updater
   -------------------------------- */
$( document ).on( "draw.dt", "[data-wbtbl-draw]", function( evnt ) {
	var $elm = $( this ),
		action = $elm.command( $elm.attr( "data-wbtbl-draw" ) ),
		$table = evnt.table,
		$node = $( $table.table().node() ),
		isFiltered = evnt.displayed !== evnt.total,
		count = 0,
		all = evnt.total;

	//total = evnt.displayed;

	switch ( action.command ) {
	case "display":
		return setValue( $elm, $table.page.info()[ action.options ] );
	case "count":
		var rows = isFiltered ? $table.rows( { search: "applied" } ) : $table.rows( { page: "all" } );
		rows.iterator( "row", function( context, index ) {
			if ( $( this.row( index ).node() ).text().indexOf( action.options ) > -1 ) {
				count++;
			}
		} );
		if ( $elm.is( "progress" ) ) {
			$elm.attr( { max: all, value: count } );

			if ( $node.hasClass( "wbtbl-silent" ) ) {
				return true;
			}
			$elm.trigger( "updated.wb5" );
		}
		return $elm.text( count );
	}
} );

/* ---------------------------------
    Datatables Reset
    @description: reset datatables
   -------------------------------- */
$( "[data-wbtbl-reset]" ).on( "click", function() {

	var command = this.getAttribute( "data-wbtbl-reset" ).split( "@" ),
		$table =  $( command[ 0 ] ).DataTable();

	$table.search( "" ).columns().search( "" );

	if ( command[ 1 ] === "all" ) {
		return $table.search( "" ).columns().search( "" ).draw();
	}

	return $table.column( command[ 1 ] ).search( "" ).draw();
} );

/* ---------------------------------
    Datatables Tagcloud
    @description: enables a tag cloud where users can remove selected filters
   -------------------------------- */
$( document ).on( "wb-ready.wb-tables", "[data-wbtbl-tag=enable]", function() {
	var $elm = $( this ),
		$wrapper = $elm.closest( ".dataTables_wrapper" );

	$wrapper
	.addClass( "tagcloud" )
	.find( ".top" )
	.append( "<div data-wbtbl-tagcloud='active' aria-live='polite'></div>" );

	$elm.related( $wrapper.find( "[data-wbtbl-tagcloud]" ).eq( 0 ), true );

	$wrapper.find( "[data-wbtbl-tagcloud]" ).eq( 0 ).trigger( { type: "draw.dt", table: $elm.eq( 0 ).dataTable().api() } );
} );

$( document ).on( "draw.dt", "[data-wbtbl-tagcloud]", function( evnt ) {
	var $table = evnt.table,
		indx = -1,
		$tg = $( this );

	var iteratorFn = function() {
		var search = this.search();

		if ( search ) {

			// lets remove all regex
			var words = search.split( "|" );
			var $tag =
			"<li><span class='tagitem' data-wbtbl-col-idx='" + indx + "'><span class='content'>" +
			words.map( function( wrd ) {
				return wrd.replace( /[{()}]/g, "" );
			} ).join( " &amp; " ) +
			"</span> <button type='button' class='close' tabindex='0' aria-label='" +
			wb.i18n( "geo-aoi-btnclear" ) +
			"'><span aria-hidden='true'>&times;</span></button></span></li>";
			$tg.find( "ul" ).append( $tag );
		}
		indx++;
	};

	$tg.html( "<ul class='list-inline tags' aria-live='polite'></ul><div class='clearfix'></div>" );

	iteratorFn.call( $table );

	$table.columns().every( iteratorFn );

} );

/**
 * data-wbtbl-highlight
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wbtbl-highlight]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-highlight" ) ),
		$table = $elm.relatives().DataTable();

	$elm
	.relatives()
	.removeClass( "wbtbl-silent" )
	.addClass( "wbtbl-silent" );

	$table
	.column( action.selector )
	.search( action.options, false, false, true )
	.draw();
} );

/**
   * data-wbtbl-search
   * @param  {[type]} evt ){              var $elm [description]
   * @return {[type]}     [description]
   */
$( document ).on( "keypress click", "[data-wbtbl-search]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-search" ) ),
		$table = $elm.relatives().DataTable();

	$elm.relatives().removeClass( "wbtbl-silent" );

	$table
	.search( "" )
	.columns()
	.search( "" );
	$table
	.column( action.selector )
	.search( action.options, false, false, true )
	.draw();
} );

/**
 * wbtbl-search (for form submission)
 * @param  {[type]} evt) {             var $elm [description]
 * @return {[type]}      [description]
 */
$( document ).on( "submit", "[data-wbtbl-submit]", function() {

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-submit" ) ),
		$table = $elm.relatives().DataTable(),
		actionSelector = action.selector,
		actionOption = action.options;

	$elm.relatives();

	$table
	.search( "" )
	.columns()
	.search( "" );

	if ( actionSelector ) {
		$table = $table.column( actionSelector );
	}

	$table
	.search( $elm.find( "input" ).val(), false, ( actionOption && actionOption === "smart" ), true )
	.draw();

	return false;
} );

/**
 * data-wbtbl-tagcloud
 * @param  {[type]} evt ){ var $elm [description]
 * @return {[type]} [description]
 */
$( document ).on( "keypress click", "[data-wbtbl-tagcloud] li button", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}
	var $elm = $( this ),
		$item = $elm.closest( "li" ),
		term = $item.find( ".content" ).text(),
		cid = parseInt( $elm.closest( "[data-wbtbl-col-idx]" ).attr( "data-wbtbl-col-idx" ) ),
		$table = $elm.closest( ".dataTables_wrapper" ).find( ".wb-tables" ).removeClass( "wbtbl-silent" ).DataTable(); // We are a live element so we need to query often

	if ( cid !== -1 ) {
		$table = $table.column( cid );
	}

	$table
	.search( "", false, false, true )
	.draw();

	$item.remove();

	refreshCtrlTblCol( $table, false, cid, term );

} );

/*
 * External event to refresh the table controler
 *
 * @param: isSelected Define if the search trigger a selection or not, undefined means true
 *
 */
$( document ).on( "refreshCtrl.wbtbl", "table", function( evt ) {

	refreshCtrlTbl( $( evt.currentTarget ).DataTable(), evt.isSelected === undefined || evt.isSelected );
} );

/*
 *
 * @param dtTable = [Required] Reference to datatable
 * @param isSelected = [Required] Define is that filter is on or off. (off === false)
 * @param cid = [Optional, Require term] column id
 * @param term = [Optional, Require cid] Term of filtering
 *
 */
function refreshCtrlTbl( $dtTable, isSelected, cid, term ) {

	// If ColumnId is defined, only do for that columnId, Otherwise do this for all columns
	if ( !cid || !term ) {

		// Do this for call the table column

		$dtTable.columns().every( function( index ) {
			term = $dtTable.column( index ).search();

			refreshCtrlTblCol( $dtTable, isSelected && term, index, term );
		} );

	} else {

		// Do only for the column based on the term passed in parameter
		refreshCtrlTblCol( $dtTable, isSelected, cid, term );
	}

}

function refreshCtrlTblCol( $dtTable, isSelected, cid, term ) {

	// Lets reset any search items
	var $searchItems = $( "[data-wbtbl-search$=\"@" + cid + "@" + term + "\"],[data-wbtbl-highlight$=\"@" + cid + "@" + term + "\"]" );

	if ( isSelected ) {
		$searchItems.removeClass( "pick" );
	} else {
		$searchItems.addClass( "pick" );
	}

	// Lets reset any search items
	$( "form[data-wb5-bind=\"#" + $dtTable.table().node().id + "\"]" ).find( "[value^=\"" + cid + "@" + term + "\"],[data-wbtbl-bind^=\"" + cid + "@" + term + "\"]" ).each( function( idx, element ) {
		var $elm = $( element );

		if ( $elm.is( "[type=checkbox],[type=radio]" ) ) {
			$elm.prop( "checked", isSelected );
			return true;
		} else  if ( $elm.is( "[type=text],[type=textarea]" ) ) {
			$elm.val( isSelected ? term : "" );
			return true;
		} else {
			$elm.get( 0 ).selected = isSelected;
		}
		return true;
	} );

}

/*
	@description: Apply a data table search defined through the filter form [data-wbtbl-post]
	@param: this -> pointer to the <form> DOM element
 */
function applySearchFilter() {
	var $elm = $( this ),
		values = [],
		$table = $elm.relatives().DataTable(),
		action = $elm.command( this.getAttribute( "data-wbtbl-post" ) ),
		xOr = [];

	$elm.find( action.selector ).each( function( idx, elm ) {
		var $elment = $( elm );

		if ( $elment.is( "[type=checkbox]" ) ) {
			if ( $elment.is( ":checked" ) ) {
				if ( $elment.is( "[data-xor]" ) ) {
					xOr.push( $elment.val() );
					return true;
				}
				values.push( $elment.val() );
			}
			return true;
		}
		values.push( $elment.val() );
	} );

	// Lets combine the search term
	if ( xOr.length > 1 ) {
		var stmt = {},
			idx = false;

		for ( var x = xOr.length - 1; x >= 0; x-- ) {
			var multiple = xOr[ x ].split( "@" );

			// Ensure each filter in "xor" group have their own labels.
			if ( !stmt.hasOwnProperty( multiple[ 0 ] ) ) {
				stmt[ multiple[ 0 ] ] = [];
			}
			stmt[ multiple[ 0 ] ].push( "(" + multiple[ 1 ] + ")" );
		}

		for ( idx in stmt ) {
			values.push( idx + "@" + stmt[ idx ].join( "|" ) );
		}
	} else if ( xOr.length === 1 ) {
		values.push( xOr[ 0 ] );
	}

	for ( var i = values.length - 1; i >= 0; i-- ) {
		var params = values[ i ].split( "@" ),
			col = params[ 0 ],
			text = params[ 1 ];

		if ( text.indexOf( "|" ) !== -1 ) {
			$table.column( col ).search( text, true );
			continue;
		}

		text = text.replace( /^\(/, "" ).replace( /\)$/, "" );

		$table.column( col ).search( text );
	}
}

/**
 * data-wbtbl-post
 * @description post to a datable search columns via form elements
 * @param  {[event]}     evt
 * @return {[boolean]}     proceed to submite
 */
$( document ).on( "submit", "[data-wbtbl-post]", function( ) {

	var $elm = $( this );

	applySearchFilter.call( this );

	$elm.relatives().DataTable().draw();

	return ( $elm.is( "[action]" ) ) ? true : false;
} );

/**
 * data-wbtbl-post
 * @description post to a datable search columns via form elements
 * @param  {[event]}     evt
 * @return {[boolean]}     proceed to submite
 */
$( document ).on( "reset", "[data-wbtbl-post]", function( ) {

	var elm = this,
		$elm = $( elm ),
		$table = $elm.relatives().DataTable();

	$table.search( "" );
	$table.columns().every( function( ) {
		this.search( "" );
	} );

	$table.draw( );

	// Hard reset input default checkstate. The use case is the initial state contain a pre-defined filter, but it needs to be removed when clearing the form.
	// The use of setTimeout is to ensure this happen after the "reset" form event.
	setTimeout( function( ) {
		var inputs = elm.querySelectorAll( "[data-wb5-default-checked]" ),
			i, i_len = inputs.length,
			i_cache;

		for ( i = 0; i < i_len; i++ ) {
			i_cache = inputs[ i ];
			i_cache.checked = ( i_cache.dataset.wb5DefaultChecked !== "false" );
		}

		// Refresh the filter, in the case some are pre-set via the UI.
		applySearchFilter.call( elm );
		$table.draw();
	}, 1 );
} );
} )( jQuery, document, wb );
