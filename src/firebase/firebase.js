import firebase from "firebase";
import firebaseConfig from "./config";

require("firebase/firestore");

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}

const myFirebase = new Firebase();

export default myFirebase;
