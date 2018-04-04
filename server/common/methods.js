const fs = require('fs')
const bluebird = require('bluebird')
// 把所有fs模块下的api转化成promise形式
bluebird.promisifyAll(fs)
const ejs = require('ejs')

// 最外层捕获错误
const errHandle = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err.message);
    ctx.response.status = err.statusCode || err.status || 404
    ctx.response.body = {
      message: err.message
    }
  }
}

// 生成随机字符串
const randomString = () => {
  return Math.random().toString(36).substr(2)
}

// 这里把fs.readFile封装成了一个promise对象,因为需要返回path所以不用bluebird封装的方法
let writeFilePromise = function (path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve(path);
    })
  })
}

// 删除相应目录下的所有文件
const delFiles = async path => {
  let files = []
  files = await fs.readdirAsync(path)
  // 这里注意循环的函数前得加async；之前在这里忽略了
  files.forEach(async (item) => {
    let filePath = `${path}/${item}`
    // 如果是文件夹就调用删除文件夹方法，否则调用删除文件方法
    let isDir = (await fs.statAsync(filePath)).isDirectory()
    if (isDir) {
      await fs.rmdirAsync(filePath)
      return
    }
    await fs.unlinkAsync(filePath)
  })
}

// 生成ass文件
const genAss = async (temName, data) => {
  // 获取相应类型的gif模板
  let temTxext = (await fs.readFileAsync(`./templates/${temName}/template.ejs`)).toString()
  // 把前端提交来的文本渲染劲模板
  let renderText = ejs.render(temTxext, { data: data })
  // 因为bluebird转化后的writefile函数成功时没有返回值；这里需要一个path所以自己封装一个
  // 生成一个渲染后的ass文件
  let assPath = await writeFilePromise('./dist/output/sorry.ass', renderText)
  return assPath
}

module.exports = {
  genAss,
  delFiles,
  randomString,
  errHandle
}