import React, { FC, PropsWithChildren, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();

    if (!isAuthenticated) {
      router.push("/login");
    }
  });

  return <>{children}</>;
};

export default ProtectedRoute;
