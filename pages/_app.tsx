import { AppProps } from "next/app";
import GlobalStyle from "@/theme/GlobalStyle";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default App;
