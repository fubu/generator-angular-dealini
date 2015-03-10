(function (module) {
  'use strict';

  module.config(function (<% if (options.route) { %>$stateProvider<% } %>) {
    // module configuration, e.g. route definitions for this module
<% if (options.route) { %>
    $stateProvider.state('<%= names.route %>', {
      url: '/<%= names.route %>',
      controller: '<%= names.controller %>',
      controllerAs: '<%= names.controllerAs %>',
      templateUrl: '<%= names.templateUrl %>'
    });
<% } %>
  });

}(angular.module('<%= names.module %>', [<% if (options.route) { %>
  'ui.router'
<% } %>])));
