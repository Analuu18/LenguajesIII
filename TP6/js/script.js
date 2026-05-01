$(document).ready(function() {
    // Inicializar DataTable
    let tabla = $("#tablaTareas").DataTable();

    // Evento para agregar tarea
    $("#btnAgregar").click(function() {
        let tarea = $("#tareaInput").val().trim();
        let prioridad = $("input[name='prioridad']:checked").val();

        // Validación básica
        if (tarea === "") {
            alert("Ingrese nombre de la tarea.");
            return;
        }

        // Agregar a DataTable
        // Guardamos la referencia del nodo (la fila <tr>)
        let nuevaFilaNodo = tabla.row.add([
            tarea,
            prioridad,
            '<button class="btn btn-danger btn-sm eliminar">Eliminar</button>'
        ]).draw().node();

        // Efecto visual: Ocultar e iniciar fadeIn
        $(nuevaFilaNodo).hide().fadeIn(500);

        // Limpiar inputs
        $("#tareaInput").val("");
    });

    // Evento para eliminar (Delegado para que funcione en filas nuevas)
    $('#tablaTareas tbody').on('click', '.eliminar', function() {
        let fila = $(this).closest('tr');
        
        fila.fadeOut(500, function() {
            // Se elimina de DataTables después de la animación
            tabla.row(fila).remove().draw();
        });
    });

    // Cambio de estilo dinámico en el título
    $('#titulo').mouseenter(function() {
        $(this).css('color', 'red');
    }).mouseleave(function() {
        $(this).css('color', 'black');
    });
});