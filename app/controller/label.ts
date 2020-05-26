import BaseController from './baseController';


/**
 * @controller label label标签接口
 */
class LabelController extends BaseController {


	/**
     * @summary 添加标签
     * @description 添加标签
     * @router post /v1/admin/addLabel
     * @request body createLabelDto 数据模型 label参数
     * @response 200 JsonResult 运行结果
     */
	async addLabel() {
		const { ctx, service } = this
		const res = await service.label.create(ctx.request.body)
		this.jsonBody(res)
	}

	/**
     * @summary 删除标签
     * @description 删除标签
     * @router post /v1/admin/deleteLabel
     * @request body deleteById 数据模型 label参数
     * @response 200 JsonResult 运行结果
     */
	async deleteLabel() {
		const { ctx, service } = this
		const res = await service.label.destroy(ctx.request.body.id)
		this.jsonBody(res)
	}

	/**
     * @summary 修改标签
     * @description 修改标签
     * @router post /v1/admin/modifyLabel
     * @request body updateLabelDto 数据模型 修改label的参数
     * @response 200 JsonResult 运行结果
     */
	async modifyLabel() {
		const { ctx, service } = this
		const data = ctx.request.body
		const res = await service.label.update(data.id, data)
		this.jsonBody(res)
	}

	/**
     * @summary 获取所有标签
     * @description 获取所有标签
     * @router get /v1/admin/getAllLabel
     * @response 200 JsonResult 运行结果
     */
	async getAllLabel() {
		const { service } = this
		const res = await service.label.getAll()
		this.jsonBody(res)
	}

	/**
     * @summary 获取文章
     * @description 根据标签获取相关文章
     * @router get /v1/admin/getArticlByLabel
	 * @request query integer *labelId labelId
	 * @request query integer eg:0 page 页码
	 * @request query integer size eg:10 每页个数
     * @response 200 JsonResult 运行结果
     */
	async getArticlByLabel() {
		const { service, ctx } = this
		const res = await service.label.getArticleByLabel(ctx.query.labelId, ctx.query.page, ctx.query.size)
		this.jsonBody(res)
	}

}


export default LabelController
