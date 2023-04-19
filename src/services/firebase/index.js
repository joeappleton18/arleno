
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import dynamic from "next/dynamic";
import React, { useContext } from "react";




import authService from "./authService";
import documentService from './documentService';
import presenceService from "./presenceService";
import questionService from './questionService';
import userService from "./userService";

const analytics = dynamic(() => import("firebase/analytics"));

import firebaseDevelopmentConfig from "../../config/fiebaseDevelopment";
import firebaseProductionConfig from "../../config/firebase";

class firebaseService {
  constructor(env) {
    /**
     * ensure we are running in the browser
     */
    if (typeof window == "undefined") {
      return;
    }
    console.log("we are in the firebase service", process.env.NAME, process.env.NEXT_PUBLIC_ANALYTICS_ID);
    console.log(JSON.stringify(process.env))
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

    this.storage = firebase.storage();


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
