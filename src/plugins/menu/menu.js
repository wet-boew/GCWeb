/**
 * @title Menu for GCWeb v2
 * @overview Menu keyboard and mouse interaction with supporting responsiveness
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
( function( $, wb ) {
"use strict";

var componentName = "gcweb-v2",
	selector = ".gcweb-v2",
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	selectorAjaxed =  selector + " [data-ajax-replace]," + selector + " [data-ajax-append]," + selector + " [data-ajax-prepend]," + selector + " [data-wb-ajax]",
	globalTimeoutOn,
	globalTimeoutOff,
	hoverDelay = 350,
	justOpened,
	isMobileMode, // Mobile vs Desktop
	isMediumView,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			ajaxFetch;
		if ( elm ) {

			// If the menu item are ajaxed in, initialize after the ajax is completed
			ajaxFetch = elm.querySelector( selectorAjaxed );

			if ( !ajaxFetch ) {
				onAjaxLoaded( elm.firstChild );
			}


		}
	},
	onAjaxLoaded = function( subElm ) {
		var $elm = $( subElm ).parentsUntil( selector ).parents(),
			htmlClassName = document.querySelector( "html" ).className;
		isMobileMode = htmlClassName.indexOf( "smallview" ) !== -1;
		isMediumView = htmlClassName.indexOf( "mediumview" ) !== -1;

		if ( isMobileMode || isMediumView ) {
			setMnu3LevelOrientationExpandState( false, isMediumView );
		}

		// Identify that initialization has completed
		wb.ready( $elm, componentName );
	};

function OpenMenu( elm ) {

	// If already open, do nothing
	if ( elm.getAttribute( "aria-expanded" ) === "true" ) {
		return;
	}

	// Close the one that is currently open for this level and deeper
	var parentMenu = elm.parentElement.parentElement;

	var menuOpen = parentMenu.querySelector( "[aria-haspopup][aria-expanded=true]:not([data-keep-expanded=md-min])" );

	// Only close other menu in tablet and desktop mode
	if ( menuOpen && !isMobileMode ) {
		CloseMenu( menuOpen, true );
	}

	// Open the menu
	elm.setAttribute( "aria-expanded", "true" );

	justOpened = elm;
	setTimeout( function() {
		justOpened = false;
	}, hoverDelay );

}
function CloseMenu( elm, force ) {

	// Ensure elm is targeted on the haspopup element
	if ( !elm.hasAttribute( "aria-haspopup" ) ) {
		elm = elm.previousElementSibling;
	}

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

	if ( elm.dataset.keepExpanded === "md-min" ) {
		return;
	}

	// Prevent any pending to be open to trigger
	clearTimeout( globalTimeoutOn );

	globalTimeoutOn = setTimeout( function() {
		OpenMenu( elm );
	}, hoverDelay );
}
function CloseMenuWithDelay( elm ) {

	if ( elm.dataset.keepExpanded === "md-min" ) {
		return;
	}

	clearTimeout( globalTimeoutOff );

	globalTimeoutOff = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );
}

// Open menu on mouse hovering
$document.on( "mouseenter", ".gcweb-v2 [aria-haspopup]", function( event ) {

	// There is no "mouseenter" in mobile
	if ( !isMobileMode ) {
		clearTimeout( globalTimeoutOff );
		OpenMenuWithDelay( event.currentTarget );
	}
} );


$document.on( "focusin", ".gcweb-v2 [aria-haspopup]", function( event ) {

	// Don't open the submenu
	if ( isMobileMode ) {
		return;
	}

	// Open the menu, no delay
	OpenMenu( event.currentTarget );

} );

// The user get inside the submenu, we should cancel the "close" with delay event
$document.on( "mouseenter focusin", ".gcweb-v2 [aria-haspopup] + [role=menu]", function( event ) {

	// Prevent the menu to collapse
	// Note: elm.id is already defined because of the mouseenter event of the parent menu element

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.dataset.keepExpanded === "md-min" ) {
		return;
	}

	// There is no "mouseenter" in mobile
	if ( isMobileMode ) {
		return;
	}

	clearTimeout( globalTimeoutOff );
} );


$document.on( "mouseleave", ".gcweb-v2 [aria-haspopup]", function( event ) {

	// There is no "mouseenter" in mobile
	if ( !isMobileMode ) {
		clearTimeout( globalTimeoutOn );
		CloseMenuWithDelay( event.currentTarget );
	}
} );

$document.on( "focusout", ".gcweb-v2 [aria-haspopup]", function( event ) {

	// Don't close the submenu
	if ( isMobileMode ) {
		return;
	}

	// Don't close it if the user go in the submenu
	CloseMenuWithDelay( event.currentTarget );
} );

$document.on( "mouseleave focusout", ".gcweb-v2 [aria-haspopup] + [role=menu]", function( event ) {

	// Collapse the menu
	// Note: elm.id is already defined because of the mouseenter event

	var elm = event.currentTarget.previousElementSibling;

	if ( elm.dataset.keepExpanded === "md-min" ) {
		return;
	}

	// There is no "mouseleave" in mobile
	if ( isMobileMode ) {
		return;
	}

	CloseMenuWithDelay( event.currentTarget );
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
$document.on( "click", ".gcweb-v2 [aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	// Only for mobile view or the menu button
	if ( isMobileMode || elm.nodeName === "BUTTON" ) {

		// Toggle
		if ( elm.getAttribute( "aria-expanded" ) === "true" ) {
			if ( justOpened !== elm ) {
				CloseMenu( elm, true );
			}
		} else {
			OpenMenu( elm );
		}
	}

	// Stop default behaviour
	event.stopImmediatePropagation();
	event.preventDefault();
} );

// This is for the "most requested" menu item
function setMnu3LevelOrientationExpandState( isVertical, isExpanded ) {
	var mnu3Level = document.querySelectorAll( "[role=menu] [role=menu] [role=menuitem][aria-haspopup=true]" ),
		i, i_len = mnu3Level.length,
		expandState = ( isExpanded ? "true" : "false" ),
		orientation = ( isVertical ? "vertical" : "horizontal" ),
		expandStateItem = expandState;

	for ( i = 0; i < i_len; i++ ) {

		// Keep it expanded if focus are inside submenu
		expandStateItem = ( mnu3Level[ i ].nextElementSibling.querySelector( "[role=menuitem]:focus" ) ? "true" : expandState );

		mnu3Level[ i ].setAttribute( "aria-expanded", expandStateItem );
		mnu3Level[ i ].parentElement.previousElementSibling.setAttribute( "aria-orientation", orientation );
	}
}

// Change the main menu mode
$document.on( wb.resizeEvents, function( event ) {

	switch ( event.type ) {
	case "xxsmallview":
	case "xsmallview":
	case "smallview":
		isMobileMode = true;
		setMnu3LevelOrientationExpandState( false, false );
		break;
	case "mediumview":
		isMobileMode = false;
		setMnu3LevelOrientationExpandState( false, true );
		break;
	case "largeview":
	case "xlargeview":
	default:
		isMobileMode = false;
		setMnu3LevelOrientationExpandState( true, true );
	}
} );

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

// Global hook, close the menu on "ESC" when its state are open.
$document.on( "keydown", function( event ) {
	if ( event.keyCode === 27 ) {
		CloseMenu( document.querySelector( ".gcweb-v2 button" ) );
	}
} );

// Keyboard navigation for each menu item
$document.on( "keydown", ".gcweb-v2 button, .gcweb-v2 [role=menuitem]", function( event ) {

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

// When the menu item are ajaxed in
$document.on( "ajax-fetched.wb ajax-failed.wb", selectorAjaxed, function( event ) {

	var elm = event.target;

	// Filter out any events triggered by descendants
	if ( event.currentTarget === elm ) {
		onAjaxLoaded( elm );
	}
} );


// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, wb );
