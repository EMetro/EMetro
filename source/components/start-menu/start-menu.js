/* global Metro */
(function(Metro , $) {
  'use strict';

  var Utils = Metro.utils;
  var startMenuDefaultConfig = {
    popover: null
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
      var element = this.element;

      element.addClass("start-menu");
    },

    _createEvents: function () {
      var that = this , element = this.element;
      var sideNav = element.find('.sidenav-simple');
      var powerBTN = element.find('#power-popover');

      $('[data-target="' + element.attr('data-role') + '"]').on(Metro.events.click , function() {
        element.toggle();
      });

      sideNav.on(Metro.events.enter , function() {
        that.expandSideNavbar();
      });

      sideNav.on(Metro.events.leave , function() {
        that.miniSideNavbar();
      });

      powerBTN.on(Metro.events.click , function() {
        that.createPopoverEvents(powerBTN);
      });
    } ,

    createPopoverEvents: function(elm) {
      var that = this , popover = Metro.getPlugin(elm , 'popover');
      var o = this.options;

      popover.options.onPopoverCreate = function() {
        o.popover = popover;

        popover.options.onPopoverHide = function() {
          o.popover = null;
        };
  
        popover.popover.on(Metro.events.enter , function() {
          that.expandSideNavbar();
        });
      };
    } ,

    expandSideNavbar: function() {
      var sideNav = this.element.find('.sidenav-simple');
      sideNav.addClass('sidenav-simple-expand-xxl win-shadow hover');
    } ,

    miniSideNavbar: function() {
      var sideNav = this.element.find('.sidenav-simple');
      sideNav.removeClass('sidenav-simple-expand-xxl win-shadow hover');
    }
  });
}(Metro , m4q));