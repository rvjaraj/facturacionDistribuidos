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
                    "<a class='btn btn-secondary' data-toggle='modal' onclick='cargarDatosCLiente(" + res[0] + ")' data-target='#exampleModalLong'>EDITAR</a>" +
                    "<a href='/eliminar/" + res[0] + "' onclick='confirmarEliminacion(\'USUARIO\',event)' >ELIMINAR</a> </td>" +
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

function cargarDatosCLiente(id) {
    $.ajax({
        url: "/buscarCliente",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            document.getElementById('idE').value = response[0]

            document.getElementById('cedulaE').value = response[1]
            $('#cedulaE').addClass('is-valid');

            document.getElementById('nombresE').value = response[2]
            $('#nombresE').addClass('is-valid');

            document.getElementById('apellidosE').value = response[3]
            $('#apellidosE').addClass('is-valid');

            document.getElementById('telefonoE').value = response[4]
            $('#telefonoE').addClass('is-valid');

            document.getElementById('direccionE').value = response[5]
            $('#direccionE').addClass('is-valid');

            document.getElementById('correoE').value = response[6]
            $('#correoE').addClass('is-valid');

            document.getElementById('fechaNacE').value = response[7]
            $('#fechaNacE').addClass('is-valid');

        },
        error: function(error) {
            console.log(error);
        }
    });
}

function acturalizarCliente() {
    $.ajax({
        url: "/actualizarCliente",
        data: {
            'id': document.getElementById('idE').value,
            'cedula': document.getElementById('cedulaE').value,
            'nombres': document.getElementById('nombresE').value,
            'apellidos': document.getElementById('apellidosE').value,
            'telefono': document.getElementById('telefonoE').value,
            'direccion': document.getElementById('direccionE').value,
            'correo': document.getElementById('correoE').value,
            'fechaNac': document.getElementById('fechaNacE').value
        },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response == "true") {
                $("#exampleModalLong").modal('hide');
                $.toast({
                    title: 'ACTUALIZADO',
                    subtitle: '',
                    content: 'CLIENTE ACTUALIZADO CORRECTAMETE',
                    type: 'success',
                    delay: 9000
                });
                location.reload()
            } else {

            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function cargarBusquedaProducto() {
    var why = $('#buscarProducto').val();
    $.ajax({
        url: "/buscarProducto",
        data: { 'dat': why },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            var resul = ""
            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                resul = resul + "<tr> " +
                    " <td>" + res[0] + "</td>" +
                    " <td>" + res[4] + "</td>" +
                    " <td>" + res[1] + "</td>" +
                    " <td>" + res[2] + "</td>" +
                    " <td>" + res[3] + "</td>" +
                    " <td>" + res[5] + "</td>" +
                    " <td> " +
                    "<a class='btn btn-secondary' data-toggle='modal' onclick='cargarDatosProductos('" + res[0] + "')' data-target='#exampleModalLong'>EDITAR</a>" +
                    "<a href='/eliminarProducto/" + res[0] + "' onclick=\"confirmarEliminacion(\'PRODUCTO\',event)\" class='btn btn-danger btn-delete'>ELIMINAR</a>" +
                    "</tr>"
            }

            $("#filas").html(resul);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function cargarDatosProductos(id) {
    $.ajax({
        url: "/buscarProductoId",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            document.getElementById('idE').value = response[0]

            document.getElementById('nombreE').value = response[1]
            $('#nombreE').addClass('is-valid');

            document.getElementById('codigoE').value = response[4]
            $('#codigoE').addClass('is-valid');

            document.getElementById('precioE').value = response[2]
            $('#precioE').addClass('is-valid');

            document.getElementById('stockE').value = response[3]
            $('#stockE').addClass('is-valid');

            document.getElementById('descuentoE').value = response[5]
            $('#descuentoE').addClass('is-valid');

        },
        error: function(error) {
            console.log(error);
        }
    });
}