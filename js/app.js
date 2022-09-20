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
//agregar otro prototype
//muestra alertas en pantalla
//al no usar la palabra reservada THIS podemos usar arrow functions
//toma 2 parametros: mensaje ---> sera el mensaje que saldra en pantalla, y el tipo de mensaje ---> que sera
//el que muestre si es un error o es correcto
UI.prototype.mostrarMensaje = ( mensaje, tipo ) => {
    //variable del formulario
    const formulario = document.querySelector('#cotizar-seguro');
    //crear el html del mensaje
    const div = document.createElement('div');
    //verificar que tipo de mensaje sera el que se muestre en pantalla
    if ( tipo === 'error') {
        //añadimos clases de error
        div.classList.add('error');
    }else{
        //en caso de que sea mensaje de exito 
        div.classList.add('correcto');
    }
    //se añade clase mensaje
    div.classList.add('mensaje', 'mt-10');
    //textcontent
    div.textContent = mensaje;
    //insertar en el html
    //insertBefore('no que se a creado ó nuevo nodo', 'y en donde lo quieres renderizar')
    formulario.insertBefore( div, document.querySelector('#resultado'));
    //quitar el mensaje de eror despues de 3 segundos
    setTimeout(() => {
        //removemos el div
        div.remove();
    }, 3000);
}

//instanciar UI
const ui = new UI();

//eventlistener
document.addEventListener('DOMContentLoaded', () => {
    //llamar funcion para llenar select con los años
    ui.llenarOpciones();
});

//validar el formulario
eventListeners()
function eventListeners() {
    //variable del formulario
    const formulario = document.querySelector('#cotizar-seguro');
    //agregar ventlistener
    formulario.addEventListener('submit', cotizarSeguro);
}
//function pára cotizar el seguro
function cotizarSeguro( e ) {
    //prevenir la accion por defecto
    e.preventDefault();
    
    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    //leer el año seleccionado
    const year = document.querySelector('#marca').year;
    //leer el tipo de seguro
    //al ser un radio button se lee con sintaxis de selector css
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //validar 
    //en caso de que los 3 campos esten vacios
    if ( marca === '' || year === '' || tipo === '') {
        //mostrar mensaje de error
        //toma 2 argumentos
        //mensaje, tipo de mensaje
        ui.mostrarMensaje('Todos los campos son obligatorios','error' );
        //retornamos para que no siga ejecutando codigo
        return;
    }
    //en caso de pasar validacion mostrar mensaje de exito, cotizando
    ui.mostrarMensaje('Cotizando...','exito' );

}