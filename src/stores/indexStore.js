import { defineStore } from 'pinia'

// Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAzwh3PsOPieiSNKHJHiK7_QJQrvy17aCY",
  authDomain: "cakra-stopbullying.firebaseapp.com",
  databaseURL: "https://cakra-stopbullying.firebaseio.com",
  projectId: "cakra-stopbullying",
  storageBucket: "cakra-stopbullying.appspot.com",
  messagingSenderId: "503367985490",
  appId: "1:503367985490:web:2a6cdded23cb877533728b",
  measurementId: "G-FE7E1TXD7X"
};
const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app)

export const useMainStore = defineStore('main', {
  id: 'main-store',
  state: () => {
    return{
      user: {
        email: '',
        photoURL: '',
        displayName: '',
        uid: '',
      },
    }
  },
  getters:{
  },
  actions:{

    async googleLogin(){
      const provider = new GoogleAuthProvider();

      signInWithPopup(authFirebase, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        this.user = result.user
        console.log(this.user)
        this.$router.push('/')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
      })
    },

    async logout(){
      signOut(authFirebase).then(() => {
        // Sign-out successful.
        // console.log('Sign-out successful.')
        this.user = {
          email: '',
          photoURL: '',
          displayName: '',
          uid: '',
        }
        this.$router.push('/login')
      }).catch((error) => {
        // An error happened.
      });
    },
    
    async refreshToken(){
      const idToken = await authFirebase.currentUser.getIdToken(true)
      return idToken
    }

  },

})
