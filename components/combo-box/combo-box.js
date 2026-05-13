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

	// Static i18n defaults
	static defaults = {
		i18n: {
			"en": {
				selectAll: "Select all",
				comboBoxInput: "Search and select items",
				selectedItems: "Selected items",
				selectAllOptions: "Select all options",
				deselectAllOptions: "Deselect all options",
				availableOptions: "Available options",
				selected: "selected",
				removed: "removed",
				remove: "Remove",
				noMatchingOptions: "No matching options",
				allOptionsSelected: "All options selected",
				allOptionsDeselected: "All options deselected"
			},
			"fr": {
				selectAll: "Sélectionner tous",
				comboBoxInput: "Rechercher et sélectionner des éléments",
				selectedItems: "Éléments sélectionnés",
				selectAllOptions: "Sélectionner toutes les options",
				deselectAllOptions: "Désélectionner toutes les options",
				availableOptions: "Options disponibles",
				selected: "sélectionné",
				removed: "supprimé",
				remove: "Supprimer",
				noMatchingOptions: "Aucune option correspondante",
				allOptionsSelected: "Toutes les options sélectionnées",
				allOptionsDeselected: "Toutes les options désélectionnées"
			}
		}
	};

	constructor() {
		super();
		this.attachShadow( { mode: "open" } );
		this.selectedItems = [];
		this.filteredOptions = [];
		this.highlightedIndex = -1;
		this.isOpen = false;
		this.allOptions = [];
		this.selectAllCheckboxChecked = false;
		this.pageLanguage = "en"; // Default language
		this.originalPlaceholder = ""; // Store original placeholder
	}

	getLocalizedText() {
		return this.constructor.defaults.i18n[ this.pageLanguage ] || {};
	}

	connectedCallback() {

		// Set page language from document or fallback to English
		this.pageLanguage = ( wb.lang || "en" );
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
				throw new Error( `Failed to load combo-box.css: ${ response.statusText }` );
			}
			ComboBoxComponent.stylesCache = await response.text();
			return ComboBoxComponent.stylesCache;
		} catch ( e ) {
			console.error( "Failed to load styles from combo-box.css:", e );
			return ""; // Return empty string as fallback
		}
	}

	// Parses options from JSON file specified in options attribute
	async parseOptions() {

		// If options file is specified via attribute, fetch it
		const optionsFile = this.getAttribute( "options" );
		if ( optionsFile ) {
			try {
				const response = await fetch( optionsFile );
				if ( !response.ok ) {
					throw new Error( `Failed to load ${ optionsFile }: ${ response.statusText }` );
				}
				const data = await response.json();

				// Convert array of objects into the expected format
				// Each object has "name" (display label) and "tag" (internal value)
				const options = data.map( ( item ) => ( {
					value: item.tag,
					label: item.name
				} ) );

				// Sort options alphabetically by label
				options.sort( ( a, b ) => a.label.localeCompare( b.label ) );

				return options;
			} catch ( e ) {
				console.error( `Error loading options from ${ optionsFile }:`, e );
				return [];
			}
		}

		// Fallback to parsing from slot content if no options attribute
		const slotOptions = this.querySelector( "[slot='options']" );
		if ( slotOptions ) {
			return Array.from( slotOptions.querySelectorAll( "option" ) ).map( opt => ( {
				value: opt.value,
				label: opt.textContent.trim()
			} ) );
		}
		return [];
	}

	// Renders the component template and styles into Shadow DOM
	async render() {

		// Get label from attribute or use slot content
		const label = this.getAttribute( "label" ) || this.querySelector( "[slot='label']" )?.textContent.trim() || "";

		// Get placeholder from attribute
		const placeholder = this.getAttribute( "placeholder" ) || "";
		const selectAllLabel = this.getLocalizedText()?.selectAll;
		const styles = await this.getStyles();
		this.shadowRoot.innerHTML = `
			<style>
				${ styles }
			</style>

			<div class="combo-box-wrapper">
				<label for="combo-box-input" class="combo-box-label">
				<slot name="label">${ this.escapeHtml( label ) }</slot>
				</label>

				<div class="combo-box-input-row">
					<div class="combo-box-container">
						<div class="tags-container" id="tagsContainer" role="group" aria-label="${ this.escapeHtml( this.getLocalizedText().selectedItems ) }">
							<!-- Tags will be dynamically inserted here -->
							<input
								type="text"
								role="combobox"
								id="combo-box-input"
								class="combo-box-input"
								placeholder="${ this.escapeHtml( placeholder ) }"
								autocomplete="off"
								aria-label="${ this.escapeHtml( this.getLocalizedText().comboBoxInput ) }"
								aria-autocomplete="list"
								aria-controls="combo-box-list"
								aria-expanded="false"
							>
						</div>
						<ul
							id="combo-box-list"
							class="combo-box-list"
							role="listbox"
							aria-multiselectable="true"
							aria-label="${ this.escapeHtml( this.getLocalizedText().availableOptions ) }"
							hidden
						>
							<!-- Options will be dynamically inserted here -->
						</ul>
					</div>

					<div class="select-all-wrapper">
						<input
							type="checkbox"
							id="combo-box-select-all"
							class="combo-box-select-all-checkbox"
							aria-label="${ this.escapeHtml( this.getLocalizedText().selectAllOptions ) }"
						>
						<label for="combo-box-select-all" class="select-all-label">${ this.escapeHtml( selectAllLabel ) }</label>
					</div>
				</div>

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

		// Store the original placeholder text
		this.originalPlaceholder = this.input.placeholder;
	}

	// Attaches all event listeners
	attachEventListeners() {
		this.input.addEventListener( "input", ( e ) => this.handleInput( e ) );
		this.input.addEventListener( "focus", () => {
			if ( this.input.value.trim() === "" ) {
				this.updateFilteredOptions();
			}
			this.renderOptions();
			this.openList();
		} );
		this.input.addEventListener( "keydown", ( e ) => this.handleKeyDown( e ) );

		// Event delegation for tag removal buttons
		this.tagsContainer.addEventListener( "click", ( e ) => {
			const tag = e.target.closest( ".tag" );
			if ( tag ) {
				this.removeTag( tag.dataset.tagValue );
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

		// Make sure every part of the box triggers the input focus on click
		this.shadowRoot.querySelector( ".combo-box-container" ).addEventListener( "click", (  ) => {
			this.input.focus();
		} );
	}

	// Filters options based on user input
	handleInput( e ) {
		const value = e.target.value.trim();

		this.filteredOptions = [ ...this.allOptions ].filter( option => {
			const selectedValues = this.selectedItems.map( i => i.value );
			const matchesSearch = value === "" || option.label.toLowerCase().includes( value.toLowerCase() );
			const isNotSelected = !selectedValues.includes( option.value );
			return matchesSearch && isNotSelected;
		} );

		this.highlightedIndex = -1;
		this.renderOptions();
		this.openList();
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
					this.selectOption( this.filteredOptions[ this.highlightedIndex ].value );
				}
				break;
			case "Escape":
				e.preventDefault();
				if ( this.isOpen ) {
					this.closeList();
				} else {
					this.input.value = "";
				}
				break;
			case "Backspace":
				if ( this.input.value === "" && this.selectedItems.length > 0 ) {
					e.preventDefault();
					this.selectedItems.pop();
					this.renderTags();
					this.updateFilteredOptions();
					this.renderOptions();
					this.syncHiddenInputs();
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

	// Dispatches the change event for external listeners
	dispatchChangeEvent() {
		this.dispatchEvent( new CustomEvent( "change", {
			detail: { selectedItems: [ ...this.selectedItems ] },
			bubbles: true,
			composed: true
		} ) );
	}

	// Adds a selected option
	selectOption( value ) {
		const option = this.allOptions.find( o => o.value === value );

		if ( !option ) {
			return;
		}

		const alreadySelected = this.selectedItems.some( i => i.value === value );
		if ( !alreadySelected ) {
			this.selectedItems.push( option );

			this.renderTags();
			this.input.value = "";
			this.updateFilteredOptions();
			this.renderOptions();
			this.highlightedIndex = -1;

			// If all options are selected, disable input and hide dropdown
			if ( this.selectedItems.length === this.allOptions.length ) {
				this.updateSelectAllCheckbox();
				this.closeList();
			} else {
				this.openList();
				this.input.focus();
			}

			// Announce selection to screen readers
			this.announce( `${ option.label } ${ this.getLocalizedText().selected }` );

			// Dispatch change event
			this.dispatchChangeEvent();

			this.syncHiddenInputs();
		}
	}

	// Removes a selected item
	removeTag( value ) {
		const option = this.allOptions.find( o => o.value === value );

		if ( !option ) {
			return;
		}

		this.selectedItems = this.selectedItems.filter( item => item.value !== value );
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
		this.announce( `${ option.label }` + `${ this.getLocalizedText().removed }` );

		// Dispatch change event
		this.dispatchChangeEvent();

		this.syncHiddenInputs();
	}

	// Updates filtered options based on selected items
	updateFilteredOptions() {
		this.filteredOptions = [ ...this.allOptions ].filter(
			item => !this.selectedItems.map( i => i.value ).includes( item.value )
		);
	}

	// Renders the selected items as tags
	renderTags() {
		const hadFocus = this.shadowRoot.activeElement === this.input;
		this.tagsContainer.innerHTML = "";

		// Check if all items are selected
		const allSelected = this.selectedItems.length === this.allOptions.length && this.allOptions.length > 0;

		if ( allSelected ) {

			// Show "All items selected" message as placeholder text
			this.input.placeholder = this.getLocalizedText().allOptionsSelected;
			this.input.value = "";
			this.input.classList.toggle( "has-selections", false );
			this.tagsContainer.appendChild( this.input );
			this.tagsContainer.setAttribute( "aria-label", this.getLocalizedText().allOptionsSelected );
		} else {

			// Restore original placeholder
			this.input.placeholder = this.originalPlaceholder;

			// Show individual tags for each selected item
			this.selectedItems.forEach( item => {
				const tag = document.createElement( "button" );
				tag.className = "tag";
				tag.type = "button";
				tag.dataset.tagValue = item.value;
				tag.setAttribute( "part", "tag" );
				tag.setAttribute( "aria-label", `${ this.getLocalizedText().remove } ${ item.label }` );

				tag.innerHTML = `
					<span class="tag-text">${ this.escapeHtml( item.label ) }</span>
					<span type="button" aria-hidden="true">×</span>
				`;
				this.tagsContainer.appendChild( tag );
			} );
			this.tagsContainer.appendChild( this.input );
			this.input.value = "";
			this.input.classList.toggle( "has-selections", this.selectedItems.length > 0 );

			// Update aria-label with selection count
			const count = this.selectedItems.length;
			const label = count === 0 ? this.getLocalizedText().selectedItems : `${ this.getLocalizedText().selectedItems } (${ count } ${ this.getLocalizedText().selected })`;
			this.tagsContainer.setAttribute( "aria-label", label );
		}

		if ( hadFocus ) {
			this.input.focus();
		}
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
			emptyOption.textContent = this.getLocalizedText().noMatchingOptions;
			this.list.appendChild( emptyOption );
		} else {
			this.filteredOptions.forEach( ( option ) => {
				const optionElement = document.createElement( "li" );
				const optionId = `combo-option-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;
				optionElement.id = optionId;
				optionElement.className = "combo-box-option";
				optionElement.setAttribute( "role", "option" );
				optionElement.setAttribute( "aria-selected", "false" );
				optionElement.setAttribute( "data-option-text", option.value );
				optionElement.textContent = option.label;
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
		if ( !text ) {
			return "";
		}
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

	syncHiddenInputs() {

		// Remove any existing hidden inputs created by this component
		this.querySelectorAll( "input[type=\"hidden\"][data-combo-value]" ).forEach( el => el.remove() );

		const name = this.getAttribute( "name" );
		if ( !name ) {
			return;
		}

		// Create hidden input for each selected item to be submitted with forms
		this.selectedItems.forEach( item => {
			const input = document.createElement( "input" );
			input.type = "hidden";
			input.name = name;
			input.value = item.value;
			input.dataset.comboValue = "true";
			this.appendChild( input );
		} );
	}

	// Public API: Get selected values as array (useful for form handling)
	getSelectedValues() {
		return this.selectedItems.map( item => item.value );
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
		this.selectedItems = this.allOptions.filter( o =>
			items.some( i => i.value === o.value )
		);

		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();

		// Update select all checkbox state
		this.updateSelectAllCheckbox();

		// Dispatch change event
		this.dispatchChangeEvent();
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
		this.closeList();
		this.disableInput();
		this.input.value = "";

		this.syncHiddenInputs();

		// Announce action to screen readers
		this.announce( `${ this.getLocalizedText().allOptionsSelected }` );

		// Dispatch change event
		this.dispatchChangeEvent();
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

		this.syncHiddenInputs();

		// Announce action to screen readers
		this.announce( `${ this.getLocalizedText().allOptionsDeselected }` );

		// Dispatch change event
		this.dispatchChangeEvent();
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
		this.selectedItems = this.selectedItems.filter( item =>
			this.allOptions.some( o => o.value === item.value )
		);
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
	}
}

// Register the custom element
customElements.define( "gc-combobox", ComboBoxComponent );
