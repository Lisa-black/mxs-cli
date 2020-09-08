"use strict";

var _get = require("./utils/get");

var _ora = _interopRequireDefault(require("ora"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var exist = (0, _util.promisify)(_fs["default"].stat); // 命令行交互配置项

var question = [{
  type: 'input',
  name: 'author',
  message: 'Please enter the author name: '
}, {
  type: 'input',
  name: 'description',
  message: 'Please enter the project description: '
}, {
  type: 'input',
  name: 'Version',
  message: 'Please enter the project vrsion: '
}, {
  type: 'list',
  name: 'type',
  message: 'Please enter the project type：',
  choices: ["web", "mfe-subapp", "mfe-master"]
}, {
  type: 'input',
  name: 'port',
  message: 'Please enter the project port: ',
  "default": 8080,
  validate: function validate(val) {
    if (val.match(/\d{2,6}/g)) {
      // 校验位数
      return true;
    }

    return "请输入2-6位数字";
  }
}]; // 创建命令

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projectName) {
    var projectExist;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (projectName) {
              _context2.next = 3;
              break;
            }

            console.log(_chalk["default"].redBright.bold("请输入项目名称"));
            return _context2.abrupt("return");

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return exist(projectName);

          case 6:
            projectExist = _context2.sent;

            if (projectExist) {
              console.log(_logSymbols["default"].error, _chalk["default"].red('该项目已存在！'));
            }

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);

            //命令行交互
            _inquirer["default"].prompt(question).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                var loading, projectType;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        //下载模板 选择模板
                        //通过配置文件，获取模板信息
                        loading = (0, _ora["default"])('初始化项目中...');
                        loading.start();
                        loading.color = "yellow";
                        projectType = answer.type;
                        (0, _get.downloadLocal)(projectName, projectType).then(function () {
                          loading.succeed(); // 写入package.json

                          var isNotMulMaster = projectType !== 'mul-master';
                          var packageJson = isNotMulMaster ? "".concat(projectName, "/package.json") : "".concat(projectName, "/master/package.json");

                          if (_fs["default"].existsSync(packageJson)) {
                            var data = _fs["default"].readFileSync(packageJson).toString();

                            var json = JSON.parse(data);
                            json.name = projectName; // 项目名

                            json.author = answer.author; // 作者

                            json.description = answer.description; // 描述信息

                            json.version = answer.version; // 版本号

                            json.port = answer.port; // 端口号 默认8080
                            //修改项目文件夹中 package.json 文件

                            _fs["default"].writeFileSync(packageJson, JSON.stringify(json, null, '\t'), 'utf-8');

                            console.log(_logSymbols["default"].success, _chalk["default"].green('项目初始化完成！依次运行以下命令：'));
                            console.log(_logSymbols["default"].success, _chalk["default"].green('cd ' + projectName));
                            console.log(_logSymbols["default"].success, _chalk["default"].green(isNotMulMaster ? 'npm install' : 'npm run cinit'));
                            console.log(_logSymbols["default"].success, _chalk["default"].green('npm run serve'));
                          }
                        }, function () {
                          loading.fail();
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 10]]);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;