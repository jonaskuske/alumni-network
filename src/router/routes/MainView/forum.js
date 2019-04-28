import Abstract from '../Abstract';
import Overview from '@/views/MainView/Forum/Overview';
import CreatePost from '@/views/MainView/Forum/CreatePost';
import EditPost from '@/views/MainView/Forum/EditPost';
import ViewPost from '@/views/MainView/Forum/ViewPost';
import SubforumList from '@/views/MainView/Forum/SubforumList';
import Subforum from '@/views/MainView/Forum/Subforum';

export default [
  {
    path: '',
    component: Overview,
  },
  {
    path: 'create',
    alias: ['new', 'submit'],
    component: CreatePost,
  },
  {
    path: 'post',
    redirect: '/forum',
  },
  {
    path: 'post/:id',
    component: ViewPost,
    props: true,
  },
  {
    path: 'post/:id/edit',
    component: EditPost,
    props: true,
  },
  {
    path: 'subforums',
    alias: ['sub', 'forums'],
    component: Abstract,
    children: [
      {
        path: '',
        component: SubforumList,
      },
      {
        path: ':tag',
        component: Subforum,
        props: true,
      },
      {
        path: ':tag/create',
        alias: [':tag/new', ':tag/submit'],
        component: CreatePost,
        props: true,
      },
    ],
  },
];
