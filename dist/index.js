"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _constants = require("./utils/constants");

var _apply = _interopRequireDefault(require("./apply"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * mxscli commands
 *    - config
 *    - init 
 */
var actionMap = {
  init: {
    description: 'generate a new project from a template. 从模板生成新项目。',
    usages: ['mxs init templateName projectName'],
    alias: 'i'
  }
}; // 添加 init / config 命令

Object.keys(actionMap).forEach(function (action) {
  _commander["default"].command(action).description(actionMap[action].description).alias(actionMap[action].alias) //别名
  .action(function () {
    switch (action) {
      case 'config':
        //配置
        _apply["default"].apply(void 0, [action].concat(_toConsumableArray(process.argv.slice(3))));

        break;

      case 'init':
        _apply["default"].apply(void 0, [action].concat(_toConsumableArray(process.argv.slice(3))));

        break;

      default:
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(function (action) {
    actionMap[action].usages.forEach(function (usage) {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}

_commander["default"].usage('<command> [options]'); // mxs -h 


_commander["default"].on('-h', help);

_commander["default"].on('--help', help); // mxs -V   VERSION 为 package.json 中的版本号


_commander["default"].version(_constants.VERSION, '-V --version').parse(process.argv); // mxs 不带参数时


if (!process.argv.slice(2).length) {
  _commander["default"].outputHelp(make_green);
}

function make_green(txt) {
  return _chalk["default"].green(txt);
}