import { useMsal } from "@azure/msal-react";

export default function App() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div>
      <h1>Resejournal</h1>
      <button onClick={handleLogin}>Logga in</button>
    </div>
  );
}
