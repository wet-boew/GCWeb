/*
 *
 * GCWeb v2 - keyboard navigation prototype
 *
 */

var globalTimeoutOn = {},
	globalTimeoutOff = {},
	globalTimeoutOnTry2,
	globalTimeoutOffTry2,
	hoverDelay = 350,
	justOpened,
	isMobileMode = document.querySelector( "html" ).className.indexOf( "smallview" ) !== -1; // Mobile vs Desktop

function OpenMenu( elm ) {

	// Close the one that is currently open for this level and deeper
	var parentMenu = elm.parentElement.parentElement;

	var menuOpen = parentMenu.querySelector( "[aria-haspopup][aria-expanded=true]:not(.gcweb-v2-not-tabble-persist)" );

	// Only close other menu in tablet and desktop mode
	if ( menuOpen && !isMobileMode ) {
		CloseMenu( menuOpen, true );
	}

	// Open the menu
	elm.setAttribute( "aria-expanded", "true" );

	justOpened = elm;
	setTimeout( function() {
		justOpened = false;
	}, 200 );

}
function CloseMenu( elm, force ) {

	if ( !force ) {

		// Can the menu be closed?
		// Get the menu item that has the focus.
		var currentFocusIsOn = elm.nextElementSibling.querySelector( "[role=menuitem]:focus" );
		var siblingHasFocus = elm.parentElement.parentElement.querySelector( "[role=menuitem]:focus" );

		// Check if we keep the menu opon
		if ( currentFocusIsOn || siblingHasFocus === elm ) {
			return;
		}
	}

	elm.setAttribute( "aria-expanded", "false" );
}

// On hover, wait for the delay before to open the menu
function OpenMenuWithDelay( elm ) {

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	// Prevent any pending to be open to trigger
	clearTimeout( globalTimeoutOnTry2 );

	globalTimeoutOnTry2 = setTimeout( function() {
		OpenMenu( elm );
	}, hoverDelay );
}
function CloseMenuWithDelay( elm ) {

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	clearTimeout( globalTimeoutOffTry2 );

	globalTimeoutOffTry2 = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );
}

// Open menu on mouse hovering
wb.doc.on( "mouseenter", "[aria-haspopup]", function( event ) {

	// There is no "mouseenter" in mobile
	if ( !isMobileMode ) {
		OpenMenuWithDelay( event.currentTarget );
	}
} );


wb.doc.on( "focusin", "[aria-haspopup]", function( event ) {

	// Don't open the submenu
	if ( isMobileMode ) {
		return;
	}

	// Open the menu, no delay
	OpenMenu( event.currentTarget );

} );

// The user get inside the submenu, we should cancel the "close" with delay event
wb.doc.on( "mouseenter focusin", "[aria-haspopup] + [role=menu]", function( event ) {

	// Prevent the menu to collapse
	// Note: elm.id is already defined because of the mouseenter event of the parent menu element

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	// There is no "mouseenter" in mobile
	if ( isMobileMode ) {
		return;
	}
	clearTimeout( globalTimeoutOnTry2 );
	clearTimeout( globalTimeoutOffTry2 );
} );


wb.doc.on( "mouseleave", "[aria-haspopup]", function( event ) {

	// There is no "mouseenter" in mobile
	if ( !isMobileMode ) {
		CloseMenuWithDelay( event.currentTarget );
	}
} );

wb.doc.on( "focusout", "[aria-haspopup]", function( event ) {

	// Don't close the submenu
	if ( isMobileMode ) {
		return;
	}

	// Don't close it if the user go in the submenu
	CloseMenuWithDelay( event.currentTarget );
} );

wb.doc.on( "mouseleave focusout", "[aria-haspopup] + [role=menu]", function( event ) {

	// Collapse the menu
	// Note: elm.id is already defined because of the mouseenter event

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.classList.contains( "gcweb-v2-not-tabble-persist" ) ) { // elm.getAttribute( "tabindex") === "-1" ) {
		return;
	}

	// There is no "mouseleave" in mobile
	if ( isMobileMode ) {
		return;
	}

	clearTimeout( globalTimeoutOn[ elm.id ] );

	globalTimeoutOff[ elm.id ] = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );
} );


/* **** Do we need to handle the click??? that will be handled by the "focusin" and "focusout" if something */
/*
   Menu current state is...       | Action
  --------------------------------+------------------
    Open                          |  Close the menu
  --------------------------------+------------------
    Delay to be open              |  Open the menu right now
  --------------------------------+------------------
    Short delay after it was open |  Keep the menu open
  --------------------------------+------------------
    Close                         |  Open the menu
  --------------------------------+------------------
*/

// Open right away the popup
wb.doc.on( "click", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	// Only for mobile view
	if ( isMobileMode ) {

		// Toggle
		if ( elm.getAttribute( "aria-expanded" ) === "true" ) {
			if ( justOpened !== elm ) {
				CloseMenu( elm, true );
			}
		} else {
			OpenMenu( elm );
		}

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();
	}
} );

