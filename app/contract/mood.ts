// mood 相关结构体

module.exports = {
	// 更改 mood 的结构体
	updateMoodlDto: {
		id: { type: 'number' },
		mood: { type: 'string' },
	},
	// 创建 mood 的结构体
	createMoodDto: {
		mood: { type: 'string' },
	},
}
