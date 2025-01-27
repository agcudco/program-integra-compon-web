import { Button } from "@mui/material"

export const Botones = () => {

    return (
        <div>
            <button>Hola Mundo</button>
            <Button variant="text" color="primary">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button>Primary</Button>
            <Button disabled>Disabled</Button>
            <Button href="#text-buttons">Link</Button>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    alert('Hola Mundo');
                }}
            >
                Hola Mundo
            </Button>
        </div>
    )
}