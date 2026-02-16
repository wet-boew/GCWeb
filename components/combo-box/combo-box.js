( function( window, document ) {
"use strict";

var componentName = "gc-combo-box",
	selector = "." +  componentName,
	initEvent = "wb-init." + componentName,

	// Sample data - can be replaced with API calls
	allOptions = [
		"JavaScript",
		"TypeScript",
		"React",
		"Vue",
		"Angular",
		"Node.js",
		"Express",
		"Python",
		"Django",
		"Flask",
		"Java",
		"Spring Boot",
		"HTML",
		"CSS",
		"Webpack",
		"Babel",
		"GraphQL",
		"REST API"
	],

	/**
	 * @method init
	 * @param {Event} event Event that triggered the function call
	 */
	init = function( event ) {
		var elm = event.target || event,
			input = elm.querySelector( "#combo-box-input" ),
			list = elm.querySelector( "#combo-box-list" ),
			tagsContainer = elm.querySelector( "#tagsContainer" ),
			selectedItems = [],
			filteredOptions = [],
			highlightedIndex = -1,
			isOpen = false;

		if ( !input || !list || !tagsContainer ) {
			console.warn( "Combo-box: Required elements not found" );
			return;
		}

		// Attaches all event listeners for input, focus, keyboard, and document click events
		var attachEventListeners = function() {
			input.addEventListener( "input", handleInput );
			input.addEventListener( "focus", openList );
			input.addEventListener( "keydown", handleKeyDown );
			document.addEventListener( "click", function( e ) {
				if ( !e.target.closest( selector ) ) {
					closeList();
				}
			} );
		};

		// Filters options based on user input and manages dropdown visibility
		var handleInput = function( e ) {
			var value = e.target.value.trim();

			if ( value === "" ) {

				// Create a filtered list excluding already selected items
				filteredOptions = allOptions.filter( function( option ) {
					return selectedItems.indexOf( option ) === -1;
				} );
			} else {

				// Filter options based on input (case-insensitive), excluding already selected items
				filteredOptions = allOptions.filter( function( option ) {
					return option.toLowerCase().indexOf( value.toLowerCase() ) !== -1 &&
						selectedItems.indexOf( option ) === -1;
				} );
			}

			highlightedIndex = -1;
			renderOptions();

			// Open list if there are matching options
			if ( filteredOptions.length > 0 ) {
				openList();
			} else {
				closeList();
			}
		};

		// Handles keyboard navigation (arrows, enter, escape, backspace) and selection
		var handleKeyDown = function( e ) {
			var key = e.key;

			switch ( key ) {
				case "ArrowDown":
					e.preventDefault();
					highlightNext();
					break;
				case "ArrowUp":
					e.preventDefault();
					highlightPrevious();
					break;
				case "Enter":
					e.preventDefault();
					if ( highlightedIndex >= 0 && isOpen ) {
						selectOption( filteredOptions[ highlightedIndex ] );
					}
					break;
				case "Escape":
					e.preventDefault();
					closeList();
					input.value = "";
					break;
				case "Backspace":

					// Remove last tag if input is empty
					if ( input.value === "" && selectedItems.length > 0 ) {
						e.preventDefault();
						selectedItems.pop();
						renderTags();
						filteredOptions = allOptions.filter( function( option ) {
							return selectedItems.indexOf( option ) === -1;
						} );
						renderOptions();
					}
					break;
				default:
					break;
			}
		};

		// Moves highlight to the next option in the filtered list, wrapping around at the end
		var highlightNext = function() {
			if ( !isOpen ) {
				openList();
				return;
			}

			if ( highlightedIndex < filteredOptions.length - 1 ) {
				highlightedIndex++;
			} else {
				highlightedIndex = 0; // Wrap around
			}
			updateHighlight();
		};

		// Moves highlight to the previous option in the filtered list, wrapping around at the start
		var highlightPrevious = function() {
			if ( !isOpen ) {
				openList();
				return;
			}

			if ( highlightedIndex > 0 ) {
				highlightedIndex--;
			} else {
				highlightedIndex = filteredOptions.length - 1; // Wrap around
			}
			updateHighlight();
		};

		// Updates visual and ARIA attributes for the currently highlighted option
		var updateHighlight = function() {
			var options = list.querySelectorAll( "[role='option']" );
			for ( var i = 0; i < options.length; i++ ) {
				if ( i === highlightedIndex ) {
					options[ i ].setAttribute( "aria-current", "true" );
					options[ i ].focus();
					options[ i ].scrollIntoView( { block: "nearest" } );
				} else {
					options[ i ].removeAttribute( "aria-current" );
				}
			}
		};

		// Adds a selected option to the list and updates tags and filtered options
		var selectOption = function( option ) {
			if ( selectedItems.indexOf( option ) === -1 ) {
				selectedItems.push( option );
				renderTags();
				input.value = "";
				filteredOptions = allOptions.filter( function( item ) {
					return selectedItems.indexOf( item ) === -1;
				} );
				renderOptions();
				highlightedIndex = -1;

				// Close list after selection and keep focus on input
				closeList();
				input.focus();
			}
		};

		// Removes a selected item from the tags container and updates the filtered options
		var removeTag = function( option ) {
			selectedItems = selectedItems.filter( function( item ) {
				return item !== option;
			} );
			renderTags();
			filteredOptions = allOptions.filter( function( item ) {
				return selectedItems.indexOf( item ) === -1;
			} );
			renderOptions();
			input.focus();
		};

		// Renders the selected items as tags with remove buttons in the tags container
		var renderTags = function() {
			tagsContainer.innerHTML = "";

			selectedItems.forEach( function( item ) {
				var tag = document.createElement( "div" );
				tag.className = "tag";
				tag.innerHTML = `
					<span class="tag-text">${ escapeHtml( item ) }</span>
					<button
						type="button"
						class="tag-remove-btn"
						aria-label="Remove ${ item }"
						data-item="${ escapeHtml( item ) }"
					>
						\u00d7
					</button>
				`;

				var removeBtn = tag.querySelector( ".tag-remove-btn" );
				removeBtn.addEventListener( "click", function() {
					removeTag( item );
				} );

				tagsContainer.appendChild( tag );
			} );

			// Update aria-expanded state based on whether the list is currently open
			input.setAttribute(
				"aria-expanded",
				isOpen ? "true" : "false"
			);
		};

		// Renders the filtered options as list items in the dropdown
		var renderOptions = function() {
			list.innerHTML = "";

			if ( filteredOptions.length === 0 ) {
				var emptyOption = document.createElement( "li" );
				emptyOption.className = "combo-box-option empty-state";
				emptyOption.setAttribute( "role", "option" );
				emptyOption.textContent = "No matching options";
				list.appendChild( emptyOption );
			} else {
				filteredOptions.forEach( function( option, index ) {
					var optionElement = document.createElement( "li" );
					optionElement.className = "combo-box-option";
					optionElement.setAttribute( "role", "option" );
					optionElement.setAttribute( "aria-selected", "false" );
					optionElement.textContent = option;

					optionElement.addEventListener( "click", function() {
						selectOption( option );
					} );

					optionElement.addEventListener( "mouseenter", function() {
						highlightedIndex = index;
						updateHighlight();
					} );

					list.appendChild( optionElement );
				} );
			}

			highlightedIndex = -1;
		};

		// Opens the dropdown list and updates ARIA attributes
		var openList = function() {
			if ( !isOpen ) {
				isOpen = true;
				list.removeAttribute( "hidden" );
				input.setAttribute( "aria-expanded", "true" );
			}
		};

		// Closes the dropdown list and resets highlight state
		var closeList = function() {
			if ( isOpen ) {
				isOpen = false;
				list.setAttribute( "hidden", "" );
				input.setAttribute( "aria-expanded", "false" );
				highlightedIndex = -1;
			}
		};

		// Escapes HTML special characters to prevent XSS attacks
		var escapeHtml = function( text ) {
			var map = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#039;",
				"\"": "&quot;"
			};
			return text.replace( /[&<>"']/g, function( m ) {
				return map[ m ];
			} );
		};

		// Initialize the component
		attachEventListeners();
		renderOptions();

		elm.classList.add( "wb-init" );
	};

// Bind the init event of the plugin
document.addEventListener( initEvent, init );

// Initialize on all matching elements on page load
document.addEventListener( "DOMContentLoaded", function() {
	var elements = document.querySelectorAll( selector );
	for ( var i = 0; i < elements.length; i++ ) {
		init( { target: elements[ i ] } );
	}
} );

} )( window, document );
