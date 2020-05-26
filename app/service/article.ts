import BaseService from './baseService'

class Article extends BaseService {
	constructor(ctx) {
		super(ctx, 'Article')
	}

	/**
	 * 创建一篇文章
	 * @param body 文章的结构体
	 */
	async createArticle(body: any) {
		const data = {
			title: body.title,
			content: body.content,
		}

		const item = await this.db.create(data)
		// 添加心情
		const mood = await this.ctx.model.Mood.findByPk(body.moodId)
		await item.setMood(mood)
		// 添加 label
		const labels = await this.ctx.model.Label.findAll({ where: { id: body.labelIds } })
		await item.setLabels(labels)

		return item
	}

	/**
	 * 根据 id 返回一篇文章
	 * @param aid 文章id
	 */
	async getArticleById(aid: number) {
		return await this.db.findByPk(aid, {
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
	}

	/**
	 * 分页查询，并返回结果
	 * @param page 页码
	 * @param size 每页个数-默认10个
	 */
	async findAndCountAll(page = 0, size = 10) {
		const res = this.db.findAndCountAll({
			// where: {},
			offset: size * page,
			limit: size,
			order: [['createdAt', 'DESC']],
			attributes: { exclude: ['moodId'] },
			include: [
				{
					model: this.ctx.model.Mood,
					attributes: { exclude: ['moodId'] },
				},
				{
					model: this.ctx.model.Label,
					through: {
						// 指定中间表的属性，这里表示不需要任何中间表的属性
						attributes: [],
					},
				},
			],
		})
		return res
	}

}

export default Article
