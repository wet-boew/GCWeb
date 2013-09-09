/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Korean dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'ko',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'coréen',
		'%lang-native': '한국어',
		'%all': '모든',
		'%home': '집',
		'%main-page': '메인 페이지',
		'%top-of-page': '맨 위로',
		'%you-are-in': '당신은에',
		'%welcome-to': '에 오신 것을 환영합니다:',
		'%loading': '로드 중 ...',
		'%processing': '처리 중 ...',
		'%search': '검색',
		'%search-for-terms': '용어 검색 :',
		'%no-match-found': '일치하는 결과가 없습니다',
		'%matches-found': {
			'mixin': '[MIXIN] 일치하는 검색 결과가'
		},
		'%menu': '메뉴',
		'%settings': '설정',
		'%languages': '언어',
		'%about': '약',
		'%current': '(현재)',
		'%hide': '숨기기',
		'%error': '오류',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': '출발',
		'%stop': '정지',
		'%back': '뒤로',
		'%new-window': ' (새 창에서 열립니다)',
		'%minute-ago': '분 전',
		'%couple-of-minutes': '분 전에 몇',
		'%minutes-ago': {
			'mixin': '[MIXIN] 분전'
		},
		'%hour-ago': '한 시간 전에',
		'%hours-ago': {
			'mixin': '[MIXIN]시간 전'
		},
		'%days-ago': {
			'mixin': '[MIXIN] 일 전'
		},
		'%yesterday': '어제',

		'%next': '다음',
		'%previous': '이전',
		'%first': '처음으로',
		'%last': '마지막',

		/* Archived Web page template */
		'%archived-page': '이 웹 페이지는 웹에 보관되었습니다.',
		/* Menu bar */
		'%sub-menu-help': '(키와 Esc 키와 밀접한 입력으로 하위 메뉴를 엽니 다)',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': '탭 회전을 중지',
			'enable': '탭 회전을 시작'
		},
		'%tab-list': '탭 목록',
		'%tab-panel-end-1': '이 탭 패널의 끝.',
		'%tab-panel-end-2': '탭 목록으로 돌아 가기',
		'%tab-panel-end-3': '또는 페이지의 나머지를 계속합니다.',
		/* Multimedia player */
		'%play': '놀이',
		'%pause': '중지',
		'%open': '열기',
		'%close': '가까운',
		'%rewind': '되감기',
		'%fast-forward': '빠른 앞으로',
		'%mute': {
			'enable': '음소거',
			'disable': '음소거 해제'
		},
		'%closed-caption': {
			'disable': '숨기기 캡션 휴무',
			'enable': '쇼는 캡션 휴무'
		},
		'%closed-caption-error': '로드하는 중 오류가 발생 자막',
		'%audio-description': {
			'enable': '오디오 설명을 사용',
			'disable': '오디오 설명을 해제합니다'
		},
		'%progress-bar': '미디어의 진행 상황을 향상하고 되감기 할 왼쪽 화살표 및 오른쪽 화살표 키를 사용하여',
		'%no-video': '귀하의 브라우저가 기능이 동영상을 재생해야 할 표시되지 않습니다 아래의 동영상을 다운로드하십시오',
		'%position': '현재 위치 :',
		'%percentage': '재생 비율 :',
		'%duration': '총 시간',
		'%buffered': '버퍼',
		/* Share widget */
		'%favourite': '누나 찾아서 병원에',
		'%email': '이메일',
		'%share-text': '이 페이지를 공유',
		'%share-hint': '{s} 로 ',
		'%share-email-subject': '흥미 페이지',
		'%share-email-body': '당신이이 페이지가 재미있을 거라고 생각:\n{t} ({u})',
		'%share-fav-title': '(이 페이지를 즐겨 찾기에)',
		'%share-manual': '이 대화 상자를 닫고이 페이지를 즐겨 찾기에 추가 Ctrl 키를-D를 누르십시오.',
		'%share-showall': '모두 ({n}) 표시',
		'%share-showall-title': '모든 북마크 사이트',
		'%share-disclaimer' : '제품이나 서비스의 어떠한 보증을 표현하거나 암시합니다.',
		/* Form validation */
		'%form-not-submitted': '양식을 제출 할 수 없습니다 때문에 ',
		'%errors-found': ' 오류가 발견되었습니다.',
		'%error-found': ' 오류가 발견되었습니다.',
		/* Date picker */
		'%datepicker-hide': '캘린더 숨기기',
		'%datepicker-show': '필드에 달력에서 날짜를 선택:',
		'%datepicker-selected': '선택된',
		/* Calendar */
		'%calendar-weekDayNames': ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		'%calendar-monthNames': ['1월', '2월', '행진', '4월', '할 수있다', '6월', '7월', '위엄있는', '9월', '10월', '11월', '12월'],
		'%calendar': '달력',
		'%calendar-currentDay': '(현재 일)',
		'%calendar-goToLink': '<span class="wb-invisible">년 개월</span>로 이동',
		'%calendar-goToTitle': '년 개월로 이동',
		'%calendar-goToMonth': '월:',
		'%calendar-goToYear': '년:',
		'%calendar-goToButton': '가다',
		'%calendar-cancelButton': '취소',
		'%calendar-previousMonth': '이전 월: ',
		'%calendar-nextMonth': '다음 월: ',
		/* Slideout */
		'%show-toc': '표시',
		'%show-text': '목차보기',
		'%hide-text': '목차 숨기기',
		'%table-contents': '차례',
		/* Lightbox */
		'%lb-current': '{total} 항목 {current}',
		'%lb-next': '다음 항목',
		'%lb-prev': '이전 항목',
		'%lb-xhr-error': '이 콘텐츠를로드하지 못했습니다.',
		'%lb-img-error': '이 이미지를로드하지 못했습니다.',
		'%lb-slideshow': '슬라이드 쇼',
		/* jQuery Mobile */
		'%jqm-expand': '내용을 확장하려면 클릭',
		'%jqm-collapse': '내용을 축소하려면 클릭',
		'%jqm-clear-search': '맑은 검색',
		'%jqm-filter': '필터 항목',
		'%jqm-tbl-col-toggle': '열...',
		/* Charts widget */
		'%table-mention': '표',
		'%table-following': '차트. 다음 테이블의 세부 사항.',
		/* Session timeout */
		'%st-timeout-msg': '귀하의 세션이 만료 될. 당신은 #expireTime# 세션을 연장하려면 아래에있는 "확인" 버튼을 활성화 할 때까지합니다.',
		'%st-msgbox-title': '세션 시간 초과 경고',
		'%st-already-timeout-msg': '미안 세션이 이미 만료되었습니다. 다시 로그인 해주십시오.',
		/* Toggle details */
		'%td-toggle': '모두 전환',
		'%td-open': '모두 확장',
		'%td-close': '모두 접기',
		'%td-ttl-open': '의 모든 콘텐츠 섹션을 확장합니다',
		'%td-ttl-close': '의 모든 콘텐츠 섹션을 축소',
		/* Table enhancement */
		'%sSortAscending': ': 정렬 오름차순을위한 활성화',
		'%sSortDescending': ': 정렬 내림차순에 대한 활성화',
		'%sEmptyTable': '데이터가 테이블에 사용할 수 없습니다',
		'%sInfo': '_TOTAL_ 항목 _END_-_START_보기',
		'%sInfoEmpty': '0 항목 0-0보기',
		'%sInfoFiltered': '(_MAX_ 총 ​​항목에서 제외)',
		'%sInfoThousands': ',',
		'%sLengthMenu': '_MENU_ 항목을 표시',
		/* Geomap */
		'%geo-mapcontrol': '지도 제어',
		'%geo-zoomin': '확대',
		'%geo-zoomout': '축소',
		'%geo-zoomworld': '범위를 매핑 할 수 확대',
		'%geo-zoomfeature': '요소로 확대',
		'%geo-scaleline': '지도 스케일',
		'%geo-mouseposition': '마우스 커서의 위도와 경도',
		'%geo-ariamap': '지도 개체입니다. 지도 기능의 설명은 아래 표에 나와 있습니다.',
		'%geo-accessibilize': '<strong>키보드 사용자 :</strong>지도 초점이 때,지도와 확대 할 수있는 플러스 (+) 및 마이너스 키를 이동하려면 화살표 키를 사용합니다. 지도 범위 확대 할 때 화살표 키를지도를 이동하지 않습니다.',
		'%geo-accessibilizetitle': '방법 :지도 탐색',
		'%geo-togglelayer': '레이어의 표시를 전환',
		'%geo-hiddenlayer': '이 층은 현재 숨겨져 있습니다!',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - 캐나다 기본지도 (영어 나 불어 만)',
		'%geo-select': '선택',
		'%geo-labelselect': '지도에서 요소를 선택하려면 선택',
		/* Disable/enable PE */
		'%pe-disable': '기본 HTML 버전',
		'%pe-enable': '표준 버전'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: KO (Korean; 한국어)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "필수 항목입니다.",
		remote: "항목을 수정하세요.",
		email: "유효하지 않은 E-Mail주소입니다.",
		url: "유효하지 않은 주소입니다.",
		date: "옳바른 날짜를 입력하세요.",
		dateISO: "옳바른 날짜(ISO)를 입력하세요.",
		number: "유효한 숫자가 아닙니다.",
		digits: "숫자만 입력 가능합니다.",
		creditcard: "신용카드번호가 바르지 않습니다.",
		equalTo: "같은값을 다시 입력하세요.",
		accept: "옳바른 확장자가 아닙니다.",
		maxlength: $.format("{0}자를 넘을 수 없습니다. "),
		minlength: $.format("{0}자 이하로 입력하세요."),
		rangelength: $.format("문자 길이를 {0} 에서 {1} 사이의로 입력하세요."),
		range: $.format("{0} 에서 {1} 값을 입력하세요."),
		max: $.format("{0} 이하의 값을 입력하세요."),
		min: $.format("{0} 이상의 값을 입력하세요.")
	});
}(jQuery));
