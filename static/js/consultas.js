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


function validarCedulaTxt(txt) {
    var cad = txt
    var total = 0;
    var longitud = cad.length;
    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longitud - 1; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }
        total = total % 10 ? 10 - total % 10 : 0;
        var aux = cad.charAt(9);
        if (cad.charAt(9) == total) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
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


var lista = Array();
var listaPro = Array();

function cargarDatosEnter(event) {
    if (event.keyCode == 13) {
        cedula = $('#buscar').val();
        if (validarCedulaTxt(cedula)) {
            $.ajax({
                url: "/buscarCedula",
                data: { 'cedula': cedula },
                type: 'POST',
                dataType: 'json',
                success: function(response) {
                    if (response != "") {
                        $('#cedula').html(response[1])
                        $('#nombre').html(response[2])
                        $('#apellido').html(response[3])
                        $('#telefono').html(response[4])
                        $('#direccion').html(response[2])
                        $('#correo').html(response[6])
                        $('#idU').val(response[0])
                        $('#buscar').autocomplete({ source: [] });
                    } else {
                        if (confirm("NO EXISTE CLIENTE, DESEA REGISTRAR")) {
                            $('#crearUsuario').modal('show');
                            $('#cedulaE').val(cedula);
                            $('#cedulaE').addClass('is-valid');
                        } else {

                        }
                    }

                },
                error: function(error) {
                    console.log(error);
                }
            });
        } else {
            alert('CEDULA INCORRECTA')
        }
    }
}

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
    listaPro.splice(0, listaPro.length);
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
            console.log(String(error));
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
                '<td>' + response[0] + '</td>' +
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
            //cargarDetalle(res + "")

        $("#modalCantidad").modal('show')
        cantidadExisten(res + "")

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
            $("#buscarPro").val("")
            $('#idProd').val(id)
        },
        error: function(error) {
            console.log(error);
        }
    });

}

function validarCantidaStock() {
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
                id = response[0]
                nombre = response[1]
                precio = response[2]
                stk = response[3]
                codigo = response[4]
                descueto = response[5]

                precioConDescuento = (precio - ((descueto * precio) / 100)).toFixed(2)
                iva = (parseFloat(precioConDescuento * 0.12)).toFixed(2)
                precioConIva = (parseFloat(iva) + parseFloat(precioConDescuento)).toFixed(2)

                precioTotalDetalle = ((parseFloat(precioConDescuento) * (cant))).toFixed(2);
                totalIva = parseFloat(iva * cant).toFixed(2)
                var htmlTags =
                    '<tr><td>' + id + '</td>' +
                    '<td>' + codigo + '</td>' +
                    '<td>' + cant + '</td>' +
                    '<td>' + nombre + '</td>' +
                    '<td><input  id=\'' + id + 'xx\' value=\'' + response[5] + '\' class="form-control"  style="width: 85px;" type="number" step="0.01" id="descuento" name="descuento" onkeydown="return soloDecimales(event, this)"  onkeyup="validarDecimalesF(this,' + id + ')"></td>' +
                    '<td>' + totalIva + '</td>' +
                    '<td>' + precioConDescuento + '</td>' +
                    '<td>' + precioTotalDetalle + '</td></tr>';
                $('#tablaDetalle tbody').append(htmlTags);
                $("#modalCantidad").modal('hide')
                calcularFactura()
            } else {
                errorMensaje("ERROR: DEBE SER UN NUMERO MENOR")
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
    var id = parseFloat(0);
    var subtotal = parseFloat(0);
    var total = parseFloat(0);
    var totalIva = parseFloat(0);
    for (var i = 1; i < table.rows.length; i++) {
        iva = table.rows[i].cells[5].innerHTML
        totalIva = (parseFloat(totalIva) + parseFloat(iva))
        subtotal = subtotal + parseFloat(table.rows[i].cells[7].innerHTML)
    }
    total = subtotal + totalIva

    $("#total").html(total.toFixed(2))
    $("#iva").html(totalIva.toFixed(2))
    $("#subtotal").html(subtotal.toFixed(2))
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
    $("#tablaDetalle tr").remove();

}

function guardarFactura() {
    var table = document.getElementById("tablaDetalle");
    idCliente = $('#idU').val()
    if (idCliente != "") {
        if (table.rows.length >= 2) {
            fecha = $('#fecha').html()
            total = $("#total").html()
            iva = $("#iva").html()
            subtotal = $("#subtotal").html()
            $.ajax({
                url: "/addFactura",
                data: {
                    'cliente': idCliente,
                    'fecha': fecha,
                    'total': total,
                    'iva': iva,
                    'subtotal': subtotal
                },
                type: 'POST',
                dataType: 'json',
                success: function(response) {

                    if (response != "") {
                        var table = document.getElementById("tablaDetalle");
                        for (var i = 1; i < table.rows.length; i++) {
                            var row = Array();
                            for (var j = 0; j < table.rows[i].cells.length; j++) {
                                res = table.rows[i].cells[j].innerHTML;
                                row[j] = res
                            }
                            ele = row[4].substr(row[4].search("id"), 7)
                            ele = ele.split("\"")
                            ele = ele[1].replace("x", "")
                            $.ajax({
                                url: "/addDetalle",
                                data: {
                                    "producto": row[0],
                                    "cantidad": row[2],
                                    "subtotal": row[7],
                                    "descuento": $("#" + ele + "xx").val(),
                                    "iva": row[5],
                                    "precio": row[6],
                                    "factura": response[0][0]
                                },
                                type: 'POST',
                                dataType: 'json',
                                success: function(response) {
                                    console.log(response)

                                },
                                error: function(error) {
                                    console.log(error);
                                }
                            });

                        }
                        alert("FACTURA INGRESADA")
                            //generarPdf()
                        location.reload();
                    } else {
                        console.log("errorr ");
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        } else {
            alert("INGRESE PRODUCTOS")
        }
    } else {
        alert("INGRESE CLIENTE")
    }
}

function crearFacCliente() {
    $.ajax({
        url: "/addFactruaUsuario",
        data: {
            'id': document.getElementById('idE').value,
            'cedula': document.getElementById('cedulaE').value,
            'nombres': document.getElementById('nombresE').value,
            'apellidos': document.getElementById('apellidosE').value,
            'telefono': "9999999999",
            'direccion': document.getElementById('direccionE').value,
            'correo': document.getElementById('correoE').value,
            'fechaNac': document.getElementById('fechaNacE').value
        },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            console.log(response);
            $('#crearUsuario').modal('hide');
        },
        error: function(error) {
            console.log(error);
        }
    });
}