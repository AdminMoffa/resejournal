import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./authConfig";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
