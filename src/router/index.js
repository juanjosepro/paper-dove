import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/registrarme',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "UserProfile" */ '../views/UserProfile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'),
  },
  {
    path: '/create-room',
    name: 'CreateRoom',
    component: () => import(/* webpackChunkName: "CreateRoom" */ '../views/CreateRoom.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/update-room/:id',
    props: true,
    name: 'UpdateRoom',
    component: () => import(/* webpackChunkName: "UpdateRoom" */ '../views/UpdateRoom.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/chat/:id',
    props: true,
    name: 'Chat',
    component: () => import(/* webpackChunkName: "Chat" */ '../views/Chat.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !(await store.dispatch('user/getCurrentUser'))) {
    next({ name: 'Login' });
  } else if (!requiresAuth && (await store.dispatch('user/getCurrentUser'))) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
