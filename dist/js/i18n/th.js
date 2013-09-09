/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Thai dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'th',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'thaï',
		'%lang-native': 'ภาษาไทย',
		'%all': 'ทั้งหมด',
		'%home': 'บ้าน',
		'%main-page': 'หน้าหลัก',
		'%top-of-page': 'ด้านบนของหน้า',
		'%you-are-in': 'คุณกำลังอยู่ใน',
		'%welcome-to': 'ยินดีต้อนรับสู่',
		'%loading': 'โหลด ...',
		'%processing': 'การประมวลผล ...',
		'%search': 'ค้นหา',
		'%search-for-terms': 'การค้นหาสำหรับคำ:',
		'%no-match-found': 'ไม่มีการแข่งขันพบ',
		'%matches-found': {
			'mixin': '[MIXIN] พบว่าตรงกัน'
		},
		'%menu': 'เมนู',
		'%settings': 'การตั้งค่า',
		'%languages': 'ภาษา',
		'%about': 'เกี่ยวกับ',
		'%current': '(ปัจจุบัน)',
		'%hide': 'ปิดบัง',
		'%error': 'ความผิดพลาด',
		'%colon': ':',
		'%hyphen': '-',
		'%start': 'เริ่มต้น',
		'%stop': 'หยุด',
		'%back': 'กลับ',
		'%new-window': ' (เปิดในหน้าต่างใหม่)',
		'%minute-ago': 'นาทีที่ผ่านมา',
		'%couple-of-minutes': 'ไม่กี่นาทีที่ผ่านมา',
		'%minutes-ago': {
			'mixin': '[MIXIN] นาทีที่ผ่านมา'
		},
		'%hour-ago': 'ชั่วโมงที่ผ่านมา',
		'%hours-ago': {
			'mixin': '[MIXIN] ชั่วโมงที่ผ่านมา'
		},
		'%days-ago': {
			'mixin': '[MIXIN] วันที่ผ่านมา'
		},
		'%yesterday': 'เมื่อวาน',

		'%next': 'ต่อไป',
		'%previous': 'ก่อน',
		'%first': 'แรก',
		'%last': 'ล่าสุด',

		/* Archived Web page template */
		'%archived-page': 'เวบเพจนี้ได้ถูกเก็บบนเว็บ.',
		/* Menu bar */
		'%sub-menu-help': '(เปิดเมนูย่อยที่มีใส่กุญแจและใกล้ชิดกับคีย์หนี)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'หยุดหมุนแท็บ',
			'enable': 'เริ่มหมุนแท็บ'
		},
		'%tab-list': 'รายการแท็บ',
		'%tab-panel-end-1': 'ในตอนท้ายของแผงแท็บนี้',
		'%tab-panel-end-2': 'กลับไปที่รายการแท็บ',
		'%tab-panel-end-3': 'หรือดำเนินการต่อในส่วนที่เหลือของหน้า.',
		/* Multimedia player */
		'%play': 'เล่น',
		'%pause': 'หยุด',
		'%open': 'เปิด',
		'%close': 'ปิด',
		'%rewind': 'ม้วนกลับ',
		'%fast-forward': 'ข้างหน้าอย่างรวดเร็ว',
		'%mute': {
			'enable': 'ปิด',
			'disable': 'เปิดเสียง'
		},
		'%closed-caption': {
			'disable': 'ซ่อนปิด captioning',
			'enable': 'แสดงปิด captioning'
		},
		'%closed-caption-error': 'ข้อผิดพลาดคำอธิบายปิดโหลด',
		'%audio-description': {
			'enable': 'เปิดใช้งานคำอธิบายเสียง',
			'disable': 'ปิดการใช้งานคำอธิบายเสียง'
		},
		'%progress-bar': 'ใช้ลูกศรซ้ายและปุ่มลูกศรขวาเพื่อเลื่อนและย้อนความคืบหน้าของสื่อที่',
		'%no-video': 'เบราว์เซอร์ของคุณไม่ปรากฏว่ามีความสามารถในการเล่นวิดีโอนี้โปรดดาวน์โหลดวิดีโอด้านล่าง',
		'%position': 'ตำแหน่งปัจจุบัน:',
		'%percentage': 'ร้อยละที่เล่นได้:',
		'%duration': 'รวมเวลา:',
		'%buffered': 'บัฟเฟอร์:',
		/* Share widget */
		'%favourite': 'โปรด',
		'%email': 'อีเมล์',
		'%share-text': 'ส่งหน้านี้ให้',
		'%share-hint': 'ด้วย {s} ',
		'%share-email-subject': 'หน้าที่น่าสนใจ',
		'%share-email-body': 'ฉันคิดว่าคุณอาจพบหน้านี้ที่น่าสนใจ:\n{t} ({u})',
		'%share-fav-title': '(บุ๊คมาร์คหน้านี้)',
		'%share-manual': 'กรุณาปิดกล่องโต้ตอบนี้และกดปุ่ม Ctrl-D เพื่อบุ๊คมาร์คหน้านี้.',
		'%share-showall': 'แสดงทั้งหมด ({n})',
		'%share-showall-title': 'เว็บไซต์บุ๊คมาร์คทั้งหมด',
		'%share-disclaimer' : 'รับรองของผลิตภัณฑ์หรือบริการใด ๆ จะไม่มีการแสดงหรือโดยนัย.',
		/* Form validation */
		'%form-not-submitted': 'รูปแบบไม่สามารถส่งเพราะ ',
		'%errors-found': ' พบข้อผิดพลาด.',
		'%error-found': ' ข้อผิดพลาดที่พบ.',
		/* Date picker */
		'%datepicker-hide': 'ซ่อนปฏิทิน',
		'%datepicker-show': 'เลือกวันที่จากปฏิทินสำหรับเขต',
		'%datepicker-selected': 'เลือก',
		/* Calendar */
		'%calendar-weekDayNames': ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
		'%calendar-monthNames': ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
		'%calendar': 'ปฏิทิน',
		'%calendar-currentDay': '(วันที่ปัจจุบัน)',
		'%calendar-goToLink': 'ไป<span class="wb-invisible">เดือนของปี</span>',
		'%calendar-goToTitle': 'ไปเดือนของปี',
		'%calendar-goToMonth': 'เดือน:',
		'%calendar-goToYear': 'ปี:',
		'%calendar-goToButton': 'ไป',
		'%calendar-cancelButton': 'ยกเลิก',
		'%calendar-previousMonth': 'เดือนก่อน: ',
		'%calendar-nextMonth': 'เดือนถัดไป: ',
		/* Slideout */
		'%show-toc': 'แสดง',
		'%show-text': 'แสดงตารางของเนื้อหา',
		'%hide-text': 'ซ่อนตารางของเนื้อหา',
		'%table-contents': 'สารบัญ',
		/* Lightbox */
		'%lb-current': '{current} รายการจาก {total}',
		'%lb-next': 'รายการถัดไป',
		'%lb-prev': 'รายการก่อนหน้า',
		'%lb-xhr-error': 'เนื้อหานี้ไม่สามารถโหลด.',
		'%lb-img-error': 'ภาพนี้ไม่สามารถโหลด.',
		'%lb-slideshow': 'สไลด์โชว์',
		/* jQuery Mobile */
		'%jqm-expand': 'คลิกที่นี่เพื่อขยายเนื้อหา',
		'%jqm-collapse': 'คลิกเพื่อยุบเนื้อหา',
		'%jqm-clear-search': 'ล้างการค้นหา',
		'%jqm-filter': 'กรองรายการ',
		'%jqm-tbl-col-toggle': 'คอลัมน์ ...',
		/* Charts widget */
		'%table-mention': 'ตาราง',
		'%table-following': 'แผนภูมิ รายละเอียดในตารางต่อไปนี้.',
		/* Session timeout */
		'%st-timeout-msg': 'เซสชั่นของคุณกำลังจะหมดอายุคุณมีเวลาจนถึงวัน #expireTime# เพื่อเปิดใช้งานปุ่ม "OK" ด้านล่างเพื่อขยายเซสชั่นของคุณ.',
		'%st-msgbox-title': 'เตือนหมดเวลา',
		'%st-already-timeout-msg': 'ขออภัยเซสชันของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบอีกครั้ง.',
		/* Toggle details */
		'%td-toggle': 'สลับทั้งหมด',
		'%td-open': 'ขยายทั้งหมด',
		'%td-close': 'ย่อทั้งหมด',
		'%td-ttl-open': 'ขยายส่วนทั้งหมดของเนื้อหา',
		'%td-ttl-close': 'ยุบทุกส่วนของเนื้อหา',
		/* Table enhancement */
		'%sSortAscending': ': เปิดใช้งานสำหรับการจัดเรียงจากน้อยไปมาก',
		'%sSortDescending': ': เปิดใช้งานสำหรับการจัดเรียงจากมากไปน้อย',
		'%sEmptyTable': 'ไม่มีข้อมูลในตาราง',
		'%sInfo': 'แสดง _START_-_END_ จาก _TOTAL_ รายการ',
		'%sInfoEmpty': 'แสดง 0-0 จาก 0 รายการ',
		'%sInfoFiltered': '(กรองจาก _MAX_ รายการทั้งหมด)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'แสดงรายการ _MENU_',
		/* Geomap */
		'%geo-mapcontrol': 'การควบคุมแผนที่',
		'%geo-zoomin': 'ขยาย',
		'%geo-zoomout': 'ย่อ',
		'%geo-zoomworld': 'การซูมที่ต้องการ map ขอบเขต',
		'%geo-zoomfeature': 'ซูมไปที่องค์ประกอบ',
		'%geo-scaleline': 'มาตราส่วนแผนที่',
		'%geo-mouseposition': 'ละติจูดและลองจิจูดของเคอร์เซอร์ของเมาส์',
		'%geo-ariamap': 'วัตถุแผนที่ คำอธิบายของคุณลักษณะแผนที่อยู่ในตารางด้านล่าง.',
		'%geo-accessibilize': '<strong>ผู้ใช้แป้นพิมพ์:</strong> เมื่อแผนที่จะอยู่ในโฟกัสใช้ปุ่มลูกศรเพื่อเลื่อนแผนที่และคีย์บวกและลบเพื่อซูม ปุ่มลูกศรจะไม่เลื่อนแผนที่เมื่อซูมที่มีขอบเขตแผนที่.',
		'%geo-accessibilizetitle': 'คำแนะนำ: แผนที่นำร่อง',
		'%geo-togglelayer': 'สลับการแสดงผลของชั้น',
		'%geo-hiddenlayer': 'ชั้นนี้ซ่อนอยู่.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis-แคนาดาฐานแผนที่ (ภาษาอังกฤษหรือภาษาฝรั่งเศสเท่านั้น)',
		'%geo-select': 'เลือก',
		'%geo-labelselect': 'ตรวจสอบเพื่อเลือกองค์ประกอบบนแผนที่',
		/* Disable/enable PE */
		'%pe-disable': 'เวอร์ชันพื้นฐานของ HTM​​L',
		'%pe-enable': 'รุ่นมาตรฐาน'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: TH (Thai; ไทย)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "โปรดระบุ",
		remote: "โปรดแก้ไขให้ถูกต้อง",
		email: "โปรดระบุที่อยู่อีเมล์ที่ถูกต้อง",
		url: "โปรดระบุ URL ที่ถูกต้อง",
		date: "โปรดระบุวันที่ ที่ถูกต้อง",
		dateISO: "โปรดระบุวันที่ ที่ถูกต้อง (ระบบ ISO).",
		number: "โปรดระบุทศนิยมที่ถูกต้อง",
		digits: "โปรดระบุจำนวนเต็มที่ถูกต้อง",
		creditcard: "โปรดระบุรหัสบัตรเครดิตที่ถูกต้อง",
		equalTo: "โปรดระบุค่าเดิมอีกครั้ง",
		accept: "โปรดระบุค่าที่มีส่วนขยายที่ถูกต้อง",
		maxlength: $.validator.format("โปรดอย่าระบุค่าที่ยาวกว่า {0} อักขระ"),
		minlength: $.validator.format("โปรดอย่าระบุค่าที่สั้นกว่า {0} อักขระ"),
		rangelength: $.validator.format("โปรดอย่าระบุค่าความยาวระหว่าง {0} ถึง {1} อักขระ"),
		range: $.validator.format("โปรดระบุค่าระหว่าง {0} และ {1}"),
		max: $.validator.format("โปรดระบุค่าน้อยกว่าหรือเท่ากับ {0}"),
		min: $.validator.format("โปรดระบุค่ามากกว่าหรือเท่ากับ {0}")
	});
}(jQuery));