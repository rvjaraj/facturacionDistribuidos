from flask_mysqldb import MySQL
import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class Producto:
    def __init__(self, id, nombre, precio, stock, codigo, descuento, eliminado):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.codigo = codigo
        self.descuento = descuento
        self.eliminado = eliminado

    def Imprimir(self):
        mensaje = ('Producto: \n id = ' + str(self.id) + '\n nombre = ' + self.nombre + '\n precio = ' + self.precio
                   + '\n stock = ' + self.stock + '\n descuento = ' + self.descuento+'\n codigo = ' + self.codigo)
        return (mensaje)


class ControladorProducto:

    def ingresar(self, Producto):
        try:
            pro = Producto
            cur = db.cursor()
            cur.execute('INSERT INTO producto (nombre, precio, stock, codigo, descuento, eliminado) VALUES (%s, %s, %s, %s, %s, %s)',
                        (pro.nombre,  pro.precio, pro.stock, pro.codigo, pro.descuento, pro.eliminado))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def actualizar(self, Producto):
        try:
            pro = Producto
            cur = db.cursor()
            cur.execute("""
                UPDATE producto
                SET nombre = %s,
                    precio = %s,
                    stock = %s,
                    codigo = %s,
                    descuento = %s,
                    eliminado = %s
                WHERE id = %s
            """, (pro.nombre, pro.precio, pro.stock, pro.codigo,pro.descuento, pro.eliminado, pro.id))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(str(e) + " eroror ")
            return False

    def listar(self):
        cur = db.cursor()
        cur.execute('SELECT * FROM producto where eliminado <> 1')
        data = cur.fetchall()
        cur.close()
        return data

    def listarBusca(self, nombre):
        cur = db.cursor()
        cur.execute(
            "SELECT * FROM producto WHERE eliminado <> 1 and nombre like %s", ('%'+nombre+'%'))
        data = cur.fetchall()
        cur.close()
        return data

    def eliminar(self, id):
        try:
            cur = db.cursor()
            cur.execute(
                'UPDATE `producto` SET `eliminado` = 1 WHERE `producto`.`id` = ' + id)
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def buscarProducto(self, id):
        cur = db.cursor()
        cur.execute(
            'SELECT * FROM producto WHERE eliminado <> 1 and id = %s', (id))
        data = cur.fetchall()
        cur.close()
        return data[0]


if __name__ == "__main__":
    pro = Producto(0, "nombre", "precio", 'stock', "codigo", "descuento", False)
    print(pro.Imprimir())

    con = ControladorProducto()
    con.listar()