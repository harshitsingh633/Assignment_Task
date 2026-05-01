import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Standard Vite CSS import
import App from './App' // No extension needed now

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)