import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

function loggedInRedirectDashboard(to, from, next) {
    if (localStorage.token) {
      next('/');
    } else {
      next();
    }
}
  
function isLoggedIn(to, from, next) {
    if (localStorage.token) {
        const jwtPayload = JSON.parse(window.atob(localStorage.token.split('.')[1]))
        if (jwtPayload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            next('/login');
        }
      next();
    } else {
      next('/login');
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: isLoggedIn
    },
    {
        path: '/menuList',
        name: 'menuList',
        component: () => import('../views/Master/menuList.vue'),
        beforeEnter: isLoggedIn,
    },
    {
        path: '/klpUsers',
        name: 'klpUsers',
        component: () => import('../views/Master/klpUsers.vue'),
        beforeEnter: isLoggedIn,
    },
    {
        path: '/registrasi',
        name: 'registrasi',
        component: () => import('../views/Master/registrasi.vue'),
        beforeEnter: isLoggedIn,
    },
    {
        path: '/agenda',
        name: 'Agenda',
        component: () => import('../views/Agenda.vue'),
        beforeEnter: isLoggedIn,
    },
    {
        path: '/verifikasi',
        name: 'Verifikasi',
        component: () => import('../views/Verifikasi.vue'),
        beforeEnter: isLoggedIn,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: loggedInRedirectDashboard,
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
  })
  
  export default router