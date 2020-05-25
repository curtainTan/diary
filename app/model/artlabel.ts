
module.exports = app => {
	const DataTypes = app.Sequelize
	const Artlabel = app.model.define('ArtLabel', {
		articleId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		labelId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	}, {
		timestamps: false,
	});
	Artlabel.associate = function () {
		// associations can be defined here
		// console.log('app.model.ArtLabel======')
		// console.log(app.model.Artlabel)
		// app.model.Artlabel.hasMany(app.model.Label, { foreignKey: 'labelId', targetKey: 'id' })
		// app.model.Artlabel.hasMany(app.model.Article, { foreignKey: 'articleId', targetKey: 'id' })
	};
	return Artlabel;
};
