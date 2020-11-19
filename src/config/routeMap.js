import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const familyManagement = Loadable({loader: () => import(/*webpackChunkName:'RichTextEditor'*/'@/views/familyManagement'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});
const User = Loadable({loader: () => import(/*webpackChunkName:'User'*/'@/views/user'),loading: Loading});

export default [
  { path: "/familyManagement/index", component: familyManagement },
  { path: "/user", component: User },
  { path: "/error/404", component: Error404 },
];
