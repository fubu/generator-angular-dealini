# generator-angular-dealini

Yeoman subgenerator for [dealini.ch](http://www.dealini.ch) webapps which have initially been created by the awesome [gulp-angular](https://github.com/Swiip/generator-gulp-angular) generator (with a slightly different app structure).

## Available subgenerators

Each subgenerator creates some or all of the following files:

*   `<MODULE_NAME>.module.js` - the module definition (contains a route config when generating a new module and the `--route` flag has been set)
*   `<MODULE_NAME>.controller.js` - a controller (automatically when creating a module with a route)
*   `<MODULE_NAME>.controller.spec.js` - tests for the controller (whenever a controller is generated)
*   `<MODULE_NAME>.service.js` - a service (only if the `--service` flag has been set)
*   `<MODULE_NAME>.service.spec.js` - tests for the service (whenever a service is generated)
*   `<MODULE_NAME>.html` - a view template (automatically when creating a module with a route)
*   `<MODULE_NAME>.scss` - a view stylesheet (whenever a view template is generated)

### module

    yo angular-dealini:module MODULE_NAME [--route [ROUTE_NAME]] [--service]

Generates a new module in `src/<MODULE_NAME>`. If the app module (`src/app.js`) contains the special marker comment `/* inject:module */`, this subgenerator will automatically add the new module as a dependency.

When the `--route` flag is set this subgenerator configures a route, using `ROUTE_NAME` (if supplied, `MODULE_NAME` otherwise) as state name and URL, and creates a controller as well as a view.

When the ``--service` flag is set this subgenerator creates a service.

### component

    yo angular-dealini:component COMPONENT_NAME [--service]

Generates a new module in `src/components/<COMPONENT_NAME>`. If the app module (`src/app.js`) contains the special marker comment `/* inject:component */`, this subgenerator will automatically add the new module as a dependency.

When the ``--service` flag is set this subgenerator creates a service.
