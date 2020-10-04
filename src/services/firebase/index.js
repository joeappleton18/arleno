import { createContext, useContext } from "react";
import * as firebase from "firebase/app";
import dynamic from "next/dynamic";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";
import authService from "./authService";
import userService from "./userService";
import presenceService from "./presenceService";

const analytics = dynamic(() => import("firebase/analytics"));

import firebaseProductionConfig from "../../config/firebase";
import firebaseDevelopmentConfig from "../../config/fiebaseDevelopment";

class firebaseService {
  constructor(env) {
    /**
     * ensure we are running in the browser
     */
    if (typeof window != "undefined" && !firebase.apps.length) {
      firebase.initializeApp(
        env === "production"
          ? firebaseDevelopmentConfig
          : firebaseProductionConfig
      );
      const db = firebase.firestore();
      const rtdb = firebase.database();
      const auth = firebase.auth;
      this.auth = new authService(auth);


      this.presenceService = new presenceService(
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
    }
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
