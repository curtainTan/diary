import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

	/**
   * sayHi to you
   * @param name - your name
   */
	async sayHi(name: string) {
		return `hi, ${name}`;
	}

	/**
	 * 根据 id 查找文章
	 */
	async getArticleById(aid: number) {
		console.log('我接收到参数了----', aid)
		const res = await this.ctx.model.Article.findAll({
			where: {
				id: aid,
			},
			inclede: [
				{ model: this.app.model.Label },
			],
		})
		console.log('获取的结果是：')
		console.log(res)
		return '返回成功--'
	}

	// 联合查询 id 查询 label 和 mood
	async getArticleAll(aid: number) {
		console.log('我接收到参数了----', aid)
		const res = await this.ctx.model.Article.findByPk(aid)
		console.log('获取的结果是：')
		console.log(res)
		return '返回成功--'
	}

	// 查询 mood
	async getArticleMood(aid: number) {
		const res = await this.ctx.model.Article.findAll({
			where: {
				id: aid,
			},
			include: [
				{
					model: this.ctx.model.Mood,
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
		console.log('获取的结果是：')
		console.log(res)
		return res
	}

}
