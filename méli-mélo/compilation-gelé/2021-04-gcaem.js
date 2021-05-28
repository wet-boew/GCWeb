/**
 * @title WET-BOEW Combobox
 * @overview Plugin contained to show an example of how to create your custom WET plugin
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 * -
 * - The fieldflow integration require the fieldflow configuration "defaultIfNone"
 */
( function( $, window, doc, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-combobox",
	selector = "." + componentName,
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	defaults = {
		template: "<div class=\"combobox-wrapper\">" +
		"<div role=\"combobox\" aria-expanded=\"false\" aria-haspopup=\"listbox\" data-wb5-bind=\"aria-owns@popupId\">" +
			"<input autocomplete=\"off\" data-rule-fromListbox=\"true\" data-wb5-bind=\"id@fieldId, aria-controls@popupId, value@filter\" aria-autocomplete=\"list\" aria-activedescendant=\"\" />" +
		"</div>" +
		"<div data-wb5-bind=\"id@popupId\" role=\"listbox\" class=\"hidden\">" +
			"<template data-slot-elm=\"\" data-wb5-template=\"sub-template-listbox\">" +
				"<ul class=\"list-unstyled mrgn-bttm-0\">" +
					"<!-- " +
					"<li " +
						"class=\"brdr-bttm\" " +
						"role=\"option\" " +
						"data-wb5-for=\"option in wbLoad\" " +
						"data-wb5-if=\"!parent.filter.length || parent.config.compareLowerCase(option,parent.filter)\" " +
						"data-wb5-on=\"select@select(option); live@parent.nbdispItem(wb-nbNode)\" >{{ option }}</li>" +
					" -->" +
					"<li " +
						"class=\"\" " +
						"role=\"option\" " +
						"data-wb5-for=\"option in options\" " +
						"data-wb5-if=\"!parent.filter.length || parent.config.compareLowerCase(option.value,parent.filter)\" " +
						"data-wb5-on=\"select@select(option.value); live@parent.nbdispItem(wb-nbNode)\" >{{ option.textContent }}</li>" +
				"</ul>" +
			"</template>" +
		"</div>" +
	"</div>",
		i18n: {
			en: {
				errValid: "You need to choose a valid options."
			},
			fr: {
				errValid: "Veuillez choisir une option valide."
			}
		},
		compareLowerCase: function( a, b ) {
			return a.toLowerCase().indexOf( b.toLowerCase() ) !== -1;
		},
		similarText: function( str1, str2, passRatio ) {

			// Function to compare the distance between two word.
			function matchDistance( s1, s2 ) {
				var arr = [];

				for ( var i = 0; i <= s1.length; i++ ) {
					var lastValue = i;

					for ( var j = 0; j <= s2.length; j++ ) {
						if ( i === 0 ) {
							arr[ j ] = j;
						} else {
							if ( j > 0 ) {
								var newValue = arr[ j - 1 ];
								if ( s1.charAt( i - 1 ) !== s2.charAt( j - 1 ) ) {
									newValue = Math.min( Math.min( newValue, lastValue ), arr[ j ] ) + 1;
								}
								arr[ j - 1 ] = lastValue;
								lastValue = newValue;
							}
						}
					}
					if ( i > 0 ) {
						arr[ s2.length ] = lastValue;
					}
				}
				return arr[ s2.length ];
			}

			function similartextCheck( s1, s2 ) {
				s1 = s1.replace( /[\-\/]|_/g, " " ).replace( /[^\w\s]|_/g, "" ).trim().toLowerCase();
				s2 = s2.replace( /[\-\/]|_/g, " " ).replace( /[^\w\s]|_/g, "" ).trim().toLowerCase();

				var arrShorter = s1.split( " " ),
					arrLonger  = s2.split( " " );

				if ( s1.length > s2.length ) {
					arrShorter = s2.split( " " );
					arrLonger  = s1.split( " " );
				}

				if ( !arrLonger.length || !arrShorter.length ) {
					return 100;
				}

				var matchChars = 0,
					maxChars = 0,
					longer = "",
					shorter = "";

				for ( var i = 0; i < arrShorter.length; i = i + 1 ) {
					var bestMatch = 0,
						fullLength = 0,
						fullMatch = false;

					for ( var j = 0; j < arrLonger.length; j = j + 1 ) {
						shorter = arrShorter[ i ];
						longer = arrLonger[ j ];

						if ( longer.indexOf( shorter ) >= 0 ) {

							var currentMatch = longer.length;

							if ( ( !fullMatch ) || ( currentMatch < bestMatch ) ) {
								bestMatch = longer.length;
								fullLength = longer.length;
							}
							fullMatch = true;
						} else if ( !fullMatch ) {
							currentMatch = longer.length - matchDistance( shorter, longer );

							if ( currentMatch > bestMatch ) {
								bestMatch  = currentMatch;
								fullLength = longer.length;
							}
						}
					}
					matchChars = matchChars + bestMatch;
					maxChars = maxChars + fullLength;
				}

				if ( matchChars === 0 ) {
					return 0;
				}

				return ( matchChars / maxChars ) * 100;
			}

			// Check agains the pass Ratio
			var result = similartextCheck( str1, str2 );
			passRatio = parseInt( passRatio );
			if ( result >= passRatio ) {
				return true;
			}
			return false;
		}
	},
	i18nText,

	KeyCode = {
		BACKSPACE: 8,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		DELETE: 46
	},
	currentlyOpened,
	isLastActiveKeyboardSelect,
	virtualLinearDOM = {},
	docFragmentSourceUI = doc.createDocumentFragment(),
	eventsToBeHook = [],
	walk = function( node, dataObj, asScoped ) {

		var children = node.childNodes,
			i, i_cache,
			i_len = children.length,
			nodeToBeRemove = [];

		for ( i = 0; i < i_len; i = i + 1 ) {
			i_cache = children[ i ];

			// If it is a textNode and contain handlebar
			if ( i_cache.nodeType === 3  && i_cache.textContent.indexOf( "{{" ) !== -1 ) {

				var regExMustache = /{{\s?([^}]*)\s?}}/g;

				// eslint-disable-next-line no-loop-func
				i_cache.textContent = i_cache.textContent.replace( regExMustache, function( a, b ) {
					return getObjectAt( dataObj.data, b.trim() );
				} );
			}

			// It's a document fragment node
			if ( i_cache.nodeName === "TEMPLATE" ) {

				// Get the template name if any, if no name then generate it and attach on the parent.
				// Cache it as being a default in the dataObj

				IE11templatePolyfill( i_cache );

				// Think if it will be better to cache it only later on, when that template would be actually needed
				var templateName = getAndRemoveAttr( i_cache, "data-wb5-template" );

				if ( !templateName ) {
					templateName = wb.getId();
				}

				if ( !i_cache.parentNode.hasAttribute( "data-wb5-template" ) ) {
					i_cache.parentNode.setAttribute( "data-wb5-template", templateName );
				}

				dataObj.tmplDefault( templateName, i_cache );

				continue;
			}

			// Skip the current look if the current node is not an element
			if ( i_cache.nodeType !== 1 ) {
				continue;
			}

			// Parse Current node
			if ( i_cache.hasAttribute( "data-wb5-for" ) ) {

				// Note: if this element contain a "if" it will be processed by the iterator template engine.
				var forAttr = getAndRemoveAttr( i_cache, "data-wb5-for" );
				var forParsed = parseFor( forAttr );

				var objToBeIterated = getObjectAt( dataObj.data, forParsed.for );

				if ( !objToBeIterated ) {
					throw "Iterator not found";
				}

				// Iterate (ObjToBeIterated need to be an array to know the "active" property)
				var opts_len = objToBeIterated.length;
				var j,
					nbNode = 0; // Number of added node

				// Ensure we don't get a reference but a copy
				objToBeIterated.wbLen = parseInt( opts_len );

				if ( $.isArray( objToBeIterated ) ) {
					objToBeIterated.active = nbNode;
				}

				for ( j = 0; j < opts_len; j = j + 1 ) {

					// TODO: Check if the i_cache is a template element, if so then run it as a sub-template
					// TODO: Check if the i_cache contains "data-wb5-template" elements, if do
					var cloneItm = i_cache.cloneNode( true );

					var ifParsed = processIf( cloneItm );

					var dt = {
						"wb-idx": j,
						"wb-nbNode": nbNode,
						parent: dataObj.data
					};
					dt[ forParsed.alias ] = objToBeIterated[ j ];

					// Make the new Data Reactive.....
					dt = wb5React( dt );

					if ( asScoped ) {
						dataObj.data[ asScoped ] = dt;
					}

					if ( !ifParsed.if || isTrue( ifParsed.if, dt.data, dataObj.data ) ) {

						nbNode = nbNode + 1;

						walk( cloneItm, dt, asScoped );
						node.appendChild( cloneItm );
					}
				}

				// Number of active nodes
				objToBeIterated.wbActive = nbNode;

				nodeToBeRemove.push( i_cache );

				continue;
			} else if ( i_cache.hasAttribute( "data-wb5-if" ) || i_cache.hasAttribute( "data-wb5-else" ) || i_cache.hasAttribute( "data-wb5-ifelse" ) ) {

				// This is a conditional

				// throw "Not implemented"
				//var ifParsed = processIf( i_cache );
			}

			// Go deeper in the next children element
			walk( i_cache, dataObj, asScoped );
		}

		// Removing node that was used for iteration or not accepted by the "if" query
		i_len = nodeToBeRemove.length;
		for ( i = 0; i !== i_len; i = i + 1 ) {
			node.removeChild( nodeToBeRemove[ i ] );
		}

		//
		// Attribute Binding
		//
		if ( node.nodeType === 1 && node.hasAttribute( "data-wb5-bind" ) ) {
			var bindAttr = getAndRemoveAttr( node, "data-wb5-bind" ),
				bindList = bindAttr.split( ", " );

			for ( var k = 0; k < bindList.length; k = k + 1 ) {
				var bindPart = bindList[ k ].split( "@" );

				if ( !node[ bindPart[ 0 ] ] ) {

					// Initialize the value
					node.setAttribute( bindPart[ 0 ], getObjectAt( dataObj.data, bindPart[ 1 ] ) );

					// Observer
					// eslint-disable-next-line no-loop-func
					dataObj.observe( bindPart[ 1 ], function() {

						if ( typeof node[ bindPart[ 0 ] ] !== "undefined" ) {

							// Like the attribute "value"
							return node[ bindPart[ 0 ] ] = getObjectAt( dataObj.data, bindPart[ 1 ] ) || "";
						} else {
							return node.setAttribute( bindPart[ 0 ], getObjectAt( dataObj.data, bindPart[ 1 ] ) ) || "";
						}
					} );
				} else {

					// Initialize the value
					node[ bindPart[ 0 ] ] = getObjectAt( dataObj.data, bindPart[ 1 ] );

					// Observer
					// eslint-disable-next-line no-loop-func
					dataObj.observe( bindPart[ 1 ], function() {
						return node[ bindPart[ 0 ] ] = getObjectAt( dataObj.data, bindPart[ 1 ] ) || "";
					} );
				}
			}
		}

		//
		// TODO: InnerHTML and TextContent binding
		//
		if ( node.nodeType === 1 && node.hasAttribute( "data-wb5-text" ) ) {

			// Get the event that we need to listen to
			var onText = getAndRemoveAttr( node, "data-wb5-text" );

			// Initialize the value
			node.textContent = getObjectAt( dataObj.data, onText );

			// Observer
			dataObj.observe( onText, function() {
				return node.textContent = getObjectAt( dataObj.data, onText ) || "";
			} );
		}

		//
		// Event listener
		//
		if ( node.nodeType === 1 && node.hasAttribute( "data-wb5-on" ) ) {

			// Get the event that we need to listen to
			var onAttr = getAndRemoveAttr( node, "data-wb5-on" );

			var multipleHandler = onAttr.split( "; " ),
				h, h_len = multipleHandler.length;

			for ( h = 0; h < h_len; h = h + 1 ) {
				var onPart = multipleHandler[ h ].split( "@" ),
					eventListener = onPart[ 0 ],
					eventAction = onPart[ 1 ],
					idxFirstParentesis = eventAction.indexOf( "(" ),
					idxLastParentesis = eventAction.lastIndexOf( ")" );

				// Get the function that need to be trigger
				var fnToBeTrigger,
					expression;

				if ( idxFirstParentesis && idxLastParentesis ) {
					fnToBeTrigger = eventAction.substring( 0, idxFirstParentesis ).trim();
					expression = eventAction.substring( idxFirstParentesis + 1, idxLastParentesis ).trim();
				}

				if ( !fnToBeTrigger ) {
					throw "Error, an event handler need to call a function";
				}

				// Parse the inner expression, if any
				if ( expression ) {
					expression = parseExpression( expression, dataObj.data );
				}

				// Check if it need to be trigger now
				if ( eventListener === "live" ) {
					getObjectAt( dataObj.data, fnToBeTrigger ).call( dataObj.data, expression );
				} else {

					// Store the event handler information to be attached after the fragment in on the real DOM.
					eventsToBeHook.push(
						{
							nd: node,
							evt: eventListener,
							trigger: fnToBeTrigger,
							attr: expression
						}
					);
				}
			}
		}
	},

	getAndRemoveAttr = function( el, attr ) {
		var ret = el.getAttribute( attr );
		el.removeAttribute( attr );
		return ret;
	},

	// TODO: Write a series of test for finding quoted string
	isTrue = function( condition, dt, dtParent ) {
		return !!parseExpression( condition, dt, dtParent );
	},

	parseExpression = function( exp, data, altData ) {

		// https://stackoverflow.com/questions/249791/regex-for-quoted-string-with-escaping-quotes
		var regDoubleQuotes = /"([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\'/g;
		var regWordFunction = /[a-zA-Z]([^\s]+)/g;
		var regExMustache = /{{-\s?([^}]*)\s?-}}/g;

		//
		// Find double quotes string
		//
		var lstString = [];

		exp = exp.replace( regDoubleQuotes, function( a ) {
			var ret = "{{-" + lstString.length + "-}}";
			lstString.push( a );
			return ret;
		} );

		//
		// Find any word/function call (No space allowed and no string inside them)
		//
		exp = exp.replace( regWordFunction, function( a ) {

			var replacementValue,
				query = a.trim();

			// Replace internal mustache if any
			query = query.replace( regExMustache, function( a, b ) {
				return lstString[ b ];
			} );

			try {
				replacementValue = getObjectAt( data, query );
			} catch ( ex ) {
				try {
					replacementValue = getObjectAt( altData, query );
				} catch ( exx ) {
					throw "Information in the DATA obj not found";
				}
			}

			if ( typeof replacementValue === "object" ) {

				// Stringfy the value
				replacementValue = JSON.stringify( replacementValue );
			}

			if ( typeof replacementValue === "string" ) {
				return "\"" + replacementValue + "\"";
			} else {
				return replacementValue;
			}
		} );

		//
		// Find string that was replaced by mustache and restore them
		//
		exp = exp.replace( regExMustache, function( a, b ) {
			return lstString[ b ];
		} );

		// Use the "new Function()" instead of eval()
		var result  = new Function( "return " + exp );

		return result();
	},

	processIf = function( el ) {
		var res = {},
			exp = getAndRemoveAttr( el, "data-wb5-if" );
		if ( exp ) {
			res.if = exp;
			addIfCondition( res, {
				exp: exp,
				block: el
			} );
		} else {
			if ( getAndRemoveAttr( el, "data-wb5-else" ) !== null ) {
				res.else = true;
			}
			var elseif = getAndRemoveAttr( el, "data-wb5-elseif" );
			if ( elseif ) {
				res.elseif = elseif;
			}
		}
		return res;
	},

	addIfCondition = function( el, condition ) {
		if ( !el.ifConditions ) {
			el.ifConditions = [];
		}
		el.ifConditions.push( condition );
	},

	// @tmplId going to be replated by the Real DOM template
	renderTemplate = function( dataObj, settings ) {

		// Prepare the template
		var template,
			clone,
			tmplId = settings.templateID;

		if ( tmplId ) {
			template = doc.getElementById( tmplId );
		}

		// Get the default if none
		if ( template ) {
			IE11templatePolyfill( template );
			clone = template.content.cloneNode( true );
		} else {
			var div = doc.createElement( "div" );
			div.innerHTML = settings.template;
			clone = doc.createDocumentFragment();
			clone.appendChild( div );
		}

		// Start the templating engine

		// Template cheat sheet
		// 		Document.querySelector()
		//		It only take the first occurence
		//var cssSelectorsMapping = {
		//	"CSS selector": "Property Name in the dataObj" // Need a modifier (like TextContent, ....)
		//}

		// Empty event hook
		eventsToBeHook = [];

		walk( clone, dataObj );

		return clone;
	},

	parseUItoJSON = function( elm, dataObj ) {

		// Check if the elm match the minimum requirement for this plugin
		if ( elm.nodeName === "SELECT" ) {
			parseSelectFromDOM( elm, dataObj );
		}

		/*else if ( elm.nodeName === "INPUT" ) {
			parseDatalistFromDOM( elm, dataObj );
		}*/
	},

	parseSelectFromDOM = function( elm, dataObj ) {
		var options = elm.options,
			i, i_cache,
			i_len = options.length;

		for ( i = 0; i < i_len; i = i + 1 ) {
			i_cache = options[ i ];

			dataObj.data.options.push(
				{
					value: i_cache.value,
					textContent: i_cache.textContent
				}
			);
		}

		dataObj.data.fieldId = elm.id || wb.getId();
		dataObj.data.fieldName = elm.name;
		dataObj.data.mustExist = true;

	},

	/*parseDatalistFromDOM = function( elm, dataObj ) {

		// Get the "list" attribute for options
		var childNodes = node.childNodes,
			i, i_cache,
			i_len = childNodes.length;

		for( i = 0; i < i_len; i ++ ) {
			i_cache = childNodes[ i ];
		}
	},

	externalDataSource = function( elm, dataObj ) {

		// Get the external URL data provider

		// See what it is the trigger prior to be loaded
		//	ex: onFirstUse, onFocus, onReady, onInit ....
	},*/

	// Create a combobox instance (JSON object)
	createCombobox = function( settings ) {

		return {
			popupId: wb.getId(),
			fieldId: false,
			fieldName: "",
			mustExist: false,
			filter: "",
			cntdisplayeditem: 0,
			options: [],
			config: settings,
			i18n: {},
			horay: "testMe",
			select: function( v ) {

				//this.selectValue = v;
				//this.filter = v.toLowerCase();
				this.filter = v;
			},
			nbdispItem: function( x ) {
				this.cntdisplayeditem = x;
			}
		};
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event, data ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm,
			settings;
		if ( elm ) {
			$elm = $( elm );

			// ... Do the plugin initialisation
			// Get the plugin JSON configuration set on attribute data-wb-helloworld
			settings = $.extend(
				true,
				{},
				defaults,
				window[ componentName ],
				wb.getData( $elm, componentName )
			);


			if ( !i18nText ) {
				i18nText = settings.i18n[ wb.lang ];
			}

			var dtEventObj = data || createCombobox( settings );

			var dataObject = wb5React( dtEventObj );

			if ( !elm.id ) {
				elm.id = wb.getId();
			}

			if ( settings.parserUI && typeof settings.parserUI === "function" ) {

				// Use the custom UI parser
				settings.parserUI( elm, dataObject );
			} else if ( settings.parserUI && $.isArray( settings.parserUI ) && settings.parserUI[ elm.id ] ) {
				settings.parserUI[ elm.id ].call( this, elm, dataObject );
			} else {

				// Parse the UI into JSON
				parseUItoJSON( elm, dataObject );
			}

			// Post parsing fix (To ensure the parsing was all good)
			if ( !dataObject.data.fieldId ) {
				dataObject.data.fieldId = wb.getId();
			}

			// Check if this is a pre-rendered template for the current Page state, if so just continu otherwise render.
			var tmpl = renderTemplate( dataObject, settings );


			// Register the fragment that would be inserted in the virtual Linear DOM
			// Get all children of the Fragment
			var frgChildNodes = tmpl.childNodes,
				frgChildNodes_len = frgChildNodes.length,
				i, i_cache;
			for ( i = 0; i < frgChildNodes_len; i = i + 1 ) {
				i_cache = frgChildNodes[ i ];

				if ( i_cache.nodeType !== 1 ) {
					continue;
				}

				var frgItemId = i_cache.id;
				if ( !frgItemId ) {
					frgItemId = wb.getId();
					i_cache.id = frgItemId;
				}
				virtualLinearDOM[ frgItemId ] = dataObject;

				// Add a class || data attribute to note it is a component
				// - This is to be able to retreive the associated data on a event
				i_cache.classList.add( "wb5React" );
			}

			// Get a reference from the combobox
			var combobox = tmpl.querySelector( "[role=combobox]" );

			if ( dataObject.data.mustExist ) {
				tmpl.querySelector( "[role=combobox] input" ).setAttribute( "data-rule-mustExist", "true" );
			}

			// The fragment would replace the current element
			elm.parentNode.insertBefore( tmpl, elm );

			// Detach the current element - Eventually they could be completly removed
			if ( !settings.hideSourceUI ) {
				elm.id = wb.getId();
				docFragmentSourceUI.appendChild( elm );
			} else {
				$elm.addClass( "hidden" );
			}

			// Create the event binding hook if any
			/*for( var j = 0; j < eventsToBeHook.length; j = j + 1 ) {
				var evtObj = eventsToBeHook[ j ];
			}*/

			$elm = $( tmpl );

			if ( elm.dataset.wbLoad ) {
				$( combobox ).trigger( {
					type: "json-fetch.wb",
					fetch: {
						url: elm.dataset.wbLoad
					}
				} );
			}

			// Polyfill IE11 for documents fragment
			if ( typeof docFragmentSourceUI.getElementById !== "function" ) {
				docFragmentSourceUI.getElementById = function( elmID ) {
					var child = this.childNodes,
						i, i_cache,
						i_len = child.length;

					for ( i = 0; i < i_len; i = i + 1 ) {
						i_cache = child[ i ];
						if ( i_cache.id === elmID ) {
							return i_cache;
						}
					}
					return false;
				};
			}

			Modernizr.addTest( "stringnormalize", "normalize" in String );

			// IE11 add support for string normalization
			Modernizr.load( {
				test: Modernizr.stringnormalize,
				nope: [
					"site!deps/unorm" + wb.getMode() + ".js"
				]
			} );

			// Call my custom event
			// $elm.trigger( "name.of.your.event", settings );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	/*
	https://github.com/vuejs/vue/blob/dev/src/compiler/parser/index.js#L370

	type ForParseResult = {
		for: string;
		alias: string;
		iterator1?: string;
		iterator2?: string;
	};
	*/
	parseFor = function( exp ) {
		var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
		var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
		var stripParensRE = /^\(|\)$/g;

		var inMatch = exp.match( forAliasRE );

		if ( !inMatch ) {
			return;
		}

		var res = {};

		res.for = inMatch[ 2 ].trim();

		var alias = inMatch[ 1 ].trim().replace( stripParensRE, "" );

		var iteratorMatch = alias.match( forIteratorRE );

		if ( iteratorMatch ) {
			res.alias = alias.replace( forIteratorRE, "" );
			res.iterator1 = iteratorMatch[ 1 ].trim();
			if ( iteratorMatch[ 2 ] ) {
				res.iterator2 = iteratorMatch[ 2 ].trim();
			}
		} else {
			res.alias = alias;
		}

		return res;
	},

	getObjectAt = function( dataProv, pointer ) {

		// May be consider to use JSON pointer instead ????

		pointer = pointer.trim();

		var firstCharacter = pointer.substring( 0, 1 ),
			lastCharacter = pointer.substring( -1 );

		if ( firstCharacter === "'" || firstCharacter === "\"" ||
			lastCharacter === "'" || lastCharacter === "\"" ) {

			// Pointer is a string

			return pointer.substring( 1, pointer.length - 1 );
		}


		// Do we have subFunction????

		var idxOpen = pointer.indexOf( "(" ),
			idxClose = pointer.lastIndexOf( ")" ),
			attributeList = [];

		if ( idxOpen !== -1 && idxClose !== -1 && idxOpen + 1 !== idxClose ) {

			// We have an internal functin

			// Extract in between and re-process
			var newPointer = pointer.substring( 0, idxOpen ),
				attributeRaw = pointer.substring( idxOpen + 1, idxClose ),
				j, j_cache, j_len;

			attributeList = attributeRaw.split( "," );
			j_len = attributeList.length;

			for ( j = 0; j < j_len; j = j + 1 ) {
				j_cache = attributeList[ j ];


				var retValue = getObjectAt( dataProv, j_cache );

				attributeList[ j ] = retValue;

			}

			// Replace the pointer
			pointer = newPointer + "()";
		}

		var pointerParts = pointer.split( "." ),
			i_len = pointerParts.length,
			i, i_cache, fnName;

		// Get the object to be iterated
		for ( i = 0; i < i_len; i = i + 1 ) {
			i_cache = pointerParts[ i ];

			if ( !dataProv ) {

				// The object do not exist
				return undefined;
			}

			if ( i_cache.lastIndexOf( "()" ) !== -1 ) {

				// Get the function name
				fnName = i_cache.substring( 0, i_cache.length - 2 );

				// call the function
				if ( typeof dataProv === "string" ) {

					dataProv = String.prototype[ fnName ].apply( dataProv, attributeList );
				} else {
					dataProv = dataProv[ fnName ].apply( dataProv, attributeList );
				}
			} else {

				// Get the property
				dataProv = dataProv[ i_cache ];
			}
		}

		return dataProv;
	},

	IE11templatePolyfill = function( elm ) {
		if ( elm.content ) {
			return;
		}

		// Polyfill Template for IE11

		var elPlate = elm,
			qContent,
			docContent;

		qContent = elPlate.childNodes;
		docContent = doc.createDocumentFragment();

		while ( qContent[ 0 ] ) {
			docContent.appendChild( qContent[ 0 ] );
		}

		elPlate.content = docContent;
	},

	// Parse string HTML into DOM fragment
	/*parseHTML = function( html ) {
		var t = document.createElement('template');
		t.innerHTML = html;
		IE11templatePolyfill( t );
		return t.content.cloneNode(true);
	},*/

	// Remove accent and normalize the string
	//
	// str: String to be normalized
	// return: A normalized string with no accent
	//
	/*unAccent = function( str ) {
		return str.normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
	},*/

	updateResults = function( input ) {

		// This function assume the UI are in enhanced state.
		// The input parent is the combobox

		// Get the controls
		var listbox = doc.getElementById( input.getAttribute( "aria-controls" ) );
		var $combobox = $( input ).parent();

		// Get the associated JSON data/application
		var $componentRoot = $( input );
		while ( !$componentRoot.hasClass( "wb5React" ) ) {
			$componentRoot = $componentRoot.parent();
		}
		var dataObj = virtualLinearDOM[ $componentRoot.get( 0 ).id ];

		//
		// Get the inner template
		//
		var template,
			tmplName = listbox.getAttribute( "data-wb5-template" );

		// Get it from the dataObj cache first, then the DOM, then the default
		if ( tmplName ) {
			template = dataObj.template( tmplName ) || doc.getElementById( tmplName ) || dataObj.tmplDefault( tmplName );
		}

		// Get the template in the DOM (The condition "!tmplName" can be removed as the "template" variable would be never initialized)
		if ( !template || !tmplName ) {

			// There is an issue
			throw "No template defined to show listbox options";
		}

		// Cache the template (Find a way to only do it once, not multiple time)
		dataObj.template( tmplName, template );

		var clone;

		IE11templatePolyfill( template );
		clone = template.content.cloneNode( true );

		// Add local info to the dataObj that we know about
		dataObj.data.filter = input.value;

		// Empty event hook
		eventsToBeHook = [];

		// Walk through the template
		walk( clone, dataObj, tmplName );

		// Count the number of option in the role, if none we don't display it

		if ( clone.querySelectorAll( "[role=option]" ).length ) {
			listbox.innerHTML = "";
			listbox.appendChild( clone );
			$( listbox ).removeClass( "hidden" );
			currentlyOpened = $combobox.get( 0 );
		} else if ( currentlyOpened ) {

			// Use a setting for that or make it as a default behaviour?????

			// Hide the listbox if there is no option
			hideListbox();
		}
	},

	hideListbox = function( ) {
		if ( currentlyOpened ) {
			var overlayElmId = currentlyOpened.getAttribute( "aria-owns" ),
				$overlay = $( "#" + overlayElmId );

			$overlay.addClass( "hidden" );

			// unset the reference at the overlay currently opened
			currentlyOpened = null;
		}
	},

	onChange = function( elm ) {

		validateSelection( elm );

		// Only if the focus are outside the input.
		if ( document.activeElement !== elm ) {

			var $combobox = $( elm ).parent();

			// Get the associated JSON data/application
			var $componentRoot = $( elm );
			while ( !$componentRoot.hasClass( "wb5React" ) ) {
				$componentRoot = $componentRoot.parent();
			}
			var dataObj = virtualLinearDOM[ $componentRoot.get( 0 ).id ];

			var inputValue = elm.value; // Get the actual value

			var selectItem = {},
				options = dataObj.data.options;

			// Find the selected items
			for ( var i = 0; i < options.length; i = i + 1 ) {
				if ( inputValue === options[ i ].value ) {
					selectItem = options[ i ];
					break;
				}
			}

			$combobox.trigger( "wb.change",
				{
					value: elm.value,
					item: selectItem
				}
			);
		}
	},

	validateSelection = function( input ) {

		var isJqueryValidIntegration = input.form && input.form.parentNode.classList.contains( "wb-frmvld" );

		// is it required?
		if ( input.getAttribute( "required" ) === null && input.value === "" || input.getAttribute( "data-rule-mustExist" ) === null )  {
			input.setCustomValidity( "" );
			if ( isJqueryValidIntegration ) {
				$( input ).valid();
			}

			return true;
		}

		// Get the associated JSON data/application
		var $componentRoot = $( input );
		while ( !$componentRoot.hasClass( "wb5React" ) ) {
			$componentRoot = $componentRoot.parent();
		}
		var dataObj = virtualLinearDOM[ $componentRoot.get( 0 ).id ];

		// As this feature filter suggestion as we type, the valid value should be already in the actual listbox

		var options = dataObj.data.options,
			inputValue = input.value,
			i, i_len = options.length,
			isValid;

		//overlayElmId = input.getAttribute( 'aria-controls' ),
		//overlay = doc.getElementById( overlayElmId ),

		for ( i = 0; i < i_len; i = i + 1 ) {
			if ( inputValue === options[ i ].value ) {
				isValid = true;
				break;
			}
		}

		if ( !isValid ) {

			// Show the error message
			input.setCustomValidity( i18nText.errValid );

			if ( isJqueryValidIntegration ) {
				$( input ).valid();
			}
			return false;
		} else {

			// Ensure there is no error message
			input.setCustomValidity( "" );

			if ( isJqueryValidIntegration ) {
				$( input ).valid();
			}
			return true;
		}
	},

	wb5React = function( dataObj ) {
		var signals = {};
		var templates = {}; // Cached template
		var tmplsDefault = {}; // Default template

		observeData( dataObj );

		return {
			data: dataObj,
			observe: observe,
			notify: notify,
			template: template,
			tmplDefault: tmplDefault,
			debug_signals: signals
		};

		function observe( property, signalHandler ) {

			if ( !signals[ property ] ) {
				signals[ property ] = [];
			}

			signals[ property ].push( signalHandler );
		}

		function notify( signal ) {
			if ( !signals[ signal ] || signals[ signal ].length < 1 ) {
				return;
			}

			signals[ signal ].forEach( function( signalHandler ) {
				return signalHandler();
			} );
		}

		function template( name, template ) {
			if ( !template ) {

				// Getter
				return templates[ name ] || false;
			} else {

				// Setter
				templates[ name ] = template;
			}
		}

		function tmplDefault( name, template ) {
			if ( !template ) {

				// Getter
				return tmplsDefault[ name ] || false;
			} else {

				// Setter
				tmplsDefault[ name ] = template;
			}
		}

		function makeReactive( obj, key, keyPrefix ) {
			var val = obj[ key ];

			if ( Array.isArray( val ) ) {

				// Just make reactive those special properties
				val.wbLen = parseInt( val.length ); // Length of the array (Updated before an iteration happend on it)
				val.wbActive = 0; // Number of items that was identified being "True"

				makeReactive( val, "wbLen", key );
				makeReactive( val, "wbActive", key );
				return;
			}

			Object.defineProperty( obj, key, {
				get: function get() {
					return val;
				},
				set: function set( newVal ) {
					val = newVal;
					notify( !keyPrefix ? key : keyPrefix + "." + key );
				}
			} );
		}

		function observeData( obj ) {
			for ( var key in obj ) {
				if ( obj.hasOwnProperty( key ) ) {
					makeReactive( obj, key );
				}
			}

			// We can safely parse the DOM looking for bindings after we converted the dataObject.
			// parseDOM(document.body, obj);
		}

		/*function syncNode(node, observable, property) {
			node.textContent = observable[property];
			// We remove the `Seer.` as it is now available for us in our scope.
			observe(property, function () {
				return node.textContent = observable[property];
			});
		}*/

		/*function parseDOM( node, observable ) {
			var nodes = document.querySelectorAll( '[s-text]' );

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for ( var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true ) {
					var _node = _step.value;

					syncNode( _node, observable, _node.attributes['s-text'].value );
				}
			} catch ( err ) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if ( !_iteratorNormalCompletion && _iterator.return ) {
						_iterator.return();
					}
				} finally {
					if ( _didIteratorError ) {
						throw _iteratorError;
					}
				}
			}
		}*/
	};

$document.on( "wb-ready.wb", function() {
	if ( $.validator ) {
		$.validator.addMethod( "fromListbox", function( value, element ) {
			return element.checkValidity();
		}, "You need to choose a valid options" );
	}
} );

// JSON suggestion fetched
$document.on( "json-fetched.wb", "[role=combobox]", function( evt ) {

	var elm = evt.target,
		suggestions = evt.fetch.response;

	// Get the current instance
	var $componentRoot = $( elm );
	while ( !$componentRoot.hasClass( "wb5React" ) ) {
		$componentRoot = $componentRoot.parent();
	}
	var dataObj = virtualLinearDOM[ $componentRoot.get( 0 ).id ];

	// Add the new options
	dataObj.data.wbLoad = suggestions;
} );

// Outside activity detection
$document.on( "click vclick touchstart focusin", "body", function( evt ) {

	// Close the overlay listbox
	if ( !currentlyOpened || currentlyOpened.parentElement.contains( evt.target ) ) {
		return;
	}

	setTimeout( function() {
		hideListbox();
	}, 1 );

} );

// Focus
$document.on( "focus", "[role=combobox] input", function( event ) {

	if ( !currentlyOpened ) {

		// Open the overlay
		setTimeout( function() {
			updateResults( event.target, false );
		}, 1 );
	}

} );

// In WET5, we should use the "blur" in order to validate the input
// Blur
$document.on( "blur", "[role=combobox] input", function( event ) {

	// Validate the input
	onChange( event.target );
} );

// keyup
$document.on( "keyup", "[role=combobox] input", function( evt ) {
	var key = evt.which || evt.keyCode,
		isInError = evt.target.classList.contains( "error" );

	switch ( key ) {
	case KeyCode.UP:
	case KeyCode.DOWN:
	case KeyCode.ESC:
	case KeyCode.RETURN:
	case KeyCode.HOME:
	case KeyCode.END:
		evt.preventDefault();
		if ( isInError ) {
			setTimeout( function() {
				onChange( evt.target );
			}, 100 );
		}
		return;

	case KeyCode.TAB:
		if ( isInError ) {
			setTimeout( function() {
				onChange( evt.target );
			}, 100 );
		}
		return;
	default:
		setTimeout( function() {
			updateResults( evt.target, false );
			if ( isInError ) {
				onChange( evt.target );
			}
		}, 100 );
	}
} );

// keydown
$document.on( "keydown", "[role=combobox] input", function( evt ) {

	// Open the overlay
	var key = evt.which || evt.keyCode,
		input = evt.target;

	if ( key === KeyCode.ESC ) {
		hideListbox();
		return;
	}

	// If close, we need to open it
	if ( !currentlyOpened ) {
		updateResults( input, false );
	}

	// var prevActive = this.getItemAt(activeIndex);
	var activeItem;

	// Get the item currently selected
	var activeDescendantID = input.getAttribute( "aria-activedescendant" ),
		prevActive = ( activeDescendantID ? doc.getElementById( activeDescendantID ) : null );

	// Get all the options
	var options = doc.getElementById( input.getAttribute( "aria-controls" ) ).querySelectorAll( "[role=option]" ),
		resultsCount = options.length;

	// Find the index of the current active item
	var activeIndex = -1;

	if ( prevActive ) {
		for ( activeIndex = 0; activeIndex < resultsCount; activeIndex = activeIndex + 1 ) {
			if ( options[ activeIndex ].id === prevActive.id ) {
				break;
			}
		}

		if ( activeIndex >= resultsCount ) {
			activeIndex = -1;
		}
	}


	switch ( key ) {
	case KeyCode.UP:

		// Move focus to and select the previous option. If focus is on the first option do nothing
		if ( activeIndex === -1 ) {
			activeIndex = resultsCount - 1;
		} else if ( activeIndex !== 0 ) {
			activeIndex--;
		} else {
			activeIndex = resultsCount - 1;
		}

		break;
	case KeyCode.DOWN:

		// Move focus to and select next option. If focus is on the first option do nothing
		if ( activeIndex === -1 ) {
			activeIndex = 0;
		} else if ( activeIndex < resultsCount ) {
			activeIndex++;
		}

		break;

	case KeyCode.HOME:

		// Move focus to and selects the first option
		activeIndex = 0;
		break;

	case KeyCode.END:

		// Move focus to and selects the last option
		activeIndex = resultsCount - 1;

		break;

	case KeyCode.RETURN:

		$( options[ activeIndex ] ).trigger( "wb.select" );

		hideListbox();
		evt.preventDefault(); // Need to prevent default here because when the combobox is within a form, the form are submited
		return;
	case KeyCode.TAB:

		// Should only select if the last active item selected was made through keyboard
		if ( isLastActiveKeyboardSelect ) {
			$( options[ activeIndex ] ).trigger( "wb.select" );
		}
		hideListbox();
		return;
	default:
		return;
	}

	evt.preventDefault();

	activeItem = options[ activeIndex ];

	if ( prevActive ) {

		// aria.Utils.removeClass(prevActive, 'focused');
		prevActive.setAttribute( "aria-selected", "false" );
	}

	if ( activeItem ) {

		// Ensure the active item has an ID
		if ( !activeItem.id ) {
			activeItem.id = wb.getId();
		}

		input.setAttribute(
			"aria-activedescendant",
			activeItem.id
		);

		//aria.Utils.addClass(activeItem, 'focused');
		activeItem.setAttribute( "aria-selected", "true" );

		isLastActiveKeyboardSelect = true;

		/*if (this.hasInlineAutocomplete) {
			this.input.value = activeItem.innerText;
		}*/
	} else {
		input.setAttribute(
			"aria-activedescendant",
			""
		);
	}
} );

// Change active descendant on mouse hover
$document.on( "mouseover", "[role=listbox] [role=option]", function( event ) {

	var input = currentlyOpened.querySelector( "input" ),
		activeItem = event.target;

	// Get the previous selected item
	var activeDescendantID = input.getAttribute( "aria-activedescendant" ),
		prevActive = ( activeDescendantID ? doc.getElementById( activeDescendantID ) : null );

	if ( prevActive ) {
		prevActive.setAttribute( "aria-selected", "false" );
	}

	// Ensure the active item has an ID
	if ( !activeItem.id ) {
		activeItem.id = wb.getId();
	}

	if ( prevActive && prevActive.id !== activeItem.id ) {
		isLastActiveKeyboardSelect = false;
	}

	// Set this item as the active ones
	activeItem.setAttribute( "aria-selected", "true" );

	// Set the active to the input
	input.setAttribute(
		"aria-activedescendant",
		activeItem.id
	);

} );

// Listbox click
$document.on( "click", "[role=listbox] [role=option]", function( event ) {

	// Get the input
	var $input = $( currentlyOpened.querySelector( "input" ) );

	// Select the options
	$( event.target ).trigger( "mouseover" ).trigger( "wb.select" );

	// Set the focus back on the input
	$input.trigger( "focus" );

	// Hide the overlay
	hideListbox();

} );

// Listbox click
$document.on( "wb.select", "[role=listbox] [role=option]", function( event ) {

	var elm = event.target;

	// Set the input value
	var input = doc.querySelector( "[aria-activedescendant=" + elm.id + "]" );

	// Get the associated JSON data/application
	var $componentRoot = $( input );
	while ( !$componentRoot.hasClass( "wb5React" ) ) {
		$componentRoot = $componentRoot.parent();
	}
	var dataObj = virtualLinearDOM[ $componentRoot.get( 0 ).id ];

	var i, i_cache;
	for ( i = 0; i < eventsToBeHook.length; i = i + 1 ) {

		i_cache = eventsToBeHook[ i ];

		if ( i_cache.nd.isEqualNode( elm ) ) {
			dataObj.data[ i_cache.trigger ].call( dataObj.data, i_cache.attr );
			break;
		}

	}

} );

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );

// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, document, wb );


/**
 * @title WET-BOEW fieldflow with combobox plugin
 * @overview Use combobox with fieldflow
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @duboisp
 */
( function( $, window, document, wb ) {
"use strict";
var $doc = wb.doc,
	localData = {};

//var jQueryCheckedFn = $.expr[":"].checked;

var parserFieldflowUI = function( elm, dataObj ) {

	if ( !elm.id ) {
		elm.id = wb.getId();
	}

	for ( var i = 0; i < localData.items.length; i = i + 1 ) {
		var i_cache = localData.items[ i ];

		var optionObj = $.extend( {}, i_cache, {
			value: i_cache.label,
			textContent: i_cache.label
		} );

		if ( !optionObj.source ) {
			optionObj.source = elm.id;
		}

		dataObj.data.options.push( optionObj );
	}
};

// Just support for the datalist with the default submission????? and leave the combobox for later.
$doc.on( "combobox.createctrl.wb-fieldflow", ".wb-fieldflow", function( event, data ) {

	localData = data;
	if ( !window[ "wb-combobox" ] ) {
		window[ "wb-combobox" ] = {};
	}

	// window[ "wb-combobox" ].parserUI = parserFieldflowUI;
	window[ "wb-combobox" ].parserUI = [];
	window[ "wb-combobox" ].parserUI[ event.target.id ] = parserFieldflowUI;
	window[ "wb-combobox" ].hideSourceUI = true;

	event.target.classList.add( "wb-combobox" );
	$( event.target ).trigger( "wb-init.wb-combobox" );

	// $( event.target ).attr( "data-wb-fieldflow-register", $( event.target ).before().get(0).id );
	$( event.target ).data().wbFieldflowRegister = [ $( event.target ).before().get( 0 ).id ];
	$( event.target ).attr( "data-wb-fieldflow-origin", $( event.target ).before().get( 0 ).id );

} );
$doc.on( "wb.change", "[role=combobox]:not(.wb-fieldflow-init)", function( event, data ) {

	var elm = event.currentTarget,
		currentItem = data.item;

	if ( !elm.id ) {
		elm.id = wb.getId();
	}

	var origin = $( "#" + currentItem.bind ).parentsUntil( ".wb-fieldflow" ).parent(),
		originID;

	if ( !origin.length ) {
		return;
	}

	originID = origin.get( 0 ).id;

	//sourceID = currentItem.source || originID;

	var $linkedElm = $( "#" + currentItem.bind );

	var actions = $linkedElm.data().wbFieldflow;

	if ( !$.isArray( actions ) ) {
		actions = [ actions ];
	}

	for ( var i = 0; i < actions.length; i = i + 1 ) {
		var i_cache = actions[ i ];

		var eventNameToBeTrigger = i_cache.action + ".action.wb-fieldflow";

		i_cache.provEvt = "#" + originID;

		$( "#" + originID ).trigger( eventNameToBeTrigger, i_cache );
	}

} );
} )( jQuery, window, document, wb );

/*
 WET 5.0 (early bird)
 @author: Goverment of Canada
 ======================================================== */
( function( $, document ) {
"use strict";

/* ---------------------------------
    @function: event parser
    @returns: [boolean] if event is keypress (space / enter ) or click for normalization of devices
   -------------------------------- */
function a11yclick( event ) {
	if ( event.type === "click" ) {
		return true;
	} else if ( event.type === "keypress" ) {
		var code = event.charCode || event.keyCode;
		if ( code === 32 || code === 13 ) {
			return true;
		}
	} else {
		return false;
	}
}

$.fn.extend( {

	/* ---------------------------------
	@extension: relatives
	@parameters: none
	@returns: [collection] jQuery collection (null safe)
	-------------------------------- */
	relatives: function() {
		var $family = $();

		this.each( function( indx, node ) {
			if ( node.wb5 && node.wb5.relatives ) {
				node.wb5.relatives.each( function() {
					$family = $family.add( this );
				} );
			}
		} );

		return $family;
	},

	/* ---------------------------------
	@extension: related
	@parameters: [collection] - $nodes
	@returns: [self]
	-------------------------------- */
	related: function( $nodes, append ) {
		this.each( function( indx, node ) {
			if ( append && node.wb5 && node.wb5.relatives ) {
				node.wb5.relatives.each( function() {
					$nodes = $nodes.add( this );
				} );
			}

			$.extend( node, { wb5: { relatives: $nodes } } );
		} );
		return this;
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: shuffle
	@returns: [list] shuffles a list of items randomly
	-------------------------------- */
	shuffle: function() {
		var allElems = this.get(),
			shuffled = $.map( allElems, function() {
				var random = Math.floor( Math.random() * allElems.length ),
					randEl = $( allElems[ random ] ).clone( true )[ 0 ];
				allElems.splice( random, 1 );
				return randEl;
			} );

		this.each( function( i ) {
			$( this ).replaceWith( $( shuffled[ i ] ) );
		} );

		return $( shuffled );
	}

} );

$.fn.extend( {

	/* ---------------------------------
	@extension: rand
	@returns: [collection] of randoms elements
	-------------------------------- */
	rand: function( k ) {
		var b = this,
			n = b.size(),
			r;

		k = k ? parseInt( k ) : 1;

		// Special cases
		if ( k > n ) {
			return b.pushStack( b );
		} else if ( k === 1 ) {
			return b.filter( ":eq(" + Math.floor( Math.random() * n ) + ")" );
		}

		// Create a randomized copy of the set of elements,
		// using Fisher-Yates sorting
		r = b.get();
		for ( var i = 0; i < n - 1; i++ ) {
			var swap = Math.floor( Math.random() * ( n - i ) ) + i;
			r[ swap ] = r.splice( i, 1, r[ swap ] )[ 0 ];
		}
		r = r.slice( 0, k );

		// Finally, filter jQuery stack
		return b.filter( function( i ) {
			return $.inArray( b.get( i ), r ) > -1;
		} );
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: isEmpty
	@returns: [boolean] if jQuery collection is empty or not
	-------------------------------- */
	notEmpty: function() {
		return this.length !== 0;
	}
} );

$.fn.extend( {

	/* ---------------------------------
	@extension: command
	@returns: [array] if jQuery collection is empty or not
	-------------------------------- */
	command: function( attrval ) {
		if ( attrval.length ) {
			var params = attrval.split( "@" );
			return { command: params[ 0 ], selector: params[ 1 ], options: params[ 2 ] };
		}
		return { command: false, selector: false };
	}
} );


/* ---------------------------------
    Bind
    @description: creates a referencable set of elements to a node
    @api
      - elements are extended with related function
        $elm.related( nodelist )
   -------------------------------- */
$( "[data-wb5-bind]" ).each( function( idx, elm ) {
	var $elm = $( elm ),
		$nodes;
	if ( $elm.parents().is( "template" ) ) {
		return;
	}
	$nodes = $( $elm.attr( "data-wb5-bind" ) );
	if ( $nodes.notEmpty() ) {
		$elm.related( $nodes );
	}
} );

/* ---------------------------------
    Debug
    @description: allows any node to output in the console the passed function
    @examples
      1.
      <div data-wb5-bind=".elementclasses" data-wb5-debug="relatives" >
      = console.log =
        nodelist of bound element  //  console.log( $(this).relatives() )
      2.
      <div data-wb5-bind=".elementclasses" data-wb5-debug="text" >
      = console.log =
        text of element  //  console.log( $(this).text() )
   -------------------------------- */
$( document ).on( "keypress click", "[data-wb5-debug]", function( evnt ) {
	if ( !a11yclick( evnt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		functions = $elm.attr( "data-wb5-debug" ).split( "," );
	for ( var i = functions.length - 1; i >= 0; i-- ) {
		console.log( $elm[ functions[ i ] ]() ); // eslint-disable-line no-console
	}
} );

$( "[data-wb5-click]" ).on( "click", function() {
	var $elm = $( this ),
		command = $elm.data( "wb5-click" ).split( "@" ),
		action = command[ 0 ],

		// selector = command[ 1 ],
		options = command[ 2 ];

	if ( action === "postback" ) {
		var $form = $( command[ 1 ] );

		$.ajax( {
			type: $form.attr( "method" ),
			url: $form.attr( "action" ),
			data: $form.serialize() // serializes the form's elements.
		} );

		return ( options.block ) ? false : true;
	}
} );

/**
 * data-progress-update
 * @param  {[type]} ){                var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "updated.wb5", "[data-wb5-update]", function() {
	var $elm = $( this ).relatives(),
		max = this.getAttribute( "max" ),
		value = this.getAttribute( "value" ),

		// marker = this.getAttribute( "data-percentage" ) || 0,
		percentage = Math.ceil( value / max * 100 ) || 0;

	$elm.find( ".meter" ).text( value );

	$elm
		.removeClass( function( index, className ) {
			return ( className.match( /(^|\s)p\d+/g ) || [] ).join( " " );
		} )
		.attr( "data-percentage", "p" + percentage );
	$elm.addClass( "p" + percentage );
} );

/**
 * data-wb5-ajax
 * @param  {[type]} evt)   [description]
 * @param  {[type]} action [description]
 * @param  {[type]} $nodes [description]
 * @return {[type]}        [description]
 */
$( document ).on( "keypress click", "[data-wb5-ajax]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-ajax" ) ),
		$nodes = $elm.relatives();

	// Lets ensure we have notifying screen readers
	$nodes.attr( "aria-live", "polite" );

	switch ( action.command ) {
	case "replace":
		$.get( action.options, function( data ) {
			$nodes.html( data );
		} );
	}
} );

/**
 * data-wb5-load
 * @param  {[type]} evt)   {             if (!a11yclick(evt)) {        return true;  }  var $elm [description]
 * @param  {[type]} action [description]
 * @param  {[type]} $nodes [description]
 * @return {[type]}        [description]
 */
$( document ).on( "keypress click", "[data-wb5-load]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-load" ) ),
		$nodes = $elm.relatives();

	// Lets ensure we have notifying screen readers
	$nodes.attr( {
		"aria-relevant": "all",
		"aria-live": "polite",
		"aria-atomic": "true"
	} );

	switch ( action.command ) {
	case "replace":
		$nodes.load( action.options );
	}
} );

/**
 * data-wb5-trigger
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wb5-trigger]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-trigger" ) );
	$elm.relatives().trigger( action.command );
} );

/**
 * data-wb5-profile
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wb5-profile]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wb5-profile" ) );

	if ( action.command === "single" ) {
		$elm
			.relatives()
			.removeClass( action.options )
			.filter( "[role=button]" )
			.attr( "aria-pressed", "false" );
		$( evt.target )
			.closest( $elm.relatives() )
			.addClass( action.options )
			.filter( "[role=button]" )
			.attr( "aria-pressed", "true" );
	}
} );

} )( jQuery, document );

/*
 * Charts
 */
( function( $, document, wb ) {
"use strict";

/* ---------------------------------
@function: performant template generator
@returns: [string]
-------------------------------- */
var tmpl = function() {
	var start = "{{",
		end = "}}",
		rnd = function( value, precision ) {
			var multiplier = Math.pow( 10, precision || 0 );
			return Math.round( value * multiplier ) / multiplier;
		},

		// e.g. config.person.name
		path = "[a-z0-9_$][\\.a-z0-9_]*",
		pattern = new RegExp( start + "\\s*(" + path + ")\\s*" + end, "gi" );

	return function( template, data, decimals ) {

		// Merge data into the template string
		return template.replace( pattern, function( tag, token ) {
			var path = token.split( "." ),
				len = path.length,
				lookup = data,
				i = 0;

			for ( ; i < len; i = i + 1 ) {
				lookup = lookup[ path[ i ] ];

				// Property not founds
				if ( lookup === undefined ) {
					throw "tim: '" + path[ i ] + "' not found in " + tag;
				}

				// Return the required value
				if ( i === len - 1 ) {
					if ( $.isNumeric( lookup ) && decimals ) {
						return rnd( lookup, decimals ).toLocaleString( document.documentElement.lang );
					}
					if ( $.isNumeric( lookup ) ) {
						return lookup.toLocaleString( document.documentElement.lang );
					}
					return lookup;
				}
			}
		} );
	};
};

// data-wb-charts-interactive
$( document ).on( "wb-ready.wb-charts", "[data-wb-charts-interactive]", function() {
	var $table = $( this ), // The table used to create the chart
		action = $table.command( this.getAttribute( "data-wb-charts-interactive" ) ),
		tooltipid =  wb.getId().replace( /-/g, "" ),
		template = $( action.selector ).html(),
		decimals = ( action.options ) ? action.options : 1,
		$chart = $table.prev(); // Because the charts is inserted immediatly before the table when it is not inside an expand collapse.

	$( "<div id='" + tooltipid + "' class='wbchrt-tpl'></div>" ).css( {
		position: "absolute",
		display: "none"
	} ).appendTo( "body" );

	// reset the canvas to its original stage TODO: We need to explore it's responsiveness .. maybe bind it to  resize event in WET?
	$( "canvas:eq(1)", $chart ).css( "position", "relative" );

	//$( "canvas:eq(0)", $chart ).css( "width", $( "canvas:eq(1)", $chart ).attr( "width") );

	$chart.on( "plothover", function( event, pos, item ) {
		if ( item ) {
			var tooltip = $( "#" + tooltipid ),
				data = { x: item.datapoint[ 0 ], y: item.datapoint[ 1 ], label: item.series.label, formatted: {} };
			tooltip.html( tmpl( template, data, decimals ) );
			tooltip.css( { top: item.pageY + 7, left: item.pageX + 7 } ).show();
		} else {
			$( "#" + tooltipid ).hide();
		}
	} );
} );

} )( jQuery, document, wb );

/*
 * WB5 Datatables
 */
( function( $, document, wb ) {
"use strict";

/*
 Global Helper functions
 @author: Goverment of Canada
 ======================================================== */

/* ---------------------------------
    @function: event parser
    @returns: [boolean] if event is keypress (space / enter ) or click for normalization of devices
   -------------------------------- */
function a11yclick( event ) {
	if ( event.type === "click" ) {
		return true;
	} else if ( event.type === "keypress" ) {
		var code = event.charCode || event.keyCode;
		if ( code === 32 || code === 13 ) {
			return true;
		}
	} else {
		return false;
	}
}

function setValue( $elm, value ) {
	if ( $elm.is( ":input" ) ) {
		$elm.val( value );
		return true;
	}

	$elm.text( value );

	return true;
}

/* ---------------------------------
	Datatables Init
	@description: Apply any pre-filter set through the UI
   -------------------------------- */
$( document ).on( "preInit.dt", ".wb-tables", function() {
	var form = $( "form[data-wbtbl-post]" ).get( 0 ); // Get the filter form if any

	if ( form ) {

		// Apply for submission behaviour but without the table "draw"
		applySearchFilter.call( form );
	}

} );

/* ---------------------------------
    Datatables Event Mappers
    @description: mirrors the datatable events to it relatives with extra custom information
   -------------------------------- */
$( document ).on( "draw.dt", ".wb-tables", function( evnt ) {
	var $elm = $( this ),
		table = $elm.DataTable();

	// now fire the event;
	$elm.relatives().trigger( {
		type: evnt.type,
		table: table,
		displayed: table.page.info().recordsDisplay,
		total: table.page.info().recordsTotal
	} );
} );

/* Workaround for IE and Edge, which need the details polyfills
 * The source of the issue are unknow.
 * Hypothesis: Is the polyfill get executed and then the datatable do a DOM mutation which remove the event handler previously added by the polyfill?
 */
if ( !Modernizr.details ) {
	$( document ).on( "draw.dt", ".wb-tables", function() {
		var $elm = $( this );
		$elm.find( "summary" ).removeClass( "wb-init" ).removeClass( "wb-details-inited" ).trigger( "wb-init.wb-details" );
	} );
}

/* ---------------------------------
    Datatables Draw Listener
    @description: reacts to datatables that have been drawn
    @methods:
      - display: displays the option info from the table
      - count: a progress bar and meter friendly count updater
   -------------------------------- */
$( document ).on( "draw.dt", "[data-wbtbl-draw]", function( evnt ) {
	var $elm = $( this ),
		action = $elm.command( $elm.attr( "data-wbtbl-draw" ) ),
		$table = evnt.table,
		$node = $( $table.table().node() ),
		isFiltered = evnt.displayed !== evnt.total,
		count = 0,
		all = evnt.total;

	//total = evnt.displayed;

	switch ( action.command ) {
	case "display":
		return setValue( $elm, $table.page.info()[ action.options ] );
	case "count":
		var rows = isFiltered ? $table.rows( { search: "applied" } ) : $table.rows( { page: "all" } );
		rows.iterator( "row", function( context, index ) {
			if ( $( this.row( index ).node() ).text().indexOf( action.options ) > -1 ) {
				count++;
			}
		} );
		if ( $elm.is( "progress" ) ) {
			$elm.attr( { max: all, value: count } );

			if ( $node.hasClass( "wbtbl-silent" ) ) {
				return true;
			}
			$elm.trigger( "updated.wb5" );
		}
		return $elm.text( count );
	}
} );

/* ---------------------------------
    Datatables Reset
    @description: reset datatables
   -------------------------------- */
$( "[data-wbtbl-reset]" ).on( "click", function() {

	var command = this.getAttribute( "data-wbtbl-reset" ).split( "@" ),
		$table =  $( command[ 0 ] ).DataTable();

	$table.search( "" ).columns().search( "" );

	if ( command[ 1 ] === "all" ) {
		return $table.search( "" ).columns().search( "" ).draw();
	}

	return $table.column( command[ 1 ] ).search( "" ).draw();
} );

/* ---------------------------------
    Datatables Tagcloud
    @description: enables a tag cloud where users can remove selected filters
   -------------------------------- */
$( document ).on( "wb-ready.wb-tables", "[data-wbtbl-tag=enable]", function() {
	var $elm = $( this ),
		$wrapper = $elm.closest( ".dataTables_wrapper" );

	$wrapper
	.addClass( "tagcloud" )
	.find( ".top" )
	.append( "<div data-wbtbl-tagcloud='active' aria-live='polite'></div>" );

	$elm.related( $wrapper.find( "[data-wbtbl-tagcloud]" ).eq( 0 ), true );

	$wrapper.find( "[data-wbtbl-tagcloud]" ).eq( 0 ).trigger( { type: "draw.dt", table: $elm.eq( 0 ).dataTable().api() } );
} );

$( document ).on( "draw.dt", "[data-wbtbl-tagcloud]", function( evnt ) {
	var $table = evnt.table,
		indx = -1,
		$tg = $( this );

	var iteratorFn = function() {
		var search = this.search();

		if ( search ) {

			// lets remove all regex
			var words = search.split( "|" );
			var $tag =
			"<li><span class='tagitem' data-wbtbl-col-idx='" + indx + "'><span class='content'>" +
			words.map( function( wrd ) {
				return wrd.replace( /[{()}]/g, "" );
			} ).join( " &amp; " ) +
			"</span> <button type='button' class='close' tabindex='0' aria-label='" +
			wb.i18n( "geo-aoi-btnclear" ) +
			"'><span aria-hidden='true'>&times;</span></button></span></li>";
			$tg.find( "ul" ).append( $tag );
		}
		indx++;
	};

	$tg.html( "<ul class='list-inline tags' aria-live='polite'></ul><div class='clearfix'></div>" );

	iteratorFn.call( $table );

	$table.columns().every( iteratorFn );

} );

/**
 * data-wbtbl-highlight
 * @param  {[type]} evt ){              var $elm [description]
 * @return {[type]}     [description]
 */
$( document ).on( "keypress click", "[data-wbtbl-highlight]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-highlight" ) ),
		$table = $elm.relatives().DataTable();

	$elm
	.relatives()
	.removeClass( "wbtbl-silent" )
	.addClass( "wbtbl-silent" );

	$table
	.column( action.selector )
	.search( action.options, false, false, true )
	.draw();
} );

