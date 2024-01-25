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
      categoryData: [],
      categoryToEdit: '',
      bookData: [],
      bookToEdit: '',
      modal: {
        addBook: false,
        addCategory: false
      }
    }
  },
  getters:{
  },
  actions:{

    async init(){
      console.log('Init login')
      onAuthStateChanged(authFirebase, (userData) => {
        console.log(userData)
        if (userData) {
          console.log('Logged in')
          // User is signed in, 
          this.user = userData
        } else {
          // User is signed out
          this.user = {
            email: '',
            photoURL: '',
            displayName: '',
            uid: '',
          }
        }
      });
    },

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
      if (this.user.email != ''){
        const idToken = await authFirebase.currentUser.getIdToken(true)
        return idToken
      } else {
        console.log('Need Login')
        this.$router.push('/login')
        return
      }
    },

    async fetchCategory() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch("http://localhost:5000/categories", requestOptions)
      const result = await response.text()
      console.log(JSON.parse(result))
      this.categoryData = JSON.parse(result)
    },

    async fetchBook(categoryID) {
      let url
      if (categoryID){
        url = `http://localhost:5000/categories/${categoryID}/books`
      } else {
        url = `http://localhost:5000/books`
      }
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch(url, requestOptions)
      const result = await response.text()
      console.log(JSON.parse(result))
      this.bookData = JSON.parse(result)
    }

  },

})
