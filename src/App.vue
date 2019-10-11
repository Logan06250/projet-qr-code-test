<template>
  <div id="app">
    <webapp-header />
    <webapp-content />
    <webapp-footer />
  </div>
</template>
<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  import ManageProfile from './components/ManageProfile'
  

  export default {
    name: 'App',
    components: {
      'webapp-header':Header,
      'webapp-content':ManageProfile,
      'webapp-footer':Footer
      
    }
  };
</script>

<style scoped>

</style>
