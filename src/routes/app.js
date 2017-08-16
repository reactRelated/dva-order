/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Layout, Loader } from '../components'
import { classnames, config } from '../utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './app.less'
import Error from './error'

const { prefix, openPages } = config

const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {


  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions,contentHeight } = app
  console.log(app)
  let { pathname } = location
  // startsWith 表示参数字符串是否在源字符串的头部
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  /*pathToRegexp 将路径转换成  Reg.exec() 匹配路由获得当前的 菜单*/
  const current = menu.filter(item =>pathToRegexp(item.route || '').exec(pathname))
  /* visit为菜单权限id，includes判断 当前current[0].id是否 存在于visit（当前菜单权限），检查权限 */
  const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  const href = window.location.href

  //loading 进度条
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    isNavbar,
    menu,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  /*面包屑*/
  const breadProps = {
    menu,
  }
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

    return (
        <div className={classnames(styles.rootBg,{ [styles.light]: !darkTheme })}>
            <Helmet>
                <title>ANTD ADMIN</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href={logo} type="image/x-icon" />
                {iconFontJS && <script src={iconFontJS} />}
                {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
            </Helmet>
            <div className={classnames(styles.layout, { [styles.fold]: siderFold }, { [styles.withnavbar]: isNavbar })}>
               <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
                        <Sider {...siderProps} />
                    </aside>
                <div className={styles.main}>
                    <Header {...headerProps} />
                    <Bread {...breadProps} />
                    <div className={styles.container}>
                        <div className={styles.content} style={{minHeight:contentHeight}}>
                            {hasPermission ? children : <Error />}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

/*App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}*/

export default connect(({ app, loading }) => ({ app, loading }))(App)
