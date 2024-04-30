import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootRouter from "./routes/RootRouter";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 60000 * 10,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

export default function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RootRouter>
          <App />
        </RootRouter>
      </NextUIProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
