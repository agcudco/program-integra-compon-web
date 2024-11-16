class PerfilUsuario extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.profileContainer = document.createElement('div');
        this.profileContainer.classList.add('profile-conatiner');

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .profile-conatiner{
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.profileContainer);
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        const profilePic = this.getAttribute("profile-pic")||'URL IMAGEN';
        const username = this.getAttribute("username")||'Usuario';
        const bio = this.getAttribute("bio")||'Breve descripcion del usuario';

        this.shadowRoot.querySelector('.profile-conatiner').innerHTML=`
            <img src="${profilePic}" alt="Foto del usuario" class="profile-pic">
            <div class="username">${username}</div>
            <div class="bio">${bio}</div>
        `;
    }
}

window.customElements.define("perfil-usuario", PerfilUsuario);