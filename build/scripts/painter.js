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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paint = __webpack_require__(2);

onmessage = function onmessage(params) {
    paint(params.data.image, params.data, function () {
        return postMessage(params.data.image);
    });
    postMessage(params.data.image);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dfs = __webpack_require__(3);
var bfs = __webpack_require__(4);

// Paints the given two-dimensional array using BFS or DFS algorithms to color
// each pixel.
//
// @param {2D Array} image
//   A two-dimensional array representation of the pixels of the image.
function paint(image, params, refresh) {
    var color = hexToRGB(params.color || '#FFFFFF');

    var Problem = function () {
        function Problem() {
            _classCallCheck(this, Problem);
        }

        _createClass(Problem, [{
            key: 'startState',

            // define where we are drawing initially
            value: function startState() {
                image[params.row || 0][params.col || 0].red = color.red;
                image[params.row || 0][params.col || 0].green = color.green;
                image[params.row || 0][params.col || 0].blue = color.blue;
                return image[params.row || 0][params.col || 0];
            }

            // define where the robot can go next, from a given state

        }, {
            key: 'successors',
            value: function successors(node) {
                return getAdjacent(node.row, node.col, image);
            }
        }, {
            key: 'toString',
            value: function toString() {
                return 'paint problem with initial color (' + params.color + ')';
            }
        }]);

        return Problem;
    }();

    dfs(new Problem(), params, refresh);
};

module.exports = paint;

function getAdjacent(row, col, image) {
    var adjacent = [];
    if (image.length > row + 1) adjacent.push(image[row + 1][col]);
    if (image[row].length > col + 1) adjacent.push(image[row][col + 1]);
    if (row != 0) adjacent.push(image[row - 1][col]);
    if (col != 0) adjacent.push(image[row][col - 1]);
    return adjacent;
};

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return {
        red: r,
        green: g,
        blue: b,
        alpha: alpha || 255
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function id(node) {
    // convert a state to a unique identifier
    return node.row + 1000 * node.col;
};

function dfs(problem, params, refresh) {
    // See https://bit.ly/34wjnGY
    var closed = new Set();
    var probs = params.probs || 0.5;
    var delta = params.delta || 3;
    var speed = params.speed || 1e-1000;
    var fringe = [problem.startState()];
    var times = 0;

    while (fringe.length > 0) {
        var node = fringe[Math.floor(Math.random() * fringe.length)];
        fringe.splice(fringe.indexOf(node), 1);
        if (closed.has(id(node)) || node.colored) continue;
        var redTotal, greenTotal, blueTotal, count;
        redTotal = greenTotal = blueTotal = count = 0;

        // add all successor states to the list of unchecked states
        problem.successors(node).forEach(function (successor) {
            // calculate color of new node based on surrounding colors
            if (successor.colored) {
                redTotal += successor.red;
                greenTotal += successor.green;
                blueTotal += successor.blue;
                count++;
            }
            fringe.push(successor);
        });

        // color the node by averaging the colors of neighboring nodes
        if (count > 0) {
            var rand = Math.random() < probs ? delta : -delta;
            node.red = redTotal / count + rand;
            node.green = greenTotal / count + rand;
            node.blue = blueTotal / count + rand;
        }
        node.colored = true;

        // mark the state as visited
        closed.add(id(node));
        if (times % 10000 == 0) refresh();
        times++;
    }
}

module.exports = dfs;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function id(state) {
    // convert a state to a unique identifier
    return state.x + 1000 * state.y;
};

function bfs(problem, fringe) {
    // See https://bit.ly/34wjnGY
    var closed = new Set();

    fringe.push({
        state: problem.startState(),
        path: [],
        cost: 0
    });

    var _loop = function _loop() {
        var node = fringe.pop();
        var state = node.state,
            path = node.path,
            cost = node.cost;


        if (problem.isGoal(state)) {
            return {
                v: path
            };
        }

        if (!closed.has(key(state.x, state.y))) {
            closed.add(key(state.x, state.y));

            problem.successors(state).forEach(function (successor) {
                return fringe.push({
                    state: successor.state,
                    path: path.concat([successor]),
                    cost: cost + 1
                });
            });
        }
    };

    while (fringe.length) {
        var _ret = _loop();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }

    return [];
};

module.exports = bfs;

/***/ })
/******/ ]);