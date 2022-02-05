import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/login.vue'
import addHack from '../components/hack/addHack.vue'
import Dashboard from '../components/dashboard/dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: {
      name: "Login"
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem("emp_id")) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/add_hack',
    name: 'addHack',
    component: addHack,
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem("emp_id")) {
        next();
      } else {
        next('/login');
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
