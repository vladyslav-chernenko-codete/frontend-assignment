import { useTheme } from "next-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "@/theme";

const MUIThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
