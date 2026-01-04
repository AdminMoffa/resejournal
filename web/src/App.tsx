import { useEffect, useState } from "react";
import { apiGet } from "./apiClient";

export default function App() {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    // Exempel: hämta Tesla-fordonslista
    apiGet("/tesla/vehicles")
      .then(setVehicles)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Resejournal</h1>
      <ul>
        {vehicles.map(v => <li key={v.id}>{v.display_name}</li>)}
      </ul>
    </div>
  );
}
