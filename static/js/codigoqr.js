var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 150,
    height: 150
});

function makeCode(elemet) {
    var elText = elemet

    qrcode.makeCode(elText.value);
}