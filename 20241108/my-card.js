class MyCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});

        this.shadowRoot.innerHTML=`
            <style>
            </style>

            <div class="card'>
                <img src="" alt="Card image" class="card-image">
                <div class="card-content">
                    <h3>Titulo de la tarjeta</h3>
                    <p>Descripcion de la tarjeta</p>
                </div>
            </div>
        `;
    }
}

customElements.define("my-card",MyCard);