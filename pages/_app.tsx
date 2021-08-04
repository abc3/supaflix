import './_app.css'
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from "../hooks/state";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);
export default wrapper.withRedux(App);
