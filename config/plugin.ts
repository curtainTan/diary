import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
	// static: true,
	// nunjucks: {
	//   enable: true,
	//   package: 'egg-view-nunjucks',
	// },
	swaggerdoc: {
		enable: true,
		package: 'egg-swagger-doc',
	},
	sequelize: {
		enable: true,
		package: 'egg-sequelize',
	},
};

export default plugin;
