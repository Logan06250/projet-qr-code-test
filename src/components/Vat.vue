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
      <center>
       <button  class="btn btn-circle btn-success fas fa-plus" @click="newItem(specificForm)"style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: 40px"></button>
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
            <tr v-for="article in specificForm.articles" :key="article._id">
              <td><input type="number" class="form-control" :id="article._id + 'nbItem' " :value="article.nbItem" ></td>
              <td><input type="text" class="form-control" :id="article._id + 'item' " :value="article.item"></td>
              <td><input type="text" class="form-control" @keypress="isNumber($event)" :id="article._id + 'itemNumber'" :value="article.itemNb" ></td>
              <td><input type="text" class="form-control" :id="article._id + 'salesPrice'" :value="article.salesPrice"></td>
              <td><input type="text" class="form-control" :id="article._id + 'VATPrice'" :value="article.VATPrice"></td>
              <td><button type="text" class="btn btn-circle btn-danger fas fa-trash" style="width: 60px;height: 60px; font-size: 15px;" @click="deleteItem(article)"></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <center>
        <button  id="save"  class="btn btn-circle btn-info" @click="emit()" style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Save</button>
      </center>
  </div>
</template>
<script>
var db = new PouchDB("forms")
import { Slide } from 'vue-burger-menu'
export default{
  props:['specificForm'],
  data(){
          return{
            title: "Vat Forms",
            forms: [],
            
        }
      },
  components: {
      Slide
  },
  mounted: function(){
      var tempArticles = this.specificForm.articles
      db.get(this.specificForm._id).then(function (doc) {
        var articleToPush = tempArticles
        doc.articles.map(function (article) {
          articleToPush.push(article)
        })
        return db.put(doc)
      }).catch(function (err) {
        console.log(err)
      })
      },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    newItem :function(specificForm){
      var article= {
        _id: new Date().toISOString(),
        nbItem: 1,
        item: "",
        itemNb: "",
        salesPrice: "",
        VATPrice: ""
      }
        db.get(specificForm._id).then(function(doc) {
          doc.articles.push(article)
          specificForm.articles.push(article)
          return db.put(doc);
        }).catch(function (err) {
          console.log(err);
        });


    },
    deleteItem: function(article){
      var delItem = this.specificForm.articles.indexOf(article)
      this.specificForm.articles.splice(delItem, 1)
    },
    emit: function() {
      this.specificForm.articles.map(function (article) {
        article.nbItem = document.getElementById(article._id + "nbItem").value
        article.item= document.getElementById(article._id + "item").value
        article.itemNb= document.getElementById(article._id + "itemNumber").value
        article.salesPrice= document.getElementById(article._id + "salesPrice").value
        article.VATPrice= document.getElementById(article._id + "VATPrice").value
      });
      let t = {_id: new Date().toISOString(), articles: this.specificForm.articles}
      if(this.specificForm == 0){
      db.put(t).then((res) => {
            console.log("Vat inserted")
            this.forms.push(t)
        }).catch((err) => {
            console.error(err)
        })
    }else {
      var tempArticles = []
      for(let i = 0; i < this.specificForm.articles.length; i++){
        tempArticles.push({
          _id: this.specificForm.articles[i]._id,
          nbItem: document.getElementById(this.specificForm.articles[i]._id + "nbItem").value,
          item: document.getElementById(this.specificForm.articles[i]._id + "item").value,
          itemNb: document.getElementById(this.specificForm.articles[i]._id + "itemNumber").value,
          salesPrice: document.getElementById(this.specificForm.articles[i]._id + "salesPrice").value,
          VATPrice: document.getElementById(this.specificForm.articles[i]._id + "VATPrice").value
        })
      }

      db.get(this.specificForm._id).then(function (doc) {
        doc.articles = tempArticles
        return db.put(doc)
      }).catch(function (err) {
        console.log(err)
      })}
      console.log(this.forms)
      this.$emit("selected",this.forms)
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