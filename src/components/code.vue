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
    <div class="row">
      <div class="col"> 
        <center>
          <qrcode-drop-zone @decode="onDecode" @init="logErrors">
            <qrcode-stream style="margin-left:30px; margin-top : 55px" @decode="onDecode" @init="onInit" />
          </qrcode-drop-zone>
          <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Company ID : {{id}}</li>
            <li class="list-group-item">Store name : {{store}}</li>
            <li class="list-group-item">Adress : {{adress}}</li>
            <li class="list-group-item">VAT N° : {{vat}}</li>
          </ul>
          <br>
          <button  id="save"  class="btn btn-circle btn-info" @click="submitQrCodeInfo();goBack()" style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Submit</button>
        </center>
      </div>
    </div>      
  </div>
</template>
<script>
  import firebase from '../Firebase'
  import { Slide } from 'vue-burger-menu'
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
  export default{
    data(){
            return{
              title: "QrCode",
              result: '',
              noStreamApiSupport: false,
              id:'',
              store:"",
              adress:"",
              vat:"",
          }
        },
    components: {
        Slide,
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },
    mounted: function () {
    },
    methods: {
      onDecode (result) {
      this.result = result
      var splitResult = result.split("/")
      this.id = splitResult[0]
      this.store = splitResult[1]
      this.adress = splitResult[2]
      this.vat = splitResult[3]
    },
   
    logErrors (promise) {
      promise.catch(console.error)
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }
      }
    },
    submitQrCodeInfo: function(){
     var qrCodeData = {
        id: this.id,
        store: this.store,
        adress: this.adress,
        vat: this.vat
        };
        var updates = {};
      updates['/company/'  + '/' + this.id] = qrCodeData;
      return firebase.database().ref().update(updates);
    },
    goBack:function(){
      window.history.back();
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

#video, #canvas {
  display: none;
}

#waitingBar, #preventLabel, #invalidLabel{
  display: none;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

</style>