class Usuario:
    def __init__(self, id, cedula, nombre, apellido, telefono, direccion, rol, correo, contrasenia, elminado):
        self.id = id
        self.cedula = cedula
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.direccion = direccion
        self.rol = rol
        self.correo = correo
        self.contrasenia = contrasenia
        self.elminado = elminado

    def Imprimir(self):
        mensaje = ('Usuarios: \n id = ' + self.id + '\n cedula = ' + self.cedula + '\n nombre = ' + self.nombre + '\n apellido = ' + self.apellido 
            + '\n telefono = ' + self.telefono + '\n direccion = ' + self.direccion + '\n rol = ' + self.rol + '\n correo = ' + self.correo )
        print(mensaje)
