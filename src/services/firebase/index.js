import { createContext, useContext } from "react";
import firebase from "firebase/app";
import dynamic from "next/dynamic";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";




import authService from "./authService";
import userService from "./userService";
import presenceService from "./presenceService";
import questionService from './questionService';
import documentService from './documentService'

const analytics = dynamic(() => import("firebase/analytics"));

import firebaseProductionConfig from "../../config/firebase";
import firebaseDevelopmentConfig from "../../config/fiebaseDevelopment";

class firebaseService {
  constructor(env) {
    /**
     * ensure we are running in the browser
     */
    if (typeof window == "undefined") {
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(
        env === "production"
          ? firebaseDevelopmentConfig
          : firebaseProductionConfig
      );
    }
    const db = firebase.firestore();
    const rtdb = firebase.database();
    const auth = firebase.auth;
    this.auth = new authService(auth);


    this.presence = new presenceService(
      db,
      rtdb,
      firebase.firestore.FieldValue.serverTimestamp(),
      firebase.database.ServerValue.TIMESTAMP,
      this
    );

    this.user = new userService(
      db,
      firebase.firestore.FieldValue.serverTimestamp(),
      this
    );

    this.question = new questionService(
      db,
      firebase.firestore.FieldValue.serverTimestamp(),
      this
    );

    this.document = new documentService(
      db,
      firebase.firestore.FieldValue.serverTimestamp(),
      this
    )
  }
}

const FirebaseProviderContext = React.createContext();

const FirebaseProvider = ({ children }) => (
  <FirebaseProviderContext.Provider
    value={new firebaseService(process.env.NODE_ENV)}
  >
    {children}
  </FirebaseProviderContext.Provider>
);

const useFirebase = () => useContext(FirebaseProviderContext);

export { FirebaseProviderContext, FirebaseProvider, useFirebase };
