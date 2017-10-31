import Vue from 'vue'
import Router from 'vue-router'
import Rank from '../components/router/rank'
import Recommend from '../components/router/recommend'
import Search from '../components/router/search'
import Singer from '../components/router/singer'
import User from '../components/user/user'
import Detail from '../components/router/singer-detail/singer-detail'
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
      component: Singer,
      children:[
          {
            path: ':id',
            component: Detail
          }
      ]
    },
    {
      path: '/user',
      component: User
    }
  ]
})
