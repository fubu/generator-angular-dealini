# generator-angular-dealini

Yeoman subgenerator for [dealini.ch](http://www.dealini.ch) webapps which have initially been created by the awesome [gulp-angular](https://github.com/Swiip/generator-gulp-angular) generator (with a slightly different app structure).

## Available subgenerators

### module

    yo angular-dealini:module MODULE_NAME [--route [ROUTE_NAME]] [--service]

Generates a new module in `src/<MODULE_NAME>` and adds it as a dependency to the app module (`src/app.js`).

When the `--route` flag is set the subgenerator configures a route, using `ROUTE_NAME` (if supplied, `MODULE_NAME` otherwise) as state name and URL, and creates a controller as well as a view.

When the ``--service` flag is set the subgenerator creates a service.

This subgenerator can create the following files:

*   `<MODULE_NAME>.module.js` - the module definition (with a route config, if the `--route` flag has been set)
*   `<MODULE_NAME>.controller.js` - a controller (only if the `--route` flag has been set)
*   `<MODULE_NAME>.controller.spec.js` - tests for the controller (whenever a controller is generated)
*   `<MODULE_NAME>.service.js` - a service (only if the `--service` flag has been set)
*   `<MODULE_NAME>.service.spec.js` - tests for the service (whenever a service is generated)
*   `<MODULE_NAME>.html` - a view template (only if the `--route` flag has been set)
*   `<MODULE_NAME>.scss` - a view stylesheet (whenever a view template is generated)
