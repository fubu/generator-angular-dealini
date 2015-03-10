(function () {
  'use strict';

  describe('<%= names.controller %>', function () {
    var Ctrl;
    var scope;

    beforeEach(function () {
      module('<%= names.module %>');

      inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        Ctrl = $controller('<%= names.controller %>', {$scope: scope});
      });
    });

    it('should exist', function () {
      expect(!!Ctrl).toBe(true);
    });

    it('should define and set the barProp property', function () {
      expect(Ctrl.barProp).toBeDefined();
      expect(Ctrl.barProp).toMatch('bound once');
    });

    it('should update the barProp property when calling foo()', function () {
      Ctrl.foo();
      expect(Ctrl.barProp).toMatch('never see this string');
    });
  });

}());
