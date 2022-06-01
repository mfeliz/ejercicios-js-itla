const formulario = document.querySelector("#form");

function eventSubmit(event){
    //quitar comportamiento por defecto del evento
    event.preventDefault()

    //obtenemos los inputs del formulario
    const inputs = event.target.elements;

    const colorTexto = inputs["colorTexto"].value;
    const color = inputs["colorFondo"].value;
    const fuente = inputs["fuente"].value;
    const ancho = inputs["ancho"].value;
    const alto = inputs["alto"].value;
    const text = inputs["text"].value;

    const caja = document.querySelector("#caja");
    caja.textContent = text;

    caja.style.width = parseInt(ancho)+"px";
    caja.style.height = parseInt(alto)+"px";
    caja.style.background = color;
    caja.style.color = colorTexto;
    caja.style.fontSize = parseInt(fuente) + 'px';
}

formulario.addEventListener("submit", eventSubmit);