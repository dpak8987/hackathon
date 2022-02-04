import Vue from 'vue'
import VueRouter from 'vue-router'
import addHack from '../components/hack/addHack.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "addHack"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
