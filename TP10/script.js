// Variable global para controlar en qué pregunta se encuentra el usuario
let pasoActual = 1;

// Captura de elementos globales de la interfaz
const btnSiguiente = document.getElementById('btnSiguiente');
const btnRetroceder = document.getElementById('btnRetroceder');
const btnReiniciar = document.getElementById('btnReiniciar');
const cartelExito = document.getElementById('cartel-exito');
const botonera = document.getElementById('botonera');

// Escuchadores de eventos para los botones principales
btnSiguiente.addEventListener('click', procesarSiguiente);
btnRetroceder.addEventListener('click', procesarRetroceder);
btnReiniciar.addEventListener('click', reiniciarFormulario);

// Función para avanzar en el formulario progresivo
function procesarSiguiente() {
    if (validarPaso(pasoActual)) {
        bloquearInput(pasoActual, true); // Bloquea el campo actual si es válido
        
        if (pasoActual === 10) {
            finalizarRegistro(); // Si completó la 10, termina
        } else {
            // Oculta la pregunta actual y muestra la que sigue
            document.getElementById(`paso-${pasoActual}`).classList.add('d-none');
            pasoActual++;
            document.getElementById(`paso-${pasoActual}`).classList.remove('d-none');
            
            // Habilita el botón retroceder si dejamos el paso 1
            btnRetroceder.removeAttribute('disabled');
        }
    }
}

// Función para volver a la pregunta anterior
function procesarRetroceder() {
    if (pasoActual > 1) {
        document.getElementById(`paso-${pasoActual}`).classList.add('d-none');
        pasoActual--;
        document.getElementById(`paso-${pasoActual}`).classList.remove('d-none');
        bloquearInput(pasoActual, false); // Desbloquea para permitir edición
        
        // Si volvió al paso 1, desactiva el botón de retroceso
        if (pasoActual === 1) {
            btnRetroceder.setAttribute('disabled', 'true');
        }
    }
}

// Bloquea o desbloquea controles select o input
function bloquearInput(paso, bloquear) {
    const contenedor = document.getElementById(`paso-${paso}`);
    const elemento = contenedor.querySelector('input, select');
    if (elemento) {
        elemento.disabled = bloquear;
    }
}

// Gestiona visualmente los colores de los bordes y los textos de error en el DOM
function aplicarEstiloBorde(idInput, idError, estado, mensaje = "") {
    const input = document.getElementById(idInput);
    const errorDiv = document.getElementById(idError);
    
    input.classList.remove('borde-valido', 'borde-invalido', 'borde-vacio');
    errorDiv.innerHTML = "";

    if (estado === "vacio") {
        input.classList.add('borde-vacio');
        errorDiv.innerHTML = mensaje;
    } else if (estado === "invalido") {
        input.classList.add('borde-invalido');
        errorDiv.innerHTML = mensaje;
    } else if (estado === "valido") {
        input.classList.add('borde-valido');
    }
}

// Orquestador que llama a la función de validación correspondiente al paso actual
function validarPaso(paso) {
    switch(paso) {
        case 1: return validarPaso1();
        case 2: return validarPaso2();
        case 3: return validarPaso3();
        case 4: return validarPaso4();
        case 5: return validarPaso5();
        case 6: return validarPaso6();
        case 7: return validarPaso7();
        case 8: return validarPaso8();
        case 9: return validarPaso9();
        case 10: return validarPaso10();
        default: return false;
    }
}

// --- FUNCIONES INDIVIDUALES DE VALIDACIÓN ---

