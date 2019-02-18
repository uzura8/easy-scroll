const smoothscroll = {
  handleEvent: function(scopeElm, triggerSelector, type, func, isRemove = false) {
    const els = scopeElm.querySelectorAll(triggerSelector);
    if (els === null || !els.length) return;
    for (let i = 0, n = els.length; i < n; i++) {
      let listener = {
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

  init: function(scopeElm, options = {}) {
    if (scopeElm === undefined) scopeElm = document;

    const selector = (options.triggerSelector !== undefined) ?
      options.triggerSelector : '.js-smoothscroll';
    this.handleEvent(scopeElm, selector, 'click', this.scroll);
  },

  destroy: function(scopeElm, options = {}) {
    if (scopeElm === undefined) scopeElm = document;

    const selector = (options.triggerSelector !== undefined) ?
      options.triggerSelector : '.js-smoothscroll';
    this.handleEvent(scopeElm, selector, 'click', this.scroll, true);
  },

  scroll: function(event) {
    event.preventDefault();
    const ajustHeight = this.eventElm.dataset.header_ajust !== undefined ?
      parseInt(this.eventElm.dataset.header_ajust) : 0;
    const headerSelector = this.eventElm.dataset.header !== undefined ?
      parseInt(this.eventElm.dataset.header) : 0;

    const duration = 500;
    const easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; };

    const targetElm = document.querySelector(this.eventElm.getAttribute('href'));
    if (!targetElm) return;
    let targetPos = targetElm.getBoundingClientRect().top;
    if (ajustHeight != 0) {
      const existsHeader = document.querySelector(headerSelector) !== null;
      if (existsHeader) targetPos += ajustHeight;
    }
    const scrollElm = (function() {
      if ('scrollingElement' in document) return document.scrollingElement;
      if (navigator.userAgent.indexOf('WebKit') != -1) return document.body;
      return document.documentElement;
    })();
    const scrollFrom = scrollElm.scrollTop;
    const startTime = Date.now();
    (function loop() {
      const currentTime = Date.now() - startTime;
      if(currentTime < duration) {
        scrollTo(0, easing(currentTime, scrollFrom, targetPos, duration));
        window.requestAnimationFrame(loop);
      } else {
        scrollTo(0, targetPos + scrollFrom);
      }
    })();
  }
}

export default smoothscroll;
