/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Italian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'it',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'italien',
		'%lang-native': 'Italiano',
		'%all': 'Tutti',
		'%home': 'Home',
		'%main-page': 'Pagina principale',
		'%top-of-page': 'Inizio pagina',
		'%you-are-in': 'Sei in:',
		'%welcome-to': 'Benvenuti',
		'%loading': 'caricamento...',
		'%processing': 'elaborazione ...',
		'%search': 'Cerca',
		'%search-for-terms': 'Cerca parola/e:',
		'%no-match-found': 'Nessuna corrispondenza trovata',
		'%matches-found': {
			'mixin': '[MIXIN] corrispondenza/e trovata/e'
		},
		'%menu': 'Menu',
		'%settings': 'Impostazioni',
		'%languages': 'Lingue',
		'%about': 'A proposito di',
		'%current': '(attuale)',
		'%hide': 'Nascondere',
		'%error': 'Errore',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Inizio',
		'%stop': 'Stop',
		'%back': 'Indietro',
		'%new-window': ' (Si apre in una nuova finestra)',
		'%minute-ago': 'un minuto fa',
		'%couple-of-minutes': 'un paio di minuti fa',
		'%minutes-ago': {
			'mixin': '[MIXIN] Minuti fa'
		},
		'%hour-ago': 'un\'ora fa',
		'%hours-ago': {
			'mixin': '[MIXIN] ore fa'
		},
		'%days-ago': {
			'mixin': '[MIXIN] giorni fa'
		},
		'%yesterday': 'ieri',

		'%next': 'Prossimo',
		'%previous': 'Precedente',
		'%first': 'Primo',
		'%last': 'Ultimo',

		/* Archived Web page template */
		'%archived-page': 'Questa pagina web è stata archiviata sul web.',
		/* Menu bar */
		'%sub-menu-help': '(aprire il sottomenu con il tasto Invio e chiudere con il tasto ESC)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Arresto rotazione scheda',
			'enable': 'Inizio rotazione scheda'
		},
		'%tab-list': 'Elenco schede',
		'%tab-panel-end-1': 'Fine di questo pannello a schede.',
		'%tab-panel-end-2': 'Ritorna alla lista schede',
		'%tab-panel-end-3': 'o continuare con il resto della pagina.',
		/* Multimedia player */
		'%play': 'Play',
		'%pause': 'Pausa',
		'%open': 'Aprire',
		'%close': 'Chiudere',
		'%rewind': 'Riavvolgere',
		'%fast-forward': 'Avanti veloce',
		'%mute': {
			'enable': 'Muto',
			'disable': 'Riattivare audio'
		},
		'%closed-caption': {
			'disable': 'Nascondi i sottotitoli',
			'enable': 'Mostra i sottotitoli'
		},
		'%closed-caption-error': 'Errore caricamento sottotitoli',
		'%audio-description': {
			'enable': 'Attiva descrizione audio',
			'disable': 'Disattiva descrizione audio'
		},
		'%progress-bar': 'utilizzare freccia sinistra e freccia destra per avanzare e riavvolgere il progresso dei media',
		'%no-video': 'Your browser does not appear to have the capabilities to play this video, please download the video below',
		'%position': 'Posizione attuale:',
		'%percentage': 'Percentuale riproduzione:',
		'%duration': 'Tempo totale:',
		'%buffered': 'Bufferizzato:',
		/* Share widget */
		'%favourite': 'Preferito',
		'%email': 'E-mail',
		'%share-text': 'Condividi questa pagina',
		'%share-hint': ' con {s} ',
		'%share-email-subject': 'Pagina interessante',
		'%share-email-body': 'Ho pensato che vi potrebbe interessare questa pagina:\n{t} ({u})',
		'%share-fav-title': '(Aggiungi ai preferiti)',
		'%share-manual': 'Si prega di chiudere questa finestra di dialogo e premere Ctrl-D per aggiungere questa pagina ai preferiti.',
		'%share-showall': 'Mostra tutto ({n})',
		'%share-showall-title': 'Tutti i preferiti',
		'%share-disclaimer' : 'Nessuna approvazione di prodotti o servizi è espressa o implicita',
		/* Form validation */
		'%form-not-submitted': 'Non è stato possibile inviare il modulo in quanto ',
		'%errors-found': ' errori sono stati trovati.',
		'%error-found': ' errore è stato trovato.',
		/* Date picker */
		'%datepicker-hide': 'Nascondi calendario',
		'%datepicker-show': 'Scegli una data da un calendario per il campo:',
		'%datepicker-selected': 'Selezionato',
		/* Calendar */
		'%calendar-weekDayNames': ['Domenica', 'Lunedi', 'Martedì', 'Mercoledì', 'Giovedi', 'Venerdì', 'Sabato'],
		'%calendar-monthNames': ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
		'%calendar': 'Calendario',
		'%calendar-currentDay': '(Giorno attuale)',
		'%calendar-goToLink': 'Vai ad un<span class="wb-invisible"> mese dell\'anno</span>',
		'%calendar-goToTitle': 'Vai al mese dell\'anno',
		'%calendar-goToMonth': 'Mese:',
		'%calendar-goToYear': 'Anno:',
		'%calendar-goToButton': 'Andare',
		'%calendar-cancelButton': 'Annullare',
		'%calendar-previousMonth': 'Mese Precedente: ',
		'%calendar-nextMonth': 'Prossimo Mese: ',
		/* Slideout */
		'%show-toc': 'Mostra',
		'%show-text': 'Mostra l\'indice',
		'%hide-text': 'Nascondi indice',
		'%table-contents': 'Indice',
		/* Lightbox */
		'%lb-current': 'Articolo {current} di {total}',
		'%lb-next': 'Articolo successivo',
		'%lb-prev': 'Articolo precedente',
		'%lb-xhr-error': 'Questo contenuto non è stato caricato.',
		'%lb-img-error': 'Questa immagine non è stata caricata.',
		'%lb-slideshow': 'slideshow',
		/* jQuery Mobile */
		'%jqm-expand': 'Clicca per espandere il contenuto',
		'%jqm-collapse': 'Clicca per chiudere il contenuto',
		'%jqm-clear-search': 'Annulla ricerca',
		'%jqm-filter': 'Filtra gli articoli',
		'%jqm-tbl-col-toggle': 'Colonne ...',
		/* Charts widget */
		'%table-mention': 'Tabella',
		'%table-following': 'Grafico. Dettagli nella tabella riportata di seguito.',
		/* Session timeout */
		'%st-timeout-msg': 'La sessione sta per scadere. Hai tempo fino #expireTime# per attivare il pulsante "OK" in basso per prolungare la sessione.',
		'%st-msgbox-title': 'Avviso scadenza sessione',
		'%st-already-timeout-msg': 'Spiacenti la sessione è già scaduta. Effettua il login di nuovo.',
		/* Toggle details */
		'%td-toggle': 'Alterna tutto',
		'%td-open': 'Espandi tutto',
		'%td-close': 'Riduci tutto',
		'%td-ttl-open': 'Espandi tutte le sezioni di contenuto',
		'%td-ttl-close': 'Riduci tutte le sezioni di contenuto',
		/* Table enhancement */
		'%sSortAscending': ': organizza in ordine crescente',
		'%sSortDescending': ': organizza in ordine decrescente',
		'%sEmptyTable': 'Non sono disponibili dati in tabella',
		'%sInfo': 'Mostra _START_ a _END_ di _TOTAL_ voci',
		'%sInfoEmpty': 'Mostra 0 a 0 di 0 voci',
		'%sInfoFiltered': '(filtrato da _MAX_ voci totali)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Mostra _MENU_ voci',
		/* Geomap */
		'%geo-mapcontrol': 'Controllo di mappa',
		'%geo-zoomin': 'Zoom avanti',
		'%geo-zoomout': 'Zoom indietro',
		'%geo-zoomworld': 'Zoom sull\'estensione della mappa',
		'%geo-zoomfeature': 'Zoom sull\'elemento',
		'%geo-scaleline': 'scala mappa',
		'%geo-mouseposition': 'Latitudine e longitudine del cursore del mouse',
		'%geo-ariamap': 'Oggetto della mappa. Le descrizioni delle caratteristiche della mappa sono nella tabella qui sotto.',
		'%geo-accessibilize': '<strong>Gli utenti della tastiera:</strong> Quando la mappa è a fuoco, utilizzare i tasti freccia per scorrere la mappa e i tasti più e meno per lo zoom. I tasti freccia non scorreranno la mappa quando lo zoom è sull\'intera estensione della mappa.',
		'%geo-accessibilizetitle': 'Istruzioni: come navigare sulla mappa',
		'%geo-togglelayer': 'Alternare la visualizzazione del livello',
		'%geo-hiddenlayer': 'Questo livello è attualmente nascosto.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Canada mappa di base (inglese o francese)',
		'%geo-select': 'Selezionare',
		'%geo-labelselect': 'Controllare per selezionare l\'elemento sulla mappa',
		/* Disable/enable PE */
		'%pe-disable': 'Versione HTML di base',
		'%pe-enable': 'Versione standard'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: IT (Italian; Italiano)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Campo obbligatorio.",
		remote: "Controlla questo campo.",
		email: "Inserisci un indirizzo email valido.",
		url: "Inserisci un indirizzo web valido.",
		date: "Inserisci una data valida.",
		dateISO: "Inserisci una data valida (ISO).",
		number: "Inserisci un numero valido.",
		digits: "Inserisci solo numeri.",
		creditcard: "Inserisci un numero di carta di credito valido.",
		equalTo: "Il valore non corrisponde.",
		accept: "Inserisci un valore con un&apos;estensione valida.",
		maxlength: $.validator.format("Non inserire pi&ugrave; di {0} caratteri."),
		minlength: $.validator.format("Inserisci almeno {0} caratteri."),
		rangelength: $.validator.format("Inserisci un valore compreso tra {0} e {1} caratteri."),
		range: $.validator.format("Inserisci un valore compreso tra {0} e {1}."),
		max: $.validator.format("Inserisci un valore minore o uguale a {0}."),
		min: $.validator.format("Inserisci un valore maggiore o uguale a {0}.")
	});
}(jQuery));