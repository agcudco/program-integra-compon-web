class TablaEstudiantes extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.tableContainer = document.createElement('div');
        this.tableContainer.classList.add('table-conatiner');

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .table-conatiner{
                margin:10px;
            }
            table{
                width:100%;
                border-collapse:collapse;
            }
            th,td{
                padding:8px;
                border: 1px solid #ddd;
                text-align:center;
            }
            th{
                background-color:#f2f2f2;
            }
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.tableContainer);

    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        this.tableContainer.innerHTML = "";

        const estudiantes = [
            { nombre: "Juan", apellido: "Perez", edad: 20, ciudad: "Quito" },
            { nombre: "Angel", apellido: "Cudco", edad: 20, ciudad: "Riobamba" },
            { nombre: "Maria", apellido: "Lopez", edad: 19, ciudad: "Ambato" },
            { nombre: "Kimberly", apellido: "Barriga", edad: 18, ciudad: "Sangolqui" },
            { nombre: "Marco", apellido: "Chacon", edad: 18, ciudad: "Sangolqui" },
            { nombre: "Genesis", apellido: "Tito", edad: 18, ciudad: "Sangolqui" }
        ];

        const headers = ["Nombre", "Apellido", "Edad", "Ciudad"];

        const tabla = document.createElement("table");

        //crear fila de encabezado
        const headerRow = document.createElement("tr");
        headers.forEach(h => {
            const header = document.createElement("th");
            header.textContent = h;
            headerRow.appendChild(header);
        });
        tabla.appendChild(headerRow);

        estudiantes.forEach(e => {
            const row = document.createElement("tr");
            Object.values(e).forEach(atr => {
                const celda = document.createElement("td");
                celda.textContent = atr;
                row.appendChild(celda);
            });
            tabla.appendChild(row);
        });


        this.tableContainer.appendChild(tabla);
    }

}

window.customElements.define("tabla-estudiantes", TablaEstudiantes);
