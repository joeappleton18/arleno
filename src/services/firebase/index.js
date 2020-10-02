import { createContext, useContext } from "react";
import * as firebase from "firebase/app";
import dynamic from "next/dynamic";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import authService from "./authService";

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

      this.firebase = firebase;
      const auth = firebase.auth;
      this.auth = new authService(auth);
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
