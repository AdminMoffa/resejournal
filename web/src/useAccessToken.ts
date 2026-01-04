
import { useEffect, useState } from "react";
import { msalInstance } from "./authConfig";

export function useAccessToken(scope = "api://adminmoffa.onmicrosoft.com/resejournal-api/access_as_user") {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      msalInstance.loginRedirect();
      return;
    }
    msalInstance
      .acquireTokenSilent({ account: accounts[0], scopes: [scope] })
      .then(res => setToken(res.accessToken))
      .catch(() => msalInstance.acquireTokenRedirect({ scopes: [scope] }));
  }, [scope]);

  return token;
}
