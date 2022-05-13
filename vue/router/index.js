import Vue from 'vue';
import Router from 'vue-router';

// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
const Users = () => import('@/views/Users');
const Lottery = () => import('@/views/Lottery');
const Winners = () => import('@/views/Winners');
const Checks = () => import('@/views/Checks');
const Login = () => import('@/views/Login');
const Locales = () => import('@/views/Locales');
// const ag = () => import('@/views/ag');
Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      // meta: { requiresAuth: false },
      component: Login,
    },
    {
      path: '/',
      redirect: '/users',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
        {
          path: 'lottery',
          name: 'Lottery',
          component: Lottery,
        },
        {
          path: 'winners',
          name: 'Winners',
          component: Winners,
        },
        {
          path: 'checks',
          name: 'Checks',
          component: Checks,
        },
        {
          path: 'locales',
          name: 'Locales',
          component: Locales,
        },
        // {
        //   path: 'ag',
        //   name: 'Checks',
        //   component: ag,
        // },
      ],
    },
  ],
});
