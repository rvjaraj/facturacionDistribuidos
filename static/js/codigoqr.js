var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 150,
    height: 150
});

function makeCode(elemet) {
    var elText = elemet
    qrcode.makeCode(elText.value);
}

function cargarBusquedaProQR(e, elemet) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();

        $.ajax({
            url: "/buscarProductoCodigo",
            data: { 'codigo': elemet.value },
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                datos = [response[1], response[3]]
                $("#infoDet").html(" EL PRODUCTO: " + datos[0] + "<br> TIENE EN STOCK: " + datos[1] + "<br> Ingrese una  cantidad Menor")
                $("#buscarProQR").val("")
                    //$('#idProd').val(id)
                $("#modalCantidad").modal('show')
                cantidadExisten(response[0] + "")

            },
            error: function(error) {
                console.log(error);
            }
        });



    }

}



function cargarFacturasL() {
    $.ajax({
        url: "/cargarFacturasL",
        dataType: 'json',
        success: function(response) {
            var resul = ""
            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                console.log(res);

                resul = resul + "<tr> " +
                    " <td>" + res[0] + "</td>" +
                    " <td>" + res[4] + "</td>" +
                    " <td>" + res[9] + "</td>" +
                    " <td>" + res[10] + " " + res[11] + "</td>" +
                    " <td>" + res[2] + "</td>" +
                    " <td>" + res[1] + "</td>" +
                    " <td>" + res[3] + "</td>" +
                    " <td> " +
                    "<a class='btn btn-secondary' data-toggle='modal' onclick='verDetalleL(" + res[0] + ")' >VER DETALLE</a></td>"
                "</tr>"

            }

            $("#filas").html(resul);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function verDetalleL(id) {
    $.ajax({
        url: "/cargarDetalleFactur",
        data: { 'id': id },
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            var resul = ""
            for (let index = 0; index < response.length; index++) {
                const res = response[index];
                console.log(res);

                resul = resul + "<tr> " +
                    " <td>" + res[0] + "</td>" +
                    " <td>" + res[1] + "</td>" +
                    " <td>" + "COD: " + res[12] + " NOM: " + res[9] + "</td>" +
                    " <td>" + res[6] + "%" + "</td>" +
                    " <td>" + res[5] + "</td>" +
                    " <td>" + res[7] + "</td>" +
                    " <td>" + res[3] + "</td>" +
                    "</tr>"

            }

            $("#filasDetalle").html(resul);
        },
        error: function(error) {
            console.log(error);
        }
    });
}



function generarPdf() {
    var pdf = new jsPDF();
    pdf.text(20, 20, "Factura");

    pdf.text(20, 20, "Mostrando una Tabla con JsPDF y el Plugin AutoTable");

    var columns = ["Id", "Nombre", "Email", "Pais"];
    var data = [
        [1, "Hola", "hola@gmail.com", "Mexico"],
        [2, "Hello", "hello@gmail.com", "Estados Unidos"],
        [3, "Otro", "otro@gmail.com", "Otro"]
    ];

    pdf.autoTable(columns, data, { margin: { top: 25 } });


    pdf.save("mipdf.pdf");

}