# mxs-cli

vue脚手架，探索适合mxsui最佳工程结构脚手架

包含基于qiankun的微前端项目脚手架

## 使用

```
npm i mxs-cli -g

mxs init myApp

cd ./myApp

npm install

npm run serve
```

1. 首先全局安装mxs-cli脚手架，之后使用命令 `mxs init 你的项目名` 创建应用即可。

2. 进入init后依次输入`auther, description, type, port`信息，其中type分为普通web项目，微前端主应用master，微前端子应用mul-app；port为开发环境端口号，默认8080主要用于mul-app类型

3. 进入创建好的项目模板目录 `cd yourapp`

4. 下载依赖 `npm install`

5. 运行项目 `npm run serve`
