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
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.selectedItems = [];
		this.filteredOptions = [];
		this.highlightedIndex = -1;
		this.isOpen = false;
		this.allOptions = [];
	}

	connectedCallback() {
		this.initializeComponent();
	}

	// Initializes the Web Component with styles and markup
	initializeComponent() {
		this.allOptions = this.parseOptions();
		this.filteredOptions = [...this.allOptions];

		this.render();
		this.cacheElements();
		this.attachEventListeners();
	}

	// Parses options from the component attribute or slot content
	parseOptions() {
		const optionsAttr = this.getAttribute('options');

		if (optionsAttr) {
			try {
				return JSON.parse(optionsAttr);
			} catch (e) {
				console.error('Invalid options format. Expected JSON array.', e);
				return [];
			}
		}

		// Alternative: parse from slot content
		const slot = this.querySelector('[slot="options"]');
		if (slot) {
			return Array.from(slot.querySelectorAll('option')).map(opt => opt.textContent);
		}

		return [];
	}

	// Renders the component template and styles into Shadow DOM
	render() {
		const label = this.getAttribute('label') || 'Select items';
		const placeholder = this.getAttribute('placeholder') || 'Type to search or add items...';

		this.shadowRoot.innerHTML = `
			<style>
				${this.getStyles()}
			</style>

			<div class="combo-box-wrapper">
				<label for="combo-box-input" class="combo-box-label">${this.escapeHtml(label)}</label>

				<div class="combo-box-container" role="combobox">
					<div class="tags-container" id="tagsContainer" role="group" aria-label="Selected items">
						<!-- Tags will be dynamically inserted here -->
					</div>

					<input
						type="text"
						id="combo-box-input"
						class="combo-box-input"
						placeholder="${this.escapeHtml(placeholder)}"
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
			</div>
		`;
	}

	// Caches frequently accessed DOM elements
	cacheElements() {
		this.input = this.shadowRoot.getElementById('combo-box-input');
		this.list = this.shadowRoot.getElementById('combo-box-list');
		this.tagsContainer = this.shadowRoot.getElementById('tagsContainer');
	}

	// Attaches all event listeners
	attachEventListeners() {
		this.input.addEventListener('input', (e) => this.handleInput(e));
		this.input.addEventListener('focus', () => this.openList());
		this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

		this.shadowRoot.addEventListener('click', (e) => {
			if (!e.target.closest('.combo-box-wrapper')) {
				this.closeList();
			}
		});

		// Close list when clicking outside the component
		document.addEventListener('click', (e) => {
			if (!this.contains(e.target) && !e.target.closest('combo-box-component')) {
				this.closeList();
			}
		});
	}

	// Filters options based on user input
	handleInput(e) {
		const value = e.target.value.trim();

		if (value === '') {
			this.filteredOptions = [...this.allOptions];
		} else {
			this.filteredOptions = this.allOptions.filter(option =>
				option.toLowerCase().includes(value.toLowerCase()) &&
				!this.selectedItems.includes(option)
			);
		}

		this.highlightedIndex = -1;
		this.renderOptions();

		if (this.filteredOptions.length > 0) {
			this.openList();
		} else {
			this.closeList();
		}
	}

	// Handles keyboard navigation and interactions
	handleKeyDown(e) {
		const key = e.key;

		switch (key) {
			case 'ArrowDown':
				e.preventDefault();
				this.highlightNext();
				break;
			case 'ArrowUp':
				e.preventDefault();
				this.highlightPrevious();
				break;
			case 'Enter':
				e.preventDefault();
				if (this.highlightedIndex >= 0 && this.isOpen) {
					this.selectOption(this.filteredOptions[this.highlightedIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				this.closeList();
				this.input.value = '';
				break;
			case 'Backspace':
				if (this.input.value === '' && this.selectedItems.length > 0) {
					e.preventDefault();
					this.selectedItems.pop();
					this.renderTags();
					this.updateFilteredOptions();
					this.renderOptions();
				}
				break;
			default:
				break;
		}
	}

	// Moves highlight to the next option
	highlightNext() {
		if (!this.isOpen) {
			this.openList();
			return;
		}

		if (this.highlightedIndex < this.filteredOptions.length - 1) {
			this.highlightedIndex++;
		} else {
			this.highlightedIndex = 0;
		}
		this.updateHighlight();
	}

	// Moves highlight to the previous option
	highlightPrevious() {
		if (!this.isOpen) {
			this.openList();
			return;
		}

		if (this.highlightedIndex > 0) {
			this.highlightedIndex--;
		} else {
			this.highlightedIndex = this.filteredOptions.length - 1;
		}
		this.updateHighlight();
	}

	// Updates the visual highlight for the current option
	updateHighlight() {
		const options = this.list.querySelectorAll('[role="option"]');
		options.forEach((option, index) => {
			if (index === this.highlightedIndex) {
				option.setAttribute('aria-current', 'true');
				option.focus();
				option.scrollIntoView({ block: 'nearest' });
			} else {
				option.removeAttribute('aria-current');
			}
		});
	}

	// Adds a selected option
	selectOption(option) {
		if (!this.selectedItems.includes(option)) {
			this.selectedItems.push(option);
			this.renderTags();
			this.input.value = '';
			this.updateFilteredOptions();
			this.renderOptions();
			this.highlightedIndex = -1;
			this.input.focus();

			// Dispatch custom event for external listeners
			this.dispatchEvent(new CustomEvent('change', {
				detail: { selectedItems: [...this.selectedItems] },
				bubbles: true,
				composed: true
			}));
		}
	}

	// Removes a selected item
	removeTag(option) {
		this.selectedItems = this.selectedItems.filter(item => item !== option);
		this.renderTags();
		this.updateFilteredOptions();
		this.renderOptions();
		this.input.focus();

		// Dispatch custom event for external listeners
		this.dispatchEvent(new CustomEvent('change', {
			detail: { selectedItems: [...this.selectedItems] },
			bubbles: true,
			composed: true
		}));
	}

	// Updates filtered options based on selected items
	updateFilteredOptions() {
		this.filteredOptions = [...this.allOptions].filter(
			item => !this.selectedItems.includes(item)
		);
	}

	// Renders the selected items as tags
	renderTags() {
		this.tagsContainer.innerHTML = '';

		this.selectedItems.forEach(item => {
			const tag = document.createElement('div');
			tag.className = 'tag';
			tag.innerHTML = `
				<span class="tag-text">${this.escapeHtml(item)}</span>
				<button
					type="button"
					class="tag-remove-btn"
					aria-label="Remove ${item}"
				>
					×
				</button>
			`;

			const removeBtn = tag.querySelector('.tag-remove-btn');
			removeBtn.addEventListener('click', () => this.removeTag(item));

			this.tagsContainer.appendChild(tag);
		});

		this.input.setAttribute(
			'aria-expanded',
			this.selectedItems.length > 0 ? 'true' : 'false'
		);
	}

	// Renders the filtered options in the dropdown
	renderOptions() {
		this.list.innerHTML = '';

		if (this.filteredOptions.length === 0) {
			const emptyOption = document.createElement('li');
			emptyOption.className = 'combo-box-option empty-state';
			emptyOption.setAttribute('role', 'option');
			emptyOption.textContent = 'No matching options';
			this.list.appendChild(emptyOption);
		} else {
			this.filteredOptions.forEach((option, index) => {
				const optionElement = document.createElement('li');
				optionElement.className = 'combo-box-option';
				optionElement.setAttribute('role', 'option');
				optionElement.setAttribute('aria-selected', 'false');
				optionElement.textContent = option;

				optionElement.addEventListener('click', () => {
					this.selectOption(option);
				});

				optionElement.addEventListener('mouseenter', () => {
					this.highlightedIndex = index;
					this.updateHighlight();
				});

				this.list.appendChild(optionElement);
			});
		}

		this.highlightedIndex = -1;
	}

	// Opens the dropdown list
	openList() {
		if (!this.isOpen) {
			this.isOpen = true;
			this.list.removeAttribute('hidden');
			this.input.setAttribute('aria-expanded', 'true');
		}
	}

	// Closes the dropdown list
	closeList() {
		if (this.isOpen) {
			this.isOpen = false;
			this.list.setAttribute('hidden', '');
			this.input.setAttribute('aria-expanded', 'false');
			this.highlightedIndex = -1;
		}
	}

	// Escapes HTML special characters
	escapeHtml(text) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		return text.replace(/[&<>"']/g, m => map[m]);
	}

	// Returns the encapsulated styles for the Shadow DOM
	getStyles() {
		return `
			* {
				box-sizing: border-box;
			}

			.combo-box-wrapper {
				position: relative;
				width: 100%;
			}

			.combo-box-label {
				color: #6c757d;
				display: block;
				font-size: 14px;
				font-weight: 500;
				margin-bottom: 8px;
			}

			.combo-box-container {
				align-items: center;
				background-color: #fff;
				border: 1px solid #ced4da;
				border-radius: 4px;
				display: flex;
				flex-wrap: wrap;
				gap: 6px;
				min-height: 38px;
				position: relative;
				padding: 6px;
				transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

			}

			.combo-box-container:focus-within {
				border-color: #80bdff;
				box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
			}

			.tags-container {
				display: flex;
				flex-wrap: wrap;
				gap: 6px;
			}

			.tag {
				align-items: center;
				animation: slideIn 0.2s ease-in-out;
				background-color: #6c757d;
				border-radius: 3px;
				color: white;
				display: inline-flex;
				font-size: 13px;
				font-weight: 500;
				gap: 6px;
				padding: 4px 8px;
			}

			@keyframes slideIn {
				from {
					opacity: 0;
					transform: scale(0.95);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}

			.tag-text {
				flex-grow: 1;
			}

			.tag-remove-btn {
				align-items: center;
				background: none;
				border: none;
				border-radius: 2px;
				color: white;
				cursor: pointer;
				display: inline-flex;
				font-family: inherit;
				font-size: 18px;
				height: 16px;
				justify-content: center;
				padding: 0;
				line-height: 1;
				transition: background-color 0.15s ease-in-out;
				width: 16px;
			}

			.tag-remove-btn:hover {
				background-color: rgba(0, 0, 0, 0.15);
			}

			.tag-remove-btn:focus {
				outline: 2px solid white;
				outline-offset: 1px;
			}

			.combo-box-input {
				background: none;
				border: none;
				color: #6c757d;
				font-family: inherit;
				font-size: 14px;
				flex: 1;
				min-width: 150px;
				outline: none;
				padding: 4px 0;
			}

			.combo-box-input::placeholder {
				color: #6c757d;
			}

			.combo-box-list {
				background-color: white;
				border: 1px solid #ced4da;
				border-radius: 4px;
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
				left: 0;
				list-style: none;
				margin: 4px 0 0 0;
				max-height: 300px;
				overflow-y: auto;
				padding: 0;
				position: absolute;
				right: 0;
				top: 100%;
				z-index: 1000;
			}

			.combo-box-list[hidden] {
				display: none;
			}

			.combo-box-option {
				color: #6c757d;
				cursor: pointer;
				padding: 10px 12px;
				transition: background-color 0.15s ease-in-out;
				user-select: none;
			}

			.combo-box-option:hover {
				background-color: #e9ecef;
			}

			.combo-box-option[aria-selected="true"] {
				background-color: #6c757d;
				color: white;
			}

			.combo-box-option[aria-current="true"] {
				background-color: #e9ecef;
				border-left: 3px solid #6c757d;
				padding-left: 9px;
			}

			.combo-box-option[aria-selected="true"][aria-current="true"] {
				background-color: #0056b3;
				color: white;
			}

			.combo-box-option:focus {
				outline: none;
			}

			.combo-box-option[aria-current="true"]:focus {
				outline: 2px solid #6c757d;
				outline-offset: -2px;
			}

			.combo-box-list::-webkit-scrollbar {
				width: 6px;
			}

			.combo-box-list::-webkit-scrollbar-track {
				background: #f1f1f1;
			}

			.combo-box-list::-webkit-scrollbar-thumb {
				background: #888;
				border-radius: 3px;
			}

			.combo-box-list::-webkit-scrollbar-thumb:hover {
				background: #555;
			}

			.combo-box-option.empty-state {
				color: #6c757d;
				cursor: default;
				font-style: italic;
				padding: 20px 12px;
				text-align: center;
			}

			.combo-box-option.empty-state:hover {
				background-color: transparent;
			}
		`;
	}

	// Public API: Get selected items
	getSelectedItems() {
		return [...this.selectedItems];
	}

	// Public API: Set selected items programmatically
	setSelectedItems(items) {
		this.selectedItems = items.filter(item => this.allOptions.includes(item));
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();

		this.dispatchEvent(new CustomEvent('change', {
			detail: { selectedItems: [...this.selectedItems] },
			bubbles: true,
			composed: true
		}));
	}

	// Public API: Update options
	setOptions(options) {
		this.allOptions = options;
		this.selectedItems = this.selectedItems.filter(item => this.allOptions.includes(item));
		this.updateFilteredOptions();
		this.renderTags();
		this.renderOptions();
	}
	}

	// Register the custom element
	customElements.define('combo-box-component', ComboBoxComponent);


