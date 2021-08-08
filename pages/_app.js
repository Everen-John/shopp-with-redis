import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
