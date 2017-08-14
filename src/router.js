import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

/*注册 Model*/
const registerModel = (app, model) => {
    if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
        app.model(model)
    }
}
const Routers = function ({ history, app }) {
    const routes = [
        {
            path: '/',
            component: App,
            getIndexRoute (nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/dashboard'))
                    cb(null, { component: require('./routes/dashboard/') })
                }, 'dashboard')
            },
            childRoutes: [
                {
                  path: 'login',
                  getComponent (nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/login'))
                      cb(null, require('./routes/login/'))
                    }, 'login')
                  },
                },
                {
                    path: 'dashboard',
                    getComponent (nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/dashboard'))
                            cb(null, require('./routes/dashboard/'))
                        }, 'dashboard')
                    },
                }
            ],
        },
    ]

    return <Router history={history} routes={routes} />
}

export default Routers;
