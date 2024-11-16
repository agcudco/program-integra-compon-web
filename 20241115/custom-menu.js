class CustomMenu extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const menuContainer = document.createElement("div");
        menuContainer.classList.add('menu-container');

        const opcionesMenu = [
            { texto: 'Inicio', enlace: 'index.html' },
            { texto: 'Producto', enlace: 'producto.html' },
            { texto: 'Servicios', enlace: 'servicios.html' },
            { texto: 'Contacto', enlace: 'contacto.html' },
            { texto: 'Registro', enlace: 'registro.html' }
        ];

        opcionesMenu.forEach(opcion => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = opcion.texto;
            link.href = opcion.enlace;
            listItem.appendChild(link);
            menuContainer.appendChild(listItem);
        });

        const estilo = document.createElement("style");
        estilo.textContent = `
            .menu-container{
                display:flex;                
                background-color:#f0f0f0;
                border-radius:5px;
            }
            li{
                list-style:none;
                margin: 5px 0;
                padding: 15px;
            }
            a{
                text-decoration:none;
                color:#333;
            }
            a:hover{
                color:#007BFF;                
            }
        `;

        shadow.appendChild(estilo);
        shadow.appendChild(menuContainer);

    }
}

window.customElements.define("custom-menu", CustomMenu);