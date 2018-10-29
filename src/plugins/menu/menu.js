
var hoverDelay = 350;

function OpenMenu( elm ) {
	elm.setAttribute( "aria-expanded", "true" );
}
function CloseMenu( elm ) {
	elm.setAttribute( "aria-expanded", "false" );
}

/*
var globalTimeoutOn, globalTimeoutOut,
	hoverDelay = 350;
// On hover, wait for the delay before to open the menu
wb.doc.on( "mouseenter", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	clearTimeout( globalTimeoutOn );

	globalTimeoutOn = setTimeout( function() {
		OpenMenu( elm );
	}, hoverDelay );
} );

wb.doc.on( "mouseleave", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	clearTimeout( globalTimeoutOut );

	globalTimeoutOut = setTimeout( function() {
		CloseMenu( elm );
	}, hoverDelay );

} );
*/
wb.doc.on( "focusin", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;
	OpenMenu( elm );
} );

/*
wb.doc.on( "focusout", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;
	CloseMenu( elm );
} );*/

wb.doc.on( "click", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	if ( elm.getAttribute( "tabindex" ) === "-1" ) {
		return;
	}

	// Toggle
	if ( elm.getAttribute( "aria-expanded" ) === "true" ) {
		CloseMenu( elm );
	} else {
		OpenMenu( elm );
	}

} );

var menuBtn = document.getElementById( "gc-menubtn" );

/*
var globalTimeout,

// Hook on the "click or hover" of the menu button.

// Then follow children and apply action based on it's attribute.

var menuBtn = document.getElementById( "gc-menubtn" );

wb.doc.on( "mouseenter focusin click", "[aria-haspopup]", function( event ) {

	if ( event.type === "focusin" && event.currentTarget.id === "gc-menubtn" ) {
		return;
	}

	var elm = event.currentTarget,
		attrControls = elm.getAttribute( "aria-controls" );

	var controls = attrControls.split( " " ),
		i,
		i_len = controls.length;

	for ( i = 0; i < i_len; i++ ) {

		var ctrlElm = document.getElementById( controls[ i ] );
		ctrlElm.classList.add( "open" );
		if ( !elm.id ) {
			elm.id = wb.getId();
		}
		ctrlElm.dataset.wb5ParentController = elm.id;

	}

	elm.setAttribute( "aria-expanded", "true" );

} );
*/
function CloseMeInternal( elm ) {
	var attrControls = elm.getAttribute( "aria-controls" ),
		isActive = elm.classList.contains( "active" );

	// Don't close it if active
	if ( isActive ) {
		return;
	}

	var controls = attrControls.split( " " ),
		i,
		i_len = controls.length;

	for ( i = 0; i < i_len; i++ ) {

		var ctrlElm = document.getElementById( controls[ i ] );
		ctrlElm.classList.remove( "open" );

	}

	elm.setAttribute( "aria-expanded", "false" );

	//onImmediateClose = false;

	if ( elm === menuBtn ) {
		var activeItem = elm.parentNode.querySelector( ".activeItem" );
		if ( activeItem ) {
			activeItem.classList.remove( "activeItem" );
		}
	}

};

//var onImmediateClose = false;

function CloseMe( elm, ifOut ) {

	if ( ifOut ) {

		//onImmediateClose = true;
		setTimeout( function() {
			CloseMeInternal( elm );
		}, hoverDelay );
	} else {
		CloseMeInternal( elm );
	}
}

