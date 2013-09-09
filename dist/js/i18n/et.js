/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Estonian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'et',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'estonien',
		'%lang-native': 'Eesti keel',
		'%all': 'Kõik',
		'%home': 'Kodu',
		'%main-page': 'Pealeht',
		'%top-of-page': 'Lehekülje algusesse',
		'%you-are-in': 'Olete lehel',
		'%welcome-to': 'Tere tulemast lehele',
		'%loading': 'laadimine....',
		'%processing': 'töötlemine ...',
		'%search': 'Otsi',
		'%search-for-terms': 'Otsi mõistet',
		'%no-match-found': 'Vastet ei leitud',
		'%matches-found': {
			'mixin': 'Leitud [MIXIN] vaste(t)'
		},
		'%menu': 'Menüü',
		'%settings': 'Seaded',
		'%languages': 'Keeled',
		'%about': 'Teave',
		'%current': '(praegune)',
		'%hide': 'Peida',
		'%error': 'Viga',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Alusta',
		'%stop': 'Lõpeta',
		'%back': 'Tagasi',
		'%new-window': ' (Avaneb uues aknas)',
		'%minute-ago': 'minut tagasi',
		'%couple-of-minutes': 'mõni minut tagasi',
		'%minutes-ago': {
			'mixin': '[MIXIN] minutit tagasi'
		},
		'%hour-ago': 'tund aega tagasi',
		'%hours-ago': {
			'mixin': '[MIXIN] tundi tagasi'
		},
		'%days-ago': {
			'mixin': '[MIXIN] päeva tagasi'
		},
		'%yesterday': 'eile',

		'%next': 'Järgmine',
		'%previous': 'Eelmine',
		'%first': 'Esimene',
		'%last': 'Viimane',

		/* Archived Web page template */
		'%archived-page': 'See veebileht on arhiveeritud.',
		/* Menu bar */
		'%sub-menu-help': '(ava alamenüü klahviga Enter ja sulge klahviga Escape)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Seiska sakkide rotatsioon',
			'enable': 'Alusta sakkide rotatsiooni'
		},
		'%tab-list': 'Sakkide nimekiri',
		'%tab-panel-end-1': 'Selle sakkide paneeli lõpp',
		'%tab-panel-end-2': 'Tagasi sakkide nimekirja',
		'%tab-panel-end-3': 'või edasi ülejäänud lehele',
		/* Multimedia player */
		'%play': 'Mängi',
		'%pause': 'Paus',
		'%open': 'Ava',
		'%close': 'Sulge',
		'%rewind': 'Tagasi',
		'%fast-forward': 'Kiirkerimine',
		'%mute': {
			'enable': 'Vaigista',
			'disable': 'Heli tagasi'
		},
		'%closed-caption': {
			'disable': 'Peida subtiitrid',
			'enable': 'Näita subtiitreid'
		},
		'%closed-caption-error': 'Viga subtiitrite avamisel',
		'%audio-description': {
			'enable': 'Luba audio kirjeldus',
			'disable': 'Sulge audio kirjeldus'
		},
		'%progress-bar': 'kasuta vasakut ja paremat nooleklahvi edasi-tagasi liikumiseks',
		'%no-video': 'Sinu brauser ei võimalda seda videot mängida, palun lae video alla',
		'%position': 'Praegune asukoht',
		'%percentage': 'Taasesituse protsent:',
		'%duration': 'Kogu kestvus:',
		'%buffered': 'Puhverdatud:',
		/* Share widget */
		'%favourite': 'Lemmik',
		'%email': 'E-post',
		'%share-text': 'Jaga seda lehekülge',
		'%share-hint': 'koos {s}',
		'%share-email-subject': 'Huvitav lehekülg',
		'%share-email-body': 'Ma arvan, et see leht pakub sulle huvi:\n{t} ({u})',
		'%share-fav-title': '(lisa järjehoidja)',
		'%share-manual': 'Palun sulge see dialoogiaken ja vajuta Ctrl-D lehele järjehoidja lisamiseks.',
		'%share-showall': 'Näita kõiki ({n})',
		'%share-showall-title': 'Kõik märgitud leheküljed',
		'%share-disclaimer' : 'Mistahes tootele või teenusele pole otseselt ega kaudselt toetust avaldatud.',
		/* Form validation */
		'%form-not-submitted': 'Ankeeti ei saa esitada, kuna',
		'%errors-found': 'on leitud vigu.',
		'%error-found': 'on leitud viga.',
		/* Date picker */
		'%datepicker-hide': 'Peida kalender',
		'%datepicker-show': 'Vali kalendrist kuupäev:',
		'%datepicker-selected': 'Valitud',
		/* Calendar */
		'%calendar-weekDayNames': ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
		'%calendar-monthNames': ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
		'%calendar': 'Kalender',
		'%calendar-currentDay': '(Tänane päev)',
		'%calendar-goToLink': 'Mine aastas</span>  kuule <span class="wb-invisible"> ',
		'%calendar-goToTitle': 'Mine sellele kuule aastas',
		'%calendar-goToMonth': 'Kuu',
		'%calendar-goToYear': 'Aasta',
		'%calendar-goToButton': 'Mine',
		'%calendar-cancelButton': 'Loobu',
		'%calendar-previousMonth': 'Eelmine kuu: ',
		'%calendar-nextMonth': 'Järgmine kuu: ',
		/* Slideout */
		'%show-toc': 'Näita',
		'%show-text': 'Näita sisukorda',
		'%hide-text': 'Peida sisukord',
		'%table-contents': 'sisukord',
		/* Lightbox */
		'%lb-current': 'Kirje {current} koguhulgast {total}',
		'%lb-next': 'Järgmine',
		'%lb-prev': 'Eelmine',
		'%lb-xhr-error': 'Sisu laadimine ebaõnnestus',
		'%lb-img-error': 'Pildi laadimine ebaõnnestus',
		'%lb-slideshow': 'slaidiesitlus',
		/* jQuery Mobile */
		'%jqm-expand': 'klõpsa, et sisu laiendada',
		'%jqm-collapse': 'klõpsa, et sisu kitsendada',
		'%jqm-clear-search': 'tühista otsing',
		'%jqm-filter': 'Filtreeri',
		'%jqm-tbl-col-toggle': 'Veerud ...',
		/* Charts widget */
		'%table-mention': 'Tabel',
		'%table-following': 'Graafik. Täpsemad andmed järgnevas tabelis.',
		/* Session timeout */
		'%st-timeout-msg': 'Teie sessioon on aegumas. Teil on aega #expireTime# , et vajutada "OK" nuppu ja oma sessiooni jätkata.',
		'%st-msgbox-title': 'Hoiatus - sessiooni lõpp',
		'%st-already-timeout-msg': 'Kahjuks on su sessioon aegunud. Palun logi uuesti sisse.',
		/* Toggle details */
		'%td-toggle': 'Lülita kõik',
		'%td-open': 'Laienda kõiki',
		'%td-close': 'Sulge kõik',
		'%td-ttl-open': 'Laienda kõiki sisu osasid',
		'%td-ttl-close': 'Sulge kõik sisu osad',
		/* Table enhancement */
		'%sSortAscending': ': aktiveeri kasvavaks järjestuseks',
		'%sSortDescending': ': aktiveeri kahanevaks järjestuseks',
		'%sEmptyTable': 'Tabelist puuduvad andmed',
		'%sInfo': 'Näitan _START_-_END_  _TOTAL_ kirjest',
		'%sInfoEmpty': 'Näitan kirjeid 0-0 koguhulgast 0',
		'%sInfoFiltered': '(filtreeritud _MAX_ sissekannete koguhulgast)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Näita _MENU_ kandeid',
		/* Geomap */
		'%geo-mapcontrol': 'Kaardi kontroll',
		'%geo-zoomin': 'Suumi',
		'%geo-zoomout': 'Vähenda',
		'%geo-zoomworld': 'Suumi kaardi ulatuses',
		'%geo-zoomfeature': 'Suumi elemente',
		'%geo-scaleline': 'mõõtkava',
		'%geo-mouseposition': 'Laius-ja pikkuskraad hiirekursori',
		'%geo-ariamap': 'Kaardi objekt. Võimaluste kirjeldused leiad alltoodud tabelist.',
		'%geo-accessibilize': '<strong>Klaviatuuri kasutajatele:</strong> Kui kaart on fookuses, kasutage nooleklahve kaardi panoraamimiseks ja pluss- ja miinusklahve suumimiseks. Nooleklahvidega ei saa panoraamida, kui kaart on suumitud kogu ulatuses.',
		'%geo-accessibilizetitle': 'Juhised: Kaardil navigeerimine',
		'%geo-togglelayer': 'Kihtide vaate lülitamine',
		'%geo-hiddenlayer': 'See kiht on praegu peidetud.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanada põhikaart (inglise või prantsuse keeles)',
		'%geo-select': 'Vali',
		'%geo-labelselect': 'Märkige kaardil elemendi valimiseks',
		/* Disable/enable PE */
		'%pe-disable': 'Lihtsustatud HTML versioon',
		'%pe-enable': 'Standardversioon'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ET (Estonian; eesti, eesti keel)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "See väli peab olema täidetud.",
		maxlength: $.validator.format("Palun sisestage vähem kui {0} tähemärki."),
		minlength: $.validator.format("Palun sisestage vähemalt {0} tähemärki."),
		rangelength: $.validator.format("Palun sisestage väärtus vahemikus {0} kuni {1} tähemärki."),
		email: "Palun sisestage korrektne e-maili aadress.",
		url: "Palun sisestage korrektne URL.",
		date: "Palun sisestage korrektne kuupäev.",
		dateISO: "Palun sisestage korrektne kuupäev (YYYY-MM-DD).",
		number: "Palun sisestage korrektne number.",
		digits: "Palun sisestage ainult numbreid.",
		equalTo: "Palun sisestage sama väärtus uuesti.",
		range: $.validator.format("Palun sisestage väärtus vahemikus {0} kuni {1}."),
		max: $.validator.format("Palun sisestage väärtus, mis on väiksem või võrdne arvuga {0}."),
		min: $.validator.format("Palun sisestage väärtus, mis on suurem või võrdne arvuga {0}."),
		creditcard: "Palun sisestage korrektne krediitkaardi number."
	});
}(jQuery));