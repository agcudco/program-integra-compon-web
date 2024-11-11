class MiAlerta extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <span class="alert-message">!Alerta Personalizada!</span>
            <button class="btn-cerrar">&times;</button>
        `;
    }

    connectedCallback() {
        this.querySelector(".btn-cerrar").addEventListener("click", () => {
            alert("Error");
            this.style.display='none';
        });
    }
}

customElements.define("mi-alerta", MiAlerta);