function transformForMobileMode() {

	isMobileMode = true;

	// CollapseThirdMenuLevel
	// Expand the "most requested" link
	var mnu3Level = document.querySelectorAll( "[role=menu] [role=menu] [role=menuitem][aria-haspopup=menu]" ),
		i, i_len = mnu3Level.length;

	for ( i = 0; i < i_len; i++ ) {
		mnu3Level[ i ].setAttribute( "aria-expanded", "false" );

		// Change the orientation of the preceding separator
		mnu3Level[ i ].parentElement.previousElementSibling.setAttribute( "aria-orientation", "horizontal" );
	}
}

function transformForDesktopMode() {

	isMobileMode = false;

	// ExpandThirdMenuLevel
	// Expand the "most requested" link
	var mnu3Level = document.querySelectorAll( "[role=menu] [role=menu] [role=menuitem][aria-haspopup=menu]" ),
		i, i_len = mnu3Level.length;

	for ( i = 0; i < i_len; i++ ) {
		mnu3Level[ i ].setAttribute( "aria-expanded", "true" );

		// Change the orientation of the preceding separator
		mnu3Level[ i ].parentElement.previousElementSibling.setAttribute( "aria-orientation", "vertical" );
	}
}

wb.doc.on( "mediumview.wb largeview.wb xlargeview.wb", transformForDesktopMode );
wb.doc.on( "smallview.wb xsmallview.wb", transformForMobileMode );

// If we are in mobile, collapse the third menu level
if ( isMobileMode ) {
	transformForMobileMode();
}

//
// Initialisation of the keyboard navigation
//

