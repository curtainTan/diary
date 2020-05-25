import { Controller } from 'egg'

class BaseController extends Controller {

	/**
     * 返回 统一 数据
     */
	jsonBody(data) {
		const success = true
		this.ctx.body = {
			success,
			result: data,
		}
	}
}

export default BaseController
