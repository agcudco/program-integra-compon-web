import { useEffect, useRef, useState } from "react"
import { Rol, Usuario } from "../types/types"
import { usuarioService } from "../services/usuarioService";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { rolService } from "../services/rolService";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [selectedUsuario, setSelectedUsuario] = useState<Partial<Usuario>>({});
    const [roles, setRoles] = useState<Rol[]>([]);
    const [selectedRole, setSelectedRole] = useState<Rol | null>(null);
    const [displayRoleDialog, setDisplayRoleDialog] = useState(false);
    const toast = useRef<Toast>(null);

    const loadUsuarios = async () => {
        try {
            const data = await usuarioService.findAll();
            setUsuarios(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los usuarios', life: 3000 });
        }
    }

    useEffect(() => {
        loadUsuarios();
    }, [])

    const openRolDialog = async (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        try {
            const lstRoles = await rolService.findAll();
            setRoles(lstRoles);
            setDisplayRoleDialog(true);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los roles', life: 3000 });
        }
    }

    const asignarRol = async () => {
        if (!selectedRole || !selectedUsuario.id) return;
        try {
            await usuarioService.asignarRol(selectedUsuario.id,selectedRole.id);
            toast.current?.show({ severity: 'success', summary: 'Exito', detail: 'Rol asignado correctamente', life: 3000 });
            setDisplayRoleDialog(false);
            loadUsuarios();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al asignar un rol', life: 3000 });
        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <h1>Gestion de usuarios</h1>
            <DataTable value={usuarios} >
                <Column field="id" header="Id" sortable />
                <Column field="cedula" header="Cedula" sortable />
                <Column field="nombre" header="Nombre" sortable />
                <Column field="apellido" header="Apellido" sortable />
                <Column field="email" header="Email" sortable />
                <Column
                    field="fechaNacimiento"
                    header="Fecha de Nacimiento"
                    sortable
                    body={(rowData =>
                        rowData.fechaNacimiento ? new Date(rowData.fechaNacimiento).toLocaleDateString() : ''
                    )}
                />
                <Column
                    field="fechaCreacion"
                    header="Fecha de creación"
                    sortable
                    body={(rowData =>
                        rowData.fechaCreacion ? new Date(rowData.fechaCreacion).toLocaleDateString() : ''
                    )}
                />
                <Column
                    header="Roles"
                    body={(data: Usuario) =>
                        data.roles && data.roles.length > 0 ? data.roles.map(r => r.nombre).join(',') : 'Sin roles'
                    }
                />
                <Column
                    header="Acciones"
                    body={(data: Usuario) => (
                        <>
                            <Button
                                label="Asignar Rol"
                                icon="pi pi-user"
                                onClick={() => openRolDialog(data)}
                            />
                            <Button
                                label="Eliminar Rol"
                                icon="pi pi-trash"
                            />
                        </>
                    )}
                />

            </DataTable>


            <Dialog visible={displayRoleDialog}
                header='Asignar Rol'
                onHide={() => setDisplayRoleDialog(false)}>

                <div className="p-field">
                    <label htmlFor="nombre">Rol: </label>
                    <Dropdown
                        id="rol"
                        value={selectedRole}
                        options={roles}
                        optionLabel="nombre"
                        placeholder="Seleccione un rol"
                        onChange={e => setSelectedRole(e.value)}
                    />
                </div>
                <div className="p-mt-3">
                    <Button label="Cancelar" icon="pi pi-times" onClick={() => setDisplayRoleDialog(false)} />
                    <Button label="Guardar" icon="pi pi-save" onClick={asignarRol} disabled={!selectedRole} />
                </div>

            </Dialog>
        </div>
    )
}