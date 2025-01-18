import HolaMundo from "./components/HolaMundo"
import Mensaje from "./components/Mensaje"
import ListaProductos from "./components/Productos"
import ListaUsuarios from "./components/Usuarios"
import GestionUsuarios from "./components/GestionUsuarios"
import React, { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Departamentos from "./components/Departamentos"
import Empleados from "./components/Empleados"
import "./App.css"

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

  useEffect(() => {
    const storedDepartamentos = localStorage.getItem("departamentos");
    const storedEmpleados = localStorage.getItem("empleados");

    if (storedDepartamentos) {
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if (storedEmpleados) {
      setEmpleados(JSON.parse(storedEmpleados));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
  }, [departamentos]);

  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HolaMundo />} />
        <Route path="/mensaje" element={<Mensaje texto="Clase 1" />} />
        <Route path="/productos" element={<ListaProductos productos={lstProductos} />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />
        <Route
          path="/departamentos"
          element={<Departamentos
            departamentos={departamentos}
            setDepartamentos={setDepartamentos}
          />}
        />

        <Route
          path="/empleados"
          element={
            <Empleados
              departamentos={departamentos}
              empleados={empleados}
              setEmpleados={setEmpleados}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