/**
   * data-wbtbl-search
   * @param  {[type]} evt ){              var $elm [description]
   * @return {[type]}     [description]
   */
$( document ).on( "keypress click", "[data-wbtbl-search]", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-search" ) ),
		$table = $elm.relatives().DataTable();

	$elm.relatives().removeClass( "wbtbl-silent" );

	$table
	.search( "" )
	.columns()
	.search( "" );
	$table
	.column( action.selector )
	.search( action.options, false, false, true )
	.draw();
} );

/**
 * wbtbl-search (for form submission)
 * @param  {[type]} evt) {             var $elm [description]
 * @return {[type]}      [description]
 */
$( document ).on( "submit", "[data-wbtbl-submit]", function() {

	var $elm = $( this ),
		action = $elm.command( this.getAttribute( "data-wbtbl-submit" ) ),
		$table = $elm.relatives().DataTable(),
		actionSelector = action.selector,
		actionOption = action.options;

	$elm.relatives();

	$table
	.search( "" )
	.columns()
	.search( "" );

	if ( actionSelector ) {
		$table = $table.column( actionSelector );
	}

	$table
	.search( $elm.find( "input" ).val(), false, ( actionOption && actionOption === "smart" ), true )
	.draw();

	return false;
} );

/**
 * data-wbtbl-tagcloud
 * @param  {[type]} evt ){ var $elm [description]
 * @return {[type]} [description]
 */
