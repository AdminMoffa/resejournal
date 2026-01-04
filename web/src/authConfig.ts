
import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "03f5d3f5-f71a-416c-b34a-ffbd890b7c1e",
    authority: "https://adminmoffa.b2clogin.com/adminmoffa.onmicrosoft.com/<policy>", 
    knownAuthorities: ["adminmoffa.b2clogin.com"],
    redirectUri: "/"
  }
});
