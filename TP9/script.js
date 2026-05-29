let juegoSeleccionado = "";

function seleccionarJuego(elementoTarjeta, nombreJuego) { 
    const todasLasTarjetas = document.querySelectorAll('.tarjeta'); 
    
    todasLasTarjetas.forEach(tarjeta => {
        tarjeta.classList.remove('seleccionado');
    });

    elementoTarjeta.classList.add('seleccionado');
    juegoSeleccionado = nombreJuego; 
    
    const errorJuego = document.getElementById('error-juego');
    errorJuego.innerHTML = "";
    errorJuego.classList.remove('d-block');
    errorJuego.classList.add('d-none');
}

function manejarError(idInput, idError, mensaje, tieneError) {
    const input = document.getElementById(idInput);
    const errorDiv = document.getElementById(idError);
    
    if (tieneError) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorDiv.innerHTML = mensaje;
        errorDiv.classList.add('d-block');
        errorDiv.classList.remove('d-none');
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorDiv.innerHTML = "";
        errorDiv.classList.remove('d-block');
        errorDiv.classList.add('d-none');
    }
}

function validarNickname() {
    const valor = document.getElementById('nickname').value.trim();
    const regexAlfanumerico = /^[a-zA-Z0-9]+$/;
    
    if (valor === "") {
        manejarError('nickname', 'error-nickname', 'CAMPO OBLIGATORIO', true);
        return false;
    }
    if (valor.length < 3) {
        manejarError('nickname', 'error-nickname', 'Mínimo de 3 caracteres requerido.', true);
        return false;
    }
    if (!regexAlfanumerico.test(valor)) {
        manejarError('nickname', 'error-nickname', 'Solo se permiten letras y números (sin espacios).', true);
        return false;
    }
    
    manejarError('nickname', 'error-nickname', '', false);
    return true;
}

function validarEdad() {
    const valor = document.getElementById('edad').value.trim();
    
    if (valor === "") {
        manejarError('edad', 'error-edad', 'CAMPO OBLIGATORIO', true);
        return false;
    }
    if (isNaN(valor) || valor.includes('.')) {
        manejarError('edad', 'error-edad', 'Solo se permiten números enteros.', true);
        return false;
    }
    
    const edadNum = parseInt(valor, 10);
    if (edadNum <= 16) {
        manejarError('edad', 'error-edad', 'El jugador debe ser mayor de 16 años.', true);
        return false;
    }
    
    manejarError('edad', 'error-edad', '', false);
    return true;
}

function validarCodigoEquipo() {
    const valor = document.getElementById('codigo-equipo').value.trim();
    
    if (valor === "") {
        manejarError('codigo-equipo', 'error-codigo', 'CAMPO OBLIGATORIO', true);
        return false;
    }
    if (isNaN(valor) || valor.includes('.')) {
        manejarError('codigo-equipo', 'error-codigo', 'Solo se permiten números.', true);
        return false;
    }
    if (valor.length !== 4) {
        manejarError('codigo-equipo', 'error-codigo', 'Longitud exacta de 4 dígitos.', true);
        return false;
    }
    
    manejarError('codigo-equipo', 'error-codigo', '', false);
    return true;
}

function validarJuegoSeleccionado() {
    const errorJuego = document.getElementById('error-juego');
    if (juegoSeleccionado === "") {
        errorJuego.innerHTML = "Debe haberse seleccionado exactamente un juego de la grilla antes de registrar.";
        errorJuego.classList.add('d-block');
        errorJuego.classList.remove('d-none');
        return false;
    }
    errorJuego.innerHTML = "";
    errorJuego.classList.remove('d-block');
    errorJuego.classList.add('d-none');
    return true;
}

document.getElementById('form-registro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nicknameOk = validarNickname();
    const edadOk = validarEdad();
    const codigoOk = validarCodigoEquipo();
    const juegoOk = validarJuegoSeleccionado();
    
    const mensajeExito = document.getElementById('mensaje-exito');
    const seccionPreparacion = document.getElementById('seccion-preparacion');
    
    if (nicknameOk && edadOk && codigoOk && juegoOk) {
        mensajeExito.innerHTML = "¡Registro Exitoso!";
        seccionPreparacion.classList.remove('d-none');
    } else {
        mensajeExito.innerHTML = "";
        seccionPreparacion.classList.add('d-none');
        document.getElementById('resultado-preparacion').innerHTML = "";
    }
});

document.getElementById('nickname').addEventListener('blur', validarNickname);
document.getElementById('edad').addEventListener('blur', validarEdad);
document.getElementById('codigo-equipo').addEventListener('blur', validarCodigoEquipo);

document.getElementById('btn-preparacion').addEventListener('click', ejecutarPreguntasPreparacion);

function ejecutarPreguntasPreparacion() {
    const preguntas = [
        "¿Cuántas horas por semana dedicás a jugar?",
        "¿Preferís jugar solo o en equipo?",
        "¿Qué rol ocupás en tu equipo? (Atacante, Defensa, Soporte, etc.)"
    ];

    let respuestas = [];

    for (let i = 0; i < preguntas.length; i++) {
        let respuesta = prompt(preguntas[i]);

        if (respuesta === null || respuesta.trim() === "") {
            respuestas.push("No respondió esta pregunta");
        } else {
            respuestas.push(respuesta.trim());
        }
    }

    const contenedorResultado = document.getElementById('resultado-preparacion');
    contenedorResultado.innerHTML = `
        <p class="mb-1"><strong>Horas de juego por semana:</strong> ${respuestas[0]}</p>
        <p class="mb-1"><strong>Modalidad preferida:</strong> ${respuestas[1]}</p>
        <p class="mb-0"><strong>Rol en el equipo:</strong> ${respuestas[2]}</p>
    `;
}