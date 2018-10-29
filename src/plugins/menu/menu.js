/*
 *
 * GCWeb v2 - keyboard navigation prototype
 *
 */

var globalTimeoutOn = {},
	globalTimeoutOff = {},
	hoverDelay = 350;

function OpenMenu( elm ) {
	elm.setAttribute( "aria-expanded", "true" );
}
function CloseMenu( elm ) {

	elm.setAttribute( "aria-expanded", "false" );
}


// On hover, wait for the delay before to open the menu
wb.doc.on( "mouseenter focusin", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	if ( !elm.id ) {
		elm.id = wb.getId();
	}

	clearTimeout( globalTimeoutOn[ elm.id ] );

	globalTimeoutOn[ elm.id ] = setTimeout( function() {
		OpenMenu( elm );
	}, hoverDelay );

} );
wb.doc.on( "mouseenter focusin", "[aria-haspopup] + [role=menu]", function( event ) {

	// Prevent the menu to collapse
	// Note: elm.id is already defined because of the mouseenter event of the parent menu element

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	clearTimeout( globalTimeoutOff[ elm.id ] );
} );

wb.doc.on( "mouseleave focusout", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	// Note: elm.id is already defined because of the mouseenter event

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	clearTimeout( globalTimeoutOff[ elm.id ] );

	globalTimeoutOff[ elm.id ] = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );

} );
wb.doc.on( "mouseleave focusout", "[aria-haspopup] + [role=menu]", function( event ) {

	// Collapse the menu
	// Note: elm.id is already defined because of the mouseenter event

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	clearTimeout( globalTimeoutOn[ elm.id ] );

	globalTimeoutOff[ elm.id ] = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );
} );

// Open right away the popup
wb.doc.on( "click", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	// Note: elm.id is already defined because of the mouseenter event

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	// Toggle
	if ( elm.getAttribute( "aria-expanded" ) === "true" ) {
		clearTimeout( globalTimeoutOn[ elm.id ] );
		CloseMenu( elm );
	} else {
		clearTimeout( globalTimeoutOff[ elm.id ] );
		OpenMenu( elm );
	}

} );


//
// Initialisation of the keyboard navigation
//

// Make menu-item not tabbable
$( ".gcweb-v2 [tabindex='-1']" ).addClass( "gcweb-v2-not-tabble-persist" );
$( ".gcweb-v2 [role=menuitem]" ).attr( "tabindex", -1 );

/**
* keycode - determines what action to take when a key is pressed
* @private
* @param {object} event - the event that contains information about the key
* @param {string} orientation - whether the menu is horizontal or vertical (navigated with left/right or up/down)
* @returns name of action to take or false if invalid key
* @type string / bool
*/
function keycode( code ) {

	if ( code === 9 ) {
		return "tab";
	}

	if ( code === 13 ) {
		return "enter";
	}
	if ( code === 27 ) {
		return "exit";
	}
	if ( code === 39 ) { //right arrow
		return "right";
	}
	if ( code === 37 ) { //left arrow
		return "left";
	}
	if ( code === 40 ) { //down arrow
		return "down";
	}
	if ( code === 38 ) { //up arrow
		return "up";
	}


	return false;
};

wb.doc.on( "keydown", ".gcweb-v2 button, .gcweb-v2 [role=menuitem]", function( event ) {

	var elm = event.currentTarget,
		key = keycode( event.charCode || event.keyCode );


	// Get the menu item that has the focus.
	var currentFocusIsOn = document.querySelector( "[role=menuitem]:focus" );

	if ( !currentFocusIsOn ) {
		currentFocusIsOn = elm;
	}

	// NEXT MENU ITEM
	var nextSiblingMenuItem;
	if ( currentFocusIsOn.parentElement.nextElementSibling ) {
		nextSiblingMenuItem = currentFocusIsOn.parentElement.nextElementSibling.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );

		// Check if we have hit a separator
		if ( !nextSiblingMenuItem ) {
			nextSiblingMenuItem = currentFocusIsOn.parentElement.nextElementSibling.nextElementSibling.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );
		}
	} else {

		// Get first item
		if ( currentFocusIsOn.parentElement.parentElement.previousElementSibling.classList.contains( "gcweb-v2-not-tabble-persist" ) ) {
			nextSiblingMenuItem = currentFocusIsOn.parentElement.parentElement.parentElement.parentElement.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );
		} else {
			nextSiblingMenuItem = currentFocusIsOn.parentElement.parentElement.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );
		}
	}

	// FIRST CHILD POPOP
	var firstChildPopup;
	if ( currentFocusIsOn.nextElementSibling ) {
		firstChildPopup = currentFocusIsOn.nextElementSibling.querySelector( "[role='menuitem']:not(.gcweb-v2-not-tabble-persist)" );
	}

	// PARENT
	var parentPopupBtn = currentFocusIsOn.parentElement.parentElement.previousElementSibling;

	// PREVIOUS MENU ITEM
	var previousSiblingMenuItem;
	if ( currentFocusIsOn.parentElement.previousElementSibling ) {
		previousSiblingMenuItem = currentFocusIsOn.parentElement.previousElementSibling.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );

		// Check if we have hit a separator
		if ( !previousSiblingMenuItem ) {
			previousSiblingMenuItem = currentFocusIsOn.parentElement.previousElementSibling.previousElementSibling.querySelector( "[role=menuitem]:not(.gcweb-v2-not-tabble-persist)" );
		}
	} else if ( currentFocusIsOn.parentElement.parentElement.previousElementSibling.classList.contains( "gcweb-v2-not-tabble-persist" ) ) {

		// Skip the separator
		var children = currentFocusIsOn.parentElement.parentElement.parentElement.parentElement.children;
		previousSiblingMenuItem = children[ children.length - 3 ].querySelector( "[role=menuitem]" );

	} else if ( currentFocusIsOn.nodeName !== "BUTTON" ) {

		var children = currentFocusIsOn.parentElement.parentElement.children;
		previousSiblingMenuItem = children[ children.length - 1 ].querySelector( "[role=menuitem]" );

		if ( previousSiblingMenuItem.classList.contains( "gcweb-v2-not-tabble-persist" ) ) {
			children = previousSiblingMenuItem.nextElementSibling.children;
			previousSiblingMenuItem = children[ children.length - 1 ].querySelector( "[role=menuitem]" );
		}
	}

	if ( key === "down" && nextSiblingMenuItem ) {
		nextSiblingMenuItem.focus();
	} else if ( key === "up" && previousSiblingMenuItem ) {
		previousSiblingMenuItem.focus();
	} else if ( key === "right" && firstChildPopup ) {
		firstChildPopup.focus();
	} else if ( key === "left" ) {
		parentPopupBtn.focus();
	} else if ( key  === "tab"  ) {
		return;
	}

	// Stop default behaviour
	event.stopImmediatePropagation();
	event.preventDefault();


} );
