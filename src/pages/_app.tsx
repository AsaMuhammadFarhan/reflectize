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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          {/* <FunctionalErrorBoundary> */}
            <NextSeo
              defaultTitle="WhiteLabel"
              titleTemplate="WhiteLabel | %s"
              description="WhiteLabel"
              additionalLinkTags={[
                // {
                //   rel: "shortcut icon",
                //   href: "/WhiteLabel.png",
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
