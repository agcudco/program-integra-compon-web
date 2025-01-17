type Producto = {
    nombre: string;
    precio: number;
}

type ProductosProps = {
    productos: Producto[];
}

const ListaProductos: React.FC<ProductosProps> = ({ productos }) => {
    return (
        <div>
            <h2>Listado de productos</h2>
            <ul>
                {productos.map((producto, index) => (
                    <li key={index}>
                        {producto.nombre} - ${producto.precio}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaProductos;