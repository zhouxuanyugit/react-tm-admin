import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const familyManagement = Loadable({loader: () => import('@/views/familyManagement'),loading: Loading});
const taskTypeConfig = Loadable({loader: () => import('@/views/taskManagement/taskTypeConfig'),loading: Loading});
const taskListManagement = Loadable({loader: () => import('@/views/taskManagement/taskListManagement'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user'),loading: Loading});

export default [
  { path: "/familyManagement/index", component: familyManagement },
  { path: "/taskManagement/type", component: taskTypeConfig },
  { path: "/taskManagement/list", component: taskListManagement },
  { path: "/user", component: User },
  { path: "/error/404", component: Error404 },
];
