import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

interface Props {
    onLogout: () => void;
}

const NavBar: React.FC<Props> = ({ onLogout }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    }

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
            <button onClick={handleLogout}>                
                Cerrar Sesión
            </button>
        </nav>
    )
}

export default NavBar;