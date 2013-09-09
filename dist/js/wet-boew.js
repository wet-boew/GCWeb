/*! Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW) wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 - v4.0.0-a1-development - 2013-09-09
 License: MIT */
(function($, window, document) {
  var $this, methods, _settings;
  $this = void 0;
  _settings = {
    "default": 'wet-boew'
  };
  methods = {
    init: function(options) {
      $this = $(this);
      $.extend(_settings, options || {});
      return $this;
    },
    show: function(onlyAria) {
      $this = $(this);
      return $this.each(function() {
        var elm;
        elm = $(this);
        elm.attr('aria-hidden', 'false');
        if (onlyAria == null) {
          return elm.removeClass('wb-invisible');
        }
      });
    },
    hide: function(onlyAria) {
      $this = $(this);
      return $this.each(function() {
        var elm;
        elm = $(this);
        elm.attr('aria-hidden', 'true');
        if (onlyAria == null) {
          return elm.addClass('wb-invisible');
        }
      });
    }
  };
  return $.fn.wb = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      return $.error("Method " + method + " does not exist on jquery.wb");
    }
  };
})(jQuery, window, document);

/*
	Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) 
	_plugin : Javascript Carousel
	_author : World Wide Web
	_notes  : A javascript carousel for WET-BOEW
	_licence: wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
*/

(function($, window, document) {
  $(document).on("wb.timerpoke", ".wb-carousel", function(event) {
    var _delay, _setting, _sldr;
    _sldr = $(this);
    if ((typeof _sldr.attr("data-delay")) === "undefined") {
      _sldr.trigger("carousel.init.wb");
      return void 0;
    }
    if (_sldr.hasClass("stopped")) {
      return void 0;
    }
    _setting = parseFloat(_sldr.attr("data-delay"));
    _delay = parseFloat(_sldr.attr("data-ctime"));
    _delay += 0.5;
    if (_setting < _delay) {
      _sldr.trigger("wb.shift");
      _delay = 0;
    }
    return _sldr.attr("data-ctime", _delay);
  });
  $(document).on("carousel.init.wb", ".wb-carousel", function(event) {
    var _interval, _sldr;
    _sldr = $(this);
    _interval = 6;
    if (_sldr.hasClass("slow")) {
      _interval = 9;
    }
    if (_sldr.hasClass("fast")) {
      _interval = 3;
    }
    _sldr.find(".item:not(.in)").addClass("out");
    return _sldr.attr("data-delay", _interval).attr("data-ctime", 0);
  });
  $(document).on("click", ".wb-carousel .prv, .wb-carousel .nxt, .wb-carousel .plypause", function(event) {
    var _action, _current, _elm, _items, _next, _sldr;
    event.preventDefault();
    _elm = $(this);
    _sldr = _elm.parents(".wb-carousel");
    _items = _sldr.find(".item");
    _current = parseInt(_items.index(".in"));
    _current = (_current < 0 ? 0 : _current);
    _action = _elm.attr("class");
    switch (_action) {
      case "prv":
        _next = ((_current - 1) < 0 ? _items.length - 1 : _current - 1);
        _elm.trigger("wb.shift", {
          shiftto: _next
        });
        break;
      case "nxt":
        _next = ((_current + 1) > _items.length ? 0 : _current + 1);
        _elm.trigger("wb.shift", {
          shiftto: _next
        });
        break;
      default:
        _sldr.toggleClass("stopped");
    }
    return _sldr.attr("data-ctime", 0);
  });
  $(document).on("wb.shift", ".wb-carousel", function(event) {
    var _current, _items, _next, _sldr;
    _sldr = $(this);
    _items = _sldr.find(".item");
    _current = _items.index(".in");
    _next = (event.shiftto ? event.shiftto : ((_current + 1) > _items.length ? 0 : _current + 1));
    _items.eq(_current).removeClass("in").addClass("out");
    return _items.eq(_next).removeClass("out").addClass("in");
  });
  return window._timer.add(".wb-carousel");
})(jQuery, window, document);

