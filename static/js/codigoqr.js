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