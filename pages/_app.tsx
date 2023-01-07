import "../styles/globals.css";
import TodoProvider from "../context/todoContext";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  );
}

export default MyApp;
