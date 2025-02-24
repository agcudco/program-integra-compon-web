import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Inicio } from "./pages/Inicio"
import { Roles } from "./pages/Roles"
import { Usuarios } from "./pages/Usuarios"
import { AcercaDe } from "./pages/Acerca-de"

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-m-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>
      </div>
    </Router>
  )
}


