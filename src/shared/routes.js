import Home from '../client/pages/Home/Home';
import Dashboard from '../client/pages/Dashboard/Dashboard';
import StyleGuide from '../client/pages/Styleguide/Styleguide';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    path: '/styleguide',
    exact: true,
    component: StyleGuide,
  },
];

export default routes;
