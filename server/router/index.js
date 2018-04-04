const Router = require('koa-router')
const route = new Router()
const api = require('../controller/api')


// 生成gif请求
route.post('/postSen', api.postSen)

module.exports = route