from flask_mysqldb import MySQL
import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class Usuario:
    def __init__(self, id, cedula, nombre, apellido, telefono, direccion, rol, correo, contrasenia, eliminado):
        self.id = id
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.direccion = direccion
        self.rol = rol
        self.correo = correo
        self.contrasenia = contrasenia
        self.eliminado = eliminado

    def Imprimir(self):
        mensaje = ('Usuarios: \n id = ' + str(self.id) + '\n cedula = ' + self.cedula + '\n nombre = ' + self.nombre + '\n apellido = ' + self.apellido
                   + '\n telefono = ' + self.telefono + '\n direccion = ' + self.direccion + '\n rol = ' + self.rol + '\n correo = ' + self.correo)
        return (mensaje)


class Controlador:

    def ingresar(self, Usuario):
        try:
            usr = Usuario
            cur = db.cursor()
            cur.execute('INSERT INTO usuarios (cedula, nombre, apellido, telefono, direccion, rol, correo, contrasenia, eliminado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                        (usr.cedula, usr.nombre, usr.apellido, usr.telefono, usr.direccion, usr.rol, usr.correo, usr.contrasenia, usr.eliminado))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def actualizar(self, Usuario):
        try:
            usr = Usuario
            cur = db.cursor()
            cur.execute("""
                UPDATE usuarios
                SET cedula = %s,
                    nombre = %s,
                    apellido = %s,
                    telefono = %s,
                    direccion = %s,
                    rol = %s,
                    correo = %s,
                    contrasenia = %s,
                    eliminado = %s
                WHERE id = %s
            """, (usr.cedula, usr.nombre, usr.apellido, usr.telefono, usr.direccion, usr.rol, usr.correo, usr.contrasenia, usr.eliminado, usr.id))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(str(e) +" eroror ")
            return False   

    def listar(self):
        cur = db.cursor()
        cur.execute('SELECT * FROM usuarios where eliminado <> 1')
        data = cur.fetchall()
        cur.close()
        return data
    
    def listarBusca(self, cedula):
        cur = db.cursor()
        cur.execute("SELECT * FROM usuarios WHERE eliminado <> 1 and cedula like %s", ('%'+cedula+'%'))
        data = cur.fetchall()
        cur.close()
        return data


    def eliminar(self, id):
        try:
            cur = db.cursor()
            cur.execute(
                'UPDATE `usuarios` SET `eliminado` = 1 WHERE `usuarios`.`id` = ' + id)
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def buscarUsuario(self, id):
        cur = db.cursor()
        cur.execute('SELECT * FROM usuarios WHERE id = %s', (id))
        data = cur.fetchall()
        cur.close()
        return data[0]


if __name__ == "__main__":
    usr = Usuario(0, "cedula", "nombre", "apellido", 'telefono',
                  "direccion", "rol", "correo", 'contrasenia', False)
    print(usr.Imprimir())

    con = Controlador()
    con.listar()
