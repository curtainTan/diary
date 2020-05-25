# new-start

## 配置 swagger

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

案例

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

## 多对多

[在EggJS中使用Sequelize做联表查询](https://www.jianshu.com/p/078087c69b77)

[egg sequelize 实践](https://juejin.im/post/5c2db28de51d453529627ef4)





