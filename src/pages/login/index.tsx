import type { NextPage } from "next";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, handleLogin } = useContext(AuthContext);

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <main>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </main>
  );
};

export default Login;
