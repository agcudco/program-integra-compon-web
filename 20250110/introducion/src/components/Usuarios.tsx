import React, { useEffect, useState } from "react";

interface Usuario {
    id: number;
    name: string;
    username: string;
    email: string;
}

const ListaUsuarios: React.FC = () => {

    //estados
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState<string | null>(null);

    //hooks
    useEffect(() => {
        
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Error en la petición');
                } else {
                    const data: Usuario[] = await response.json();
                    setUsuarios(data);
                }
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchUsuarios();
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2>Listado de usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
        </div>
    )
}

export default ListaUsuarios;