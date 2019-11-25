from flask_mysqldb import MySQL
import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")

class Detalle:
    def __init__(self, id, cantidad, subtotal, producto, factura, iva, descuento, precio):
        self.id = id
        self.cantidad = cantidad
        self.subtotal = subtotal
        self.producto = producto
        self.factura = factura
        self.iva = iva
        self.descuento = descuento
        self.precio = precio

    def Imprimir(self):
        pass


class ControladorDetalle:

    
    
    def ingresar(self, Detalle):
        try:
            pro = Detalle
            cur = db.cursor()
            cur.execute('INSERT INTO detalle (cantiddad, subtotal, producto, factura, iva, descuento, precio) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                        (pro.cantidad, pro.subtotal, pro.producto, pro.factura, pro.iva, pro.descuento, pro.precio))
            db.commit()
            cur.execute("UPDATE producto SET stock = (SELECT stock FROM producto WHERE id = %s) - %s WHERE id = %s ",(pro.producto, pro.cantidad, pro.producto))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

   

    def listar(self, id):
        cur = db.cursor()
        cur.execute('SELECT * FROM detalle d, producto p where p.id = d.Producto && d.factura =' + id)
        data = cur.fetchall()
        cur.close()
        return data

   
class sqlsSession:
    con = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")

    def get_conecion(self):
        return self.con


    