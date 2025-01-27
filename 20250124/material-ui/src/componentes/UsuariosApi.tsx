import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export const UsuariosApi: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nombre', width: 150 },
        { field: 'username', headerName: 'Usuario', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Telefono', width: 150 },
        { field: 'website', headerName: 'Sitio Web', width: 150 }
    ]

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response.ok) {
                    throw new Error('No se pudo obtener la informacion');
                }
                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();

    }, []);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={users}
                pageSizeOptions={[5, 10, 20]}
                loading={loading}
            />
        </Box>
    )
}