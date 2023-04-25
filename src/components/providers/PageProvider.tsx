import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import MUIThemeProvider from "./MUIThemeProvider";
import createEmotionCache from "@/theme/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface PageProviderProps {
  emotionCache: EmotionCache;
}

const PageProvider: FC<PropsWithChildren<PageProviderProps>> = ({
  children,
  emotionCache = clientSideEmotionCache,
}) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
