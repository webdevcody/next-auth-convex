import { useEffect, useState } from "react";

export function useSessionToken() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/session");
      const token = await response.json();
      setToken(token);
    })();
  }, []);

  return token;
}
