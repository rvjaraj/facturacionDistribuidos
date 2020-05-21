import pymysql
db = pymysql.connect("localhost", "root", "", "facturaciondistribuidos")


class Factura:
    def __init__(self, id, subtotal, iva, total, fecha, descuento, usuario, eliminado):
        self.id = id
        self.subtotal = subtotal
        self.iva = iva
        self.total = total
        self.fecha = fecha
        self.descuento = descuento
        self.usuario = usuario
        self.eliminado = eliminado




class ControladorFactura:
    def __init__(self, db):
        self.db = db

    def ultimaFactura(self):
        cur = db.cursor()
        cur.execute('SELECT max(id) FROM factura where eliminado <> 1')
        data = cur.fetchall()
        cur.close()
        return data 
    
    def ingresar(self, Factura):
        try:
            pro = Factura
            cur = db.cursor()
            cur.execute('INSERT INTO factura (subtotal, iva, total, fecha, descuento, Usuarios, eliminado) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                        (pro.subtotal, pro.iva, pro.total, pro.fecha, pro.descuento, pro.usuario, pro.eliminado))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False

    def actualizar(self, Factura):
        try:
            pro = Factura
            cur = db.cursor()
            cur.execute("""
                UPDATE factura
                SET subtotal = %s,
                    iva = %s,
                    total = %s,
                    fecha = %s,
                    descuento = %s,
                    usuario = %s,
                    eliminado = %s
                WHERE id = %s
            """, (pro.subtotal, pro.iva, pro.total, pro.fecha, pro.descuento, pro.usuario, pro.eliminado))
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(str(e) + " eroror ")
            return False

    def listar(self):
        cur = db.cursor()
        cur.execute('SELECT * FROM factura f, usuarios u WHERE f.eliminado <> 1 and u.id = f.Usuarios  ')
        data = cur.fetchall()
        cur.close()
        return data

    def listarBusca(self, cedula):
        cur = db.cursor()
        cur.execute("SELECT * FROM factura WHERE eliminado <> 1 and id =  %s ", (cedula)  )
        data = cur.fetchall()
        cur.close()
        
        return data

    def eliminar(self, id):
        try:
            cur = db.cursor()
            cur.execute(
                'UPDATE `factura` SET `eliminado` = 1 WHERE `factura`.`id` = ' + id)
            db.commit()
            cur.close()
            return True
        except Exception as e:
            print(e)
            return False


if __name__ == "__main__":
    pass
    