import BaseService from './baseService'

class Mood extends BaseService {
	constructor(ctx) {
		super(ctx, 'Mood')
	}

	/**
	 * 通过 moodId 获取这一类的文章
	 * @param moodId 心情id
	 * @param page 页码
	 * @param size 每页数量
	 */
	async getArticleByMoodId(moodId: number, page = 0, size = 10) {
		const item = await this.getById(moodId)

		// 如果没有获取到元素就提前返回错误
		if (!item) return '参数错误'
		const res = await item.getArticles({
			attributes: { exclude: ['moodId'] },
			include: [
				{
					model: this.ctx.model.Label,
					through: {
						// 指定中间表的属性，这里表示不需要任何中间表的属性
						attributes: [],
					},
				},
				{ model: this.ctx.model.Mood },
			],
			offset: size * page,
			limit: size,
			order: [['createdAt', 'DESC']],
		})

		// 获取总数
		const counts = await item.countArticles()
		return {
			counts,
			page,
			size,
			articleList: res,
		}
	}

}

export default Mood
