import * as auth from '@/lib/auth'

import Splash from '@/views/Splash'
import MainView from '@/views/MainView'
import Imprint from '@/views/Imprint'
import Privacy from '@/views/Privacy'
import splashRoutes from './Splash'
import mainRoutes from './MainView'

export default [
  {
    path: '/login',
    component: Splash,
    children: splashRoutes,
    beforeEnter(from, to, next) {
      if (auth.checkAuth()) next('/')
      else next()
    },
  },
  {
    path: '/impressum',
    alias: ['/imprint'],
    component: Imprint,
  },
  {
    path: '/datenschutz',
    alias: ['/privacy'],
    component: Privacy,
  },
  {
    path: '/',
    component: MainView,
    children: mainRoutes,
    beforeEnter(from, to, next) {
      if (auth.checkAuth()) next()
      else next({ path: '/login', query: { redirect: from.fullPath } })
    },
  },
]
