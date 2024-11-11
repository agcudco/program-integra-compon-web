class MiComponente extends HTMLElement {
    constructor(){
        super();        
        this.innerHTML = "<p> Hola soy un Custom Element!</p>";
    }

    connectedCallback(){
        console.log("Elemento conectado al DOM");
    }

}

customElements.define('mi-elemento',MiComponente);