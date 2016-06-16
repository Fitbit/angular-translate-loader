var angular = require('angular');

require.context('./locales', true, /\.json$/);

angular.module('app', ['translations']);
