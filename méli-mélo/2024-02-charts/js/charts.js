/**
 * @title WET-BOEW Charts plugin
 * @overview Charts plugin based on Charts.js version 4.4.1
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author garneauma
 */
( function( $, window, wb ) {
"use strict";
/*
	* Variable and function definitions.
	* These are global to the plugin - meaning that they will be initialized once per page,
	* not once per instance of plugin on the page. So, this is a good place to define
	* variables that are common to all instances of the plugin on a page.
	*/
var componentName = "chart",
	selector = "[data-chart]",
	initEvent = "wb-init" + selector,
	$document = wb.doc,

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {
		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector );

		if ( elm ) {
			var chart,
				tableObserver,
				elmChartType, supportedChartTypes, defaults,
				chartType, chartOpts, chartData,
				chartCntnr, canvasElm, tableContainer,
				i18n, i18nText,
				detailsOpen = "";

			// Define default options
			defaults = {
				events: [ "mousemove", "mouseout", "touchmove" ]
			}

			// Store options defined in element
			elmChartType = elm.dataset.chart

			// Define supported chart types
			supportedChartTypes = [ "bar", "line", "doughnut", "pie", "polarArea", "radar" ]

			// Check if the chart type defined is supported
			if ( !supportedChartTypes.includes( elmChartType ) ) {
				console.error( componentName + ": The chart type \"" + elmChartType + "\" is not supported." );
				return false;
			}

			// Only initialize the i18nText once
			if ( !i18nText ) {
				i18n = wb.i18n;
				i18nText = {
					tableMention: i18n( "hyphen" ) + i18n( "tbl-txt" ),
					tableFollowing: wb.lang == "en" ? " - Chart. Details of the data displayed in this chart can be found in the following table." : " - Graphique. Les détails des données affichées dans ce graphique peuvent être trouvés dans le tableau suivant."
				};
			}

			// Check if <details> element should be open or closed
			if ( elm.dataset.chartDetailsOpen ) {
				detailsOpen = "open";
			}

			// Creating UI template
			chartCntnr = document.createElement( "figure" );
			chartCntnr.innerHTML = `<figcaption class="h3">` + elm.caption.innerHTML + `</figcaption>
				<div><canvas aria-label="` + elm.caption.innerHTML + i18nText.tableFollowing + `" role="img"></canvas></div>
				<details class="mrgn-tp-md"`+ detailsOpen +`>
					<summary>` + elm.caption.innerHTML + i18nText.tableMention + `</summary>
					<div class="table-responsive"></div>
				</details>`;
			elm.parentNode.insertBefore( chartCntnr, elm );
			canvasElm = chartCntnr.querySelector( "canvas" );
			tableContainer = chartCntnr.querySelector( ".table-responsive" );
			tableContainer.appendChild( elm );

			// Set Chart options
			chartType = elm.dataset.chart;
			chartOpts = elm.dataset.chartOptions ? { ...defaults, ...JSON.parse( elm.dataset.chartOptions ) } : defaults;
			chartData = elm.dataset.chartData ? JSON.parse( elm.dataset.chartData ) : generateData( elm );

			// Create the Chart
			chart = new Chart( canvasElm, {
				type: chartType,
				data: chartData,
				options: chartOpts
			} );

			// Create MutationObserver to update graph whenever the table is updated
			tableObserver = new MutationObserver( function() {
				chart.data = elm.dataset.chartData ? JSON.parse( elm.dataset.chartData ) : generateData( elm );
				chart.options = elm.dataset.chartOptions ? { ...defaults, ...JSON.parse( elm.dataset.chartOptions ) } : defaults;
				chart.update();
			} );

			tableObserver.observe( elm, { attributes: true, subtree: true, childList: true } );

			// Identify that initialization has completed
			wb.ready( $( elm ), componentName );
		}
	},

	generateData = function( element ) {
		let labels = [],
			datasets = [],
			dataObj = {},
			columnIdx,
			hasRowHeading = false,
			tableHead = element.tHead.rows[ 0 ].cells,
			tableRows = element.tBodies[ 0 ].rows;

		// If the <table> has a TH element as the first element, populate labels
		if ( tableRows[ 0 ].cells[ 0 ].nodeName == "TH" ) {
			for ( let i = 0; i < tableRows.length; i++ ) {
				let tableRowHeading = tableRows[ i ].cells[ 0 ];

				if ( tableRowHeading.dataset.chartValue ) {
					labels.push( tableRowHeading.dataset.chartValue );
				} else {
					labels.push( tableRowHeading.textContent );
				}
			}

			dataObj.labels = labels;
			hasRowHeading = true;
		}

		// Populate datasets
		hasRowHeading ? columnIdx = 1 : columnIdx = 0;
		for ( columnIdx; columnIdx < tableHead.length; columnIdx++ ) {
			if ( !tableHead[ columnIdx ].dataset.chartSetIgnore == true ) {
				let datasetObj = { label: "", data: [] },
					datasetOpts = tableHead[ columnIdx ].dataset.chartSetOptions;

				datasetObj.label = tableHead[ columnIdx ].textContent;

				for ( let i = 0; i < tableRows.length; i++ ) {
					let datasetDataElm = tableRows[ i ].cells[ columnIdx ];

					if ( datasetDataElm.dataset.chartValue ) {
						datasetObj.data.push( datasetDataElm.dataset.chartValue );
					} else {
						let cellValue = datasetDataElm.textContent

						cellValue = parseFloat( cellValue.replace( /[^0-9]*([\d]+(?:[ ,.]?\d+)*)?(?:[.,](\d{1,2}))?[^0-9]*/, function( a, b, c ) {
							return b.replace( / |,/g, "" ) + "." + c || "0";
						} ), 10 );

						datasetObj.data.push( cellValue );
					}
				}

				// Add dataset options to dataset object
				if ( datasetOpts ) {
					datasetOpts = JSON.parse( datasetOpts );
					datasetObj = { ...datasetObj, ...datasetOpts };
				}

				datasets.push( datasetObj );
			}
		}
		dataObj.datasets = datasets;

		return dataObj;
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector, init );
// Add the timer poke to initialize the plugin
wb.add( selector );
} )( jQuery, window, wb );
