import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import Room from '@/components/Room'
import Roboot from '@/components/Roboot'
import homePage from '@/components/homePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        children: [
          {
            path: 'roboot',
            name: 'roboot',
            component: Roboot
          },
          {
            path: 'homepage',
            name: 'homepage',
            component: homePage
          }
        ]
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    }
  ]
})
