import "../styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { Router } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
