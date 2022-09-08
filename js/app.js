//161.- PRIMEROS PASOS Y PRIMER PROTOTYPE

//CONSTRUCTORES
//formulario 
//marca de auto
//año del carro
//tipo de seguro
function Seguro( marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo =tipo;
}
//objeto interfaz de usuario
function UI() {
    //poe le momento vacio
}

//llenar las opciones de los años
//al no hacer referencia a la palabra THIS podemos usar arrow function
UI.prototype.llenarOpciones = () => {
    //año actual
    const max = new Date().getFullYear();
    //año actual menos 15 años 
    const min = max -20;
    //variable donde se pondran los años
    const selectYear = document.querySelector('#year');
    //iterar con un for() para ir creando los años
    for (let i = max; i >= min; i--) {
        //crear html del select
        const option = document.createElement('option');
        //agregar value al option
        option.value = i;
        //textcontent
        option.textContent = i;
        //renderizar
        selectYear.appendChild( option );

    }
}

//instanciar UI
const ui = new UI();
console.log( ui );
//eventlistener
document.addEventListener('DOMContentLoaded', () => {
    //llamar funcion para llenar select con los años
    ui.llenarOpciones();

});