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
  var fullModuleName = appName ? [appName, moduleName].join('.') : moduleName;

  return {
    module: fullModuleName,
    route: route,
    controller: capitalizedCamelCaseModuleName + 'Controller',
    controllerAs: camelCasedModuleName + 'Ctrl',
    templateUrl: [moduleName, moduleName + '.html'].join('/'),
    service: capitalizedCamelCaseModuleName + 'Service'
  };
};

var QUOTE = '\'';
var COMMA = ',';
var RE_START_TOKEN = '([\\[\'",])';
var RE_END_TOKEN = '([\'"\\]])';
var RE_WHITESPACE = '(\\s*)';
var RE_INJECTOR_COMMENT = ['(/\\*\\s*', '\\s*\\*/)'];

exports.injectDependency = function (target, dep, injectorTag) {

  var re = new RegExp(
    RE_START_TOKEN +
    RE_WHITESPACE +
    RE_INJECTOR_COMMENT.join(injectorTag) +
    RE_WHITESPACE +
    RE_END_TOKEN
  );
  var match = re.exec(target);
  if (!match) {
    return false;
  }

  var startToken = match[1];
  var whitespaceBefore = match[2];
  var injectorComment = match[3];
  var whitespaceAfter = match[4];
  var endToken = match[5];

  var injectParts = [startToken];
  if (startToken === QUOTE) {
    injectParts.push(COMMA);
  }
  injectParts.push(whitespaceBefore, QUOTE, dep, QUOTE);
  if (endToken === QUOTE) {
    injectParts.push(COMMA);
  }
  injectParts.push(whitespaceBefore, injectorComment, whitespaceAfter, endToken);

  return target.replace(re, injectParts.join(''));
};
