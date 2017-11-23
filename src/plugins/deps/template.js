/**
 * @title WET-BOEW Template polyfill
 * @overview The <template> element hold elements for Javascript and templating usage. Based on code from http://ironlasso.com/template-tag-polyfill-for-internet-explorer/
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
( function( $, document, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the polyfill - meaning that they will be initialized once per page.
 * This polyfill is mostly used to support <template> element in IE11
 */
var componentName = "wb-template",
	selector = "template",
	initEvent = "wb-init." + componentName,
	$document = wb.doc,

	/**
	 * @method polyfill
	 * @param {DOM element} element that we need to apply the polyfill
	 */
	polyfill = function( elm ) {

		if ( elm.content ) {
			return;
		}
		var elPlate = elm,
			qContent,
			docContent;

		qContent = elPlate.childNodes;
		docContent = document.createDocumentFragment();

		while ( qContent[ 0 ] ) {
			docContent.appendChild( qContent[ 0 ] );
		}

		elPlate.content = docContent;

	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );

		if ( elm ) {

			polyfill( elm );

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	};

// Make it available of when template element is needed on the fly, like subtemplate support in IE11
wb.tmplPolyfill = polyfill;

// Bind the events of the polyfill
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the polyfill
wb.add( selector );

} )( jQuery, document, wb );
