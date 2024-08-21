/*
 WET 5.0 (early bird)
 @author: Goverment of Canada
 ======================================================== */
( function( $, document ) {
"use strict";

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

$.fn.extend( {

	/* ---------------------------------
	@extension: relatives
	@parameters: none
	@returns: [collection] jQuery collection (null safe)
	-------------------------------- */
	relatives: function() {
		var $family = $();

		this.each( function( indx, node ) {
			if ( node.wb5 && node.wb5.relatives ) {
				node.wb5.relatives.each( function() {
					$family = $family.add( this );
				} );
			}
		} );

		return $family;
	},

	/* ---------------------------------
	@extension: related
	@parameters: [collection] - $nodes
	@returns: [self]
	-------------------------------- */
	related: function( $nodes, append ) {
		this.each( function( indx, node ) {
			if ( append && node.wb5 && node.wb5.relatives ) {
				node.wb5.relatives.each( function() {
					$nodes = $nodes.add( this );
				} );
			}

			$.extend( node, { wb5: { relatives: $nodes } } );
		} );
		return this;
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: shuffle
	@returns: [list] shuffles a list of items randomly
	-------------------------------- */
	shuffle: function() {
		var allElems = this.get(),
			shuffled = $.map( allElems, function() {
				var random = Math.floor( Math.random() * allElems.length ),
					randEl = $( allElems[ random ] ).clone( true )[ 0 ];
				allElems.splice( random, 1 );
				return randEl;
			} );

		this.each( function( i ) {
			$( this ).replaceWith( $( shuffled[ i ] ) );
		} );

		return $( shuffled );
	}

} );

$.fn.extend( {

	/* ---------------------------------
	@extension: rand
	@returns: [collection] of randoms elements
	-------------------------------- */
	rand: function( k ) {
		var b = this,
			n = b.size(),
			r;

		k = k ? parseInt( k ) : 1;

		// Special cases
		if ( k > n ) {
			return b.pushStack( b );
		} else if ( k === 1 ) {
			return b.filter( ":eq(" + Math.floor( Math.random() * n ) + ")" );
		}

		// Create a randomized copy of the set of elements,
		// using Fisher-Yates sorting
		r = b.get();
		for ( var i = 0; i < n - 1; i++ ) {
			var swap = Math.floor( Math.random() * ( n - i ) ) + i;
			r[ swap ] = r.splice( i, 1, r[ swap ] )[ 0 ];
		}
		r = r.slice( 0, k );

		// Finally, filter jQuery stack
		return b.filter( function( i ) {
			return $.inArray( b.get( i ), r ) > -1;
		} );
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: isEmpty
	@returns: [boolean] if jQuery collection is empty or not
	-------------------------------- */
	notEmpty: function() {
		return this.length !== 0;
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: command
	@returns: [array] if jQuery collection is empty or not
	-------------------------------- */
	command: function( attrval ) {
		if ( attrval.length ) {
			var params = attrval.split( "@" );
			return { command: params[ 0 ], selector: params[ 1 ], options: params[ 2 ] };
		}
		return { command: false, selector: false };
	}
} );


/* ---------------------------------
    Bind
    @description: creates a referencable set of elements to a node
    @api
      - elements are extended with related function
        $elm.related( nodelist )
   -------------------------------- */
$( "[data-wb5-bind]" ).each( function( idx, elm ) {
	var $elm = $( elm ),
		$nodes;
	if ( $elm.parents().is( "template" ) ) {
		return;
	}
	$nodes = $( $elm.attr( "data-wb5-bind" ) );
	if ( $nodes.notEmpty() ) {
		$elm.related( $nodes );
	}
} );

/* ---------------------------------
    Debug
    @description: allows any node to output in the console the passed function
    @examples
      1.
      <div data-wb5-bind=".elementclasses" data-wb5-debug="relatives" >
      = console.log =
        nodelist of bound element  //  console.log( $(this).relatives() )
      2.
      <div data-wb5-bind=".elementclasses" data-wb5-debug="text" >
      = console.log =
        text of element  //  console.log( $(this).text() )
   -------------------------------- */
$( document ).on( "keypress click", "[data-wb5-debug]", function( evnt ) {
	if ( !a11yclick( evnt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		functions = $elm.attr( "data-wb5-debug" ).split( "," );
	for ( var i = functions.length - 1; i >= 0; i-- ) {
		console.log( $elm[ functions[ i ] ]() ); // eslint-disable-line no-console
	}
} );

$( "[data-wb5-click]" ).on( "click", function() {
	var $elm = $( this ),
		command = $elm.data( "wb5-click" ).split( "@" ),
		action = command[ 0 ],

		// selector = command[ 1 ],
		options = command[ 2 ];

	if ( action === "postback" ) {
		var $form = $( command[ 1 ] );

		$.ajax( {
			type: $form.attr( "method" ),
			url: $form.attr( "action" ),
			data: $form.serialize() // serializes the form's elements.
		} );

		return ( options.block ) ? false : true;
	}
} );

/**
 * data-progress-update
 * @param  {[type]} ){                var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "updated.wb5", "[data-wb5-update]", function() {
	var $elm = $( this ).relatives(),
		max = this.getAttribute( "max" ),
		value = this.getAttribute( "value" ),

		// marker = this.getAttribute( "data-percentage" ) || 0,
		percentage = Math.ceil( value / max * 100 ) || 0;

	$elm.find( ".meter" ).text( value );

	$elm
		.removeClass( function( index, className ) {
			return ( className.match( /(^|\s)p\d+/g ) || [] ).join( " " );
		} )
		.attr( "data-percentage", "p" + percentage );
	$elm.addClass( "p" + percentage );
} );

/**
 * data-wb5-ajax
 * @param  {[type]} evt)   [description]
 * @param  {[type]} action [description]
 * @param  {[type]} $nodes [description]
 * @return {[type]}        [description]
 */
$( document ).on( "keypress click", "[data-wb5-ajax]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-ajax" ) ),
		$nodes = $elm.relatives();

	// Lets ensure we have notifying screen readers
	$nodes.attr( "aria-live", "polite" );

	switch ( action.command ) {
		case "replace":
			$.get( action.options, function( data ) {
				$nodes.html( data );
			} );
	}
} );

/**
 * data-wb5-load
 * @param  {[type]} evt)   {             if (!a11yclick(evt)) {        return true;  }  var $elm [description]
 * @param  {[type]} action [description]
 * @param  {[type]} $nodes [description]
 * @return {[type]}        [description]
 */
$( document ).on( "keypress click", "[data-wb5-load]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-load" ) ),
		$nodes = $elm.relatives();

	// Lets ensure we have notifying screen readers
	$nodes.attr( {
		"aria-relevant": "all",
		"aria-live": "polite",
		"aria-atomic": "true"
	} );

	switch ( action.command ) {
		case "replace":
			$nodes.load( action.options );
	}
} );

/**
 * data-wb5-trigger
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wb5-trigger]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-trigger" ) );
	$elm.relatives().trigger( action.command );
} );

/**
 * data-wb5-profile
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wb5-profile]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-profile" ) );

	if ( action.command === "single" ) {
		$elm
			.relatives()
			.removeClass( action.options )
			.filter( "[role=button]" )
			.attr( "aria-pressed", "false" );
		$( evt.target )
			.closest( $elm.relatives() )
			.addClass( action.options )
			.filter( "[role=button]" )
			.attr( "aria-pressed", "true" );
	}
} );

} )( jQuery, document );
