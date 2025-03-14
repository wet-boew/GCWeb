/** @type {import('stylelint').Config} */
module.exports = {

	plugins: [ "@double-great/stylelint-a11y" ],
	rules: {

		"alpha-value-notation": "number",
		"color-function-notation": "legacy",

		// Suppress stylelint-config-recommended errors
		"font-family-no-duplicate-names": [
			true,
			{
				ignoreFontFamilyNames: [
					"monospace" // Issue from Bootstrap-sass/normalize.scss
				]
			}
		],
		"font-family-no-missing-generic-family-keyword": [
			true,
			{
				ignoreFontFamilies: [
					"Glyphicons Halflings", // Icons don't need fallbacks
					"/a/" // Weird buggy thing from text-hide mixin from Bootstrap 3
				]
			}
		],

		"media-feature-range-notation": "prefix", // Uses legacy syntax

		// Partially-enable stylelint-a11y rules
		"a11y/content-property-no-static-value": null,
		"a11y/font-size-is-readable": null,
		"a11y/line-height-is-vertical-rhythmed": null,
		"a11y/media-prefers-reduced-motion": null,
		"a11y/media-prefers-color-scheme": null,
		"a11y/no-display-none": null,
		"a11y/no-obsolete-attribute": true,
		"a11y/no-obsolete-element": null, // Treats menu and hgroup as false positives
		"a11y/no-spread-text": true,
		"a11y/no-outline-none": null,
		"a11y/no-text-align-justify": null, // Bootstrap 3.4.x comes with a .text-justify class
		"a11y/selector-pseudo-class-focus": null
	},
	overrides: [
		{
			files: [
				"**/*.css"
			],
			extends: [
				"stylelint-config-standard"
			],
			rules: {
				"at-rule-empty-line-before": null,
				"at-rule-no-vendor-prefix": null,
				"color-hex-length": null,
				"comment-empty-line-before": null,
				"comment-whitespace-inside": null,
				"declaration-block-no-duplicate-properties": null,
				"declaration-block-no-redundant-longhand-properties": null,
				"declaration-block-no-shorthand-property-overrides": null,
				"declaration-empty-line-before": null,
				"font-family-name-quotes": null,
				"font-family-no-missing-generic-family-keyword": null,
				"function-no-unknown": null,
				"function-url-quotes": null,
				"hue-degree-notation": null,
				"keyframes-name-pattern": null,
				"length-zero-no-unit": null,
				"media-feature-name-no-unknown": null,
				"media-feature-name-no-vendor-prefix": null,
				"no-descending-specificity": null, // Extremely slow
				"no-duplicate-selectors": null,
				"no-irregular-whitespace": null,
				"number-max-precision": null,
				"property-no-vendor-prefix": null,
				"rule-empty-line-before": null,
				"selector-attribute-quotes": null,
				"selector-class-pattern": null,
				"selector-id-pattern": null,
				"selector-no-vendor-prefix": null,
				"selector-not-notation": null,
				"selector-pseudo-element-colon-notation": null,
				"shorthand-property-no-redundant-values": null,
				"value-keyword-case": null,
				"value-no-vendor-prefix": null
			}
		},
		{
			files: [
				"**/*.scss"
			],
			extends: [
				"stylelint-config-standard-scss"
			],
			plugins: [
				"stylelint-order"
			],
			rules: {

				// Additional rules for replacing sass-lint
				"order/properties-alphabetical-order": true,

				// Suppress stylelint-config-standard errors
				"at-rule-empty-line-before": null,
				"declaration-block-no-redundant-longhand-properties": null,
				"hue-degree-notation": null,
				"keyframes-name-pattern": null,
				"no-descending-specificity": null, // Extremely slow
				"no-duplicate-selectors": null,
				"no-invalid-position-at-import-rule": null, // Fixable, need to run sass migrator
				"number-max-precision": null,
				"scss/at-extend-no-missing-placeholder": null,
				"scss/comment-no-empty": null,
				"scss/dollar-variable-pattern": null, // Fixable
				"scss/no-global-function-names": null, // Fixable, need to run sass migrator
				"selector-class-pattern": null,
				"selector-id-pattern": null,
				"selector-not-notation": null,
				"selector-pseudo-element-colon-notation": null,
				"shorthand-property-no-redundant-values": null,
				"value-keyword-case": null
			}
		}
	],
	ignoreFiles: [
		"**/*.min.css",
		"méli-mélo/compilation-gelé/**",
		"node_modules/**",
		"~sites/**",
		"dist/**"
	]
};
