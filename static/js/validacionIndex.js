function validarCedula() {
    var cad = document.getElementById("cedula").value;
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
            document.getElementById("chCedula").checked = true;
        } else {
            document.getElementById("chCedula").checked = false;
        }

    } else {
        document.getElementById("chCedula").checked = false;
    }
}

function soloNumeros(e, cad) {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48) && (key <= 57) && (cad.length + 1 <= 10) || (key == 8))
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

function dosNombres(txt, id) {
    palabras = txt.split(' ');
    if (palabras.length == 2) {
        p1 = palabras[0].trim();
        p2 = palabras[1].trim();
        if (p1 != '' && p2.length >= 3) {
            document.getElementById(id).checked = true;
        } else {
            document.getElementById(id).checked = false;
        }
    } else {
        document.getElementById(id).checked = false;
    }
}

function telefonoVal(txt, id) {
    if (txt.length >= 10) {
        document.getElementById(id).checked = true;
    } else {
        document.getElementById(id).checked = false;
    }
}

function validarFecha(fecha, id) {
    if (fecha.length == 10) {
        f = fecha.split('/');
        var Anio = f[2]
        var Mes = f[1] - 1
        var Dia = f[0]
        var VFecha = new Date(Anio, Mes, Dia);
        if ((VFecha.getFullYear() == Anio) && (VFecha.getMonth() == Mes) && (VFecha.getDate() == Dia)) {
            document.getElementById(id).checked = true;
        }
        else {
            document.getElementById(id).checked = false;
        }
    } else {
        document.getElementById(id).checked = false;
    }
}

function fecha10(txt, e) {
    var key = window.Event ? e.which : e.keyCode
    if (txt.length >= 10) {
        if (key != 8) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function valDir(txt, id) {
    if (txt.length >= 4) {
        document.getElementById(id).checked = true;
    } else {
        document.getElementById(id).checked = false;
    }
}

function validarCorreo(txt, id) {
    f = txt.split('@');
    if (f.length >= 2) {
        if (f[0].length >= 3) {
            if (f[1] == 'ups.edu.ec' || f[1] == 'est.ups.edu.ec') {
                document.getElementById(id).checked = true;
            } else {
                document.getElementById(id).checked = false;
            }
        } else {
            document.getElementById(id).checked = false;
        }
    } else {
        document.getElementById(id).checked = false;
    }
}

function validarContra(txt, id) {
    if (txt.length >= 3) {
        document.getElementById(id).checked = true;
    } else {
        document.getElementById(id).checked = false;
    }
}
function validarTodo() {
    var bandera = true;
    if (!document.getElementById('chCedula').checked) {
        var capa = document.getElementById('cedula');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pCed')
        cp1.innerHTML = ("Cedula Incorrecta, Debe ser una cedula Ecuatoria");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('cedula');
        capa.style.border = "2px solid  green";
        document.getElementById('pCed').innerHTML = ("");
        console.log('bien')
    }

    if (!document.getElementById('chNombre').checked) {
        var capa = document.getElementById('nombres');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pNom')
        cp1.innerHTML = ("Nombre Incorrecto, Debe ser dos nombres, Compruebe los espacios");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('nombres');
        capa.style.border = "2px solid  green";
        document.getElementById('pNom').innerHTML = ("");
    }

    if (!document.getElementById('chApellido').checked) {
        var capa = document.getElementById('apellidos');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pApe')
        cp1.innerHTML = ("Apellido Incorrecto, Debe ser dos apellidos, Compruebe los espacios");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('apellidos');
        capa.style.border = "2px solid  green";
        document.getElementById('pApe').innerHTML = ("");
    }

    if (!document.getElementById('chDireccion').checked) {
        var capa = document.getElementById('direccion');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pDir')
        cp1.innerHTML = ("Direccion Incorrecto, Como minimo debe tener 4 letras");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('direccion');
        capa.style.border = "2px solid  green";
        document.getElementById('pDir').innerHTML = ("");
    }

    if (!document.getElementById('chTelefono').checked) {
        var capa = document.getElementById('telefono');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pTel')
        cp1.innerHTML = ("Telefono Incorrecto, Como minimo debe tener 10 numeros");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('telefono');
        capa.style.border = "2px solid  green";
        document.getElementById('pTel').innerHTML = ("");
    }

    if (!document.getElementById('chFecha').checked) {
        var capa = document.getElementById('fechaNacimiento');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pFec')
        cp1.innerHTML = ("Fecha Incorrecto, El formato es 'dd/mm/aaa' Ejm: 10/25/1997");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('fechaNacimiento');
        capa.style.border = "2px solid  green";
        document.getElementById('pFec').innerHTML = ("");
    }

    if (!document.getElementById('chCorreo').checked) {
        var capa = document.getElementById('correo');
        var cp1 = document.getElementById('pCor')
        capa.style.border = "2px dotted  red";
        cp1.innerHTML = ("Correo Incorrecto, Ejemplos:  'abc@ups.edu.ec' o 'abc@est.ups.edu.ec'");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('correo');
        capa.style.border = "2px solid  green";
        document.getElementById('pCor').innerHTML = ("");
    }

    if (!document.getElementById('chContrasena').checked) {
        var capa = document.getElementById('contrasena');
        capa.style.border = "2px dotted  red";
        var cp1 = document.getElementById('pPas')
        cp1.innerHTML = ("Contraseña Incorrecta, Debe contar minimo 3 caracteres");
        cp1.style.fontSize = '10px';
        bandera = false;
    } else {
        var capa = document.getElementById('contrasena');
        capa.style.border = "2px solid  green";
        document.getElementById('pPas').innerHTML = ("");
    }

    return bandera;
}