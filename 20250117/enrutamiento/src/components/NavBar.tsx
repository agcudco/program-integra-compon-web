import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {

    return (
        <nav>
            <Link to="/">
                Inicio
            </Link>
            <Link to="/mensaje">
                Mensaje
            </Link>
            <Link to="/productos">
                Productos
            </Link>

            <Link to="/usuarios">
                Usuarios Api
            </Link>

            <Link to="/gestion-usuarios">
                Gestion Usuarios
            </Link>

            <Link to="/departamentos">
                Departamentos
            </Link>

            <Link to="/empleados">
                Empleados
            </Link>
        </nav>
    )
}

export default NavBar;