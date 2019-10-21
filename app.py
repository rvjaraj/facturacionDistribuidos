from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from Controlador.ControladorUsuario import Usuario, ControladorUsuario
from Controlador.ControladorProducto import Producto, ControladorProducto
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
        id = request.form['id']
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


############### productossssss    
@app.route("/vistaProductos")
def vistaCategoria():
    return render_template("vistaProducto.html")


if __name__ == '__main__':
    app.debug = True
    app.run(host='localhost', port=5001)


#modal
#toast