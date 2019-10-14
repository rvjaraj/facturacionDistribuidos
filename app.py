from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from Controlador.ControladorUsuario import Usuario, Controlador
from Controlador import ControladorUsuario
import json
usr = Usuario
app = Flask(__name__)

# MENSAJES
app.secret_key = "mysecretkey"
@app.route("/")
def Index():

    return render_template("principal.html")


@app.route("/vistaCliente")
def vistaCliente():
    con = Controlador()
    data = con.listar()
    return render_template("vistaCliente.html", usuaarios=data)

@app.route("/buscarClientes", methods=['POST'])
def buscaCliente():
    if request.method == 'POST':
        cedula = request.form['cedula']
        con = Controlador()
        data = con.listarBusca(cedula)
        return json.dumps(data)
    flash('NO EXISTE EL USUARIO')

@app.route("/addUsuario", methods=['POST'])
def vistaUsuario():
    if request.method == 'POST':
        id = 0
        cedula = request.form['cedula']
        nombre = request.form['nombres']
        apellido = request.form['apellidos']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        rol = request.form['rol']
        correo = request.form['correo']
        contrasenia = request.form['contrasena']
        eliminado = "0"
        usr = Usuario(id, cedula, nombre, apellido, telefono,
                      direccion, rol, correo, contrasenia, eliminado)
        con = Controlador()
        if(con.ingresar(usr)):
            flash('USUARIO AGREGADO EXITOSAMENTE')
        else:
            flash('ERROR AL AGREGAR USUARIO')
        return redirect(url_for('vistaCliente'))


@app.route('/eliminar/<string:id>')
def eliminarUsuario(id):
    con = Controlador()
    if(con.eliminar(id)):
        flash('USUARIO ELIMINADO EXITOSAMENTE')
    else:
        flash('ERROR AL ELIMINAR USUARIO')
    return redirect(url_for('vistaCliente'))


@app.route('/editar/<id>', methods=['POST', 'GET'])
def getUsuario(id):
    con = Controlador()
    data = con.buscarUsuario(id)
    return render_template('editCliente.html', usr=data)


@app.route('/actualizar/<id>', methods=['POST'])
def actualizarUsuario(id):
    if request.method == 'POST':
        id = id
        cedula = request.form['cedula']
        nombre = request.form['nombres']
        apellido = request.form['apellidos']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        rol = request.form['rol']
        correo = request.form['correo']
        contrasenia = request.form['contrasena']
        eliminado = "0"
        usr = Usuario(id, cedula, nombre, apellido, telefono,
                      direccion, rol, correo, contrasenia, eliminado)
        con = Controlador()
        if(con.actualizar(usr)):
            flash('USUARIO ACTUALIZADO EXITOSAMENTE')
        else:
            flash('ERROR AL ACTUALIZAR USUARIO')
        return redirect(url_for('vistaCliente'))


if __name__ == '__main__':
    app.debug = True
    app.run(host='localhost', port=5001)
