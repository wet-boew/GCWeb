/**
 * @title WET-BOEW Follow us component
 * @overview Plugin used to replace Twitter with "X" - Deprecated
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */
( function( $, window, wb ) {
"use strict";

var $document = wb.doc,
	componentName = "page-type-theme",
	selector = "." + componentName,
	initEvent = "wb-init " + selector,
	themeMenuBtn,
	themeMenuIcon,
	themeNav,
	themeNavUL,
	themeContent,
	featuresContainer,
	gridContainer,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );

		if ( elm && event.currentTarget === event.target ) {
			themeMenuBtn = document.querySelector( "#menu-btn" );
			themeMenuIcon = themeMenuBtn.querySelector( ".glyphicon" );
			themeNav = document.querySelector( "#theme-nav" );
			themeNavUL = themeNav.querySelector( "ul" );
			themeContent = document.querySelector( "#theme-content" );
			gridContainer = document.querySelector( "#gridContainer" );
			featuresContainer = document.querySelector( "#theme-features" );

			// Initialize history state for first load
			history.replaceState( { url: location.href }, "", location.href );

			themeNavUL.id = themeNavUL.id || wb.getId();
			$( themeNav ).trigger( "navcurr.wb" ); // Highlight the current page in the menu

			themeMenuBtn.setAttribute( "aria-controls", themeNavUL.id );
			themeMenuBtn.setAttribute( "aria-expanded", "false" );
			themeMenuIcon.setAttribute( "aria-hidden", "true" );
			themeContent.setAttribute( "aria-live", "polite" );

			// Ensure current item has aria-current="page"
			var curr = themeNavUL.querySelector( ".wb-navcurr" );
			if ( curr ) {
				curr.setAttribute( "aria-current", "page" );
			}

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	},
	loadThemeContent = function( url ) {
		fetch( url, { credentials: "same-origin" } )
			.then( function( response ) {
				if ( !response.ok ) {
					throw new Error( response.status );
				}
				return response.text();
			} )
			.then( function( html ) {
				var doc = new DOMParser().parseFromString( html, "text/html" ),
					newContent = doc.querySelector( "#theme-content" ),
					newFeatures = doc.querySelector( "#theme-features" ),
					newTitle = doc.querySelector( "title" );

				if ( !newContent ) {
					throw new Error( "#theme-content not found in requested page" );
				}

				// Replace title and content
				$( themeContent ).html( newContent.innerHTML );
				if ( !featuresContainer ) {
					featuresContainer = document.createElement( "div" );
					featuresContainer.id = "theme-features";
					featuresContainer.className = "container";
					gridContainer.after( featuresContainer );
				}
				$( featuresContainer ).html( newFeatures ? newFeatures.innerHTML : "" );
				document.title = newTitle.textContent;

				// Accessibility: move focus
				themeContent.setAttribute( "tabindex", "-1" );
				themeContent.focus();
			} )
			.catch( function( err ) {
				console.error( "Content load failed:", err );
			} );
	},
	updateNavState = function( url ) {
		var current = new URL( url, location.origin ).href;

		themeNavUL.querySelectorAll( "a" ).forEach( function( link ) {
			var linkHref = new URL( link.href, location.origin ).href;

			link.classList.remove( "wb-navcurr" );
			link.removeAttribute( "aria-current" );

			if ( linkHref === current ) {
				link.classList.add( "wb-navcurr" );
				link.setAttribute( "aria-current", "page" );
			}
		} );
	},
	toggleMenu = function( forceClose ) {
		var expanded = themeMenuBtn.getAttribute( "aria-expanded" ) === "true";

		if ( forceClose || expanded ) {
			themeMenuBtn.setAttribute( "aria-expanded", "false" );
			themeMenuBtn.classList.remove( "expanded" );
		} else {
			themeMenuBtn.setAttribute( "aria-expanded", "true" );
			themeMenuBtn.classList.add( "expanded" );
		}
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// On click of the menu button
$document.on( "click", "#menu-btn", function() {
	toggleMenu();
} );

// Handle nav link clicks
$document.on( "click", "#theme-nav ul li a", function( event ) {
	let target = event.currentTarget,
		url = target.href;

	// If the link is already the current page or a placeholder, do nothing
	if ( target.classList.contains( "wb-navcurr" ) || target.getAttribute( "href" ) === "#" ) {
		event.preventDefault();
		return;
	}

	// If the link is outside Canada.ca, navigate to page as usual
	if ( !url.startsWith( location.origin ) ) {
		return;
	}

	event.preventDefault();

	toggleMenu( true );
	loadThemeContent( url );
	updateNavState( url );

	history.pushState( { url: url }, "", url );
} );

// Handle browser Back / Forward buttons
window.addEventListener( "popstate", function( e ) {
	if ( e.state && e.state.url ) {
		loadThemeContent( e.state.url );
		updateNavState( e.state.url );
	}
} );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
