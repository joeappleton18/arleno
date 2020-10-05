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

const AuthListener = () => {
  const fb = useFirebase();
  const userStore = useStores().user;
  const authService = fb.auth;
  const userService = fb.user;
  const presenceService = fb.presenceService;

  useEffect(() => {
    if (!authService) {
      return;
    }

    authService.auth.onAuthStateChanged(async (user) => {
      if (!user || !user.uid) {
        return;
      }

      const { uid, email, photoURL } = user;
      const userRef = await userService.read(uid);
      /**
       * When a user joins, firebase functions creates a user for us.
       * However, the auth function fires before the database has time to update.
       * As such we need to manually set the joinStage
       */

      const defaultUser = { uid, email, photoURL, joinStage: 1 };
      userStore.setUser({ ...defaultUser, ...userRef.data() });

      presenceService.connectedRef.on("value", async (snap) => {
        if (!snap.val()) {
          presenceService.setStatus("offline", uid);
        }

        if (snap.val()) {
          await presenceService.onDisconnect(uid);
          await presenceService.setRtStatus("online", uid);
        }
      });
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
        {/*<link rel="stylesheet" href="prism.css" />*/}
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
