import { Service } from 'egg'

class BaseService extends Service {
    db: any
    tableName: string
    constructor(ctx, tableName) {
    	super(ctx)
    	this.tableName = tableName
    	this.db = this.ctx.model[tableName]
    }

    /**
	 * 根据 id 获取表信息
	 * @param id 主键
	 */
    async getById(id: number) {
    	const res = await this.db.findByPk(id)
    	return res
    }

    /**
	 * 查询所有信息
	 */
    async getAll() {
    	const res = await this.db.findAll()
    	return res
    }

    /**
	 * 新增一条数据
	 */
    async create(model: any) {
    	console.log('查看数据结构：')
    	console.log(this.ctx.model.Label)
    	const res = await this.db.create(model)
    	return res
    }

    /**
	 * 更新表数据
	 * @param { number } id 更新数据的 id
	 * @param { * } model 该条数据的模型
	 */
    async update(id: number, model: any) {
    	const item = await this.getById(id)
    	if (!item) {
    		console.log('没有查找到数据')
    		return
    	}
    	if (model.id) delete model.id
    	const res = await item.update(model)
    	return res
    }

    /**
	 * 删除一个数据
	 * @param id 元素 id
	 */
    async destroy(id: number) {
    	const item = await this.getById(id)
    	if (!item) {
    		console.error('未找到该信息')
    		return
    	}
    	const res = await item.destroy()
    	return res
    }

}

export default BaseService
