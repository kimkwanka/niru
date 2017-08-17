import Home from '../client/components/Home';
import About from '../client/components/About';
import StyleGuide from '../client/components/Styleguide';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/styleguide',
    exact: true,
    component: StyleGuide,
  },
];

export default routes;
