/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Bulgarian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'bg',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'bulgare',
		'%lang-native': 'Български език',
		'%all': 'Всички',
		'%home': 'Дом',
		'%main-page': 'Главна страница',
		'%top-of-page': 'Начало на страницата',
		'%you-are-in': 'Вие се намирате в',
		'%welcome-to': 'Добре дошли в',
		'%loading': 'зарежда се ...',
		'%processing': 'Обработва се ...',
		'%search': 'Търсене',
		'%search-for-terms': 'Търсене за термини:',
		'%no-match-found': 'Не е съвпадение, установиха',
		'%matches-found': {
			'mixin': '[MIXIN] открити съвпадения'
		},
		'%menu': 'Меню',
		'%settings': 'Настройки',
		'%languages': 'Езици',
		'%about': 'За',
		'%current': '(Текущи)',
		'%hide': 'Крия',
		'%error': 'Грешка',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Начало',
		'%stop': 'Спиране',
		'%back': 'Назад',
		'%new-window': ' (Отваря се в нов прозорец)',
		'%minute-ago': 'преди минута',
		'%couple-of-minutes': 'Преди няколко минути',
		'%minutes-ago': {
			'mixin': '[MIXIN] минути'
		},
		'%hour-ago': 'преди час',
		'%hours-ago': {
			'mixin': '[MIXIN] часа преди'
		},
		'%days-ago': {
			'mixin': '[MIXIN] дни'
		},
		'%yesterday': 'вчера',

		'%next': 'До',
		'%previous': 'Предишен',
		'%first': 'Първи',
		'%last': 'Последно',

		/* Archived Web page template */
		'%archived-page': 'Тази страница е архивиран в мрежата.',
		/* Menu bar */
		'%sub-menu-help': '(отворите подменюто с клавиша и в близост с бягство ключ)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Спри да се върти раздела',
			'enable': 'Започнете въртене раздела'
		},
		'%tab-list': 'Списък на разделите',
		'%tab-panel-end-1': 'В края на този раздел панел.',
		'%tab-panel-end-2': 'Назад към списъка раздела',
		'%tab-panel-end-3': 'или да продължат да останалата част от страницата.',
		/* Multimedia player */
		'%play': 'Играя',
		'%pause': 'Пауза',
		'%open': 'Отворен',
		'%close': 'Близо',
		'%rewind': 'Превъртане назад',
		'%fast-forward': 'Бързо напред',
		'%mute': {
			'enable': 'Изключване',
			'disable': 'Вкл.звук'
		},
		'%closed-caption': {
			'disable': 'Скрий Затворени надписи',
			'enable': 'Покажи Затворени надписи'
		},
		'%closed-caption-error': 'Грешка при зареждане на затворени надписи',
		'%audio-description': {
			'enable': 'Активиране на аудио описание',
			'disable': 'Изключване на аудио описание'
		},
		'%progress-bar': 'Използвайте лява и дясна стрелка, за да преминете и назад напредъка на медиите',
		'%no-video': 'Вашият браузър не изглежда да имаме възможност да играе този клип, моля да изтеглите видеото по-долу',
		'%position': 'Позиция:',
		'%percentage': 'Възпроизвеждането проценти:',
		'%duration': 'Общо време:',
		'%buffered': 'Буфериран:',
		/* Share widget */
		'%favourite': 'Любими',
		'%email': 'Мейл',
		'%share-text': 'Споделете тази страница',
		'%share-hint': ' с {s} ',
		'%share-email-subject': 'Интересни страница',
		'%share-email-body': 'Мислех, че може да намери тази страница интересно:\n{t} ({u})',
		'%share-fav-title': '(Запомнете тази страница)',
		'%share-manual': 'Моля, затворете този диалогов прозорец и натиснете Ctrl-D Запомнете тази страница.',
		'%share-showall': 'Виж всички ({n})',
		'%share-showall-title': 'Всички Маркиране на сайтове',
		'%share-disclaimer' : 'Липса на одобрение на продукти или услуги, изрични или подразбиращи се',
		/* Form validation */
		'%form-not-submitted': 'Форма не могат да се подават, тъй като ',
		'%errors-found': ' бяха открити грешки.',
		'%error-found': ' грешка е намерен.',
		/* Date picker */
		'%datepicker-hide': 'Скриване на календара',
		'%datepicker-show': 'Изберете дата от календара за областта:',
		'%datepicker-selected': 'Подбран',
		/* Calendar */
		'%calendar-weekDayNames': ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
		'%calendar-monthNames': ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
		'%calendar': 'Календар',
		'%calendar-currentDay': '(Текущия ден)',
		'%calendar-goToLink': 'Отиди на<span class="wb-invisible"> месец на годината</span>',
		'%calendar-goToTitle': 'Отиди на месец на годината',
		'%calendar-goToMonth': 'Месец:',
		'%calendar-goToYear': 'Година:',
		'%calendar-goToButton': 'Отивам',
		'%calendar-cancelButton': 'Отказ',
		'%calendar-previousMonth': 'Предходния месец: ',
		'%calendar-nextMonth': 'Следващия месец: ',
		/* Slideout */
		'%show-toc': 'Показване',
		'%show-text': 'Покажи съдържание',
		'%hide-text': 'Скриване на съдържание',
		'%table-contents': 'съдържание',
		/* Lightbox */
		'%lb-current': 'Член {current} от {total}',
		'%lb-next': 'Следващ елемент',
		'%lb-prev': 'Предишен материал',
		'%lb-xhr-error': 'Това съдържание не успя да се зареди.',
		'%lb-img-error': 'Това изображение не успя да се зареди.',
		'%lb-slideshow': 'слайдшоу',
		/* jQuery Mobile */
		'%jqm-expand': 'Кликнете, за да се разшири съдържанието',
		'%jqm-collapse': 'Кликнете, за да свиете съдържанието',
		'%jqm-clear-search': 'Изчистване на търсенето',
		'%jqm-filter': 'Филтриране на елементи',
		'%jqm-tbl-col-toggle': 'Колони ...',
		/* Charts widget */
		'%table-mention': 'Маса',
		'%table-following': 'Графика. Подробности в таблицата по-долу.',
		/* Session timeout */
		'%st-timeout-msg': 'Вашата сесия е на път да изтече. Имате до #expireTime#, за да активирате бутона "ОК"-долу, за да се разшири вашата сесия.',
		'%st-msgbox-title': 'Предупреждение Изтекла сесия',
		'%st-already-timeout-msg': 'За съжаление вашата сесия вече е изтекъл. Моля, влезте отново.',
		/* Toggle details */
		'%td-toggle': 'Превключване всички',
		'%td-open': 'Разгъване на всички',
		'%td-close': 'Свиване на всички',
		'%td-ttl-open': 'Разгъване на всички раздели на съдържание',
		'%td-ttl-close': 'Сгъване на всички раздели на съдържание',
		/* Table enhancement */
		'%sSortAscending': 'активира за възходящ вид',
		'%sSortDescending': 'активирате за низходяща вид',
		'%sEmptyTable': 'Няма налични данни в таблицата',
		'%sInfo': 'Показване _START_ до _END_ от общо _TOTAL_ вписвания',
		'%sInfoEmpty': 'Показване 0 до 0 от общо 0 вписвания',
		'%sInfoFiltered': '(филтрирани от _MAX_ всички записи)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'Покажи _MENU_ вписвания',
		/* Geomap */
		'%geo-mapcontrol': 'Карта контрол',
		'%geo-zoomin': 'Увеличаване на мащаба',
		'%geo-zoomout': 'Намаляване на мащаба',
		'%geo-zoomworld': 'Мащаба, за да картата степен',
		'%geo-zoomfeature': 'Увеличите до елемента',
		'%geo-scaleline': 'Карта мащаб',
		'%geo-mouseposition': 'Географска ширина и дължина на курсора на мишката',
		'%geo-ariamap': 'Карта обект. Описанията на картата функции са в таблицата по-долу.',
		'%geo-accessibilize': 'Клавиатура потребители: Когато картата е на фокус, използвайте клавишите със стрелки, за да се придвижвате карта и бутоните плюс и минус за увеличение. Клавишите със стрелки, които не са ще видиш картата когато увеличени картата степен.',
		'%geo-accessibilizetitle': 'Инструкции: навигационна карта',
		'%geo-togglelayer': 'Превключване на дисплея на слоя',
		'%geo-hiddenlayer': 'Този слой в момента е скрит.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Канада основната карта (на английски или френски език)',
		'%geo-select': 'Изберете',
		'%geo-labelselect': 'Проверете, за да изберете елемента на картата',
		/* Disable/enable PE */
		'%pe-disable': 'Базов HTML версия',
		'%pe-enable': 'Стандартната версия'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: BG (Bulgarian; български език)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Полето е задължително.",
		remote: "Моля, въведете правилната стойност.",
		email: "Моля, въведете валиден email.",
		url: "Моля, въведете валидно URL.",
		date: "Моля, въведете валидна дата.",
		dateISO: "Моля, въведете валидна дата (ISO).",
		number: "Моля, въведете валиден номер.",
		digits: "Моля, въведете само цифри",
		creditcard: "Моля, въведете валиден номер на кредитна карта.",
		equalTo: "Моля, въведете същата стойност отново.",
		accept: "Моля, въведете стойност с валидно разширение.",
		maxlength: $.validator.format("Моля, въведете повече от {0} символа."),
		minlength: $.validator.format("Моля, въведете поне {0} символа."),
		rangelength: $.validator.format("Моля, въведете стойност с дължина между {0} и {1} символа."),
		range: $.validator.format("Моля, въведете стойност между {0} и {1}."),
		max: $.validator.format("Моля, въведете стойност по-малка или равна на {0}."),
		min: $.validator.format("Моля, въведете стойност по-голяма или равна на {0}.")
	});
}(jQuery));