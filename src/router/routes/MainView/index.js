import Abstract from '../Abstract'
import Profile from '@/views/MainView/Profile'
import Overview from '@/views/MainView/Overview'
import Contacts from '@/views/MainView/Contacts'
import Search from '@/views/MainView/Search'
import Messages from '@/views/MainView/Messages'
import Notifications from '@/views/MainView/Notifications'
import Jobs from '@/views/MainView/Jobs'
import ConstructionNotice from '@/views/MainView/ConstructionNotice'

import forumRoutes from './forum'
import eventRoutes from './events'

const routes = [
  {
    path: '',
    name: 'home',
    alias: ['home'],
    component: Overview,
  },
  {
    path: 'forum',
    alias: ['posts'],
    component: Abstract,
    children: forumRoutes,
  },
  {
    path: 'events',
    alias: ['veranstaltungen'],
    component: Abstract,
    children: eventRoutes,
  },
  {
    path: 'kontakte',
    alias: ['netzwerk', 'people'],
    component: Contacts,
  },
  {
    path: 'jobs',
    component: Jobs,
  },
  {
    path: 'search',
    alias: ['suche', 'durchsuchen'],
    component: Search,
  },
  {
    path: 'messages',
    alias: ['chats', 'nachrichten', 'unterhaltungen'],
    component: Messages,
  },
  {
    path: 'benachrichtigungen',
    alias: ['notifications'],
    component: Notifications,
  },
  {
    path: 'me',
    component: Profile,
  },
  {
    path: '*',
    component: ConstructionNotice,
  },
]

/**
 * Assign index to all routes' or their default child routes' meta object
 * Later used to determine in which 'direction' the navigation is moving
 */
const routesWithNavOrder = routes.map((route, index) => {
  if (!route.children) return { meta: { index }, ...route }

  const defaultChild = route.children.find(child => child.path === '')
  defaultChild.meta = { index, ...defaultChild.meta }
  return route
})

export default routesWithNavOrder
