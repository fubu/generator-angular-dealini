'use strict';

var DealiniSubGenerator = require('../base');
var util = require('../util');

var DealiniComponentGenerator = DealiniSubGenerator.extend({

  DEST_FOLDER: 'src/components/',
  INJECTOR_TAG: 'inject:component',
  GENERATOR_OPTS: ['service', 'directive', 'controller', 'view'],

  createFiles: function createComponentFiles() {
    if (this.options.directive) {
      this.options.controller = true;
      this.options.view = true;
    }

    var srcFiles = util.collectTemplates(this.options);
    var componentNames = util.compileComponentNames(
        this.name, null, this.options.route);

    this._copyTemplates(srcFiles, componentNames);
  }

});

module.exports = DealiniComponentGenerator;
