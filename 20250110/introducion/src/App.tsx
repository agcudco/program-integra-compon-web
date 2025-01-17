import HolaMundo from "./components/HolaMundo"
import Mensaje from "./components/Mensaje"
import './App.css'
import ListaProductos from "./components/Productos"
import ListaUsuarios from "./components/Usuarios"
import GestionUsuarios from "./components/GestionUsuarios"

const lstProductos = [
  { nombre: "Laptop", precio: 50 },
  { nombre: "Impresora", precio: 100 },
  { nombre: "SmartTV", precio: 150 },
  { nombre: "Nevera", precio: 200 },
  { nombre: "Memoria USB", precio: 250 },
]

function App() {

  return (
    <>
      <HolaMundo />
      <Mensaje texto="Clase 1" />
      <Mensaje texto="Clase 2" />

      <ListaProductos productos={ lstProductos} />
      <ListaUsuarios />
      <GestionUsuarios />
    </>
  )
}

export default App
