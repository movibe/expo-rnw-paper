import firebase from 'firebase'
import 'firebase/firestore'
import config from './firebase.config'

// Initialize Firebase
firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore()

export default db
