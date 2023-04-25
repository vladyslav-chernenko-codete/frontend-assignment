import { FC } from "react";
import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import PageProvider from "@/components/providers/PageProvider";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@mui/material";
import "../styles/globals.css";
import { AuthProvider } from "@/context/authContext";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export interface MUIAppProps extends AppProps {
  emotionCache: EmotionCache;
}

const App: FC<MUIAppProps> = ({ Component, pageProps, emotionCache }) => (
  <AuthProvider>
    <PageProvider emotionCache={emotionCache}>
      <Navbar />
      <ProtectedRoute>
        <Container sx={{ mt: 8 }}>
          <Component {...pageProps} />
        </Container>
      </ProtectedRoute>
    </PageProvider>
  </AuthProvider>
);

export default App;
