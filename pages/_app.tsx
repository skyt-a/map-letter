import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRef } from "react";
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />{" "}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
