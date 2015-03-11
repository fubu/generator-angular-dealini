'use strict';

var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var generators = require('yeoman-generator');

var util = require('./util');

var DealiniSubGenerator = generators.NamedBase.extend({

  DEST_FOLDER: '',
  INJECTOR_TAG: null,
  GENERATOR_OPTS: [],

  constructor: function () {
    generators.NamedBase.apply(this, arguments);

    // Adjust source root to point to global template directory
    var templateBase = path.join(this.sourceRoot(), '../../templates');
    this.sourceRoot(path.normalize(templateBase));

    // Add cli options
    this.GENERATOR_OPTS.forEach(function addOption(optionName) {
      this.option(optionName, {
        type: util.COMMON_OPTIONS[optionName].defaults,
        defaults: util.COMMON_OPTIONS[optionName].defaults
      });
    }, this);
  },

  _validateRouteOption: function () {
    if (!this.options.route) {
      // route flag not specified, nothing to do here
      return;
    }

    var route = this.options.route;
    if (route === true) {
      // no route name was passed, but the --route flag was set
      route = this.name;
    }
    this.options.route = route.replace(/^\//, '');
  },

  _compileDestinationPath: function (tplPath) {
    return this.destinationPath(path.join(
      this.DEST_FOLDER,
      this.name,
      tplPath.replace('_', this.name)
    ));
  },

  _copyTemplates: function (srcFiles, componentNames) {
    var tplValues = {
      options: _.pick(this.options, this.GENERATOR_OPTS),
      names: componentNames
    };

    srcFiles.forEach(function copyTemplate(tplPath) {
      this.fs.copyTpl(
        this.templatePath(tplPath),
        this._compileDestinationPath(tplPath),
        tplValues);
    }, this);

    if (this.INJECTOR_TAG) {
      this._appendAppDependency(componentNames.module);
    }
  },

  _appendAppDependency: function (dep) {
    var appModulePath = this.destinationPath('src/app.js');

    // read in app.js and check if dependency is already declared
    var appModuleContent = this.readFileAsString(appModulePath);
    if (appModuleContent.indexOf(dep) >= 0) {
      console.log(
        chalk.cyan('   app.js'), 'dependency on', dep, 'is already declared'
      );
      return;
    }

    // insert dependency and write back to app.js
    var injected = util.injectDependency(
      appModuleContent, dep, this.INJECTOR_TAG);

    this.writeFileFromString(injected, appModulePath);
    console.log(
      chalk.green('   app.js'), 'dependency on', dep, 'has been added'
    );
  }

});

module.exports = DealiniSubGenerator;
