import Navbar from "@components/Navbar";
import { store } from "app/store";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { injectStyle } from "react-toastify/dist/inject-style";
import Head from "next/head";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";
import { useRouter } from "next/router";

if (typeof window !== "undefined") {
  injectStyle();
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: String) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>Stagio | Bringing Live Shows Of Artists To Your Home</title>
        <meta
          property="og:title"
          content="Stagio | Bringing Live Shows Of Artists To Your Home"
          key="title"
        />
        <meta
          name="description"
          content="A platform curated to narrow the gap between artists and their fans by hosting live shows giving you the front row experience at your home.
          On Stagio, artists perform live, online shows from their laptop that are never recorded or archived. That's right! Every Stagio show is a once-in-a-lifetime experience that's not to be missed."
        />
      </Head>
      <CookiesProvider>
        <script src="https://meet.stagiolive.com/external_api.js" />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <SessionProvider session={session}>
          <NextNProgress
            color="#bb86fc"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: false }}
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
