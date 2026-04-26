const form = document.getElementById('formulario');
const formResult = document.getElementById('formResult');

const fields = [
    { id: 'nombre', minLength: 3, label: 'Nombre' },
    { id: 'apellido', minLength: 3, label: 'Apellido' },
    { id: 'email', type: 'email', label: 'Correo electrónico' },
    { id: 'fecha de nacimiento', type: 'date', label: 'Fecha de nacimiento' },
    { id: 'contraseña', type: 'password', label: 'Contraseña' },
    { id: 'confirmar-contraseña', type: 'password', label: 'Confirmar contraseña' }
];

const regextexto=/^[a-zA-Z a-za-zñáéíóúÁÉÍÓÚÑ+]+$/;
const regexemail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    let Message = '';
    if (value === '') {
        isValid = false;
        Message= 'CAMPO OBLIGATORIO';
    }
    else{
        switch (id) {
            case 'nombre':
            case 'apellido':
                if (value.length < 3) {
                    isValid = false;
                    Message= `EL ${input.previousElementSibling.textContent} DEBE TENER AL MENOS 3 CARACTERES`;
                }
                else if (!regextexto.test(value)) {
                    isValid = false;
                    Message= `EL ${input.previousElementSibling.textContent} SOLO PUEDE CONTENER LETRAS.`;
                }
                break;
            case 'email':
                if (!regexemail.test(value)) {
                    isValid = false;
                    Message= 'EL CORREO ELECTRÓNICO NO ES VÁLIDO.';
                }
                else if((!value.toLowerCase().endsWith('@ucasal.edu.ar'))){
                    isValid = false;
                    Message= 'EL CORREO ELECTRÓNICO DEBE SER INSTITUCIONAL (@ucasal.edu.ar).';
                }
                break;                  
            case 'fecha de nacimiento':
                const today = new Date();
                const birthDate = new Date(value);
                if (birthDate > today) {
                    isValid = false;
                    Message= 'LA FECHA DE NACIMIENTO NO PUEDE SER FUTURA.';
                }
                else if (today.getFullYear() - birthDate.getFullYear() < 18) {
                    isValid = false;
                    Message= 'DEBES SER MAYOR DE 18 AÑOS.';
                }
                else if (today.getFullYear() - birthDate.getFullYear() === 18) {
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    const dayDiff = today.getDate() - birthDate.getDate();
                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                        isValid = false;
                        Message= 'DEBES SER MAYOR DE 18 AÑOS.';
                    }
                }
                else if (today.getFullYear() - birthDate.getFullYear() > 40) {
                    isValid = false;
                    Message= 'LA EDAD MÁXIMA PERMITIDA ES DE 40 AÑOS.';
                }
                break;
                
            case 'confirmar-contraseña':
                const passwordValue = document.getElementById('contraseña').value.trim();
                if (value !== passwordValue) {
                    isValid = false;
                    Message= 'LAS CONTRASEÑAS NO COINCIDEN.';
                }
                break;
            
        }
    }
    if (isValid) {
        clearError(input);
    } else {
        setError(input, Message);
    }
    return isValid;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Validamos todos y guardamos el resultado
    let allValid = true;
    fields.forEach(field => {
        if (!validateField(field.id)) {
            allValid = false;
        }
    });

    if (!formResult) return;

    if (allValid) {
        formResult.className = 'alert alert-success mt-3';
        formResult.textContent = '¡FORMULARIO ENVIADO CON ÉXITO!';
        form.reset();
        fields.forEach(f => document.getElementById(f.id).classList.remove('is-valid'));
    } else {
        formResult.className = 'alert alert-danger mt-3';
        formResult.textContent = 'POR FAVOR, CORRIGE LOS ERRORES.';
    }
});