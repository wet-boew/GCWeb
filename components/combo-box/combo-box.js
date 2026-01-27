/**
 * Accessible Combo Box Web Component with Demo
 *
 * Single file containing:
 * - ComboBoxComponent Web Component class
 * - Demo initialization code
 */

// ============================================
// Accessible Combo Box Web Component
// ============================================

class ComboBoxComponent extends HTMLElement {

	// Static cache for loaded styles
	static stylesCache = null;

	constructor() {
		super();
		this.attachShadow( { mode: "open" } );
		this.selectedItems = [];
		this.filteredOptions = [];
		this.highlightedIndex = -1;
		this.isOpen = false;
		this.allOptions = [];
	}

	connectedCallback() {
		this.initializeComponent();
	}

	// Cleanup when component is removed from DOM
	disconnectedCallback() {
		if ( this.handleDocumentClick ) {
			document.removeEventListener( "click", this.handleDocumentClick );
		}
	}

	// Initializes the Web Component with styles and markup
	async initializeComponent() {
		this.allOptions = this.parseOptions();
		this.filteredOptions = [ ...this.allOptions ];

		await this.render();
		this.cacheElements();
		this.attachEventListeners();
	}

	// Loads styles from combo-box.css file
	static async loadStyles() {
		if ( ComboBoxComponent.stylesCache !== null ) {
			return ComboBoxComponent.stylesCache;
		}

		try {
			const response = await fetch( "combo-box.css" );
			if ( !response.ok ) {
				throw new Error( `Failed to load _combo-box.scss: ${ response.statusText }` );
			}
			ComboBoxComponent.stylesCache = await response.text();
			return ComboBoxComponent.stylesCache;
		} catch ( e ) {
			console.error( "Failed to load styles from _combo-box.scss:", e );
			return ""; // Return empty string as fallback
		}
	}

	// Parses options from the component attribute or slot content
	parseOptions() {
		const optionsAttr = this.getAttribute( "options" );

		if ( optionsAttr ) {
			try {
				return JSON.parse( optionsAttr );
			} catch ( e ) {
				console.error( "Invalid options format. Expected JSON array.", e );
				return [];
			}
		}

		// Alternative: parse from slot content
		const slot = this.querySelector( "[slot='options']" );
		if ( slot ) {
			return Array.from( slot.querySelectorAll( "option" ) ).map( opt => opt.textContent );
		}

		return [];
	}

	// Renders the component template and styles into Shadow DOM
	async render() {

		// To be implemented: i18n support for label and placeholder based on "label" attribute value
		// var i18n, i18nText, label, placeholder;
		// if ( !i18nText ) {
		// 	i18n = wb.i18n;
		// 	i18nText = {
		// 		region_label: i18n( "combo-box-region-label" ),
		// 		institution_label: i18n( "combo-box-institution-label" )
		// 	};
		// }

		// if ( this.getAttribute( "label" ) === "region" ) {
		// 	label = i18nText.region_label;
		// 	placeholder = i18nText( "combo-box-region-label" );
		// } else {
		// 	label = i18nText.institution_label;
		// 	placeholder = i18nText( "combo-box-institution-label" );
		// }

		// For now, we will use the label and placeholder directly from attributes
		const label = this.getAttribute( "label" );
		const placeholder = this.getAttribute( "placeholder" );
		const styles = await this.getStyles();
		this.shadowRoot.innerHTML = `
			<style>
				${ styles }
			</style>

			<div class="combo-box-wrapper">
				<label for="combo-box-input" class="combo-box-label">${ this.escapeHtml( label ) }</label>

				<div class="combo-box-container" role="combobox">
					<div class="tags-container" id="tagsContainer" role="group" aria-label="Selected items">
						<!-- Tags will be dynamically inserted here -->
					</div>

					<input
						type="text"
						id="combo-box-input"
						class="combo-box-input"
						placeholder="${ this.escapeHtml( placeholder ) }"
						autocomplete="off"
						aria-label="Search and select items"
						aria-autocomplete="list"
						aria-controls="combo-box-list"
						aria-expanded="false"
					>
				</div>

				<ul
					id="combo-box-list"
					class="combo-box-list"
					role="listbox"
					aria-label="Available options"
					hidden
				>
					<!-- Options will be dynamically inserted here -->
				</ul>

				<!-- Live region for screen reader announcements -->
				<div id="liveRegion" class="sr-only" aria-live="polite" aria-atomic="true"></div>
			</div>
		`;
	}

