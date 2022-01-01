import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { Fragment } from "react";
import { muiTheme } from "../mui";
import UserContextProvider from "../userContext";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>boba rate</title>
        <meta name="description" content="rate boba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
