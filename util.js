'use strict';

var _ = require('lodash');

var exports = module.exports = {};

var COMMON_OPTIONS = exports.COMMON_OPTIONS = {
  route: {
    type: String,
    defaults: null
  },
  controller: {
    type: Boolean,
    defaults: false,
    templates: ['_.controller.js', '_.controller.spec.js']
  },
  view: {
    type: Boolean,
    defaults: false,
    templates: ['_.html', '_.scss']
  },
  service: {
    type: Boolean,
    defaults: false,
    templates: ['_.service.js', '_.service.spec.js']
  },
  directive: {
    type: Boolean,
    defaults: false,
    templates: ['_.directive.js', '_.directive.spec.js']
  }
};

exports.collectTemplates = function (options) {
  var srcFiles = ['_.module.js'];

  _.forOwn(COMMON_OPTIONS, function extendSrcFiles(opt, optionName) {
    if (options[optionName] && opt.templates) {
      Array.prototype.push.apply(srcFiles, opt.templates);
    }
  });

  return srcFiles;
};

exports.compileComponentNames = function (moduleName, appName, route) {
  var camelCasedModuleName = _.camelCase(moduleName);
  var capitalizedCamelCaseModuleName = _.capitalize(camelCasedModuleName);

  return {
    module: [appName, moduleName].join('.'),
    route: route,
    controller: capitalizedCamelCaseModuleName + 'Controller',
    controllerAs: camelCasedModuleName + 'Ctrl',
    templateUrl: [moduleName, moduleName + '.html'].join('/'),
    service: capitalizedCamelCaseModuleName + 'Service'
  };
};
