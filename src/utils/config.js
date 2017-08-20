const APIV = '/api/v1'
// const APIV = '/api/v2'
module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV}/user/login`,
    userLogout: `${APIV}/user/logout`,
    userInfo: `${APIV}/userInfo`,
    users: `${APIV}/users`,
    posts: `${APIV}/posts`,
    user: `${APIV}/user/:id`,
    dashboard: `${APIV}/dashboard`,
    menus: `${APIV}/menus`,
    weather: `${APIV}/weather`,
    v1test: `${APIV}/test`,
    v2test: `${APIV}/test`,
  },
}
