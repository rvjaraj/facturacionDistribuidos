from Modelo import Usuario
from flask_mysqldb import MySQL
import pymysql

db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class ControladorUsuario:
    def __init__(self):
        pass

    def ingresarUsuario(self, Usuario):
        try:
            cur = db.cursor()
            cur.execute('INSERT INTO usuarios (cedula, nombre, apellido, telefono, direccion, rol, correo, contrasenia, eliminado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (Usuario.cedula, Usuario.nombre, Usuario.apellido, Usuario.telefono, Usuario.direccion, Usuario.rol, Usuario.correo, Usuario.contrasenia, Usuario.eliminado))
            db.commit()
            return True
        except:
            return False
