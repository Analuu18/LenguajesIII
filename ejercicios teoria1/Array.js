
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