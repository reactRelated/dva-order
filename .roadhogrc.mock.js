const mock = {}
//循环 mock 下的文件 导入请求拦截
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
  Object.assign(mock, require('./mock/' + file))
})
module.exports = mock
