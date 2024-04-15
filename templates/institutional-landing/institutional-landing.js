/**
 * @title Institutional landing page template detection
 * @overview Logic to detect pages that seem to be institutional landing pages without the appropriate class. This is only a temporary measure and is going to be removed at the same time as the demoted/deprecated ILP version 1.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */

// If GC-ministers, GC-institution, and Services & information are present and the page doesn't already have "page-type-ilp" class
if ( document.querySelector( ".gc-minister" ) && !document.body.classList.contains( "page-type-ilp" ) && document.querySelector( ".gc-srvinfo" ) && document.querySelector( ".list-unstyled.bold-content.mrgn-tp-lg.lst-spcd-2.colcount-md-2" ) ) {
	document.body.classList.add( "page-type-ilp" );
	console.warn( "It seems that this page is an institutional landing page. However, the <body> element is missing the \"page-type-ilp\" CSS class. It has been added for your convenience, but please make sure you follow the technical guidance: https://wet-boew.github.io/GCWeb/templates/institutional-landing/institutional-landing-doc-en.html" );
}
