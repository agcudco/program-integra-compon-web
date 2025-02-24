import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { registerSW } from 'virtual:pwa-register';
import 'primereact/resources/themes/lara-dark-blue/theme.css';   // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const updateSW = registerSW({
  onNeedRefresh() {
    console.log('Nueva versión disponible. Recarga la página para actualizar.');
  },
  onOfflineReady() {
    console.log('La PWA está lista para usarse sin conexión.');
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
