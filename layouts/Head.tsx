import NextHead from "next/head";
import React from "react";

const defaultDescription = "Full-featured template for next.js applications.";
const defaultOGURL = process.env.appUrl || "";
const defaultOGImage = defaultOGURL + "/static/og-image.png";
const defaultTitle = process.env.appTitle || "app title";

const Head: React.FC = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{defaultTitle}</title>
    <meta name="description" content={defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:url" content={defaultOGURL} />
    <meta property="og:title" content={defaultTitle} />
    <meta property="og:description" content={defaultDescription} />
    <meta name="twitter:site" content={defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={defaultOGImage} />
    <meta property="og:image" content={defaultOGImage} />
  </NextHead>
);

export default Head;

