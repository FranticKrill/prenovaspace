import GlobalLayout from "@/layouts/global.layout";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }: AppProps) {
  const query = useSearchParams();
  const [_, setTableId] = useLocalStorageState<any>("tableId", {
    defaultValue: "",
  });

  useEffect(() => {
    const table = query.get("table");
    if (!!table) setTableId(query.get("table"));
  }, [query.get("table")]);

  return (
    <SessionProvider session={pageProps.session}>
      <GlobalLayout>
        <>
          <Toaster />
          <Component {...pageProps} />
        </>
      </GlobalLayout>
    </SessionProvider>
  );
}
