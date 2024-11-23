class UsersGallerySlots extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.galleryContainer = document.createElement("div");
        this.galleryContainer.classList.add('gallery-container');


        this.slotContainer = document.createElement("div");
        this.slotContainer.classList.add("slot-container"); //opcional

        this.styleContainer = document.createElement("style");
        this.styleContainer.textContent = `
            .gallery-container{
                display:grid;
                grid-template-columns: repeat(auto-fit,minmax(200px, 1fr));
            }
            .user-card{                
            }
            .user-card img{
                border-radius:50%;
                margin-bottom:10px;
            }
            .slot-container{
                background-color:black;
                color:white;
            }
            .message-error{
            }
        `;

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="user-card">
                <img src="" alt="avathar del usuario">
                <h3>Nombre</h3>
                <p></p>
            </div>
        `;


        this.shadow.appendChild(this.styleContainer);
        this.shadow.appendChild(this.slotContainer);
        this.shadow.appendChild(this.galleryContainer);

        //slots dinamicos
        const slot = document.createElement('slot');
        this.slotContainer.appendChild(slot);
    }

    connectedCallback() {
        const urlApi = this.getAttribute('endpoint');
        this.fecthData(urlApi);
    }

    fecthData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const users = data.data || [];
            this.render(users);
        } catch (error) {
            console.error("Se presentó un error al procesar la petición fetch: ", error);
            this.galleryContainer.innerHTML = `<p class="message-error">Error al cargar la galería </p>`;
        }
    }

    render = (users) => {
        this.galleryContainer.innerHTML = "";

        users.forEach(user => {
            const card = this.template.content.cloneNode(true);
            const image = card.querySelector('img');
            const name = card.querySelector('h3');
            const email = card.querySelector('p');

            image.src = user.avatar;
            image.alt = `Avatar de ${user.first_name} ${user.last_name}`;
            name.textContent = `${user.first_name} ${user.last_name}`;
            email.textContent = user.email;

            this.galleryContainer.appendChild(card);
        });
    }


}

window.customElements.define('gallery-slots', UsersGallerySlots);