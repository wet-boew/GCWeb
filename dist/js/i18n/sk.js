/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Slovak dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'sk',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'slovaque',
		'%lang-native': 'Slovenčina',
		'%all': 'Všetko',
		'%home': 'Domáce',
		'%main-page': 'Hlavná stránka',
		'%top-of-page': 'Na začiatok stránky',
		'%you-are-in': 'Teraz sa nachádzate v:',
		'%welcome-to': 'Vitajte:',
		'%loading': 'nakladanie ...',
		'%processing': 'spracovanie ...',
		'%search': 'Hľadať',
		'%search-for-terms': 'Hľadať podmienok:',
		'%no-match-found': 'No nájdená zhoda',
		'%matches-found': {
			'mixin': '[MIXIN] zápasov nenájdený'
		},
		'%menu': 'Menu',
		'%settings': 'Nastavenie',
		'%languages': 'Jazyky',
		'%about': 'O',
		'%current': '(aktuálne)',
		'%hide': 'Schovať',
		'%error': 'Chyba',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Začať',
		'%stop': 'Stop',
		'%back': 'Staré',
		'%new-window': ' (Otvorí sa v novom okne)',
		'%minute-ago': 'minútou',
		'%couple-of-minutes': 'pár minút pred',
		'%minutes-ago': {
			'mixin': 'pred [MIXIN] minútami'
		},
		'%hour-ago': 'pred hodinou',
		'%hours-ago': {
			'mixin': 'pred [MIXIN] hodinami'
		},
		'%days-ago': {
			'mixin': 'pred [MIXIN] dňami'
		},
		'%yesterday': 'včera',

		'%next': 'Ďalšie',
		'%previous': 'Predchádzajúci',
		'%first': 'Prvé',
		'%last': 'Posledný',

		/* Archived Web page template */
		'%archived-page': 'Táto webová stránka bola archivovaná na webe.',
		/* Menu bar */
		'%sub-menu-help': '(otvoriť podponuku s enter a zatvárajú s klávesy ESC)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Zastaviť kartu otáčania',
			'enable': 'Dátum kartu otáčania'
		},
		'%tab-list': 'Tab Zoznam',
		'%tab-panel-end-1': 'Koniec tejto záložke paneli.',
		'%tab-panel-end-2': 'Návrat na kartu zoznamu',
		'%tab-panel-end-3': 'alebo pokračovať až do konca stránky.',
		/* Multimedia player */
		'%play': 'Hrať',
		'%pause': 'Pauza',
		'%open': 'Otvoriť',
		'%close': 'Zavrieť',
		'%rewind': 'Pretočiť',
		'%fast-forward': 'Rýchly posun vpred',
		'%mute': {
			'enable': 'Vypnutie',
			'disable': 'Nahlas'
		},
		'%closed-caption': {
			'disable': 'Skryť Skryté titulky',
			'enable': 'Zobraziť Skryté titulky'
		},
		'%closed-caption-error': 'Chyba pri načítaní uzavreté titulkami',
		'%audio-description': {
			'enable': 'Povoliť zvukový opis',
			'disable': 'Zakázať zvukový opis'
		},
		'%progress-bar': 'použite ľavej a pravej šípky na podporu a vzad pokrok médií',
		'%no-video': 'Váš prehliadač nepodporuje Zdá sa, že sa schopnosti prehranie tohto videa, stiahnite si video nižšie.',
		'%position': 'Aktuálna pozícia:',
		'%percentage': 'Prehrávanie úspešnosť:',
		'%duration': 'Celkový čas:',
		'%buffered': 'Pufrovaný:',
		/* Share widget */
		'%favourite': 'Obľúbené',
		'%email': 'E-mail',
		'%share-text': 'Zdieľať túto stránku',
		'%share-hint': ' s {s} ',
		'%share-email-subject': 'Zaujímavá stránka',
		'%share-email-body': 'Myslel som, že by ste mohli nájsť na túto stránku zaujímavé:\n{t} ({u})',
		'%share-fav-title': '(obľúbené stránky)',
		'%share-manual': 'Prosím, zatvorte tento dialóg a stlačte Ctrl-D na záložku tejto stránky.',
		'%share-showall': 'Zobraziť všetky ({n})',
		'%share-showall-title': 'Všetky bookmarking stránky',
		'%share-disclaimer' : 'Č schválenie akýchkoľvek výrobkov alebo služieb je vyjadrené alebo predpokladané.',
		/* Form validation */
		'%form-not-submitted': 'Formulár nemožno predložené, pretože ',
		'%errors-found': ' chyby boli nájdené.',
		'%error-found': ' chyba bola nájdená.',
		/* Date picker */
		'%datepicker-hide': 'Skryť kalendár',
		'%datepicker-show': 'Vyberte dátum z kalendára pre pole',
		'%datepicker-selected': 'Vybraný',
		/* Calendar */
		'%calendar-weekDayNames': ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],
		'%calendar-monthNames': ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'Septembra', 'Október', 'November', 'December'],
		'%calendar': 'Kalendár',
		'%calendar-currentDay': '(Aktuálny deň)',
		'%calendar-goToLink': 'Prejsť na<span class="wb-invisible">  mesiac roka</span>',
		'%calendar-goToTitle': 'Prejsť na mesiac roka',
		'%calendar-goToMonth': 'Mesiac:',
		'%calendar-goToYear': 'Rok:',
		'%calendar-goToButton': 'Ísť',
		'%calendar-cancelButton': 'Zrušiť',
		'%calendar-previousMonth': 'Predchádzajúci mesiac: ',
		'%calendar-nextMonth': 'Budúci mesiac: ',
		/* Slideout */
		'%show-toc': 'Ukázať',
		'%show-text': 'Zobraziť obsah',
		'%hide-text': 'Skryť obsah',
		'%table-contents': 'obsah',
		/* Lightbox */
		'%lb-current': 'Bod {current} {total}',
		'%lb-next': 'Ďalšie položka',
		'%lb-prev': 'Predchádzajúci položka',
		'%lb-xhr-error': 'Tento obsah sa nepodarilo načítať.',
		'%lb-img-error': 'Tento obrázok sa nepodarilo načítať.',
		'%lb-slideshow': 'slideshow',
		/* jQuery Mobile */
		'%jqm-expand': 'kliknutím rozbaľte obsah',
		'%jqm-collapse': 'kliknite pre zbalenie obsah',
		'%jqm-clear-search': 'jasné vyhľadávania',
		'%jqm-filter': 'Filtrovanie položiek',
		'%jqm-tbl-col-toggle': 'Stĺpce ...',
		/* Charts widget */
		'%table-mention': 'Tabuľka',
		'%table-following': 'Graf. Podrobnosti v nasledujúcej tabuľke.',
		/* Session timeout */
		'%st-timeout-msg': 'Vaša relácia je čoskoro vyprší. Budete mať až do #expireTime# pre aktiváciu "OK" tlačidlo nižšie rozšíriť relácii.',
		'%st-msgbox-title': 'Session timeout varovanie',
		'%st-already-timeout-msg': 'Je nám ľúto, váš relácie už vypršala. Prosím, prihláste sa znova.',
		/* Toggle details */
		'%td-toggle': 'Prepnúť všetky',
		'%td-open': 'Rozbaliť všetko',
		'%td-close': 'Zbaliť všetko',
		'%td-ttl-open': 'Rozbaliť všetky časti obsahu',
		'%td-ttl-close': 'Minimalizovať všetky časti obsahu',
		/* Table enhancement */
		'%sSortAscending': ': aktivuje na vzostupne zoradiť',
		'%sSortDescending': ': aktivujte pre zostupné radenie',
		'%sEmptyTable': 'K dispozícii žiadne údaje v tabuľke',
		'%sInfo': 'Zobrazené _START_-_END_ z _TOTAL_ položiek',
		'%sInfoEmpty': 'Zobrazené 0-0 z 0 položiek',
		'%sInfoFiltered': '(filtrovaná z _MAX_ celkom záznamov)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Zobraziť _MENU_ položiek',
		/* Geomap */
		'%geo-mapcontrol': 'Mapa ovládanie',
		'%geo-zoomin': 'Priblížiť',
		'%geo-zoomout': 'Vzdialiť',
		'%geo-zoomworld': 'Priblížiť zmapovať rozsah',
		'%geo-zoomfeature': 'Priblížiť prvku',
		'%geo-scaleline': 'Mierka mapy',
		'%geo-mouseposition': 'Zemepisná šírka a zemepisná dĺžka kurzoru myši',
		'%geo-ariamap': 'Mapa objekt. Popisy v mape funkcií sú uvedené v tabuľke nižšie.',
		'%geo-accessibilize': '<strong>Klávesové užívatelia:</strong> Ak je mapa v centre pozornosti, pomocou klávesov so šípkami posúvať mapu a plus a mínus pre priblíženie. Klávesov so šípkami nebude posúvanie mapy pri zväčšení na mapu rozsahu.',
		'%geo-accessibilizetitle': 'Návod: Mapa navigácie',
		'%geo-togglelayer': 'Prepnúť zobrazenie vrstvy',
		'%geo-hiddenlayer': 'Táto vrstva je v súčasnej dobe skrýva!',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanada základná mapa (len po anglicky alebo francúzsky)',
		'%geo-select': 'Vybrať',
		'%geo-labelselect': 'Skontrolujte, vyberte prvok na mape',
		/* Disable/enable PE */
		'%pe-disable': 'Základné HTML verzia',
		'%pe-enable': 'Štandardná verzia'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: SK (Slovak; slovenčina, slovenský jazyk)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Povinné zadať.",
		maxlength: $.validator.format("Maximálne {0} znakov."),
		minlength: $.validator.format("Minimálne {0} znakov."),
		rangelength: $.validator.format("Minimálne {0} a Maximálne {0} znakov."),
		email: "E-mailová adresa musí byť platná.",
		url: "URL musí byť platný.",
		date: "Musí byť dátum.",
		number: "Musí byť číslo.",
		digits: "Môže obsahovať iba číslice.",
		equalTo: "Dva hodnoty sa musia rovnať.",
		range: $.validator.format("Musí byť medzi {0} a {1}."),
		max: $.validator.format("Nemôže byť viac ako{0}."),
		min: $.validator.format("Nemôže byť menej ako{0}."),
		creditcard: "Číslo platobnej karty musí byť platné."
	});
}(jQuery));