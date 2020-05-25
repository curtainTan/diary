// article 相关结构体

module.exports = {
	// 更改 mood 的结构体
	updateArticlelDto: {
		id: { type: 'number' },
		mood: { type: 'string' },
	},
	// 创建 mood 的结构体
	createArticleDto: {
		title: { type: 'string' },
		content: { type: 'string' },
		moodId: { type: 'number' },
		labelIds: { type: 'array', itemType: 'number' },
	},
}
