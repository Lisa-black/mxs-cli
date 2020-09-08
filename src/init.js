import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
import { promisify } from "util";

const exist = promisify(fs.stat);

// 命令行交互配置项
const question = [
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name: '
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: '
  }, {
    type: 'input',
    name: 'Version',
    message: 'Please enter the project vrsion: '
  },
  {
    type: 'list',
    name: 'type',
    message: 'Please enter the project type：',
    choices: [
      "web",
      "vue3+ts",
      "mui-subapp",
      "mui-master"
    ]
  },
  {
    type: 'input',
    name: 'port',
    message: 'Please enter the project port: ',
    default: 8080,
    validate: function (val) {
      if (val.match(/\d{2,6}/g)) { // 校验位数
        return true;
      }
      return "请输入2-6位数字";
    }
  },
]

// 创建命令
let init = async (projectName) => {
  if (!projectName) {
    console.log(chalk.redBright.bold("请输入项目名称"));
    return;
  }
  //项目不存在
  try {
    const projectExist = await exist(projectName);
    if (projectExist) {
      console.log(symbol.error, chalk.red('该项目已存在！'));
    }
  } catch (error) {
    //命令行交互
    inquirer.prompt(question).then(async (answer) => {
      //下载模板 选择模板
      //通过配置文件，获取模板信息
      let loading = ora('初始化项目中...');
      loading.start();
      loading.color = "yellow";
      const projectType = answer.type;
      downloadLocal(projectName, projectType).then(() => {
        loading.succeed();
        // 写入package.json
        const isNotMulMaster = projectType !== 'mul-master';
        const packageJson = isNotMulMaster ? `${projectName}/package.json` : `${projectName}/master/package.json`;
        if (fs.existsSync(packageJson)) {
          const data = fs.readFileSync(packageJson).toString();
          let json = JSON.parse(data);
          json.name = projectName; // 项目名
          json.author = answer.author; // 作者
          json.description = answer.description; // 描述信息
          json.version = answer.version; // 版本号
          json.port = answer.port; // 端口号 默认8080
          //修改项目文件夹中 package.json 文件
          fs.writeFileSync(packageJson, JSON.stringify(json, null, '\t'), 'utf-8');
          console.log(symbol.success, chalk.green('项目初始化完成！依次运行以下命令：'));
          console.log(symbol.success, chalk.green('cd ' + projectName));
          console.log(symbol.success, chalk.green(isNotMulMaster ? 'npm install' : 'npm run cinit'));
          console.log(symbol.success, chalk.green('npm run serve'));
        }
      }, () => {
        loading.fail();
      });
    });
  }
}
module.exports = init;
