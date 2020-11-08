/* global Metro */
(function(Metro , $) {
  'use strict';

  var Utils = Metro.utils;
  var startMenuDefaultConfig = {
    popover: null ,
    sideNavStatus: false ,
    powerPopoverStatus: false
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
      var that = this , element = this.element , o = this.options;
      var sideNav = element.find('.sidenav-simple');
      var powerBTN = element.find('#power-popover');

      $('[data-target="' + element.attr('data-role') + '"]').on(Metro.events.click , function() {
        element.toggle();
      });

      sideNav.on(Metro.events.enter , function() {
        o.sideNavStatus = true;
        that.expandSideNavbar();
      });

      sideNav.on(Metro.events.leave , function() {
        o.sideNavStatus = false;
        that.miniSideNavbar();
      });

      powerBTN.on(Metro.events.click , function() {
        that.createPopoverEvents(powerBTN);
        o.powerPopoverStatus = !o.powerPopoverStatus;
        if(o.popover !== null) {
          if(o.popover.popovered) {
            o.popover.hide();
          } else {
            o.popover.show();
          }
        }
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
          o.powerPopoverStatus = true;
          that.expandSideNavbar();
        });

        popover.popover.on(Metro.events.leave , function() {
          o.powerPopoverStatus = false;
          that.miniSideNavbar();
        });
      };
    } ,

    expandSideNavbar: function() {
      var o = this.options;
      var sideNav = this.element.find('.sidenav-simple');
      if (o.sideNavStatus || o.powerPopoverStatus) {
        sideNav.addClass('sidenav-simple-expand-xxl win-shadow hover');
        if(o.popover !== null) {
          o.popover.show();
        }
      }
    } ,

    miniSideNavbar: function() {
      var o = this.options;
      var sideNav = this.element.find('.sidenav-simple');
      if(!o.sideNavStatus && !o.powerPopoverStatus) {
        if(o.popover !== null) {
          o.popover.hide();
        }
        sideNav.removeClass('sidenav-simple-expand-xxl win-shadow hover');
      }
    }
  });
}(Metro , m4q));