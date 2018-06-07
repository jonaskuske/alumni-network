import Overview from '@/views/MainView/Events/Overview'
import ViewEvent from '@/views/MainView/Events/ViewEvent'
import EditEvent from '@/views/MainView/Events/EditEvent'
import CreateEvent from '@/views/MainView/Events/CreateEvent'
import DateView from '@/views/MainView/Events/DateView'

export default [
  {
    path: '',
    component: Overview,
  },
  {
    path: 'create',
    alias: ['new', 'submit'],
    component: CreateEvent,
  },
  {
    path: 'event',
    redirect: '/events',
  },
  {
    path: 'event/:id',
    alias: ['veranstaltung/:id'],
    component: ViewEvent,
    props: true,
  },
  {
    path: 'event/:id/edit',
    alias: ['veranstaltung/:id/edit'],
    component: EditEvent,
    props: true,
  },
  {
    path: 'date',
    redirect: '/events?view=calendar',
  },
  {
    path: 'date/:datestring',
    component: DateView,
    props: true,
  },
]