/*
Data Inview Plugin v1.0 - A simplified data-attribute driven plugin that responds to being in and out of the viewport.
Release: 31/07/2013
Author: WET Community


Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
*/

(function($, window, document) {
  $(document).on('wb.timerpoke', '.wb-inview', function(e) {
    var $message, $this;
    window._timer.remove('.wb-inview');
    $this = $(this);
    $message = $this.find('.pg-banner, .pg-panel');
    $message.attr('role', 'toolbar').attr('aria-hidden', 'true');
    $(window).on('scroll scrollstop resize', function(e) {
      return $this.trigger('scroll.wb-inview');
    });
    $this.on('scroll.wb-inview', function(e) {
      var elementHeight, elementWidth, scrollBottom, scrollLeft, scrollRight, scrollTop, viewportHeight, viewportWidth, x1, x2, y1, y2, _elm, _viewport;
      _elm = $(this);
      _viewport = $(window);
      elementWidth = _elm.outerWidth();
      elementHeight = _elm.outerHeight();
      viewportWidth = _viewport.width();
      viewportHeight = _viewport.height();
      scrollTop = _viewport.scrollTop();
      scrollLeft = _viewport.scrollLeft();
      scrollRight = scrollLeft + elementWidth;
      scrollBottom = scrollTop + viewportHeight;
      x1 = _elm.offset().left;
      x2 = x1 + elementWidth;
      y1 = _elm.offset().top;
      y2 = y1 + elementHeight;
      if ((scrollBottom < y1 || scrollTop > y2) || (scrollRight < x1 || scrollRight > x2)) {
        $message.removeClass('in').addClass('out').wb('hide', true);
      } else {
        $message.removeClass('out').addClass('in').wb('show', true);
      }
      return void 0;
    });
    return $this.trigger('scroll.wb-inview');
  });
  return window._timer.add('.wb-inview');
})(jQuery, window, document);

/*
	Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) 
	_plugin : Ajax Loader [ data-replace ]
	_author : World Wide Web
	_notes: A basic AjaxLoader wrapper for WET-BOEW
	_licence: wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
*/

(function($, window, document) {
  $.ajaxSettings.cache = false;
  $(document).on("wb.timerpoke", "[data-ajax-replace]", function(event) {
    var _elm, _url;
    _elm = $(this);
    _url = _elm.data("ajax-replace");
    _elm.load(_url, function() {
      return $(this).trigger("wb.ajax-replace-loaded");
    });
    window._timer.remove("[data-ajax-replace]");
    return void 0;
  });
  return window._timer.add("[data-ajax-replace]");
})(jQuery, window, document);

/*
	Web Experience Toolkit (WET) / Boîte à outils de l\'expérience Web (BOEW) 
	_plugin : Mega Menu
	_author : World Wide Web
	_notes: A Mega Menu for WET
	_licence: wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
*/

(function($, window, document) {
  $(document).on("wb.ajax-replace-loaded", ".wb-menu", function(event) {
    var _elm, _wlist;
    _elm = $(this);
    _wlist = _elm.find("li:has(.drp-dwn)");
    _wlist.find("> :header").addClass("wb-tle-lnk").append("<span class=\"expandicon\"></span>");
    return _wlist.attr("aria-haspopup", "false").attr("role", "presentation");
  });
  $(document).on("mouseenter focusin", ".wb-menu li:has(.drp-dwn)", function(event) {
    var _elm;
    _elm = $(this);
    _elm.parents(".wb-menu").first().find("[aria-haspopup]").attr("aria-haspopup", "false");
    return _elm.attr("aria-haspopup", "true");
  });
  return $(document).on("mouseleave focusout", ".wb-menu", function(event) {
    var _elm;
    _elm = $(this);
    return _elm.find("[aria-haspopup]").attr("aria-haspopup", "false");
  });
})(jQuery, window, document);
