import Home from './components/Home/Home';
import About from './components/About/About';
import Styleguide from './components/Styleguide/Styleguide';
import NotFound404 from './components/NotFound404/NotFound404';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/styleguide',
    component: Styleguide,
  },
  {
    path: '*',
    component: NotFound404,
  },
];

export default routes;
