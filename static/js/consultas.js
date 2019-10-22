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
                    "<a class=\'btn btn-danger btn-delete\' href='/eliminar/" + res[0] + "' onclick=\"confirmarEliminacion(\'USUARIO\',event)\" >ELIMINAR </a>" +
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
        data: { 'idd': id },
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
                    "<a class=\'btn btn-danger btn-delete\' href='/eliminarProducto/" + res[0] + "' onclick=\"confirmarEliminacion(\'PRODUCTO\',event)\" >ELIMINAR </a>" +
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


/**Factura */

function cargarCosumidorFinal() {
    $('#cedula').html("999999999")
    $('#nombre').html("CONSUMIDOR")
    $('#apellido').html("FINAL")
    $('#telefono').html("999999999")
    $('#direccion').html("*********")
    $('#correo').html("**********")
    $('#idU').html("FINAL")
}

function limpiarFactura() {
    $('#cedula').html("")
    $('#nombre').html("")
    $('#apellido').html("")
    $('#telefono').html("")
    $('#direccion').html("")
    $('#correo').html("")
    $('#buscar').val("")
    $('#idU').val("")
}

var lista = Array();
var listaPro = Array();

function cargarBusquedaLista() {
    lista.splice(0, lista.length);
    var why = $('#buscar').val();
    $.ajax({
        url: "/buscarClientes",
        data: { 'cedula': why },
        type: 'POST',
        dataType: 'json',
        success: function(response) {

            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                lista[index] = res[0] + "| " + res[1] + " " + res[2] + " " + res[3]

            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}



function cargarUsuarioFactura(id) {
    $.ajax({
        url: "/buscarCliente",
        data: { 'idd': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            $('#cedula').html(response[1])
            $('#nombre').html(response[2])
            $('#apellido').html(response[3])
            $('#telefono').html(response[4])
            $('#direccion').html(response[2])
            $('#correo').html(response[6])
            $('#idU').val(response[0])

        },
        error: function(error) {
            console.log(error);
        }
    });
}

$('#buscar').autocomplete({
    source: lista,
    select: function(event, ui) {
        $("#buscar").val(ui.item.value)
        txt = $("#buscar").val()
        res = txt.split("|")
        cargarUsuarioFactura(res + "")
    }
});

function cargarBusquedaProLista() {
    listaPro.splice(0, lista.length);
    var why = $('#buscarPro').val();
    $.ajax({
        url: "/buscarProducto",
        data: { 'dat': why },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                listaPro[index] = res[0] + "|  ID: " + res[0] + " NOM: " + res[1] + "  COD:" + res[4]

            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function cargarDetalle(id) {
    $.ajax({
        url: "/buscarProductoId",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            var htmlTags = '<tr id=' + response[0] + '>' +
                '<td>' + response[4] + '</td>' +
                '<td>' + "1" + '</td>' +
                '<td>' + response[1] + '</td>' +
                '<td>' + response[2] + '</td>' +
                '<td>' + response[2] + '</td>' +
                '</tr>';

            $('#tablaDetalle tbody').append(htmlTags);
            $("#buscarPro").val("")
            $('#idProd').val(response[0])

        },
        error: function(error) {
            console.log(error);
        }
    });
}

$('#buscarPro').autocomplete({
    source: listaPro,
    select: function(event, ui) {
        $("#buscarPro").val(ui.item.value)
        txt = $("#buscarPro").val()
        res = txt.split("|")
        cargarDetalle(res + "")
        $("#modalCantidad").modal('show')
        datos = cantidadExisten(res + "")


    }
});

function cantidadExisten(id) {
    var datos = Array()
    $.ajax({
        url: "/buscarProductoId",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            datos = [response[1], response[3]]
            $("#infoDet").html(" EL PRODUCTO: " + datos[0] + "<br> TIENE EN STOCK: " + datos[1] + "<br> Ingrese una  cantidad Menor")
        },
        error: function(error) {
            console.log(error);
        }
    });
    return datos
}

function validarCantidad() {
    cant = $("#stock").val()
    id = $('#idProd').val()
    $.ajax({
        url: "/buscarProductoId",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            var cantidad = response[3]
            if (cant <= cantidad) {
                idrow = $('#tablaDetalle tr:last').attr("id")
                fila = String($('#tablaDetalle').find("#" + idrow).html())
                fila1 = fila.split('<td>')
                for (let index = 0; index < fila1.length; index++) {
                    fila1[index] = fila1[index].replace("</td>", "");
                }
                fila1.shift();
                precioTotal = cant * fila1[3]
                precioTotal = precioTotal.toFixed(2)
                var htmlTags =
                    '<td>' + response[4] + '</td>' +
                    '<td>' + cant + '</td>' +
                    '<td>' + response[1] + '</td>' +
                    '<td>' + response[2] + '</td>' +
                    '<td>' + precioTotal + '</td>';
                $('#tablaDetalle').find("#" + idrow).html(htmlTags)
                $("#modalCantidad").modal('hide')
                calcularFactura()
            } else {
                errorMensaje("ERROR: DEBE SER UN NUMERO")
            }
        },
        error: function(error) {
            console.log(error);
        }
    });

}

function borrarFila() {
    idrow = $('#tablaDetalle tr:last').attr("id")
    $('#' + idrow).remove();
}

function calcularFactura() {
    var table = document.getElementById("tablaDetalle");
    for (var i = 0; i < table.rows.length; i++) {
        var row = "";
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            row += table.rows[i].cells[j].innerHTML;
            row += " | ";
        }
        alert(row);
    }
}