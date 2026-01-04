import { msalInstance } from "./authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const API_SCOPE = "api://adminmoffa.onmicrosoft.com/resejournal-api/access_as_user";
const API_BASE = "https://resejournal-func.azurewebsites.net/api";

async function getAccessToken() {
  try {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      // Ingen inloggad användare → trigga login/redirect
      await msalInstance.loginRedirect();
      return "";
    }
    const tokenResponse = await msalInstance.acquireTokenSilent({
      account: accounts[0],
      scopes: [API_SCOPE],
    });
    return tokenResponse.accessToken;
  } catch (err) {
    // Om silent inte funkar (t.ex. policy/consent), försök interaktivt
    if (err instanceof InteractionRequiredAuthError) {
      await msalInstance.acquireTokenRedirect({ scopes: [API_SCOPE] });
    }
    throw err;
  }
}

export async function apiGet(path: string) {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function apiPost(path: string, body: unknown) {
  const token = await getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