function validarPaso1() {
    const valor = document.getElementById('nombre').value.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valor === "") {
        aplicarEstiloBorde('nombre', 'error-1', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    if (valor.length < 3 || !regexLetras.test(valor)) {
        aplicarEstiloBorde('nombre', 'error-1', 'invalido', 'Debe contener solo letras y mínimo 3 caracteres.');
        return false;
    }
    aplicarEstiloBorde('nombre', 'error-1', 'valido');
    return true;
}

function validarPaso2() {
    const valor = document.getElementById('raza').value;
    if (valor === "") {
        aplicarEstiloBorde('raza', 'error-2', 'vacio', 'Debe seleccionarse una opción válida.');
        return false;
    }
    aplicarEstiloBorde('raza', 'error-2', 'valido');
    return true;
}

function validarPaso3() {
    const valor = document.getElementById('clase').value;
    if (valor === "") {
        aplicarEstiloBorde('clase', 'error-3', 'vacio', 'Debe seleccionarse una opción válida.');
        return false;
    }
    aplicarEstiloBorde('clase', 'error-3', 'valido');
    return true;
}

function validarPaso4() {
    const valor = document.getElementById('reino').value.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valor === "") {
        aplicarEstiloBorde('reino', 'error-4', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    if (valor.length < 3 || !regexLetras.test(valor)) {
        aplicarEstiloBorde('reino', 'error-4', 'invalido', 'Debe contener solo letras y mínimo 3 caracteres.');
        return false;
    }
    aplicarEstiloBorde('reino', 'error-4', 'valido');
    return true;
}

function validarPaso5() {
    const valor = document.getElementById('arma').value.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valor === "") {
        aplicarEstiloBorde('arma', 'error-5', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    if (valor.length < 3 || !regexLetras.test(valor)) {
        aplicarEstiloBorde('arma', 'error-5', 'invalido', 'Debe contener solo letras y mínimo 3 caracteres.');
        return false;
    }
    aplicarEstiloBorde('arma', 'error-5', 'valido');
    return true;
}

function validarPaso6() {
    const valor = document.getElementById('registro').value.trim();

    if (valor === "") {
        aplicarEstiloBorde('registro', 'error-6', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    // Comprueba si no es un número o si la longitud difiere de 6 dígitos
    if (isNaN(valor) || valor.length !== 6 || valor.includes(" ")) {
        aplicarEstiloBorde('registro', 'error-6', 'invalido', 'Debe ser un número de exactamente 6 dígitos.');
        return false;
    }
    aplicarEstiloBorde('registro', 'error-6', 'valido');
    return true;
}

function validarPaso7() {
    const valor = document.getElementById('vida').value.trim();
    const numero = parseInt(valor, 10);

    if (valor === "") {
        aplicarEstiloBorde('vida', 'error-7', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    if (isNaN(valor) || valor.includes(" ") || numero < 1 || numero > 999) {
        aplicarEstiloBorde('vida', 'error-7', 'invalido', 'Debe ser un número entero entre 1 y 999.');
        return false;
    }
    aplicarEstiloBorde('vida', 'error-7', 'valido');
    return true;
}

function validarPaso8() {
    const valor = document.getElementById('batallas').value.trim();
    const numero = parseInt(valor, 10);

    if (valor === "") {
        aplicarEstiloBorde('batallas', 'error-8', 'vacio', 'El campo no puede estar vacío.');
        return false;
    }
    if (isNaN(valor) || valor.includes(" ") || numero < 0) {
        aplicarEstiloBorde('batallas', 'error-8', 'invalido', 'Debe ser un número entero mayor o igual a 0.');
        return false;
    }
    aplicarEstiloBorde('batallas', 'error-8', 'valido');
    return true;
}

function validarPaso9() {
    const fechaInput = document.getElementById('nacimiento').value;

    if (!fechaInput) {
        aplicarEstiloBorde('nacimiento', 'error-9', 'vacio', 'Debe ingresar una fecha de nacimiento.');
        return false;
    }

    // Lógica para calcular la edad exacta usando el objeto Date
    const fechaNac = new Date(fechaInput);
    const hoy = new Date();
    
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    
    // Si todavía no pasó su cumpleaños este año, restamos uno a la edad
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    if (edad < 18) {
        aplicarEstiloBorde('nacimiento', 'error-9', 'invalido', 'El personaje debe ser mayor de 18 años.');
        return false;
    }

    aplicarEstiloBorde('nacimiento', 'error-9', 'valido');
    return true;
}

function validarPaso10() {
    const fechaInput = document.getElementById('inicioAventura').value;

    if (!fechaInput) {
        aplicarEstiloBorde('inicioAventura', 'error-10', 'vacio', 'Debe ingresar una fecha de inicio.');
        return false;
    }

    const fechaInicio = new Date(fechaInput);
    const hoy = new Date();

    // Normalizamos las fechas a las 00:00 para comparar únicamente los días calendario
    fechaInicio.setHours(0,0,0,0);
    hoy.setHours(0,0,0,0);

    if (fechaInicio > hoy) {
        aplicarEstiloBorde('inicioAventura', 'error-10', 'invalido', 'La fecha no puede ser futura.');
        return false;
    }

    aplicarEstiloBorde('inicioAventura', 'error-10', 'valido');
    return true;
}

// Finaliza el flujo ocultando todo y mostrando el mensaje final dinámico
function finalizarRegistro() {
    document.getElementById('formulario-registro').classList.add('d-none');
    botonera.classList.add('d-none');
    
    const nombre = document.getElementById('nombre').value.trim();
    const raza = document.getElementById('raza').value;
    const clase = document.getElementById('clase').value;
    
    cartelExito.innerHTML = `¡Registro exitoso, ${nombre}! Tu leyenda comienza hoy. ¡Que la Gran Alianza guíe tus pasos, ${clase} de los ${raza}!`;
    cartelExito.classList.remove('d-none');
}

// Resetea por completo los elementos al estado inicial de carga
function reiniciarFormulario() {
    pasoActual = 1;
    
    for (let i = 1; i <= 10; i++) {
        const pasoDiv = document.getElementById(`paso-${i}`);
        pasoDiv.classList.add('d-none');
        bloquearInput(i, false);
        
        const input = pasoDiv.querySelector('input, select');
        if (input) {
            input.value = "";
            input.classList.remove('borde-valido', 'borde-invalido', 'borde-vacio');
        }
        document.getElementById(`error-${i}`).innerHTML = "";
    }
    
    document.getElementById('paso-1').classList.remove('d-none');
    document.getElementById('formulario-registro').classList.remove('d-none');
    
    botonera.classList.remove('d-none');
    btnRetroceder.setAttribute('disabled', 'true');
    cartelExito.classList.add('d-none');
}