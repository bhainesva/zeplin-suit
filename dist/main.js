(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["extension"] = factory();
	else
		root["extension"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

var cross = function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
};

var darkness = function darkness(color) {
    return mag(diff([color.r, color.g, color.b], [255, 255, 255]));
};

var getOrdinal = function getOrdinal(number) {
    var ords = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary", "octonary", "nonary", "denary"];

    if (number < 10) {
        return ords[number];
    }

    return "" + number;
};

var diff = function diff(x1, x2) {
    return pairify(x1, x2).map(function (pair) {
        return pair[0] - pair[1];
    });
};

var mag = function mag(arr) {
    return Math.sqrt(arr.map(function (x) {
        return Math.pow(x, 2);
    }).reduce(function (total, num) {
        return total + num;
    }));
};

var pairify = function pairify(x, y) {
    var out = [];
    x.forEach(function (val, i) {
        out.push([val, y[i]]);
    });
    return out;
};

var isGray = function isGray(color) {
    var x_1 = [0, 0, 0];
    var x_2 = [1, 1, 1];
    var x_0 = [color.r, color.g, color.b];
    return mag(cross(diff(x_0, x_1), diff(x_0, x_2))) / mag(diff(x_2, x_1)) < 25;
};

function layer(context, selectedLayer) {}

function styleguideColors(context, colors) {
    var brandColors = colors.filter(function (color) {
        return !isGray(color);
    });
    var grays = colors.filter(isGray);

    var out = "";

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = brandColors.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var idx = _ref2[0];
            var color = _ref2[1];

            var hexRep = color.toHex();
            out += `$brand-${getOrdinal(idx)}: `;
            out += `#${hexRep.r}${hexRep.g}${hexRep.b};`;
            out += "\n";
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    out += "\n";

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = grays.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref3 = _step2.value;

            var _ref4 = _slicedToArray(_ref3, 2);

            var _idx = _ref4[0];
            var _color = _ref4[1];

            var hexRep = _color.toHex();
            out += `$gray-${_idx}: `;
            out += `#${hexRep.r}${hexRep.g}${hexRep.b};`;
            out += "\n";
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return {
        code: out,
        language: 'scss'
    };
}

var getPrimaryFontFamily = function getPrimaryFontFamily(textStyles) {
    var min = 0;
    var minFamily = "";

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = textStyles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var style = _step3.value;

            if (!min || style.fontSize < min) {
                min = style.fontSize;
                minFamily = style.fontFace;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return minFamily;
};

var getBase = function getBase(textStyles) {
    var props = ['fontStyle', 'letterSpacing', 'fontFamily', 'fontSize', 'lineHeight', 'fontWeight'];
    var baseStyle = new Map(['fontStyle', 'letterSpacing', 'fontFamily', 'fontSize', 'lineHeight', 'fontWeight'].map(function (prop) {
        return [prop, ""];
    }));

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = props[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var prop = _step4.value;

            baseStyle.set(prop, mostCommonVal(textStyles, prop));
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return baseStyle;
};

var mostCommonVal = function mostCommonVal(textStyles, prop) {
    var counts = new Map();
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = textStyles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var style = _step5.value;

            var val = style.prop;
            if (counts.has(val)) {
                counts.set(val, counts.get(val) + 1);
            } else {
                counts.set(val, 1);
            }
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    var maxCount = 0;
    var maxVal = "";

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = counts.keys()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var val = _step6.value;

            if (!maxCount || counts.get(val) > maxCount) {
                maxCount = counts.get(val);
                maxVal = val;
            }
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return maxVal;
};

function mapToJson(map) {
    return JSON.stringify([].concat(_toConsumableArray(map)));
}

function styleguideTextStyles(context, textStyles) {
    return JSON.stringify(textStyles);
    // return getPrimaryFontFamily(textStyles);
    var out = "uih";
    var baseMap = getBase(textStyles);
    return JSON.stringify([].concat(_toConsumableArray(baseMap)));
    return out;
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = baseMap.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _ref5 = _step7.value;

            var _ref6 = _slicedToArray(_ref5, 2);

            var key = _ref6[0];
            var val = _ref6[1];

            out += `key: ${key}, val: ${mapToJson(val)}\n`;
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    return out;
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = textStyles[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var style = _step8.value;

            out += style.name + "\n";
            return JSON.stringify(style);
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    return out;
}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, colors) {}

function comment(context, text) {}

exports.default = {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYzRlZTlhNDA2ZGNmNzE3NmZmNSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY3Jvc3MiLCJhIiwiYiIsImRhcmtuZXNzIiwiY29sb3IiLCJtYWciLCJkaWZmIiwiciIsImciLCJnZXRPcmRpbmFsIiwibnVtYmVyIiwib3JkcyIsIngxIiwieDIiLCJwYWlyaWZ5IiwibWFwIiwicGFpciIsImFyciIsIk1hdGgiLCJzcXJ0IiwieCIsInJlZHVjZSIsInRvdGFsIiwibnVtIiwieSIsIm91dCIsImZvckVhY2giLCJ2YWwiLCJpIiwicHVzaCIsImlzR3JheSIsInhfMSIsInhfMiIsInhfMCIsImxheWVyIiwiY29udGV4dCIsInNlbGVjdGVkTGF5ZXIiLCJzdHlsZWd1aWRlQ29sb3JzIiwiY29sb3JzIiwiYnJhbmRDb2xvcnMiLCJmaWx0ZXIiLCJncmF5cyIsImVudHJpZXMiLCJpZHgiLCJoZXhSZXAiLCJ0b0hleCIsImNvZGUiLCJsYW5ndWFnZSIsImdldFByaW1hcnlGb250RmFtaWx5IiwidGV4dFN0eWxlcyIsIm1pbiIsIm1pbkZhbWlseSIsInN0eWxlIiwiZm9udFNpemUiLCJmb250RmFjZSIsImdldEJhc2UiLCJwcm9wcyIsImJhc2VTdHlsZSIsIk1hcCIsInByb3AiLCJzZXQiLCJtb3N0Q29tbW9uVmFsIiwiY291bnRzIiwiaGFzIiwiZ2V0IiwibWF4Q291bnQiLCJtYXhWYWwiLCJrZXlzIiwibWFwVG9Kc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0eWxlZ3VpZGVUZXh0U3R5bGVzIiwiYmFzZU1hcCIsImtleSIsIm5hbWUiLCJleHBvcnRTdHlsZWd1aWRlQ29sb3JzIiwiZXhwb3J0U3R5bGVndWlkZVRleHRTdHlsZXMiLCJjb21tZW50IiwidGV4dCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFD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QkFBUSxRQUFPZ0QsR0FBSSxVQUFTTCxVQUFVekMsR0FBVixDQUFlLElBQTNDO0FBQ0g7QUFUOEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVL0MsV0FBT0YsR0FBUDtBQVYrQztBQUFBO0FBQUE7O0FBQUE7QUFXL0MsOEJBQW9Cd0IsVUFBcEIsbUlBQWdDO0FBQUEsZ0JBQXJCRyxLQUFxQjs7QUFDNUIzQixtQkFBTzJCLE1BQU1zQixJQUFOLEdBQWEsSUFBcEI7QUFDQSxtQkFBT0wsS0FBS0MsU0FBTCxDQUFlbEIsS0FBZixDQUFQO0FBQ0g7QUFkOEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQi9DLFdBQU8zQixHQUFQO0FBRUg7O0FBRUQsU0FBU2tELHNCQUFULENBQWdDeEMsT0FBaEMsRUFBeUNHLE1BQXpDLEVBQWlELENBRWhEOztBQUVELFNBQVNzQywwQkFBVCxDQUFvQ3pDLE9BQXBDLEVBQTZDRyxNQUE3QyxFQUFxRCxDQUVwRDs7QUFFRCxTQUFTdUMsT0FBVCxDQUFpQjFDLE9BQWpCLEVBQTBCMkMsSUFBMUIsRUFBZ0MsQ0FFL0I7O2tCQUVjO0FBQ1g1QyxTQURXO0FBRVhHLG9CQUZXO0FBR1hrQyx3QkFIVztBQUlYSSwwQkFKVztBQUtYQyw4QkFMVztBQU1YQztBQU5XLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImV4dGVuc2lvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJleHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYzRlZTlhNDA2ZGNmNzE3NmZmNSIsIi8qKlxuICogRXhwb3J0IGZ1bmN0aW9ucyB5b3Ugd2FudCB0byB3b3JrIHdpdGgsIHNlZSBkb2N1bWVudGF0aW9uIGZvciBkZXRhaWxzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL3plcGxpbi96ZXBsaW4tZXh0ZW5zaW9uLWRvY3VtZW50YXRpb25cbiAqL1xuXG5jb25zdCBjcm9zcyA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIFthWzFdKmJbMl0gLSBhWzJdKmJbMV0sXG4gICAgICAgICAgICBhWzJdKmJbMF0gLSBhWzBdKmJbMl0sXG4gICAgICAgICAgICBhWzBdKmJbMV0gLSBhWzFdKmJbMF1dO1xufVxuXG5jb25zdCBkYXJrbmVzcyA9IChjb2xvcikgPT4gbWFnKGRpZmYoW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdLCBbMjU1LCAyNTUsIDI1NV0pKTtcblxuY29uc3QgZ2V0T3JkaW5hbCA9IChudW1iZXIpID0+IHtcbiAgICBjb25zdCBvcmRzID0gW1xuICAgICAgICBcInByaW1hcnlcIixcbiAgICAgICAgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgXCJ0ZXJ0aWFyeVwiLFxuICAgICAgICBcInF1YXRlcm5hcnlcIixcbiAgICAgICAgXCJxdWluYXJ5XCIsXG4gICAgICAgIFwic2VuYXJ5XCIsXG4gICAgICAgIFwic2VwdGVuYXJ5XCIsXG4gICAgICAgIFwib2N0b25hcnlcIixcbiAgICAgICAgXCJub25hcnlcIixcbiAgICAgICAgXCJkZW5hcnlcIlxuICAgIF1cblxuICAgIGlmIChudW1iZXIgPCAxMCkge1xuICAgICAgICByZXR1cm4gb3Jkc1tudW1iZXJdO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiICsgbnVtYmVyO1xufVxuXG5jb25zdCBkaWZmID0gKHgxLCB4MikgPT4gcGFpcmlmeSh4MSwgeDIpLm1hcCgocGFpcikgPT4gcGFpclswXSAtIHBhaXJbMV0pO1xuXG5jb25zdCBtYWcgPSAoYXJyKSA9PiBNYXRoLnNxcnQoYXJyLm1hcCh4ID0+IHgqKjIpLnJlZHVjZSgodG90YWwsIG51bSkgPT4gdG90YWwgKyBudW0pKTtcblxuY29uc3QgcGFpcmlmeSA9ICh4LCB5KSA9PiB7XG4gICAgbGV0IG91dCA9IFtdO1xuICAgIHguZm9yRWFjaCgodmFsLCBpKSA9PiB7XG4gICAgICAgIG91dC5wdXNoKFt2YWwsIHlbaV1dKTtcbiAgICB9KTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5jb25zdCBpc0dyYXkgPSAoY29sb3IpID0+IHtcbiAgICBjb25zdCB4XzEgPSBbMCwgMCwgMF07XG4gICAgY29uc3QgeF8yID0gWzEsIDEsIDFdO1xuICAgIGNvbnN0IHhfMCA9IFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICByZXR1cm4gKG1hZyhjcm9zcyhkaWZmKHhfMCwgeF8xKSwgZGlmZih4XzAsIHhfMikpKSAvIG1hZyhkaWZmKHhfMiwgeF8xKSkpIDwgMjU7XG59XG4gXG5mdW5jdGlvbiBsYXllcihjb250ZXh0LCBzZWxlY3RlZExheWVyKSB7XG5cbn1cblxuZnVuY3Rpb24gc3R5bGVndWlkZUNvbG9ycyhjb250ZXh0LCBjb2xvcnMpIHtcbiAgICBjb25zdCBicmFuZENvbG9ycyA9IGNvbG9ycy5maWx0ZXIoY29sb3IgPT4gIWlzR3JheShjb2xvcikpO1xuICAgIGNvbnN0IGdyYXlzID0gY29sb3JzLmZpbHRlcihpc0dyYXkpO1xuXG4gICAgbGV0IG91dCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IFtpZHgsIGNvbG9yXSBvZiBicmFuZENvbG9ycy5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgaGV4UmVwID0gY29sb3IudG9IZXgoKTtcbiAgICAgICAgb3V0ICs9IGAkYnJhbmQtJHtnZXRPcmRpbmFsKGlkeCl9OiBgO1xuICAgICAgICBvdXQgKz0gYCMke2hleFJlcC5yfSR7aGV4UmVwLmd9JHtoZXhSZXAuYn07YDtcbiAgICAgICAgb3V0ICs9IFwiXFxuXCI7XG4gICAgfVxuICAgIG91dCArPSBcIlxcblwiO1xuXG4gICAgZm9yIChjb25zdCBbaWR4LCBjb2xvcl0gb2YgZ3JheXMuZW50cmllcygpKSB7XG4gICAgICAgIGNvbnN0IGhleFJlcCA9IGNvbG9yLnRvSGV4KCk7XG4gICAgICAgIG91dCArPSBgJGdyYXktJHtpZHh9OiBgO1xuICAgICAgICBvdXQgKz0gYCMke2hleFJlcC5yfSR7aGV4UmVwLmd9JHtoZXhSZXAuYn07YDtcbiAgICAgICAgb3V0ICs9IFwiXFxuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogb3V0LFxuICAgICAgICBsYW5ndWFnZTogJ3Njc3MnXG4gICAgfTtcbn1cblxuY29uc3QgZ2V0UHJpbWFyeUZvbnRGYW1pbHkgPSAodGV4dFN0eWxlcykgPT4ge1xuICAgIGxldCBtaW4gPSAwO1xuICAgIGxldCBtaW5GYW1pbHkgPSBcIlwiO1xuICAgIFxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGV4dFN0eWxlcykge1xuICAgICAgICBpZiAoIW1pbiB8fCBzdHlsZS5mb250U2l6ZSA8IG1pbikge1xuICAgICAgICAgICAgbWluID0gc3R5bGUuZm9udFNpemU7XG4gICAgICAgICAgICBtaW5GYW1pbHkgPSBzdHlsZS5mb250RmFjZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtaW5GYW1pbHk7XG59XG5cbmNvbnN0IGdldEJhc2UgPSAodGV4dFN0eWxlcykgPT4ge1xuICAgIGNvbnN0IHByb3BzID0gWydmb250U3R5bGUnLCAnbGV0dGVyU3BhY2luZycsICdmb250RmFtaWx5JywgJ2ZvbnRTaXplJywgJ2xpbmVIZWlnaHQnLCAnZm9udFdlaWdodCddO1xuICAgIGxldCBiYXNlU3R5bGUgPSBuZXcgTWFwKFsnZm9udFN0eWxlJywgJ2xldHRlclNwYWNpbmcnLCAnZm9udEZhbWlseScsICdmb250U2l6ZScsICdsaW5lSGVpZ2h0JywgJ2ZvbnRXZWlnaHQnXS5tYXAoKHByb3ApID0+IFtwcm9wLCBcIlwiXSkpO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XG4gICAgICAgIGJhc2VTdHlsZS5zZXQocHJvcCwgbW9zdENvbW1vblZhbCh0ZXh0U3R5bGVzLCBwcm9wKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2VTdHlsZTtcbn1cblxuY29uc3QgbW9zdENvbW1vblZhbCA9ICh0ZXh0U3R5bGVzLCBwcm9wKSA9PiB7XG4gICAgbGV0IGNvdW50cyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRleHRTdHlsZXMpIHtcbiAgICAgICAgY29uc3QgdmFsID0gc3R5bGUucHJvcDtcbiAgICAgICAgaWYgKGNvdW50cy5oYXModmFsKSkge1xuICAgICAgICAgICAgY291bnRzLnNldCh2YWwsIGNvdW50cy5nZXQodmFsKSsxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50cy5zZXQodmFsLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBtYXhDb3VudCA9IDA7XG4gICAgbGV0IG1heFZhbCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHZhbCBvZiBjb3VudHMua2V5cygpKSB7XG4gICAgICAgIGlmICghbWF4Q291bnQgfHwgY291bnRzLmdldCh2YWwpID4gbWF4Q291bnQpIHtcbiAgICAgICAgICAgIG1heENvdW50ID0gY291bnRzLmdldCh2YWwpO1xuICAgICAgICAgICAgbWF4VmFsID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heFZhbDtcbn1cblxuZnVuY3Rpb24gbWFwVG9Kc29uKG1hcCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShbLi4ubWFwXSk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGV4dFN0eWxlcyk7XG4gICAgLy8gcmV0dXJuIGdldFByaW1hcnlGb250RmFtaWx5KHRleHRTdHlsZXMpO1xuICAgIGxldCBvdXQgPSBcInVpaFwiO1xuICAgIGNvbnN0IGJhc2VNYXAgPSBnZXRCYXNlKHRleHRTdHlsZXMpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShbLi4uYmFzZU1hcF0pO1xuICAgIHJldHVybiBvdXQ7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIGJhc2VNYXAuZW50cmllcygpKSB7XG4gICAgICAgIG91dCArPSBga2V5OiAke2tleX0sIHZhbDogJHttYXBUb0pzb24odmFsKX1cXG5gO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGV4dFN0eWxlcykge1xuICAgICAgICBvdXQgKz0gc3R5bGUubmFtZSArIFwiXFxuXCI7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcblxufVxuXG5mdW5jdGlvbiBleHBvcnRTdHlsZWd1aWRlQ29sb3JzKGNvbnRleHQsIGNvbG9ycykge1xuXG59XG5cbmZ1bmN0aW9uIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIGNvbG9ycykge1xuXG59XG5cbmZ1bmN0aW9uIGNvbW1lbnQoY29udGV4dCwgdGV4dCkge1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBsYXllcixcbiAgICBzdHlsZWd1aWRlQ29sb3JzLFxuICAgIHN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxuICAgIGV4cG9ydFN0eWxlZ3VpZGVDb2xvcnMsXG4gICAgZXhwb3J0U3R5bGVndWlkZVRleHRTdHlsZXMsXG4gICAgY29tbWVudFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9