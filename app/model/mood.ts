
module.exports = app => {
	const DataTypes = app.Sequelize
	const Mood = app.model.define('Mood', {
		mood: DataTypes.STRING,
	}, {
		timestamps: false,
	});
	Mood.associate = function () {
		// associations can be defined here
		app.model.Mood.hasMany(app.model.Article)
	};
	return Mood;
};
