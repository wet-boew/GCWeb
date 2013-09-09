/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Hungarian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'hu',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'hongrois',
		'%lang-native': 'Magyar',
		'%all': 'Mind',
		'%home': 'Honlap',
		'%main-page': 'Főoldal',
		'%top-of-page': 'Oldal teteje',
		'%you-are-in': 'Ön itt van:',
		'%welcome-to': 'Üdvözöljük',
		'%loading': 'betöltése ...',
		'%processing': 'feldolgozás ...',
		'%search': 'Keresés',
		'%search-for-terms': 'Keresett kifejezés:',
		'%no-match-found': 'Nincs találat',
		'%matches-found': {
			'mixin': '[MIXIN] találat'
		},
		'%menu': 'Menü',
		'%settings': 'Beállítások',
		'%languages': 'Nyelvek',
		'%about': 'Erről',
		'%current': '(jelenlegi)',
		'%hide': 'Elrejtés',
		'%error': 'Hiba',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Indítás',
		'%stop': 'Leállítás',
		'%back': 'Vissza',
		'%new-window': ' (Megnyitás új ablakban)',
		'%minute-ago': 'egy perce',
		'%couple-of-minutes': 'pár perce',
		'%minutes-ago': {
			'mixin': '[MIXIN] perccel ezelőtt'
		},
		'%hour-ago': 'egy órával ezelőtt',
		'%hours-ago': {
			'mixin': '[MIXIN] órával ezelőtt'
		},
		'%days-ago': {
			'mixin': '[MIXIN] nappal ezelőtt'
		},
		'%yesterday': 'tegnap',

		'%next': 'Következő',
		'%previous': 'Előző',
		'%first': 'Első',
		'%last': 'Utolsó',

		/* Archived Web page template */
		'%archived-page': 'Ezt az oldalt az interneten archiváltuk.',
		/* Menu bar */
		'%sub-menu-help': '(Az almenüt az enter billentyűvel tudja lenyitni, és az escape billentyűvel bezárni.)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Tabulálás engedélyezése',
			'enable': 'Tabulálás kikapcsolása'
		},
		'%tab-list': 'Lap listája',
		'%tab-panel-end-1': 'Vége a lap panel.',
		'%tab-panel-end-2': 'Vissza a lap listája',
		'%tab-panel-end-3': 'vagy továbbra is a többi oldalon.',
		/* Multimedia player */
		'%play': 'Lejátszás',
		'%pause': 'Pillanatmegállító',
		'%open': 'Nyitva',
		'%close': 'Bezárás',
		'%rewind': 'Vissza',
		'%fast-forward': 'Előre',
		'%mute': {
			'enable': 'Lenémítás',
			'disable': 'Hang bekapcsolása'
		},
		'%closed-caption': {
			'disable': 'Feliratok kikapcsolása',
			'enable': 'Feliratozás bekapcsolása'
		},
		'%closed-caption-error': 'Hiba a felirat betöltése közben',
		'%audio-description': {
			'enable': 'Narráció bekapcsolása',
			'disable': 'Narráció kikapcsolása'
		},
		'%progress-bar': 'a jobb vagy a bal nyíllal tud előre vagy hátra lépni a lejátszásban',
		'%no-video': 'Az ön böngészője valószínűleg nem alkalmas a lejátszásra. Kérem, töltse le a videót itt:',
		'%position': 'Jelenlegi pozíció:',
		'%percentage': 'Lejátszás százalék:',
		'%duration': 'Összidő:',
		'%buffered': 'Pufferelt:',
		/* Share widget */
		'%favourite': 'Kedvencek',
		'%email': 'Email',
		'%share-text': 'Oldal megosztása',
		'%share-hint': ' a {s} ',
		'%share-email-subject': 'Érdekes oldal',
		'%share-email-body': 'Arra gondoltam, ez az oldal érdekes lehet az ön számára:\n{t} ({u})',
		'%share-fav-title': '(könyvjelzőt ezt az oldalt)',
		'%share-manual': 'Kérem, zárja be ezt az ablakot és a könyvjelzőhöz nyomja meg a Ctrl+D-t.',
		'%share-showall': 'Mutassa mindet - Mutassa mind a {n}-t',
		'%share-showall-title': 'Az összes könyvjelzős oldal',
		'%share-disclaimer' : 'I jóváhagyását olyan termékek vagy szolgáltatások kifejezett vagy hallgatólagos.',
		/* Form validation */
		'%form-not-submitted': 'Az adatokat nem lehet elküldeni mert ',
		'%errors-found': ' hibák léptek fel.',
		'%error-found': ' hiba lépett fel.',
		/* Date picker */
		'%datepicker-hide': 'A naptár elrejtése',
		'%datepicker-show': 'Válasszon egy dátumot a naptárból:',
		'%datepicker-selected': 'Kijelölt',
		/* Calendar */
		'%calendar-weekDayNames': ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		'%calendar-monthNames': ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
		'%calendar': 'Naptár',
		'%calendar-currentDay': '(Mai nap)',
		'%calendar-goToLink': 'Ugrás<span class="wb-invisible"> erre a hónapra</span>',
		'%calendar-goToTitle': 'Ugrás erre a hónapra',
		'%calendar-goToMonth': 'Hónap:',
		'%calendar-goToYear': 'Év:',
		'%calendar-goToButton': 'Indít',
		'%calendar-cancelButton': 'Mégsem',
		'%calendar-previousMonth': 'Előző hónap: ',
		'%calendar-nextMonth': 'Következő hónap: ',
		/* Slideout */
		'%show-toc': 'Mutat',
		'%show-text': 'Megjelenítés tartalomjegyzék',
		'%hide-text': 'Hide tartalomjegyzék',
		'%table-contents': 'tartalomjegyzék',
		/* Lightbox */
		'%lb-current': '{total}-ből {current}',
		'%lb-next': 'Következő',
		'%lb-prev': 'Előző',
		'%lb-xhr-error': 'A tartalom betöltése nem sikerült.',
		'%lb-img-error': 'A kép betöltése nem sikerült.',
		'%lb-slideshow': 'Diavetítés',
		/* jQuery Mobile */
		'%jqm-expand': 'a megjelenítéshez kattintson ide',
		'%jqm-collapse': 'az elrejtéshez kattintson ide',
		'%jqm-clear-search': 'Keresési mező törlése',
		'%jqm-filter': 'Szűrés',
		'%jqm-tbl-col-toggle': 'Oszlopok ...',
		/* Charts widget */
		'%table-mention': 'Táblázat',
		'%table-following': 'Részletek a következő táblázatban.',
		/* Session timeout */
		'%st-timeout-msg': 'A munkamenet hamarosan lejár. Akkor amíg a #expireTime#, hogy aktiválja az "OK" gombra, hogy bővítse ki ülésén.',
		'%st-msgbox-title': 'Munkamenet időtúllépési figyelmeztetés',
		'%st-already-timeout-msg': 'Sajnos a munkamenet már lejárt. Kérjük, jelentkezzen be újra.',
		/* Toggle details */
		'%td-toggle': 'Váltás az összes',
		'%td-open': 'Az összes kibontása',
		'%td-close': 'Az összes összecsukása',
		'%td-ttl-open': 'Az összes kibontása rétegei tartalom',
		'%td-ttl-close': 'Elrejt minden rétege tartalom',
		/* Table enhancement */
		'%sSortAscending': ': aktiválja a növekvő sort',
		'%sSortDescending': ': aktiválja csökkenő rendezési',
		'%sEmptyTable': 'Nem állnak rendelkezésre adatok a táblázatban',
		'%sInfo': 'Megjelenítése _START_-_END_ a _TOTAL_ bejegyzés',
		'%sInfoEmpty': 'Megjelenítése 0-0 a 0 bejegyzés',
		'%sInfoFiltered': '(kiszűrt összesen _MAX_ entries)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Megjelenítés _MENU_ bejegyzés',
		/* Geomap */
		'%geo-mapcontrol': 'Térkép ellenőrzés',
		'%geo-zoomin': 'Nagyítás',
		'%geo-zoomout': 'Kicsinyítés',
		'%geo-zoomworld': 'Nagyítás feltérképezésére mértékben',
		'%geo-zoomfeature': 'Nagyítás elem',
		'%geo-scaleline': 'térkép méretarány',
		'%geo-mouseposition': 'Szélességi és hosszúsági az egér kurzor',
		'%geo-ariamap': 'Térkép objektumot. A leírások A térkép funkciók az alábbi táblázat tartalmazza.',
		'%geo-accessibilize': '<strong>Billentyűzet felhasználók:</strong> Ha a térkép a középpontban, a nyílbillentyűkkel mozgathatja a térképet, és a plusz és mínusz gombokkal a képre. A nyilak nem fog mozogni a térképen, ha a térkép kinagyított mértékben.',
		'%geo-accessibilizetitle': 'Utasítás: Térkép navigáció',
		'%geo-togglelayer': 'Váltás a megjelenítési réteg',
		'%geo-hiddenlayer': 'Ez a réteg jelenleg rejtve.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanada alaptérkép (angol vagy francia nyelven esetén)',
		'%geo-select': 'Választ',
		'%geo-labelselect': 'Ellenőrizze, hogy jelölje ki az elemet a térképen',
		/* Disable/enable PE */
		'%pe-disable': 'Egyszerű HTML verzió',
		'%pe-enable': 'Standard verzió'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: HU (Hungarian; Magyar)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Kötelező megadni.",
		maxlength: $.validator.format("Legfeljebb {0} karakter hosszú legyen."),
		minlength: $.validator.format("Legalább {0} karakter hosszú legyen."),
		rangelength: $.validator.format("Legalább {0} és legfeljebb {1} karakter hosszú legyen."),
		email: "Érvényes e-mail címnek kell lennie.",
		url: "Érvényes URL-nek kell lennie.",
		date: "Dátumnak kell lennie.",
		number: "Számnak kell lennie.",
		digits: "Csak számjegyek lehetnek.",
		equalTo: "Meg kell egyeznie a két értéknek.",
		range: $.validator.format("{0} és {1} közé kell esnie."),
		max: $.validator.format("Nem lehet nagyobb, mint {0}."),
		min: $.validator.format("Nem lehet kisebb, mint {0}."),
		creditcard: "Érvényes hitelkártyaszámnak kell lennie.",
		remote: "Kérem javítsa ki ezt a mezőt.",
		dateISO: "Kérem írjon be egy érvényes dátumot (ISO)."
	});
}(jQuery));