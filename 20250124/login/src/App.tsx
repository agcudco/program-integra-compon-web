import HolaMundo from "./components/HolaMundo"
import Mensaje from "./components/Mensaje"
import ListaProductos from "./components/Productos"
import ListaUsuarios from "./components/Usuarios"
import GestionUsuarios from "./components/GestionUsuarios"
import React, { useEffect, useState } from "react"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Departamentos from "./components/Departamentos"
import Empleados from "./components/Empleados"
import "./App.css"
import { Login } from "./components/Login"

const lstProductos = [
  { nombre: "Laptop", precio: 50 },
  { nombre: "Impresora", precio: 100 },
  { nombre: "SmartTV", precio: 150 },
  { nombre: "Nevera", precio: 200 },
  { nombre: "Memoria USB", precio: 250 },
]

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  idDepartamento: number;
}

const App: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedDepartamentos = localStorage.getItem("departamentos");
    const storedEmpleados = localStorage.getItem("empleados");
    const loggedIn = localStorage.getItem("isAuthenticated");

    if (storedDepartamentos) setDepartamentos(JSON.parse(storedDepartamentos));

    if (storedEmpleados) setEmpleados(JSON.parse(storedEmpleados));

    if (loggedIn === "true") setIsAuthenticated(true);

  }, []);

  useEffect(() => {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
  }, [departamentos]);

  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", JSON.stringify(status));
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  }

  return (
    <Router>

      {isAuthenticated && <NavBar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <HolaMundo /> : <Navigate to="/login" />}
        />

        <Route
          path="/mensaje"
          element={isAuthenticated ? <Mensaje texto="Clase 1" /> : <Navigate to="/login" />} />

        <Route path="/productos" element={<ListaProductos productos={lstProductos} />} />

        <Route
          path="/usuarios"
          element={isAuthenticated ? <ListaUsuarios /> : <Navigate to="/login" />}
        />
        <Route
          path="/gestion-usuarios"
          element={isAuthenticated ? <GestionUsuarios /> : <Navigate to="/login" />}
        />
        <Route
          path="/departamentos"
          element={isAuthenticated ?
            <Departamentos
              departamentos={departamentos}
              setDepartamentos={setDepartamentos} />
            :
            <Navigate to="/login" />}
        />

        <Route
          path="/empleados"
          element={
            isAuthenticated ?
              <Empleados
                departamentos={departamentos}
                empleados={empleados}
                setEmpleados={setEmpleados}
              />
              :
              <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
