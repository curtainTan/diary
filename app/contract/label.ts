// label 相关结构体

module.exports = {
	// 更改 label 的结构体
	updateLabelDto: {
		id: { type: 'number' },
		label: { type: 'string' },
	},
	// 创建 label 的结构体
	createLabelDto: {
		label: { type: 'string' },
	},
}
