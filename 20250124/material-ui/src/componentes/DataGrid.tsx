import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellido', headerName: 'Apellido', width: 150 },
    { field: 'edad', headerName: 'Edad', width: 110 }
]

const rows = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 25 },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', edad: 30 },
    { id: 3, nombre: 'Pedro', apellido: 'Garcia', edad: 35 },
    { id: 4, nombre: 'Jose', apellido: 'Rodriguez', edad: 40 },
    { id: 5, nombre: 'Ana', apellido: 'Martinez', edad: 45 },
    { id: 6, nombre: 'Luis', apellido: 'Fernandez', edad: 50 },
    { id: 7, nombre: 'Laura', apellido: 'Lopez', edad: 55 },
    { id: 8, nombre: 'Carlos', apellido: 'Sanchez', edad: 60 }
]

export const TablaDataGrid = () => {
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
        />
    )
}