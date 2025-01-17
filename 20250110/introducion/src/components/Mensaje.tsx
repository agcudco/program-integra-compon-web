type MensajeProps = {
    texto: string;
}

const Mensaje: React.FC<MensajeProps> = ({ texto }) => {
    return (
        <h1>{texto}</h1>
    )
}

export default Mensaje;