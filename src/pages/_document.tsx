import enums from "@/src/components/enums/enums";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{enums.siteName}</title>
        {/* fotTitle Image */}
        <link rel="shortcut icon" href="/assets/images/logoo.jpg" />
        {/* //image logo size sizes="32x32" */}
        {/* rnd------ */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
