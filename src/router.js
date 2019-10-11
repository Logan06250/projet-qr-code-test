import Vue from 'vue'
import Router from 'vue-router'
import ManageProfile from '@/components/ManageProfile'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ManageProfile',
      component: ManageProfile
    }
  ]
})
