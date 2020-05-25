import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>;

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1590070204791_4027';

	// add your egg config in here
	config.middleware = [];

	config.swaggerdoc = {
		dirScanner: './app/controller', // 配置自动扫描的控制器路径
		apiInfo: {
			title: 'my-doc', // 接口文档的标题
			description: 'swagger-ui for Render document.', // 接口文档描述
			version: '1.0.0', // 接口文档版本
		},
		consumes: ['application/json'],
		produces: ['application/json'],
		routerMap: true, // 是否启用自动生成路由，默认 true (启用)
		enable: true, // 默认 true (启用)
	};

	config.sequelize = {
		dialect: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'diary',
		username: 'root', // 数据库登录用户名
		password: '123456', // 数据库登录密码
		timezone: '+08:00',
		define: {
			timestamps: true,
			// paranoid: true,
			freezeTableName: true,
			underscored: false,
		},
		dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
			dateStrings: true,
			typeCast(field, next) {
				if (field.type === 'DATETIME') {
					return field.string();
				}
				return next();
			},
		},
	};

	// add your special config in here
	// const bizConfig = {
	//   sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
	// };

	// the return config will combines to EggAppConfig
	return {
		...config,
	};
};
