import { useEffect, useRef, useState } from "react"
import { Rol } from "../types/types";
import { Toast } from 'primereact/toast';
import { rolService } from "../services/rolService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const Roles: React.FC = () => {
    const [roles, setRoles] = useState<Rol[]>([]);
    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [rol, setRol] = useState<Partial<Rol>>({});

    const loadRoles = async () => {
        try {
            const data = await rolService.findAll();
            setRoles(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al cargar los roles', life: 3000 });
        }
    }

    useEffect(() => {
        loadRoles();
    }, [])

    const saveRol = async () => {
        try {
            if (rol.id) {
                await rolService.update(rol.id, rol);
                toast.current?.show({ severity: 'success', summary: 'Exito', detail: 'Rol actualizado correctamente', life: 3000 });
            } else {
                await rolService.create(rol);
                toast.current?.show({ severity: 'success', summary: 'Exito', detail: 'Rol guardado correctamente', life: 3000 });
            }
            setVisible(false);
            loadRoles();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el rol', life: 3000 });
        }
    }

    const openNew = () => {
        setRol({});
        setVisible(true);
    }

    const hideDialog = () => {
        setVisible(false);
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-save" onClick={saveRol} />
        </div>
    );



    return (
        <div>
            <Toast ref={toast} />
            <h2>Gestion de roles</h2>
            <Button label="Nuevo rol" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={roles} >
                <Column field="id" header="Id" sortable />
                <Column field="nombre" header="Rol" sortable />
                <Column field="descripcion" header="Descripción" sortable />
                <Column field="estado" header="Estado" sortable />
                <Column
                    field="fechaCreacion"
                    header="Fecha de creación"
                    sortable
                    body={(rowData =>
                        rowData.fechaCreacion ? new Date(rowData.fechaCreacion).toLocaleDateString() : ''
                    )}
                />
                <Column
                    field="fechaActualizacion"
                    header="Última actualizacón"
                    sortable
                    body={(rowData =>
                        rowData.fechaActualizacion ? new Date(rowData.fechaActualizacion).toLocaleDateString() : ''
                    )}
                />
                <Column
                    header="Acciones"
                    body={(rowData: Rol) => (
                        <>
                            <Button
                                icon="pi pi-pencil"
                                onClick={() => {
                                    setRol(rowData);
                                    setVisible(true);
                                }}
                            />
                            <Button
                                icon="pi pi-trash"
                            />
                        </>
                    )}
                />
            </DataTable>


            <Dialog visible={visible}
                header={rol.id ? 'Editar rol' : 'Nuevo Rol'}
                footer={footerContent}
                onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="nombre">Rol: </label>
                    <InputText
                        id="nombre"
                        value={rol.nombre || ''}
                        onChange={e => setRol({ ...rol, nombre: e.target.value })}
                        required
                        autoFocus
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="descripcion">Descripcion: </label>
                    <InputText
                        id="descripcion"
                        value={rol.descripcion || ''}
                        onChange={e => setRol({ ...rol, descripcion: e.target.value })}
                    />
                </div>
            </Dialog>
        </div>
    )
}