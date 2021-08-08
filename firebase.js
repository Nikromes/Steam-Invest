// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAO7wWqOM7_MZrmklsANYK4flQcmWZqVf0",
    authDomain: "fir-project-e6880.firebaseapp.com",
    projectId: "fir-project-e6880",
    storageBucket: "fir-project-e6880.appspot.com",
    messagingSenderId: "239945345535",
    appId: "1:239945345535:web:c9c41cce380e08fd10dfca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const functions = firebase.functions()
const storageRefInvestments = storage.ref('Investments')
const storageRefProjectImages = storage.ref('projectImages')