$( document ).on( "keypress click", "[data-wbtbl-tagcloud] li button", function( evt ) {
	if ( !a11yclick( evt ) ) {

		// Lets ignore since we are only looking for true clicks
		return true;
	}
	var $elm = $( this ),
		$item = $elm.closest( "li" ),
		term = $item.find( ".content" ).text(),
		cid = parseInt( $elm.closest( "[data-wbtbl-col-idx]" ).attr( "data-wbtbl-col-idx" ) ),
		$table = $elm.closest( ".dataTables_wrapper" ).find( ".wb-tables" ).removeClass( "wbtbl-silent" ).DataTable(); // We are a live element so we need to query often

	if ( cid !== -1 ) {
		$table = $table.column( cid );
	}

	$table
	.search( "", false, false, true )
	.draw();

	$item.remove();

	refreshCtrlTblCol( $table, false, cid, term );

} );

/*
 * External event to refresh the table controler
 *
 * @param: isSelected Define if the search trigger a selection or not, undefined means true
 *
 */
$( document ).on( "refreshCtrl.wbtbl", "table", function( evt ) {

	refreshCtrlTbl( $( evt.currentTarget ).DataTable(), evt.isSelected === undefined || evt.isSelected );
} );

/*
 *
 * @param dtTable = [Required] Reference to datatable
 * @param isSelected = [Required] Define is that filter is on or off. (off === false)
 * @param cid = [Optional, Require term] column id
 * @param term = [Optional, Require cid] Term of filtering
 *
 */
