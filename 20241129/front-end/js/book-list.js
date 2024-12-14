class BookList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.container = document.createElement("div");
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            table{
                width:100%;
                border-collapse:collapse;
                margin:20px 0;
                font-size: 16px;
                text-align: letf;
            }
            th, td{
                padding: 10px;
                border: 1px solid #f06b20;
            }
            th{
                background-color:#cba590;
            }
            .error-alert{
            }
            .empty-alert{
            }
            .actions{
                
            }
            .btn-eliminar{
                background-color:red;
                color:white;   
                padding: 5px 10px;
                cursor:pointer;
                border:none;
                border-radius: 10px;             
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        const src = this.getAttribute('src');
        this.fetchData(src);
    }

    fetchData = async (src) => {
        try {
            const response = await fetch(src);
            const data = await response.json();
            const books = data || [];
            console.log(`Se obtuvieron ${books.length} libros`);
            this.render(books);
        } catch (error) {
            console.log(`Error con la API: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al realizar el GET a la API</p>
            `;
        }
    }

    render = (books) => {
        if (books.length == 0) {
            this.container.innerHTML = `
                <p class="empty-alert">No extisten libros disponibles</p>
            `;
        }

        //construir el encabezado
        let tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>Nro paginas</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        //construir el body
        books.forEach(book => {
            tableHtml += `
                <tr>
                    <td>${book.id}</td>                    
                    <td>${book.titulo}</td> 
                    <td>${book.autor}</td>                    
                    <td>${book.editorial}</td> 
                    <td>${book.nropaginas}</td>                    
                    <td>${book.stock}</td> 
                    <td>${book.estado ? "Disponible" : "No disponible"}</td> 
                    <td class = "actions">
                        <button class="btn-update" data-id="${book.id}">Actualizar</button>
                        <button class="btn-eliminar" data-id="${book.id}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        //finalizo la construccion
        tableHtml += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHtml;

        this.container.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });
    }


    handleDelete = async (id) => {
        const confirmDelete = confirm(`Esta seguro de eliminar el libro con el id ${id}`);

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/libros/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Libro eliminado exitosamente')
                    //this.fetchData()
                    const src = this.getAttribute('src');
                    this.fetchData(src);
                } else {
                    alert('Error al emilinar el libro')
                }
            } catch (error) {
                console.error(`Error al eliminar ${error}`);
            }
        }

    }


}

window.customElements.define('book-list', BookList);