class BookForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.container = document.createElement('div');

        this.estilo = document.createElement('style');

        this.estilo.textContent = `
            .form-container{
                max-width:500px:
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ccc:
                border-radius: 10px;
            }
            .form-container button{
                padding: 10px 20px:
                background-color: #4caf50:
                color: white;
                border: none;
                border-radius:5px;
                cursor: pointer;
                font-size: 16px;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        this.container.innerHTML = `
            <div class="form-container" >
                <h2>Registrar un nuevo Libro</h2>
                <form id="book-form">
                    <label for="titulo">Titulo</label>
                    <input type="text" id="titulo" name="titulo">

                    <label for="autor">Autor</label>
                    <input type="text" id="autor" name="autor">

                    <label for="editorial">Editorial</label>
                    <input type="text" id="editorial" name="editorial">

                    <label for="nropaginas">Num. páginas</label>
                    <input type="number" id="nropaginas" name="nropaginas">

                    <label for="stock">Unid disponibles</label>
                    <input type="number" id="stock" name="stock">

                    <label for="estado">Estado</label>
                    <select id="estado" name="estado">
                        <option value="1">Disponible</option>
                        <option value="0">No disponible</option>
                    </select>

                    <button type="submit">Registrar</button>                   

                </form>
            </div>
        `;

        this.shadowRoot.querySelector('#book-form').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("dentro del metodo registrar");

        //capturo los valores de los formnularios
        const titulo = this.shadowRoot.querySelector('#titulo').value;
        const autor = this.shadowRoot.querySelector('#autor').value;
        const editorial = this.shadowRoot.querySelector('#editorial').value;
        const nropaginas = this.shadowRoot.querySelector('#nropaginas').value;
        const stock = this.shadowRoot.querySelector('#stock').value;
        const estado = this.shadowRoot.querySelector('#estado').value;

        const newBook = {
            titulo,
            autor,
            editorial,
            nropaginas,
            stock,
            estado: estado === "1"
        };

        try {
            const response = await fetch('http://localhost:5000/libros/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            });

            if (response.ok) {
                alert('Libro registrado exitosamente');
                this.shadowRoot.querySelector("#book-form").reset();
            } else {
                const errorData = await response.json();
                alert("Error al registrar: " + errorData.message);
            }

        } catch (error) {
            console.error(`Error con la bd: ${error}`)
        }

    }

}

window.customElements.define('book-form', BookForm);