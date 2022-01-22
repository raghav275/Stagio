import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { AppContext, AppProps } from "next/app";
import React, { useEffect } from "react";
import Head from "next/head";
import { store } from "app/store";
import Navbar from "@components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    // console.log("here");
  }, []);
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Head>
          <script src="https://meet.jit.si/external_api.js" />
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </Head>
        <SessionProvider session={session}>
          <div
            style={{
              marginBottom: 0,
              position: "sticky",
              top: 0,
              zIndex: 3,
              backgroundColor: "#050505",
            }}
          >
            <Navbar />
          </div>
          <Component {...pageProps} />
        </SessionProvider>
      </CookiesProvider>
    </Provider>
  );
}
