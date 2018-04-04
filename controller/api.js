const execSync = require('child_process').execSync
const methods = require('../common/methods')
// 定时器id
let tid


const postSen = async ctx => {
  // 获取gif的类型
  let temName = ctx.request.body.type
  // 获取gif的文本信息
  let data = ctx.request.body.data
  // 生成字幕文件，返回路径
  let assPath = await methods.genAss(temName, data)
  // 定义gif输出目录
  let outPath = `./output/${temName}-${methods.randomString()}.gif`
  // 定义生成gif的cmd命令
  let cmd = `ffmpeg -i ./templates/${temName}/template.mp4 -r 8 -vf ass=${assPath},scale=300:-2 -y ./dist${outPath}`
  try {
    // 执行cmd命令
    execSync(cmd)
  } catch (err) {
    console.log(err)
  }
  // 把输出路径返回给前端
  ctx.response.body = outPath
  // 定时删除；60秒后自动删除文件
  clearTimeout(tid)
  tid = setTimeout(() => {
    methods.delFiles('./dist/output')
  }, 60000);
}

module.exports = {
  postSen
}