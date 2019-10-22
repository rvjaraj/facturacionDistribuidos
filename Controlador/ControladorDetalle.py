from flask_mysqldb import MySQL
import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class Detalle:
    def __init__(self, id, cantidad, subtotal, producto, factura):
        self.id = id
        self.cantidad = cantidad
        self.subtotal = subtotal
        self.producto = producto
        self.factura = factura

    def Imprimir(self):
        pass


class ControladorDetalle:

    
    
    def ingresar(self, Detalle):
        try:
            pro = Detalle
            cur = db.cursor()
            cur.execute('INSERT INTO detalle (cantiddad, subtotal, producto, factura) VALUES (%s, %s, %s, %s)',
                        (pro.cantidad, pro.subtotal, pro.producto, pro.factura))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

   

    def listar(self, id):
        cur = db.cursor()
        cur.execute('SELECT * FROM detalle where id == ' + id)
        data = cur.fetchall()
        cur.close()
        return data

   

if __name__ == "__main__":
    pass
    