	// Caches frequently accessed DOM elements
	cacheElements() {
		this.input = this.shadowRoot.getElementById( "combo-box-input" );
		this.list = this.shadowRoot.getElementById( "combo-box-list" );
		this.tagsContainer = this.shadowRoot.getElementById( "tagsContainer" );
		this.liveRegion = this.shadowRoot.getElementById( "liveRegion" );
	}

	// Attaches all event listeners
	attachEventListeners() {
		this.input.addEventListener( "input", ( e ) => this.handleInput( e ) );
		this.input.addEventListener( "focus", () => {
			this.updateFilteredOptions();
			this.renderOptions();
			this.openList();
		} );
		this.input.addEventListener( "keydown", ( e ) => this.handleKeyDown( e ) );

		// Event delegation for tag removal buttons
		this.tagsContainer.addEventListener( "click", ( e ) => {
			const removeBtn = e.target.closest( ".tag-remove-btn" );
			if ( removeBtn ) {
				const tagText = removeBtn.closest( ".tag" ).querySelector( ".tag-text" ).textContent;
				this.removeTag( tagText );
			}
		} );

		// Event delegation for list options (click and hover)
		this.list.addEventListener( "click", ( e ) => {
			const option = e.target.closest( "[role='option']" );
			if ( option && !option.hasAttribute( "aria-disabled" ) ) {
				const optionText = option.getAttribute( "data-option-text" );
				if ( optionText ) {
					this.selectOption( optionText );
				}
			}
		} );

		this.list.addEventListener( "mouseenter", ( e ) => {
			const option = e.target.closest( "[role='option']" );
			if ( option ) {
				const options = Array.from( this.list.querySelectorAll( "[role='option']" ) );
				this.highlightedIndex = options.indexOf( option );
				this.updateHighlight();
			}
		}, true );

		// Close list when clicking outside the component
		this.handleDocumentClick = ( e ) => {
			if ( !this.contains( e.target ) ) {
				this.closeList();
			}
		};
		document.addEventListener( "click", this.handleDocumentClick );
	}

	// Filters options based on user input
	handleInput( e ) {
		const value = e.target.value.trim();

		this.filteredOptions = [ ...this.allOptions ].filter( option => {
			const matchesSearch = value === "" || option.toLowerCase().includes( value.toLowerCase() );
			const isNotSelected = !this.selectedItems.includes( option );
			return matchesSearch && isNotSelected;
		} );

		this.highlightedIndex = -1;
		this.renderOptions();

		if ( this.filteredOptions.length > 0 ) {
			this.openList();
		} else {
			this.closeList();
		}
	}

	// Handles keyboard navigation and interactions
	handleKeyDown( e ) {
		const key = e.key;

		switch ( key ) {
			case "ArrowDown":
				e.preventDefault();
				this.highlightNext();
				break;
			case "ArrowUp":
				e.preventDefault();
				this.highlightPrevious();
				break;
			case "Enter":
				e.preventDefault();
				if ( this.highlightedIndex >= 0 && this.isOpen ) {
					this.selectOption( this.filteredOptions[ this.highlightedIndex ] );
				}
				break;
			case "Escape":
				e.preventDefault();
				this.closeList();
				this.input.value = "";
				break;
			case "Backspace":
				if ( this.input.value === "" && this.selectedItems.length > 0 ) {
					e.preventDefault();
					this.selectedItems.pop();
					this.renderTags();
					this.updateFilteredOptions();
					this.renderOptions();
				}
				break;
			case "Tab":

				// Close dropdown when Tab is pressed to allow natural focus flow
				this.closeList();
				break;
			default:
				break;
		}
	}

	// Moves highlight to the next option
	highlightNext() {
		if ( !this.isOpen ) {
			this.openList();
			return;
		}

		if ( this.highlightedIndex < this.filteredOptions.length - 1 ) {
			this.highlightedIndex++;
		} else {
			this.highlightedIndex = 0;
		}
		this.updateHighlight();
	}

	// Moves highlight to the previous option
	highlightPrevious() {
		if ( !this.isOpen ) {
			this.openList();
			return;
		}

		if ( this.highlightedIndex > 0 ) {
			this.highlightedIndex--;
		} else {
			this.highlightedIndex = this.filteredOptions.length - 1;
		}
		this.updateHighlight();
	}

	// Updates the visual highlight for the current option
	updateHighlight() {
		const options = this.list.querySelectorAll( "[role='option']" );
		options.forEach( ( option, index ) => {
			if ( index === this.highlightedIndex ) {
				option.setAttribute( "aria-selected", "true" );
				option.scrollIntoView( { block: "nearest" } );

				// Use aria-activedescendant pattern
				if ( option.id ) {
					this.input.setAttribute( "aria-activedescendant", option.id );
				}
			} else {
				option.setAttribute( "aria-selected", "false" );
			}
		} );
	}

