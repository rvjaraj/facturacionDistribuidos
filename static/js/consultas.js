function cargarBusqueda() {
    var why = $('#buscar').val();
    $.ajax({
        url: "/buscarClientes",
        data: { 'cedula': why },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            var resul = ""
            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                resul = resul + "<tr> " +
                    " <td>" + res[1] + "</td>" +
                    " <td>" + res[2] + "</td>" +
                    " <td>" + res[3] + "</td>" +
                    " <td>" + res[4] + "</td>" +
                    " <td>" + res[5] + "</td>" +
                    " <td>" + res[6] + "</td>" +
                    " <td>" + res[7] + "</td>" +
                    " <td> " +
                    "<a href='/editar/" + res[0] + "' class='btn btn-secondary'>EDITAR</a>" +
                    "<a href='/eliminar/" + res[0] + "' onclick=\"confirmarEliminacion(\"USUARIO\",event)\" class='btn btn-danger btn-delete'>ELIMINAR</a>" + "</td>" +
                    "</tr>"

            }

            $("#filas").html(resul);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function confirmarEliminacion(txt, event) {
    if (!confirm('ESTAS SEGURO DE ELIMINAR: ' + txt))
        event.preventDefault()
}