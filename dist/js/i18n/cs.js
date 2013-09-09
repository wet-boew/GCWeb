/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Czech dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'cs',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'tchèque',
		'%lang-native': 'Čeština',
		'%all': 'Vše',
		'%home': 'Domácí',
		'%main-page': 'Hlavní stránka',
		'%top-of-page': 'Na začátek stránky',
		'%you-are-in': 'Nyní se nacházíte v:',
		'%welcome-to': 'Vítejte:',
		'%loading': 'nakládání ...',
		'%processing': 'zpracování ...',
		'%search': 'Hledat',
		'%search-for-terms': 'Hledat podmínek:',
		'%no-match-found': 'No nalezena shoda',
		'%matches-found': {
			'mixin': '[MIXIN] zápasů nenalezen'
		},
		'%menu': 'Menu',
		'%settings': 'Nastavení',
		'%languages': 'Jazyky',
		'%about': 'O',
		'%current': '(aktuální)',
		'%hide': 'Schovat',
		'%error': 'Chyba',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Zahájit',
		'%stop': 'Zastavit',
		'%back': 'Zpátky',
		'%new-window': ' (Otevře se v novém okně)',
		'%minute-ago': 'minutou',
		'%couple-of-minutes': 'pár minut před',
		'%minutes-ago': {
			'mixin': 'před [MIXIN] minutami'
		},
		'%hour-ago': 'před hodinou',
		'%hours-ago': {
			'mixin': 'před [MIXIN] hodinami'
		},
		'%days-ago': {
			'mixin': 'před [MIXIN] dny'
		},
		'%yesterday': 'včera',

		'%next': 'Další',
		'%previous': 'Předchozí',
		'%first': 'První',
		'%last': 'Poslední',

		/* Archived Web page template */
		'%archived-page': 'Tato webová stránka byla archivována na webu.',
		/* Menu bar */
		'%sub-menu-help': '(otevřít podnabídku s enter a zavírají s klávesy ESC)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Zastavit kartě otáčení',
			'enable': 'Zahájit kartě otáčení'
		},
		'%tab-list': 'Seznam kartě',
		'%tab-panel-end-1': 'Konec této kartě panelu.',
		'%tab-panel-end-2': 'Návrat na kartu seznamu',
		'%tab-panel-end-3': 'nebo pokračovat až do konce stránky.',
		/* Multimedia player */
		'%play': 'Hrát',
		'%pause': 'Pauza',
		'%open': 'Otevřít',
		'%close': 'Zavřít',
		'%rewind': 'Převinout zpět',
		'%fast-forward': 'Rychlý posun vpřed',
		'%mute': {
			'enable': 'Vypnutí',
			'disable': 'Nahlas'
		},
		'%closed-caption': {
			'disable': 'Skrýt Skryté titulky',
			'enable': 'Zobrazit Skryté titulky'
		},
		'%closed-caption-error': 'Chyba při načítání uzavřené titulky',
		'%audio-description': {
			'enable': 'Povolit zvukový popis',
			'disable': 'Zakázat zvukový popis'
		},
		'%progress-bar': 'použijte šipka vlevo a pravé šipky k podpoře a vzad pokrok sdělovacích prostředků',
		'%no-video': 'Váš prohlížeč nepodporuje Zdá se, že se schopnosti přehrání tohoto videa, stáhněte si video níže',
		'%position': 'Aktuální pozice:',
		'%percentage': 'Přehrávání úspěšnost:',
		'%duration': 'Celkový čas:',
		'%buffered': 'Pufrovaný:',
		/* Share widget */
		'%favourite': 'Oblíbené',
		'%email': 'Emailová',
		'%share-text': 'Sdílet tuto stránku',
		'%share-hint': ' s {s} ',
		'%share-email-subject': 'Zajímavá stránka',
		'%share-email-body': 'Myslel jsem, že byste mohli najít na tuto stránku zajímavé:\n{t} ({u})',
		'%share-fav-title': '(oblíbené stránky)',
		'%share-manual': 'Prosím, zavřete tento dialog a stiskněte Ctrl-D na záložku této stránky.',
		'%share-showall': 'Zobrazit všechny ({n})',
		'%share-showall-title': 'Všechny bookmarking stránky',
		'%share-disclaimer' : 'Č. schválení jakýchkoli výrobků nebo služeb je vyjádřené nebo předpokládané.',
		/* Form validation */
		'%form-not-submitted': 'Formulář nelze předloženy, protože ',
		'%errors-found': ' chyby byly nalezeny.',
		'%error-found': ' chyba byla nalezena.',
		/* Date picker */
		'%datepicker-hide': 'Skrýt kalendář',
		'%datepicker-show': 'Vyberte datum z kalendáře pro pole:',
		'%datepicker-selected': 'Vybraný',
		/* Calendar */
		'%calendar-weekDayNames': ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'],
		'%calendar-monthNames': ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
		'%calendar': 'Kalendář',
		'%calendar-currentDay': '(Aktuální den)',
		'%calendar-goToLink': 'Přejít na<span class="wb-invisible"> měsíc roku</span>',
		'%calendar-goToTitle': 'Přejít na měsíc roku',
		'%calendar-goToMonth': 'Měsíc:',
		'%calendar-goToYear': 'Rok:',
		'%calendar-goToButton': 'Jít',
		'%calendar-cancelButton': 'Zrušit',
		'%calendar-previousMonth': 'Předchozí měsíc: ',
		'%calendar-nextMonth': 'Příští měsíc: ',
		/* Slideout */
		'%show-toc': 'Ukázat',
		'%show-text': 'Zobrazit obsah',
		'%hide-text': 'Skrýt obsah',
		'%table-contents': 'obsah',
		/* Lightbox */
		'%lb-current': 'Bod {current} {total}',
		'%lb-next': 'Další položka',
		'%lb-prev': 'Předchozí položka',
		'%lb-xhr-error': 'Tento obsah se nepodařilo načíst.',
		'%lb-img-error': 'Tento obrázek se nepodařilo načíst.',
		'%lb-slideshow': 'prezentaci',
		/* jQuery Mobile */
		'%jqm-expand': 'klepnutím rozbalte obsah',
		'%jqm-collapse': 'klikněte pro sbalení obsah',
		'%jqm-clear-search': 'jasné vyhledávání',
		'%jqm-filter': 'Filtrování položek',
		'%jqm-tbl-col-toggle': 'Sloupce ...',
		/* Charts widget */
		'%table-mention': 'Tabulka',
		'%table-following': 'Graf. Podrobnosti v následující tabulce.',
		/* Session timeout */
		'%st-timeout-msg': 'Vaše relace je brzy vyprší. Budete mít až do #expireTime# pro aktivaci "OK" tlačítko níže rozšířit relaci.',
		'%st-msgbox-title': 'Upozornění session timeout',
		'%st-already-timeout-msg': 'Je nám líto, váš relace již vypršela. Prosím, přihlaste se znovu.',
		/* Toggle details */
		'%td-toggle': 'Přepnout všechny',
		'%td-open': 'Rozbalit všechny záložky',
		'%td-close': 'Sbalit vše',
		'%td-ttl-open': 'Rozbalit všechny části obsahu',
		'%td-ttl-close': 'Minimalizovat všechny části obsahu',
		/* Table enhancement */
		'%sSortAscending': ': aktivuje na vzestupně seřadit',
		'%sSortDescending': ': aktivujte pro sestupné řazení',
		'%sEmptyTable': 'K dispozici žádné údaje v tabulce',
		'%sInfo': 'Zobrazeno _START_-_END_ z _TOTAL_ položek',
		'%sInfoEmpty': 'Zobrazeno 0-0 z 0 položek',
		'%sInfoFiltered': '(filtrována z _MAX_ celkem záznamů)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Zobrazit _MENU_ položek',
		/* Geomap */
		'%geo-mapcontrol': 'Mapa ovládání',
		'%geo-zoomin': 'Přiblížit',
		'%geo-zoomout': 'Oddálit',
		'%geo-zoomworld': 'Přiblížit zmapovat rozsah',
		'%geo-zoomfeature': 'Přiblížit prvku',
		'%geo-scaleline': 'měřítko mapy',
		'%geo-mouseposition': 'Zeměpisná šířka a zeměpisná délka kurzoru myši',
		'%geo-ariamap': 'Mapa objekt. Popisy v mapě funkcí jsou uvedeny v tabulce níže.',
		'%geo-accessibilize': '<strong>Klávesové uživatelé:</strong> Pokud je mapa v centru pozornosti, pomocí kláves se šipkami posouvat mapu a plus a mínus pro přiblížení. Kláves se šipkami nebude posouvání mapy při zvětšení na mapu rozsahu.',
		'%geo-accessibilizetitle': 'Návod: Mapa navigace',
		'%geo-togglelayer': 'Přepnout zobrazení vrstvy',
		'%geo-hiddenlayer': 'Tato vrstva je v současné době skrývá.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanada základní mapa (pouze anglicky nebo francouzsky)',
		'%geo-select': 'Vybrat',
		'%geo-labelselect': 'Zkontrolujte, vyberte prvek na mapě',
		/* Disable/enable PE */
		'%pe-disable': 'Základní HTML verze',
		'%pe-enable': 'Standardní verze'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: CS (Czech; čeština, český jazyk)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Tento údaj je povinný.",
		remote: "Prosím, opravte tento údaj.",
		email: "Prosím, zadejte platný e-mail.",
		url: "Prosím, zadejte platné URL.",
		date: "Prosím, zadejte platné datum.",
		dateISO: "Prosím, zadejte platné datum (ISO).",
		number: "Prosím, zadejte číslo.",
		digits: "Prosím, zadávejte pouze číslice.",
		creditcard: "Prosím, zadejte číslo kreditní karty.",
		equalTo: "Prosím, zadejte znovu stejnou hodnotu.",
		accept: "Prosím, zadejte soubor se správnou příponou.",
		maxlength: $.validator.format("Prosím, zadejte nejvíce {0} znaků."),
		minlength: $.validator.format("Prosím, zadejte nejméně {0} znaků."),
		rangelength: $.validator.format("Prosím, zadejte od {0} do {1} znaků."),
		range: $.validator.format("Prosím, zadejte hodnotu od {0} do {1}."),
		max: $.validator.format("Prosím, zadejte hodnotu menší nebo rovnu {0}."),
		min: $.validator.format("Prosím, zadejte hodnotu větší nebo rovnu {0}.")
	});
}(jQuery));