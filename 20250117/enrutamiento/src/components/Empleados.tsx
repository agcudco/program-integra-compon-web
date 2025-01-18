import React, { useState } from "react";

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    idDepartamento: number;
}

interface Departamento {
    id: number;
    nombre: string;
}

interface DepartamentoProps {
    departamentos: Departamento[];
    empleados: Empleado[];
    setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const Empleados: React.FC<DepartamentoProps> = ({ departamentos, empleados, setEmpleados }) => {
    const [nombreEmpleado, setNombreEmpleado] = useState<string>("");
    const [apellidoEmpleado, setApellidoEmpleado] = useState<string>("");
    const [idDepartamento, setIdDepartamento] = useState<number>(0);

    const agregar = () => {
        if (nombreEmpleado.trim() !== "" && apellidoEmpleado.trim() !== "" && idDepartamento !== 0) {
            setEmpleados([...empleados,
            {
                id: empleados.length + 1,
                nombre: nombreEmpleado,
                apellido: apellidoEmpleado,
                idDepartamento: idDepartamento
            }]);
            setNombreEmpleado("");
            setApellidoEmpleado("");
            setIdDepartamento(0);
        } else {
            alert("Existen campos vacíos");
        }
    }

    return (
        <div>
            <h1>Gestion de empleados</h1>
            <input
                type="text"
                value={nombreEmpleado}
                placeholder="Nombre"
                onChange={(e) => setNombreEmpleado(e.target.value)}
            />
            <input
                type="text"
                value={apellidoEmpleado}
                placeholder="Apellido"
                onChange={(e) => setApellidoEmpleado(e.target.value)}
            />
            <select
                value={idDepartamento}
                onChange={(e) => setIdDepartamento(Number(e.target.value))}
            >
                <option value={0}>-- Departamento --</option>
                {
                    departamentos.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                            {dep.nombre}
                        </option>
                    ))
                }
            </select>
            <button onClick={agregar}>Agregar</button>
            <h3>Listado</h3>
            <table border={2}>
                <thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Departamento</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {
                        empleados.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.nombre}</td>
                                <td>{emp.apellido}</td>
                                <td>
                                    {
                                        departamentos.find((dep) => dep.id === emp.idDepartamento)?.nombre
                                    }
                                </td>
                                <td>
                                    <button>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Empleados;