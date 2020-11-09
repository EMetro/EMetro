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
      var o = this.options;
      var element = this.element;

      o.elements.sideNav = element.find(o.elements.sideNav);
      o.elements.powerBTN = element.find(o.elements.powerBTN);
      o.elements.expandBTN = element.find(o.elements.expandBTN);
      o.elements.powerPopover = o.elements.powerBTN.find(o.elements.powerPopover);
      o.elements.startBTN = $(document).find(o.elements.startBTN);
    },

    _createEvents: function () {
      var o = this.options , that = this;
      var element = this.element;

      o.elements.expandBTN.on(Metro.events.click , function() {
        o.elements.sideNav.toggleClass(o.sideNavToggleCls);
      });

      o.elements.startBTN.on(Metro.events.click , function() {
        element.toggle();
      });

      o.elements.sideNav.on(Metro.events.enter , function() {
        o.elements.sideNav.addClass(o.sideNavToggleCls);
      });

      o.elements.sideNav.on(Metro.events.leave , function() {
        that.hidePowerPopover();
        o.elements.sideNav.removeClass(o.sideNavToggleCls);
      });

      o.elements.powerBTN.on(Metro.events.click , function() {
        o.elements.powerPopover.toggleClass('d-none');
      });

      o.elements.powerPopover.on(Metro.events.leave , function() {
        that.hidePowerPopover();
      });
    } ,

    hidePowerPopover: function() {
      this.options.elements.powerPopover.addClass('d-none');
    }
  });
}(Metro , m4q));