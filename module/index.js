'use strict';

var DealiniSubGenerator = require('../base');
var util = require('../util');

var DealiniModuleGenerator = DealiniSubGenerator.extend({

  DEST_FOLDER: 'src/',
  INJECTOR_TAG: 'inject:module',
  GENERATOR_OPTS: ['route', 'controller', 'view', 'service', 'directive'],

  createFiles: function createModuleFiles() {
    this._validateRouteOption();

    if (this.options.route || this.options.directive) {
      this.options.controller = true;
      this.options.view = true;
    }

    var srcFiles = util.collectTemplates(this.options);
    this._copyTemplates(srcFiles);
  }

});

module.exports = DealiniModuleGenerator;
