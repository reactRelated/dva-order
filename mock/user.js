const qs = require('qs')
const Mock = require('mockjs')
const config = require('../src/utils/config')

const { apiPrefix } = config

/*角色权限*/
const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}
const userPermission = {
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEFAULT: {
    visit: ['1', '2', '21', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  }
}
/*用户*/
const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

module.exports = {

  [`POST ${apiPrefix}/user/login`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter(item => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ code: 1, message: 'Oks' })
    } else {
      res.status(400).end()
    }
  },
  [`GET ${apiPrefix}/user/logout`] (req, res) {
    res.clearCookie('token')
    res.status(200).json({code:1,message: 'logout Oks'})
  },

  [`GET ${apiPrefix}/user`] (req, res) {

    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(200).send({ code: -1, message: 'Not Login' })
      return;
    }
    const token = JSON.parse(cookies.token)

    if (token) {
      response.code = 1;
      const userItem = adminUsers.filter(otoken => otoken.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].username
        user.id = userItem[0].id;
      }
    }
    response.message = 'Login';
    response.user = user;
    res.json(response);

  }
}
