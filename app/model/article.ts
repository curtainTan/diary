
module.exports = app => {
	const DataTypes = app.Sequelize
	const Article = app.model.define('Article', {
		title: DataTypes.STRING,
		content: DataTypes.TEXT,
		moodId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
	});

	Article.associate = function () {
		// associations can be defined here

		app.model.Article.belongsToMany(app.model.Label, {
			through: app.model.Artlabel,
			foreignKey: 'articleId',
			otherKey: 'labelId',
		})

		app.model.Article.belongsTo(app.model.Mood, { foreignKey: 'moodId' })
	};
	return Article;
};
