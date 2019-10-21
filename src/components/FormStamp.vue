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
        <a id="home" href='#/FormStamp'> 
          <span>Form</span> 
        </a>
        <a id="home" href='#/Code'> 
          <span>QR code</span> 
        </a>
      </Slide>
      <h1 style="margin-left: 80px; padding-top: 5px">{{ title }}</h1>
      <div style="padding-top: 1px"></div>
    </div>
    <div v-if="statement == 0">
      <Formulaire :forms="forms" v-on:selected="Formulaire($event)"></Formulaire>
    </div>
    <div v-if="statement == 1">
      <Vat :forms="forms" v-on:selected="Formulaire($event)"></Vat>
    </div>
  </div>
</template>
<script>
var db = new PouchDB("forms")
import Formulaire from './Formulaire'
import Vat from './Vat'
import { Slide } from 'vue-burger-menu'

export default{
  data(){
          return{
            title: "Formulaires",
            forms:[
            ],
            statement:0
        }
      },
  components: {
      Formulaire,
      Vat,
      Slide
  },
  methods: {
    Formulaire: function (form) {
            if(form == 1){
                this.statement = 1;
            }else {
                this.statement = 0;
            }
      },
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