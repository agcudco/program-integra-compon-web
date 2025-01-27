import React, { useState } from "react";

interface Departamento {
    id: number;
    nombre: string;
}

interface DepartamentoProps {
    departamentos: Departamento[];
    setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
}

const Departamentos: React.FC<DepartamentoProps> = ({ departamentos, setDepartamentos }) => {

    const [nombreDepartamento, setNombreDepartamento] = useState<string>("");

    const agregarDepartamento = () => {
        if (nombreDepartamento.trim() !== "") {
            setDepartamentos([...departamentos,
            { id: departamentos.length + 1, nombre: nombreDepartamento }]);
            setNombreDepartamento("");
        } else {
            alert("EL nombre es obligatorio");
        }
    }

    const eliminar = (id: number) => {
        setDepartamentos(
            departamentos.filter((dep) => dep.id !== id)
        );
    }

    return (
        <div>
            <h1>Departamentos</h1>
            <input
                type="text"
                placeholder="Nomnbre departamento"
                value={nombreDepartamento}
                onChange={(e) => setNombreDepartamento(e.target.value)}
            />
            <button onClick={agregarDepartamento}>Agregar</button>
            <h3>Listado</h3>
            <table border={2}>
                <thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {departamentos.map((d) => (
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.nombre}</td>
                            <td>
                                <button onClick={() => eliminar(d.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Departamentos;