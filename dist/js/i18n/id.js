/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: @wet-boew-build.version@
 *
 */
/*
----- Indonesian dictionary (il8n) ---
 */
(function() {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	};
	_pe.dic.ind = {
		'%lang-code': 'id',
		'%lang-eng': '@%lang-eng@',
		'%lang-fra': 'indonésien',
		'%lang-native': 'Bahasa Indonesia',
		'%all': 'Semua',
		'%home': 'Halaman Awal',
		'%main-page': 'Halaman utama',
		'%top-of-page': 'Halaman Atas',
		'%you-are-in': 'Anda berada di:',
		'%welcome-to': 'Selamat datang di:',
		'%loading': 'memuat ...',
		'%processing': 'pengolahan ...',
		'%search': 'Cari',
		'%search-for-terms': 'Cari istilah:',
		'%no-match-found': 'Tidak ditemukan kecocokan',
		'%matches-found': {
			'mixin': 'Ditemukan [MIXIN] kecocokan'
		},
		'%menu': 'Menu',
		'%settings': 'Pengaturan',
		'%languages': 'Bahasa',
		'%about': 'Tentang',
		'%current': '(saat ini)',
		'%hide': 'Sembunyikan',
		'%error': 'Error',
		'%colon': ':',
		'%hyphen': ' - ',
		'%start': 'Mulai',
		'%stop': 'Stop',
		'%back': 'Kembali',
		'%new-window': ' (Akan terbuka di jendela yang baru)',
		'%minute-ago': 'Satu menit yang lalu',
		'%couple-of-minutes': 'Beberapa menit yang lalu',
		'%minutes-ago': {
			'mixin': '[MIXIN] menit yang lalu'
		},
		'%hour-ago': 'Satu jam yang lalu',
		'%hours-ago': {
			'mixin': '[MIXIN] jam yang lalu'
		},
		'%days-ago': {
			'mixin': '[MIXIN] hari yang lalu'
		},
		'%yesterday': 'Kemarin',

		'%next': 'Berikutnya',
		'%previous': 'Sebelumnya',
		'%first': 'Pertama',
		'%last': 'Terakhir',

		/* Archived Web page template */
		'%archived-page': 'Halaman ini telah diarsip di dalam jejaring.',
		/* Menu bar */
		'%sub-menu-help': '(buka submenu dengan menekan tombol "enter" dan tutup dengan menekan tombol "escape")',
		/* Tabbed interface */
		'%tab-rotation': {
			'disable': 'Hentikan rotasi tab',
			'enable': 'Mulai rotasi tab'
		},
		'%tab-list': 'Tab daftar',
		'%tab-panel-end-1': 'Akhir ini panel tab.',
		'%tab-panel-end-2': 'Kembali ke daftar tab',
		'%tab-panel-end-3': 'atau melanjutkan ke seluruh halaman.',
		/* Multimedia player */
		'%play': 'Main',
		'%pause': 'Jeda',
		'%open': 'Buka',
		'%close': 'Tutup',
		'%rewind': 'Putar mundur',
		'%fast-forward': 'Putar maju',
		'%mute': {
			'enable': 'Redam suara',
			'disable': 'Aktifkan kembali suara'
		},
		'%closed-caption': {
			'disable': 'Sembunyikan subtitel',
			'enable': 'Tampilkan subtitel'
		},
		'%closed-caption-error': 'Galat saat memuat subtitel',
		'%audio-description': {
			'enable': 'Fungsikan desktripsi audio',
			'disable': 'Disfungsikan deskripsi audio'
		},
		'%progress-bar': 'gunakan tombol panah kiri dan kanan untuk memajukan dan memundurkan kemajuan media',
		'%no-video': 'Il tuo browser non sembra avere le capacità per riprodurre il video, scarica il video qui sotto',
		'%position': 'Posisi saat ini:',
		'%percentage': 'Playback persentase:',
		'%duration': 'Total waktu:',
		'%buffered': 'Terbuffer:',
		/* Share widget */
		'%favourite': 'Favorit',
		'%email': 'Email',
		'%share-text': 'Bagi halaman ini',
		'%share-hint': ' dengan {s} ',
		'%share-email-subject': 'Halaman menarik',
		'%share-email-body': 'Ho pensato che si potrebbe trovare interessante questa pagina:\n{t} ({u})',
		'%share-fav-title': '(bookmark halaman ini)',
		'%share-manual': 'Silakan tutup dialog ini dan tekan Ctrl-D untuk menyimpan.',
		'%share-showall': 'Tampilkan semua ({n})',
		'%share-showall-title': 'Semua halaman yang disimpan',
		'%share-disclaimer' : 'Tidak ada dukungan dari produk atau jasa yang tersurat maupun tersi',
		/* Form validation */
		'%form-not-submitted': 'Il modulo non poteva essere presentata in quanto ',
		'%errors-found': ' error ditemukan.',
		'%error-found': ' error ditemukan.',
		/* Date picker */
		'%datepicker-hide': 'Sembunyikan kalender',
		'%datepicker-show': 'Pilih satu tanggal pada kalender:',
		'%datepicker-selected': 'Sudah dipilih',
		/* Calendar */
		'%calendar-weekDayNames': ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
		'%calendar-monthNames': ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
		'%calendar': 'Kalender',
		'%calendar-currentDay': 'Hari ini',
		'%calendar-goToLink': 'Pilih<span class="invisible"> bulan dan tahun</span>',
		'%calendar-goToTitle': 'Pilih bulan dan tahun',
		'%calendar-goToMonth': 'Bulan:',
		'%calendar-goToYear': 'Tahun:',
		'%calendar-goToButton': 'Pilih',
		'%calendar-cancelButton': 'Batal',
		'%calendar-previousMonth': 'Bulan sebelumnya: ',
		'%calendar-nextMonth': 'Bulan berikutnya: ',
		/* Slideout */
		'%show-toc': 'Tampilkan',
		'%show-text': 'Tampilkan daftar isi',
		'%hide-text': 'Menyembunyikan daftar isi',
		'%table-contents': 'daftar isi',
		/* Lightbox */
		'%lb-current': 'Artikel ke-{current} dari {total}',
		'%lb-next': 'Artikel selanjutnya',
		'%lb-prev': 'Artikel sebelumnya',
		'%lb-xhr-error': 'Halaman tidak berhasil ditampilkan.',
		'%lb-img-error': 'Gambar ini tidak berhasil ditampilkan.',
		'%lb-slideshow': 'Pertunjukan slide',
		/* jQuery Mobile */
		'%jqm-expand': 'klik untuk memperbesar isi',
		'%jqm-collapse': 'klik untuk menyembunyikan isi',
		'%jqm-clear-search': 'Bersihkan pencarian',
		'%jqm-filter': 'Filter artikel',
		'%jqm-tbl-col-toggle': 'Kolom ...',
		/* Charts widget */
		'%table-mention': 'Tabel',
		'%table-following': 'Infografis. Detail pada tabel berikut.',
		/* Session timeout */
		'%st-timeout-msg': 'La sessione sta per scadere. Avete tempo fino al #expireTime# per attivare il pulsante "OK" in basso per estendere la vostra sessione.',
		'%st-msgbox-title': 'Sessione batas waktu peringatan',
		'%st-already-timeout-msg': 'Maaf sessione Anda sudah berakhir. Silahkan login kembali.',
		/* Toggle details */
		'%td-toggle': 'Beralih semua',
		'%td-open': 'Memperluas semua',
		'%td-close': 'Tutup semua',
		'%td-ttl-open': 'Memperluas semua bagian dari konten',
		'%td-ttl-close': 'Perkecil semua bagian dari konten',
		/* Table enhancement */
		'%sSortAscending': ': aktifkan untuk menaik semacam',
		'%sSortDescending': ': aktifkan untuk turun semacam',
		'%sEmptyTable': 'Tidak ada data yang tersedia dalam tabel',
		'%sInfo': 'Menampilkan _START_ sampai _END_ dari _TOTAL_ entri',
		'%sInfoEmpty': 'Menampilkan 0 sampai 0 dari 0 entri',
		'%sInfoFiltered': '(disaring dari _MAX_ entri total)',
		'%sInfoThousands': ',',
		'%sLengthMenu': 'Tampilkan _MENU_ entri',
		/* Geomap */
		'%geo-mapcontrol': 'Peta kontrol',
		'%geo-zoomin': 'Perbesar',
		'%geo-zoomout': 'Perkecil',
		'%geo-zoomworld': 'Zoom untuk memetakan sejauh',
		'%geo-zoomfeature': 'Zoom ke elemen',
		'%geo-scaleline': 'skala peta',
		'%geo-mouseposition': 'Lintang dan bujur dari kursor mouse',
		'%geo-ariamap': 'Peta objek. Deskripsi dari fitur peta dalam tabel di bawah ini.',
		'%geo-accessibilize': '<strong>Pengguna Keyboard:</strong> Bila peta dalam fokus, gunakan tombol panah untuk menggeser peta dan tombol plus dan minus untuk zoom. Tombol panah tidak akan menggeser peta ketika diperbesar sejauh peta.',
		'%geo-accessibilizetitle': 'Petunjuk: Peta navigasi',
		'%geo-togglelayer': 'Mengganti display lapisan',
		'%geo-hiddenlayer': 'Lapisan ini saat ini tersembunyi.',
		'%geo-basemapurl': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-basemaptitle': 'BaseMaps_CBMT3978',
		'%geo-basemapurltxt': 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
		'%geo-attributionlink': 'http://geogratis.gc.ca/geogratis/CBM_CBC?lang=en',
		'%geo-attributiontitle': 'GeoGratis - Canada peta dasar (bahasa Inggris atau Perancis hanya)',
		'%geo-select': 'Memilih',
		'%geo-labelselect': 'Periksa untuk memilih elemen pada peta',
		/* Disable/enable PE */
		'%pe-disable': 'Versi HTML dasar',
		'%pe-enable': 'Versi standar'
	};
	_pe.document.trigger('languageloaded');
	window.pe = _pe;
	return _pe;
}());
