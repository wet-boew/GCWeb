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
		this.selectAllCheckboxChecked = false;
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
		this.allOptions = await this.parseOptions();
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

	// Parses options from JSON files based on the label attribute
	async parseOptions() {
		const labelType = this.getAttribute( "label" ) || this.getAttribute( "placeholder" );

		// If options are explicitly provided via attribute, use those
		const optionsAttr = this.getAttribute( "options" );
		if ( optionsAttr ) {
			try {
				return JSON.parse( optionsAttr );
			} catch ( e ) {
				console.error( "Invalid options format. Expected JSON array.", e );
			}
		}

		// Map label types to JSON files
		const fileMap = {
			"region": "regions.json",
			"institution": "institutions.json"
		};

		const jsonFile = fileMap[ labelType?.toLowerCase() ];
		if ( !jsonFile ) {

			// Fallback to parsing from slot content if no matching label type
			const slot = this.querySelector( "[slot='options']" );
			if ( slot ) {
				return Array.from( slot.querySelectorAll( "option" ) ).map( opt => opt.textContent );
			}
			return [];
		}

		try {
			const response = await fetch( jsonFile );
			if ( !response.ok ) {
				throw new Error( `Failed to load ${ jsonFile }: ${ response.statusText }` );
			}
			const data = await response.json();

			// Determine page language (default to English)
			const pageLanguage = ( document.documentElement.lang || "en" );

			// Extract the display values based on the page language
			const options = Object.values( data ).map( item => {

				// Support both nested language objects and simple values
				if ( typeof item === "object" && item !== null ) {
					return item[ pageLanguage ] || item.en || item.fr || Object.values( item )[ 0 ];
				}
				return String( item );
			} );

			return options;
		} catch ( e ) {
			console.error( `Error loading options from ${ jsonFile }:`, e );
			return [];
		}
	}

	// Renders the component template and styles into Shadow DOM
	async render() {

		var defaults = {
			i18n:
			{
				"en": {
					region: "Select region(s)", // text for the region label
					institution: "Select institution(s)", // text for the institution label
					selectAll: "Select all" // text for the select all checkbox
				},
				"fr": {
					region: "Sélectionner région(s)", // text for the french region label
					institution: "Sélectionner institution(s)", // text for the french institution label
					selectAll: "Sélectionner tous" // text for the french select all checkbox
				}
			}
		};

		// Determine page language (default to English)
		const pageLanguage = ( document.documentElement.lang || "en" );

		// Get label type from attribute (e.g., "region" or "institution")
		const labelType = this.getAttribute( "label" );

		// Get label and placeholder from i18n based on page language and label type
		const label = defaults.i18n[ pageLanguage ]?.[ labelType ] || this.getAttribute( "label" );
		const placeholder = defaults.i18n[ pageLanguage ]?.[ labelType ] || this.getAttribute( "placeholder" );
		const selectAllLabel = defaults.i18n[ pageLanguage ]?.selectAll;
		const styles = await this.getStyles();
		this.shadowRoot.innerHTML = `
			<style>
				${ styles }
			</style>

			<div class="combo-box-wrapper">
				<label for="combo-box-input" class="combo-box-label">${ this.escapeHtml( label ) }</label>

				<div class="select-all-wrapper">
					<input
						type="checkbox"
						id="combo-box-select-all"
						class="combo-box-select-all-checkbox"
						aria-label="Select all options"
					>
					<label for="combo-box-select-all" class="select-all-label">${ this.escapeHtml( selectAllLabel ) }</label>
				</div>

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
		this.selectAllCheckbox = this.shadowRoot.getElementById( "combo-box-select-all" );
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

		// Select All checkbox event listener
		this.selectAllCheckbox.addEventListener( "change", ( e ) => {
			this.toggleSelectAll( e.target.checked );
		} );

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

		// Uncheck select all if not all items are selected anymore
		if ( this.selectedItems.length !== this.allOptions.length ) {
			this.selectAllCheckboxChecked = false;
			this.selectAllCheckbox.checked = false;
			this.enableInput();
		}

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

		// Update select all checkbox state
		this.updateSelectAllCheckbox();

		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Handles select all / unselect all functionality
	toggleSelectAll( isChecked ) {
		if ( isChecked ) {
			this.selectAll();
		} else {
			this.unselectAll();
		}
	}

	// Selects all options
	selectAll() {
		this.selectedItems = [ ...this.allOptions ];
		this.selectAllCheckboxChecked = true;
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
		this.disableInput();
		this.input.value = "";

		// Announce action to screen readers
		this.announce( "All options selected" );

		// Dispatch custom event
		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Unselects all options
	unselectAll() {
		this.selectedItems = [];
		this.selectAllCheckboxChecked = false;
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
		this.enableInput();
		this.input.value = "";

		// Announce action to screen readers
		this.announce( "All options deselected" );

		// Dispatch custom event
		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Disables the combo-box input
	disableInput() {
		this.input.disabled = true;
		this.input.setAttribute( "aria-disabled", "true" );
	}

	// Enables the combo-box input
	enableInput() {
		this.input.disabled = false;
		this.input.removeAttribute( "aria-disabled" );
	}

	// Updates the select all checkbox based on current selections
	updateSelectAllCheckbox() {
		const allSelected = this.selectedItems.length === this.allOptions.length && this.allOptions.length > 0;
		this.selectAllCheckbox.checked = allSelected;
		this.selectAllCheckboxChecked = allSelected;

		if ( allSelected ) {
			this.disableInput();
		} else {
			this.enableInput();
		}
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
