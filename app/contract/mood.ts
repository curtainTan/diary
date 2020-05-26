// mood 相关结构体

module.exports = {
	// 更改 mood 的结构体
	updateMoodlDto: {
		id: { type: 'number', required: true },
		mood: { type: 'string', required: true },
	},
	// 创建 mood 的结构体
	createMoodDto: {
		mood: { type: 'string', required: true },
	},
	// 通过 moodId 获取这一类的文章
	getArticleDto: {
		moodId: { type: 'number', required: true },
		page: { type: 'number' },
		size: { type: 'number' },
	},
}
