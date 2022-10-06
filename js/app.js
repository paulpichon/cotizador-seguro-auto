//161.- PRIMEROS PASOS Y PRIMER PROTOTYPE
//04/10/2022 terminado
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
//realiza la cotizacion con los datos
//no usamos arrow functions ya que si haremos uso de la propiedades THIS
Seguro.prototype.cotizarSeguro = function() {
    /*  incrementos %(porcentajes)
        1.- Americano = 1.15
        2.- Asiatico = 1.05
        3.- Europeo = 1.35
    */
    
    //definir variables
    let cantidad;
    const base = 2000;

    //evaluar marca de auto
    //1 americano
    //2 asiatico
    //3 europeo
    switch ( this.marca ) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer el año 
    //este es la formula para poder calcular los años a partir del año actual menos el año seleccionado
    const diferencia = new Date().getFullYear() - this.year;
    //cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    
    /*
        si el seguro es basico se multiplica por un 30% más 
        si el seguro es completo se multiplica por un 50% más 
    */
   if ( this.tipo === 'basico') {
        cantidad *= 1.30;
   }else{
        cantidad *= 1.50;
   }

   //retornamos la cantidad
   console.log( cantidad );
   return cantidad;
    
    console.log( cantidad );
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
    //quitar el mensaje de error despues de 3 segundos
    setTimeout(() => {
        //removemos el div
        div.remove();
    }, 3000);
}
//prototype que mostrara el resultado
UI.prototype.mostrarResultado = ( total, seguro ) => {
    //destructurig
    const { marca, year, tipo } = seguro;
    //con un switch vamos a evaluar el tipo de marca que es 1= americano, 2= asiatico, 3 = europeo
    switch ( marca ) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    //crear el resultado
    const div = document.createElement('div');
    //añadir clase
    div.classList.add('mt-10');
    //añadir texto
    div.innerHTML =`
        <p class="header">Tu resumen: </p>
        <p class="font-bold">Marca: <span class="font-normal"> ${ textoMarca }</span> </p>
        <p class="font-bold">Año: <span class="font-normal"> ${ year }</span> </p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize"> ${ tipo }</span> </p>
        <p class="font-bold">Total: <span class="font-normal">$ ${ total }</span> </p>
    `;
    //variable para renderizar
    const resultadoDiv = document.querySelector('#resultado');
    

    //mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    //quitar spinner despues de 3 segundos
    setTimeout(() => {
        //quitar el spineer
        spinner.style.display = 'none';//se quita spinner
        //renderizar
        resultadoDiv.appendChild( div );//se muestra el resultado
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
    const year = document.querySelector('#year').value;
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

    //ocultar las cotizaciones previas antes de hacer una nueva cotizacion
    const resultados = document.querySelector('#resultado div');
    //verificar si esta vacio la variable resultados
    if ( resultados != null ) {
        //quitamos resultados en caso de haber ya hecho otra cotizacion
        resultados.remove();
    }

    //instanciar el seguro
    const seguro = new Seguro( marca, year, tipo );
    //llamando funcion
    const total = seguro.cotizarSeguro();
    //utilizar el prototype que va a cotizar
    ui.mostrarResultado( total, seguro );
}