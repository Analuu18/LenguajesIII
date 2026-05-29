const form = document.getElementById('formulario');
const formResult = document.getElementById('formResult');
const errorResult = document.getElementById('errorResult');

// Expresiones regulares para luego validar
const fields = [
    {id: 'nombre-comp', regex: /^[a-zA-Z\s]+$/, minLength: 3},
    {id: 'DNI', regex: /^\d+$/, minLength: 8},
    {id: 'fecha-nac', regex: /^\d{4}-\d{2}-\d{2}$/}
];

function setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = message;
}

function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = '';
}

function validateField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    let isValid = true;
    let message = '';

    if (value === '') {
        isValid = false;
        message = 'CAMPO OBLIGATORIO';
    } else {
        switch (id) {
            case 'nombre-comp':
                if (!fields[0].regex.test(value) || value.length < fields[0].minLength) {
                    isValid = false;
                    message = 'EL NOMBRE DEBE CONTENER SOLO LETRAS Y ESPACIOS, Y TENER AL MENOS 3 CARACTERES';
                }
                break;
            case 'DNI':
                if (!fields[1].regex.test(value) || value.length < fields[1].minLength) {
                    isValid = false;
                    message = 'EL DNI DEBE CONTENER SOLO NÚMEROS Y TENER AL MENOS 8 CARACTERES';
                }
                break;
            case 'fecha-nac':
                if (!fields[2].regex.test(value)) {
                    isValid = false;
                    message = 'LA FECHA DE NACIMIENTO NO ES VÁLIDA';
                } else {
                    const today = new Date();
                    const birthDate = new Date(value);
                    if (birthDate > today) {
                        isValid = false;
                        message = 'LA FECHA DE NACIMIENTO NO PUEDE SER FUTURA.';
                    } else if (today.getFullYear() - birthDate.getFullYear() < 18 ||
                        (today.getFullYear() - birthDate.getFullYear() === 18 &&
                         today.getMonth() < birthDate.getMonth()) ||
                        (today.getFullYear() - birthDate.getFullYear() === 18 &&
                         today.getMonth() === birthDate.getMonth() &&
                         today.getDate() < birthDate.getDate())) {
                        isValid = false;
                        message = 'DEBES SER MAYOR DE 18 AÑOS.';
                    }
                }
                break;
        }
    }

    if (isValid) {
        clearError(input);
    } else {
        setError(input, message);
    }

    return isValid;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isFormValid = fields.every(campo => validateField(campo.id));

    if (isFormValid) {
        formResult.textContent = 'Formulario enviado correctamente';
        formResult.className = 'text-success mt-2 fw-bold';
    } else {
        formResult.textContent = 'Por favor, corrige los errores en el formulario';
        formResult.classList.remove('text-success');
        formResult.classList.add('text-danger');
    }
});

document.getElementById('btn-prog').addEventListener('click', ejecutarPreguntasProg);

function ejecutarPreguntasProg() {
    const preguntas = [
        '¿Cuál es tu nacionalidad?',
        '¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)',
        '¿Por qué elegiste esta carrera?'
    ];      

    const respuestas = [];

    for (let i = 0; i < preguntas.length; i++) {
        const respuesta = prompt(preguntas[i]);
        if (respuesta === null || respuesta.trim() === '') {
            respuestas.push('No respondió esta pregunta');
        } else {
            respuestas.push(respuesta.trim());
        }
    }

    const contenedorResultado = document.getElementById('Rtas');
    contenedorResultado.innerHTML = `
        <p class="mb-1"><strong>Nacionalidad:</strong> ${respuestas[0]}</p>
        <p class="mb-1"><strong>Nivel de programación:</strong> ${respuestas[1]}</p>
        <p class="mb-0"><strong>Motivo de elección:</strong> ${respuestas[2]}</p>
    `;
}
