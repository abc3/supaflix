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
    <link rel="icon" href="/static/favicon.ico" />
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

