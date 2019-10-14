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
        <img class="card-img-top img-responsive" id="imageImput">
        <div v-for="image in imageImported" style="margin-top: 20px">
          <img :src="image" class="card-img-top img-responsive">
        </div>
        <br>
        <input class="inputfile" name="files" id="files" type="file" accept=".heic, .hevc, .heif, .pdf, .png, .gif, .jpg, .jpeg, .doc, .docx, application/msword, application/pdf" multiple @change="handleFileSelect()" capture>
        <label id="snap" class="btn btn-circle btn-info" style="width: 100px;
    height: 100px; font-size: 26px; margin-top: 50%;" for="files"> Add a photo </label>
    <br>
        <label id="modify" class="btn btn-circle btn-info" style="font-size: 35px" for="files" @click="deleteImage">edit </label>
      </center>
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
            title: "Selfie",
            context: 0,
            file: 0,
            imageImported: []
        }
      },
  components: {
      Slide
  },
  mounted: function () {
        if(this.imageImported.length != 0){
          document.getElementById('imageImput').src = 'data:image/png;base64,' + this.imageImported[0]
          document.getElementById('snap').style.display = "none"
          document.getElementById('modify').style.display = "inline"

        } 
  },
  methods: {
    handleFileSelect: function() {
          var file = document.getElementById("files").files[0];
          this.getBase64(file)
      },
      getBase64: function (file) {
         var reader = new FileReader();
         reader.readAsDataURL(file);
         this.imageImported = []
         var tempImage = this.imageImported
         reader.onload = function () {
          console.log(reader.result)
          tempImage.push(reader.result);
          document.getElementById('snap').style.display = "none"
          document.getElementById('modify').style.display = "inline"
         };
      },
      deleteImage: function () {
        this.tempImage = []
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

#modify {
  display: none;
}

.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 50%;
    font-size: 24px;
    line-height: 1.33;
}

</style>