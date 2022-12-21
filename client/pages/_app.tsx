import axios from "axios";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.withCredentials = true;

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
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
