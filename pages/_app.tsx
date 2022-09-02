import { AppProps } from "next/app";
import "../styles/globals.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
// 1. extendTheme 関数をインポート
import { extendTheme } from "@chakra-ui/react";
import GeolocationProvider from "../components/googleMap/GeolocatonProvider";
// 2. custom colorやfontなどで theme を拡張する
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <GeolocationProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </GeolocationProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
