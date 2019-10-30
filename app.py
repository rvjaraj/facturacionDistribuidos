from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from Controlador.ControladorUsuario import Usuario, ControladorUsuario
from Controlador.ControladorProducto import Producto, ControladorProducto
from Controlador.ControladorFactura import Factura, ControladorFactura
from Controlador.ControladorDetalle import Detalle, ControladorDetalle
import json
app = Flask(__name__)

# MENSAJES
app.secret_key = "mysecretkey"
@app.route("/")
def Index():
    return render_template("principal.html")


@app.route("/vistaCliente")
def vistaCliente():
    con = ControladorUsuario()
    data = con.listar()
    return render_template("vistaCliente.html", usuaarios=data)


@app.route("/buscarClientes", methods=['POST'])
def buscaClientes():
    if request.method == 'POST':
        cedula = request.form['cedula']
        con = ControladorUsuario()
        data = con.listarBusca(cedula)
        return json.dumps(data)


@app.route("/buscarCliente", methods=['POST'])
def buscaCliente():
    if request.method == 'POST':
        id = request.form['idd']
        con = ControladorUsuario()
        data = con.buscarUsuario(id)
        return json.dumps(data)


@app.route("/addUsuario", methods=['POST'])
def vistaUsuario():
    if request.method == 'POST':
        id = 0
        cedula = request.form['cedula']
        nombre = request.form['nombres']
        apellido = request.form['apellidos']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        correo = request.form['correo']
        fechaNac = request.form['fechaNac']
        eliminado = "0"
        usr = Usuario(id, cedula, nombre, apellido, telefono,
                      direccion,  correo, fechaNac, eliminado)
        con = ControladorUsuario()
        if(con.ingresar(usr)):
            flash('USUARIO AGREGADO EXITOSAMENTE')
        else:
            flash('ERROR AL AGREGAR USUARIO')
        return redirect(url_for('vistaCliente'))


@app.route('/eliminar/<string:id>')
def eliminarUsuario(id):
    con = ControladorUsuario()
    if(con.eliminar(id)):
        flash('USUARIO ELIMINADO EXITOSAMENTE')
    else:
        flash('ERROR AL ELIMINAR USUARIO')
    return redirect(url_for('vistaCliente'))


@app.route('/editar/<id>', methods=['POST', 'GET'])
def getUsuario(id):
    con = ControladorUsuario()
    data = con.buscarUsuario(id)
    return render_template('editCliente.html', usr=data)


@app.route('/actualizarCliente', methods=['POST'])
def actualizarUsuario():
    if request.method == 'POST':
        idd = request.form['id']
        cedula = request.form['cedula']
        nombre = request.form['nombres']
        apellido = request.form['apellidos']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        correo = request.form['correo']
        fechaNac = request.form['fechaNac']
        eliminado = "0"
        usr = Usuario(idd, cedula, nombre, apellido, telefono,
                      direccion,  correo, fechaNac, eliminado)
        con = ControladorUsuario()
        if(con.actualizar(usr)):
            flash('USUARIO ACTUALIZADO EXITOSAMENTE')
            return json.dumps('true')
        else:
            return json.dumps('false')


# productossssss
@app.route("/vistaProductos")
def vistaProductos():
    con = ControladorProducto()
    data = con.listar()
    return render_template("vistaProducto.html", productos=data)


@app.route("/addProducto", methods=['POST'])
def addProducto():
    if request.method == 'POST':
        id = 0
        codigo = request.form['codigo']
        nombre = request.form['nombre']
        precio = request.form['precio']
        stock = request.form['stock']
        descuento = request.form['descuento']
        pro = Producto(id, nombre, precio, stock, codigo, descuento, "0")
        con = ControladorProducto()
        if(con.ingresar(pro)):
            flash('PRODUCTO AGREGADO EXITOSAMENTE')
        else:
            flash('ERROR AL AGREGAR PRODUCTO')
        return redirect(url_for('vistaProductos'))


