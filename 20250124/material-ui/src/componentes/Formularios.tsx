import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export const Formularios = () => {

    const [nombre, serNombre] = useState<string>('');
    const [option, setOption] = useState<string>('');

    return (
        <form>
            <h3>Formularios</h3>

            <TextField
                label="Nombre"
                value={nombre}
                onChange={(e) => serNombre(e.target.value)}
                fullWidth
            />
            <Select
                value={option}
                onChange={(e) => setOption(e.target.value as string)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>Seleccione</MenuItem>
                <MenuItem value="option1">Opcion 1</MenuItem>
                <MenuItem value="option2">Opcion 2</MenuItem>
            </Select>
        </form>
    )
}