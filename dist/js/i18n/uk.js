/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Ukrainian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'uk',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'ukrainien',
		'%lang-native': 'Українська мова',
		'%all': 'Все',
		'%home': 'На головну',
		'%main-page': 'Головна',
		'%top-of-page': 'На початок сторінки',
		'%you-are-in': 'Ви на/в',
		'%welcome-to': 'Вітаємо на/в',
		'%loading': 'Завантаження ...',
		'%processing': 'оброблено ...',
		'%search': 'Пошук',
		'%search-for-terms': 'Пошук термінів',
		'%no-match-found': 'Нічого не знайдено',
		'%matches-found': {
			'mixin': '[MIXIN] знайдено'
		},
		'%menu': 'Меню',
		'%settings': 'Налаштування',
		'%languages': 'Мови',
		'%about': 'Про',
		'%current': '(поточна)',
		'%hide': 'Сховати',
		'%error': 'Помилка',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Старт',
		'%stop': 'Стоп',
		'%back': 'Повернутися',
		'%new-window': ' (відкриється у новому вікні)',
		'%minute-ago': 'хвилину тому',
		'%couple-of-minutes': 'декілька хвилин тому',
		'%minutes-ago': {
			'mixin': '[MIXIN] хвилин тому'
		},
		'%hour-ago': 'годину тому',
		'%hours-ago': {
			'mixin': '[MIXIN] годин тому'
		},
		'%days-ago': {
			'mixin': '[MIXIN] днів тому'
		},
		'%yesterday': 'вчора',

		'%next': 'Наступний',
		'%previous': 'Попередній',
		'%first': 'Перший',
		'%last': 'Oстанній',

		/* Archived Web page template */
		'%archived-page': 'Цю веб-сторінку було направлено до веб-архіву.',
		/* Menu bar */
		'%sub-menu-help': '(відкрийте підменю клавішею «enter» та закрийте клавішею «escape»)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Зупинити ротацію вкладки',
			'enable': 'Почати ротацію вкладки'
		},
		'%tab-list': 'Вкладка списку',
		'%tab-panel-end-1': 'Кінець  вкладці панелі.',
		'%tab-panel-end-2': 'Повернутися на вкладку списку',
		'%tab-panel-end-3': 'або продовжити до кінця сторінки.',
		/* Multimedia player */
		'%play': 'Програти',
		'%pause': 'Пауза',
		'%open': 'Відкрити',
		'%close': 'Закрити',
		'%rewind': 'На початок',
		'%fast-forward': 'Швидке перемотування вперед',
		'%mute': {
			'enable': 'Відключити звук',
			'disable': 'Включити звук'
		},
		'%closed-caption': {
			'disable': 'Сховати субтитри',
			'enable': 'Показати субтитри'
		},
		'%closed-caption-error': 'Помилка завантаження субтитрів',
		'%audio-description': {
			'enable': 'Включитиаудіо деталі',
			'disable': 'Відключити аудіо деталі'
		},
		'%progress-bar': 'використовуйте клавіші лівої та правої стрілок для перемотування вперед або назад',
		'%no-video': 'Можливо ваш браузер не може програти це відео, будь ласка, завантажте відео нижче',
		'%position': 'Поточне положення:',
		'%percentage': 'Відтворення у відсотках:',
		'%duration': 'Загальний час:',
		'%buffered': 'Завантажено у буфер обміну:',
		/* Share widget */
		'%favourite': 'Улюблене',
		'%email': 'Електронна пошта',
		'%share-text': 'Поділитися цією сторінкою',
		'%share-hint': 'з {s}',
		'%share-email-subject': 'Цікава сторінка',
		'%share-email-body': 'Гадаємо, що ви зацікавитеся цією сторінкою:\n{t} ({u})',
		'%share-fav-title': '(закладку на цій сторінці)',
		'%share-manual': 'Будь ласка, закрийте це вікно та натисніть Ctrl-D щоб додати цю сторінку.',
		'%share-showall': 'Показати все ({п})',
		'%share-showall-title': 'Всі додані сайти',
		'%share-disclaimer' : 'Не мається на увазі схвалення або просування будь-яких продукції або послуг',
		/* Form validation */
		'%form-not-submitted': 'Форма не подається через те, що',
		'%errors-found': 'знайдено помилки.',
		'%error-found': 'знайдено помилку.',
		/* Date picker */
		'%datepicker-hide': 'Сховати календар',
		'%datepicker-show': 'Оберіть дату в календарі:',
		'%datepicker-selected': 'Вибрано',
		/* Calendar */
		'%calendar-weekDayNames': ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
		'%calendar-monthNames': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
		'%calendar': 'Календар',
		'%calendar-currentDay': '(Поточний день)',
		'%calendar-goToLink': 'Перейти до<span class="wb-invisible"> місяця року</span>',
		'%calendar-goToTitle': 'Перейти до місяця року',
		'%calendar-goToMonth': 'Місяц:',
		'%calendar-goToYear': 'Рік:',
		'%calendar-goToButton': 'Перейти',
		'%calendar-cancelButton': 'Відміна',
		'%calendar-previousMonth': 'Попередній місяць: ',
		'%calendar-nextMonth': 'Наступний місяць: ',
		/* Slideout */
		'%show-toc': 'Показати',
		'%show-text': 'Показати зміст',
		'%hide-text': 'Сховати зміст',
		'%table-contents': 'зміст',
		/* Lightbox */
		'%lb-current': 'Знайдено {current} із {total}',
		'%lb-next': 'Наступний',
		'%lb-prev': 'Попередній',
		'%lb-xhr-error': 'Цей зміст не завантажується.',
		'%lb-img-error': 'Це зображення не завантажується.',
		'%lb-slideshow': 'слайд шоу',
		/* jQuery Mobile */
		'%jqm-expand': 'для розгорнення змісту, натисніть тут',
		'%jqm-collapse': 'для згорнення змісту, натисніть тут',
		'%jqm-clear-search': 'Очистити  результати пошуку',
		'%jqm-filter': 'Фільтр',
		'%jqm-tbl-col-toggle': 'Стовпці ...',
		/* Charts widget */
		'%table-mention': 'Таблиця',
		'%table-following': 'Графік. Див. деталі в таблиці.',
		/* Session timeout */
		'%st-timeout-msg': 'Ваша сесія підходить до кінця. У вас є #expireTime#, щоб активувати кнопку "ОК"  для продовження сесії.',
		'%st-msgbox-title': 'Попередження про закінчення сесії',
		'%st-already-timeout-msg': 'Вибачте, сесія вже закінчилася. Будь ласка, увійдіть знову.',
		/* Toggle details */
		'%td-toggle': 'Згорнути все',
		'%td-open': 'Розгорнути все',
		'%td-close': 'Згорнути все',
		'%td-ttl-open': 'Розгорнути всі розділи змісту',
		'%td-ttl-close': 'Згорнути всі розділи змісту',
		/* Table enhancement */
		'%sSortAscending': ': активація для сортування за зростанням ',
		'%sSortDescending': ': активація для сортування за спаданням',
		'%sEmptyTable': 'Немає  даних у таблиці',
		'%sInfo': 'Показую з _START_ по _END_ з _TOTAL_ записів',
		'%sInfoEmpty': 'Показую з 0 по 0 з 0 записів',
		'%sInfoFiltered': '(Фільтрується від _MAX_ Всього записів)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'Показати _MENU_ записів',
		/* Geomap */
		'%geo-mapcontrol': 'Управління картою',
		'%geo-zoomin': 'Збільшити',
		'%geo-zoomout': 'Зменшити',
		'%geo-zoomworld': 'Збільшити до повного розміру',
		'%geo-zoomfeature': 'Збільшення до елементу',
		'%geo-scaleline': 'масштаб карти',
		'%geo-mouseposition': 'Широту і довготу курсору миші',
		'%geo-ariamap': 'Карта об\'єктів. Опис функцій карти наведені в таблиці нижче.',
		'%geo-accessibilize': '<strong>Клавіатура користувачів:</strong> Коли карта знаходиться у фокусі, використовуйте клавіші зі стрілками для переміщення по карті і клавішами "плюс" і "мінус", щоб збільшити. Клавіши зі стрілками не переміщатимуть карту при її збільшенні у повній розмір. ',
		'%geo-accessibilizetitle': 'Інструкція: Карта навігації',
		'%geo-togglelayer': 'Включити показ шару',
		'%geo-hiddenlayer': 'Цей шар прихований!',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Канада базової карти (англійською або французькою мовою)',
		'%geo-select': 'Вибирати',
		'%geo-labelselect': 'Для обрання елементу на карті, відмітьте галочкою ',
		/* Disable/enable PE */
		'%pe-disable': 'Базова версія HTML',
		'%pe-enable': 'Стандартна версія'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: UK (Ukrainian; українська мова)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "Це поле необхідно заповнити.",
		remote: "Будь ласка, введіть правильне значення.",
		email: "Будь ласка, введіть коректну адресу електронної пошти.",
		url: "Будь ласка, введіть коректний URL.",
		date: "Будь ласка, введіть коректну дату.",
		dateISO: "Будь ласка, введіть коректну дату у форматі ISO.",
		number: "Будь ласка, введіть число.",
		digits: "Вводите потрібно лише цифри.",
		creditcard: "Будь ласка, введіть правильний номер кредитної карти.",
		equalTo: "Будь ласка, введіть таке ж значення ще раз.",
		accept: "Будь ласка, виберіть файл з правильним розширенням.",
		maxlength: $.validator.format("Будь ласка, введіть не більше {0} символів."),
		minlength: $.validator.format("Будь ласка, введіть не менше {0} символів."),
		rangelength: $.validator.format("Будь ласка, введіть значення довжиною від {0} до {1} символів."),
		range: $.validator.format("Будь ласка, введіть число від {0} до {1}."),
		max: $.validator.format("Будь ласка, введіть число, менше або рівно {0}."),
		min: $.validator.format("Будь ласка, введіть число, більше або рівно {0}.")
	});
}(jQuery));