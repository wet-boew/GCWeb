/**
 * @title News template
 * @overview Logic to detect version 4.0 of the news template and make the changes for version 4.0.1
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @garneauma
 */

// If in the news page and still in version 4.0, make necessary changes for 4.0.1
if ( document.querySelector( ".nws-tbl" ) && document.querySelector( "details summary h2.h4" ) ) {
	let fltrNewsTitle = document.querySelector( "details summary h2.h4" ),
		newsTable = document.querySelector( ".nws-tbl" ),
		newsTableConfig = newsTable.getAttribute( "data-wb-tables" );

	fltrNewsTitle.classList.remove( "h4" );
	fltrNewsTitle.classList.add( "h6" );

	newsTable.setAttribute( "data-wb-tables", newsTableConfig.replace( "nws-tbl-ttl h4", "nws-tbl-ttl h6" ) );
}
