import { useEffect } from "react";
import Head from "next/head";
import { CloudinaryContext } from "cloudinary-react";
import cloudinaryConfig from "../config/cloudinary";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../config/theme";
import { FirebaseProvider, useFirebase } from "./../services/firebase";
import { StoresProvider, useStores } from "./../stores";
import CoreLayout from "../layouts/Core";
import notesConfig from "../config/notes";

/** css imports  **/

import "prismjs/themes/prism.css";
import { setUseProxies } from "immer";

const AuthListener = () => {
  const fb = useFirebase();
  const userStore = useStores().user;
  const authService = fb.auth;
  const userService = fb.user;

  useEffect(() => {
    if (!authService) {
      return;
    }

    authService.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      const userRef = await userService.read(user.uid);
      userStore.setUser(userRef.data());
    });
  }, []);

  return "";
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{notesConfig.course || ""}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <CloudinaryContext cloudName={cloudinaryConfig.cloudName}>
        <FirebaseProvider>
          <StoresProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <CoreLayout>
                <Component {...pageProps} />
                <AuthListener />
              </CoreLayout>
            </ThemeProvider>
          </StoresProvider>
        </FirebaseProvider>
      </CloudinaryContext>
    </>
  );
}
