
import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div style={{fontFamily:'system-ui',padding:'1rem'}}>
      <h1>Resejournal</h1>
      <p>Din PWA är igång. Lägg till på hemskärmen för snabb åtkomst.</p>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
