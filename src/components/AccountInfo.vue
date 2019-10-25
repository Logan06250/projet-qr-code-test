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
      <div class="form-row">
        <div style="background-color: #D8D8D8; width:100%">
          About you
        </div>
        <div class="form-group col-md-6">
          <label for="firstName">First Name:</label>
          <input type="text" class="form-control" id="firstName" placeholder="First Name">
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last Name:</label>
          <input type="text" class="form-control" id="lastName" placeholder="Last Name">
        </div>
        <div class="form-group col-md-6">
          <label for="Birthday">Birthday:</label>
          <input type="date" class="form-control" id="Birthday">
        </div>
        <div class="form-group col-md-6">
          <label for="Nationality">Nationality:</label>
          <input type="text" class="form-control" id="Nationality" placeholder="Nationality">
        </div>
        <div style="background-color :  #D8D8D8; width:100%">
          Address of permanent residence
        </div>
        <div class="form-group col-md-6">
      <label for="inputAddress">Address:</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="Address">
      </div>
      <div class="form-group col-md-6">
          <label for="inputZip">Zip:</label>
          <input type="text" class="form-control" @keypress="isNumber($event)" id="inputZip"
          placeholder="00000">
        </div>
        <div class="form-group col-md-6">
      <label for="inputCity">City:</label>
        <input type="text" class="form-control" id="inputCity" placeholder="City">
      </div>
      <div class="form-group col-md-6">
      <label for="inputCountry">Country:</label>
        <input type="text" class="form-control" id="Country" placeholder="Country">
      </div>
      <div style="background-color :  #D8D8D8; width:100%">
          Phone number
        </div>
      <div class="form-group col-md-6">
          <label for="CountryCode">CountryCode:</label>
          <input type="text" class="form-control" @keypress="isNumber($event)" id="CountryCode"
          placeholder="+00">
        </div><div class="form-group col-md-6">
          <label for="Phone">Phone Number:</label>
          <input type="text" class="form-control" @keypress="isNumber($event)" id="phoneNumber"
          placeholder="4 00 00 00 00">
        </div>
      </div>
      <center>
           <button  id="save"  class="btn btn-circle btn-info" @click="Submit()" style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Submit</button>
      </center>
    </form>
  </div>
</template>
<script>
  import firebase from '../Firebase'
  import { Slide } from 'vue-burger-menu'
  
  export default{
  data(){
          return{
            title: "Profile",
            ref: firebase.firestore().collection('users'),
            User:[
            ]
        }
      },
  components: {
      Slide
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
    Submit:function(){
      var postData = {
        firstName: document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        Birthday:document.getElementById("Birthday").value,
        Country:document.getElementById("Country").value,
        CountryCode:document.getElementById("CountryCode").value,
        Nationality:document.getElementById("Nationality").value,
        inputAddress:document.getElementById("inputAddress").value,
        inputZip:document.getElementById("inputZip").value,
        phoneNumber:document.getElementById("phoneNumber").value,
      };

      var newPostKey = firebase.database().ref().child('posts').push().key;

      var updates = {};
      updates['/user-posts/'  + '/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);
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