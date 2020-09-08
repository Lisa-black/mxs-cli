'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const downloadLocal = exports.downloadLocal = async (projectName, projectType) => {
  let templatePath = '';
  switch (projectType) {
    case 'web':
      templatePath = 'hql7/xy-template-vue';
      break;
    case 'vue3-h5':
      templatePath = 'Lisa-black/minxs-template-vue3-ts';
      break;
    case 'vue3-ts':
      templatePath = 'Lisa-black/minxs-template-vue3-ts';
      break;
    case 'mul-subapp':
      templatePath = 'hql7/xy-template-mfe-subapp-vue';
      break;
    case 'mul-master':
      templatePath = 'hql7/xy-template-mfe-master-vue';
      break;
    default:
      templatePath = 'hql7/xy-template-vue';
  }

  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    (0, _downloadGitRepo2.default)(templatePath, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};