function refreshCtrlTbl( $dtTable, isSelected, cid, term ) {

	// If ColumnId is defined, only do for that columnId, Otherwise do this for all columns
	if ( !cid || !term ) {

		// Do this for call the table column

		$dtTable.columns().every( function( index ) {
			term = $dtTable.column( index ).search();

			refreshCtrlTblCol( $dtTable, isSelected && term, index, term );
		} );

	} else {

		// Do only for the column based on the term passed in parameter
		refreshCtrlTblCol( $dtTable, isSelected, cid, term );
	}

}

function refreshCtrlTblCol( $dtTable, isSelected, cid, term ) {

	// Lets reset any search items
	var $searchItems = $( "[data-wbtbl-search$=\"@" + cid + "@" + term + "\"],[data-wbtbl-highlight$=\"@" + cid + "@" + term + "\"]" );

	if ( isSelected ) {
		$searchItems.removeClass( "pick" );
	} else {
		$searchItems.addClass( "pick" );
	}

	// Lets reset any search items
	$( "form[data-wb5-bind=\"#" + $dtTable.table().node().id + "\"]" ).find( "[value^=\"" + cid + "@" + term + "\"],[data-wbtbl-bind^=\"" + cid + "@" + term + "\"]" ).each( function( idx, element ) {
		var $elm = $( element );

		if ( $elm.is( "[type=checkbox],[type=radio]" ) ) {
			$elm.prop( "checked", isSelected );
			return true;
		} else  if ( $elm.is( "[type=text],[type=textarea]" ) ) {
			$elm.val( isSelected ? term : "" );
			return true;
		} else {
			$elm.get( 0 ).selected = isSelected;
		}
		return true;
	} );

}

