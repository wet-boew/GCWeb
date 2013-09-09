/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- French dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'fr',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'français',
		'%lang-native': 'Français',
		'%all': 'Tous',
		'%home': 'Accueil',
		'%main-page': 'Page principale',
		'%top-of-page': 'Haut de la page',
		'%you-are-in': 'Vous êtes dans :',
		'%welcome-to': 'Bienvenue à :',
		'%loading': 'chargement...',
		'%processing': 'traitement...',
		'%search': 'Recherche',
		'%search-for-terms': 'Recherche de terme(s)&#160;:',
		'%no-match-found': 'Aucune correspondance trouvée',
		'%matches-found': {
			'mixin': '[MIXIN] correspondance(s) trouvées'
		},
		'%menu': 'Menu',
		'%settings': 'Paramètres',
		'%languages': 'Langues',
		'%about': 'À propos',
		'%current': '(actuel)',
		'%hide': 'Masquer',
		'%error': 'Erreur',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Lancer',
		'%stop': 'Arrêter',
		'%back': 'Précédent',
		'%new-window': ' (Ouvre dans une nouvelle fenêtre)',
		'%minute-ago': 'il y a une minute',
		'%couple-of-minutes': 'il y a quelques minutes',
		'%minutes-ago': {
			'mixin': 'il y a [MIXIN] minutes'
		},
		'%hour-ago': 'il y a une heure',
		'%hours-ago': {
			'mixin': 'il y a [MIXIN] heures'
		},
		'%days-ago': {
			'mixin': 'il y a [MIXIN] jours'
		},
		'%yesterday': 'hier',

		'%next': 'Suivant',
		'%previous': 'Précedent',
		'%first': 'Premier',
		'%last': 'Dernier',

		/* Archived Web page template */
		'%archived-page': 'Cette page Web a été archivée dans le Web.',
		/* Menu bar */
		'%sub-menu-help': '(ouvrir le sous-menu avec la touche d\'entrée et le fermer avec la touche d\'échappement)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Arrêter la rotation d\'onglets',
			'enable': 'Lancer la rotation d\'onglets'
		},
		'%tab-list': 'Liste des onglets',
		'%tab-panel-end-1': 'Fin de ce panneau à onglets.',
		'%tab-panel-end-2': 'Retourner à la liste des onglets',
		'%tab-panel-end-3': 'ou continuer au reste de la page.',
		/* Multimedia player */
		'%play': 'Jouer',
		'%pause': 'Pause',
		'%open': 'Ouvrir',
		'%close': 'Fermer',
		'%rewind': 'Reculer',
		'%fast-forward': 'Avancer',
		'%mute': {
			'enable': 'Activer le mode muet',
			'disable': 'Désactiver le mode muet'
		},
		'%closed-caption': {
			'disable': 'Masquer le sous-titrage',
			'enable': 'Afficher le sous-titrage'
		},
		'%closed-caption-error': 'Erreur dans le chargement des sous-titres',
		'%audio-description': {
			'enable': 'Activer l\'audiodescription',
			'disable': 'Désactiver l\'audiodescription'
		},
		'%progress-bar': 'utilisez les touches gauche ou droite pour avancer ou reculer le progrès des médias',
		'%no-video': 'Votre navigateur ne semble pas avoir les capacité nécessaires pour lire cette vidéo, s\'il vous plaît télécharger la vidéo ci-dessous',
		'%position': 'Position actuelle :',
		'%percentage': 'Pourcentage de lecture :',
		'%duration': 'Temps total :',
		'%buffered': 'Mis en mémoire-tampon :',
		/* Share widget */
		'%favourite': 'Lien préféré',
		'%email': 'Courriel',
		'%share-text': 'Partagez cette page',
		'%share-hint': ' avec {s} ',
		'%share-email-subject': 'Page qui est intéressante',
		'%share-email-body': 'J\'espère que cette page vous intéresse :\n{t} ({u})',
		'%share-fav-title': '(ajouter cette page à vos signets)',
		'%share-manual': 'S\'il vous plaît fermer ce dialogue et appuyer sur Ctrl-D pour ajouter cette page à vos signets.',
		'%share-showall': 'Tous montrer ({n})',
		'%share-showall-title': 'Tout les sites de mise en signet',
		'%share-disclaimer' : 'Aucun appui n’est accordé, soit de façon expresse ou tacite, à aucun produit ou service.',
		/* Form validation */
		'%form-not-submitted': 'Le formulaire n\'a pu être soumis car ',
		'%errors-found': ' erreurs ont été trouvées.',
		'%error-found': ' erreur a été trouvée.',
		/* Date picker */
		'%datepicker-hide': 'Masquer le calendrier',
		'%datepicker-show': 'Sélectionner une date à partir d\'un calendrier pour le champ:',
		'%datepicker-selected': 'Sélectionné',
		/* Calendar */
		'%calendar-weekDayNames': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		'%calendar-monthNames': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		'%calendar': 'Calendrier',
		'%calendar-currentDay': '(Jour courrant)',
		'%calendar-goToLink': 'Aller au<span class="wb-invisible"> mois de l\'année</span>',
		'%calendar-goToTitle': 'Aller au mois de l\'année',
		'%calendar-goToMonth': 'Mois :',
		'%calendar-goToYear': 'Année :',
		'%calendar-goToButton': 'Aller',
		'%calendar-cancelButton': 'Annuler',
		'%calendar-previousMonth': 'Mois précédent : ',
		'%calendar-nextMonth': 'Mois suivant : ',
		/* Slideout */
		'%show-toc': 'Afficher',
		'%show-text': 'Afficher la table des matières',
		'%hide-text': 'Cacher la table des matières',
		'%table-contents': 'la table des matières',
		/* Lightbox */
		'%lb-current': 'Article {current} de {total}',
		'%lb-next': 'Article suivant',
		'%lb-prev': 'Article précédent',
		'%lb-xhr-error': 'Le chargement de ce contenu a échoué.',
		'%lb-img-error': 'Le chargement de cette image a échoué.',
		'%lb-slideshow': 'la diaporama',
		/* jQuery Mobile */
		'%jqm-expand': 'cliquer pour afficher le contenu',
		'%jqm-collapse': 'cliquer pour masquer le contenu',
		'%jqm-clear-search': 'effacer le texte',
		'%jqm-filter': 'Filtrer des articles',
		'%jqm-tbl-col-toggle': 'Colonnes...',
		/* Charts widget */
		'%table-mention': 'Tableau',
		'%table-following': 'Graphique. Plus de détails dans le tableau suivant.',
		/* Session timeout */
		'%st-timeout-msg': 'Votre session est sur le point d\'expirer. Vous avez jusqu\'à #expireTime# pour sélectionner « OK » ci-dessous pour prolonger votre session.',
		'%st-msgbox-title': 'Avertissement d\'expiration de la session',
		'%st-already-timeout-msg': 'Désolé, votre session a déjà expiré. S\'il vous plaît vous connecter à nouveau.',
		/* Toggle details */
		'%td-toggle': 'Basculer tout',
		'%td-open': 'Afficher tout',
		'%td-close': 'Réduire tout',
		'%td-ttl-open': 'Afficher toutes les sections de contenu',
		'%td-ttl-close': 'Réduire toutes les sections de contenu',
		/* Table enhancement */
		'%sSortAscending': '&#160;: activer pour tri ascendant',
		'%sSortDescending': '&#160;: activer pour tri descendant',
		'%sEmptyTable': 'Aucunes données sont disponibles dans la table',
		'%sInfo': 'Montre _START_ à _END_ de _TOTAL_ entrées',
		'%sInfoEmpty': 'Montre 0 à 0 de 0 entrées',
		'%sInfoFiltered': '(filtré de _MAX_ entrées totales)',
		'%sInfoThousands': '&#160;',
		'%sLengthMenu': 'Montrer _MENU_ entrées',
		/* Geomap */
		'%geo-mapcontrol': 'Contrôle de la carte',
		'%geo-zoomin': 'Zoom avant',
		'%geo-zoomout': 'Zoom arrière',
		'%geo-zoomworld': 'Zoom sur l\'étendue de la carte',
		'%geo-zoomfeature': 'Zoom à l\'élément',
		'%geo-scaleline': 'Échelle de la carte',
		'%geo-mouseposition': 'Latitude et longitude du curseur de la souris',
		'%geo-ariamap': 'Objet de la carte. Les descriptions des caractéristiques de la carte se trouvent dans la table ci-dessous.',
		'%geo-accessibilize': '<strong>Utilisateurs de clavier :</strong> Lorsque la carte a l\'attention, utiliser les touches flèches pour déplacer la carte et utiliser les touches plus et négatif pour faire un zoom. La carte ne peut être déplacée lorsque le zoom est à son étendue maximal.',
		'%geo-accessibilizetitle': 'Instructions : comment naviguer dans la carte',
		'%geo-togglelayer': 'Basculer l\'affichage de la couche',
		'%geo-hiddenlayer': 'Cette couche est présentement cachée.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBCT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBCT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=fr',
		'%geo-attributiontitle': 'GéoGratis - Carte de Base du Canada',
		'%geo-select': 'Sélectionnez',
		'%geo-labelselect': 'Cochez pour sélectionner cet élément sur la carte',
		/* Disable/enable PE */
		'%pe-disable': 'Version HTML simplifiée',
		'%pe-enable': 'Version standard'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: FR (French; français)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Ce champ est obligatoire.",
		remote: "Veuillez corriger ce champ.",
		email: "Veuillez fournir une adresse électronique valide.",
		url: "Veuillez fournir une adresse URL valide.",
		date: "Veuillez fournir une date valide.",
		dateISO: "Veuillez fournir une date valide (ISO).",
		number: "Veuillez fournir un numéro valide.",
		digits: "Veuillez fournir seulement des chiffres.",
		creditcard: "Veuillez fournir un numéro de carte de crédit valide.",
		equalTo: "Veuillez fournir encore la même valeur.",
		accept: "Veuillez fournir une valeur avec une extension valide.",
		maxlength: $.validator.format("Veuillez fournir au plus {0} caractères."),
		minlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
		rangelength: $.validator.format("Veuillez fournir une valeur qui contient entre {0} et {1} caractères."),
		range: $.validator.format("Veuillez fournir une valeur entre {0} et {1}."),
		max: $.validator.format("Veuillez fournir une valeur inférieur ou égal à {0}."),
		min: $.validator.format("Veuillez fournir une valeur supérieur ou égal à {0}."),
		maxWords: $.validator.format("Veuillez fournir au plus {0} mots."),
		minWords: $.validator.format("Veuillez fournir au moins {0} mots."),
		rangeWords: $.validator.format("Veuillez fournir entre {0} et {1} mots."),
		letterswithbasicpunc: "Veuillez fournir seulement des lettres et des signes de ponctuation.",
		alphanumeric: "Veuillez fournir seulement des lettres, nombres, espaces et soulignages",
		lettersonly: "Veuillez fournir seulement des lettres.",
		nowhitespace: "Veuillez ne pas inscrire d'espaces blancs.",
		ziprange: "Veuillez fournir un code postal entre 902xx-xxxx et 905-xx-xxxx.",
		integer: "Veuillez fournir un nombre non décimal qui est positif ou négatif.",
		vinUS: "Veuillez fournir un numéro d'identification du véhicule (VIN).",
		dateITA: "Veuillez fournir une date valide.",
		time: "Veuillez fournir une heure valide entre 00:00 et 23:59.",
		phoneUS: "Veuillez fournir un numéro de téléphone valide.",
		phoneUK: "Veuillez fournir un numéro de téléphone valide.",
		mobileUK: "Veuillez fournir un numéro de téléphone mobile valide.",
		strippedminlength: $.validator.format("Veuillez fournir au moins {0} caractères."),
		email2: "Veuillez fournir une adresse électronique valide.",
		url2: "Veuillez fournir une adresse URL valide.",
		creditcardtypes: "Veuillez fournir un numéro de carte de crédit valide.",
		ipv4: "Veuillez fournir une adresse IP v4 valide.",
		ipv6: "Veuillez fournir une adresse IP v6 valide.",
		require_from_group: "Veuillez fournir au moins {0} de ces champs."
	});
}(jQuery));