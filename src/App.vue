<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>
<script>

  import Home from './components/Home'
  import MyAccount from './components/MyAccount'
  import AccountInfo from './components/AccountInfo'
  import Passport from './components/Passport'
  import Formulaire from './components/Formulaire'
  import Selfie from './components/Selfie'
  import Code from './components/Code'
  import { Slide } from 'vue-burger-menu'

  export default {
    name: 'App',
    components: {
      Home,
      MyAccount,
      AccountInfo,
      Passport,
      Formulaire,
      Selfie,
      Code,
      Slide
    },
    methods: {
    }
  };
</script>

<style type="text/css">
  footer{
    background:#ffffff;
    position:absolute;
    bottom:0;
    width:100%;
  }
  #content{
    margin-top: 20px;
  }
</style>
