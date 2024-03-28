import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'


export default function Document() {

  

  return (
    <Html lang="fr">
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
      <Script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></Script>
      <Head />
      <body bgcolor="white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
