import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const compat = new FlatCompat( {
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
} );

export default defineConfig( [ globalIgnores( [
	"**/node_modules/",
	"**/dist/",
	"**/*.min.js",
	"méli-mélo/compilation-gelé/",
	"méli-mélo/deprecated/",
	"**/méli-mélo-demos/",
	"**/_wetboew-demos/",
	"**/~jekyll-dist/",
	"components/wb-chtwzrd/chatwizard.js",
	"méli-mélo/2023-09-menu/campaign-menu.js",
	"méli-mélo/2023-10-clipboard/js/clipboard.js",
	"méli-mélo/2024-02-charts/js/charts.js",
	"méli-mélo/2024-10-datatable-utilities/js/wb-pspc-datatable-utility.js"
] ), {
	extends: compat.extends( "eslint:recommended", "jquery" ),

	languageOptions: {
		globals: {
			...globals.browser,
			...globals.jquery,
			wb: true,
			Modernizr: true,
			yepnope: true,
			JSON: true
		}
	},

	rules: {
		indent: [ "error", "tab", {
			outerIIFEBody: 0,
			SwitchCase: 1
		} ],

		eqeqeq: [ 2, "allow-null" ],
		"no-eq-null": 2,

		"no-unused-expressions": [ 2, {
			allowTernary: true
		} ],

		"wrap-iife": [ 2, "any" ],

		"no-unused-vars": [ 2, {
			"caughtErrors": "none", // changed default in v9. Can be fixed
			varsIgnorePattern: "wet_boew_"
		} ],

		camelcase: 0,
		"max-len": [ 2, 500 ],
		"no-irregular-whitespace": 2,
		"no-nested-ternary": 0,
		"linebreak-style": 0
	}
}, {
	files: [ "stylelint.config.js", "eslint.config.mjs" ],

	languageOptions: {
		ecmaVersion: "latest",
		globals: {
			...globals.node
		}
	}
} ] );
