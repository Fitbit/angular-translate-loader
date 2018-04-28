/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./fixtures/foo.json":
/***/ (function(module, exports, __webpack_require__) {

eval("var angular = __webpack_require__(\"angular\");\nvar translations = {\n\t\"foo1\": \"one\",\n\t\"foo2\": \"two\"\n};\nvar module;\ntry {\n\tmodule = angular.module(\"translations\");\n} catch(err) {\n\tmodule = angular.module(\"translations\", [\"pascalprecht.translate\"]);\n}\nmodule.config([\"$translateProvider\", function($translateProvider) {\n\t$translateProvider.translations(\"en_US\", translations);\n}]);\nmodule.exports = translations;\n\n//# sourceURL=webpack:///./fixtures/foo.json?");

/***/ }),

/***/ "./fixtures/foo_de_DE.json":
/***/ (function(module, exports, __webpack_require__) {

eval("var angular = __webpack_require__(\"angular\");\nvar translations = {\n\t\"foo1\": \"ein\",\n\t\"foo2\": \"zwei\"\n};\nvar module;\ntry {\n\tmodule = angular.module(\"translations\");\n} catch(err) {\n\tmodule = angular.module(\"translations\", [\"pascalprecht.translate\"]);\n}\nmodule.config([\"$translateProvider\", function($translateProvider) {\n\t$translateProvider.translations(\"de_DE\", translations);\n}]);\nmodule.exports = translations;\n\n//# sourceURL=webpack:///./fixtures/foo_de_DE.json?");

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(\"./fixtures/foo.json\");\nmodule.exports = __webpack_require__(\"./fixtures/foo_de_DE.json\");\n\n\n//# sourceURL=webpack:///multi_foo.json_foo_de_DE.json?");

/***/ }),

/***/ "angular":
/***/ (function(module, exports) {

eval("module.exports = angular;\n\n//# sourceURL=webpack:///external_%22angular%22?");

/***/ })

/******/ });