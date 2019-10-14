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

function validarSeleccion(element) {
    txt = ($('#' + element.id + ' option:selected').text())
    if (txt != "SELECCIONE ROL") {
        $('#' + element.id).removeClass('is-invalid');
        $('#' + element.id).addClass('is-valid');
    } else {
        $('#' + element.id).addClass('is-valid');
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
    if ($("#rol").hasClass("is-valid")) {
        cont++ //1
    } else {
        errorMensaje("SELECCIONE UN ROL")
    }

    if ($("#contrasena").hasClass("is-valid")) {
        cont++ //2
    } else {
        errorMensaje("CONTRASEÑA INCORRECTO")
    }
    if ($("#correo").hasClass("is-valid")) {
        cont++ //3
    } else {
        errorMensaje("CORREO INCORRECTO")
    }

    if ($("#telefono").hasClass("is-valid")) {
        cont++ //4
    } else {
        errorMensaje("TELEFONO INCORRECTO")
    }

    if ($("#direccion").hasClass("is-valid")) {
        cont++ //5
    } else {
        errorMensaje("DIRECCION INCORRECTO")
    }

    if ($("#apellidos").hasClass("is-valid")) {
        cont++ //6
    } else {
        errorMensaje("APELLIDO INCORRECTO")
    }

    if ($("#nombres").hasClass("is-valid")) {
        cont++ //7
    } else {
        errorMensaje("NOMBRE INCORRECTO")
    }

    if ($("#cedula").hasClass("is-valid")) {
        cont++ //8
    } else {
        errorMensaje("CEDULA INCORRECTA")
    }
    if (cont == 8)
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