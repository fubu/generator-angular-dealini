(function () {
  'use strict';

  describe('<%= names.service %>', function () {
    var Srv;

    beforeEach(function () {
      module('<%= names.module %>');

      inject(function (<%= names.service %>) {
        Srv = <%= names.service %>;
      });
    });

    it('should exist', function () {
      expect(!!Srv).toBe(true);
    });

    it('should have the barProp initially set', inject(function () {
      expect(Srv.barProp).toBeDefined();
      expect(Srv.barProp instanceof Date).toBe(true);
    }));

    it('should correctly resolve the async promise', inject(function () {
      var promise = Srv.asyncFoo();
      promise.then(function (result) {
        expect(result).toEqual('someProp has a value');
      });
    }));
  });

}());