/*
	@description: Apply a data table search defined through the filter form [data-wbtbl-post]
	@param: this -> pointer to the <form> DOM element
 */
function applySearchFilter() {
	var $elm = $( this ),
		values = [],
		$table = $elm.relatives().DataTable(),
		action = $elm.command( this.getAttribute( "data-wbtbl-post" ) ),
		xOr = [];

	$elm.find( action.selector ).each( function( idx, elm ) {
		var $elment = $( elm );

		if ( $elment.is( "[type=checkbox]" ) ) {
			if ( $elment.is( ":checked" ) ) {
				if ( $elment.is( "[data-xor]" ) ) {
					xOr.push( $elment.val() );
					return true;
				}
				values.push( $elment.val() );
			}
			return true;
		}
		values.push( $elment.val() );
	} );

	// Lets combine the search term
	if ( xOr.length > 1 ) {
		var stmt = {},
			idx = false;

		for ( var x = xOr.length - 1; x >= 0; x-- ) {
			var multiple = xOr[ x ].split( "@" );

			// Ensure each filter in "xor" group have their own labels.
			if ( !stmt.hasOwnProperty( multiple[ 0 ] ) ) {
				stmt[ multiple[ 0 ] ] = [];
			}
			stmt[ multiple[ 0 ] ].push( "(" + multiple[ 1 ] + ")" );
		}

		for ( idx in stmt ) {
			values.push( idx + "@" + stmt[ idx ].join( "|" ) );
		}
	} else if ( xOr.length === 1 ) {
		values.push( xOr[ 0 ] );
	}

	for ( var i = values.length - 1; i >= 0; i-- ) {
		var params = values[ i ].split( "@" ),
			col = params[ 0 ],
			text = params[ 1 ];

		if ( text.indexOf( "|" ) !== -1 ) {
			$table.column( col ).search( text, true );
			continue;
		}

		text = text.replace( /^\(/, "" ).replace( /\)$/, "" );

		$table.column( col ).search( text );
	}
}

