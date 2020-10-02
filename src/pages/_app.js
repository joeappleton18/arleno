import { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../config/theme";
import { FirebaseProvider } from "./../services/firebase";
import { StoresProvider } from "./../stores";
import CoreLayout from "../layouts/Core";
import notesConfig from "../config/notes";

/** css imports  **/

import "prismjs/themes/prism.css";

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
      </Head>
      <FirebaseProvider>
        <StoresProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CoreLayout>
              <Component {...pageProps} />
            </CoreLayout>
          </ThemeProvider>
        </StoresProvider>
      </FirebaseProvider>
    </>
  );
}
