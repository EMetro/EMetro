/* global Metro */
(function(Metro , $) {
  'use strict';

  var Utils = Metro.utils;
  var startMenuDefaultConfig = {
    elements: {
      sideNav: '.sidenav-simple' ,
      powerBTN: '[data-role="power-button"]' ,
      expandBTN: '[data-role="start-menu-expand"]' ,
      powerPopover: 'ul' ,
      startBTN: '[data-target="start-menu"]'
    } ,
    sideNavToggleCls: 'sidenav-simple-expand-xxl win-shadow hover'
  };

  Metro.startMenuSetup = function (options) {
    startMenuDefaultConfig = $.extend({}, startMenuDefaultConfig, options);
  };

  if (typeof window["metroStartMenuSetup"] !== undefined) {
    Metro.startMenuSetup(window["metroStartMenuSetup"]);
  }

  Metro.Component('start-menu', {
    init: function (options, elem) {
      this._super(elem, options, startMenuDefaultConfig, {
          id: Utils.elementId('start-menu')
      });

      return this;
    },

    _create: function () {
      var element = this.element;

      this._createStructure();
      this._createEvents();

      this._fireEvent("start-menu-create", {
        element: element
      });
    },

    _createStructure: function () {
      var structure = '';

      var o = this.options;
      var element = this.element;

      o.elements.sideNav = element.find(o.elements.sideNav);
      o.elements.powerBTN = element.find(o.elements.powerBTN);
      o.elements.expandBTN = element.find(o.elements.expandBTN);
      o.elements.powerPopover = o.elements.powerBTN.find(o.elements.powerPopover);
      o.elements.startBTN = $(document).find(o.elements.startBTN);
    },

    _createEvents: function () {
      var o = this.options;
      var that = this;

      $(document).on(Metro.events.click , function(e) {
        var target = $(e.target);
        
        if((target.attr('data-role') !== 'start-menu' && target.parents('[data-role="start-menu"]').length <= 0) &&
            (target.attr('data-target') !== 'start-menu' && target.parents('[data-target="start-menu"]').length <= 0)) {
          that.setStartMenuStatus(Metro.statuses.HIDE);
        }
      });

      o.elements.expandBTN.on(Metro.events.click , function() {
        that.setSideNavStatus(Metro.statuses.TOGGLE);
      });

      o.elements.startBTN.on(Metro.events.click , function() {
        that.setStartMenuStatus(Metro.statuses.TOGGLE);
      });

      o.elements.sideNav.on(Metro.events.enter , function() {
        that.setSideNavStatus(Metro.statuses.SHOW);
      });

      o.elements.sideNav.on(Metro.events.leave , function() {
        that.setSideNavStatus(Metro.statuses.HIDE);
      });

      o.elements.powerBTN.on(Metro.events.click , function() {
        that.setPowerPopoverStatus(Metro.statuses.TOGGLE);
      });

      o.elements.powerPopover.on(Metro.events.leave , function() {
        that.setPowerPopoverStatus(Metro.statuses.HIDE);
      });
    } ,

    setStartMenuStatus: function(s) {
      var element = this.element;

      switch(s) {
        case Metro.statuses.SHOW:
          element.show();
          break;
        case Metro.statuses.HIDE:
          element.hide();
          break;
        case Metro.statuses.TOGGLE:
          element.toggle();
          break;
      }
    } ,

    setPowerPopoverStatus: function(s) {
      var powerPopover = this.options.elements.powerPopover;

      switch(s) {
        case Metro.statuses.SHOW:
          powerPopover.removeClass('d-none');
          break;
        case Metro.statuses.HIDE:
          powerPopover.addClass('d-none');
          break;
        case Metro.statuses.TOGGLE:
          powerPopover.toggleClass('d-none');
          break;
      }
    } ,

    setSideNavStatus: function(s) {
      var o = this.options;
      var sideNav = o.elements.sideNav;

      switch(s) {
        case Metro.statuses.SHOW:
          sideNav.addClass(o.sideNavToggleCls);
          break;
        case Metro.statuses.HIDE:
          this.setPowerPopoverStatus(s);
          sideNav.removeClass(o.sideNavToggleCls);
          break;
        case Metro.statuses.TOGGLE:
          sideNav.toggleClass(o.sideNavToggleCls);
          break;
      }
    }
  });
}(Metro , m4q));