/**
 * data-wbtbl-post
 * @description post to a datable search columns via form elements
 * @param  {[event]}     evt
 * @return {[boolean]}     proceed to submite
 */
$( document ).on( "submit", "[data-wbtbl-post]", function( ) {

	var $elm = $( this );

	applySearchFilter.call( this );

	$elm.relatives().DataTable().draw();

	return ( $elm.is( "[action]" ) ) ? true : false;
} );

/**
 * data-wbtbl-post
 * @description post to a datable search columns via form elements
 * @param  {[event]}     evt
 * @return {[boolean]}     proceed to submite
 */
$( document ).on( "reset", "[data-wbtbl-post]", function( ) {

	var elm = this,
		$elm = $( elm ),
		$table = $elm.relatives().DataTable();

	$table.search( "" );
	$table.columns().every( function( ) {
		this.search( "" );
	} );

	$table.draw( );

	// Hard reset input default checkstate. The use case is the initial state contain a pre-defined filter, but it needs to be removed when clearing the form.
	// The use of setTimeout is to ensure this happen after the "reset" form event.
	setTimeout( function( ) {
		var inputs = elm.querySelectorAll( "[data-wb5-default-checked]" ),
			i, i_len = inputs.length,
			i_cache;

		for ( i = 0; i < i_len; i++ ) {
			i_cache = inputs[ i ];
			i_cache.checked = ( i_cache.dataset.wb5DefaultChecked !== "false" );
		}

		// Refresh the filter, in the case some are pre-set via the UI.
		applySearchFilter.call( elm );
		$table.draw();
	}, 1 );
} );
} )( jQuery, document, wb );

/*
 * URL Mapping
 */
( function( $, document ) {
"use strict";

// URL Mapping integration with WB5 wbtbl filtering
$( document ).on( "do.wb-actionmng", "table[data-wb-urlmapping][data-wb5-bind]", function( event ) {
	var $table = $( event.currentTarget );
	$table.one( "draw.dt", function() {
		$table.trigger( "refreshCtrl.wbtbl" );
	} );
} );

} )( jQuery, document );
