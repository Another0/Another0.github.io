import Vue from 'vue'
import Router from 'vue-router'
import app from '../app'
import index from '../components/index'
import recommend from '../components/recommend'
import playSongList from '../components/playSongList'
import songList from '../components/songList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
      children: [
        {
            path: 'recommend',
            component: recommend
        },
        {
            path: 'songList',
            component: songList
        }
      ]
    },
    {
        path: '/playSongList',
        component: playSongList
    },
    {
        path: '*', redirect: '/index/recommend'
    }
  ]
})
