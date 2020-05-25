import BaseController from './baseController';


/**
 * @controller mood mood心情标签接口
 */
class LabelController extends BaseController {

	/**
     * @summary 添加心情
     * @description 添加心情
     * @router post /v1/admin/addMood
     * @request body createMoodDto 数据模型 label参数
     * @response 200 JsonResult 运行结果
     */
	async addMood() {
		const { ctx, service } = this
		const res = await service.mood.create(ctx.request.body)
		this.jsonBody(res)
	}

	/**
     * @summary 删除心情
     * @description 删除心情
     * @router post /v1/admin/deleteMood
     * @request body deleteById 数据模型 mood参数
     * @response 200 JsonResult 运行结果
     */
	async deleteMood() {
		const { ctx, service } = this
		const res = await service.mood.destroy(ctx.request.body.id)
		this.jsonBody(res)
	}

	/**
     * @summary 修改心情
     * @description 修改心情
     * @router post /v1/admin/modifyMood
     * @request body updateMoodlDto 数据模型 修改mood心情的参数
     * @response 200 JsonResult 运行结果
     */
	async modifyMood() {
		const { ctx, service } = this
		const data = ctx.request.body
		const res = await service.mood.update(data.id, data)
		this.jsonBody(res)
	}

	/**
     * @summary 获取所有心情
     * @description 获取所有心情
     * @router get /v1/admin/getAllMood
     * @response 200 JsonResult 运行结果
     */
	async getAllMood() {
		const { service } = this
		const res = await service.mood.getAll()
		this.jsonBody(res)
	}

}


export default LabelController
