import { FC, MouseEvent, useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";

const Navbar: FC = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleThemeToggle = (
    event: MouseEvent<HTMLElement>,
    newTheme: string | null
  ) => {
    if (newTheme !== null) {
      setTheme(newTheme);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Frontend Assignment</Link>
          </Typography>
          {mounted && (
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={handleThemeToggle}
              aria-label="theme"
            >
              <ToggleButton value="light" aria-label="light">
                <LightModeIcon />
              </ToggleButton>
              <ToggleButton value="system" aria-label="system">
                <SettingsBrightnessIcon />
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark">
                <DarkModeIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          {isAuthenticated && (
            <Button sx={{ ml: 4 }} variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
