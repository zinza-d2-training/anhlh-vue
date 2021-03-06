import Vue, { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';
import ForgotPassword from './views/auth/ForgotPassword.vue';
import LoginComponent from './views/auth/LoginComponent.vue';
import UserComponent from './components/UserComponent.vue';
import RegisterComponent from './views/auth/RegisterComponent.vue';
import SideBarTop from './views/homes/SideBarTop.vue';
import Navbar from './views/registers/Navbar.vue';
import Dasboard from './layouts/Dasboard.vue';
import SearchInjections from './views/search/SearchInjections.vue';
import PointInjection from './views/admin/PointInjection.vue';
import Document from './views/document/Document.vue';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/auth/login',
      component: LoginComponent as ComponentOptions<Vue>
    },
    {
      path: '/forgot-password',
      component: ForgotPassword as ComponentOptions<Vue>
    },
    {
      path: '/auth/register',
      component: RegisterComponent as ComponentOptions<Vue>
    },
    {
      path: '/',
      component: Dasboard as ComponentOptions<Vue>,
      redirect: '/home',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/home',
          component: SideBarTop as ComponentOptions<Vue>,
          meta: { requiresAuth: true }
        },
        {
          path: '/user',
          component: UserComponent as ComponentOptions<Vue>
        },
        {
          path: '/register-person',
          component: Navbar as ComponentOptions<Vue>
        },
        {
          path: '/search-injections',
          component: SearchInjections as ComponentOptions<Vue>
        },
        {
          path: '/admin',
          component: PointInjection as ComponentOptions<Vue>
        },
        {
          path: '/document',
          component: Document as ComponentOptions<Vue>
        }
      ]
    }
  ]
});
router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
