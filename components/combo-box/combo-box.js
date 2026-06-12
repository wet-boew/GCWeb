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

	// Static counter for generating unique instance IDs
	static instanceCounter = 0;

	// Static i18n defaults
	static defaults = {
		i18n: {
			"en": {
				selectAll: "Select all",
				itemsSelected: "items selected",
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
				itemsSelected: "éléments sélectionnés",
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
		this.allOptionsSelected = false;
		this.allowSelectAll = false; // Feature flag for select-all option
		this.pageLanguage = "en"; // Default language
		this.originalPlaceholder = ""; // Store original placeholder
		this.instanceId = ++ComboBoxComponent.instanceCounter;
		this.optionsCache = new Map(); // Data layer: option value → <li> element
	}

	getLocalizedText() {
		return this.constructor.defaults.i18n[ this.pageLanguage ] || {};
	}

	connectedCallback() {

		// Set page language from document or fallback to English
		this.pageLanguage = ( typeof wb !== "undefined" && wb.lang ) ? wb.lang : "en";

		// Check if select-all-options attribute is present
		this.allowSelectAll = this.hasAttribute( "select-all-options" );

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

		// Validate that a label is provided (via attribute or slot)
		const label = this.getAttribute( "label" ) || this.querySelector( "[slot='label']" )?.textContent.trim();
		if ( !label ) {
			console.error( "gc-combobox: A label is required. Provide a label attribute or a <span slot=\"label\"> element." );
			return;
		}

		// Validate that options are provided (via attribute or slot)
		const hasOptionsAttr = this.hasAttribute( "options" );
		const hasOptionsSlot = !!this.querySelector( "[slot='options']" );
		if ( !hasOptionsAttr && !hasOptionsSlot ) {
			console.error( "gc-combobox: Options are required. Provide an options attribute pointing to a JSON file, or a <select slot=\"options\"> element." );
			return;
		}

		this.allOptions = await this.parseOptions();
		this.filteredOptions = [ ...this.allOptions ];
		this.buildOptionsCache();

		await this.render();
		this.cacheElements();
		this.attachEventListeners();
	}

	// Builds the data layer: creates all option <li> elements once with stable IDs
	buildOptionsCache() {
		this.optionsCache = new Map();

		this.allOptions.forEach( ( option, index ) => {
			const optionElement = document.createElement( "li" );
			optionElement.id = `combo-option-${ this.instanceId }-${ index }`;
			optionElement.className = "combo-box-option";
			optionElement.setAttribute( "role", "option" );
			optionElement.setAttribute( "data-option-text", option.value );
			optionElement.textContent = option.label;
			this.optionsCache.set( option.value, optionElement );
		} );

		// Build the "Select all options" element once (if feature is enabled)
		if ( this.allowSelectAll ) {
			this.selectAllOptionElement = document.createElement( "li" );
			this.selectAllOptionElement.id = `combo-option-select-all-${ this.instanceId }`;
			this.selectAllOptionElement.className = "combo-box-option combo-box-option-select-all";
			this.selectAllOptionElement.setAttribute( "role", "option" );
			this.selectAllOptionElement.setAttribute( "data-select-all", "true" );
			this.selectAllOptionElement.textContent = this.getLocalizedText().selectAllOptions;
		}

		// Build the empty state element once
		this.emptyStateElement = document.createElement( "li" );
		this.emptyStateElement.className = "combo-box-option empty-state";
		this.emptyStateElement.setAttribute( "role", "option" );
		this.emptyStateElement.setAttribute( "aria-disabled", "true" );
		this.emptyStateElement.textContent = this.getLocalizedText().noMatchingOptions;
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
		const styles = `
			@combo-box_styles@
		`;
		this.shadowRoot.innerHTML = `
			<style>
				${ styles }
			</style>

			<div class="combo-box-wrapper">
				<div class="combo-box-input-row">
					<label for="combo-box-input" class="combo-box-label">
						<slot name="label">${ this.escapeHtml( label ) }</slot>
					</label>
					<div class="combo-box-container">
						<div class="tags-container" id="tagsContainer">
							<!-- Tags will be dynamically inserted here -->
							<input
								type="text"
								role="combobox"
								id="combo-box-input"
								class="combo-box-input"
								placeholder="${ this.escapeHtml( placeholder ) }"
								autocomplete="off"
								aria-autocomplete="list"
								aria-controls="combo-box-list"
								aria-expanded="false"
								aria-haspopup="listbox"
							>
						</div>
						<ul
							id="combo-box-list"
							class="combo-box-list"
							role="listbox"
							aria-label="${ this.escapeHtml( this.getLocalizedText().availableOptions ) }"
							tabindex="-1"
							hidden
						>
							<!-- Options will be dynamically inserted here -->
						</ul>
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

		// Event delegation for tag keyboard interactions
		this.tagsContainer.addEventListener( "keydown", ( e ) => this.handleTagKeyDown( e ) );

		// Event delegation for list options (click and hover)
		this.list.addEventListener( "click", ( e ) => {
			const option = e.target.closest( "[role='option']" );
			if ( option && !option.hasAttribute( "aria-disabled" ) ) {

				// Check if this is the "Select all options" special option
				if ( option.hasAttribute( "data-select-all" ) ) {
					this.selectAll();
				} else {
					const optionText = option.getAttribute( "data-option-text" );
					if ( optionText ) {
						this.selectOption( optionText );
					}
				}
			}
		} );

		this.list.addEventListener( "mouseover", ( e ) => {
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

		if ( this.filteredOptions.length === 0 && !this.allOptionsSelected ) {
			this.liveRegion.textContent = "";
			setTimeout( () => {
				this.announce( this.getLocalizedText().noMatchingOptions );
			}, 500 );
		}
	}

	// Handles keyboard navigation and interactions
	handleKeyDown( e ) {
		const key = e.key;

		switch ( key ) {

			case "ArrowLeft":
				if ( this.input.value === "" && this.selectedItems.length > 0 ) {
					e.preventDefault();
					this.focusLastTag();
				}
				break;
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
					const options = Array.from( this.list.querySelectorAll( "[role='option']" ) );
					const selectedOption = options[ this.highlightedIndex ];

					// Check if "Select all options" was selected
					if ( selectedOption && selectedOption.hasAttribute( "data-select-all" ) ) {
						this.selectAll();
					} else if ( selectedOption ) {
						const optionValue = selectedOption.getAttribute( "data-option-text" );
						if ( optionValue ) {
							this.selectOption( optionValue );
						}
					}
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
			case "Delete":
				if ( this.input.value === "" && this.selectedItems.length > 0 ) {
					e.preventDefault();
					this.focusLastTag();
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

		const options = this.list.querySelectorAll( "[role='option']:not([aria-disabled='true'])" );
		if ( this.highlightedIndex < options.length - 1 ) {
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

		const options = this.list.querySelectorAll( "[role='option']:not([aria-disabled='true'])" );
		if ( this.highlightedIndex > 0 ) {
			this.highlightedIndex--;
		} else {
			this.highlightedIndex = options.length - 1;
		}
		this.updateHighlight();
	}

	// Updates the visual highlight for the current option
	updateHighlight() {
		const options = this.list.querySelectorAll( "[role='option']:not([aria-disabled='true'])" );
		options.forEach( ( option, index ) => {
			if ( index === this.highlightedIndex ) {
				option.classList.add( "active" );
				option.scrollIntoView( { block: "nearest" } );
				if ( option.id ) {
					this.input.setAttribute( "aria-activedescendant", option.id );
				}
			} else {
				option.classList.remove( "active" );
			}
		} );
	}

	// Announces messages to screen readers via live region
	announce( message ) {
		if ( this.liveRegion ) {
			this.liveRegion.textContent = "";
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

			// If all options are selected, hide dropdown
			if ( this.selectedItems.length === this.allOptions.length ) {
				this.allOptionsSelected = true;
				this.renderOptions();
				this.closeList();
			} else {
				this.openList();
				this.input.focus();
			}

			// Announce selection to screen readers
			const count = this.selectedItems.length;
			this.announce( `${ option.label } ${ this.getLocalizedText().selected }. ${ count } ${ this.getLocalizedText().itemsSelected }.` );

			// Dispatch change event
			this.dispatchChangeEvent();

			this.syncHiddenInputs();
		}
	}

	// Removes a selected item
	removeTag( value, focusInput = true ) {

		// Handle removal of "All options" tag
		if ( value === "all-options" ) {
			this.unselectAll();
			return;
		}

		const option = this.allOptions.find( o => o.value === value );

		if ( !option ) {
			return;
		}

		this.selectedItems = this.selectedItems.filter( item => item.value !== value );
		this.allOptionsSelected = false;
		this.renderTags();
		this.updateFilteredOptions();
		this.renderOptions();

		if ( focusInput ) {
			this.input.focus();
		}

		// Announce removal to screen readers
		const count = this.selectedItems.length;
		this.announce( `${ option.label }` + ` ${ this.getLocalizedText().removed }. ${ count } ${ this.getLocalizedText().itemsSelected }.` );

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

	// Creates a tag element for a selected item
	createTag( item ) {
		const tag = document.createElement( "button" );
		tag.className = "tag";
		tag.type = "button";
		tag.dataset.tagValue = item.value;
		tag.tabIndex = -1;
		tag.setAttribute( "part", "tag" );
		tag.setAttribute( "aria-label", `${ this.getLocalizedText().remove } ${ item.label }` );
		tag.innerHTML = `<span class="tag-text">${ this.escapeHtml( item.label ) }</span><span class="tag-dismiss" aria-hidden="true">×</span>`;
		return tag;
	}

	// Creates the "All options selected" tag element
	createAllOptionsTag() {
		const tag = document.createElement( "button" );
		tag.className = "tag tag-all-options";
		tag.type = "button";
		tag.dataset.tagValue = "all-options";
		tag.tabIndex = 0;
		tag.setAttribute( "part", "tag" );
		tag.setAttribute( "aria-label", `${ this.getLocalizedText().remove } ${ this.getLocalizedText().allOptionsSelected }` );
		tag.innerHTML = `<span class="tag-text">${ this.getLocalizedText().allOptionsSelected }</span><span class="tag-dismiss" aria-hidden="true">×</span>`;
		return tag;
	}

	// Diffs the tags container: adds or removes tags as needed without full rebuilds
	renderTags() {
		const hadFocus = this.shadowRoot.activeElement === this.input;
		const allSelected = this.selectedItems.length === this.allOptions.length && this.allOptions.length > 0;
		const desiredValues = new Set( allSelected ? [ "all-options" ] : this.selectedItems.map( i => i.value ) );

		// Remove tags no longer in the desired set
		this.tagsContainer.querySelectorAll( ".tag[data-tag-value]" ).forEach( tag => {
			if ( !desiredValues.has( tag.dataset.tagValue ) ) {
				tag.remove();
			}
		} );

		// Build a set of tag values already in the DOM
		const existingValues = new Set(
			Array.from( this.tagsContainer.querySelectorAll( ".tag[data-tag-value]" ) )
				.map( t => t.dataset.tagValue )
		);

		// Add missing tags in order, just before the input
		if ( allSelected && !existingValues.has( "all-options" ) ) {
			this.tagsContainer.insertBefore( this.createAllOptionsTag(), this.input );
		} else if ( !allSelected ) {
			this.selectedItems.forEach( item => {
				if ( !existingValues.has( item.value ) ) {
					this.tagsContainer.insertBefore( this.createTag( item ), this.input );
				}
			} );
		}

		// Update input state
		this.input.value = "";
		if ( allSelected ) {
			this.input.placeholder = "";
			this.input.disabled = true;
			this.tagsContainer.setAttribute( "aria-label", this.getLocalizedText().allOptionsSelected );
			this.tagsContainer.setAttribute( "role", "toolbar" );
		} else {
			this.input.placeholder = this.originalPlaceholder;
			this.input.disabled = false;
			this.input.classList.toggle( "has-selections", this.selectedItems.length > 0 );
			this.tagsContainer.removeAttribute( "aria-label" );
			if ( this.selectedItems.length > 0 ) {
				this.tagsContainer.setAttribute( "role", "toolbar" ); // Without role="toolbar", NVDA stays in browse mode when it's inside the tags container and intercepts the arrow key event before they reach our handlers. The "toolbar" role tells NVDA that this is a widget-like element and to allow arrow key events to pass through to our JavaScript. The role is removed when empty to avoid announcing "toolbar" when there are no selected tags
			} else {
				this.tagsContainer.removeAttribute( "role" );
			}
		}

		// Ensure the input is always last
		this.tagsContainer.appendChild( this.input );

		if ( hadFocus ) {
			this.input.focus();
		}
	}

	// Renders the filtered options in the dropdown using the data layer cache
	renderOptions() {
		this.list.innerHTML = "";
		this.input.removeAttribute( "aria-activedescendant" );

		if ( this.allOptionsSelected || this.filteredOptions.length === 0 ) {
			this.list.appendChild( this.emptyStateElement );
		} else {

			// Prepend "Select all options" from cache if enabled
			if ( this.allowSelectAll ) {
				this.selectAllOptionElement.classList.remove( "active" );
				this.list.appendChild( this.selectAllOptionElement );
			}

			// Append only the filtered options from cache, resetting their highlight state
			this.filteredOptions.forEach( ( option ) => {
				const el = this.optionsCache.get( option.value );
				if ( el ) {
					el.classList.remove( "active" );
					this.list.appendChild( el );
				}
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

	// Focuses the last tag button
	focusLastTag() {
		const tags = Array.from( this.tagsContainer.querySelectorAll( ".tag" ) );
		if ( tags.length > 0 ) {
			this.closeList();
			tags[ tags.length - 1 ].focus();
		}
	}

	// Handles keyboard events on tag buttons
	handleTagKeyDown( e ) {
		const tag = e.target.closest( ".tag" );
		if ( !tag ) {
			return;
		}

		const tags = Array.from( this.tagsContainer.querySelectorAll( ".tag" ) );
		const index = tags.indexOf( tag );

		switch ( e.key ) {
			case "Backspace":
			case "Delete":
			case "Enter": {
				e.preventDefault();
				const value = tag.dataset.tagValue;
				const nextFocusIndex = tags[ index + 1 ] ? index : index - 1;
				this.removeTag( value, false );

				const newTags = Array.from( this.tagsContainer.querySelectorAll( ".tag" ) );
				if ( nextFocusIndex >= 0 && newTags[ nextFocusIndex ] ) {
					newTags[ nextFocusIndex ].focus();
				} else {
					this.input.focus();
				}
				break;
			}

			case "ArrowLeft":
				e.preventDefault();
				if ( tags[ index - 1 ] ) {
					tags[ index - 1 ].focus();
				}
				break;
			case "ArrowRight":
				e.preventDefault();
				if ( tags[ index + 1 ] ) {
					tags[ index + 1 ].focus();
				} else {
					this.input.focus();
					this.updateFilteredOptions();
					this.renderOptions();
					this.openList();
				}
				break;
			case "Escape":
				e.preventDefault();
				this.input.focus();
				break;
			default:
				break;
		}
	}

	// Closes the dropdown list
	closeList() {
		if ( this.isOpen ) {
			this.isOpen = false;
			this.list.setAttribute( "hidden", "" );
			this.input.setAttribute( "aria-expanded", "false" );
			this.input.removeAttribute( "aria-activedescendant" );
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
			">": "&gt;"
		};
		return text.replace( /[&<>']/g, m => map[ m ] );
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

	// Public API: Get selected items
	getSelectedItems() {
		return [ ...this.selectedItems ];
	}

	// Public API: Set selected items programmatically
	setSelectedItems( items ) {
		this.selectedItems = this.allOptions.filter( o =>
			items.some( i => i.value === o.value )
		);

		// Check if all options are selected
		this.allOptionsSelected = this.selectedItems.length === this.allOptions.length && this.allOptions.length > 0;

		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();

		// Dispatch change event
		this.dispatchChangeEvent();
	}

	// Selects all options
	selectAll() {
		this.selectedItems = [ ...this.allOptions ];
		this.allOptionsSelected = true;
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
		this.closeList();
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
		this.allOptionsSelected = false;
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
		this.input.value = "";
		this.input.focus();

		this.syncHiddenInputs();

		// Announce action to screen readers
		this.announce( `${ this.getLocalizedText().allOptionsDeselected }` );

		// Dispatch change event
		this.dispatchChangeEvent();
	}

	// Public API: Update options
	setOptions( options ) {
		this.allOptions = options;
		this.selectedItems = this.selectedItems.filter( item =>
			this.allOptions.some( o => o.value === item.value )
		);
		this.buildOptionsCache();
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
	}
}

// Register the custom element
customElements.define( "gc-combobox", ComboBoxComponent );
