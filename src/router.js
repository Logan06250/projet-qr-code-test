import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyAccount from '@/components/MyAccount'
import AccountInfo from '@/components/AccountInfo'
import Passport from '@/components/Passport'
import Code from '@/components/Code'
import Selfie from'@/components/Selfie'
import FormStamp from '@/components/FormStamp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/MyAccount',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/AccountInfo',
      name:'AccountInfo',
      component: AccountInfo
    },
    {
      path: '/Passport',
      name:'Passport',
      component: Passport
    },
    {
      path: '/Selfie',
      name:'Selfie',
      component: Selfie
    },
    {
      path: '/Code',
      name:'Code',
      component: Code
    },
    {
      path: '/FormStamp',
      name: 'FormStamp',
      component: FormStamp
    }
  ]
})
