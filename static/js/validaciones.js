function validarCedula(element) {
    var cad = element.value;
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
            $('#' + element.id).removeClass('is-invalid');
            $('#' + element.id).addClass('is-valid');
        } else {
            $('#' + element.id).removeClass('is-valid');
            $('#' + element.id).addClass('is-invalid');
        }
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}



function validarLetras(element) {
    txt = $('#' + element.id).val()
    if (txt.length >= 3) {
        $('#' + element.id).removeClass('is-invalid');
        $('#' + element.id).addClass('is-valid');
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}

function validarCantidad(element, cant) {
    txt = $('#' + element.id).val()
    if (txt.length == cant) {
        $('#' + element.id).removeClass('is-invalid');
        $('#' + element.id).addClass('is-valid');
        return false
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}

function soloNumeros(event, element) {
    if (event.shiftKey)
        return false

    if (event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39)
        if ($('#' + element.id).val().length >= 10)
            return false

        // Solo Numeros del 0 a 9 
    if (event.keyCode < 48 || event.keyCode > 57)
    //Solo Teclado Numerico 0 a 9
        if (event.keyCode < 96 || event.keyCode > 105)
        /*  
            No permite ingresar pulsaciones a menos que sean los siguietes
            KeyCode Permitidos
            keycode 8 Retroceso
            keycode 37 Flecha Derecha
            keycode 39  Flecha Izquierda
            keycode 46 Suprimir
        */
            if (event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39)
            return false
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function validarFecha(element) {
    hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    fecha = $("#" + element.id).val()

    if ((new Date(fecha).getTime() < new Date(hoy).getTime())) {
        $('#' + element.id).removeClass('is-invalid');
        $('#' + element.id).addClass('is-valid');
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}


function validarCorreo(element) {
    txt = $('#' + element.id).val()
    f = txt.split('@');
    if (f.length >= 2) {
        if (f[0].length >= 2) {
            punto = f[1].split('.')
            if (punto.length >= 2) {
                if (punto[1].length >= 2) {
                    $('#' + element.id).removeClass('is-invalid');
                    $('#' + element.id).addClass('is-valid');
                }
            }
        } else {
            $('#' + element.id).removeClass('is-valid');
            $('#' + element.id).addClass('is-invalid');
        }
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}

function validarIngresoCliente() {
    cont = 0;
    if ($("#fechaNac").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensaje("SELECCIONE UN FECHA VALIDA")
    }

    if ($("#correo").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensaje("CORREO INCORRECTO")
    }

    if ($("#telefono").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensaje("TELEFONO INCORRECTO")
    }

    if ($("#direccion").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensaje("DIRECCION INCORRECTO")
    }

    if ($("#apellidos").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensaje("APELLIDO INCORRECTO")
    }

    if ($("#nombres").hasClass("is-valid")) {
        cont++ //6
    } else {
        errorMensaje("NOMBRE INCORRECTO")
    }

    if ($("#cedula").hasClass("is-valid")) {
        cont++ //7
    } else {
        errorMensaje("CEDULA INCORRECTA")
    }
    if (cont == 7)
        return true
    else
        return false
}

function errorMensaje(menseje) {
    html = "<br><div id='alertError' class='alert alert-danger alert-dismissible fade show' role='alert'>" +
        menseje + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button></div>"
    $("#alertError").html(html);
}

function validarEditarCliente() {
    cont = 0;
    if ($("#fechaNacE").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensajeE("SELECCIONE UN FECHA VALIDA")
    }

    if ($("#correoE").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensajeE("CORREO INCORRECTO")
    }

    if ($("#telefonoE").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensajeE("TELEFONO INCORRECTO")
    }


    if ($("#direccionE").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensajeE("DIRECCION INCORRECTO")
    }

    if ($("#apellidosE").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensajeE("APELLIDO INCORRECTO")
    }

    if ($("#nombresE").hasClass("is-valid")) {
        cont++ //6
    } else {
        errorMensajeE("NOMBRE INCORRECTO")
    }

    if ($("#cedulaE").hasClass("is-valid")) {
        cont++ //7
    } else {
        errorMensajeE("CEDULA INCORRECTA")
    }
    if (cont == 7) {
        acturalizarCliente()
        return true
    } else {
        return false
    }

}


function validarFactruaCliente() {
    cont = 0;
    if ($("#fechaNacE").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensajeE("SELECCIONE UN FECHA VALIDA")
    }

    if ($("#correoE").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensajeE("CORREO INCORRECTO")
    }

    if ($("#telefonoE").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensajeE("TELEFONO INCORRECTO")
    }


    if ($("#direccionE").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensajeE("DIRECCION INCORRECTO")
    }

    if ($("#apellidosE").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensajeE("APELLIDO INCORRECTO")
    }

    if ($("#nombresE").hasClass("is-valid")) {
        cont++ //6
    } else {
        errorMensajeE("NOMBRE INCORRECTO")
    }

    if ($("#cedulaE").hasClass("is-valid")) {
        cont++ //7
    } else {
        errorMensajeE("CEDULA INCORRECTA")
    }
    if (cont == 7) {
        crearFacCliente()
        return true
    } else {
        return false
    }

}

function errorMensajeE(menseje) {
    html = "<br><div id='alertError' class='alert alert-danger alert-dismissible fade show' role='alert'>" +
        menseje + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button></div>"
    $("#alertErrorE").html(html);
}

//** validaciones del producto*/

function soloDecimales(event, element) {
    txt = $('#' + element.id).val()

    if (event.shiftKey)
        return false
    if (event.keyCode == 190 && txt != "" || event.keyCode == 110 && txt != "") {
        if (txt.indexOf(".") > 0) {
            return false
        } else {
            return true

        }
    }

    if (event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39)
        if ($('#' + element.id).val().length >= 5)
            return false

    if (event.keyCode < 48 || event.keyCode > 57)
        if (event.keyCode < 96 || event.keyCode > 105)
            if (event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39)
                return false

}

function validarDecimales(element) {
    txt = $('#' + element.id).val()
    if (txt != "") {
        var RE = /^\d*(\.\d{1})?\d{0,1}$/;
        if (RE.test(txt)) {
            $('#' + element.id).removeClass('is-invalid');
            $('#' + element.id).addClass('is-valid');
        } else {
            $('#' + element.id).removeClass('is-valid');
            $('#' + element.id).addClass('is-invalid');
        }
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }

    if (Number(txt) > 100 && element.id == "descuento") {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}

function validarDecimalesF(element, id) {
    txt = $('#' + element.id).val()
    if (txt != "") {
        var RE = /^\d*(\.\d{1})?\d{0,1}$/;
        if (RE.test(txt)) {
            $('#' + element.id).removeClass('is-invalid');
            $('#' + element.id).addClass('is-valid');
        } else {
            $('#' + element.id).removeClass('is-valid');
            $('#' + element.id).addClass('is-invalid');
        }
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }

    if (Number(txt) > 100 && element.id == "descuento") {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }

    if ($('#' + element.id).hasClass("is-valid")) {
        var table = document.getElementById("tablaDetalle");
        var index = 0
        for (var i = 1; i < table.rows.length; i++) {
            var row = Array();
            res = table.rows[i].cells[0].innerHTML;
            cantidad = table.rows[i].cells[2].innerHTML;
            index = i
            if (res == id) {
                $.ajax({
                    url: "/buscarProductoId",
                    data: { 'id': id },
                    type: 'POST',
                    dataType: 'json',
                    success: function(response) {
                        precio = parseFloat(response[2])

                        precioConDescuento = (precio - ((parseFloat(txt) * precio) / 100)).toFixed(2)
                        iva = (parseFloat(precioConDescuento * 0.12)).toFixed(2)
                        precioConIva = (parseFloat(iva) + parseFloat(precioConDescuento)).toFixed(2)

                        precioTotalDetalle = ((parseFloat(precioConDescuento) * (cant))).toFixed(2);
                        totalIva = parseFloat(iva * cant).toFixed(2)

                        document.getElementById("tablaDetalle").rows[index].cells[5].innerText = String(totalIva) + ""
                        document.getElementById("tablaDetalle").rows[index].cells[6].innerText = String(precioConDescuento) + ""
                        document.getElementById("tablaDetalle").rows[index].cells[7].innerText = String(precioTotalDetalle) + ""
                        calcularFactura()
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });

            } else {
                alert(id)
            }
        }

    } else {
        $.toast({
            title: 'DESCUENTO',
            subtitle: '',
            content: 'ERROR CALCULAR DESCUENTO',
            type: 'error',
            delay: 9000
        });
    }
}


function validarStock(element) {
    txt = $('#' + element.id).val()
    if (txt.length >= 1) {
        $('#' + element.id).removeClass('is-invalid');
        $('#' + element.id).addClass('is-valid');
        return false
    } else {
        $('#' + element.id).removeClass('is-valid');
        $('#' + element.id).addClass('is-invalid');
    }
}

function validarIngresoProducto() {
    cont = 0;
    if ($("#descuento").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensaje("DESCUENTO INCORRECTO")
    }

    if ($("#stock").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensaje("STOCK INCORRECTO")
    }

    if ($("#precio").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensaje("PRECIO INCORRECTO")
    }

    if ($("#nombre").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensaje("NOMBRE INCORRECTO")
    }

    if ($("#codigo").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensaje("CODIGO INCORRECTO")
    }
    if (cont == 5) {
        acturalizarCliente()
        return true
    } else {
        return false
    }
}

function validarEditarProducto() {
    cont = 0;
    if ($("#descuentoE").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensajeE("DESCUENTO INCORRECTO")
    }

    if ($("#stockE").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensajeE("STOCK INCORRECTO")
    }

    if ($("#precioE").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensajeE("PRECIO INCORRECTO")
    }

    if ($("#nombreE").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensajeE("NOMBRE INCORRECTO")
    }

    if ($("#codigoE").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensajeE("CODIGO INCORRECTO")
    }
    if (cont == 5) {
        acturalizarCliente()
        return true
    } else {
        return false
    }
}