import { Controller } from 'egg';

/**
 * @class home
 */
export default class HomeController extends Controller {
	/**
   * @summary 主页
   * @description 主页
   * @router get /v1/book/index
   * @request query integer articleId 查询单篇文章
   * @response 200 JsonResult 操作结果
    */
	async index() {
		const { ctx } = this;

		const res = await ctx.service.test.getArticleMood(1)

		ctx.body = {
			success: true,
			results: res,
		}
	}
}
