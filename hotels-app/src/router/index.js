import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home.page.componenet'
import results from '@/components/pages/results.page.componenet'
import hotel from '@/components/pages/hotel.page.componenet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: home
    },
    {
      path: '/results',
      name: 'results',
      component: results
    },
    {
      path: '/hotel/:id',
      name: 'hotel',
      component: hotel
    }
  ],
  mode: 'history'
})
