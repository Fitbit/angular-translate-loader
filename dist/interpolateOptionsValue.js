'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _interpolateValue = require('./interpolateValue');

var _interpolateValue2 = _interopRequireDefault(_interpolateValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @param {String} key
 * @param {*} loaderContext
 * @param {*} content
 * @param {Object} options
 * @returns {String}
 */
exports.default = function (key, loaderContext, content, options) {
    var value = options[key];

    if (Array.isArray(value)) {
        value = value.join(options.sep);
    }

    if (!(0, _lodash.isEmpty)(value)) {
        value = (0, _interpolateValue2.default)(value, loaderContext, content, options);
    }

    return value;
};
//# sourceMappingURL=interpolateOptionsValue.js.map