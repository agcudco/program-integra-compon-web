class MiBoton extends HTMLElement{
    constructor(){
        super();

        //encapsulacion
        this.attachShadow({mode:'open'});

        this.shadowRoot.innerHTML=`
             <style>
                button{
                    padding: 10px 20px;
                    font-size: 1em;
                    color:white;
                    background-color:#3d99f5;
                    border:none;
                    cursor:pointer;
                }
                button:hover{
                    background-color:red;
                }
             </style>
            <button>Click me</button>
        `;
    }

    connectedCallback(){
        this.shadowRoot.querySelector("button").addEventListener("click",()=>{
            alert("Boton clickeado");
        });
    }
}

customElements.define("mi-boton",MiBoton);