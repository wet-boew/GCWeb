/**
 * @title GCWeb PII scrub - detection patterns override
 * @overview Temporarily replaces the WET-BOEW core "wb.findPotentialPII" helper with the
 * updated detection patterns proposed in wet-boew/wet-boew PR #10117 (WET-640), which adds
 * an extra loose email pattern and five civic/postal address patterns (EN and FR).
 *
 * The "wb-pii-scrub" plugin itself is already shipped in the WET-BOEW distribution used by
 * GCWeb, so it is deliberately NOT duplicated here - only the core detection helper it calls
 * is overridden. This file is concatenated into GCWeb's theme.js, which loads after
 * wet-boew.js, so this definition wins over the one bundled in core.
 *
 * REMOVE THIS FILE once PR #10117 is merged upstream and the "wet-boew" dependency in
 * package.json is bumped to a release that includes it.
 *
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @polmih, @duboisp, @GormFrank
 */
( function( $, wb ) {
"use strict";

wb.findPotentialPII = function( str, scope, opts ) {
	if ( str && typeof str  !== "string" ) {
		return false;
	}
	const STREET_TYPES =
			"(?:street|avenue|road|drive|boulevard|lane|place|terrace|parkway|" +
			"circle|highway|pike|row|crescent|close|green|grove|" +
			"gate|heights|manor|ridge|rise|square|" +
			"hill|hills|acres|valley|rue|chemin|route|terrasse|rang|promenade|" +
			"all[ée]e?|st|ave|av|av\\.|rd|dr|blvd|boul|boul\\.|ln|ct|pl|" +
			"ter|terr|pkwy|cir|ci|hwy|wy|trl|cres|cr|cl|pt|gr|gv|ga|ht|hts|ld|lk|pa|" +
			"pk|rg|ri|rw|sq|tc|vi|vw|wk|co|ba|bv|hl|tr|cv|gd|mt|gw|sm|" +
			"rp|al|ch|ch\\.|chem|chem\\.|rte|all\\.|allee|prom|prom\\.)",
		NAME_PART =
			"(?:\\d{1,2}(?:st|nd|rd|th)|[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ''\\-]*)",
		DIRECTIONS =
			"(?:n|s|e|w|ne|nw|se|sw|o|no|so|north|south|east|west)",
		FR_ARTICLES =
			"(?:de\\s+la\\s+|du\\s+|des\\s+|de\\s+|le\\s+|la\\s+|les\\s+|d'|l')?",
		HOUSE_NUMBER = "(\\d{1,6}[A-Za-zÀ-ÿ]?)";

	var oRegEx = {

			/*
			* Digits:
			* 9 digits or more
			*/
			digits: /\d(?:[\s\-\\.\\/]?\d){8,}(?!\d)/ig,

			/*
			* Phone:
			* Any international phone number format
			*/
			phone: /\+?(\d{1,3})?[-._\s]?(\(?\d{3}\)?)[-._\s]?(\d{3})[-._\s]?(\d{4})/ig,

			/*
			* Passport:
			* 2 letters followed by either a " ", a "/", a ".", or a "-" any amount of times, followed by 6 digits
			*/
			passport: /\b[A-Za-z]{2}[\s\\.-]*?\d{6}\b/ig,

			/*
			* Email:
			* valid email format
			*/
			email: /\b(?:[a-zA-Z0-9_\-\\.]+)(?:@|%40|%2540)(?:[a-zA-Z0-9_\-\\.]+)\.(?:[a-zA-Z]{2,5})\b/ig,

			/*
			* Loose email:
			* email address that has one or more whitespaces before the "@" sign and either a "." or "," after the domain name
			*/
			looseEmail: /([a-zA-Z0-9_\-.]+)\s*@([\sa-zA-Z0-9_\-.]+)[.,]([a-zA-Z]{1,5})/g,

			/*
			* Loose email 2:
			* matches probable email format that the user tried to hide
			* any amount of letters, numbers, ".", "_", "%", "+", or "-", followed by 0 or 1 whitespace,
			* followed by "@", followed by 0 or 1 whitespace, followed by "gmail", "outlook", "hotmail", or "yahoo".
			*/
			looseEmail2: /([a-zA-Z0-9._%+-]+)\s?@\s?(gmail|outlook|icloud|hotmail|yahoo)(\s?\.?\s?(com|ca))?/ig,

			/*
			* Loose email 3: to catch obfuscated emails: supports +, spaces in domain, optional TLD, longer TLDs
			*/
			looseEmail3: /([a-zA-Z0-9_+\-\\.]+)\s*@\s*([a-zA-Z0-9_\-\\.]+)(?:\s*[\\.,]\s*([a-zA-Z]{0,10}))?/ig,

			/*
			* Postal code:
			* valid Canadian postal code
			*/
			postalCode: /\b[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d\b/ig,

			/*
			* Address pattern 1: NUMBER + (DIRECTION) + WORD(S) + STREET_TYPES + (DIRECTION)
			*/
			address_pattern_1: new RegExp(
				"\\b" + HOUSE_NUMBER + "\\s+" +
				`(?:${ DIRECTIONS }\\s+)?` +
				`(?:${ NAME_PART }(?:\\s+${ NAME_PART }){0,3})\\s+` +
				STREET_TYPES +
				`(?:\\s+${ DIRECTIONS })?\\b`,
				"ig" ),

			/*
			* Address pattern 2: NUMBER + STREET_TYPES + (FR_ARTICLES) + WORD(S)
			*/
			address_pattern_2: new RegExp(
				"\\b" + HOUSE_NUMBER + ",?\\s+" +
				STREET_TYPES +
				"\\s+" +
				FR_ARTICLES +
				`(?:${ NAME_PART }(?:\\s+${ NAME_PART }){0,3})\\b`,
				"ig" ),

			/*
			* Address pattern 3: NUMBER + STREET_TYPES
			*/
			address_pattern_3: RegExp(
				"\\b" + HOUSE_NUMBER + "\\s+" +
				STREET_TYPES +
				"\\b",
				"ig" ),

			/*
			* Address pattern 4: STREET_TYPES + NUMBER
			*/
			address_pattern_4: new RegExp(
				`\\b${ STREET_TYPES }\\s+${ HOUSE_NUMBER }\\b`,
				"ig" ),

			/*
			* Address pattern 5: PO BOX + NUMBER
			* e.g., “PO Box 123”, “P.O. Box 456”, “Post Office Box 789”, “C.P. 123”, “B.P. 456”, “Case postale 789”, “Boîte postale 123”, “Casier postal 456”
			*/
			address_pattern_5: /\b(?:(?:p\.?\s*o\.?\s*box)|(?:post\s+office\s+box)|(?:c\.?\s*p\.?)|(?:b\.?\s*p\.?)|(?:case\s+postale)|(?:bo[iî]te\s+postale)|(?:casier\s+postal))(?:\.+)?[ \t]*(?:#|no\.?|n[º°]|n°|num(?:[ée]ro)?\.?)?[ \t]*(?<box_number>[A-Za-z0-9][A-Za-z0-9\\-]*)\b/giu,

			/*
			* Username:
			* "username" or "user",
			* followed by a colon or an equals sign,
			* followed by any character that is not a " " or a "&"
			*/
			username: /(?:(username|user)[%20]?([:=]|(%EF%BC%9A))[^\s&]*)/ig,

			/*
			* Password:
			* "password" or "pass",
			* followed by a ":" or a "=",
			* followed by any character that is not a " " or a "&"
			*/
			password: /(?:(password|pass)[%20]?([:=]|(%EF%BC%9A))[^\s&]*)/ig
		},
		isFound = false,
		txtMarker = opts && opts.replaceWith ? opts.replaceWith : "",
		toClean = typeof scope === "object" ? true : scope,
		arMatchedStr,
		settings = opts || {},
		defaultSettings = {
			isCustomExclusive: false,
			useFullBlock: false,
			replaceWith: ""
		},
		isFullBlock = settings.useFullBlock || false,
		validatedScope = typeof scope === "object" ? {} : oRegEx;
	settings = $.extend( {}, defaultSettings, settings );

	if ( Object.keys( validatedScope ).length === 0 ) {
		if ( settings.isCustomExclusive ) {
			for ( var key in scope ) {
				if ( scope[ key ] instanceof RegExp ) {
					validatedScope[ key ] = scope[ key ];
				}
			}
		} else {
			if ( Object.keys( scope ).length === 1 && Object.values( scope )[ 0 ] instanceof RegExp ) {
				validatedScope = oRegEx;
				validatedScope[ Object.keys( scope )[ 0 ] ] = Object.values( scope )[ 0 ];
			} else {
				for ( var keyScope in scope ) {
					if ( Object.prototype.hasOwnProperty.call( oRegEx, keyScope ) ) {
						validatedScope [ keyScope ] = oRegEx [ keyScope ];
					} else {
						if ( scope[ keyScope ]  instanceof RegExp ) {
							validatedScope [ keyScope ] = scope [ keyScope ];
						}
					}
				}
			}
		}
	}

	for ( var valKey in validatedScope ) {
		arMatchedStr = str.match( validatedScope[ valKey ] );
		if ( arMatchedStr ) {
			isFound = true;
			if ( toClean ) {
				txtMarker = isFullBlock ? "█".repeat( arMatchedStr[ 0 ].length ) : txtMarker;
				str = str.replaceAll( validatedScope[ valKey ], txtMarker );
			}
		}
	}

	return toClean && isFound ? str : isFound;
};

} )( jQuery, wb );
