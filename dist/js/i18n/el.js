/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Greek dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'el',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'grec',
		'%lang-native': 'Ελληνικά',
		'%all': 'Όλα',
		'%home': 'Σπίτι',
		'%main-page': 'Κύρια σελίδα',
		'%top-of-page': 'Επιστροφή στην αρχή της σελίδα',
		'%you-are-in': 'You are σε',
		'%welcome-to': 'Καλώς ήρθατε στο',
		'%loading': 'φόρτωση ...',
		'%processing': 'επεξεργασία ...',
		'%search': 'Αναζήτηση σε',
		'%search-for-terms': 'Αναζήτηση όρους:',
		'%no-match-found': 'Δεν που βρέθηκαν αγώνα',
		'%matches-found': {
			'mixin': '[MIXIN] αγώνες που βρέθηκαν'
		},
		'%menu': 'Μενού',
		'%settings': 'Ρυθμίσεις',
		'%languages': 'Γλώσσες',
		'%about': 'Σχετικά με',
		'%current': '(Τρέχουσα)',
		'%hide': 'Κρύβω',
		'%error': 'Σφάλμα',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Εκκίνηση',
		'%stop': 'Σταματήστε',
		'%back': 'Πίσω',
		'%new-window': ' (Ανοίγει σε ένα νέο παράθυρο)',
		'%minute-ago': 'ένα λεπτό Πριν από',
		'%couple-of-minutes': 'ζευγάρι των λεπτά πριν',
		'%minutes-ago': {
			'mixin': 'Πριν από [MIXIN] λεπτά'
		},
		'%hour-ago': 'μια ώρα πριν από',
		'%hours-ago': {
			'mixin': '[MIXIN] ώρες πριν'
		},
		'%days-ago': {
			'mixin': '[MIXIN] μέρες πριν'
		},
		'%yesterday': 'εχθές',

		'%next': 'Επόμενος',
		'%previous': 'Προηγούμενος',
		'%first': 'Πρώτα',
		'%last': 'Τελευταίος',

		/* Archived Web page template */
		'%archived-page': 'Αυτή η σελίδα στο Web έχει αρχειοθετηθεί σχετικά με την στο Web.',
		/* Menu bar */
		'%sub-menu-help': '(Ανοίξετε το υπομενού με την εισάγετε την κλειδί και στενή με την κλειδί διαφυγής)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Σταματήστε να περιστροφή καρτέλα',
			'enable': 'Ξεκινήστε το περιστροφή καρτέλα'
		},
		'%tab-list': 'Καρτέλα λίστα',
		'%tab-panel-end-1': 'End του αυτής της πάνελ καρτέλα.',
		'%tab-panel-end-2': 'Επιστροφή για να την λίστα καρτέλα',
		'%tab-panel-end-3': 'ή να συνεχίσουν προς την υπόλοιπη της σελίδας.',
		/* Multimedia player */
		'%play': 'Παιχνίδι',
		'%pause': 'Παύση',
		'%open': 'Ανοιχτό',
		'%close': 'Κοντά',
		'%rewind': 'Επανεκτύλιξη',
		'%fast-forward': 'Γρήγορη προς τα εμπρός',
		'%mute': {
			'enable': 'Σίγαση',
			'disable': 'Αναίρεση σίγασης'
		},
		'%closed-caption': {
			'disable': 'Απόκρυψη Κλειστό λεζάντες',
			'enable': 'Εμφάνιση Κλειστό λεζάντες'
		},
		'%closed-caption-error': 'Σφάλμα κατά τη φόρτωση κλειστά λεζάντες',
		'%audio-description': {
			'enable': 'Ενεργοποίηση ήχου περιγραφή',
			'disable': 'Απενεργοποίηση ήχου περιγραφή'
		},
		'%progress-bar': 'χρήση αριστερά και δεξιά βέλη για να προχωρήσει προς τα πίσω και την πρόοδο των μέσων μαζικής ενημέρωσης',
		'%no-video': 'Ο φυλλομετρητής σας δεν δεν φαίνεται να να έχουν οι δυνατότητες για να παίξει αυτό το βίντεο, παρακαλείστε να κατεβάσετε το βίντεο παρακάτω',
		'%position': 'Τρέχουσα θέση:',
		'%percentage': 'Ποσοστό Αναπαραγωγή:',
		'%duration': 'Συνολικός χρόνος:',
		'%buffered': 'ρυθμιστικό:',
		/* Share widget */
		'%favourite': 'Αγαπημένα',
		'%email': 'E-mail',
		'%share-text': 'Κοινή χρήση αυτής της σελίδας',
		'%share-hint': ' με {s} ',
		'%share-email-subject': 'Ενδιαφέρουσες σελίδα',
		'%share-email-body': 'Νόμιζα ότι μπορείτε θα μπορούσε να βρείτε αυτό το τη σελίδα ενδιαφέρουσα:\n{t} ({u})',
		'%share-fav-title': '(Σελιδοδείκτη αυτή τη σελίδα)',
		'%share-manual': 'Παρακαλείστε να κλείστε αυτό το παράθυρο διαλόγου και πιέστε το πλήκτρο Ctrl-D για να σελιδοδείκτη αυτή τη σελίδα.',
		'%share-showall': 'Εμφάνιση όλων ({n})',
		'%share-showall-title': 'Όλα bookmarking περιοχές',
		'%share-disclaimer' : 'Δεν οπισθογράφηση των οποιωνδήποτε τα προϊόντα ή υπηρεσίες αυτών δεν εκφράζονται ή σιωπηρή.',
		/* Form validation */
		'%form-not-submitted': 'Το έντυπο θα μπορούσε να να δεν που υποβάλλονται, επειδή ',
		'%errors-found': ' τα σφάλματα βρέθηκαν.',
		'%error-found': ' σφάλμα ήταν που βρέθηκαν.',
		/* Date picker */
		'%datepicker-hide': 'Απόκρυψη ημερολόγιο',
		'%datepicker-show': 'Επιλέξτε μια ημερομηνία από το ημερολόγιο για τον τομέα:',
		'%datepicker-selected': 'Επιλεγμένα',
		/* Calendar */
		'%calendar-weekDayNames': ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
		'%calendar-monthNames': ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
		'%calendar': 'Ημερολόγιο',
		'%calendar-currentDay': '(Τρέχουσα ημέρα)',
		'%calendar-goToLink': 'Πηγαίνετε στο<span class="wb-invisible"> μήνα του έτους</span>',
		'%calendar-goToTitle': 'Πηγαίνετε στο μήνα του έτους',
		'%calendar-goToMonth': 'Μήνας',
		'%calendar-goToYear': 'Έτος',
		'%calendar-goToButton': 'Πάω',
		'%calendar-cancelButton': 'Ακύρωση',
		'%calendar-previousMonth': 'Προηγούμενος Μήνας: ',
		'%calendar-nextMonth': 'Επόμενος Μήνας: ',
		/* Slideout */
		'%show-toc': 'Προβολή',
		'%show-text': 'Εμφάνιση τον πίνακα των περιεχομένων',
		'%hide-text': 'Απόκρυψη της τον πίνακα των περιεχομένων',
		'%table-contents': 'πίνακα των περιεχομένων',
		/* Lightbox */
		'%lb-current': 'Αντικείμενο {current} από ​​{total}',
		'%lb-next': 'Επόμενη το στοιχείο',
		'%lb-prev': 'Προηγούμενη το στοιχείο',
		'%lb-xhr-error': 'Αυτό το περιεχόμενο απέτυχε για να φορτώσει.',
		'%lb-img-error': 'Αυτή η εικόνα απέτυχε για να φορτώσει.',
		'%lb-slideshow': 'slideshow',
		/* jQuery Mobile */
		'%jqm-expand': 'κάντε κλικ στην επιλογή να επεκτείνει τις περιεχόμενα',
		'%jqm-collapse': 'κάντε κλικ στην επιλογή για να καταρρεύσει περιεχόμενα',
		'%jqm-clear-search': 'σαφής αναζήτηση',
		'%jqm-filter': 'Φιλτράρισμα των στοιχείων',
		'%jqm-tbl-col-toggle': 'Στήλες ...',
		/* Charts widget */
		'%table-mention': 'Τραπέζι',
		'%table-following': 'Διάγραμμα. Λεπτομέρειες στον ακόλουθο πίνακα.',
		/* Session timeout */
		'%st-timeout-msg': 'Συνεδρία σας δεν είναι σχετικά με για να λήξει. Έχετε έως ότου #expireTime# για να ενεργοποιήσετε την "OK" κουμπί παρακάτω για να επεκτείνει συνεδρία σας.',
		'%st-msgbox-title': 'Συνεδρία προειδοποίηση χρονικού ορίου',
		'%st-already-timeout-msg': 'Μας συγχωρείτε συνεδρίας σας έχει ήδη λήξει. Παρακαλείστε να συνδεθείτε και πάλι.',
		/* Toggle details */
		'%td-toggle': 'Εναλλαγή όλα τα',
		'%td-open': 'Ανάπτυξη όλων',
		'%td-close': 'Σύμπτυξη όλων',
		'%td-ttl-open': 'Αναπτύξτε το όλες τις ενότητες του περιεχόμενο',
		'%td-ttl-close': 'Σύμπτυξη όλες τις ενότητες του περιεχόμενο',
		/* Table enhancement */
		'%sSortAscending': ': την ενεργοποιήσει για την ταξινόμηση με αύξουσα σειρά',
		'%sSortDescending': ': την ενεργοποιήσει για την φθίνουσα είδος',
		'%sEmptyTable': 'Δεν τα δεδομένα είναι διαθέσιμα στον πίνακα',
		'%sInfo': 'Εμφάνιση _START_ έως _END_ από _TOTAL_ καταχωρήσεις',
		'%sInfoEmpty': 'Εμφάνιση 0 έως 0 από 0 καταχωρήσεις',
		'%sInfoFiltered': '(φιλτράρεται από _MAX_ καταχωρήσεις)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Εμφάνιση _MENU_ καταχωρήσεις',
		/* Geomap */
		'%geo-mapcontrol': 'Χάρτης τον έλεγχο',
		'%geo-zoomin': 'Μεγέθυνση',
		'%geo-zoomout': 'Σμίκρυνση',
		'%geo-zoomworld': 'Ζουμ να χαρτογραφήσει την έκταση',
		'%geo-zoomfeature': 'Ζουμ στο στοιχείο',
		'%geo-scaleline': 'Χάρτης κλίμακα',
		'%geo-mouseposition': 'Γεωγραφικό πλάτος και μήκος του δείκτη του ποντικιού',
		'%geo-ariamap': 'Χάρτης αντικείμενο. Οι περιγραφές των χαρακτηριστικών του χάρτη αναφέρονται στον πίνακα που ακολουθεί.',
		'%geo-accessibilize': '<strong>Οι χρήστες Πληκτρολόγιο:</strong> Όταν ο χάρτης είναι σε εστίαση, χρησιμοποιήστε τα πλήκτρα βέλους για να μετακινήσετε το χάρτη και τις συν και του ενεργητικού μείον τα τα πλήκτρα για να κάνετε ζουμ. Οι πλήκτρα με τα βέλη δεν θα τηγάνι το χάρτη όταν μεγεθύνεται στο βαθμό που χάρτη.',
		'%geo-accessibilizetitle': 'Οδηγίες: Χάρτης πλοήγησης',
		'%geo-togglelayer': 'Εναλλαγή την οθόνη του του στρώμα',
		'%geo-hiddenlayer': 'Αυτό το στρώμα είναι κρυφές αυτή τη στιγμή.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Καναδάς χάρτη βάσης (αγγλικά ή γαλλικά)',
		'%geo-select': 'Επιλέξτε το',
		'%geo-labelselect': 'Ελέγξτε τις για να επιλέξετε το στοιχείο σχετικά με την χάρτη',
		/* Disable/enable PE */
		'%pe-disable': 'Βασικές έκδοση HTML',
		'%pe-enable': 'Βασική έκδοση'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: EL (Greek; ελληνικά)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Αυτό το πεδίο είναι υποχρεωτικό.",
		remote: "Παρακαλώ διορθώστε αυτό το πεδίο.",
		email: "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.",
		url: "Παρακαλώ εισάγετε ένα έγκυρο URL.",
		date: "Παρακαλώ εισάγετε μια έγκυρη ημερομηνία.",
		dateISO: "Παρακαλώ εισάγετε μια έγκυρη ημερομηνία (ISO).",
		number: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό.",
		digits: "Παρακαλώ εισάγετε μόνο αριθμητικά ψηφία.",
		creditcard: "Παρακαλώ εισάγετε έναν έγκυρο αριθμό πιστωτικής κάρτας.",
		equalTo: "Παρακαλώ εισάγετε την ίδια τιμή ξανά.",
		accept: "Παρακαλώ εισάγετε μια τιμή με έγκυρη επέκταση αρχείου.",
		maxlength: $.validator.format("Παρακαλώ εισάγετε μέχρι και {0} χαρακτήρες."),
		minlength: $.validator.format("Παρακαλώ εισάγετε τουλάχιστον {0} χαρακτήρες."),
		rangelength: $.validator.format("Παρακαλώ εισάγετε μια τιμή με μήκος μεταξύ {0} και {1} χαρακτήρων."),
		range: $.validator.format("Παρακαλώ εισάγετε μια τιμή μεταξύ {0} και {1}."),
		max: $.validator.format("Παρακαλώ εισάγετε μια τιμή μικρότερη ή ίση του {0}."),
		min: $.validator.format("Παρακαλώ εισάγετε μια τιμή μεγαλύτερη ή ίση του {0}.")
	});
}(jQuery));