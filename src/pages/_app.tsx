import NoInternetConnection from "@/src/noInternet/NoInternetConnection";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import RenderAllComponents from "../components/common/RenderAllComponents";
import { authStore } from "../components/pullState/store";
import { queryClient } from "../components/services/query/ReactQueryClient";

export default function App({ Component, pageProps }: AppProps) {
  const isSideDrawerOpen = authStore.useState((s) => s.isSideDrawerOpen);
  return (
    <>
      <NoInternetConnection>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <div
              className={`${
                isSideDrawerOpen && "lg:flex"
              } sm:flex w-full h-screen`}
            >
              <div
                className={
                  isSideDrawerOpen ? "w-[70%] lg:w-[30%] xl:w-[20%]" : "lg:w-20"
                }
              >
                <RenderAllComponents />
              </div>
              <div
                className={
                  isSideDrawerOpen ? "w-full lg:w-[70%] xl:w-[80%]" : "w-full"
                }
              >
                <Component {...pageProps} />
              </div>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </NoInternetConnection>
    </>
  );
}
