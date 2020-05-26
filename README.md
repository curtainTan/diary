# diary -- 心情日记

**项目介绍：**

	日记项目，日记可以添加一个心情，添加多了标签，目的是使用日记记录下每天的心情与思考。
	可以根据 心情 筛选该心情写下的日记，也可以根据 标签 筛选该 标签 的日记

**项目接口效果展示：**

![swagger](https://s1.ax1x.com/2020/05/26/tFpzAf.png)

**项目特性：**

1. 自动化建表-可使用命令渐进式扩展表
2. 使用 swagger 进行接口管理与测试

**项目 sequelize 使用技术点：**

1. 使用 sequelize-cli 创建迁移模型
2. 定义 model 表结构
3. 一对多的实现
4. 多对多的实现

**项目规划：**

1. 项目基本搭建
2. 配置 swagger 和 egg-sequelize
3. 设计数据库 er 模型
4. 使用 sequelize-cli 创建 migration 迁移模型
5. 修改 model 和 migrate 文件中的表结构，删除不必要字段，添加表配置属性
6. 创建表 与 修改表结构
7. 编写 service 文件 和 controller 文件
8. 编写 swagger 注解 - contract 结构体
9. 接口测试

## 一、项目基本搭建

初始化 egg-ts 项目

```js
$ mkdir showcase && cd showcase
$ npm init egg --type=ts
$ npm i
$ npm run dev
```

## 二、配置 swagger 和 egg-sequelize

### 配置 swagger

1. 安装插件

```shell
npm i egg-swagger-doc --save // 自动生成接口描述配置
```

2. 配置 config

```js
// {app_root}/config/plugin.js
exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};

// config/config.default.js
exports.swaggerdoc = {
  dirScanner: './app/controller', // 配置自动扫描的控制器路径
  // 接口文档的标题，描述或其它
  apiInfo: {
    title: 'Render', // 接口文档的标题
    description: 'swagger-ui for Render document.', // 接口文档描述
    version: '1.0.0', // 接口文档版本
  },
  schemes: ['http', 'https'], // 配置支持的协议
  consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
  produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
  securityDefinitions: {
    // 配置接口安全授权方式
    // apikey: {
    //   type: 'apiKey',
    //   name: 'clientkey',
    //   in: 'header',
    // },
    // oauth2: {
    //   type: 'oauth2',
    //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
    //   flow: 'password',
    //   scopes: {
    //     'write:access_token': 'write access_token',
    //     'read:access_token': 'read access_token',
    //   },
    // },
  },
  enableSecurity: false, // 是否启用授权，默认 false（不启用）
  // enableValidate: true,    // 是否启用参数校验，默认 true（启用）
  routerMap: true, // 是否启用自动生成路由，默认 true (启用)
  enable: true, // 默认 true (启用)
};
```

使用案例

```js
// app/controller/home.js
/**
 * @controller HomeService home接口
 */
class HomeController extends Controller{
    /**
    * @summary 根据Id获取信息
    * @description 根据Id获取信息
    * @router get /v1/book/getBook   最后为下面对应的方法名
    * @request query integer Id ID
    * @request body body-model body的请求参数
    * @request path 
    * @response 200 JsonResult 操作结果
    */
    async getBook(){
        const { ctx,service } = this; //解构出应用上下文和业务逻辑
        const id = ctx.query.Id; //获取参数
        const result = await service.home.getById(id); //使用业务逻辑层的方法返回值
        ctx.body = result; //JsonResult 返回结果必须进行处理
    }
}
module.exports = HomeController;
```

### 配置 egg-sequelize

1. 安装
```js
npm install --save egg-sequelize mysql2
```

2. 在 config/plugin.js 中引入 egg-sequelize 插件
```js
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
```

3. 在 config/config.default.js 中编写 sequelize 配置
```js
config.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'egg-sequelize-doc-default',
};
```

## 三、设计 er 模型

![er](https://s1.ax1x.com/2020/05/26/ti2yK1.png)

**说明：**

	编写日记时，可以选择一个 mood 和 多个 label 标签
	一篇文章只能有一个 mood 标签，可以有多个 label 标签
	可以通过 mood 筛选文章，可以通过 label 筛选文章

关系：
1. article表 与 mood表 是多对一关系
2. aeticle表 与 label表 是多对多关系

因为 article表 与 mood表 是多对一关系，所以需要在 article表 中添加一个字段来存放 mood 的id。

因为 aeticle表 与 label表 是多对多关系，需要创建一个中间表来连接他们的关系，表中的字段就是互相的 id 字段，也可以在中间表设置其他字段。

**注意：** 由于 sequelize 的多表关联的特性，字段命名需要使用小驼峰命名法则，且第一部分是表名，第二部分是关联字段名。


## 四、使用 sequelize-cli 创建 migration 迁移模型

1. 安装 sequelize-cli

```js
npm install --save-dev sequelize-cli
```

相关命令行请参考：**[sequlize-cli 命令行总结](https://github.com/sequelize/cli)**

```js
// 定义文章表
npx sequelize model:generate --name Article --attributes title:string,content:text,moodId:integer,userId:integer

// 定义心情表
npx sequelize model:generate --name Mood --attributes mood:string

// 定义 label 表
npx sequelize model:generate --name Label --attributes label:string

// 定义 文章 和 label 的中间表
npx sequelize model:generate --name ArtLabel --attributes articleId:integer,labelId:integer
```

## 五、修改 model 和 migrate 文件中的表结构

使用命令创建的 建表 文件会自动添加 `createdAt` 和 `updatedAt` 字段，

如果不需要这两个字段，需要在 `database/migrations` 文件下的建表文件，删除这些字段。

删除字段后，需要在 `app/model` 文加下的 model 文件，修改表配置选项来屏蔽不要的时间字段

## 六、创建表 与 修改表结构

1. 创建表

使用 `sequelize-cli` 命令执行迁移文件，

2. 修改表结构

结合 **[sequlize-cli 命令官方文档](https://github.com/sequelize/cli)** 和 **[官方 migration 接口文档](https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html)**


## 七、编写 service 文件 和 controller 文件

1. service 文件

service 文件做逻辑处理，最好遵循单一职责原则，好在 `controller` 文件内拼装执行。

2. controller 文件

在 `controller` 文件内，需要编写 `swagger` 注解。

## 八、编写 swagger 注解 - contract 结构体

注解编写请参考：[egg-swagger-doc 官方文档](https://github.com/Yanshijie-EL/egg-swagger-doc)

案例：

```js
/**
 * @controller article 文章接口
 */
class ArticleController extends BaseController {
	/**
     * @summary 添加文章
     * @description 添加文章
     * @router post /v1/admin/addArticle
     * @request body createArticleDto 数据模型 label参数
     * @response 200 JsonResult 运行结果
     */
	async addArticle() {
		const { ctx, service } = this
		const res = await service.article.createArticle(ctx.request.body)
		this.jsonBody(res)
	}
}
```

## 九、接口测试

现在是手动进行接口测试

后续尝试添加 jest 自动测试


# 未完待续.....

