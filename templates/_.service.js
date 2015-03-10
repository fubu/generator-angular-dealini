(function (module) {
  'use strict';

  module.factory('<%= names.service %>', function ($q) {

    var vm = {
      asyncFoo: doFooAsync,
      barProp: null
    };

    init();
    return vm;

    function init() {
      // TODO: all initialization code for this service goes here
      vm.barProp = new Date();
    }

    function doFooAsync() {
      return $q(function (resolve, reject) {
        // do async stuff and resolve/reject when the data is available
        if (vm.barProp) {
          resolve('someProp has a value');
        } else {
          reject('someProp is not yet set');
        }
      });
    }
  });

}(angular.module('<%= names.module %>')));
