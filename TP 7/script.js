const btnBuscar = document.getElementById('boton_buscador'); // Corregido el nombre
const inputBusqueda = document.getElementById('input_buscador');
const divResultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', () => {
    const valor = inputBusqueda.value.trim(); 
    
    if (valor === "") {
        divResultado.innerHTML = "Por favor, ingresá un nombre o un ID"; 
        return; 
    }

    buscarPersonaje(valor);
});

function buscarPersonaje(valor) {
    let url;

    if (!isNaN(valor)) {
        url = `https://rickandmortyapi.com/api/character/${valor}`; 
    } else {
        url = `https://rickandmortyapi.com/api/character/?name=${valor}`; 
    }


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Personaje no encontrado"); 
            }
            return response.json(); 
        })
        .then(data => {
            
            const personaje = data.results ? data.results[0] : data; 
            crearCard(personaje);   
        })
        .catch(error => {
            divResultado.innerHTML = `<p class="text-danger">${error.message}</p>`; 
        });
}

function crearCard(personaje) {
    let colorClase = "";

    switch (personaje.status) {
        case "Alive":
            colorClase = "border-success"; 
            break;
        case "Dead":
            colorClase = "border-danger"; 
            break;
        default:
            colorClase = "border-secondary"; 
    }

    divResultado.innerHTML = `
        <div class="card ${colorClase} border-3" style="width: 18rem;"> 
            <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}"> [cite: 34]
            <div class="card-body">
                <h5 class="card-title">${personaje.name}</h5> [cite: 35]
                <p class="card-text">
                    <b>Estado:</b> ${personaje.status}<br> [cite: 36]
                    <b>Especie:</b> ${personaje.species}<br> [cite: 37]
                    <b>Ubicación:</b> ${personaje.location.name} [cite: 38]
                </p>
            </div>
        </div>
    `; 
}
