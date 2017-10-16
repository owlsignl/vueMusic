import Vue from 'vue'
import Router from 'vue-router'
import Rank from '../components/router/rank'
import Recommend from '../components/router/recommend'
import Search from '../components/router/search'
import Singer from '../components/router/singer'
import User from '../components/user/user'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path:'/',
      redirect: '/recommend'
    },
    {
      path: '/search',
      component:Search
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/user',
      component: User
    }
  ]
})
