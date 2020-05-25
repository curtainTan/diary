import BaseController from './baseController';


/**
 * @controller article 文章接口
 */
class ArticleController extends BaseController {


	/**
     * @summary 添加文章
     * @description 添加文章
     * @router post /v1/admin/addArticle
     * @request body createArticleDto 数据模型 label参数
     * @response 200 JsonResult 运行结果
     */
	async addArticle() {
		const { ctx, service } = this
		const res = await service.article.createArticle(ctx.request.body)
		this.jsonBody(res)
	}

	/**
     * @summary 获取一篇文章
     * @description 获取一篇文章
     * @router get /v1/admin/getArticleById
     * @request query number artid 文章id
     * @response 200 JsonResult 运行结果
     */
	async getArticleById() {
		const { ctx, service } = this
		const res = await service.article.getArticleById(ctx.query.artid)
		this.jsonBody(res)
	}

	/**
     * @summary 获取分页文章
     * @description 获取分页文章
     * @router get /v1/admin/findAndCountAll
     * @request query number page,number size 文章id
     * @response 200 JsonResult 运行结果
     */
	async findAndCountAll() {
		const { ctx, service } = this
		const res = await service.article.findAndCountAll(ctx.query.page, ctx.query.size)
		this.jsonBody(res)
	}

}


export default ArticleController
