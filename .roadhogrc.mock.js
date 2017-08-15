const mock = {}
//循环 mock 下的文件 导入请求拦截
require('fs').readdirSync(require('path').join(__dirname + '/src/mock')).forEach(function(file) {
  Object.assign(mock, require('./src/mock/' + file))
})
module.exports = mock
