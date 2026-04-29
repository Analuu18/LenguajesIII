
// Función auxiliar para pedir datos al usuario
function pedirArray() {
    const n = parseInt(prompt("¿Cuántos elementos quieres ingresar?"));
    if (isNaN(n) || n <= 0) return [];
    
    let tempArray = [];
    for (let i = 0; i < n; i++) {
        let dato = prompt(`Ingresa el elemento ${i + 1}:`);
        tempArray.push(dato);
    }
    return tempArray;
}

// 1. Filtrar pares
function ejecutarPares() {
    const datos = pedirArray();
    const pares = datos.filter(num => Number(num) % 2 === 0);
    document.getElementById('res-pares').innerHTML = 
        `<span class="resultado">Pares encontrados: ${pares.join(', ')}</span>`;
}

// 2. Eliminar duplicados
function ejecutarDuplicados() {
    const datos = pedirArray();
    // Set elimina duplicados automáticamente
    const unicos = [...new Set(datos)];
    document.getElementById('res-duplicados').innerHTML = 
        `<span class="resultado">Valores únicos: ${unicos.join(', ')}</span>`;
}

// 3. Ordenar nombres
function ejecutarOrdenar() {
    const datos = pedirArray();
    datos.sort(); // Ordena alfabéticamente
    document.getElementById('res-ordenar').innerHTML = 
        `<span class="resultado">Lista ordenada: ${datos.join(' - ')}</span>`;
}

// 4. Sumar elementos
function ejecutarSuma() {
    const datos = pedirArray();
    // Reducimos el array sumando sus valores convertidos a números
    const total = datos.reduce((acc, curr) => acc + Number(curr), 0);
    document.getElementById('res-suma').innerHTML = 
        `<span class="resultado">La suma total es: ${total}</span>`;
}

// 5. Buscar elemento
function ejecutarBusqueda() {
    const datos = pedirArray();
    const objetivo = prompt("¿Qué nombre deseas buscar?");
    const indice = datos.indexOf(objetivo);
    
    let mensaje = indice !== -1 
        ? `El elemento está en el índice: ${indice}` 
        : "El elemento no se encuentra (-1)";
        
    document.getElementById('res-busqueda').innerHTML = 
        `<span class="resultado">${mensaje}</span>`;
}
// 1. Crear una lista dinámica
function generarLista() {
    const nombres = ["Ana", "Beto", "Carla", "David"];
    const ul = document.getElementById("lista-nombres");
    ul.innerHTML = ""; // Limpiamos la lista antes de empezar

    nombres.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = nombre;
        ul.appendChild(li);
    });
}

// 2. Modificar contenido por ID
function cambiarTexto(id, nuevoTexto) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = nuevoTexto;
    }
}

// 3. Agregar y quitar clases
function alternarClase() {
    const caja = document.getElementById("caja-color");
    // Esto agrega o quita la propiedad de fondo azul
    if (caja.style.backgroundColor === "blue") {
        caja.style.backgroundColor = "transparent";
        caja.style.color = "black";
    } else {
        caja.style.backgroundColor = "blue";
        caja.style.color = "white";
    }
}

// 4. Formulario dinámico
let datosFormulario = [];
function guardarYMostrar() {
    const input = document.getElementById("input-dato");
    const valor = input.value;

    if (valor.trim() !== "") {
        datosFormulario.push(valor); // Guardamos en el array
        document.getElementById("res-formulario").innerHTML = 
            `<strong>Array actual:</strong> [${datosFormulario.join(", ")}]`;
        input.value = ""; // Limpiamos el input
    }
}

// 5. Generación de tarjetas
function generarTarjetas() {
    const productos = [
        { nombre: "Laptop", precio: "$800", img: "https://media.istockphoto.com/id/1394988455/es/foto/port%C3%A1til-con-pantalla-en-blanco-sobre-fondo-blanco.jpg?s=2048x2048&w=is&k=20&c=Mw1-pF7aAe5Y4KK4VdlVoLehx5y-0gQAMNfNlwoJ6Qc=" },
        { nombre: "Mouse", precio: "$20", img: "https://media.istockphoto.com/id/1458492520/es/foto/rat%C3%B3n-de-ordenador-inal%C3%A1mbrico-negro-aislado-sobre-fondo-blanco.jpg?s=2048x2048&w=is&k=20&c=FKgtxd2SuIWYNPKFJpFoVGWHCj9khG0EpYjuSdmfBQU=" },
        { nombre: "Teclado", precio: "$50", img: "https://media.istockphoto.com/id/1422478091/es/foto/primer-plano-de-las-manos-en-el-teclado-de-una-computadora-port%C3%A1til.jpg?s=612x612&w=0&k=20&c=Tk5-CsgsGWbibzK4Q1vnzPJoBuETWXpghmtdPNxqBQw=" }
    ];
    
    const contenedor = document.getElementById("contenedor-tarjetas");
    contenedor.innerHTML = ""; // Limpiar

    productos.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.style = "border: 1px solid #ccc; padding: 10px; border-radius: 5px; text-align: center;";
        
        tarjeta.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <p><strong>${prod.nombre}</strong></p>
            <p>${prod.precio}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}
