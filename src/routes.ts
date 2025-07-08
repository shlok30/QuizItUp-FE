import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Summary from './pages/Summary';

const routes = [
  {
    path: '/',
    component: Home,
    isProtected: true,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/quiz',
    component: Quiz,
    isProtected: true,
  },
  {
    path: '/summary',
    component: Summary,
    isProtected: true,
  },
  {
    path: '/history',
    component: History,
    isProtected: true,
  },
];

export default routes;
