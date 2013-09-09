/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Lithuanian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'lt',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'lituanien',
		'%lang-native': 'Lietuvių kalba',
		'%all': 'Visi',
		'%home': 'Pradžia',
		'%main-page': 'Pagrindinis puslapis',
		'%top-of-page': 'Puslapio viršus',
		'%you-are-in': 'Esate',
		'%welcome-to': 'Sveiki atvykę į',
		'%loading': 'pakrovimo ...',
		'%processing': 'perdirbimo ...',
		'%search': 'Paieška',
		'%search-for-terms': 'Terminoų paieška:',
		'%no-match-found': 'Atitikmenų nerasta',
		'%matches-found': {
			'mixin': '[MIXIN] atitikmuo (-enys) rasti'
		},
		'%menu': 'Meniu',
		'%settings': 'Nustatymai',
		'%languages': 'Kalbos',
		'%about': 'Apie',
		'%current': '(dabartinė)',
		'%hide': 'Slėpti',
		'%error': 'Klaida',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Pradėti',
		'%stop': 'Sustoti',
		'%back': 'Atgal',
		'%new-window': ' (atsidaro naujas puslapis)',
		'%minute-ago': 'Prieš minutę',
		'%couple-of-minutes': 'Prieš kelias minutes',
		'%minutes-ago': {
			'mixin': 'Prieš [MIXIN] minutes'
		},
		'%hour-ago': 'Prieš valandą',
		'%hours-ago': {
			'mixin': 'Prieš [MIXIN] valandas'
		},
		'%days-ago': {
			'mixin': 'Prieš [MIXIN] dienas'
		},
		'%yesterday': 'Vakar',

		'%next': 'Sekantis',
		'%previous': 'Ankstenis',
		'%first': 'Pirmasis',
		'%last': 'Paskutinis',

		/* Archived Web page template */
		'%archived-page': 'Šis Web puslapis yra archyvuotas Web\'e.',
		/* Menu bar */
		'%sub-menu-help': '(atidaryti submeniu su "enter" klavišu, o uždaryti su "escape" klavišu)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Sustabdyti rotaciją',
			'enable': 'Pradėti rotaciją'
		},
		'%tab-list': 'Skirtukas sąrašas',
		'%tab-panel-end-1': 'Šio skirtuko skydelyje pabaiga.',
		'%tab-panel-end-2': 'Grįžti į skirtukų sąrašą',
		'%tab-panel-end-3': 'ar toliau likusia puslapio dalimi.',
		/* Multimedia player */
		'%play': 'Žaisti',
		'%pause': 'Pauzė',
		'%open': 'Atidaryti',
		'%close': 'Uždaryti',
		'%rewind': 'Atsukti',
		'%fast-forward': 'Sukti į priekį',
		'%mute': {
			'enable': 'Užtylinti',
			'disable': 'Įjungti garsą'
		},
		'%closed-caption': {
			'disable': 'Slėpti didžiųjų raidžių įjungimą',
			'enable': 'Rodyti didžiųjų raidžių įjungimą'
		},
		'%closed-caption-error': 'Klaida kraunant didžiųjų raidžių įjungimą',
		'%audio-description': {
			'enable': 'Aktyvuoti audio aprašą',
			'disable': 'Išjungti audio aprašą'
		},
		'%progress-bar': 'naudokite kairės ir dešinės rodyklės klavišus pagreitinti arba atsukti',
		'%no-video': 'Jūsų naršyklė neturi galimybių paleisti šio video, prašome atsisiųsti žemiau esantį  video',
		'%position': 'Esama pozicija:',
		'%percentage': 'Atkūrimo procentas:',
		'%duration': 'Visas laikas:',
		'%buffered': 'Užkrautas:',
		/* Share widget */
		'%favourite': 'Mėgstamas',
		'%email': 'El. paštas',
		'%share-text': 'Dalintis',
		'%share-hint': ' su {s} ',
		'%share-email-subject': 'Įdomus puslapis',
		'%share-email-body': 'Manau, kad Jums patiks šis puslapis:\n{t} ({u})',
		'%share-fav-title': '(bookmark šį puslapį)',
		'%share-manual': 'Prašome uždaryti dialogą ir spausti  Ctrl-D pažymėti puslapį.',
		'%share-showall': 'Rodyti visus ({n})',
		'%share-showall-title': 'Visos žymės',
		'%share-disclaimer' : 'Išreikštų ar numanomų ne bet kokius produktus ar paslaugas įrašas.',
		/* Form validation */
		'%form-not-submitted': 'Formos pateikti negalima, nes ',
		'%errors-found': ' rastos klaidos.',
		'%error-found': ' rasta klaida.',
		/* Date picker */
		'%datepicker-hide': 'Slėpti kalendorių',
		'%datepicker-show': 'Pasirinkti datą iš kalendoriaus:',
		'%datepicker-selected': 'Atrinkta',
		/* Calendar */
		'%calendar-weekDayNames': ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'],
		'%calendar-monthNames': ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
		'%calendar': 'Kalendorius',
		'%calendar-currentDay': '(Šiandien)',
		'%calendar-goToLink': 'Eiti į<span class="wb-invisible"> mėnesius</span>',
		'%calendar-goToTitle': 'Eiti į mėnesius',
		'%calendar-goToMonth': 'Mėnesiai:',
		'%calendar-goToYear': 'Metai:',
		'%calendar-goToButton': 'Eiti',
		'%calendar-cancelButton': 'Atšaukti',
		'%calendar-previousMonth': 'Ankstesnis mėnuo: ',
		'%calendar-nextMonth': 'Sekantis mėnuo: ',
		/* Slideout */
		'%show-toc': 'Rodyti',
		'%show-text': 'Rodyti turinį',
		'%hide-text': 'Slėpti turinys',
		'%table-contents': 'turinys',
		/* Lightbox */
		'%lb-current': 'Punktas {current} iš {total}',
		'%lb-next': 'Sekantis',
		'%lb-prev': 'Ankstesnis',
		'%lb-xhr-error': 'Turinio nepavyko užkrauti.',
		'%lb-img-error': 'Nuotraukos nepavyko užkrauti.',
		'%lb-slideshow': 'skaidrės',
		/* jQuery Mobile */
		'%jqm-expand': 'Išplėsti turinį',
		'%jqm-collapse': 'slėpti turinį',
		'%jqm-clear-search': 'Išvalyti paiešką',
		'%jqm-filter': 'Filtruoti',
		'%jqm-tbl-col-toggle': 'Stulpelį ...',
		/* Charts widget */
		'%table-mention': 'Lentelė',
		'%table-following': 'Grafika. Daugiau detalių sekančioje lentelėje.',
		/* Session timeout */
		'%st-timeout-msg': 'Jūsų sesija netrukus baigsis. Jūs turite iki #expireTime# aktyvuoti "OK" mygtuką žemiau pratęsti savo sesiją.',
		'%st-msgbox-title': 'Sesijos laiko įspėjimas',
		'%st-already-timeout-msg': 'Deja, Jūsų sesija jau baigėsi. Prašome prisijungti vėl.',
		/* Toggle details */
		'%td-toggle': 'Perjungti visi',
		'%td-open': 'Išskleisti viską',
		'%td-close': 'Sutraukti viską',
		'%td-ttl-open': 'Išskleisti visus turinio skyrius',
		'%td-ttl-close': 'Sutraukti visus turinio skyrius',
		/* Table enhancement */
		'%sSortAscending': ': suaktyvinkite didėjimo tvarka rūšiuoti',
		'%sSortDescending': ': suaktyvinkite rikiuojama',
		'%sEmptyTable': 'Nėra duomenų apie vaisto pateiktoje lentelėje',
		'%sInfo': 'Rodoma _START_ iki _END_ iš _TOTAL_ įrašų',
		'%sInfoEmpty': 'Rodoma 0 iki 0 iš 0 įrašų',
		'%sInfoFiltered': '(filtruojamas iš _MAX_ Iš viso įrašų)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'Rodyti _MENU_ įrašai',
		/* Geomap */
		'%geo-mapcontrol': 'Žemėlapis kontrolė',
		'%geo-zoomin': 'Artinti',
		'%geo-zoomout': 'Tolinti',
		'%geo-zoomworld': 'Padidinti iki map mastą',
		'%geo-zoomfeature': 'Padidinti iki elemento',
		'%geo-scaleline': 'Žemėlapio mastelis',
		'%geo-mouseposition': 'Platuma ir ilguma pelės žymeklį',
		'%geo-ariamap': 'Žemėlapis objektas. Žemėlapio funkcijų aprašymai žemiau pateiktoje lentelėje.',
		'%geo-accessibilize': '<strong>Klaviatūros Vartotojų:</strong> žemėlapis sufokusuotas, naudokite rodyklių klavišus į panoraminį vaizdą, žemėlapį ir pliuso ir minuso klavišus. Rodyklių klavišus nebus przesuniesz žemėlapį, kai didinimas žemėlapyje,.',
		'%geo-accessibilizetitle': 'Instrukcijos: Žemėlapis navigacijos',
		'%geo-togglelayer': 'Perjungti sluoksnio rodymą',
		'%geo-hiddenlayer': 'Šis sluoksnis yra paslėptas.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Kanada bazė žemėlapis (anglų arba prancūzų kalba)',
		'%geo-select': 'Pasirinkti',
		'%geo-labelselect': 'Patikrinkite, pasirinkite elementą žemėlapyje',
		/* Disable/enable PE */
		'%pe-disable': 'Pagrindinė HTML versija',
		'%pe-enable': 'Standartinė versija'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: LT (Lithuanian; lietuvių kalba)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Šis laukas yra privalomas.",
		remote: "Prašau pataisyti šį lauką.",
		email: "Prašau įvesti teisingą elektroninio pašto adresą.",
		url: "Prašau įvesti teisingą URL.",
		date: "Prašau įvesti teisingą datą.",
		dateISO: "Prašau įvesti teisingą datą (ISO).",
		number: "Prašau įvesti teisingą skaičių.",
		digits: "Prašau naudoti tik skaitmenis.",
		creditcard: "Prašau įvesti teisingą kreditinės kortelės numerį.",
		equalTo: "Prašau įvestį tą pačią reikšmę dar kartą.",
		accept: "Prašau įvesti reikšmę su teisingu plėtiniu.",
		maxlength: $.format("Prašau įvesti ne daugiau kaip {0} simbolių."),
		minlength: $.format("Prašau įvesti bent {0} simbolius."),
		rangelength: $.format("Prašau įvesti reikšmes, kurių ilgis nuo {0} iki {1} simbolių."),
		range: $.format("Prašau įvesti reikšmę intervale nuo {0} iki {1}."),
		max: $.format("Prašau įvesti reikšmę mažesnę arba lygią {0}."),
		min: $.format("Prašau įvesti reikšmę didesnę arba lygią {0}.")
	});
}(jQuery));