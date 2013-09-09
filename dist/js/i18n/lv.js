/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Latvian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'lv',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'letton',
		'%lang-native': 'Latviešu valoda',
		'%all': 'Visi',
		'%home': 'Sākums',
		'%main-page': 'Galvenā',
		'%top-of-page': 'Lapas augša',
		'%you-are-in': 'Jūs esat:',
		'%welcome-to': 'Laipni lūgti:',
		'%loading': 'ielādēšana ...',
		'%processing': 'pārstrādes ...',
		'%search': 'Meklēt',
		'%search-for-terms': 'Meklēt terminu:',
		'%no-match-found': 'Atbilstība nav atrasta',
		'%matches-found': {
			'mixin': '[MIXIN] atbilstība(s) nav atrasta(s)'
		},
		'%menu': 'Izvēlne',
		'%settings': 'Iestatījumi',
		'%languages': 'Valodas',
		'%about': 'Par',
		'%current': '(pašreizējais)',
		'%hide': 'Slēpt',
		'%error': 'Kļūda',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Sākt',
		'%stop': 'Pārtraukt',
		'%back': 'Atpakaļ',
		'%new-window': ' (atveras jaunā logā)',
		'%minute-ago': 'pirms minūtes',
		'%couple-of-minutes': 'pirms dažām minūtēm',
		'%minutes-ago': {
			'mixin': 'pirms [MIXIN] minūtēm'
		},
		'%hour-ago': 'pirms stundas',
		'%hours-ago': {
			'mixin': 'pirms [MIXIN] stundām'
		},
		'%days-ago': {
			'mixin': 'pirms [MIXIN] dienām'
		},
		'%yesterday': 'vakar',

		'%next': 'Nākošais',
		'%previous': 'Lepriekšējais',
		'%first': 'Pirmā',
		'%last': 'Pēdējā',

		/* Archived Web page template */
		'%archived-page': 'Šī mājas lapa ir arhivēta.',
		/* Menu bar */
		'%sub-menu-help': '(atvērt apakšizvēlni ar enter taustiņu un aizvērt ar escape taustiņu)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Pārtraukt rotāciju',
			'enable': 'Sākt rotāciju'
		},
		'%tab-list': 'Saraksts cilnes',
		'%tab-panel-end-1': 'Beigas cilnes paneļa.',
		'%tab-panel-end-2': 'Atgriezties uz sarakstu cilnēm',
		'%tab-panel-end-3': 'vai turpināt uz pārējo lapu.',
		/* Multimedia player */
		'%play': 'Spēlēt',
		'%pause': 'Pauze',
		'%open': 'Atvērt',
		'%close': 'Aizvērt',
		'%rewind': 'Attīt atpakaļ',
		'%fast-forward': 'Ātrā pārtīšana',
		'%mute': {
			'enable': 'Izslēgt skaņu',
			'disable': 'Ieslēgt skaņu'
		},
		'%closed-caption': {
			'disable': 'Slēpt subtitrus',
			'enable': 'Rādīt subtitrus'
		},
		'%closed-caption-error': 'Kļūda lejuplādējot subtitrus',
		'%audio-description': {
			'enable': 'Ieslēgt audio aprakstu',
			'disable': 'Izslēgt audio aprakstu'
		},
		'%progress-bar': 'Lietot taustiņus kreisā bulta un labā bultiņa, lai patītu uz priekšu vai atgrieztos',
		'%no-video': 'Jūsu tīmekļa pārlūks nespēj parādīt šo video, lūdzu lejuplādejiet  video lejāk',
		'%position': 'Šobdrīdējā pozīcija:',
		'%percentage': 'Atskaņošana procentos:',
		'%duration': 'Kopējais laiks:',
		'%buffered': 'Īslaicīgā atmiņā:',
		/* Share widget */
		'%favourite': 'Vēlamā saite',
		'%email': 'e-pasts',
		'%share-text': 'Ieteikt šo lapu',
		'%share-hint': ' ar {s} ',
		'%share-email-subject': 'Interesanta lapa',
		'%share-email-body': 'Šī lapa var jūs interesēt:\n{t} ({u})',
		'%share-fav-title': '(grāmatzīmi šo lapu)',
		'%share-manual': 'Lūdzu aizveriet šo dialogu un spiediet Ctrl+D, lai pievienotu grāmatzīmi.',
		'%share-showall': 'Rādīt visu ({n})',
		'%share-showall-title': 'Visas atzīmējamās lapas',
		'%share-disclaimer' : 'Neviena jebkuru produktu vai pakalpojumu apstiprināšanu vai ietverta.',
		/* Form validation */
		'%form-not-submitted': 'Formu nav iespējams iesniegt, jo ',
		'%errors-found': ' tika atrastas kļūdas.',
		'%error-found': ' tika atrasta kļūda.',
		/* Date picker */
		'%datepicker-hide': 'Slēpt kalendāru',
		'%datepicker-show': 'Izvēlēties datumu no kalendāra lauka:',
		'%datepicker-selected': 'Atlasīts',
		/* Calendar */
		'%calendar-weekDayNames': ['Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena', 'Svētdiena'],
		'%calendar-monthNames': ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Octobris', 'Novembris', 'Decembris'],
		'%calendar': 'Kalendārs',
		'%calendar-currentDay': '(Šodien)',
		'%calendar-goToLink': 'Iet uz<span class="wb-invisible"> gada mēnesi</span>',
		'%calendar-goToTitle': 'Iet uz gada mēnesi',
		'%calendar-goToMonth': 'Mēnesis:',
		'%calendar-goToYear': 'Gads:',
		'%calendar-goToButton': 'Iet uz',
		'%calendar-cancelButton': 'Atcelt',
		'%calendar-previousMonth': 'Iepriekšējais mēnesis: ',
		'%calendar-nextMonth': 'Nākošais mēnesis: ',
		/* Slideout */
		'%show-toc': 'Rādīt',
		'%show-text': 'Parādīt satura',
		'%hide-text': 'Slēpt satura',
		'%table-contents': 'saturs',
		/* Lightbox */
		'%lb-current': 'Vienums {current} no {total}',
		'%lb-next': 'Nākošais vienums',
		'%lb-prev': 'Iepriekšējais vienums',
		'%lb-xhr-error': 'Šo saturu nevar ielādēt',
		'%lb-img-error': 'Šo attēlu nevar ielādēt',
		'%lb-slideshow': 'slaidrāde',
		/* jQuery Mobile */
		'%jqm-expand': 'klikšķināt, lai paplašinātu saturu',
		'%jqm-collapse': 'klikšķināt, lai savērstu saturu',
		'%jqm-clear-search': 'Dzēst meklēto',
		'%jqm-filter': 'Atlasīt vienumu',
		'%jqm-tbl-col-toggle': 'Kolonnas ...',
		/* Charts widget */
		'%table-mention': 'Tabula',
		'%table-following': 'Grafiks. Detaļas tabulā.',
		/* Session timeout */
		'%st-timeout-msg': 'Jūsu sesija beigsies. Jums ir līdz #expireTime# lai aktivizētu "OK" pogu, lai paplašinātu savu sesiju.',
		'%st-msgbox-title': 'Sesijas taimauts brīdinājums',
		'%st-already-timeout-msg': 'Atvainojiet, jūsu sesija jau ir beidzies. Lūdzu pieteikties vēlreiz.',
		/* Toggle details */
		'%td-toggle': 'Pārslēgt visas',
		'%td-open': 'Izvērst visu',
		'%td-close': 'Sakļaut visu',
		'%td-ttl-open': 'Paplašināt visas sadaļas satura',
		'%td-ttl-close': 'Sakļaut visas sadaļas satura',
		/* Table enhancement */
		'%sSortAscending': ': aktivizēt uz augošā šķirot',
		'%sSortDescending': ': aktivizēt par dilstošā šķirot',
		'%sEmptyTable': 'Nav pieejami dati tabulā',
		'%sInfo': 'Rādu no _START_ līdz _END_ no _TOTAL_ ierakstiem',
		'%sInfoEmpty': 'Rādu no 0 līdz 0 no 0 ierakstiem',
		'%sInfoFiltered': '(filtrēts no _MAX_ kopējiem ierakstiem)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'Parādīt _MENU_ ieraksti',
		/* Geomap */
		'%geo-mapcontrol': 'Karte kontrole',
		'%geo-zoomin': 'Pievelciet',
		'%geo-zoomout': 'Attāliniet',
		'%geo-zoomworld': 'Zoom uz kartes robežas',
		'%geo-zoomfeature': 'Tuvināt elementam',
		'%geo-scaleline': 'Kartes mērogs',
		'%geo-mouseposition': 'Platuma un garuma ar peles kursoru',
		'%geo-ariamap': 'Karte objekts. No kartes funkciju apraksti šajā tabulā.',
		'%geo-accessibilize': '<strong>Tastatūras tīklā:</strong> Kad karte ir fokusā, izmantojiet bulttaustiņus, lai pārvietotos karti un plus un mīnus taustiņus, lai tuvinātu. Bulttaustiņi nebūs panoramētu karti kad pietuvināto uz kartes apmērā.',
		'%geo-accessibilizetitle': 'Instrukcijas: Karte navigācija',
		'%geo-togglelayer': 'Pārslēgt displeja slāņa',
		'%geo-hiddenlayer': 'Šis slānis pašlaik paslēpta.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanāda bāze karte (angļu vai franču valodā)',
		'%geo-select': 'Atlasīt',
		'%geo-labelselect': 'Pārbaudiet, lai izvēlētos elementu uz kartes',
		/* Disable/enable PE */
		'%pe-disable': 'Pamata HTML versija',
		'%pe-enable': 'Standarta versija'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: LV (Latvian; latviešu valoda)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Šis lauks ir obligāts.",
		remote: "Lūdzu, pārbaudiet šo lauku.",
		email: "Lūdzu, ievadiet derīgu e-pasta adresi.",
		url: "Lūdzu, ievadiet derīgu URL adresi.",
		date: "Lūdzu, ievadiet derīgu datumu.",
		dateISO: "Lūdzu, ievadiet derīgu datumu (ISO).",
		number: "Lūdzu, ievadiet derīgu numuru.",
		digits: "Lūdzu, ievadiet tikai ciparus.",
		creditcard: "Lūdzu, ievadiet derīgu kredītkartes numuru.",
		equalTo: "Lūdzu, ievadiet to pašu vēlreiz.",
		accept: "Lūdzu, ievadiet vērtību ar derīgu paplašinājumu.",
		maxlength: $.validator.format("Lūdzu, ievadiet ne vairāk kā {0} rakstzīmes."),
		minlength: $.validator.format("Lūdzu, ievadiet vismaz {0} rakstzīmes."),
		rangelength: $.validator.format("Lūdzu ievadiet {0} līdz {1} rakstzīmes."),
		range: $.validator.format("Lūdzu, ievadiet skaitli no {0} līdz {1}."),
		max: $.validator.format("Lūdzu, ievadiet skaitli, kurš ir mazāks vai vienāds ar {0}."),
		min: $.validator.format("Lūdzu, ievadiet skaitli, kurš ir lielāks vai vienāds ar {0}.")
	});
}(jQuery));