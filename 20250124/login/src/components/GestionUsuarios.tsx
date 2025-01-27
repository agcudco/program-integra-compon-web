import React, { useState } from "react";

interface Usuario {
    id: number
    nombre: string;
    apellido: string;
    email: string;
}

const GestionUsuarios: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const agregarUsuario = () => {
        if (nombre.trim() && apellido.trim() && email.trim()) {
            const nuevoUsuario: Usuario = {
                id: usuarios.length + 1,
                nombre,
                apellido,
                email
            };

            setUsuarios([...usuarios, nuevoUsuario]);
            setNombre("");
            setApellido("");
            setEmail("");
        } else {
            alert("Todos los campos son obligatorios");
        }
    }

    const eliminarUsuario = (id: number) => {
        const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(nuevosUsuarios);
    }

    return (
        <div className="gestion-usuarios">
            <h1>Gestion de Usuarios</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} //data binding
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={agregarUsuario}>Registrar</button>
            </div>
            <h2>Usuarios registrados</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.nombre} {usuario.apellido} ({usuario.email})
                        <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GestionUsuarios;