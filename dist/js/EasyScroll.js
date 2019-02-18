(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.EasyScroll = factory());
}(this, function () { 'use strict';

  var EasyScroll = {
    handleEvent: function(scopeElm, triggerSelector, type, func, isRemove) {
      if ( isRemove === void 0 ) isRemove = false;

      var els = scopeElm.querySelectorAll(triggerSelector);
      if (els === null || !els.length) { return; }
      for (var i = 0, n = els.length; i < n; i++) {
        var listener = {
          handleEvent: func,
          scopeElm: scopeElm,
          eventElm: els[i],
          triggerSelector: triggerSelector,
        };
        if (isRemove) {
          els[i].removeEventListener(type, listener);
        } else {
          els[i].addEventListener(type, listener);
        }
      }
    },

    init: function(scopeElm, options) {
      if ( options === void 0 ) options = {};

      if (scopeElm === undefined) { scopeElm = document; }

      var selector = (options.triggerSelector !== undefined) ?
        options.triggerSelector : '.js-scroll';
      this.handleEvent(scopeElm, selector, 'click', this.scroll);
    },

    destroy: function(scopeElm, options) {
      if ( options === void 0 ) options = {};

      if (scopeElm === undefined) { scopeElm = document; }

      var selector = (options.triggerSelector !== undefined) ?
        options.triggerSelector : '.js-scroll';
      this.handleEvent(scopeElm, selector, 'click', this.scroll, true);
    },

    scroll: function(event) {
      event.preventDefault();

      var ajustHeight = this.eventElm.dataset.header_ajust !== undefined ?
        parseInt(this.eventElm.dataset.header_ajust) : 0;
      var headerSelector = this.eventElm.dataset.header !== undefined ?
        this.eventElm.dataset.header : '';

      var duration = 500;
      var easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; };

      var targetElm = document.querySelector(this.eventElm.getAttribute('href'));
      if (!targetElm) { return; }
      var targetPos = targetElm.getBoundingClientRect().top;
      if (ajustHeight != 0) {
        var existsHeader = document.querySelector(headerSelector) !== null;
        if (existsHeader) { targetPos += ajustHeight; }
      }
      var scrollElm = (function() {
        if ('scrollingElement' in document) { return document.scrollingElement; }
        if (navigator.userAgent.indexOf('WebKit') != -1) { return document.body; }
        return document.documentElement;
      })();
      var scrollFrom = scrollElm.scrollTop;
      var startTime = Date.now();
      (function loop() {
        var currentTime = Date.now() - startTime;
        if(currentTime < duration) {
          scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
          window.requestAnimationFrame(loop);
        } else {
          scrollTo(0, targetPos + scrollFrom);
        }
      })();
    }
  };

  return EasyScroll;

}));
