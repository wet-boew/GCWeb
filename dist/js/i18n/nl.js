/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Dutch dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'nl',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'néerlandais',
		'%lang-native': 'Nederlands',
		'%all': 'Allen',
		'%home': 'Home',
		'%main-page': 'Hoofdpagina',
		'%top-of-page': 'Bovenkant pagina',
		'%you-are-in': 'U bent hier:',
		'%welcome-to': 'Welkom bij:',
		'%loading': 'het laden van ...',
		'%processing': 'verwerking ...',
		'%search': 'Zoeken',
		'%search-for-terms': 'Zoeken naar trefwoorden:',
		'%no-match-found': 'Er zijn geen resultaten gevonden voor uw zoekopdracht',
		'%matches-found': {
			'mixin': '[MIXIN] gevonden zoekresultaten'
		},
		'%menu': 'Menu',
		'%settings': 'Instellingen',
		'%languages': 'Talen',
		'%about': 'Over',
		'%current': '(actueel)',
		'%hide': 'Verbergen',
		'%error': 'Fout',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Beginnen',
		'%stop': 'Stoppen',
		'%back': 'Terug',
		'%new-window': ' (Opent in een nieuw venster)',
		'%minute-ago': 'Een minuut geleden',
		'%couple-of-minutes': 'Enkele minuten geleden',
		'%minutes-ago': {
			'mixin': '[MIXIN] minuten geleden'
		},
		'%hour-ago': 'een uur geleden',
		'%hours-ago': {
			'mixin': '[MIXIN] uren geleden'
		},
		'%days-ago': {
			'mixin': '[MIXIN] dagen geleden'
		},
		'%yesterday': 'gisteren',

		'%next': 'Volgende',
		'%previous': 'Vorige',
		'%first': 'Eerste',
		'%last': 'Laatste',

		/* Archived Web page template */
		'%archived-page': 'Deze pagina is gearchiveerd.',
		/* Menu bar */
		'%sub-menu-help': '(open het submenu via de Enter-toets en sluit het met de Escape-toets af)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Stop de tabrotatie',
			'enable': 'Start de tabrotatie'
		},
		'%tab-list': 'Lijst van tabs',
		'%tab-panel-end-1': 'Einde van het deelvenster met tabs.',
		'%tab-panel-end-2': 'Terug naar de lijst met tabs',
		'%tab-panel-end-3': 'of om met de rest van de pagina door te gaan.',
		/* Multimedia player */
		'%play': 'Afspelen',
		'%pause': 'Pauze',
		'%open': 'Openen',
		'%close': 'Afsluiten',
		'%rewind': 'Terugspoelen',
		'%fast-forward': 'Snel vooruit spoelen',
		'%mute': {
			'enable': 'Geluid uitzetten',
			'disable': 'Geluid aanzetten'
		},
		'%closed-caption': {
			'disable': 'Bijschrift verbergen',
			'enable': 'Bijschrift tonen'
		},
		'%closed-caption-error': 'Fout bij het tonen van de bijschriften',
		'%audio-description': {
			'enable': 'Audiobeschrijving activeren',
			'disable': 'Audiobeschrijving opheffen'
		},
		'%progress-bar': 'gebruik linkse en rechtse pijlen om verder te gaan of terug te keren',
		'%no-video': 'Uw browser is blijkbaar niet in staat om deze video af te spelen; gelieve de video hieronder te downloaden',
		'%position': 'Huidige positie:',
		'%percentage': 'Percentage van het afspelen:',
		'%duration': 'Totale afspeelduur:',
		'%buffered': 'Gebufferd:',
		/* Share widget */
		'%favourite': 'Favoriet',
		'%email': 'E-mail',
		'%share-text': 'Deel deze pagina met anderen',
		'%share-hint': ' met {s} ',
		'%share-email-subject': 'Interessante pagina',
		'%share-email-body': 'Misschien vindt u deze pagina interessant',
		'%share-fav-title': '(bookmark deze pagina)',
		'%share-manual': 'Gelieve dit dialoogvenster te sluiten en met Ctrl-D te bewaren',
		'%share-showall': 'Toon alles ({n})',
		'%share-showall-title': 'Alle bookmark sites',
		'%share-disclaimer' : 'Er wordt hier geen goedkeuring van producten of diensten uitgedrukt.',
		/* Form validation */
		'%form-not-submitted': 'Het formulier kon niet worden verwerkt omdat ',
		'%errors-found': ' er zijn fouten opgetreden.',
		'%error-found': ' er is een fout opgetreden.',
		/* Date picker */
		'%datepicker-hide': 'Kalender verbergen',
		'%datepicker-show': 'Kies een kalenderdatum voor het veld:',
		'%datepicker-selected': 'Geselecteerd',
		/* Calendar */
		'%calendar-weekDayNames': ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
		'%calendar-monthNames': ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
		'%calendar': 'Kalender',
		'%calendar-currentDay': '(Vandaag)',
		'%calendar-goToLink': 'Ga naar<span class="wb-invisible"> de maand of het jaar</span>',
		'%calendar-goToTitle': 'Ga naar de maand of het jaar',
		'%calendar-goToMonth': 'Maand:',
		'%calendar-goToYear': 'Jaar:',
		'%calendar-goToButton': 'Ga',
		'%calendar-cancelButton': 'Annuleren',
		'%calendar-previousMonth': 'Vorige maand: ',
		'%calendar-nextMonth': 'Volgende maand: ',
		/* Slideout */
		'%show-toc': 'Toon',
		'%show-text': 'Inhoudsopgave tonen',
		'%hide-text': 'Inhoudsopgave verbergen',
		'%table-contents': 'inhoudsopgave',
		/* Lightbox */
		'%lb-current': 'Onderdeel {current} van een totaal van {total}',
		'%lb-next': 'Volgend artikel',
		'%lb-prev': 'Vorig artikel',
		'%lb-xhr-error': 'De inhoud is niet geladen',
		'%lb-img-error': 'Het beeld is niet geladen',
		'%lb-slideshow': 'diavoorstelling',
		/* jQuery Mobile */
		'%jqm-expand': 'klik om de inhoud te tonen',
		'%jqm-collapse': 'klik om de inhoud te verbergen',
		'%jqm-clear-search': 'Zoekopdracht verwijderen',
		'%jqm-filter': 'Artikelen filteren',
		'%jqm-tbl-col-toggle': 'Kolommen ...',
		/* Charts widget */
		'%table-mention': 'Tabel',
		'%table-following': 'Grafiek. Meer details in volgende tabel',
		/* Session timeout */
		'%st-timeout-msg': 'Uw sessie is verlopen. Je hebt tot #expireTime# om de "OK" knop hieronder te activeren om uw sessie te verlengen.',
		'%st-msgbox-title': 'Sessie timeout waarschuwing',
		'%st-already-timeout-msg': 'Excuses, uw sessie is verlopen. Log opnieuw in.',
		/* Toggle details */
		'%td-toggle': 'Alles tuimelen',
		'%td-open': 'Alles uitvouwen',
		'%td-close': 'Alles invouwen',
		'%td-ttl-open': 'Alle onderdelen van de inhoud tonen',
		'%td-ttl-close': 'Alle onderdelen van de inhoud verbergen',
		/* Table enhancement */
		'%sSortAscending': ': activeren voor oplopende sortering',
		'%sSortDescending': ': activeren voor aflopende sortering',
		'%sEmptyTable': 'Geen gegevens beschikbaar in de tabel',
		'%sInfo': 'Toon _START_ tot _END_ van _TOTAL_ lemma\'s',
		'%sInfoEmpty': 'Toon 0 tot 0 van 0 lemma\'s',
		'%sInfoFiltered': '(gefilterd uit _MAX_ totaal aantal lemma\'s)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Toon _MENU_ lemma\'s',
		/* Geomap */
		'%geo-mapcontrol': 'Kaart controle',
		'%geo-zoomin': 'Inzoomen',
		'%geo-zoomout': 'Uitzoomen',
		'%geo-zoomworld': 'Zoomen naar kaartgrootte',
		'%geo-zoomfeature': 'Zoomen naar onderdeel',
		'%geo-scaleline': 'kaartschaal',
		'%geo-mouseposition': 'Lengte-en breedtegraad van de muiscursor',
		'%geo-ariamap': 'Kaart object. De beschrijvingen van de kaart functies staan in de onderstaande tabel.',
		'%geo-accessibilize': '<strong>Keyboard gebruikers:</strong> Als de kaart is scherpgesteld, gebruikt u de pijltoetsen om de kaart en de plus en min toetsen om in te zoomen pannen. De pijltoetsen functioneren niet als schuiftoetsen bij maximale kaartgrootte.',
		'%geo-accessibilizetitle': 'Instructies: Kaartnavigatie',
		'%geo-togglelayer': 'Tuimel de weergave van de laag',
		'%geo-hiddenlayer': 'Deze laag is momenteel verborgen.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Canada basiskaart (Engels of Frans)',
		'%geo-select': 'Selecteren',
		'%geo-labelselect': 'Vink het element aan om het op de kaart te selecteren',
		/* Disable/enable PE */
		'%pe-disable': 'Versie in basis-HTML',
		'%pe-enable': 'Standaardversie'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: NL (Dutch; Nederlands, Vlaams)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Dit is een verplicht veld.",
		remote: "Controleer dit veld.",
		email: "Vul hier een geldig e-mailadres in.",
		url: "Vul hier een geldige URL in.",
		date: "Vul hier een geldige datum in.",
		dateISO: "Vul hier een geldige datum in (ISO-formaat).",
		number: "Vul hier een geldig getal in.",
		digits: "Vul hier alleen getallen in.",
		creditcard: "Vul hier een geldig creditcardnummer in.",
		equalTo: "Vul hier dezelfde waarde in.",
		accept: "Vul hier een waarde in met een geldige extensie.",
		maxlength: $.validator.format("Vul hier maximaal {0} tekens in."),
		minlength: $.validator.format("Vul hier minimaal {0} tekens in."),
		rangelength: $.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1} tekens."),
		range: $.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1}."),
		max: $.validator.format("Vul hier een waarde in kleiner dan of gelijk aan {0}."),
		min: $.validator.format("Vul hier een waarde in groter dan of gelijk aan {0}."),

		// for validations in additional-methods.js
		iban: "Vul hier een geldig IBAN in.",
		dateNL: "Vul hier een geldige datum in.",
		phoneNL: "Vul hier een geldig Nederlands telefoonnummer in.",
		mobileNL: "Vul hier een geldig Nederlands mobiel telefoonnummer in.",
		postalcodeNL: "Vul hier een geldige postcode in.",
		bankaccountNL: "Vul hier een geldig bankrekeningnummer in.",
		giroaccountNL: "Vul hier een geldig gironummer in.",
		bankorgiroaccountNL: "Vul hier een geldig bank- of gironummer in."
	});
}(jQuery));/*
 * Localized default methods for the jQuery validation plugin.
 * Locale: NL
 */
jQuery.extend(jQuery.validator.methods, {
	date: function(value, element) {
		return this.optional(element) || /^\d\d?[\.\/\-]\d\d?[\.\/\-]\d\d\d?\d?$/.test(value);
	}
});