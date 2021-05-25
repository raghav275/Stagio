import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: "contents" }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
