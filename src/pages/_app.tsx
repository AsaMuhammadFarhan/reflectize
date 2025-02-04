import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import theme from "~/styles/customTheme";
import { RecoilRoot } from "recoil";
import { NextSeo } from "next-seo";

import moment from "moment";
import "moment/locale/id";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  moment.locale("id");
  
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          {/* <FunctionalErrorBoundary> */}
            <NextSeo
              defaultTitle="Know Myself Better"
              titleTemplate="Know Myself Better | %s"
              description="Know Myself Better"
              additionalLinkTags={[
                // {
                //   rel: "shortcut icon",
                //   href: "/Know Myself Better.png",
                //   type: "image/png",
                // },
              ]}
            />
            <Component {...pageProps} />
          {/* </FunctionalErrorBoundary> */}
        </ChakraProvider>
      </RecoilRoot>
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
