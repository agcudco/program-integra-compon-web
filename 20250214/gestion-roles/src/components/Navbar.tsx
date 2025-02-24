import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Roles',
            icon: 'pi pi-users',
            command: () => navigate('/roles')
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => navigate('/usuarios')
        },
        {
            label: 'Acerca de',
            icon: 'pi pi-info-circle',
            command: () => navigate('/acerca-de')
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}