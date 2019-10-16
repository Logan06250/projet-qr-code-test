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
        <a id="home" href='#/Code'> 
          <span>QR code</span> 
        </a>
      </Slide>
      <h1 style="margin-left: 80px; padding-top: 5px">{{ title }}</h1>
      <div style="padding-top: 1px"></div>
    </div>
    <form>
      <center>
       <button  class="btn btn-circle btn-success fas fa-plus" @click="newItem()"style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px"></button>
      </center>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" style="background-color: #D8D8D8">Nb</th>
              <th scope="col" style="background-color: #D8D8D8">Item</th>
              <th scope="col" style="background-color: #D8D8D8">Item Number</th>
              <th scope="col" style="background-color: #D8D8D8">Sales Price</th>
              <th scope="col" style="background-color: #D8D8D8">VAT Price</th>
              <th scope="col" style="background-color: #D8D8D8">Action</th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="article in articles">
              <td><input type="number" class="form-control" id="nbItem" value="1"></td>
              <td><input type="text" class="form-control" id="item"></td>
              <td><input type="text" class="form-control" @keypress="isNumber($event)" id="itemNumber" ></td>
              <td><input type="text" class="form-control" id="salesPrice" ></td>
              <td><input type="text" class="form-control" id="VATPrice" ></td>
              <td><button type="text" class="btn btn-circle btn-danger fas fa-trash" style="width: 60px;height: 60px; font-size: 15px;" @click="deleteItem(article)"></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <center>
        <button  id="save"  class="btn btn-circle btn-info" @click="Submit()" style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Save</button>
      </center>
    </form>
  </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default{
  data(){
          return{
            title: "Vat Forms",
            articles:[
            ]
        }
      },
  components: {
      Slide
  },
  mounted: function(){
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    newItem :function(){
      var article= {
        _id: new Date().toISOString(),
        nbItem: 1,
        item: "",
        itemNb: "",
        salesPrice: "",
        VATPrice: ""
      }
      this.articles.push(article)
    },
    deleteItem: function(article){
      var delItem = this.articles.indexOf(article)
      this.articles.splice(delItem, 1)
    }
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