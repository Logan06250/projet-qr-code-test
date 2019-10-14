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
        <input class="inputfile" name="files" id="files" type="file" accept=".heic, .hevc, .heif, .pdf, .png, .gif, .jpg, .jpeg, .doc, .docx, application/msword, application/pdf" multiple @change="handleFileSelect()" capture>
        <label style="margin-top: 60px"> You can scan your passport here:</label>
        <label id="snap" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 26px; margin: 10px;" for="files"> Scan </label>
          </center>
        <br>
        <center>
          <div id="preventLabel" class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Please</strong> check each field.
          </div>
          <div id="invalidLabel" class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Failed</strong>, unrecognized image.
          </div>
        <div id="waitingBar">
          <div id="labelScan" class="alert alert-info" role="alert" style="width: 100%; margin-left: 14px">
              Scan in progress
            <br>
            <div class="spinner-border text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </center>
      <form>
        <div class="form-group col-md-6">
          <label for="PassportNumber">Passport Number:</label>
          <input type="text" class="form-control" id="PassportNumber"
          placeholder="00 XX 00000">
        </div>
        <div class="form-group col-md-6">
          <label for="Nationality">Nationality code:</label>
          <input type="text" class="form-control" id="Nationality" placeholder="Nationality code">
        </div>
        <div class="form-group col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="Gender" id="femaleGender">
            <label class="form-check-label" for="exampleRadios1" style="margin-right: 25px">
              Female            
            </label>
            <input class="form-check-input" type="radio" name="Gender" id="maleGender">
            <label class="form-check-label" for="exampleRadios2">
              Male
            </label>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="dateOfBirth">Date of birth:</label>
          <input type="date" class="form-control" id="dateOfBirth">
        </div>
        <div class="form-group col-md-6">
          <label for="expireDate">Date of expiry:</label>
          <input type="date" class="form-control" id="expireDate">
        </div>
        <center>
          <button  id="save" @click="newUser()" class="btn btn-circle btn-info" style="width: 60px;height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Submit</button>
        </center>
      </form>
  </div>
</template>
<script>
  import { Slide } from 'vue-burger-menu'
  import { createWorker } from 'tesseract.js';
  export default{
    data(){
            return{
              title: "Passport",
              context: 0,
              file: 0,
              imageScan: []
          }
        },
    components: {
        Slide
    },
    mounted: function () {

    },
    methods: {
      handleFileSelect: function() {
          var file = document.getElementById("files").files[0];
          this.getBase64(file)
          this.scanPassport(this.imageScan)
      },
      getBase64: function (file) {
         var reader = new FileReader();
         reader.readAsDataURL(file);

         var tempImage = this.imageScan

         reader.onload = function () {
           tempImage[0] = reader.result.replace(/^data:image\/(png|jpg);base64,/, "");
         };

         this.imageScan = tempImage
      },
      scanPassport: function (img) {
        document.getElementById("waitingBar").style.display = "inline"
        document.getElementById("preventLabel").style.display = "none"
        document.getElementById("invalidLabel").style.display = "none"
        const worker = createWorker({
        logger: m => console.log(m),
        });

        (async () => {
          await worker.load();
          await worker.loadLanguage('eng');
          await worker.initialize('eng');
          const { data: { text } } = await worker.recognize('data:image/png;base64,' + this.imageScan[0]);
          var regex = /[a-zA-Z0-9]*<*[a-zA-Z0-9]*<{6,}[a-zA-Z0-9]*/g
          
          try {
            var mrt = text.match(regex).join()
          }catch(error){
            console.error(error)
            document.getElementById("invalidLabel").style.display = "inline"

          }
          
          if(mrt != null){
            console.log(mrt)
            var passportNb = mrt.substring(0, 8)
            console.log("Passport Number :" + passportNb)
            document.getElementById("PassportNumber").value = passportNb
            var nationality = mrt.substring(10, 13)
            console.log("Nationality :" + nationality)
            document.getElementById("Nationality").value = nationality
            var dateOfBirth = mrt.substring(13, 19)
            console.log("Date Of Birth :" + dateOfBirth)
            let y = dateOfBirth.substring(0,2)
            let m = dateOfBirth.substring(2,4)
            let d = dateOfBirth.substring(4,6)
            document.getElementById("dateOfBirth").value = "19" + y + "-" + m + "-" + d
            var gender = mrt[20]
            console.log("gender :" + gender)
            if(gender == "F"){
              document.getElementById("femaleGender").checked = 1
            }else{
              document.getElementById("maleGender").checked = 1
            }
            var expirationDate = mrt.substring(21, 27)
            console.log("Expiration Date :" + expirationDate)
            y = expirationDate.substring(0,2)
            m = expirationDate.substring(2,4)
            d = expirationDate.substring(4,6)
            document.getElementById("expireDate").value = "20" + y + "-" + m + "-" + d
            var personalNb = mrt.substring(28, 42)
            console.log("Personal Number :" + personalNb)
            document.getElementById("preventLabel").style.display = "inline"
          }
          await worker.terminate();
          document.getElementById("waitingBar").style.display = "none"

        })();
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