// Make menu-item not tabbable
$( ".gcweb-v2 [data-keep-expanded=md-min]" ).addClass( "gcweb-v2-not-tabble-persist" );
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

	if ( code === 13 || code === 32 ) {
		return "enter";
	}
	if ( code === 27 ) {
		return "esc";
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
	var currentFocusIsOn = document.querySelector( "[role=menuitem]:focus" ) || elm,
		parent = currentFocusIsOn.parentElement,
		grandParent = parent.parentElement,
		isCurrentButtonMenu = ( currentFocusIsOn.nodeName === "BUTTON" );

	// FIRST CHILD POPOP
	var firstChildPopup;
	if ( currentFocusIsOn.nextElementSibling ) {
		firstChildPopup = currentFocusIsOn.nextElementSibling.querySelector( "[role='menuitem']" );
	}

	// NEXT MENU ITEM
	var nextSiblingMenuItem;
	if ( parent.nextElementSibling ) {
		nextSiblingMenuItem = parent.nextElementSibling.querySelector( "[role=menuitem]" );

		// Check if we have hit a separator, go to the next one. The separator can't be the last item and are not followed by another separator.
		if ( !nextSiblingMenuItem ) {
			nextSiblingMenuItem = parent.nextElementSibling.nextElementSibling.querySelector( "[role=menuitem]" );
		}
	} else {

		// Get first item and take in consideration if the sub-menu is persistant open
		if ( !isMobileMode && currentFocusIsOn.dataset.keepExpanded && firstChildPopup ) {

			// The current focus is on a persistant open menu item, the next menu item is the first child
			nextSiblingMenuItem = firstChildPopup;
		} else if ( !isMobileMode && grandParent.previousElementSibling.dataset.keepExpanded ) {

			// The current focus is on the last item of the persistant menu
			// Should go the next item of the parent menu item (not supported),
			// but in our use case this is the first item of the parent men
			nextSiblingMenuItem = grandParent.parentElement.parentElement.querySelector( "[role=menuitem]" );
		} else {
			nextSiblingMenuItem = grandParent.querySelector( "[role=menuitem]" );
		}
	}

	// PARENT
	var parentPopupBtn = grandParent.previousElementSibling;

	// PREVIOUS MENU ITEM
	var previousSiblingMenuItem;
	if ( parent.previousElementSibling ) {
		previousSiblingMenuItem = parent.previousElementSibling.querySelector( "[role=menuitem]" );

		// Check if we have hit a separator. A separator is not the first items
		if ( !previousSiblingMenuItem ) {
			previousSiblingMenuItem = parent.previousElementSibling.previousElementSibling.querySelector( "[role=menuitem]" );
		}
	} else {

		// Get the last item, take in consideration one level of persistant open menu
		if ( !isMobileMode && grandParent.lastElementChild.querySelector( "[role=menuitem]" ).dataset.keepExpanded ) {

			// The last item is persistant open, get it's last children
			previousSiblingMenuItem = grandParent.lastElementChild.querySelector( "[role=menuitem]" ).nextElementSibling.lastElementChild.querySelector( "[role=menuitem]" );
		} else if ( !isMobileMode && grandParent.previousElementSibling.dataset.keepExpanded && parentPopupBtn ) {

			// Get the parent, this is the first items of a persistant open menu
			previousSiblingMenuItem = parentPopupBtn;
		} else if ( isCurrentButtonMenu ) {

			// Get the last menu item
			previousSiblingMenuItem = currentFocusIsOn.nextElementSibling.lastElementChild.querySelector( "[role=menuitem]" );
		} else {

			// Get the last item of the current menu
			previousSiblingMenuItem = grandParent.lastElementChild.querySelector( "[role=menuitem]" );
		}

	}

	// NEXT Menu item after the Separator
	// Next Separator Orientation
	var isNextSeparatorOrientationVertical,
		nextSeparatorMenuItem,
		iteratedItem = parent;
	while ( iteratedItem.nextElementSibling ) {
		iteratedItem = iteratedItem.nextElementSibling;
		if ( iteratedItem.getAttribute( "role" ) === "separator" ) {
			if ( iteratedItem.hasAttribute( "aria-orientation" ) && iteratedItem.getAttribute( "aria-orientation" ) === "vertical" ) {
				isNextSeparatorOrientationVertical = true;
			} else {
				isNextSeparatorOrientationVertical = false;
			}
			nextSeparatorMenuItem = iteratedItem.nextElementSibling.querySelector( "[role=menuitem]" );
			break;
		}
	}

	// Previous Menu item after the Separator
	// Previous Separator Orientation
	var isPreviousSeparatorOrientationVertical,
		previousSeparatorMenuItem;
	iteratedItem = parent;
	while ( iteratedItem.previousElementSibling ) {
		iteratedItem = iteratedItem.previousElementSibling;
		if ( iteratedItem.getAttribute( "role" ) === "separator" ) {
			if ( previousSeparatorMenuItem ) {
				break; // Run until we reach the first item or the next separator.
			}
			if ( iteratedItem.hasAttribute( "aria-orientation" ) && iteratedItem.getAttribute( "aria-orientation" ) === "vertical" ) {
				isPreviousSeparatorOrientationVertical = true;
			} else {
				isPreviousSeparatorOrientationVertical = false;
			}
			previousSeparatorMenuItem = iteratedItem.previousElementSibling;
		}
		if ( previousSeparatorMenuItem ) {
			previousSeparatorMenuItem = iteratedItem; // Run until we reach the first item or the next separator.
		}
	}

	// Ensure we are pointing to the first menu item
	if ( previousSeparatorMenuItem ) {
		previousSeparatorMenuItem = previousSeparatorMenuItem.querySelector( "[role=menuitem]" );
	}

	/*
	 * Developer note:

	For the "Most requested" menu.
	- Don't skip that navigation item when it receive the focus
	- when looking for the last, if that menuitem is expanded, then grab it's last items.
	*/

	if ( !isCurrentButtonMenu ) {
		currentFocusIsOn.setAttribute( "tabindex", "-1" );
	}

	var elmToGiveFocus;
	if ( key === "down" && nextSiblingMenuItem  ) {
		elmToGiveFocus = nextSiblingMenuItem;
	} else if ( key === "up" && previousSiblingMenuItem ) {
		elmToGiveFocus = previousSiblingMenuItem;
	} else if ( ( !isCurrentButtonMenu && key === "right" && firstChildPopup ) || key === "enter" && firstChildPopup ) {
		elmToGiveFocus = firstChildPopup;
	} else if ( isNextSeparatorOrientationVertical && key === "right" ) {
		elmToGiveFocus = nextSeparatorMenuItem;
	} else if ( isPreviousSeparatorOrientationVertical && key === "left" ) {
		elmToGiveFocus = previousSeparatorMenuItem;
	} else if ( ( !isCurrentButtonMenu && key === "left" ) || ( !isCurrentButtonMenu && key === "esc" ) ) {
		elmToGiveFocus = parentPopupBtn;
	} else if ( key  === "tab"  ) {
		return;
	}

	if ( !isCurrentButtonMenu && ( key === "left" ||  key === "esc" ) ) {

		// Close the menu
		if ( isMobileMode &&
				elmToGiveFocus.getAttribute( "aria-expanded" ) === "true" ) {
			elmToGiveFocus.setAttribute( "aria-expanded", "false" );
		}
	}

	// Focus on the element
	if ( elmToGiveFocus ) {

		// Open the sub-menu automatically for mobile and menu button
		if ( isMobileMode || isCurrentButtonMenu ) {
			var popup = elmToGiveFocus.parentElement.parentElement.previousElementSibling;
			if ( popup.getAttribute( "aria-expanded" ) !== "true" ) {

				// Open the menu, no delay
				OpenMenu( popup );
			}
		}

		elmToGiveFocus.setAttribute( "tabindex", "0" );
		elmToGiveFocus.focus();

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();
	}

} );
