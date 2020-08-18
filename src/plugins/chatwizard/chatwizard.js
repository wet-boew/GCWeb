/**
 * @title WET-BOEW Chat Wizard plugin container
 * @overview Plugin used to translate a form into a conversational form, hence a Chat Wizard
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gormfrank
 */
( function( $, window, wb ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the plugin - meaning that they will be initialized once per page,
 * not once per instance of plugin on the page. So, this is a good place to define
 * variables that are common to all instances of the plugin on a page.
 */
var componentName = "wb-chtwzrd",
	selector = "." + componentName,
	replacement = componentName + "-replace",
	initEvent = "wb-init" + selector,
	$document = wb.doc,
	datainput = {},
	timeValues = {},
	waitingForAnswer,
	formType,
	isInline,
	isNotif,
	redirurl,
	first,
	intro,
	current,
	waitTimeout,
	inputsTimeout,
	sendButton,
	i18nDict = {
		en: {
			"chtwzrd-send": "Send<span class='wb-inv'> reply and continue</span>",
			"chtwzrd-reset": "Restart from the beginning",
			"chtwzrd-toggle": "Switch to wizard",
			"chtwzrd-notification": "Close chat notification",
			"chtwzrd-open": "Open chat wizard",
			"chtwzrd-minimize": "Minimize chat wizard",
			"chtwzrd-history": "Conversation history",
			"chtwzrd-reply": "Reply",
			"chtwzrd-controls": "Controls",
			"chtwzrd-toggle-basic": "Switch to basic form",
			"chtwzrd-waiting": "Waiting for message",
			"chtwzrd-answer": "You have answered:"
		},
		fr: {
			"chtwzrd-send": "Envoyer<span class='wb-inv'> la réponse et continuer</span>",
			"chtwzrd-reset": "Recommencer depuis le début",
			"chtwzrd-toggle": "Basculer vers l&apos;assistant",
			"chtwzrd-notification": "Fermer la notification de discussion",
			"chtwzrd-open": "Ouvrir l&apos;assistant de discussion",
			"chtwzrd-minimize": "Réduire l&apos;assistant de discussion",
			"chtwzrd-history": "Historique de discussion",
			"chtwzrd-reply": "Répondre",
			"chtwzrd-controls": "Contrôles",
			"chtwzrd-toggle-basic": "Basculer vers le formulaire",
			"chtwzrd-waiting": "En attente d&apos;un message",
			"chtwzrd-answer": "Vous avez répondu&nbsp;:"
		}
	},

	/**
	 * @method init
	 * @param {jQuery Event} event Event that triggered the function call
	 */
	init = function( event ) {

		// Start initialization
		// returns DOM object = proceed with init
		// returns undefined = do not proceed with init (e.g., already initialized)
		var elm = wb.init( event, componentName, selector ),
			$elm;
		if ( elm ) {
			$elm = $( elm );

			fireChtwzrd( $elm );

			// Identify that initialization has completed
			wb.ready( $elm, componentName );
		}
	},

	/**
	 * Prepare initiation depending on the input type, wether it's JSON or a form
	 * @method fireChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 */
	fireChtwzrd = function( $selector ) {

		// Grab JSON File, parse and create
		if ( $selector.data( componentName + "-src" ) ) {
			var data = $selector.data( componentName + "-src" );
			$.getJSON( data, function( json ) {
				datainput = json;
				buildBasicForm( $selector, datainput );
				initiateChtwzrd( $selector );
			} );

		// Start from a form on the page
		} else {
			datainput = convertToObject( $selector );
			initiateChtwzrd( $selector );
		}
	},

	/**
	 * Initiate chat wizard experience
	 * @method initiateChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 */
	initiateChtwzrd = function( $selector ) {

		// Check for local storage if we need to show notification
		isNotif = localStorage.getItem( "wb-chtwzrd-notif" );

		// Prevent on load flick and identify basic form
		$selector.removeClass( "hidden wb-inv" ).addClass( componentName + "-basic" );

		// Initiate default values
		timeValues = {
			shortDelay: 500,
			mediumDelay: 750,
			longDelay: 1250,
			xLongDelay: 2000,
			xxLongDelay: 2500
		};
		waitingForAnswer = false;
		first = datainput.header.first;
		intro = ( datainput.header.instructions ? datainput.header.instructions : "" );
		redirurl = datainput.header.defaultDestination;
		current = datainput.questions[ first ];
		formType = datainput.header.formType ? datainput.header.formType : "dynamic";
		isInline = datainput.header.inline ? true : false;

		// Initiate dictionary
		i18nDict = i18nDict[ $( "html" ).attr( "lang" ) || "en" ];
		i18nDict = {
			send: i18nDict[ "chtwzrd-send" ],
			reset: i18nDict[ "chtwzrd-reset" ],
			toggle: i18nDict[ "chtwzrd-toggle" ],
			notification: i18nDict[ "chtwzrd-notification" ],
			trigger: i18nDict[ "chtwzrd-open" ],
			minimize: i18nDict[ "chtwzrd-minimize" ],
			conversation: i18nDict[ "chtwzrd-history" ],
			reply: i18nDict[ "chtwzrd-reply" ],
			controls: i18nDict[ "chtwzrd-controls" ],
			toggleBasic: i18nDict[ "chtwzrd-toggle-basic" ],
			waiting: i18nDict[ "chtwzrd-waiting" ],
			answer: i18nDict[ "chtwzrd-answer" ]
		};

		// Build chat wizard
		buildChtwzrd( $selector, datainput.header.title );

		// All the commonly used elements
		var $basic = $( selector + "-basic" ),
			$bubble = $( selector + "-bubble-wrap" ),
			$externalBtn = $( selector + "-btn" ),
			$container = $( selector + "-container" ),
			$form = $( ".body", $container ),
			$conversation = $( ".history", $container ),
			$minimize = $( ".minimize", $container ),
			$reset = $( ".reset", $container ),
			$basiclink = $( ".basic-link", $container ),
			$focusedBeforechtwzrd,
			$firstTabStop = $reset,
			$lastTabStop = $basiclink;

		// Initiate basic form
		initiateBasicForm( $basic );

		// Initiate chat wizard bubble
		initiateBubble( $bubble );

		// Initiate chat wizard external btn
		initiateExternalButton( $externalBtn );

		// Show basic form and hide chat wizard
		$basiclink.on( "click", function( event ) {
			event.preventDefault();

			var $legendFocus = $( "legend:first", $basic );
			$legendFocus.attr( "tabindex", "0" );

			$conversation.attr( "aria-live", "" );
			toggleExperience( $basic, "form" );

			$container.stop().hide();
			$basic.stop().show( function() {
				$legendFocus.focus();
				$legendFocus.removeAttr( "tabindex" );
			} );

			$( "body" ).removeClass( componentName + "-noscroll" );
		} );

		// Show chat wizard and hide basic form
		$( selector + "-link" ).on( "click", function( event ) {
			event.preventDefault();

			$basic.stop().hide();
			$focusedBeforechtwzrd = $( ":focus" );

			if ( !$( this ).hasClass( componentName + "-bubble" ) ) {
				toggleExperience( $container, "wizard" );
			}
			$( ".bubble", $bubble ).removeClass( "trans-pulse" );
			$( "p", $bubble ).hide().removeClass( "trans-left" );

			$container.stop().show();
			$bubble.stop().hide();

			$externalBtn.prop( "disabled", true );

			if ( !isInline ) {
				$( "body" ).addClass( componentName + "-noscroll" );
			}
			if ( $conversation.length ) {
				$( ".conversation", $container ).scrollTop( $conversation[ 0 ].scrollHeight );
			}
			if ( !waitingForAnswer ) {
				appendInteraction( $form );
			}

			// Do not show notification on next load
			localStorage.setItem( "wb-chtwzrd-notif", 1 );
		} );

		// External btn event handler
		$( selector + "-btn" ).on( "click", function( event ) {
			event.preventDefault();

			$externalBtn.prop( "disabled", true );

			$basic.stop().hide();
			$focusedBeforechtwzrd = $( ":focus" );

			toggleExperience( $container, "wizard" );

			$container.stop().show();
			$bubble.stop().hide();
			$container.find( ":focusable" ).first().focus();

			if ( !isInline ) {
				$( "body" ).addClass( componentName + "-noscroll" );
			}
			if ( $conversation.length ) {
				$( ".conversation", $container ).scrollTop( $conversation[ 0 ].scrollHeight );
			}
			if ( !waitingForAnswer ) {
				appendInteraction( $form );
			}
		} );

		// If inline, do not trap user with keyboard
		if ( isInline ) {
			$( selector + "-link" ).click();
		} else {

			// Listen for and trap the keyboard
			$container.on( "keydown", function( event ) {

				// Check for TAB key press, cycle through
				if ( event.keyCode === 9 ) {
					if ( event.shiftKey ) {
						if ( $firstTabStop.is( ":focus" ) ) {
							event.preventDefault();
							$lastTabStop.focus();
						}
					} else {
						if ( $lastTabStop.is( ":focus" ) ) {
							event.preventDefault();
							$firstTabStop.focus();
						}
					}
				}

				// ESCAPE, close
				if ( event.keyCode === 27 ) {
					$minimize.click();
				}
			} );
		}

		// On chat button pressed: append answer, and on submit: redirect
		$document.on( "click", selector + "-container .btn-send", function( event ) {

			if ( $( this ).attr( "type" ) !== "submit" ) {
				event.preventDefault();
				var $choiceselected = $( "input:checked", $form );
				if ( !$choiceselected.length ) {
					$choiceselected = $( "input:first", $form );
					$choiceselected.attr( "checked", true );
				}
				appendReply( $form, cookAnswerObj( $choiceselected ), false );
			}
		} );

		// On chat reset button pressed: toggle experience to wizard
		$reset.on( "click", function( event ) {
			event.preventDefault();
			toggleExperience( $( selector + "-container" ), "wizard" );
		} );

		// Minimize chat wizard
		$minimize.on( "click", function( event ) {
			event.preventDefault();
			$container.stop().hide();

			$externalBtn.prop( "disabled", false );
			$bubble.stop().show();

			$( "body" ).removeClass( componentName + "-noscroll" );

			// Set focus back to element that had it before the modal was opened
			$focusedBeforechtwzrd.focus();
		} );
	},

	/**
	 * Initiate basic form
	 * @method initiateBasicForm
	 * @param {jQuery DOM element} $selector Element to which the basic form will be appended
	 */
	initiateBasicForm = function( $selector ) {
		var $basicForm = $( "form", $selector ),
			$allQuestions = $( "fieldset", $selector ),
			$firstQuestion = $allQuestions.first();

		if ( formType === "dynamic" ) {
			$firstQuestion.addClass( componentName + "-first-q" );
			$allQuestions.not( selector + "-first-q" ).hide();
		}

		// Hide and restart fresh on reload
		$selector.hide();
		$( "input", $basicForm ).prop( "checked", false );

		// Add link to chat from the basic form
		$basicForm.append( "<button class='btn btn-sm btn-link " + componentName + "-link mrgn-rght-sm'>" + i18nDict.toggle + "</button>" );

		// On input change in the basic form
		$( "input", $basicForm ).on( "change", function() {
			var answerData = cookAnswerObj( $( this ) ),
				$qNext = $( "#" + answerData.qNext, $basicForm );

			// Dynamically append next question on checked
			if ( formType === "dynamic" ) {
				var $fieldset = $( this ).closest( "fieldset" );
				if ( $qNext.is( ":hidden" ) || $fieldset.next().attr( "id" ) !== $qNext.attr( "id" ) || answerData.qNext === "none" ) {
					$fieldset.nextAll( "fieldset" ).hide().find( "input" ).prop( "checked", false );
				}
				if ( answerData.qNext !== "none" ) {
					$( "#" + answerData.qNext ).show();
				}
				if ( answerData.url !== "" ) {
					$basicForm.attr( "action", answerData.url );
				}
			}
		} );
	},

	/**
	 * Initiate chat wizard bubble
	 * @method initiateBubble
	 * @param {jQuery DOM element} $selector Element which is the actual bubble
	 */
	initiateBubble = function( $selector ) {
		var $footer = $( "#wb-info" ),
			$link = $( selector + "-link", $selector );

		// Change to custom avatar if provided
		if ( datainput.header.avatar ) {
			$link.css( "background-image", "url(" + datainput.header.avatar + ")" );
		}

		// Hide basic form on load, show chat bubble instead
		$selector.fadeIn( "slow" );

		// Add some white space over the footer for the bubble to sit
		$footer.addClass( componentName + "-mrgn" );

		// Ensure that the bubble does not go passed the footer
		if ( $footer.length ) {

			// Keep the bubble sticky while scrolling Y until user reaches the footer
			var stickyUntilFooter = function( $element ) {

				// Equals to bubble default bottom value in CSS
				var bottomY = 30;

				if ( $( window ).scrollTop() >= $( document ).outerHeight() - $( window ).outerHeight() - $footer.outerHeight() ) {
					$element.css( {
						bottom: ( $footer.outerHeight() - ( $( document ).outerHeight() - $( window ).outerHeight() - $( window ).scrollTop() ) + bottomY )
					} );
				} else {
					$element.css( {
						bottom: bottomY
					} );
				}
			};

			// Correct bubble positionning on load, on resize an on Y scroll if necessary
			stickyUntilFooter( $selector );

			$( window ).on( "resize scroll", function() {
				stickyUntilFooter( $selector );
			} );
		}

		// Open Chat from the notification message
		$( ".notif", $selector ).on( "click", function() {
			$link.click();
		} );

		// Close notification aside bubble
		$( ".notif-close", $selector ).on( "click", function( event ) {
			event.preventDefault();
			$( this ).parent().hide();
			$selector.focus();

			// Do not show notification on next load
			localStorage.setItem( "wb-chtwzrd-notif", 1 );
		} );
	},

	/**
	 * Initiate chat wizard external button
	 * @method initiateExternalButton
	 * @param {jQuery DOM element} $selector Element which is the actual external button
	 */
	initiateExternalButton = function( $selector ) {
		$selector.attr( "aria-controls", componentName + "-container" );
	},

	/**
	 * Convert Data attributes from the form and return a Javascript Object
	 * @method convertToObject
	 * @param {jQuery DOM element} $selector Basic from which the wizard will be created
	 * @returns {Object} Data used by the wizard for the experience
	 */
	convertToObject = function( $selector ) {
		var $form = $( "form", $selector ),
			$title = $( "h2", $selector ).first(),
			$intro = $( "p:not(" + selector + "-greetings):not(" + selector + "-farewell)", $form ).first(),
			btnClassName = "btn-former-send",
			header = {},
			questions = {},
			$questions = $( "fieldset", $selector );

		header = ( typeof $selector.data( componentName ) !== undefined && $selector.data( componentName ) ? $selector.data( componentName ) : {} );

		header.inline = $selector.hasClass( "wb-chtwzrd-inline" );
		header.avatar = $selector.data( componentName + "-avatar" );

		header.defaultDestination = $form.attr( "action" );
		header.name = $form.attr( "name" );
		header.method = $form.attr( "method" );

		header.form = {};

		header.form.title = $title.html();
		header.title = replaceForWizard( $title, header.form.title );

		header.greetings = $( "p" + selector + "-greetings", $form ).html();
		header.farewell = $( "p" + selector + "-farewell", $form ).html();

		header.form.sendButton = ( $( "input[type=submit]", $form ).length ? $( "input[type=submit]", $form ).addClass( btnClassName ).val() : $( "button[type=submit]", $form ).addClass( btnClassName ).html() );
		header.sendButton = replaceForWizard( $( "." + btnClassName, $form ), header.form.sendButton );

		if ( $intro.length ) {
			header.form.instructions = $intro.html();
			header.instructions = replaceForWizard( $intro, header.form.instructions );
		}


		header.first = header.first || $questions.first().attr( "id" );

		$questions.each( function() {
			var $this = $( this ),
				$label = $( "legend", $this ),
				$choices = $( "label", $this ),
				questionID = this.id,
				qInput = ( $( "input[type=radio]", $this ).length ? "radio" : "checkbox" ),
				choices = [],
				qName = "",
				theQuestion = {};

			$choices.each( function( index ) {
				var $choice = $( "input", $( this ) ),
					choice = {},
					name = $choice.attr( "name" ),
					action = $choice.data( componentName + "-url" ),
					textval = $choice.siblings( "span:not(.no-" + componentName + ")" ).html();

				if ( !index ) {
					qName = name;
				}
				choice.content = textval;
				choice.value = $choice.val();
				choice.next = $choice.data( componentName + "-next" );
				if ( typeof action !== undefined && action ) {
					choice.url = action;
				}
				choices.push( choice );
			} );

			theQuestion.name = qName;
			theQuestion.input = qInput;
			theQuestion.formLabel = $label.html();
			theQuestion.label = replaceForWizard( $label, theQuestion.formLabel );
			theQuestion.choices = choices;

			questions[ questionID ] = theQuestion;

		} );
		return {
			header: header,
			questions: questions
		};
	},

	/**
	 * Build the chat wizard skeleton
	 * @method buildChtwzrd
	 * @param {jQuery DOM element} $selector Element to which the wizard will be appended
	 * @param {String} title The title of the wizard window, as well as the notification
	 */
	buildChtwzrd = function( $selector, title ) {
		$selector.after( "<div class='" + componentName + "-bubble-wrap'><a href='#" + componentName + "-container' aria-controls='" + componentName + "-container' class='" + componentName + "-link bubble trans-pulse' role='button'>" + i18nDict.trigger + "</a>" +
		( !isNotif ? "<p class='trans-left'><span class='notif'>" + title + "</span> <a href='#' class='notif-close' title='" + i18nDict.notification + "' aria-label='" + i18nDict.notification + "' role='button'>&times;</a></p>" : "" ) +
		"</div>" );
		$selector.next( selector + "-bubble-wrap" ).after( "<aside id='" + componentName + "-container' class='modal-content overlay-def " + componentName + "-container " + ( isInline ? " wb-chtwzrd-contained" : "" ) + "'></aside>" );

		var $container = $( selector + "-container" );
		$container.append(
			"<header class='modal-header header'><h2 class='modal-title title'>" +
			title + "</h2><button type='button' class='reset' title='" +
			i18nDict.reset +
			"'> <span class='glyphicon glyphicon-refresh'></span><span class='wb-inv'>" +
			i18nDict.reset +
			"</span></button>" +
			"<button type='button' class='minimize' title='" +
			i18nDict.minimize +
			"'><span class='glyphicon glyphicon-chevron-down'></span><span class='wb-inv'>" +
			i18nDict.minimize +
			"</span></button></header>" );
		$container.append( "<form class='modal-body body' method='GET'></form>" );

		var $form = $( ".body", $container );
		$form.append( "<div class='conversation'><section class='history' aria-live='assertive'><h3 class='wb-inv'>" + i18nDict.conversation + "</h3></section><section class='reply'><h3 class='wb-inv'>" + i18nDict.reply + "</h3><div class='inputs-zone'></div></section><div class='form-params'></div></div>" );
		$form.append(
			"<section class='controls'><h3 class='wb-inv'>" +
			i18nDict.controls + "</h3><div class='row'><div class='col-xs-12'><button class='btn btn-primary btn-block btn-send' type='button'>" +
			i18nDict.send + "</button></div></div><div class='row'><div class='col-xs-12 text-center mrgn-tp-sm'><a href='#" +
			componentName + "-basic' class='btn btn-sm btn-link basic-link' role='button'>" +
			i18nDict.toggleBasic + "</a></div></div></section>" );

		$form.attr( "name", datainput.header.name + "-chat" );
		$form.attr( "method", datainput.header.method );
		sendButton = $( ".btn-send ", $form ).html();
	},

	/**
	 * Build Basic Form from JSON
	 * @method buildBasicForm
	 * @param {jQuery DOM element} $selector Element to which the form will be appended
	 * @param {Object} data Data used by the form to build itself
	 */
	buildBasicForm = function( $selector, data ) {
		$selector.html( "" );

		var h2 = "<h2>" + data.header.title + "</h2>",
			intro = "<p>" + data.header.instructions + "</p>",
			btn = ">" + data.header.sendButton + "</button>";

		if ( typeof data.header.form.title !== undefined ) {
			h2 = "<h2 data-" + replacement + "='" + data.header.title + "'>" + data.header.form.title + "</h2>";
		}
		$selector.append( h2 + "<form class='mrgn-bttm-xl' action='" + data.header.defaultDestination + "' name='" + data.header.name + "' method='" + ( data.header.method ? data.header.method : "GET" ) + "'></form>" );

		var $basicForm = $( "form", $selector );

		if ( typeof data.header.form.instructions !== undefined ) {
			intro = "<p data-" + replacement + "='" + data.header.instructions + "'>" + data.header.form.instructions + "</p>";
		}
		$basicForm.append( "<p class='wb-chtwzrd-greetings wb-inv'>" + data.header.greetings + "</p>" + intro );

		$.each( data.questions, function( key, value ) {
			var randID = wb.getId(),
				legend = "<legend>" + value.label + "</legend>";

			if ( typeof value.formLabel !== undefined && value.formLabel ) {
				legend = "<legend data-" + replacement + "='" + value.label + "'>" + value.formLabel + "</legend>";
			}

			$basicForm.append( "<fieldset id='" + key + "' class='" + randID + "'>" + legend + "<ul class='list-unstyled mrgn-tp-md'></ul></fieldset>" );

			var $thisQ = $( "." + randID, $basicForm );

			$.each( value.choices, function( index, ivalue ) {
				randID = wb.getId();
				$( "ul", $thisQ ).append( "<li><label><input type='" + value.input + "' value='" + ivalue.value + "' id ='" + randID + "' name='" + value.name + "' data-value='" + ivalue.content + "' /> <span>" + ivalue.content + "</span>" );
				$( "#" + randID, $thisQ ).attr( "data-" + componentName + "-next", ivalue.next );
				if ( typeof ivalue.url !== undefined && ivalue.url ) {
					$( "#" + randID, $thisQ ).attr( "data-" + componentName + "-url", ivalue.url );
				}
			} );
		} );

		if ( typeof data.header.form.sendButton !== undefined ) {
			btn = " data-" + replacement + "='" + data.header.sendButton + "'>" + data.header.form.sendButton + "</button>";
		}
		$basicForm.append( "<p class='wb-chtwzrd-farewell wb-inv'>" + data.header.farewell + "</p><br/><button type='submit' class='btn btn-sm btn-primary'" + btn );

		if ( typeof datainput.header.first === "undefined" || !datainput.header.first ) {
			datainput.header.first = $( "fieldset", $basicForm ).first().attr( "id" );
		}
	},

	/**
	 * Toggle between form and wizard
	 * @method toggleExperience
	 * @param {jQuery DOM element} $selector Element to which the experience will be active
	 * @param {String} toggle Give context to the toggle, wether it is form or wizard
	 */
	toggleExperience = function( $selector, toggle ) {

		// Redraw chat wizard and start over
		if ( toggle === "wizard" ) {
			var $conversation = $( ".conversation", $selector );

			// Clear time outs in case they're still active
			window.clearTimeout( waitTimeout );
			window.clearTimeout( inputsTimeout );

			// Reset to default values
			waitingForAnswer = false;
			redirurl = datainput.header.defaultDestination;
			first = datainput.header.first;
			intro = ( datainput.header.instructions ? datainput.header.instructions : "" );
			current = datainput.questions[ first ];

			$( ".history, .form-params", $conversation ).html( "" );
			$( ".btn-send", $selector ).attr( "type", "button" ).html( sendButton );
			$( ".history", $conversation ).attr( "aria-live", "assertive" );

			appendInteraction( $( ".body", $selector ) );
		} else {

			// Redraw form if it's set to dynamic
			var $allQuestions = $( "fieldset", $selector );
			if ( formType === "dynamic" ) {
				$allQuestions.not( ":first" ).hide();
				$( "input", $allQuestions ).prop( "checked", false );
			}
		}
	},

	/**
	 * Add new question from bot and add inputs accordingly
	 * @method appendInteraction
	 * @param {jQuery DOM element} $selector Element to which the question and choices will be appended
	 */
	appendInteraction = function( $selector ) {
		var $dropSpot = $( ".history", $selector ),
			$inputsSpot = $( ".inputs-zone", $selector ),
			$chtwzrdConvo = $( ".conversation", $selector ),
			$btnnext = $( ".btn-send", $selector ),
			markup = ( first !== "" || intro !== "" || current === "last" ? "p" : "h4" );

		waitingForAnswer = true;
		$btnnext.prop( "disabled", true );

		$inputsSpot.html( "" );
		$dropSpot.append( "<div class='row mrgn-bttm-md'><div class='col-xs-9'><" + markup + " class='mrgn-tp-0 mrgn-bttm-0'><span class='avatar'></span><span class='question'></span></" + markup + "></div></div>" );

		var $lastQuestion = $( ".question:last", $dropSpot );

		// Faking delay and type time
		waitingBot( $lastQuestion );

		// Determine waiting time length
		var waitDelay = timeValues.longDelay;

		if ( isInline && first !== "" ) {
			waitDelay = timeValues.xLongDelay;
		} else if ( first === "" && intro !== "" ) {
			waitDelay = timeValues.xxLongDelay;
		}

		waitTimeout = setTimeout( function() {

			if ( first !== "" ) {

				// Show greetings on first occurence
				$lastQuestion.html( datainput.header.greetings );
				first = "";
				appendInteraction( $selector );
			} else if ( intro !== "" ) {

				// If intro is provided, show it before the first question
				$lastQuestion.html( intro );
				intro = "";
				appendInteraction( $selector );
			} else if ( current === "last" ) {

				// If it is the last question, then change the button to submit the form
				$lastQuestion.html( datainput.header.farewell );
				$btnnext.attr( "type", "submit" ).prop( "disabled", false ).html( datainput.header.sendButton + "&nbsp;<span class='glyphicon glyphicon-chevron-right small'></span>" );
				$selector.attr( "action", redirurl );
			} else {

				// On every other occurences, append the question and its possible answers
				$lastQuestion.html( current.label );
				current.input = "radio";
				inputsTimeout = setTimeout( function() {
					$inputsSpot.append( "<fieldset><legend class='wb-inv'>" + current.label + "</legend><div class='row'><div class='col-xs-12'><ul class='list-unstyled mrgn-tp-sm choices'></ul></div></div></fieldset>" );
					for ( var i = 0; i < current.choices.length; i++ ) {
						var iQuestion = current.choices[ i ];
						$( ".choices", $inputsSpot ).append( "<li><label><input type='" + current.input + "' value='" + iQuestion.value + "' name='" + current.name + "' data-" + componentName + "-next='" + iQuestion.next + "'" + ( typeof iQuestion.url === "undefined" ? "" : " data-" + componentName + "-url='" + iQuestion.url + "'" ) + ( !i ? "checked " : "" ) + "/> <span>" + iQuestion.content + "</span></label></li>" );
					}
					$btnnext.prop( "disabled", false );

					// Reposition viewport to where the action is
					var tresholdHeight = $chtwzrdConvo[ 0 ].scrollHeight,
						$reply = $( ".reply", $selector );

					if ( $reply.length && ( $reply.outerHeight() + $lastQuestion.outerHeight() > $chtwzrdConvo.innerHeight() ) ) {
						tresholdHeight = $dropSpot[ 0 ].scrollHeight - $lastQuestion.outerHeight() - 42;
					}
					$chtwzrdConvo.scrollTop( tresholdHeight );
				}, timeValues.mediumDelay );
			}
			$chtwzrdConvo.scrollTop( $chtwzrdConvo[ 0 ].scrollHeight );
		}, waitDelay );
	},

	/**
	 * Add reply from human and calls next question
	 * @method appendReply
	 * @param {jQuery DOM element} $selector Element to which the answer will be appended
	 * @param {Object} answerObj The answer selected and cooked
	 */
	appendReply = function( $selector, answerObj ) {
		var randID = wb.getId(),
			$dropSpot = $( ".history", $selector );

		$dropSpot.append( "<div class='row mrgn-bttm-md'><div class='col-xs-9 col-xs-offset-3'><div class='message text-right pull-right' id='" + randID + "'><p class='mrgn-bttm-0'><span class='wb-inv'>" + i18nDict.answer + " </span>" + answerObj.value + "</p></div></div></div>" );

		// Append hidden input for information to carry over on submit
		$( ".form-params", $selector ).append( "<input type='hidden' name='" + answerObj.name + "' value='" + answerObj.val + "' data-value='" + answerObj.value + "' />" );

		waitingForAnswer = false;
		if ( answerObj.url !== "" ) {
			redirurl = answerObj.url;
		}

		// Find next question
		var next = answerObj.qNext,
			$reply = $( "#" + randID, $dropSpot );

		if ( next === "none" ) {
			current = "last";
		} else {
			current = datainput.questions[ next ];
		}
		$( ".btn-send", $selector ).prop( "disabled", true );
		$reply.attr( "tabindex", "0" );

		// Clear the inputs zone after an intuitive delay
		waitTimeout = setTimeout( function() {
			$( ".inputs-zone", $selector ).remove( "fieldset" );
			$reply.focus();
			$reply.removeAttr( "tabindex" );
			appendInteraction( $selector );
		}, timeValues.shortDelay );
	},

	/**
	 * Waiting for the bot to type animation
	 * @method waitingBot
	 * @param {jQuery DOM element} $selector Element to which the typing loader will be appended
	 */
	waitingBot = function( $selector ) {
		$selector.html( "<span class='loader-typing' aria-label='" + i18nDict.waiting + "'><span class='loader-dot dot1'></span><span class='loader-dot dot2'></span><span class='loader-dot dot3'></span></span>" );
	},

	/**
	 * Take the replacement as value if provided
	 * @method replaceForWizard
	 * @param {jQuery DOM element} $selector Element would potentially be replaced
	 * @param {String} formerValue Original value to replace
	 * @returns {String} Value that will be used, either replaced or not
	 */
	replaceForWizard = function( $selector, formerValue ) {

		// Data attribute for value replacement
		var r = $selector.data( replacement );

		return ( typeof r !== undefined && r ? r : formerValue );
	},

	/**
	 * Cooks an answer object that is suitable for all parties
	 * @method cookAnswerObj
	 * @param {jQuery DOM element} $selector Element to which the typing loader will be appended
	 * @returns {Object} A cooked answer
	 */
	cookAnswerObj = function( $selector ) {
		var next = $selector.data( componentName + "-next" );
		var url = $selector.data( componentName + "-url" );
		return {
			qNext: next,
			name: $selector.attr( "name" ),
			val: $selector.val(),
			url: ( typeof url !== undefined && url ? url : "" ),
			value: $selector.next().html()
		};
	};

// Bind the init event of the plugin
$document.on( "timerpoke.wb " + initEvent, selector + ".provisional", init );

// Add the timer poke to initialize the plugin
wb.add( selector );

} )( jQuery, window, wb );
