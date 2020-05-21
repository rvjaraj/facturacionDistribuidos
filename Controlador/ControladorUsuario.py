import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class Usuario:
    def __init__(self, id, cedula, nombre, apellido, telefono, direccion, correo, fechaNac, eliminado):
        self.id = id
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.direccion = direccion
        self.correo = correo
        self.fechaNac = fechaNac
        self.eliminado = eliminado

    def Imprimir(self):
        mensaje = ('Usuarios: \n id = ' + str(self.id) + '\n cedula = ' + self.cedula + '\n nombre = ' + self.nombre + '\n apellido = ' + self.apellido
                   + '\n telefono = ' + self.telefono + '\n direccion = ' + self.direccion + '\n rol = ' + self.fechaNac + '\n correo = ' + self.correo)
        return (mensaje)


class ControladorUsuario:
  
    def __init__(self, db):
        self.db = db

    def ingresar(self, Usuario):
        try:
            usr = Usuario
            cur = self.db.cursor()
            cur.execute('INSERT INTO usuarios (cedula, nombre, apellido, telefono, direccion, correo, fechaNacimiento, eliminado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                        (usr.cedula, usr.nombre, usr.apellido, usr.telefono, usr.direccion, usr.correo, usr.fechaNac, usr.eliminado))
            self.db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def actualizar(self, Usuario):
        try:
            usr = Usuario
            cur = self.db.cursor()
            cur.execute("""
                UPDATE usuarios
                SET cedula = %s,
                    nombre = %s,
                    apellido = %s,
                    telefono = %s,
                    direccion = %s,
                    correo = %s,
                    fechaNacimiento = %s,
                    eliminado = %s
                WHERE id = %s
            """, (usr.cedula, usr.nombre, usr.apellido, usr.telefono, usr.direccion, usr.correo, usr.fechaNac, usr.eliminado, usr.id))
            self.db.commit()
            cur.close()
            return True
        except Exception as e:
            print(str(e) +" eroror aaaaaaaaaaaaaaaaaaaaa")
            return False   

    def listar(self):
        cur = self.db.cursor()
        cur.execute('SELECT * FROM usuarios where eliminado <> 1')
        data = cur.fetchall()
        cur.close()
        return data
    
    def listarBusca(self, cedula):
        cur = self.db.cursor()
        cur.execute("SELECT * FROM usuarios WHERE eliminado <> 1 and cedula like %s  or eliminado <> 1 and nombre like %s  or eliminado <> 1 and apellido like %s", ('%'+cedula+'%', '%'+cedula+'%', '%'+cedula+'%')  )
        data = cur.fetchall()
        cur.close()
        return data


    def eliminar(self, id):
        try:
            cur = self.db.cursor()
            cur.execute(
                'UPDATE `usuarios` SET `eliminado` = 1 WHERE `usuarios`.`id` = ' + id)
            self.db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def buscarUsuario(self, id):
        cur = self.db.cursor()
        cur.execute('SELECT * FROM usuarios WHERE eliminado <> 1 and id = %s', (id))
        data = cur.fetchall()
        cur.close()
        
        return data[0]
    
    def buscarCedula(self, cedula):
        cur = self.db.cursor()
        cur.execute('SELECT * FROM usuarios WHERE eliminado <> 1 and cedula = %s', (cedula))
        data = cur.fetchall()
        cur.close()
        print(str(len(data))+"aaaaaaaaaaaaaa")
        if(len(data)==0):
            return False
        else:
            return data[0]