@app.route('/eliminarProducto/<string:id>')
def eliminarProducto(id):
    con = ControladorProducto()
    if(con.eliminar(id)):
        flash('PRODUCTO ELIMINADO EXITOSAMENTE')
    else:
        flash('ERROR AL ELIMINAR PRODUCTO')
    return redirect(url_for('vistaProductos'))


@app.route("/buscarProducto", methods=['POST'])
def buscarProducto():
    if request.method == 'POST':
        txt = request.form['dat']
        con = ControladorProducto()
        data = con.listarBusca(txt)
        print(data)
        return json.dumps(data)


@app.route("/buscarProductoId", methods=['POST'])
def buscarProductoId():
    if request.method == 'POST':
        txt = request.form['id']
        con = ControladorProducto()
        data = con.buscarProducto(txt)
        return json.dumps(data)


@app.route('/actualizarProducto', methods=['POST'])
def actualizarProducto():
    if request.method == 'POST':
        idd = request.form['idE']
        codigo = request.form['codigoE']
        nombre = request.form['nombreE']
        precio = request.form['precioE']
        stock = request.form['stockE']
        descuento = request.form['descuentoE']
        pro = Producto(idd, nombre, precio, stock, codigo, descuento, "0")
        con = ControladorProducto()
        if(con.actualizar(pro)):
            flash('PRODUCTO ACTUALIZADO EXITOSAMENTE')
        else:
            flash('ERROR AL ACTUALIZADO PRODUCTO')
        return redirect(url_for('vistaProductos'))

#Controlador Factura
@app.route("/vistaFactura")
def vistaFactura():
    return render_template("vistaFactura.html")


@app.route("/addFactura", methods=['POST'])
def addFactura():
     if request.method == 'POST':
        id = 0
        usuario = request.form['cliente']
        fecha = request.form['fecha']
        total = request.form['total']
        iva = request.form['iva']
        subtotal = request.form['subtotal']
        descuento = 0
        eliminado = 0
        fac = Factura(id, subtotal, iva, total, fecha, descuento, usuario, eliminado)
        con = ControladorFactura()
        if(con.ingresar(fac)):
            res = con.ultimaFactura()
            return json.dumps(res)
        else:
            return json.dumps("")
            #flash('ERROR AL ACTUALIZADO PRODUCTO')

@app.route("/addDetalle", methods=['POST'])
def addDetalle():
     if request.method == 'POST':
        id = 0
        producto = request.form['producto']
        cantidad = request.form['cantidad']
        subtotal = request.form['subtotal']
        factura = request.form['factura']

        det = Detalle(id, cantidad, subtotal, producto, factura)
        con = ControladorDetalle()
        if(con.ingresar(det)):
            
            return json.dumps("true")
        else:
            return json.dumps("")     

@app.route("/buscarCedula", methods=['POST'])
def buscarProductoCedula():
    if request.method == 'POST':
        txt = request.form['cedula']
        con = ControladorUsuario()
        data = con.buscarCedula(txt)
        return json.dumps(data)

@app.route("/addFactruaUsuario", methods=['POST'])
def addFactruaUsuario():
    if request.method == 'POST':
        id = 0
        cedula = request.form['cedula']
        nombre = request.form['nombres']
        apellido = request.form['apellidos']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        correo = request.form['correo']
        fechaNac = request.form['fechaNac']
        eliminado = "0"
        usr = Usuario(id, cedula, nombre, apellido, telefono,
                      direccion,  correo, fechaNac, eliminado)
        con = ControladorUsuario()
        if(con.ingresar(usr)):
            return json.dumps("true")
        else:
            flash('ERROR AL AGREGAR USUARIO')
            return json.dumps("false")

if __name__ == '__main__':
    app.debug = True
    app.run(host='localhost', port=5001)

# modal
# dat
# toast
#owerflow x y 