/*
wb.doc.on( "mouseleave focusout", "[aria-haspopup]", function( event ) {

	var elm = event.currentTarget;

	globalTimeout = setTimeout( function() {
		CloseMe( elm );
	}, hoverDelay );

} );

wb.doc.on( "mouseenter focusin click", ".open", function( event ) {

	// Make it's controler persistant
	var elm = event.currentTarget;

	var controler = document.getElementById( elm.dataset.wb5ParentController );

	controler.classList.add( "active" );

	if ( !onImmediateClose ) {
		clearTimeout( globalTimeout );
	}
} );

wb.doc.on( "mouseleave focusout", ".open", function( event ) {

	// Make it's controler persistant
	var elm = event.currentTarget;

	var controler = document.getElementById( elm.dataset.wb5ParentController );

	controler.classList.remove( "active" );

	CloseMe( controler, true );

} );


//
// Keyboard navigation
//
$( "#gc-drpdown a" ).attr( "tabindex", -1 );

$( "#gc-drpdown a[href='#']" ).click( function( event ) {
	event.preventDefault();
	return true;
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


var menuDataMapToDOM = [ ]; // Mapping of the top menu

var menuTopLevel = document.querySelectorAll( "#gc-menu > li > a" );

for ( var mnuIdx = 0; mnuIdx < menuTopLevel.length; mnuIdx++ ) {

	var mnuCurrent = menuTopLevel[ mnuIdx ];
	var subMenus = mnuCurrent.parentNode.querySelectorAll( "[role=menu]" );
	var allSubMenusItem = mnuCurrent.parentNode.querySelectorAll( "li [role=menu] [role=menuitem]" );

	var mostRequested = subMenus[ 0 ].querySelectorAll( "[role=menuitem]" );
	var subMenuItem = subMenus[ 1 ].querySelectorAll( "[role=menuitem]" );

	var allItemsArray = [];

	allItemsArray.push( mnuCurrent.parentNode.querySelector( "[role=rowheader] > a" ) );

	for ( var i2 = 0; i2 < allSubMenusItem.length; i2++ ) {
		allItemsArray.push( allSubMenusItem[ i2 ] );
	}

	menuDataMapToDOM.push(
		{
			menuitem: mnuCurrent,
			mostrequested: mostRequested,
			submenu: subMenuItem,
			allsubmenu: allItemsArray
		}
	);

}

console.log( menuDataMapToDOM );


wb.doc.on( "keydown", "#gc-menubtn, .activeItem", function( event ) {

	var elm = event.currentTarget,
		key = keycode( event.charCode || event.keyCode );

	var currentFocusItem = elm.parentNode.querySelector( ".activeItem" );

	var isTopMenu, //isMostRequested,
		isSubMenu,
		currentMenu,
		indexCurrentItem = -1;

	if ( currentFocusItem ) {

		// Find where it is
		for ( var j = 0; j < menuDataMapToDOM.length; j++ ) {

			// Top menu
			var menu = menuDataMapToDOM[ j ];
			if ( menu.menuitem === currentFocusItem ) {
				isTopMenu = true;
				indexCurrentItem = j;
				currentMenu = menu;
				break;
			}

			/*// is Most Requested sub menu
			for ( var i = 0; i < menu.mostrequested.length; i++ ) {
				if ( currentFocusItem === menu.mostrequested[ i ] ) {
					isMostRequested = true;
					break;
				}
			}*/

			// Is sub Menu
			for ( var i = 0; i < menu.allsubmenu.length; i++ ) {
				if ( currentFocusItem === menu.allsubmenu[ i ] ) {
					isSubMenu = true;
					indexCurrentItem = i;
					break;
				}
			}

			if ( indexCurrentItem !== -1 ) {
				currentMenu = menu;
				break;
			}
		}

		// Remove the "activeItem" flag
		currentFocusItem.classList.remove( "activeItem" );
	} else {
		isTopMenu = true;
	}


	switch ( key ) {
	case "tab":

		// Close the top menu
		CloseMe( elm );
		return;

	case "right":

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();

		if ( isTopMenu ) {

			// Move the focus in the submenu panel

			// Focus the item.
			currentMenu.allsubmenu[ 0 ].classList.add( "activeItem" );
			currentMenu.allsubmenu[ 0 ].focus();

		} else {
			currentFocusItem.classList.add( "activeItem" );
		}

		return true;

	case "left":

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();

		if ( isSubMenu ) {

			// Move the focus in the submenu panel

			// Focus the item.
			currentMenu.menuitem.classList.add( "activeItem" );
			currentMenu.menuitem.focus();

		} else {
			currentFocusItem.classList.add( "activeItem" );
		}
		return true;

	case "down":

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();


		if ( isTopMenu && !currentMenu ) {

			// Focus the first item.
			menuDataMapToDOM[ 0 ].menuitem.classList.add( "activeItem" );
			menuDataMapToDOM[ 0 ].menuitem.focus();
			return true;
		}


		if ( isTopMenu ) {

			// The submenu open, because the item that got the focus indicate there is a haspopup

			// Get the next index
			var nextMenu = indexCurrentItem + 1;
			if ( nextMenu === menuDataMapToDOM.length ) {
				nextMenu = 0;
			}

			// Focus the item.
			menuDataMapToDOM[ nextMenu ].menuitem.classList.add( "activeItem" );
			menuDataMapToDOM[ nextMenu ].menuitem.focus();
			return true;
		}

		if ( isSubMenu ) {

			// Get the next index
			var nextMenu = indexCurrentItem + 1;
			if ( nextMenu === currentMenu.allsubmenu.length ) {

				// Focus on the most requested
				nextMenu = 0;
			}

			// Focus the item.
			currentMenu.allsubmenu[ nextMenu ].classList.add( "activeItem" );
			currentMenu.allsubmenu[ nextMenu ].focus();
			return true;
		}


	case "up":

		// Stop default behaviour
		event.stopImmediatePropagation();
		event.preventDefault();


		if ( isTopMenu && !currentMenu ) {

			// Focus the last item.
			menuDataMapToDOM[ menuDataMapToDOM.length - 1 ].menuitem.classList.add( "activeItem" );
			menuDataMapToDOM[ menuDataMapToDOM.length - 1 ].menuitem.focus();
			return true;
		}


		if ( isTopMenu ) {

			// Should we open the corresponding subMenu, or wait a little before?

			// Get the next index
			var nextMenu = indexCurrentItem - 1;
			if ( nextMenu === -1 ) {
				nextMenu = menuDataMapToDOM.length - 1;
			}

			// Focus the item.
			menuDataMapToDOM[ nextMenu ].menuitem.classList.add( "activeItem" );
			menuDataMapToDOM[ nextMenu ].menuitem.focus();
			return true;
		}


		if ( isSubMenu ) {

			// Get the next index
			var nextMenu = indexCurrentItem - 1;
			if ( nextMenu === -1 ) {
				nextMenu = currentMenu.allsubmenu.length - 1;
			}

			// Focus the item.
			currentMenu.allsubmenu[ nextMenu ].classList.add( "activeItem" );
			currentMenu.allsubmenu[ nextMenu ].focus();
			return true;
		}

	}
} );
