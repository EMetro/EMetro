/* global Metro */
(function(Metro , $) {
  'use strict';

  var Utils = Metro.utils;
  var startMenuDefaultConfig = {};

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
      this._createStructure();
      this._createEvents();
    },

    _createStructure: function () {
      var element = this.element;

      element.addClass("start-menu");
    },

    _createEvents: function () {
      var element = this.element;
      var sideNav = element.find('.sidenav-simple');

      $('[data-target="' + element.attr('data-role') + '"]').on(Metro.events.click , function() {
        element.toggle();
      });

      sideNav.on(Metro.events.enter , function() {
        sideNav.addClass('sidenav-simple-expand-xxl win-shadow hover');
      });

      sideNav.on(Metro.events.leave , function() {
        sideNav.removeClass('sidenav-simple-expand-xxl win-shadow hover');
      });
    }
  });
}(Metro , m4q));