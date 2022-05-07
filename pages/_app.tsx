import Navbar from "@components/Navbar";
import { store } from "app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { injectStyle } from "react-toastify/dist/inject-style";

import "../styles/globals.css";

if (typeof window !== "undefined") {
  injectStyle();
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <script src="https://meet.jit.si/external_api.js" />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <SessionProvider session={session}>
          <NextNProgress
            color="#bb86fc"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{showSpinner:false}}
          />
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
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </SessionProvider>
      </CookiesProvider>
    </Provider>
  );
}
