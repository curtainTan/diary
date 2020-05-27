import BaseService from './baseService'

class Label extends BaseService {
	constructor(ctx) {
		super(ctx, 'Label')
	}

	// 根据 label 获取文章
	async getArticleByLabel(labelId: number, page = 0, size = 10) {
		const label = await this.getById(labelId)

		// 如果没有获取到元素就提前返回错误
		if (!label) return '参数错误'
		const res = await label.getArticles({
			order: [['createdAt', 'DESC']],
			limit: size,
			offset: page * size,
			attributes: { exclude: ['moodId'] },
			include: [
				{ model: this.ctx.model.Mood },
				{
					model: this.ctx.model.Label,
					through: {
						// 指定中间表的属性，这里表示不需要任何中间表的属性
						attributes: [],
					},
				},
			],
		})

		// 获取总数
		const counts = await label.countArticles()

		return {
			counts,
			page,
			size,
			articleList: res,
		}
	}

}

export default Label
