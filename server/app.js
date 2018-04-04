const Koa = require('koa')
const app = new Koa()
const KoaBody = require('koa-body')
const server = require('koa-static')
const path = require('path')
const route = require('./router/index')
const methods = require('./common/methods')
const port = 8888




// 处理静态文件
app.use(server(path.join(__dirname, '/dist/')))
// 在最外层捕获错误
app.use(methods.errHandle)
// 解析请求体
app.use(KoaBody())
// 使用路由
app.use(route.routes())
// 监听端口
app.listen(port)

console.log('app listen on ' + port);