import Document, { DocumentContext } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { injectGlobal } from "@emotion/css";


injectGlobal`@font-face {
    font-family: "Poppins";
    src: url("/fonts/Poppins/Poppins-Regular.ttf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins-Medium";
    src: url("/fonts/Poppins/Poppins-Medium.ttf");
    font-style: medium;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: "Vibur";
    src: url(//fonts.googleapis.com/css?family=Vibur);
    font-style: medium;
    font-weight: 500;
    font-display: swap;
  }`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  }
}
