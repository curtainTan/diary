// 定义结构体

module.exports = {
	JsonResult: { // @response 200 JsonResult 操作结果，名字与相应结果对应
		success: { type: 'boolean' }, // 结果
		results: { type: 'string' }, // 服务器返回的数据
	},
	// 通过 id 删除元素的 结构体
	deleteById: {
		id: { type: 'number' },
	},
}
