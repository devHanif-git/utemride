import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { apiClient } from "../api/client";

export type InitialRouteConfig = {
  pathname: string;
  params?: any;
};

export function useAppInitialization() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<InitialRouteConfig>({ pathname: "/" });

  useEffect(() => {
    let isMounted = true;

    async function initializeApp() {
      try {
        // Pre-load assets could go here
        
        // Check Authentication
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          try {
            const response = await apiClient.get("/users/me");
            const role = response.data.role;
            const userName = response.data.name;
            
            if (role === "DRIVER" || role === "ADMIN") {
              if (isMounted) {
                setInitialRoute({
                  pathname: "/choose-mode",
                  params: { name: userName },
                });
              }
            } else {
              if (isMounted) {
                setInitialRoute({ 
                  pathname: "/home", 
                  params: { role: "RIDER" } 
                });
              }
            }
          } catch (apiErr) {
            console.log("Token invalid or expired", apiErr);
            // Default to "/"
          }
        }
      } catch (err) {
        console.log("Auth check error", err);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isReady, initialRoute };
}