	// Announces messages to screen readers via live region
	announce( message ) {
		if ( this.liveRegion ) {
			this.liveRegion.textContent = message;
		}
	}

	// Adds a selected option
	selectOption( option ) {
		if ( !this.selectedItems.includes( option ) ) {
			this.selectedItems.push( option );
			this.renderTags();
			this.input.value = "";
			this.updateFilteredOptions();
			this.renderOptions();
			this.highlightedIndex = -1;
			this.openList();
			this.input.focus();

			// Announce selection to screen readers
			this.announce( `${ option } selected` );

			// Dispatch custom event for external listeners
			this.dispatchEvent( new CustomEvent( "change", {
				detail: { selectedItems: [ ...this.selectedItems ] },
				bubbles: true,
				composed: true
			} ) );
		}
	}

	// Removes a selected item
	removeTag( option ) {
		this.selectedItems = this.selectedItems.filter( item => item !== option );
		this.renderTags();
		this.updateFilteredOptions();
		this.renderOptions();
		this.input.focus();

		// Announce removal to screen readers
		this.announce( `${ option } removed` );

		// Dispatch custom event for external listeners
		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Updates filtered options based on selected items
	updateFilteredOptions() {
		this.filteredOptions = [ ...this.allOptions ].filter(
			item => !this.selectedItems.includes( item )
		);
	}

	// Renders the selected items as tags
	renderTags() {
		this.tagsContainer.innerHTML = "";

		this.selectedItems.forEach( item => {
			const tag = document.createElement( "div" );
			tag.className = "tag";
			tag.innerHTML = `
				<span class="tag-text">${ this.escapeHtml( item ) }</span>
				<button
					type="button"
					class="tag-remove-btn"
					aria-label="Remove ${ item }"
				>
					×
				</button>
			`;

			this.tagsContainer.appendChild( tag );
		} );

		// Update aria-label with selection count
		const count = this.selectedItems.length;
		const label = count === 0 ? "Selected items" : `Selected items (${ count } selected)`;
		this.tagsContainer.setAttribute( "aria-label", label );
	}

	// Renders the filtered options in the dropdown
	renderOptions() {
		this.list.innerHTML = "";
		this.input.removeAttribute( "aria-activedescendant" );

		if ( this.filteredOptions.length === 0 ) {
			const emptyOption = document.createElement( "li" );
			emptyOption.className = "combo-box-option empty-state";
			emptyOption.setAttribute( "role", "option" );
			emptyOption.setAttribute( "aria-disabled", "true" );
			emptyOption.textContent = "No matching options";
			this.list.appendChild( emptyOption );
		} else {
			this.filteredOptions.forEach( ( option ) => {
				const optionElement = document.createElement( "li" );
				const optionId = `combo-option-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;
				optionElement.id = optionId;
				optionElement.className = "combo-box-option";
				optionElement.setAttribute( "role", "option" );
				optionElement.setAttribute( "aria-selected", "false" );
				optionElement.setAttribute( "data-option-text", option );
				optionElement.textContent = option;
				this.list.appendChild( optionElement );
			} );
		}

		this.highlightedIndex = -1;
	}

	// Opens the dropdown list
	openList() {
		if ( !this.isOpen ) {
			this.isOpen = true;
			this.list.removeAttribute( "hidden" );
			this.input.setAttribute( "aria-expanded", "true" );
		}
	}

	// Closes the dropdown list
	closeList() {
		if ( this.isOpen ) {
			this.isOpen = false;
			this.list.setAttribute( "hidden", "" );
			this.input.setAttribute( "aria-expanded", "false" );
			this.highlightedIndex = -1;
		}
	}

	// Escapes HTML special characters
	escapeHtml( text ) {
		const map = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",

			// This breaks the grunt dist build, if we do not need it in this context, we can leave it out
			// '"': "&quot;",
			"'": "&#039;"
		};
		return text.replace( /[&<>"']/g, m => map[ m ] );
	}

	// Returns the encapsulated styles for the Shadow DOM
	async getStyles() {
		return ComboBoxComponent.loadStyles();
	}

	// Public API: Get selected items
	getSelectedItems() {
		return [ ...this.selectedItems ];
	}

	// Public API: Set selected items programmatically
	setSelectedItems( items ) {
		this.selectedItems = items.filter( item => this.allOptions.includes( item ) );
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();

		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Public API: Update options
	setOptions( options ) {
		this.allOptions = options;
		this.selectedItems = this.selectedItems.filter( item => this.allOptions.includes( item ) );
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
	}
}

// Register the custom element
customElements.define( "gc-combobox", ComboBoxComponent );
