(function (module) {
  'use strict';

  module.controller('<%= names.controller %>', function (<% if (options.service) { %><%= names.service %><% } %>) {

    var vm = {
      foo: doFoo,
<% if (options.service) { %>      barSrv: <%= names.service %>,<% } %>
      barProp: null
    };

    init();
    return vm;

    function init() {
      // TODO: all initialization code for this controller goes here
      vm.barProp = 'This property is bound once and not watched afterwards.';
    }

    function doFoo() {
      vm.barProp = 'So you should never see this string.';
    }

  });

}(angular.module('<%= names.module %>')));
