
module.exports = app => {
	const DataTypes = app.Sequelize
	const Label = app.model.define('Label', {
		label: DataTypes.STRING,
	}, {
		timestamps: false,
	});
	Label.associate = function () {
		// associations can be defined here
		app.model.Label.belongsToMany(app.model.Article, {
			through: app.model.Artlabel,
			foreignKey: 'labelId',
			otherKey: 'articleId',
		})
	};
	return Label;
};
