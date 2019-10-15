import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
  apiKey: "AIzaSyBTQCuZ0Fp5J-NX6fB7qn4vvpEohqYUpUA",
  authDomain: "wechat-4fa37.firebaseapp.com",
  databaseURL: "https://wechat-4fa37.firebaseio.com",
  projectId: "wechat-4fa37",
  storageBucket: "wechat-4fa37.appspot.com",
  messagingSenderId: "794725585614",
  appId: "1:794725585614:web:c57fdf6753f750b703b69f"
}
try{
    firebase.initializeApp(firebaseConfig);;
	}catch(error){

	}
export default firebase;