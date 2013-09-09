/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Arabic dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'ar',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'arabe',
		'%lang-native': 'العربية',
		'%all': 'جميع',
		'%home': 'منزل',
		'%main-page': 'الصفحة الرئيسية',
		'%top-of-page': 'أعلى الصفحة',
		'%you-are-in': 'كنت في',
		'%welcome-to': 'مرحبا بكم في',
		'%loading': '   تحميل ...',
		'%processing': 'تجهيز ...',
		'%search': 'البحث',
		'%search-for-terms': 'البحث عن شروط:',
		'%no-match-found': 'لا نتائج تذكر لل',
		'%matches-found': {
			'mixin': 'العثور على [MIXIN] مباريات'
		},
		'%menu': 'قائمة الطعام',
		'%settings': 'إعدادات',
		'%languages': 'لغات',
		'%about': 'حول',
		'%current': '(الحالي)',
		'%hide': 'إخفاء',
		'%error': 'خطأ',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'بداية',
		'%stop': 'توقف',
		'%back': 'ظهر',
		'%new-window': ' (يفتح في نافذة جديدة)',
		'%minute-ago': 'منذ دقيقة واحدة',
		'%couple-of-minutes': 'بضع دقائق قبل',
		'%minutes-ago': {
			'mixin': 'منذ [MIXIN] دقيقة'
		},
		'%hour-ago': 'قبل ساعة',
		'%hours-ago': {
			'mixin': 'منذ [MIXIN] ساعات'
		},
		'%days-ago': {
			'mixin': 'منذ [MIXIN] أيام'
		},
		'%yesterday': 'أمس',

		'%next': 'التالي',
		'%previous': 'سابق',
		'%first': 'الأول',
		'%last': 'آخر',

		/* Archived Web page template */
		'%archived-page': 'وقد حفظت هذه الصفحة على شبكة الإنترنت.',
		/* Menu bar */
		'%sub-menu-help': '(فتح القائمة الفرعية مع مفتاح الدخول وثيقة مع مفتاح الهروب)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'ايقاف الدوران علامة التبويب',
			'enable': 'بدء دوران التبويب'
		},
		'%tab-list': 'علامة التبويب قائمة',
		'%tab-panel-end-1': 'نهاية هذا الفريق التبويب.',
		'%tab-panel-end-2': 'العودة إلى قائمة التبويب',
		'%tab-panel-end-3': 'أو الاستمرار في بقية الصفحة.',
		/* Multimedia player */
		'%play': 'لعب',
		'%pause': 'وقفة',
		'%open': 'فتح',
		'%close': 'أغلق',
		'%rewind': 'الترجيع',
		'%fast-forward': 'سريع إلى الأمام',
		'%mute': {
			'enable': 'كتم',
			'disable': 'إلغاء كتمه'
		},
		'%closed-caption': {
			'disable': 'أغلقت إخفاء السفلية',
			'enable': 'أغلقت تظهر السفلية'
		},
		'%closed-caption-error': 'خطأ في تحميل تعليق مغلق',
		'%audio-description': {
			'enable': 'تمكين الوصف السمعي',
			'disable': 'تعطيل الوصف السمعي'
		},
		'%progress-bar': 'استخدام مفاتيح الأسهم الأيمن والأيسر للنهوض والتقدم ترجيع وسائل الإعلام',
		'%no-video': 'متصفحك لا يبدو أن قدرات للعب هذا الفيديو، يرجى تحميل الفيديو أدناه',
		'%position': 'الوظيفة الحالية:',
		'%percentage': 'قراءة نسبة:',
		'%duration': 'إجمالي الوقت:',
		'%buffered': 'مخزنة:',
		/* Share widget */
		'%favourite': 'المفضل',
		'%email': 'البريد الإلكتروني',
		'%share-text': 'مشاركة هذه الصفحة',
		'%share-hint': ' مع {s} ',
		'%share-email-subject': 'صفحة مثيرة للاهتمام',
		'%share-email-body': 'أعتقد أنك قد تجد هذه الصفحة مثيرة للاهتمام:\n{t} ({u})',
		'%share-fav-title': '(إشارة مرجعية هذه الصفحة)',
		'%share-manual': 'الرجاء إغلاق هذا الحوار واضغط على Ctrl-D المرجعية لهذه الصفحة.',
		'%share-showall': 'عرض كل ({n})',
		'%share-showall-title': 'جميع مواقع ارتباطك',
		'%share-disclaimer' : 'وأعرب عن تأييد أي أي منتجات أو خدمات أو ضمنية.',
		/* Form validation */
		'%form-not-submitted': 'لا يمكن أن تقدم على شكل ل ',
		'%errors-found': ' تم العثور على أخطاء.',
		'%error-found': ' تم العثور على خطأ.',
		/* Date picker */
		'%datepicker-hide': 'إخفاء التقويم',
		'%datepicker-show': 'اختيار تاريخ من التقويم لحقل:',
		'%datepicker-selected': 'مختار',
		/* Calendar */
		'%calendar-weekDayNames': ['الأحد', 'يوم الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		'%calendar-monthNames': ['يناير', 'فبراير', 'مسيرة', 'أبريل', 'قد', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
		'%calendar': 'تقويم',
		'%calendar-currentDay': '(اليوم الحالي)',
		'%calendar-goToLink': '<span class="wb-invisible">انتقل إلى الشهر </span>من العام',
		'%calendar-goToTitle': 'انتقل إلى الشهر من العام',
		'%calendar-goToMonth': 'الشهر:',
		'%calendar-goToYear': 'العام:',
		'%calendar-goToButton': 'تذهب',
		'%calendar-cancelButton': 'إلغاء',
		'%calendar-previousMonth': 'الشهر الماضي: ',
		'%calendar-nextMonth': 'الشهر المقبل: ',
		/* Slideout */
		'%show-toc': 'عرض',
		'%show-text': 'عرض جدول المحتويات',
		'%hide-text': 'إخفاء جدول المحتويات',
		'%table-contents': 'جدول المحتويات',
		/* Lightbox */
		'%lb-current': 'البند {current} من {total}',
		'%lb-next': 'البند التالي',
		'%lb-prev': 'البند السابق',
		'%lb-xhr-error': 'فشل هذا المحتوى ليتم تحميلها.',
		'%lb-img-error': 'فشلت هذه الصورة ليتم تحميلها.',
		'%lb-slideshow': 'عرض الشرائح',
		/* jQuery Mobile */
		'%jqm-expand': 'انقر فوق لتوسيع محتويات',
		'%jqm-collapse': 'انقر لانهيار محتويات',
		'%jqm-clear-search': 'البحث اضحة',
		'%jqm-filter': 'تصفية العناصر',
		'%jqm-tbl-col-toggle': 'أعمدة ...',
		/* Charts widget */
		'%table-mention': 'جدول',
		'%table-following': 'الرسم البياني. التفاصيل في الجدول التالي.',
		/* Session timeout */
		'%st-timeout-msg': 'جلسة العمل الخاصة بك على وشك أن تنتهي. لديك حتى #expireTime# لتفعيل زر "موافق" أدناه لتمديد جلسة العمل الخاصة بك.',
		'%st-msgbox-title': 'الدورة مهلة الإنذار',
		'%st-already-timeout-msg': 'عذرا انتهت صلاحية جلسة العمل الخاصة بك بالفعل. يرجى تسجيل الدخول مرة أخرى.',
		/* Toggle details */
		'%td-toggle': 'تبديل جميع',
		'%td-open': 'توسيع الكل',
		'%td-close': 'طي الكل',
		'%td-ttl-open': 'توسيع كافة أقسام محتوى',
		'%td-ttl-close': 'انهيار جميع قطاعات المحتوى',
		/* Table enhancement */
		'%sSortAscending': ': تفعيل لنوع تصاعدي',
		'%sSortDescending': ': تفعيل لفرز تنازلي',
		'%sEmptyTable': 'لا تتوفر بيانات في الجدول',
		'%sInfo': 'عرض _START_ إلى _END_ من _TOTAL_ مقالات',
		'%sInfoEmpty': 'عرض 0 إلى 0 من 0 مقالات',
		'%sInfoFiltered': '(تمت تصفيتها في الفترة من _MAX_ مجموع المقالات)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'عرض _MENU_ مقالات',
		/* Geomap */
		'%geo-mapcontrol': 'خريطة مراقبة',
		'%geo-zoomin': 'تكبير',
		'%geo-zoomout': 'تصغير',
		'%geo-zoomworld': 'التكبير لتعيين حد',
		'%geo-zoomfeature': 'تكبير إلى العنصر',
		'%geo-scaleline': 'خريطة نطاق',
		'%geo-mouseposition': 'خطوط الطول والعرض من مؤشر الماوس',
		'%geo-ariamap': 'خريطة الكائن. أوصاف الميزات الخريطة هي في الجدول أدناه.',
		'%geo-accessibilize': '<strong>مستخدمي لوحة المفاتيح:</strong> عندما الخريطة هي في التركيز، استخدم مفاتيح الأسهم لتحريك الخريطة ومفاتيح زائد وناقص لتكبير. فإن مفاتيح الأسهم لا تحريك الخريطة عند التكبير إلى حد الخريطة.',
		'%geo-accessibilizetitle': 'تعليمات: خريطة الملاحة',
		'%geo-togglelayer': 'تبديل عرض طبقة',
		'%geo-hiddenlayer': 'حاليا يتم إخفاء هذه الطبقة.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - كندا قاعدة الخريطة (الإنجليزية أو الفرنسية فقط)',
		'%geo-select': 'حدد',
		'%geo-labelselect': 'تحقق لتحديد عنصر على الخريطة',
		/* Disable/enable PE */
		'%pe-disable': 'إصدار HTML الأساسي',
		'%pe-enable': 'الإصدار القياسي'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: AR (Arabic; العربية)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "هذا الحقل إلزامي",
		remote: "يرجى تصحيح هذا الحقل للمتابعة",
		email: "رجاء إدخال عنوان بريد إلكتروني صحيح",
		url: "رجاء إدخال عنوان موقع إلكتروني صحيح",
		date: "رجاء إدخال تاريخ صحيح",
		dateISO: "رجاء إدخال تاريخ صحيح (ISO)",
		number: "رجاء إدخال عدد بطريقة صحيحة",
		digits: "رجاء إدخال أرقام فقط",
		creditcard: "رجاء إدخال رقم بطاقة ائتمان صحيح",
		equalTo: "رجاء إدخال نفس القيمة",
		accept: "رجاء إدخال ملف بامتداد موافق عليه",
		maxlength: $.validator.format("الحد الأقصى لعدد الحروف هو {0}"),
		minlength: $.validator.format("الحد الأدنى لعدد الحروف هو {0}"),
		rangelength: $.validator.format("عدد الحروف يجب أن يكون بين {0} و {1}"),
		range: $.validator.format("رجاء إدخال عدد قيمته بين {0} و {1}"),
		max: $.validator.format("رجاء إدخال عدد أقل من أو يساوي (0}"),
		min: $.validator.format("رجاء إدخال عدد أكبر من أو يساوي (0}")
	});
}(jQuery));