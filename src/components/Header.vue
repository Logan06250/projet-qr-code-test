<template>
  <header>
    <h3>{{ title }}</h3>
  </header>
</template>
<script>
export default{
  data(){
    return{
    title:'Yo'
  }
  }
};
</script>
<style scoped>
header{
  background-color: black;
  padding: 10px;
  height: 50px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  position: fixed;
}
</style>
