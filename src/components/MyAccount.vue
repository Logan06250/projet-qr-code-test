<template>
  <div class="container">
    <div id="Navigation">
      <Slide id="menu">
        <a id="home" href='#/'> 
          <span>Home</span>  
        </a>
        <a id="home" href='#/MyAccount'> 
          <span>Account</span>  
        </a>
        <a id="home" href='#/Formulaire'> 
          <span>Form</span>  
        </a>
      </Slide>
      <h1 style="margin-left: 80px; padding-top: 5px">{{ title }}</h1>
      <div style="padding-top: 1px"></div>
    </div>
    <center>
      <form>
    <div class="row">
      <div class="col">
         <button style="margin-top: 50px" type="button" class="btn btn-info btn-circle fas fa-user" onclick="window.location.href= '#/AccountInfo'" ></button>
        <p>Account info</p>
      </div>

      <div class="w-100"></div>
      <div class="col">
        <button type="button" class="btn btn-info btn-circle fas fa-passport" onclick="window.location.href= '#/Passport'" ></button>
        <p>Passeport info</p>
      </div>
      <div class="w-100"></div>
      <div class="col">
        <button type="button" class="btn btn-info btn-circle fas fa-camera" onclick="window.location.href= '#/Selfie'"></button>
        <p>Take a selfie</p>
      </div>
    </div>
  </form>
  </center>
  </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default{
  data(){
          return{
            title: "My account",
        }
      },
  components: {
      Slide
  }
};
</script>
<style>
.container {
  margin-left: -15px;
}
.form-row {
  margin-left: 5px;
}

form {
  padding-top: 46px;
}
#Navigation {
    background-color: #2F4558;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    margin-bot: 10px;
    margin-top: -6%;
    width:100%;
    height:7.5%;
    z-index:10;
    display:block;
    position: fixed;
    color: #FFF;
}
.bm-burger-button {
      position: fixed;
      width: 36px;
      height: 30px;
      left: 20px;
      top: 15px;
      cursor: pointer;
    }

</style>